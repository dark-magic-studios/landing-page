import GradientRule from "./GradientRule";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "Booker Blitz",
    tagline: "The wrestling booking simulation you didn't know you needed.",
    description:
      "A desktop-native sim where you run the show — book cards, manage rosters, build rivalries. Built with Tauri and TypeScript for a native feel without the overhead.",
    tags: ["Tauri", "TypeScript", "Desktop App", "Simulation"],
    status: "In Development",
    statusVariant: "amber" as const,
    ctaLabel: "Learn More",
    ctaHref: "#",
  },
  {
    title: "Dark Magic Themes",
    tagline: "VS Code themes that don't apologise for having a point of view.",
    description:
      "A collection of carefully crafted VS Code colour themes for developers who spend most of their day in the editor. High contrast where it matters, easy on the eyes where it doesn't.",
    tags: ["VS Code", "Developer Tools", "Themes"],
    status: "Available",
    statusVariant: "green" as const,
    ctaLabel: "View on Marketplace",
    ctaHref: "#",
  },
];

export default function Projects() {
  return (
    <section id="work" className="py-24 px-6" aria-labelledby="work-heading">
      <div className="mx-auto max-w-6xl">
        <GradientRule />

        <h2
          id="work-heading"
          className="mt-10 mb-12 text-3xl font-bold md:text-4xl"
          style={{ fontFamily: "var(--font-cinzel)", color: "var(--color-text)" }}
        >
          Work
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
