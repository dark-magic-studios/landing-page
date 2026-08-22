"use client";

import { useEffect } from "react";
import Link from "next/link";
import "./signum.css";

type FieldType = "text" | "date" | "company" | "logo" | "signature";

interface FieldRecord {
  id: string;
  type: FieldType;
  pageIndex: number;
  xFrac: number;
  yFrac: number;
  wFrac: number;
  hFrac: number;
  fontSizeFrac: number;
  color: string | null;
  text: string;
  label: string;
  cursiveKey: string;
  imageDataUrl: string | null;
  imageAspect: number | null;
}

interface PageRecord {
  pageIndex: number;
  widthPt: number;
  heightPt: number;
  wrap: HTMLDivElement;
  overlay: HTMLDivElement;
}

function byId<T extends HTMLElement = HTMLElement>(id: string): T {
  return document.getElementById(id) as T;
}

/**
 * Signum — a client-side PDF filler. Upload a PDF, drop in text/date/company/
 * logo/signature fields, then export a flattened copy. Everything happens in
 * the browser: the original file never leaves the tab.
 *
 * This is an imperative DOM controller (ported near-verbatim from a prototype
 * built as a single-file app) rather than idiomatic React state, because the
 * interaction surface — drag, resize, undo/redo, canvas rasterization — was
 * already correct and battle-tested in that form. Re-deriving it as render-
 * driven state would risk subtly changing behavior for no functional gain.
 */
