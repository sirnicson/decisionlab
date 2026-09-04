# Solve It Readiness Lab V2.2 — Validation Report

## V2.2 consolidated UX/UI architecture checks

The V2.2 build was checked against `docs/UIUX_DATA_SHEET_V2_2.md` as the authoritative source of truth.

- Red Rock no longer renders the separate white Task 1/stage navigation rail.
- Red Rock Investigation, Analysis, Report and Visual Report subnavigation is exposed beneath **Red Rock Study** in the persistent dark sidebar.
- Red Rock main workspace now uses two zones after the application sidebar: expanded task canvas + right utility area.
- Investigation, Written Report and Graph Selection show the Research Journal in the right utility area.
- Analysis shows the Research Journal and Calculator together in the right utility area.
- Visual Report shows the Calculator alone in the right utility area.
- The global **Practice clean** card is no longer rendered.
- The standalone **Decision Review** sidebar item, route, button and page have been removed.
- Task 1 detailed answer/explanation review is integrated into Task 1 Result and the final Results experience.
- Task 2 routing, prospect-pool and treatment review is integrated into the final Results experience.
- Task 1 hero support copy is `Red Rock workstream complete. Review feedback below.`
- The meta-explanation beneath Dr. Cross's client debrief has been removed.
- The calculator helper sentence beneath the keypad has been removed.
- Learning Mode uses the multiple-person/team icon; Simulation Mode uses the single-person icon.
- Source syntax parse: 31 TS/TSX files, 0 parse errors.
- CSS brace validation: passed.
- Full dependency-backed Vite/Vitest execution could not be completed in this environment because `npm install` timed out and no `node_modules` directory was available.

## Earlier deterministic data validation retained

The scientific data deck and locked Red Rock/Sea Wolf mechanics were not changed by the V2.2 UX architecture pass. The earlier deterministic validation record is retained below for traceability.

---


This report reflects the **Characteristic-Profiled Initial Prospect Pool correction** applied to the integrated V1.2 build. Characteristic selection is now consequential: each site owns a fixed 12-card profiling candidate universe, and each of the 21 possible two-characteristic selections deterministically derives a six-card Initial Prospect Pool.

| Study | Site | Routing cards | Profiling universe | Characteristic pairs | Distinct derived pools | Prospect paths validated | Declared max | Max-scoring reference trios | Best reachable across characteristic pairs | Route split C/N/R |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| Cinder Bay | Refinery Shore | 10 | 12 | 21 | 17 | 1701 | 100 | 24 | 100–100% | 5/2/3 |
| Cinder Bay | Inner Harbour | 10 | 12 | 21 | 12 | 1701 | 100 | 52 | 100–100% | 5/2/3 |
| Cinder Bay | Outer Breakwater | 10 | 12 | 21 | 11 | 1701 | 100 | 52 | 100–100% | 5/0/5 |
| Tidal Reach | Storm Estuary | 10 | 12 | 21 | 14 | 1701 | 100 | 62 | 100–100% | 5/2/3 |
| Tidal Reach | Agricultural Channel | 10 | 12 | 21 | 13 | 1701 | 100 | 57 | 100–100% | 5/1/4 |
| Tidal Reach | Fuel Runoff Basin | 10 | 12 | 21 | 14 | 1701 | 100 | 60 | 100–100% | 5/0/5 |
| Azure Shelf | Nearshore Film | 10 | 12 | 21 | 13 | 1701 | 100 | 63 | 100–100% | 5/2/3 |
| Azure Shelf | Mid-Shelf Plume | 10 | 12 | 21 | 13 | 1701 | 100 | 70 | 100–100% | 5/2/3 |
| Azure Shelf | Deep Shelf | 10 | 12 | 21 | 16 | 1701 | 80 | 11 | 80–80% | 5/0/5 |

## Validation coverage

For every one of the 9 Sea Wolf sites the validator now checks:

