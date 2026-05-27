export default function GradientRule() {
  return (
    <div
      aria-hidden="true"
      className="w-full h-px"
      style={{
        background:
          "linear-gradient(to right, transparent, var(--color-purple), var(--color-blue), transparent)",
      }}
    />
  );
}
