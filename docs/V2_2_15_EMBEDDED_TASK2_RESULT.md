
# V2.2.15 — Embedded Task 2 Result + Results Navigation Simplification

This section is authoritative wherever earlier Result-page, top-level navigation, Sea Wolf completion, Performance Snapshot or Site Profiling review notes conflict with it. **No Red Rock or Sea Wolf dataset, answer key, routing key, prospect logic, treatment-effectiveness rule, scoring weight, timer, persistence rule or Learning/Simulation behaviour changes in V2.2.15.**

## Results are task-completion states, not a third learning-path module

The persistent dark sidebar contains only:

- `01 Red Rock Study`
- `02 Sea Wolf Study`

Remove the standalone `03 Results` item. A learner does not leave the workstream to enter a third Results module.

The standalone learner-facing `/results` route and aggregate Results page are retired. Internal scoring/analytics functions may remain available for persistence, validation or future reporting, but they are not exposed as a separate learning-path destination.

## Task 1 completion behaviour

Task 1 remains unchanged structurally:

`Red Rock workstream → Task 1 Result / Review`

The Red Rock item remains the active learning-path item while its result/review is displayed.

## Task 2 completion behaviour

Sea Wolf now ends inside the Sea Wolf workstream:

`Introduction → Site 1 → Site 2 → Site 3 → Task 2 Result / Review`

After the final Site 3 treatment result, the action is `Review Task 2 Result`.

On activation:

- mark the Sea Wolf attempt complete;
- persist the completed attempt and session history exactly as before;
- remain on the Sea Wolf route/workspace;
- keep `Sea Wolf Study` active in the sidebar;
- change the topbar title to `Task 2 Result`;
- render the embedded Task 2 Result / Review in place of the Sea Wolf working interface;
- do not redirect to a standalone Results page.

A resumed completed Sea Wolf attempt opens directly to this embedded Task 2 Result state.

## Task 2 result hierarchy

Use the same broad visual/result grammar as Task 1:

**Task result hero → Dr. Reyes Client Debrief → Primary Concern + Performance Snapshot → Detailed Review → Return to Command Centre.**

Do not insert a separate Workstream 02 completion strip between the hero and the client debrief.

## Task 2 hero

The Task 2 hero uses the approved darker-lime result surface and score ring. It contains:

- `WORKSTREAM 02 · DR. PAULA REYES`;
- the selected Sea Wolf study title: `Cinder Bay`, `Tidal Reach` or `Azure Shelf`;
- the score ring containing the Task 2 total as a whole number;
- `Sea Wolf workstream complete. Review feedback below.`

Remove learner-facing hero copy inherited from the old aggregate Results page:

- `Fairhaven Environmental Trust · Engagement Review`;
- `Practice Result`;
- readiness-band copy such as `Developing Readiness`;
- `/ 100` from inside or beside the score ring;
- any duplicate Workstream 02 completion score/card.

The Task 2 score is shown once visibly in the hero ring. The internal score remains out of 100.

## Performance Snapshot presentation

Keep the four locked Task 2 dimensions and weights:

- Site Profiling — 10% weight;
- Categorisation & Transfer — 30% weight;
- Prospect Selection — 25% weight;
- Treatment Construction — 35% weight.

Display the earned weighted contribution only, not an `earned / maximum` fraction. Example:

- `6.7`, not `6.7 / 10`;
- `17.7`, not `17.7 / 30`;
- `16.8`, not `16.8 / 25`;
- `29.8`, not `29.8 / 35`.

The percentage weight shown under each dimension supplies the denominator/context. **Scoring formulas and weights do not change.**

## Site Profiling terminology

In Detailed Review · Site Profiling, replace the learner-facing label `Reference lens:` with:

`Expected:`

Use:

- `Selected: ...`
- `Expected: ...`
- `Correct` or `Needs review`

Do not use `Reference lens` anywhere in learner-facing Task 2 result copy.

## Detailed-review density

Keep the V2.2.14 streamlined review scope:

- Detailed Review · Site Profiling;
- Detailed Review · Treatment Construction.

Do not restore the removed detailed Categorisation & Transfer or Prospect Selection sections merely because those dimensions remain in the Performance Snapshot.

Rows should remain compact and decision-readable, with status aligned to the right and no large blank review areas. Treatment Construction continues to show only submitted treatment, achieved effectiveness, maximum feasible effectiveness and status.

## Closing action

The embedded Task 2 result ends with a single primary action:

`Return to Command Centre`

There is no separate Results navigation action.

## V2.2.15 preservation lock

V2.2.15 changes only result placement, navigation and learner-facing result presentation. Preserve without modification:

- all Red Rock mechanics, data, answers and scoring;
- all Sea Wolf site/deck data;
- Current / Next / Return reference logic;
- transferred-microbe reassessment;
- Characteristic selection and Initial Prospect Pool derivation;
- four prospect rounds and prospect evaluation;
- Treatment Construction and maximum-feasible-effectiveness logic;
- Task 2 weights `10 / 30 / 25 / 35`;
- timers;
- persistence/autosave;
- session-history recording;
- Learning Mode vs Simulation Mode feedback restrictions.
