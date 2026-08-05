"use client";

import { useState } from "react";

export interface HocusPersona {
  glyph: string;
  name: string;
  role: string;
  voice: string;
  summary: string;
  triggers: string[];
  aliases: { valley: string; occult: string };
}

interface HocusCastProps {
  personas: HocusPersona[];
}

export default function HocusCast({ personas }: HocusCastProps) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="hocus-cast-grid">
      {personas.map((persona) => {
        const isOpen = open === persona.name;
        const panelId = `hocus-cast-${persona.name.toLowerCase().replace(/\s+/g, "-")}`;
        return (
          <div
            key={persona.name}
            className={`hocus-cast-card${isOpen ? " is-open" : ""}`}
          >
            <button
              type="button"
              className="hocus-cast-card__head"
              onClick={() => setOpen(isOpen ? null : persona.name)}
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <span className="hocus-cast-card__glyph" aria-hidden="true">
                {persona.glyph}
              </span>
              <div className="hocus-cast-card__identity">
                <div className="hocus-cast-card__name">{persona.name}</div>
                <div className="hocus-cast-card__role">{persona.role}</div>
              </div>
              <span className="hocus-cast-card__chev" aria-hidden="true">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <div
              id={panelId}
              className="hocus-cast-card__panel"
              hidden={!isOpen}
            >
              <p className="hocus-cast-card__voice">{persona.voice}</p>
              <p className="hocus-cast-card__summary">{persona.summary}</p>
              {persona.triggers.length > 0 && (
                <ul className="hocus-cast-card__triggers">
                  {persona.triggers.map((trigger) => (
                    <li key={trigger}>{trigger}</li>
                  ))}
                </ul>
              )}
              <p className="hocus-cast-card__aliases">
                <span>valley: {persona.aliases.valley}</span>
                <span>occult: {persona.aliases.occult}</span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
