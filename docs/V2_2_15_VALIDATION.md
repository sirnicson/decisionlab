# V2.2.15 Validation

## Scope
V2.2.15 changes learner-facing result placement/navigation and Task 2 result presentation only.

## Verified implementation changes
- `03 Results` removed from the persistent sidebar.
- Standalone `/results` route removed from `App.tsx`.
- Legacy `ResultsPage.tsx` removed from the learner-facing source tree.
- Completed Sea Wolf attempts render `Task2ResultPage` inside `/seawolf`.
- Final Site 3 action is `Review Task 2 Result` and no longer navigates away from Sea Wolf.
- Completed Sea Wolf resume state opens `/seawolf`.
- Topbar changes to `Task 2 Result` for a completed Sea Wolf attempt.
- Task 2 hero uses Workstream 02 + selected study + a single visible score ring + completion copy.
- Redundant Workstream 02 completion strip is removed.
- Task 2 Performance Snapshot shows earned weighted contribution only; percentage weights remain visible.
- Site Profiling learner-facing label is `Expected`, replacing `Reference lens`.
- Streamlined Site Profiling and Treatment Construction review scope from V2.2.14 is preserved.

## Preservation checks
No modifications were made to:
- `src/data/redrock/scenarios.ts`
- `src/data/seawolf/scenarios.ts`
- `src/engine/scoring/redrock.ts`
- `src/engine/scoring/seawolf.ts`
- `src/engine/scoring/results.ts`
- Sea Wolf validation datasets or scoring weights.

## Build note
A dependency-backed TypeScript/Vite build cannot run in the packaging environment because project npm dependencies are not installed. Changed TS/TSX files are syntax-checked separately with the installed TypeScript compiler API, and source-level route/label assertions are run before packaging.
