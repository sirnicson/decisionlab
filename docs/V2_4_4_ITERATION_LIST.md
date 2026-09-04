# DecisionLab — V2.4.4 Iteration List

## Phase

**Final correction & consolidation.**

## Salvanova Forest — modelling consistency pass

V2.4.4 addresses two previously deferred Salvanova modelling questions. The hare-projection rule and the tourism-projection rule have now both been explicitly decided. They remain separate controlled work packages and must be implemented and validated independently before the final Salvanova regression pass.

---

## 1. Hare-projection mechanics — APPROVED MODEL CORRECTION

### Decision

Use the stated Salvanova case assumptions as the authoritative model rather than preserving the inherited Year-5 walkthrough value.

The `With wolves` projection will use:

`Next-year hare population = (current hare population × 1.10) − 75,000`

where:

- initial hare population = **500,000**;
- annual hare growth = **10%**;
- wolves released = **150**;
- consumption per wolf per year = **500 hares**;
- annual predation = **75,000 hares**.

Use **nearest whole hare** as the explicit rounding rule.

### Corrected With-wolves projection

| Period | Hare population |
|---|---:|
| Year 0 | 500,000 |
| Year 1 | 475,000 |
| Year 2 | 447,500 |
| Year 3 | 417,250 |
| Year 4 | 383,975 |
| Year 5 | 347,373 |

The existing `No wolves` series is already consistent with 10% annual compounding and should remain unchanged.

### Why this correction is being made

The current app combines the stated 10% growth and 75,000 annual predation assumptions with an inherited `With wolves` series that effectively behaves like an approximately 5% annual decline after Year 1. This makes the evidence and the learner-facing calculation logic internally inconsistent.

V2.4.4 will make the stated assumptions and the displayed projection mathematically reconcilable.

---

## 1A. Upstream/source changes

Keep the correction local to the Salvanova scenario source.

### Change

- Replace only the Salvanova Exhibit 1 `With wolves` Year 2–5 values with the corrected recurrence values.
- Keep Year 0 and Year 1 where they already agree with the model.
- Retain the existing `No wolves` projection unchanged.
- Keep the Study Information assumptions unchanged because they already state the intended model.
- Keep existing fact IDs and bindings wherever possible so evidence identity and persistence compatibility are preserved.

### Explicitly preserved

- Exhibit 1 labels and presentation structure;
- draggable/click-add evidence behaviour;
- Research Journal interaction mechanics;
- chart/table design;
- `No wolves` values.

---

## 1B. Direct downstream changes

Only values that mathematically depend on the corrected Salvanova `With wolves` projection should change.

### Investigation / Exhibit 1

Update the `With wolves` series to:

`500,000 → 475,000 → 447,500 → 417,250 → 383,975 → 347,373`

### Research Journal

Retain the existing Year-5 fact identity, but update its value to:

`With wolves · Year 5 = 347,373 hares`

### Analysis

Update the expected Year-5 hare population from:

`386,890 → 347,373`

Recalculate the relocation percentage required to reach a target population of 300,000:

`(347,373 − 300,000) / 347,373 × 100 ≈ 13.64%`

Update only the answer keys/tolerances directly dependent on these values.

### Written Report

Replace the old dependent expected values:

- Year-5 hare population: `386,890 → 347,373`;
- relocation requirement: `22.46% → 13.64%`.

Report wording, response mechanics and scoring structure remain unchanged.

### Result Review

Detailed Review should inherit the corrected expected values from the same canonical answer definitions. Do not manually patch result-page values independently.

---

## 1C. Persistence / saved-attempt safeguard

Existing saved Salvanova attempts may contain the obsolete `386,890` and `22.46%` values.

Implement a **Salvanova-specific model revision safeguard** so older saved state does not silently retain obsolete model-dependent values.

Preferred behaviour:

- identify saved attempts created before the corrected Salvanova model revision;
- invalidate or refresh only the affected Salvanova model-dependent fields/evidence;
- preserve unrelated Red Rock progress where safe;
- do not reset Caldera, Norvale, Sea Wolf, global settings, or the entire DecisionLab session.