- exactly 10 routing microbes and the locked Current / Next / Return rule;
- exactly 12 fixed treatment-profiling candidates, separate from routing and prospect-round cards;
- all **21** possible two-characteristic combinations (`7 choose 2`);
- exactly 6 unique microbes derived for every characteristic pair;
- multiple distinct six-card pools are actually produced;
- the demonstrated A + Desired Trait profile reproduces the validated reference six;
- four prospect rounds of exactly 3 candidates each;
- all **81** prospect-selection paths for every characteristic-derived six-card pool — **1,701 paths per site**;
- every reachable final pool contains exactly 10 unique microbes;
- every 3-of-10 treatment combination on each reachable final pool;
- multiple optimal trios are accepted;
- Azure Shelf Site 3 never exceeds its deliberately constrained 80% maximum under any characteristic pair or prospect path;
- Prospect judgements are computed against the learner’s actual derived pool and remaining candidate rounds when `Confirm selection` is pressed; the classification is stored for Results/Review and is not revealed as live Strong/Weak feedback on selection.

## Red Rock

The Task 1 Red Rock implementation remains structurally unchanged by this correction. Its existing deterministic answer, report-field, Visual Report, stage-lock and tool-placement validation remains in force.

## Status

**Characteristic-to-pool implementation: corrected in V1.2.** No deferral to V1.3 is required.


## V1.2.2 UI review checks

The client-narrative review pass additionally verifies by source inspection that:

- Sea Wolf difficulty-tier labels are absent from learner-facing source/data;
- no redundant `1 2 3` site progress row remains;
- prospect selection uses a provisional local choice followed by explicit confirmation;
- treatment-selected microbes are filtered out of the remaining available pool;
- the Treatment Result explanation is generated from the actual selected trio and therefore identifies the specific failed condition(s);
- client debriefs supplement the existing Task 1 and final Results scorecards without changing any scoring formulas.


## V1.2.2 cross-workstream client voice
- Red Rock Objective and Learning Mode prompts now use Dr. Elena Cross in first person through the same compact client-representative component used for Dr. Paula Reyes.
- This is a narrative/UI change only; Red Rock mechanics, scoring and stage locks remain sealed.

## V1.2.4 sponsor handover and evidence-quality checks

- Red Rock Objective screens now use a first-person Dr. Elena Cross senior-client welcome, case-specific decision framing, consultant mandate, working evidence/tools and the 35-minute full-simulation allowance.
- Red Rock opening CTA is `Review the Brief →` for Salvanova, Caldera and Norvale.
- Sea Wolf workstream introduction now begins with the same first-person Dr. Paula Reyes senior-client welcome and uses `Review the Brief →` before Site 1.
- Source inspection confirms the three Red Rock Study Information sections contain no explicit relevance hints such as `not decision-critical`, `not direct drivers`, or equivalent learner-facing statements.
- Every low-relevance Red Rock source fact is numeric/measurable and remains neutrally draggable into the Research Journal.
- Locked distractor counts: Salvanova 2; Caldera 5; Norvale 2.
- TypeScript transpile syntax check: 30 TS/TSX source files, 0 syntax errors.
- Sea Wolf deterministic validation: 0 issues.
- Task mechanics, answer keys, scoring, visual system and Home mode cards are unchanged.


## V1.2.5 contextual evidence interaction checks

- Every draggable Study Information fact is mapped to an exact inline phrase in its source paragraph.
- All Study Information mappings resolve to valid authored fact IDs.
- All Red Rock Investigation exhibits contain structured row/column or label/series source data for tabular rendering.
- Authored exhibit evidence bindings resolve to valid exhibit and fact IDs.
- Duplicate Study Information evidence-card rendering has been removed from the Red Rock Investigation UI.
- Exhibit cells and inline Study Information evidence support both drag-and-drop and click-to-add.

## V2.1 engagement-home checks

- Home uses one lime engagement shell with a full-width shared heading/introduction above both lower panels.
- Desktop lower layout contains two equal panels: stacked workstreams on the left and mode/study controls on the right.
- Learning Mode uses the supplied team icon and Simulation Mode uses the supplied single-person icon, normalised to `#8FC21F` / `#132019`.
- No new icon dependency was added.
- Dr. Elena Cross Analysis prompt matches the V2.1 first-person client wording.
- 30 TS/TSX source files were syntax-parsed with the TypeScript 5.8 transpiler with zero syntax diagnostics.
- CSS brace balance passed.
- Full dependency-backed Vite/Vitest build still requires `npm install` because node_modules are not present in the execution environment.

