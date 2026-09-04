# V2.4.2 — Red Rock consistency sweep

## Phase

**Final correction & consolidation.**

DecisionLab is substantially complete. V2.4.x is used to reconcile visible inconsistencies, edge cases, data/display alignment and interaction details without reopening established study mechanics unless a separate modelling decision is explicitly approved.

## Problems addressed

### Salvanova Forest

1. The explicitly bound Exhibit 1 Year-5 hare facts had the correct values and labels after V2.4.1 but omitted the `hares` unit, unlike Years 0–4.
2. Exhibit 2 mixes vegetation percentages with a tourism series stored in `$000`. Journalised Years 0–4 therefore lacked canonical units/scaling and could produce inconsistent labels, while the explicitly bound Year-5 facts used a different wording/value representation.

### Caldera Marsh

The three explicitly bound Exhibit 1 Year-5 facts used prose labels (`Year-5 nitrogen`, etc.) while Years 0–4 followed the chart-series pattern (`Nitrogen · Year N`).

### Norvale Highlands

1. The two explicitly bound Exhibit 1 Year-5 facts used `Natural Year-5 cover` / `Integrated Year-5 cover` rather than the series naming pattern.
2. Exhibit 2 has a generic `Value` column. Dynamically journalised labels therefore added the redundant suffix `· Value`.

### Analysis outputs

Analysis answers were added to the Research Journal using raw input strings plus appended units. This could produce `386890 hares` instead of `386,890 hares`, and `75000 $` instead of `$75,000`.

## Corrections implemented

- `ex1-y5-wolves` and `ex1-y5-nowolves` retain their V2.4.1 names and now include `unit:'hares'`.
- Salvanova Exhibit 2 journal evidence is normalised as:
  - `Vegetation cover · Year N` with `%` values;
  - `Tourism revenue · Year N` with values converted from the exhibit's `$000` scale to full dollar amounts.
- Bound Salvanova Exhibit 2 Year-5 labels are aligned to those same patterns.
- Caldera bound Year-5 labels are now `Nitrogen · Year 5`, `Phosphorus · Year 5`, and `Dissolved oxygen · Year 5` after journal compaction.
- Norvale bound Year-5 labels are now `Natural recovery · Year 5` and `Integrated restoration · Year 5` after journal compaction.
- Generic Investigation table columns named exactly `Value` no longer contribute a redundant suffix to the journal display label. Existing generated fact IDs are preserved for persistence compatibility.
- Analysis journal values now receive number/currency formatting before persistence and at render time.
- The Research Journal resolves current canonical Investigation facts at render/drag time where possible. This allows corrected labels, units and Salvanova tourism scaling to surface in existing saved attempts without requiring the user to return and recollect those entries.

## Deliberately unchanged

- Salvanova hare projection values and modelling assumptions
- Salvanova tourism projection series values
- all Red Rock answer keys and tolerances
- Red Rock scoring weights
- report templates and accepted chart types
- timers and stage-lock behaviour
- journal Important/Unmark and Return behaviour
- V2.3.10 pointer-driven vertical journal sorting
- Sea Wolf datasets, routing, prospect selection, treatment and scoring
- application visual styling