The exact persistence implementation should be chosen after inspecting the current V2.4.3 save-state structure.

---

## 1D. Guardrails — prevent unintended global consequences

The hare-model correction must **not** change:

- Caldera Marsh data, answers or mechanics;
- Norvale Highlands data, answers or mechanics;
- any Sea Wolf dataset, stage, deck, allocation or scoring logic;
- Red Rock scoring weights;
- timers;
- Learning / Simulation behaviour;
- Red Rock stage locks or navigation;
- Research Journal sorting, Important/Unmark or Return mechanics;
- CSS, branding or general UI architecture;
- Graph Selection mechanics;
- vegetation values;
- deer values;
- tourism values as part of this hare correction;
- Visual Report Cases 1–6.

The six Visual Report cases remain standalone problems with their own case-specific assumptions and should not automatically inherit the main Salvanova hare recurrence.

---

## 1E. Validation required before V2.4.4 completion

### Dependency sweep

Search the V2.4.3 source for all representations of the old model-dependent values, including:

- `386890`;
- `386,890`;
- `22.46`.

Classify every occurrence before changing it.

Only occurrences belonging to the main Salvanova programme model should be updated. Historical documentation, standalone mini-case data, or unrelated scenarios must not be changed merely because the same number appears.

### End-to-end consistency check

Verify the corrected chain:

`Study Information → Exhibit 1 → Research Journal → Analysis → Written Report → Result Review`

Expected primary values:

- Year 5 with wolves = **347,373 hares**;
- relocation to 300,000 = **13.64%**.

### Protected-source validation

Compare protected source areas against V2.4.3 and confirm that unrelated Red Rock, Sea Wolf and global application mechanics remain unchanged.

Run the usual static TypeScript/transpile checks and targeted behavioural assertions after the correction.

---

## 2. Intermediate tourism projection — APPROVED MODEL CORRECTION

### Decision

Lock the Salvanova tourism model as **proportional: $5,000 per percentage point of vegetation change from the 80% baseline**.

This is the direct equivalent of the stated case relationship:

`every 5 percentage-point vegetation change = $25,000 tourism revenue change`

Therefore:

`$25,000 ÷ 5 = $5,000 per percentage point`

Use the 80% vegetation baseline as the zero-change reference point.

### Corrected with-wolf tourism trajectory

The approved vegetation trajectory remains unchanged:

`80% → 85% → 89% → 94% → 98% → 100%`

The corresponding tourism-change series should therefore be:

| Period | Vegetation cover | Change from 80% baseline | Tourism revenue change |
|---|---:|---:|---:|
| Year 0 | 80% | 0 pp | $0 |
| Year 1 | 85% | +5 pp | $25,000 |
| Year 2 | 89% | +9 pp | $45,000 |
| Year 3 | 94% | +14 pp | $70,000 |
| Year 4 | 98% | +18 pp | $90,000 |
| Year 5 | 100% | +20 pp | $100,000 |

This means only the intermediate Year 2 and Year 3 tourism values require correction:

- Year 2: `$50,000 → $45,000`;
- Year 3: `$75,000 → $70,000`.

Year 0, Year 1, Year 4 and Year 5 already conform to the proportional rule and remain unchanged.

### Why this correction is being made

The current Exhibit 2 tourism series is mostly consistent with the stated proportional relationship, but the Year 2 and Year 3 values do not reconcile mathematically with the learner-facing rule. The correction removes that internal inconsistency without changing the established Year-5 economic conclusions.

---

## 2A. Upstream/source changes

Keep this correction local to the Salvanova Exhibit 2 tourism series.

### Change

- Preserve the approved vegetation trajectory unchanged.
- Replace only the Year 2 and Year 3 tourism values with `$45,000` and `$70,000` respectively.
- Preserve the Exhibit 2 `$000` storage/display convention where used, so the underlying series becomes conceptually `0, 25, 45, 70, 90, 100`.
- Keep existing fact IDs/bindings wherever possible so evidence identity and persistence compatibility are preserved.

### Explicitly preserved

