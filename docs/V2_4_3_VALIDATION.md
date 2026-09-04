# DecisionLab V2.4.3 Validation Report

## Scope

V2.4.3 implements the approved progressive-disclosure and review-density iteration list while preserving V2.4.2 study data and mechanics.

## Source changes

Functional/UI source changes are limited to:

- `src/app/App.tsx`
- `src/components/IntegratedResultReview.tsx`
- `src/styles/app.css`

Release metadata/documentation is updated separately.

## Checks completed

- TypeScript/TSX transpile syntax check passed for all 35 non-declaration source files using TypeScript 5.8.3.
- CSS opening/closing brace counts match.
- Red Rock sidebar now renders subpages only for the active mother stage.
- Sea Wolf sidebar now renders all three sites as mother sections and expands only the current site.
- Sea Wolf Transfer Review remains conditional and does not introduce free navigation.
- Home mode-card description measure is 24ch.
- Graph Selection card/preview footprint is enlarged without changing chart-option data or click behaviour.
- Red Rock and Sea Wolf Detailed Review groups use one shared collapsed-by-default disclosure implementation.
- Disclosure controls use native buttons and `aria-expanded`.
- Red Rock and Sea Wolf scoring/data source trees are unchanged from V2.4.2.

## Protected behaviour

No scenario data, answer values, scoring weights, tolerances, timers, task progression rules, journal mechanics, Sea Wolf routing, prospect selection or treatment calculations were intentionally modified.

## Build note

A dependency-backed Vite production build was not run in the packaging environment. Static TypeScript/TSX transpilation, CSS structural checks and source-tree diff verification were used for this release.

## Protected-tree hash verification

The following V2.4.2 → V2.4.3 source trees are byte-identical:

- `src/data` — SHA-256 tree digest `ca128e247f1bbecd68968d7172bd4a1d5c1d767bb71dcab5f6ded73a7fab51c0`
- `src/engine` — `ee7aa43475b709f8d90d580fc192b90f0a4412a3156050208386b8f69a240561`
- `src/types` — `eede7471a6062862870c61cb53acafbb10209612ed938be74d7d5f55e87b5e0b`
- `src/features/redrock` — `c561a613a9328ded62faa519e758f4ac4030d19b99a298a22f6cf6151818d2f3`
- `src/features/seawolf` — `53ffbb51949ce4eddecd9c27fd8bf6d849fb9b28e38b4a16221e9a3748b6b35d`
- `src/features/home` — `9c9224f2118c0eba9f00bec9d1115828e9bb51f730eec286603d1de62c50fb6a`
- `src/hooks` — `44763c565bc43953d8489acc936c8c81977be2c8a083ff8d161317e1ce92790b`
