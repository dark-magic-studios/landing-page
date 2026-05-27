import GradientRule from "./GradientRule";

export default function Footer() {
  return (
    <footer className="px-6 pb-10" role="contentinfo">
      <div className="mx-auto max-w-6xl">
        <GradientRule />
        <p
          className="mt-8 text-sm text-center"
          style={{ color: "var(--color-muted)", fontFamily: "var(--font-inter)" }}
        >
          © 2025 Dark Magic Studios. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
