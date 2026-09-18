[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
![Projects](https://img.shields.io/badge/projects-26-10b981?style=classic)
[![Last Update](https://img.shields.io/github/last-commit/daftAI2026/awesome-jev?label=Last%20update&style=classic)](https://github.com/daftAI2026/awesome-jev)
[![Site](https://img.shields.io/badge/site-awesomejev.cc-000?style=classic)](https://awesomejev.cc)

# Awesome JEV

A curated list of **TypeSafe [Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev)** / **System One** ecosystem projects — official SDKs, agent skills, browser & computer-use demos, MCP connectors, routers, and community awesome-lists — plus high-signal X posts. Searchable navigation site mirrors this list.

**Site:** [awesomejev.cc](https://awesomejev.cc) · **Data:** [`data/items.json`](data/items.json)

**Docs:** [Architecture](docs/architecture.md) · [Data model](docs/data-model.md) · [Collector](docs/collector.md) · [Contributing](CONTRIBUTING.md)

## Contents

- [Official SDKs & skills](#official-sdks--skills)
- [Awesome lists](#awesome-lists)
- [Agents, demos & apps](#agents-demos--apps)
- [Browser & computer use](#browser--computer-use)
- [MCP, routers & adapters](#mcp-routers--adapters)
- [Site](#site)
- [Contributing](#contributing)
- [License](#license)

## Official SDKs & skills

- [**typesafe-sdk-js**](https://github.com/typesafe-ai/typesafe-sdk-js) - Official TypeScript/JavaScript SDK for the TypeSafe API. `TypeScript`
- [**typesafe-sdk-python**](https://github.com/typesafe-ai/typesafe-sdk-python) - Official Python library for the TypeSafe API. `Python`
- [**system-one-adapter-python**](https://github.com/typesafe-ai/system-one-adapter-python) - Drop-in TypeSafeClient replacement backed by LLM APIs. `Python`
- [**skills**](https://github.com/typesafe-ai/skills) - Agent skills for building with TypeSafe's System One API.

## Awesome lists

- [**awesome-jev-by-typesafe**](https://github.com/Anil-matcha/awesome-jev-by-typesafe) - Evidence-backed use cases, patterns, prompts, and starter code for TypeSafe Jev. `Python`
- [**awesome-typesafe**](https://github.com/AbdelStark/awesome-typesafe) - Official resources and community projects for TypeSafe, System One, and Jev. `CSS`
- [**awesome-jev (yibie)**](https://github.com/yibie/awesome-jev) - Public projects, integrations, and discussions built on Jev. `Python`
- [**awesome-jev (AnotiaWang)**](https://github.com/AnotiaWang/awesome-jev) - Awesome Jev / TypeSafe System One applications and libraries.

## Agents, demos & apps

- [**openjev**](https://github.com/TheoLeeCJ/openjev) - Can we run something like Jev on a 3090 at home? `Python`
- [**jevlike**](https://github.com/vinnylarouge/jevlike) - Community Jev-like model / tooling experiment. `Python`
- [**jev-trader**](https://github.com/jarrodwatts/jev-trader) - One AI trade decision every Monad block — Jev on Kuru. `TypeScript`
- [**typesafe-mario**](https://github.com/fhshaik/typesafe-mario) - TypeSafe/Jev agent that plays Super Mario Bros. `Python`
- [**foreman**](https://github.com/thruwire/foreman) - Software Factory Foreman based on TypeSafe Jev. `Python`
- [**jev-review**](https://github.com/devagrawal09/jev-review) - Staged code-review workflow + dashboard with TypeSafe Jev. `TypeScript`
- [**jev-review (MCP)**](https://github.com/NiazMorshed2007/jev-review) - Local-first MCP plugin for continuous quality review powered by Jev. `TypeScript`
- [**skillbox**](https://github.com/kitze/skillbox) - Self-hosted skills library for AI agents; optional Jev recommendations. `TypeScript`
- [**jev-compaction**](https://github.com/picaye/jev-compaction) - Hermes context compaction scored by TypeSafe Jev. `JavaScript`
- [**tenet**](https://github.com/zoidsh/tenet) - Review gate for agent-written code (plain-language rules per commit). `Go`

## Browser & computer use

- [**jev-ultrafast**](https://github.com/browser-use/jev-ultrafast) - Browser Use × Jev Ultrafast — high-speed browser automation. `Python`
- [**typesafe-computer-use**](https://github.com/awlevin/typesafe-computer-use) - Computer use ~$0.0002/step with TypeSafe classify + click (macOS). `Python`
- [**jev-browser**](https://github.com/jkudish/jev-browser) - Browser use using TypeSafe's Jev model. `TypeScript`
- [**jev-browser-use**](https://github.com/wy-coliney/jev-browser-use) - Faster browser ops: Jev clicks, Codex thinks/verifies. `JavaScript`

## MCP, routers & adapters

- [**jev-router**](https://github.com/gargpratyush/jev-router) - Route to the cheapest model in Claude Code using Jev. `JavaScript`
- [**jev-mcp**](https://github.com/jkudish/jev-mcp) - Proof of concept MCP for TypeSafe's Jev model. `TypeScript`
- [**typesafe-mcp**](https://github.com/itsmostafa/typesafe-mcp) - MCP connector for TypeSafe AI's Jev model. `Go`
- [**Jevbridge**](https://github.com/gamesonrblx/Jevbridge) - ACP/MCP adapter bridging TypeSafe Jev with any LLM. `TypeScript`

## Site

This repo ships a Vite + React + Tailwind + shadcn (base-nova) navigation site (section boards + Fuse.js search). Deployed on **Cloudflare Workers** (`npm run build` → static assets; push to `main` auto-deploys).

See [docs/architecture.md](docs/architecture.md) for IA and deploy details.

```bash
npm install
npm run dev
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the `data/items.json` schema, PR hygiene, and link-only policy.

- Prefer PRs that add **real, maintained** open-source projects related to TypeSafe Jev / System One (or high-signal X posts via the collector bot).
- Keep entries in `data/items.json` structured (`id`, `type`, `title`, `summary`, `tags`, `url`, `sourceMeta`).
- One project per PR when possible; include a short summary and tags.
- Links only — no invented tweet IDs or PLACEHOLDER entries.

## License

This repository is public. Listed third-party projects keep their own licenses; we do not claim ownership of any third-party project. Curated list text and site code in this repo are available for reuse under the same spirit as typical awesome-lists (attribution appreciated).
