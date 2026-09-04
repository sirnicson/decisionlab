# DecisionLab V2.4.6 Validation Report

## Scope

V2.4.6 is a local Red Rock Analysis workspace proportion and density refinement based on V2.4.5.

Only two production source files differ from V2.4.5:

- `src/styles/app.css`
- `src/components/OnscreenCalculator.tsx`

Package metadata, README and V2.4.6 documentation are also updated.

## Verified implementation

### Workspace

- Default Analysis grid is `minmax(0,1fr) 205px 370px`.
- <=1450px grid is `minmax(0,1fr) 195px 340px`.
- <=1260px uses a two-column Analysis/Journal arrangement with Calculator below the main pane.
- <=960px stacks Analysis, Calculator and Journal.

### Analysis density

V2.4.6 adds only `.redrock-workspace.utility-analysis`-scoped typography and spacing overrides. No global type rules are replaced.

### Journal density

V2.4.6 adds only Analysis-workspace-scoped Journal presentation overrides. `RedRockPage.tsx`, which owns Research Journal drag/drop, sorting, Important/Unmark and Return behaviour, is byte-for-byte unchanged from V2.4.5.

### Calculator empty state

`OnscreenCalculator.tsx` differs from V2.4.5 only by removal of the empty-history helper branch. Calculation History mapping, result dragging/reuse, commit handling, parser and arithmetic logic are otherwise unchanged.

The string `Completed calculations will appear here.` no longer occurs in production source.

## Static checks

- **TS/TSX transpile:** 36 non-declaration TypeScript/TSX source files transpiled with the installed TypeScript compiler with **zero syntax diagnostics**.
- **Production-source diff:** only `OnscreenCalculator.tsx` and `app.css` differ from V2.4.5.
- **Protected data/logic:** `src/data`, `src/engine`, `src/types`, `src/app`, `src/hooks`, `src/features`, and all other components are byte-for-byte unchanged except the explicitly listed Calculator component. In particular, `RedRockPage.tsx` is unchanged.
- **Package version:** advanced from 2.4.5 to 2.4.6.

## Behaviour deliberately protected

No scenario value, answer key, score, tolerance, timer, route, stage lock, report rule, Visual Report calculation, Sea Wolf mechanic, Research Journal interaction mechanic, Calculation History persistence rule or result-reuse mechanic was changed.

## Build note

A dependency-backed Vite production build/browser regression was not run because the packaged project does not include installed local dependencies. Static TypeScript transpile validation and source-diff integrity checks were completed instead. The rebalanced layout should still receive normal hands-on browser validation at the user's target viewport sizes.
