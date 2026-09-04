# DecisionLab V2.3.2 Validation Report

## Scope

V2.3.2 is a focused sidebar-brand refinement applied on top of V2.3.1. No task mechanics were intentionally changed.

## Brand acceptance checks

- PASS — lime `D` mark rotates **10° clockwise**.
- PASS — glyph counter-rotates **10°** so the `D` remains upright inside the tilted block.
- PASS — `D` is centred with a full-size grid centring wrapper.
- PASS — `D` uses the Apple-oriented system font stack: `-apple-system, BlinkMacSystemFont, SF Pro Display, Helvetica Neue, Arial, sans-serif`.
- PASS — mark reduced to **22px** beside an **18px** DECISIONLAB wordmark, keeping the badge only slightly taller than the name.
- PASS — `Client Advisory Workspace` is removed from beneath the sidebar logo.
- PASS — `Client Advisory Workspace` remains in the persistent application topbar and remains the global replacement for `Independent Preparation Workspace`.

## Source integrity

Compared with V2.3.1:

- `src/app/App.tsx` changed only for sidebar brand markup.
- `src/styles/app.css` changed only for the DecisionLab brand-lock-up styling block.
- `src/data` is unchanged.
- `src/engine` is unchanged.
- package version changed from `2.3.1` to `2.3.2`.

## Syntax validation

- PASS — changed `App.tsx` transpiles through TypeScript `transpileModule` with no syntax diagnostics.
- A full dependency-backed Vite build was not run because project dependencies are not installed in the packaging environment.

## Behavioural lock

V2.3.2 does not change Red Rock or Sea Wolf datasets, scoring, timers, persistence, routing, prospect logic, treatment logic, embedded result behaviour, or Learning/Simulation separation.
