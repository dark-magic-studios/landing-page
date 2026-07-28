# Graph Report - landing-page  (2026-07-28)

## Corpus Check
- 29 files · ~158,810 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 125 nodes · 115 edges · 17 communities (11 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `592f8e6a`
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

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `scripts` - 5 edges
3. `paths` - 2 edges
4. `Dark Magic Studios — Landing Page` - 2 edges
5. `configurations` - 1 edges
6. `lastRunAtMs` - 1 edges
7. `turnsSinceLastRun` - 1 edges
8. `lastTranscriptMtimeMs` - 1 edges
9. `lastProcessedGenerationId` - 1 edges
10. `trialStartedAtMs` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (17 total, 6 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.11
Nodes (9): navLinks, metadata, CAST, metadata, TARGETS, WORKFLOW, metadata, PRODUCTS (+1 more)

### Community 1 - "Community 1"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 2 - "Community 2"
Cohesion: 0.11
Nodes (5): Deadline, STEPS, SUPPORTED_TOOLS, Services, ROWS

### Community 3 - "Community 3"
Cohesion: 0.20
Nodes (3): stack, ProjectCardProps, projects

### Community 4 - "Community 4"
Cohesion: 0.22
Nodes (8): name, private, scripts, build, dev, lint, start, version

### Community 5 - "Community 5"
Cohesion: 0.22
Nodes (9): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+1 more)

### Community 6 - "Community 6"
Cohesion: 0.29
Nodes (5): cinzel, cormorant, jetbrains, manrope, metadata

### Community 7 - "Community 7"
Cohesion: 0.29
Nodes (7): dependencies, @fontsource/cinzel, @fontsource/inter, lucide-react, next, react, react-dom

### Community 8 - "Community 8"
Cohesion: 0.29
Nodes (6): lastProcessedGenerationId, lastRunAtMs, lastTranscriptMtimeMs, trialStartedAtMs, turnsSinceLastRun, version

## Knowledge Gaps
- **73 isolated node(s):** `version`, `configurations`, `version`, `lastRunAtMs`, `turnsSinceLastRun` (+68 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Community 5` to `Community 4`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Community 7` to `Community 4`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **What connects `version`, `configurations`, `version` to the rest of the system?**
  _73 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.10952380952380952 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._