export default function SignumApp() {
  useEffect(() => {
    let cancelled = false;
    const cleanupFns: Array<() => void> = [];
    function on<K extends keyof DocumentEventMap>(
      target: Document,
      type: K,
      fn: (ev: DocumentEventMap[K]) => void,
      opts?: boolean | AddEventListenerOptions
    ): void;
    function on(
      target: EventTarget,
      type: string,
      fn: EventListenerOrEventListenerObject,
      opts?: boolean | AddEventListenerOptions
    ): void;
    function on(
      target: EventTarget,
      type: string,
      fn: EventListenerOrEventListenerObject,
      opts?: boolean | AddEventListenerOptions
    ) {
      target.addEventListener(type, fn, opts);
      cleanupFns.push(() => target.removeEventListener(type, fn, opts));
    }

    async function boot() {
      const pdfjsLib: typeof import("pdfjs-dist") = await import("pdfjs-dist");
      const { PDFDocument } = await import("pdf-lib");
      if (cancelled) return;

      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

      // -----------------------------------------------------------------
      // State
      // -----------------------------------------------------------------
      const state: {
        pdfBytes: ArrayBuffer | null;
        fileName: string;
        pdfDoc: import("pdfjs-dist").PDFDocumentProxy | null;
        pages: PageRecord[];
        fields: FieldRecord[];
        selectedId: string | null;
        armedType: FieldType | null;
        armedLogoData: { dataUrl: string; w: number; h: number } | null;
        zoom: number;
        idCounter: number;
      } = {
        pdfBytes: null,
        fileName: "document.pdf",
        pdfDoc: null,
        pages: [],
        fields: [],
        selectedId: null,
        armedType: null,
        armedLogoData: null,
        zoom: 1,
        idCounter: 1,
      };

      // Tracks the field type being native-drag-and-dropped from the sidebar.
      // dataTransfer.getData() is unreadable during "dragover" (only "drop"),
      // so we mirror the type here at dragstart to drive the live drop-target
      // highlight.
      const dragPayload: { type: FieldType | null } = { type: null };

      const CURSIVE_FONTS = [
        { key: "dancing", label: "Dancing Script", family: "'Dancing Script', cursive" },
        { key: "vibes", label: "Great Vibes", family: "'Great Vibes', cursive" },
        { key: "sacramento", label: "Sacramento", family: "'Sacramento', cursive" },
        { key: "allura", label: "Allura", family: "'Allura', cursive" },
        { key: "parisienne", label: "Parisienne", family: "'Parisienne', cursive" },
        { key: "caveat", label: "Caveat", family: "'Caveat', cursive" },
      ];

      const INK_SWATCHES = ["#2a2438", "#6b3fa0", "#3e7c59", "#a13d2e", "#1b3a5c", "#3a3a3a"];

      const FIELD_DEFAULTS: Record<
        FieldType,
        { wFrac: number; hFrac: number; fontSizeFrac?: number; color: string | null }
      > = {
        text: { wFrac: 0.3, hFrac: 0.035, fontSizeFrac: 0.02, color: "#2a2438" },
        date: { wFrac: 0.18, hFrac: 0.03, fontSizeFrac: 0.018, color: "#2a2438" },
        company: { wFrac: 0.32, hFrac: 0.035, fontSizeFrac: 0.02, color: "#2a2438" },
        logo: { wFrac: 0.18, hFrac: 0.1, color: null },
        signature: { wFrac: 0.26, hFrac: 0.06, fontSizeFrac: 0.036, color: "#6b3fa0" },
      };

      const FIELD_LABELS: Record<FieldType, string> = {
        text: "Text",
        date: "Date",
        company: "Company",
        logo: "Logo",
        signature: "Signature",
      };

      // -----------------------------------------------------------------
      // DOM refs
      // -----------------------------------------------------------------
      const el = {
        uploadZone: byId<HTMLDivElement>("signum-uploadZone"),
        pdfInput: byId<HTMLInputElement>("signum-pdfInput"),
        replaceBtn: byId<HTMLButtonElement>("signum-replaceBtn"),
        downloadBtn: byId<HTMLButtonElement>("signum-downloadBtn"),
        docName: byId<HTMLDivElement>("signum-docName"),
        toolsSection: byId<HTMLDivElement>("signum-toolsSection"),
        fieldsSection: byId<HTMLDivElement>("signum-fieldsSection"),
        fieldList: byId<HTMLDivElement>("signum-fieldList"),
        armedHint: byId<HTMLDivElement>("signum-armedHint"),
        armedHintText: byId<HTMLSpanElement>("signum-armedHintText"),
        cancelArm: byId<HTMLButtonElement>("signum-cancelArm"),
        canvasScroll: byId<HTMLDivElement>("signum-canvasScroll"),
        emptyState: byId<HTMLDivElement>("signum-emptyState"),
        pages: byId<HTMLDivElement>("signum-pages"),
        toast: byId<HTMLDivElement>("signum-toast"),
        renderingNote: byId<HTMLDivElement>("signum-renderingNote"),
        renderingText: byId<HTMLSpanElement>("signum-renderingText"),
        zoomIn: byId<HTMLButtonElement>("signum-zoomIn"),
        zoomOut: byId<HTMLButtonElement>("signum-zoomOut"),
        zoomLabel: byId<HTMLSpanElement>("signum-zoomLabel"),
      };

      // -----------------------------------------------------------------
      // Utilities
      // -----------------------------------------------------------------
      let toastTimer: ReturnType<typeof setTimeout> | undefined;
      function toast(msg: string, isError?: boolean) {
        el.toast.textContent = msg;
        el.toast.classList.toggle("error", !!isError);
        el.toast.classList.add("show");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => el.toast.classList.remove("show"), isError ? 4200 : 2600);
      }

      function setRendering(on_: boolean, text?: string) {
        el.renderingText.textContent = text || "Rendering…";
        el.renderingNote.classList.toggle("show", !!on_);
      }

      function uid() {
        return "f" + state.idCounter++;
      }

      function svgIcon(type: FieldType) {
        switch (type) {
          case "text":
            return '<svg viewBox="0 0 24 24" fill="none"><path d="M5 6h14M5 12h14M5 18h9" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>';
          case "date":
            return '<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="5" width="16" height="15" rx="1.6" stroke="currentColor" stroke-width="1.6"/><path d="M4 9.5h16M8 3v3.5M16 3v3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
          case "company":
            return '<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="9" width="16" height="11" rx="1" stroke="currentColor" stroke-width="1.6"/><path d="M8 9V5.5A1.5 1.5 0 019.5 4h5A1.5 1.5 0 0116 5.5V9" stroke="currentColor" stroke-width="1.6"/></svg>';
          case "logo":
            return '<svg viewBox="0 0 24 24" fill="none"><rect x="3.5" y="4.5" width="17" height="15" rx="1.6" stroke="currentColor" stroke-width="1.6"/><circle cx="9" cy="10" r="1.6" stroke="currentColor" stroke-width="1.4"/><path d="M4.5 16.5l4.5-4 3 2.5 3.5-4.5 4 5.5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>';
          case "signature":
            return '<svg viewBox="0 0 24 24" fill="none"><path d="M3 18c2-1 3-3 3.5-5C7 10 8 6 9.5 6c1.3 0 1 4 2 6.5s2.3 2 3.5.5 1.2-3.5 2.5-3.5 1 2 2.5 2 2-1 2-1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 20.5h18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
        }
      }

      function fieldDisplayLabel(f: FieldRecord) {
        if (f.label) return f.label;
        if (f.type === "signature") return f.text ? f.text : "Signature";
        if (f.type === "logo") return "Logo";
        if (f.text) return f.text;
        return FIELD_LABELS[f.type];
      }

      // -----------------------------------------------------------------
      // Field model
      // -----------------------------------------------------------------
      function clamp(v: number, lo: number, hi: number) {
        return Math.max(lo, Math.min(hi, v));
      }

      function makeField(type: FieldType, pageIndex: number, xFrac: number, yFrac: number): FieldRecord {
        const d = FIELD_DEFAULTS[type];
        const f: FieldRecord = {
          id: uid(),
          type,
          pageIndex,
          xFrac: clamp(xFrac - d.wFrac / 2, 0, 1 - d.wFrac),
          yFrac: clamp(yFrac - d.hFrac / 2, 0, 1 - d.hFrac),
          wFrac: d.wFrac,
          hFrac: d.hFrac,
          fontSizeFrac: d.fontSizeFrac || 0.02,
          color: d.color,
          text: "",
          label: "",
          cursiveKey: "dancing",
          imageDataUrl: null,
          imageAspect: null,
        };
        if (type === "date") {
          const now = new Date();
          f.text = now.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
        }
        if (type === "logo" && state.armedLogoData) {
          f.imageDataUrl = state.armedLogoData.dataUrl;
          f.imageAspect = state.armedLogoData.w / state.armedLogoData.h;
          const pg = state.pages[pageIndex];
          const wPx = pg.wrap.clientWidth * d.wFrac;
          const hPx = wPx / f.imageAspect;
          f.hFrac = clamp(hPx / pg.wrap.clientHeight, 0.02, 0.6);
        }
        return f;
      }

      // -----------------------------------------------------------------
      // Undo / redo
      //
      // Field records are flat (no nested objects/arrays), so a snapshot is
      // just a shallow copy of each field — cheap, and correct because every
      // property on a field is a primitive or an immutable string
      // (imageDataUrl included). pushUndo() is called by every discrete
      // mutation *before* it happens; drag and resize call it lazily on the
      // first actual pointer move so a plain click-to-select doesn't pollute
      // history with a no-op entry.
      // -----------------------------------------------------------------
      const undoStack: FieldRecord[][] = [];
      const redoStack: FieldRecord[][] = [];
      const MAX_HISTORY = 60;

      function cloneFields() {
        return state.fields.map((f) => ({ ...f }));
      }

      function pushUndo() {
        undoStack.push(cloneFields());
        if (undoStack.length > MAX_HISTORY) undoStack.shift();
        redoStack.length = 0;
      }

      function resetHistory() {
        undoStack.length = 0;
        redoStack.length = 0;
      }

      function restoreFields(snapshot: FieldRecord[]) {
        const keepSelected = state.selectedId;
        state.fields = snapshot.map((f) => ({ ...f }));
        state.selectedId = state.fields.some((f) => f.id === keepSelected) ? keepSelected : null;
        state.pages.forEach((pg) => {
          if (pg && pg.overlay) {
            pg.overlay.querySelectorAll(".field").forEach((n) => n.remove());
          }
        });
        state.fields.forEach(drawField);
        renderFieldList();
      }

      function undo() {
        if (!undoStack.length) {
          toast("Nothing to undo.");
          return;
        }
        redoStack.push(cloneFields());
        restoreFields(undoStack.pop()!);
        toast("Undid last change.");
      }

      function redo() {
        if (!redoStack.length) {
          toast("Nothing to redo.");
          return;
        }
        undoStack.push(cloneFields());
        restoreFields(redoStack.pop()!);
        toast("Redid change.");
      }

      // -----------------------------------------------------------------
      // PDF loading + rendering
      // -----------------------------------------------------------------
      function handleFile(file: File | null | undefined) {
        if (!file) return;
        if (file.type !== "application/pdf" && !/\.pdf$/i.test(file.name)) {
          toast("Please choose a PDF file.", true);
          return;
        }
        const reader = new FileReader();
        reader.onload = () => {
          state.pdfBytes = reader.result as ArrayBuffer;
          state.fileName = file.name;
          loadPdf((reader.result as ArrayBuffer).slice(0));
        };
        reader.onerror = () => toast("Could not read that file.", true);
        reader.readAsArrayBuffer(file);
      }

      function loadPdf(arrayBuffer: ArrayBuffer) {
        setRendering(true, "Opening document…");
        state.fields = [];
        state.selectedId = null;
        resetHistory();
        el.fieldList.innerHTML = "";
        el.pages.innerHTML = "";
        state.pages = [];

        pdfjsLib
          .getDocument({ data: arrayBuffer })
          .promise.then((doc) => {
            state.pdfDoc = doc;
            el.docName.textContent = state.fileName;
            el.docName.classList.remove("placeholder");
            el.downloadBtn.disabled = false;
            el.replaceBtn.hidden = false;
            (el.uploadZone.parentElement as HTMLElement).classList.add("hidden");
            el.toolsSection.classList.remove("hidden");
            el.fieldsSection.classList.remove("hidden");
            el.emptyState.classList.add("hidden");
            el.pages.classList.remove("hidden");
            renderAllPages(doc);
          })
          .catch((err) => {
            console.error(err);
            setRendering(false);
            toast("That file could not be opened as a PDF.", true);
          });
      }

      function renderAllPages(doc: import("pdfjs-dist").PDFDocumentProxy) {
        const n = doc.numPages;
        let i = 1;

        function next() {
          if (i > n) {
            setRendering(false);
            return;
          }
          setRendering(true, "Rendering page " + i + " of " + n + "…");
          renderPage(doc, i)
            .then(() => {
              i++;
              next();
            })
            .catch((err) => {
              console.error(err);
              i++;
              next();
            });
        }
        next();
      }

      function renderPage(doc: import("pdfjs-dist").PDFDocumentProxy, pageNum: number) {
        return doc.getPage(pageNum).then((page) => {
          const baseViewport = page.getViewport({ scale: 1 });
          const containerWidth = Math.min(el.canvasScroll.clientWidth - 60, 900);
          const fitScale = containerWidth / baseViewport.width;
          const scale = fitScale * state.zoom;
          const viewport = page.getViewport({ scale });

          const pageWrap = document.createElement("div");
          pageWrap.className = "page-wrap";

          const numLabel = document.createElement("div");
          numLabel.className = "page-num";
          numLabel.textContent = "Page " + pageNum + " of " + doc.numPages;
          pageWrap.appendChild(numLabel);

          const pageEl = document.createElement("div");
          pageEl.className = "page";
          pageEl.style.width = viewport.width + "px";
          pageEl.style.height = viewport.height + "px";

          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          pageEl.appendChild(canvas);

          const overlay = document.createElement("div");
          overlay.className = "field-overlay";
          overlay.style.position = "absolute";
          overlay.style.inset = "0";
          overlay.dataset.pageIndex = String(pageNum - 1);
          pageEl.appendChild(overlay);

          pageWrap.appendChild(pageEl);
          el.pages.appendChild(pageWrap);

          const renderTask = page.render({ canvas, viewport });

          state.pages[pageNum - 1] = {
            pageIndex: pageNum - 1,
            widthPt: baseViewport.width,
            heightPt: baseViewport.height,
            wrap: pageEl,
            overlay,
          };

          overlay.addEventListener("click", (e) => {
            if (e.target !== overlay) return;
            onCanvasClick(pageNum - 1, e as MouseEvent);
          });

          overlay.addEventListener("dragover", (e) => {
            if (!dragPayload.type) return;
            e.preventDefault();
            (e as DragEvent).dataTransfer!.dropEffect = "copy";
            pageEl.classList.add("dnd-over");
          });
          overlay.addEventListener("dragleave", (e) => {
            if (e.target === overlay) pageEl.classList.remove("dnd-over");
          });
          overlay.addEventListener("drop", (e) => {
            pageEl.classList.remove("dnd-over");
            if (!dragPayload.type) return;
            e.preventDefault();
            onCanvasDrop(pageNum - 1, dragPayload.type, e as DragEvent);
          });

          return renderTask.promise;
        });
      }

      function rerenderPageDimensionsOnly() {
        if (!state.pdfDoc) return;
        el.pages.innerHTML = "";
        state.pages = [];
        renderAllPages(state.pdfDoc);
        setTimeout(() => drawAllFields(), 60);
      }

      // -----------------------------------------------------------------
      // Placement (arming a tool, then clicking a page)
      // -----------------------------------------------------------------
      function armTool(type: FieldType) {
        state.armedType = type;
        state.armedLogoData = null;

        if (type === "logo") {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = "image/png,image/jpeg,image/svg+xml,image/webp";
          input.onchange = () => {
            const file = input.files && input.files[0];
            if (!file) {
              state.armedType = null;
              return;
            }
            const reader = new FileReader();
            reader.onload = () => {
              const img = new Image();
              img.onload = () => {
                state.armedLogoData = {
                  dataUrl: reader.result as string,
                  w: img.naturalWidth || 1,
                  h: img.naturalHeight || 1,
                };
                setArmedUi(true, "Click a page to place the logo");
              };
              img.onerror = () => {
                toast("Could not read that image.", true);
                state.armedType = null;
              };
              img.src = reader.result as string;
            };
            reader.readAsDataURL(file);
          };
          input.click();
          return;
        }

        const label =
          type === "signature"
            ? "Click a page to place your signature"
            : "Click a page to place the " + FIELD_LABELS[type].toLowerCase() + " field";
        setArmedUi(true, label);
      }

      function setArmedUi(on_: boolean, text?: string) {
        el.armedHint.classList.toggle("hidden", !on_);
        el.armedHintText.textContent = text || "";
        el.canvasScroll.classList.toggle("placing", on_);
        const buttons = document.querySelectorAll<HTMLElement>(".field-tool");
        buttons.forEach((b) => {
          b.classList.toggle("armed", on_ && b.dataset.type === state.armedType);
        });
        if (!on_) {
          state.armedType = null;
          state.armedLogoData = null;
        }
      }

      function onCanvasClick(pageIndex: number, evt: MouseEvent) {
        if (!state.armedType) return;
        placeFieldAt(state.armedType, pageIndex, evt.clientX, evt.clientY);
        setArmedUi(false);
      }

      function onCanvasDrop(pageIndex: number, type: FieldType, evt: DragEvent) {
        if (type === "logo") return; // logo needs a file picked first; drag-and-drop isn't wired for it
        placeFieldAt(type, pageIndex, evt.clientX, evt.clientY);
        setArmedUi(false); // dropping a field also clears any separately-armed click-to-place tool
      }

      function placeFieldAt(type: FieldType, pageIndex: number, clientX: number, clientY: number) {
        const pg = state.pages[pageIndex];
        const rect = pg.wrap.getBoundingClientRect();
        const xFrac = (clientX - rect.left) / rect.width;
        const yFrac = (clientY - rect.top) / rect.height;
        const f = makeField(type, pageIndex, xFrac, yFrac);
        pushUndo();
        state.fields.push(f);
        drawField(f);
        renderFieldList();
        selectField(f.id, true);
        return f;
      }

      // -----------------------------------------------------------------
      // Field rendering (overlay DOM elements on the page canvas)
      // -----------------------------------------------------------------
      function drawAllFields() {
        state.fields.forEach(drawField);
      }

      function fieldEl(id: string) {
        return document.querySelector<HTMLDivElement>('.field[data-id="' + id + '"]');
      }

      function escapeHtml(s: string) {
        return String(s).replace(/[&<>"']/g, (c) => {
          return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" } as Record<string, string>)[c];
        });
      }

      function drawField(f: FieldRecord) {
        const pg = state.pages[f.pageIndex];
        if (!pg) return;
        const existing = fieldEl(f.id);
        const node = existing || document.createElement("div");
        // "field-kind-<type>" (not "field-<type>"): the inner content div for
        // signature/logo fields is *also* literally named "field-signature" /
        // "field-logo" and is deliberately pointer-events:none so clicks pass
        // through to the wrapper below. Giving the wrapper that same class
        // name would match that same CSS rule and make the wrapper itself
        // unclickable — which is exactly what silently broke drag/resize/
        // delete for those two field types.
        node.className = "field field-kind-" + f.type;
        node.dataset.id = f.id;
        node.style.left = f.xFrac * 100 + "%";
        node.style.top = f.yFrac * 100 + "%";
        node.style.width = f.wFrac * 100 + "%";
        node.style.height = f.hFrac * 100 + "%";
        node.classList.toggle("selected", state.selectedId === f.id);

        const pageHeightPx = pg.wrap.clientHeight;
        const fontPx = f.fontSizeFrac * pageHeightPx;

        let inner = "";
        if (f.type === "logo") {
          if (f.imageDataUrl) {
            inner = '<div class="field-logo"><img src="' + f.imageDataUrl + '" alt="Logo" draggable="false"></div>';
          } else {
            inner = '<div class="field-logo empty-placeholder">Logo</div>';
          }
        } else if (f.type === "signature") {
          const cursive = CURSIVE_FONTS.filter((c) => c.key === f.cursiveKey)[0] || CURSIVE_FONTS[0];
          if (f.text) {
            inner =
              '<div class="field-signature" style="font-family:' +
              cursive.family +
              ";font-size:" +
              fontPx +
              "px;color:" +
              f.color +
              ';">' +
              escapeHtml(f.text) +
              "</div>";
          } else {
            inner = '<div class="field-signature empty-placeholder">Type your name in the panel &rarr;</div>';
          }
        } else {
          const placeholder = f.type === "company" ? "Company name" : f.type === "date" ? "Date" : "Double-click to type";
          inner =
            '<div class="field-text' +
            (f.text ? "" : " empty-placeholder") +
            '" contenteditable="false" spellcheck="false" ' +
            'style="font-size:' +
            fontPx +
            "px;color:" +
            f.color +
            ';font-family:var(--sig-font-body);" data-placeholder="' +
            placeholder +
            '">' +
            escapeHtml(f.text || placeholder) +
            "</div>";
        }

        inner +=
          '<div class="field-del" title="Delete field"><svg viewBox="0 0 24 24" fill="none"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></div>';
        inner += '<div class="field-resize"></div>';
        node.innerHTML = inner;

        if (!existing) {
          pg.overlay.appendChild(node);
          wireNodeDrag(node, f);
        }
        wireContentInteractions(node, f);
        return node;
      }

      // Wired exactly once per field node: dragging the whole field around
      // the page.
      function wireNodeDrag(node: HTMLDivElement, f: FieldRecord) {
        node.addEventListener("pointerdown", (e) => {
          const target = e.target as HTMLElement;
          if (target.closest(".field-del") || target.closest(".field-resize")) return;
          const textEl = node.querySelector<HTMLDivElement>(".field-text");
          if (textEl && textEl.contentEditable === "true") return; // currently editing: let the caret land, no drag
          selectField(f.id);
          startDrag(e, f, node);
        });
      }

      // Re-wired every time the field's inner content is rebuilt (drawField
      // replaces innerHTML).
      function wireContentInteractions(node: HTMLDivElement, f: FieldRecord) {
        const textEl = node.querySelector<HTMLDivElement>(".field-text");

        node.querySelector(".field-del")!.addEventListener("click", (e) => {
          e.stopPropagation();
          removeField(f.id);
        });

        const resizeHandle = node.querySelector<HTMLDivElement>(".field-resize")!;
        resizeHandle.addEventListener("pointerdown", (e) => {
          e.stopPropagation();
          startResize(e as PointerEvent, f, node);
        });

        if (textEl) {
          textEl.addEventListener("dblclick", (e) => {
            e.stopPropagation();
            selectField(f.id);
            pushUndo();
            textEl.contentEditable = "true";
            if (!f.text) {
              textEl.textContent = "";
              textEl.classList.remove("empty-placeholder");
            }
            textEl.focus();
            placeCaretAtEnd(textEl);
          });
          textEl.addEventListener("blur", () => {
            textEl.contentEditable = "false";
            f.text = (textEl.textContent || "").trim();
            drawField(f);
            renderFieldList();
          });
          textEl.addEventListener("input", () => {
            f.text = textEl.textContent || "";
          });
          textEl.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
              e.stopPropagation();
              textEl.blur();
            }
          });
        }
      }

      function placeCaretAtEnd(node: HTMLElement) {
        const range = document.createRange();
        range.selectNodeContents(node);
        range.collapse(false);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }

      // Listeners live on `document`, not the field node: pointer capture is
      // only a best-effort nicety here (wrapped in try/catch), since a fast
      // drag can carry the cursor off a small node/handle, and in some hosts
      // setPointerCapture throws synchronously (NotFoundError) — if that
      // threw *before* these listeners were attached, the whole gesture
      // would silently do nothing, which is exactly what broke drag/resize
      // previously.
      function startDrag(e: PointerEvent, f: FieldRecord, node: HTMLDivElement) {
        e.preventDefault();
        const pg = state.pages[f.pageIndex];
        const rect = pg.wrap.getBoundingClientRect();
        const startX = e.clientX,
          startY = e.clientY;
        const startXFrac = f.xFrac,
          startYFrac = f.yFrac;
        let moved = false;
        node.classList.add("dragging");
        try {
          node.setPointerCapture(e.pointerId);
        } catch {
          /* best effort */
        }

        function onMove(ev: PointerEvent) {
          if (!moved) {
            moved = true;
            pushUndo();
          }
          const dxFrac = (ev.clientX - startX) / rect.width;
          const dyFrac = (ev.clientY - startY) / rect.height;
          f.xFrac = clamp(startXFrac + dxFrac, 0, 1 - f.wFrac);
          f.yFrac = clamp(startYFrac + dyFrac, 0, 1 - f.hFrac);
          node.style.left = f.xFrac * 100 + "%";
          node.style.top = f.yFrac * 100 + "%";
        }
        function onUp(ev: PointerEvent) {
          node.classList.remove("dragging");
          try {
            node.releasePointerCapture(ev.pointerId);
          } catch {
            /* best effort */
          }
          document.removeEventListener("pointermove", onMove);
          document.removeEventListener("pointerup", onUp);
        }
        document.addEventListener("pointermove", onMove);
        document.addEventListener("pointerup", onUp);
      }

      function startResize(e: PointerEvent, f: FieldRecord, node: HTMLDivElement) {
        e.preventDefault();
        const pg = state.pages[f.pageIndex];
        const rect = pg.wrap.getBoundingClientRect();
        const startX = e.clientX,
          startY = e.clientY;
        const startW = f.wFrac,
          startH = f.hFrac;
        const lockAspect = f.type === "logo" && f.imageAspect;
        let moved = false;
        try {
          node.setPointerCapture(e.pointerId);
        } catch {
          /* best effort */
        }

        function onMove(ev: PointerEvent) {
          if (!moved) {
            moved = true;
            pushUndo();
          }
          const dwFrac = (ev.clientX - startX) / rect.width;
          const dhFrac = (ev.clientY - startY) / rect.height;
          const newW = clamp(startW + dwFrac, 0.03, 1 - f.xFrac);
          let newH = clamp(startH + dhFrac, 0.015, 1 - f.yFrac);
          if (lockAspect) {
            newH = (newW * rect.width) / (f.imageAspect! * rect.height);
          }
          f.wFrac = newW;
          f.hFrac = newH;
          if (f.type === "signature") {
            f.fontSizeFrac = clamp(f.hFrac * 0.62, 0.01, 0.2);
          }
          drawField(f);
        }
        function onUp(ev: PointerEvent) {
          try {
            node.releasePointerCapture(ev.pointerId);
          } catch {
            /* best effort */
          }
          document.removeEventListener("pointermove", onMove);
          document.removeEventListener("pointerup", onUp);
          renderFieldList();
        }
        document.addEventListener("pointermove", onMove);
        document.addEventListener("pointerup", onUp);
      }

      function removeField(id: string) {
        pushUndo();
        state.fields = state.fields.filter((f) => f.id !== id);
        const node = fieldEl(id);
        if (node) node.remove();
        if (state.selectedId === id) state.selectedId = null;
        renderFieldList();
      }

      function selectField(id: string | null, scrollIntoView?: boolean) {
        state.selectedId = id;
        document.querySelectorAll<HTMLDivElement>(".field").forEach((n) => {
          n.classList.toggle("selected", n.dataset.id === id);
        });
        renderFieldList();
        if (scrollIntoView) {
          const node = id ? fieldEl(id) : null;
          if (node) node.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }

      // -----------------------------------------------------------------
      // Sidebar field list + inspector
      // -----------------------------------------------------------------
      function renderFieldList() {
        if (!state.fields.length) {
          el.fieldList.innerHTML =
            '<div class="field-empty">No fields yet. Choose a field type above, then click anywhere on the document to place it.</div>';
          return;
        }
        el.fieldList.innerHTML = "";
        state.fields.forEach((f) => {
          const item = document.createElement("div");
          item.className = "field-item" + (state.selectedId === f.id ? " selected" : "");

          const head = document.createElement("div");
          head.className = "field-item-head";
          head.innerHTML =
            '<span class="field-item-icon">' +
            svgIcon(f.type) +
            '</span><span class="field-item-label"></span><span class="field-item-page">p.' +
            (f.pageIndex + 1) +
            '</span><button class="field-item-del" title="Delete"><svg viewBox="0 0 24 24" fill="none"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></button>';
          head.querySelector(".field-item-label")!.textContent = fieldDisplayLabel(f);
          head.addEventListener("click", (e) => {
            if ((e.target as HTMLElement).closest(".field-item-del")) return;
            selectField(state.selectedId === f.id ? null : f.id, true);
          });
          head.querySelector(".field-item-del")!.addEventListener("click", (e) => {
            e.stopPropagation();
            removeField(f.id);
          });
          item.appendChild(head);

          if (state.selectedId === f.id) {
            item.appendChild(buildInspector(f));
          }
          el.fieldList.appendChild(item);
        });
      }

      function renderFieldListLabelOnly(f: FieldRecord) {
        const item = document.querySelector(".field-item.selected .field-item-label");
        if (item) item.textContent = fieldDisplayLabel(f);
      }

      function buildInspector(f: FieldRecord) {
        const wrap = document.createElement("div");
        wrap.className = "inspector";

        // Label (organizational only, not printed)
        const labelRow = document.createElement("div");
        labelRow.className = "insp-row";
        labelRow.innerHTML = '<span class="insp-label">List label (optional)</span>';
        const labelInput = document.createElement("input");
        labelInput.className = "insp-text";
        labelInput.placeholder = FIELD_LABELS[f.type] + " " + (state.fields.indexOf(f) + 1);
        labelInput.value = f.label || "";
        let labelEditStarted = false;
        labelInput.addEventListener("focus", () => {
          labelEditStarted = false;
        });
        labelInput.addEventListener("input", () => {
          if (!labelEditStarted) {
            pushUndo();
            labelEditStarted = true;
          }
          f.label = labelInput.value;
          renderFieldListLabelOnly(f);
        });
        labelRow.appendChild(labelInput);
        wrap.appendChild(labelRow);

        if (f.type === "text" || f.type === "date" || f.type === "company") {
          const textRow = document.createElement("div");
          textRow.className = "insp-row";
          textRow.innerHTML = '<span class="insp-label">Content</span>';
          const ta = document.createElement("textarea");
          ta.className = "insp-text";
          ta.value = f.text || "";
          ta.rows = f.type === "text" ? 2 : 1;
          let taEditStarted = false;
          ta.addEventListener("focus", () => {
            taEditStarted = false;
          });
          ta.addEventListener("input", () => {
            if (!taEditStarted) {
              pushUndo();
              taEditStarted = true;
            }
            f.text = ta.value;
            drawField(f);
            renderFieldListLabelOnly(f);
          });
          textRow.appendChild(ta);
          wrap.appendChild(textRow);

          if (f.type === "date") {
            const todayBtn = document.createElement("button");
            todayBtn.className = "btn btn-sm";
            todayBtn.type = "button";
            todayBtn.textContent = "Set to today";
            todayBtn.style.alignSelf = "flex-start";
            todayBtn.addEventListener("click", () => {
              pushUndo();
              const now = new Date();
              f.text = now.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
              ta.value = f.text;
              drawField(f);
              renderFieldListLabelOnly(f);
            });
            wrap.appendChild(todayBtn);
          }

          wrap.appendChild(colorRow(f));
          wrap.appendChild(fontSizeRow(f));
        }

        if (f.type === "signature") {
          const sigRow = document.createElement("div");
          sigRow.className = "insp-row";
          sigRow.innerHTML = '<span class="insp-label">Signer name</span>';
          const sigInput = document.createElement("input");
          sigInput.className = "insp-text";
          sigInput.placeholder = "Type name to sign";
          sigInput.value = f.text || "";
          let sigEditStarted = false;
          sigInput.addEventListener("focus", () => {
            sigEditStarted = false;
          });
          sigInput.addEventListener("input", () => {
            if (!sigEditStarted) {
              pushUndo();
              sigEditStarted = true;
            }
            f.text = sigInput.value;
            drawField(f);
            renderFieldListLabelOnly(f);
          });
          sigRow.appendChild(sigInput);
          wrap.appendChild(sigRow);

          const styleRow = document.createElement("div");
          styleRow.className = "insp-row";
          styleRow.innerHTML = '<span class="insp-label">Signature style</span>';
          const picker = document.createElement("div");
          picker.className = "cursive-picker";
          CURSIVE_FONTS.forEach((c) => {
            const opt = document.createElement("div");
            opt.className = "cursive-opt" + (f.cursiveKey === c.key ? " active" : "");
            opt.style.fontFamily = c.family;
            opt.textContent = "Signature";
            opt.title = c.label;
            opt.addEventListener("click", () => {
              pushUndo();
              f.cursiveKey = c.key;
              drawField(f);
              renderFieldList();
            });
            picker.appendChild(opt);
          });
          styleRow.appendChild(picker);
          wrap.appendChild(styleRow);

          wrap.appendChild(colorRow(f));
          wrap.appendChild(fontSizeRow(f, 0.015, 0.09));
        }

        if (f.type === "logo") {
          const thumbRow = document.createElement("div");
          thumbRow.className = "insp-row";
          thumbRow.innerHTML = '<span class="insp-label">Image</span>';
          const thumb = document.createElement("div");
          thumb.className = "logo-thumb";
          if (f.imageDataUrl) {
            const img = document.createElement("img");
            img.src = f.imageDataUrl;
            thumb.appendChild(img);
          } else {
            thumb.textContent = "No image";
          }
          thumbRow.appendChild(thumb);
          const replaceLogoBtn = document.createElement("button");
          replaceLogoBtn.className = "btn btn-sm";
          replaceLogoBtn.type = "button";
          replaceLogoBtn.textContent = f.imageDataUrl ? "Replace image" : "Choose image";
          replaceLogoBtn.style.alignSelf = "flex-start";
          replaceLogoBtn.addEventListener("click", () => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/png,image/jpeg,image/svg+xml,image/webp";
            input.onchange = () => {
              const file = input.files && input.files[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => {
                const image = new Image();
                image.onload = () => {
                  pushUndo();
                  f.imageDataUrl = reader.result as string;
                  f.imageAspect = image.naturalWidth / image.naturalHeight;
                  drawField(f);
                  renderFieldList();
                };
                image.src = reader.result as string;
              };
              reader.readAsDataURL(file);
            };
            input.click();
          });
          thumbRow.appendChild(replaceLogoBtn);
          wrap.appendChild(thumbRow);
        }

        return wrap;
      }

      function fontSizeRow(f: FieldRecord, min?: number, max?: number) {
        min = min || 0.012;
        max = max || 0.05;
        const row = document.createElement("div");
        row.className = "insp-row";
        row.innerHTML = '<span class="insp-label">Size</span>';
        const rr = document.createElement("div");
        rr.className = "range-row";
        const range = document.createElement("input");
        range.type = "range";
        range.min = String(min);
        range.max = String(max);
        range.step = "0.001";
        range.value = String(f.fontSizeFrac);
        const val = document.createElement("span");
        val.className = "range-val";
        val.textContent = String(Math.round(f.fontSizeFrac * 1000));
        let sizeEditStarted = false;
        range.addEventListener("input", () => {
          if (!sizeEditStarted) {
            pushUndo();
            sizeEditStarted = true;
          }
          f.fontSizeFrac = parseFloat(range.value);
          val.textContent = String(Math.round(f.fontSizeFrac * 1000));
          drawField(f);
        });
        range.addEventListener("change", () => {
          sizeEditStarted = false;
        });
        rr.appendChild(range);
        rr.appendChild(val);
        row.appendChild(rr);
        return row;
      }

      function colorRow(f: FieldRecord) {
        const row = document.createElement("div");
        row.className = "insp-row";
        row.innerHTML = '<span class="insp-label">Color</span>';
        const sr = document.createElement("div");
        sr.className = "swatch-row";
        INK_SWATCHES.forEach((c) => {
          const sw = document.createElement("div");
          sw.className = "swatch" + (f.color === c ? " active" : "");
          sw.style.background = c;
          sw.addEventListener("click", () => {
            pushUndo();
            f.color = c;
            drawField(f);
            renderFieldList();
          });
          sr.appendChild(sw);
        });
        const custom = document.createElement("div");
        custom.className = "swatch custom";
        custom.style.background = "conic-gradient(red,yellow,lime,cyan,blue,magenta,red)";
        const colorInput = document.createElement("input");
        colorInput.type = "color";
        colorInput.value = f.color || "#2a2438";
        let customColorEditStarted = false;
        colorInput.addEventListener("input", () => {
          if (!customColorEditStarted) {
            pushUndo();
            customColorEditStarted = true;
          }
          f.color = colorInput.value;
          drawField(f);
        });
        colorInput.addEventListener("change", () => {
          customColorEditStarted = false;
        });
        custom.appendChild(colorInput);
        sr.appendChild(custom);
        row.appendChild(sr);
        return row;
      }

      // -----------------------------------------------------------------
      // Export: rasterize field overlays per page, embed as PNG via pdf-lib
      // -----------------------------------------------------------------
      const EXPORT_SCALE = 3; // ~216 DPI equivalent for crisp text/signatures

      function waitForFonts() {
        if (document.fonts && document.fonts.ready) return document.fonts.ready;
        return Promise.resolve();
      }

      function loadImage(src: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = src;
        });
      }

      function fitContain(iw: number, ih: number, w: number, h: number) {
        const scale = Math.min(w / iw, h / ih);
        const dw = iw * scale,
          dh = ih * scale;
        return { w: dw, h: dh, x: (w - dw) / 2, y: (h - dh) / 2 };
      }

      function wrapText(
        ctx: CanvasRenderingContext2D,
        text: string,
        x: number,
        y: number,
        maxW: number,
        maxH: number,
        lineHeightPx: number
      ) {
        const lines = String(text).split("\n");
        const out: string[] = [];
        lines.forEach((line) => {
          const words = line.split(" ");
          let cur = "";
          words.forEach((word) => {
            const test = cur ? cur + " " + word : word;
            if (ctx.measureText(test).width > maxW && cur) {
              out.push(cur);
              cur = word;
            } else {
              cur = test;
            }
          });
          out.push(cur);
        });
        const lh = lineHeightPx * 1.2;
        const maxLines = Math.max(1, Math.floor(maxH / lh));
        out.slice(0, maxLines).forEach((line, i) => {
          ctx.fillText(line, x, y + i * lh);
        });
      }

      function rasterizePage(pageIndex: number, widthPt: number, heightPt: number): Promise<Uint8Array | null> {
        const fields = state.fields.filter((f) => f.pageIndex === pageIndex);
        if (!fields.length) return Promise.resolve(null);

        const canvas = document.createElement("canvas");
        canvas.width = Math.round(widthPt * EXPORT_SCALE);
        canvas.height = Math.round(heightPt * EXPORT_SCALE);
        const ctx = canvas.getContext("2d")!;

        const imagePromises = fields
          .filter((f) => f.type === "logo" && f.imageDataUrl)
          .map((f) => loadImage(f.imageDataUrl as string).then((img) => ({ f, img })));

        return Promise.all(imagePromises).then((loadedImages) => {
          const imgMap: Record<string, HTMLImageElement> = {};
          loadedImages.forEach((o) => {
            imgMap[o.f.id] = o.img;
          });

          fields.forEach((f) => {
            const x = f.xFrac * canvas.width;
            const y = f.yFrac * canvas.height;
            const w = f.wFrac * canvas.width;
            const h = f.hFrac * canvas.height;

            if (f.type === "logo") {
              const img = imgMap[f.id];
              if (!img) return;
              const fit = fitContain(img.naturalWidth, img.naturalHeight, w, h);
              ctx.drawImage(img, x + fit.x, y + fit.y, fit.w, fit.h);
              return;
            }

            if (!f.text) return;
            const fontPx = f.fontSizeFrac * canvas.height;

            if (f.type === "signature") {
              const cursive = CURSIVE_FONTS.filter((c) => c.key === f.cursiveKey)[0] || CURSIVE_FONTS[0];
              ctx.fillStyle = f.color || "#2a2438";
              ctx.textBaseline = "middle";
              ctx.textAlign = "left";
              const maxW = w;
              let size = fontPx;
              ctx.font = size + "px " + cursive.family;
              while (ctx.measureText(f.text).width > maxW && size > 6) {
                size -= 1;
                ctx.font = size + "px " + cursive.family;
              }
              ctx.fillText(f.text, x, y + h / 2);
            } else {
              ctx.fillStyle = f.color || "#2a2438";
              ctx.textBaseline = "top";
              ctx.textAlign = "left";
              ctx.font = fontPx + 'px "IBM Plex Sans", sans-serif';
              wrapText(ctx, f.text, x, y, w, h, fontPx);
            }
          });

          return new Promise<Uint8Array | null>((resolve) => {
            canvas.toBlob((blob) => {
              if (!blob) {
                resolve(null);
                return;
              }
              const reader = new FileReader();
              reader.onload = () => resolve(new Uint8Array(reader.result as ArrayBuffer));
              reader.readAsArrayBuffer(blob);
            }, "image/png");
          });
        });
      }

      function outputFileName() {
        const base = state.fileName.replace(/\.pdf$/i, "");
        return base + "-filled.pdf";
      }

      function offerDownload(bytes: Uint8Array) {
        const arrayBuffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
        const blob = new Blob([arrayBuffer], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = outputFileName();
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 4000);
        toast("Saved " + outputFileName());
      }

      function exportPdf() {
        if (!state.pdfBytes) return;
        document.querySelectorAll<HTMLDivElement>(".field-text").forEach((n) => n.blur());

        el.downloadBtn.disabled = true;
        setRendering(true, "Preparing your PDF…");

        waitForFonts()
          .then(() => PDFDocument.load(state.pdfBytes!.slice(0)))
          .then((pdfDoc) => {
            const pdfPages = pdfDoc.getPages();
            const tasks = pdfPages.map((page, idx) => {
              const size = page.getSize();
              return rasterizePage(idx, size.width, size.height).then((pngBytes) => {
                if (!pngBytes) return;
                return pdfDoc.embedPng(pngBytes).then((pngImage) => {
                  page.drawImage(pngImage, { x: 0, y: 0, width: size.width, height: size.height });
                });
              });
            });
            return Promise.all(tasks).then(() => pdfDoc.save());
          })
          .then((bytes) => {
            setRendering(false);
            el.downloadBtn.disabled = false;
            offerDownload(bytes);
          })
          .catch((err) => {
            console.error(err);
            setRendering(false);
            el.downloadBtn.disabled = false;
            toast("Something went wrong while building the PDF.", true);
          });
      }

      // -----------------------------------------------------------------
      // Wire up static UI
      // -----------------------------------------------------------------
      on(el.uploadZone, "click", () => el.pdfInput.click());
      on(el.uploadZone, "keydown", (e) => {
        const ke = e as KeyboardEvent;
        if (ke.key === "Enter" || ke.key === " ") {
          ke.preventDefault();
          el.pdfInput.click();
        }
      });
      on(el.uploadZone, "dragover", (e) => {
        e.preventDefault();
        el.uploadZone.classList.add("drag-over");
      });
      on(el.uploadZone, "dragleave", () => el.uploadZone.classList.remove("drag-over"));
      on(el.uploadZone, "drop", (e) => {
        e.preventDefault();
        el.uploadZone.classList.remove("drag-over");
        const file = (e as DragEvent).dataTransfer?.files && (e as DragEvent).dataTransfer!.files[0];
        handleFile(file);
      });
      on(el.pdfInput, "change", () => handleFile(el.pdfInput.files?.[0]));
      on(el.replaceBtn, "click", () => el.pdfInput.click());
      on(el.downloadBtn, "click", exportPdf);

      document.querySelectorAll<HTMLButtonElement>(".field-tool").forEach((btn) => {
        on(btn, "click", () => {
          const type = btn.dataset.type as FieldType;
          if (state.armedType === type) {
            setArmedUi(false);
            return;
          }
          armTool(type);
        });
        if (btn.draggable) {
          on(btn, "dragstart", (e) => {
            setArmedUi(false); // dragging supersedes the click-to-arm flow
            const type = btn.dataset.type as FieldType;
            dragPayload.type = type;
            const de = e as DragEvent;
            de.dataTransfer!.effectAllowed = "copy";
            de.dataTransfer!.setData("text/plain", type);
            btn.classList.add("dragging");
          });
          on(btn, "dragend", () => {
            dragPayload.type = null;
            btn.classList.remove("dragging");
            document.querySelectorAll(".page.dnd-over").forEach((p) => p.classList.remove("dnd-over"));
          });
        }
      });
      on(el.cancelArm, "click", () => setArmedUi(false));

      on(document, "keydown", (e) => {
        if (e.key === "Escape") {
          if (state.armedType) setArmedUi(false);
          else if (state.selectedId) selectField(null);
        }

        const active = document.activeElement as HTMLElement | null;
        const inEditable = !!(active && (active.isContentEditable || active.tagName === "INPUT" || active.tagName === "TEXTAREA"));

        if ((e.key === "Delete" || e.key === "Backspace") && state.selectedId) {
          if (inEditable) return;
          removeField(state.selectedId);
        }

        const mod = e.ctrlKey || e.metaKey;
        if (mod && (e.key === "z" || e.key === "Z")) {
          if (inEditable) return; // let the browser's native undo handle in-progress typing
          e.preventDefault();
          if (e.shiftKey) redo();
          else undo();
          return;
        }
        if (mod && (e.key === "y" || e.key === "Y")) {
          if (inEditable) return;
          e.preventDefault();
          redo();
        }
      });

      on(el.canvasScroll, "click", (e) => {
        if (e.target === el.canvasScroll || e.target === el.pages) {
          if (state.selectedId) selectField(null);
        }
      });

      function setZoom(z: number) {
        state.zoom = clamp(z, 0.5, 2);
        el.zoomLabel.textContent = Math.round(state.zoom * 100) + "%";
        rerenderPageDimensionsOnly();
      }
      on(el.zoomIn, "click", () => setZoom(state.zoom + 0.1));
      on(el.zoomOut, "click", () => setZoom(state.zoom - 0.1));

      function debounce<A extends unknown[]>(fn: (...args: A) => void, ms: number) {
        let t: ReturnType<typeof setTimeout>;
        return (...args: A) => {
          clearTimeout(t);
          t = setTimeout(() => fn(...args), ms);
        };
      }
      on(
        window as unknown as Document,
        "resize" as keyof DocumentEventMap,
        debounce(() => {
          if (state.pdfDoc) rerenderPageDimensionsOnly();
        }, 250) as never
      );

      renderFieldList();
    }

    boot();

    return () => {
      cancelled = true;
      cleanupFns.forEach((fn) => fn());
    };
  }, []);

  return (
    <div className="signum-app">
      <div className="app">
        <div className="topbar">
          <Link className="brand" href="/tools">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path
                d="M4 20L14.5 9.5C15.5 8.5 15.5 7 14.5 6C13.5 5 12 5 11 6L2 15V20H4Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
                style={{ color: "var(--sig-accent)" }}
              />
              <path
                d="M11.5 8.5L16 4M20 8L22 6"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                style={{ color: "var(--sig-brass)" }}
              />
              <circle cx="20.5" cy="18.5" r="2.7" stroke="currentColor" strokeWidth="1.3" style={{ color: "var(--sig-brass)" }} />
            </svg>
            <span className="brand-name">Signum</span>
          </Link>
          <div className="doc-name placeholder" id="signum-docName">
            No document loaded
          </div>
          <div className="topbar-spacer" />
          <div className="zoom-group" id="signum-zoomGroup">
            <button type="button" id="signum-zoomOut" aria-label="Zoom out">
              –
            </button>
            <span className="zoom-label" id="signum-zoomLabel">
              100%
            </span>
            <button type="button" id="signum-zoomIn" aria-label="Zoom in">
              +
            </button>
          </div>
          <button className="btn" id="signum-replaceBtn" type="button" hidden>
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M4 4v6h6M20 20v-6h-6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 10a8 8 0 00-14.5-4.5M4 14a8 8 0 0014.5 4.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Replace
          </button>
          <button className="btn btn-primary" id="signum-downloadBtn" type="button" disabled>
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3v13m0 0l-4.5-4.5M12 16l4.5-4.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M4 18v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            Download PDF
          </button>
        </div>

        <div className="body">
          <div className="sidebar">
            <div>
              <div className="side-section-title">Document</div>
              <div className="upload-zone" id="signum-uploadZone" tabIndex={0} role="button" aria-label="Upload a PDF file">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M8 16V6m0 0L4.5 9.5M8 6l3.5 3.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 4h4a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2v-3"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="u-title">Upload a PDF</div>
                <div className="u-sub">Click to browse, or drop a file</div>
              </div>
              <input type="file" id="signum-pdfInput" accept="application/pdf" className="visually-hidden" />
            </div>

            <div id="signum-toolsSection" className="hidden">
              <div className="side-section-title">Add a field</div>
              <div className="field-grid">
                <button className="field-tool" type="button" data-type="text" draggable>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M5 6h14M5 12h14M5 18h9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                  </svg>
                  <span>Text</span>
                </button>
                <button className="field-tool" type="button" data-type="date" draggable>
                  <svg viewBox="0 0 24 24" fill="none">
                    <rect x="4" y="5" width="16" height="15" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M4 9.5h16M8 3v3.5M16 3v3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                  <span>Date</span>
                </button>
                <button className="field-tool" type="button" data-type="company" draggable>
                  <svg viewBox="0 0 24 24" fill="none">
                    <rect x="4" y="9" width="16" height="11" rx="1" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M8 9V5.5A1.5 1.5 0 019.5 4h5A1.5 1.5 0 0116 5.5V9" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                  <span>Company</span>
                </button>
                <button className="field-tool" type="button" data-type="logo">
                  <svg viewBox="0 0 24 24" fill="none">
                    <rect x="3.5" y="4.5" width="17" height="15" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
                    <circle cx="9" cy="10" r="1.6" stroke="currentColor" strokeWidth="1.4" />
                    <path
                      d="M4.5 16.5l4.5-4 3 2.5 3.5-4.5 4 5.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Logo</span>
                </button>
                <button className="field-tool wide" type="button" data-type="signature" draggable>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 18c2-1 3-3 3.5-5C7 10 8 6 9.5 6c1.3 0 1 4 2 6.5s2.3 2 3.5.5 1.2-3.5 2.5-3.5 1 2 2.5 2 2-1 2-1"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M3 20.5h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                  <span>Signature</span>
                </button>
              </div>
              <p className="tool-hint">Drag a field onto the document, or click it once and then click the page to place it.</p>
              <div className="armed-hint hidden" id="signum-armedHint">
                <span id="signum-armedHintText">Click a page to place the field</span>
                <button type="button" id="signum-cancelArm">
                  cancel
                </button>
              </div>
            </div>

            <div
              id="signum-fieldsSection"
              className="hidden"
              style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}
            >
              <div className="side-section-title">Fields on this document</div>
              <div className="field-list" id="signum-fieldList" />
            </div>
          </div>

          <div className="canvas-scroll" id="signum-canvasScroll">
            <div className="empty-state" id="signum-emptyState">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" stroke="currentColor" strokeWidth="1.3" />
                <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.3" />
                <path
                  d="M8.5 19c1.5-.7 2.2-2 2.6-3.4.4-1.6 1.1-4.4 2.2-4.4.9 0 .7 2.7 1.4 4.4.6 1.5 1.7 1.5 2.4.3"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
              <h2>An empty page, waiting</h2>
              <p>
                Upload a PDF to fill it in — add typed text, a company name, today&rsquo;s date, a logo, or a cursive
                signature, then export the finished document.
              </p>
            </div>
            <div className="pages hidden" id="signum-pages" />
          </div>
        </div>
      </div>

      <div className="rendering-note" id="signum-renderingNote">
        <span className="spinner" />
        <span id="signum-renderingText">Rendering…</span>
      </div>
      <div className="toast" id="signum-toast" />
    </div>
  );
}
