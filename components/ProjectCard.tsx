"use client";

interface ProjectCardProps {
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  status: string;
  statusVariant: "amber" | "green";
  ctaLabel: string;
  ctaHref: string;
}

export default function ProjectCard({
  title,
  tagline,
  description,
  tags,
  status,
  statusVariant,
  ctaLabel,
  ctaHref,
}: ProjectCardProps) {
  const statusColors =
    statusVariant === "amber"
      ? { bg: "rgba(217, 119, 6, 0.15)", text: "#fbbf24" }
      : { bg: "rgba(22, 163, 74, 0.15)", text: "#4ade80" };

  return (
    <article
      className="flex flex-col rounded-lg p-6 transition-all duration-300"
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 0 0 1px var(--color-purple), 0 0 20px rgba(124,58,237,0.2)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Status badge */}
      <div className="mb-4">
        <span
          className="inline-block rounded-full px-3 py-1 text-xs font-semibold"
          style={{
            backgroundColor: statusColors.bg,
            color: statusColors.text,
            letterSpacing: "0.05em",
            fontFamily: "var(--font-inter)",
          }}
        >
          {status}
        </span>
      </div>

      {/* Title */}
      <h3
        className="mb-2 text-xl font-bold"
        style={{ fontFamily: "var(--font-cinzel)", color: "var(--color-text)" }}
      >
        {title}
      </h3>

      {/* Tagline */}
      <p
        className="mb-3 text-sm font-medium"
        style={{ color: "var(--color-purple-light)" }}
      >
        {tagline}
      </p>

      {/* Description */}
      <p
        className="mb-5 flex-1 text-sm leading-relaxed"
        style={{ color: "var(--color-muted)" }}
      >
        {description}
      </p>

      {/* Tags */}
      <ul className="mb-6 flex flex-wrap gap-2 list-none" role="list" aria-label="Technologies">
        {tags.map((tag) => (
          <li key={tag}>
            <span
              className="inline-block rounded-full px-3 py-1 text-xs font-medium"
              style={{
                backgroundColor: "rgba(124,58,237,0.15)",
                color: "var(--color-purple-light)",
                fontFamily: "var(--font-inter)",
              }}
            >
              {tag}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={ctaHref}
        className="inline-flex items-center text-sm font-semibold transition-colors duration-200 hover:opacity-80"
        style={{ color: "var(--color-blue)", fontFamily: "var(--font-inter)" }}
        aria-label={`${ctaLabel} for ${title}`}
      >
        {ctaLabel} →
      </a>
    </article>
  );
}
