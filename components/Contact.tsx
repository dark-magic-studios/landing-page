import { Mail, ExternalLink, GitBranch } from "lucide-react";
import GradientRule from "./GradientRule";

const socialLinks = [
  {
    icon: Mail,
    label: "hello@darkmagic.com",
    href: "mailto:hello@darkmagic.com",
    ariaLabel: "Send us an email",
  },
  {
    icon: GitBranch,
    label: "GitHub",
    href: "https://github.com/dark-magic-studios",
    ariaLabel: "Dark Magic Studios on GitHub",
  },
  {
    icon: ExternalLink,
    label: "LinkedIn",
    href: "#",
    ariaLabel: "Dark Magic Studios on LinkedIn",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-6xl">
        <GradientRule />

        <h2
          id="contact-heading"
          className="mt-10 mb-4 text-3xl font-bold md:text-4xl"
          style={{ fontFamily: "var(--font-cinzel)", color: "var(--color-text)" }}
        >
          Contact
        </h2>

        <p className="mb-10 text-base" style={{ color: "var(--color-muted)" }}>
          Got a project in mind, or just want to talk shop?
        </p>

        <ul className="flex flex-col gap-4 list-none sm:flex-row sm:gap-8" role="list">
          {socialLinks.map(({ icon: Icon, label, href, ariaLabel }) => (
            <li key={href}>
              <a
                href={href}
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:opacity-80"
                style={{ color: "var(--color-blue-mid)", fontFamily: "var(--font-inter)" }}
                aria-label={ariaLabel}
                {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <Icon size={16} aria-hidden="true" />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