- Study Information wording and baseline assumptions;
- the 80% vegetation baseline;
- the Year-5 no-intervention vegetation assumption of 65%;
- the with-wolf vegetation trajectory;
- Exhibit 2 visual/table structure;
- draggable/click-add evidence behaviour;
- Research Journal interaction mechanics.

---

## 2B. Direct downstream changes

Only values that directly represent the corrected intermediate tourism evidence should change.

### Investigation / Exhibit 2

Correct the tourism series from:

`$0 → $25k → $50k → $75k → $90k → $100k`

to:

`$0 → $25k → $45k → $70k → $90k → $100k`

### Research Journal

Any newly collected Year 2 / Year 3 tourism evidence must resolve to:

- `Tourism revenue · Year 2 = $45,000`;
- `Tourism revenue · Year 3 = $70,000`.

Previously saved Year 2 / Year 3 tourism evidence should resolve against the corrected canonical Exhibit 2 data rather than continuing to display stale `$50,000` / `$75,000` values.

### Analysis / Written Report / Results

No principal answer-key change is expected because the established Year-5 economic conclusions already conform to the approved proportional model:

- 80% → 65% = −15 percentage points → **$75,000 annual tourism loss**;
- 80% → 100% = +20 percentage points → **$100,000 additional annual tourism revenue**.

These values should remain unchanged unless the implementation audit identifies a hidden direct dependency on the old Year 2 / Year 3 evidence values.

### Graph Selection

No change. The Salvanova Graph Selection task compares vegetation values, not the intermediate tourism trajectory.

### Visual Report Cases 1–6

No change. The six Visual Report cases remain standalone problems with their own case-specific assumptions.

---

## 2C. Persistence / saved-attempt safeguard

Reuse the same Salvanova-specific model-revision safeguard introduced for the hare correction where practical.

For tourism-specific stale state:

- detect previously saved Year 2 / Year 3 Exhibit 2 tourism evidence;
- refresh those values against current canonical metadata;
- preserve journal order, Important/Unmark state and unrelated collected evidence;
- do not reset Analysis, Report, other Red Rock scenarios, Sea Wolf, or global application state unless a direct dependency is proven.

---

## 2D. Guardrails — prevent unintended global consequences

The tourism-model correction must **not** change:

- the hare-projection recurrence or its newly approved corrected values;
- Caldera Marsh data, answers or mechanics;
- Norvale Highlands data, answers or mechanics;
- any Sea Wolf dataset, stage, deck, allocation or scoring logic;
- Red Rock scoring weights, timers, stage locks or navigation;
- Learning / Simulation behaviour;
- Research Journal sorting, Important/Unmark or Return mechanics;
- CSS, branding or general UI architecture;
- vegetation values;
- deer values;
- the established `$75,000` no-intervention tourism loss;
- the established `$100,000` full-recovery tourism gain;
- Visual Report Cases 1–6.

---

## 2E. Validation required before V2.4.4 completion

### Dependency sweep

Search the V2.4.3 source for all representations of the obsolete intermediate tourism values, including:

- `50` / `$50,000` where it specifically represents Salvanova Exhibit 2 Year 2 tourism;
- `75` / `$75,000` where it specifically represents Salvanova Exhibit 2 Year 3 tourism.

Because `$75,000` is also the **correct** no-intervention Year-5 tourism-loss answer, every occurrence must be classified by context before any replacement. Never perform an unscoped global find-and-replace.

### End-to-end consistency check

Verify the corrected tourism evidence chain:

`Study Information rule → Exhibit 2 → Research Journal → any dependent Analysis/Report rendering → Result Review`

Expected intermediate values:

- Year 2 = **$45,000**;
- Year 3 = **$70,000**.

Expected established Year-5 outputs remain:

- no-intervention tourism loss = **$75,000**;
- full-recovery tourism gain = **$100,000**.

### Work-package isolation

Implement and validate the hare-model correction first. Freeze that chain before applying the tourism correction. Then run a final Salvanova regression pass covering both model corrections together.

---

## Release guardrail

V2.4.4 remains a **Final correction & consolidation** release. It should correct only established inconsistencies in the Salvanova model and their direct dependencies, without reopening unrelated game mechanics, UX architecture or other scenario datasets.
