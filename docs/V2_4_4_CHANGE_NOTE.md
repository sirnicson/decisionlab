# DecisionLab V2.4.4 — Salvanova model consistency correction

## Phase

**Final correction & consolidation.**

V2.4.4 implements the two modelling decisions approved in the V2.4.4 iteration list. The release corrects only the Salvanova main-study model and direct dependencies; it does not reopen unrelated Red Rock, Sea Wolf, scoring or UI mechanics.

## Work package A — hare projection

### Approved rule

`Next-year hare population = (current hare population × 1.10) − 75,000`

The approved whole-hare trajectory is:

`500,000 → 475,000 → 447,500 → 417,250 → 383,975 → 347,373`

### Direct propagation

- Salvanova Exhibit 1 `With Wolves` Year 2–5 values are corrected.
- Bound fact `ex1-y5-wolves` remains the same identity but now resolves to **347,373 hares**.
- Analysis Year-5 benchmark changes from **386,890** to **347,373**.
- Relocation benchmark changes from **22.46%** to **13.64%**.
- Written Report field `s-r6` changes from **386,890** to **347,373**.
- Result Review requires no separate patch because it reads current scenario Analysis/Report definitions.

### Implementation-audit clarification

The V2.4.4 planning note anticipated a possible Written Report relocation dependency. Source inspection confirmed that the current Written Report has no relocation-percentage field. Therefore no new field was introduced; the relocation correction remains Analysis-only. This preserves the existing report structure and scoring grammar.

## Work package B — tourism projection

### Approved rule

Tourism change is proportional at **$5,000 per percentage point of vegetation change from the 80% baseline**.

Vegetation remains:

`80 → 85 → 89 → 94 → 98 → 100%`

Tourism `$000` becomes:

`0 → 25 → 45 → 70 → 90 → 100`

Only Year 2 and Year 3 change:

- Year 2: **$50,000 → $45,000**
- Year 3: **$75,000 → $70,000**

The established Year-5 outputs remain unchanged:

- no-intervention tourism loss: **$75,000**;
- full-recovery tourism gain: **$100,000**.

No Analysis, Written Report, Graph Selection or Visual Report answer key changes were required for tourism.

## Persistence safeguard

A Salvanova-specific session model revision is introduced.

For pre-V2.4.4 saved Salvanova sessions only:

- exact former model benchmark `386,890` in Analysis/Report is refreshed to `347,373`;
- exact former relocation benchmark `22.46` is refreshed to `13.64`;
- collected Year-5 hare evidence is refreshed to `347,373 hares`;
- collected Exhibit 2 Year-2/Year-3 tourism evidence is refreshed to `$45,000` / `$70,000`;
- journal order and Important state are preserved;
- non-benchmark learner-entered answers are not overwritten;
- Caldera, Norvale, Sea Wolf and unrelated session state are not migrated.

New Salvanova sessions are stamped with the current model revision at creation.

## Deliberately unchanged

- Salvanova No-wolves hare series
- Salvanova Study Information assumptions
- Salvanova vegetation trajectory
- Salvanova deer values
- $75,000 no-intervention tourism-loss answer
- $100,000 full-recovery tourism-gain answer
- Salvanova Graph Selection task and accepted chart types
- Visual Report Cases 1–6
- Caldera Marsh
- Norvale Highlands
- all Sea Wolf data/decks/scoring
- Red Rock scoring weights and scoring engine
- timers, locks and navigation
- Learning / Simulation rules
- Research Journal sorting, Important/Unmark and Return mechanics
- DECISIONLAB branding and CSS
