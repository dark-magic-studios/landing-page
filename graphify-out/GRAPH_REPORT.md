# Graph Report - hocus-page-expansion  (2026-08-05)

## Corpus Check
- 30 files · ~159,502 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 182 nodes · 169 edges · 23 communities (15 shown, 8 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7ad81bf1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `compilerOptions` - 16 edges
3. `scripts` - 5 edges
4. `scripts` - 5 edges
5. `configurations` - 2 edges
6. `HocusPersona` - 2 edges
7. `paths` - 2 edges
8. `Dark Magic Studios — Landing Page` - 2 edges
9. `paths` - 2 edges
10. `Dark Magic Studios — Landing Page` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (23 total, 8 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.15
Nodes (5): navLinks, metadata, metadata, PRODUCTS, metadata

### Community 1 - "Community 1"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 2 - "Community 2"
Cohesion: 0.11
Nodes (5): Deadline, STEPS, SUPPORTED_TOOLS, DOMAINS, ROWS

### Community 3 - "Community 3"
Cohesion: 0.20
Nodes (3): stack, ProjectCardProps, projects

### Community 4 - "Community 4"
Cohesion: 0.11
Nodes (17): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+9 more)

### Community 5 - "Community 5"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 6 - "Community 6"
Cohesion: 0.29
Nodes (5): cinzel, cormorant, jetbrains, manrope, metadata

### Community 7 - "Community 7"
Cohesion: 0.29
Nodes (7): dependencies, @fontsource/cinzel, @fontsource/inter, lucide-react, next, react, react-dom

### Community 8 - "Community 8"
Cohesion: 0.29
Nodes (6): lastProcessedGenerationId, lastRunAtMs, lastTranscriptMtimeMs, trialStartedAtMs, turnsSinceLastRun, version

### Community 17 - "Community 17"
Cohesion: 0.11
Nodes (17): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+9 more)

### Community 18 - "Community 18"
Cohesion: 0.22
Nodes (6): HocusCastProps, HocusPersona, CAST, metadata, TARGETS, WORKFLOW

### Community 19 - "Community 19"
Cohesion: 0.29
Nodes (7): dependencies, @fontsource/cinzel, @fontsource/inter, lucide-react, next, react, react-dom

## Knowledge Gaps
- **112 isolated node(s):** `version`, `lastRunAtMs`, `turnsSinceLastRun`, `lastTranscriptMtimeMs`, `lastProcessedGenerationId` (+107 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `version`, `lastRunAtMs`, `turnsSinceLastRun` to the rest of the system?**
  _112 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Should `Community 5` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Community 17` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._