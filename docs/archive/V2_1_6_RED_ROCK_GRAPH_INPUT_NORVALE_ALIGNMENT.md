# V2.1.6 — Red Rock Graph Input & Norvale Alignment Lock

## Graph Selection UI
- The Graph Selection card layout is globally compacted for all three Red Rock studies.
- Chart-choice cards use smaller, contained icons and tighter spacing.
- Chart-data fields use a responsive auto-fit grid so four-field and six-field studies use the centre panel efficiently.
- Chart previews are height-limited to avoid unnecessary vertical expansion.

## Numeric input behaviour
- Red Rock analysis, written-report, graph-data and visual-case numeric fields must accept multi-digit and decimal values without losing keyboard focus after the first character.
- The previous nested React input-component pattern is retired because re-creation on each parent render could remount the field after each keystroke.
- Input elements are rendered through stable render helpers and support up to 24 characters, drag/drop values and direct entry.

## Norvale Highlands — Dr. Cross Written Report request
> Walk me through the scale and cost of the proposed restoration programme, whether our planting capacity can deliver it, and what the Year 5 forest-cover and carbon outcomes tell us about whether we should proceed.

This request must mirror the written-report evidence: affected/restored area, programme cost and headroom, delivery capacity, mature carbon benefit, and Year-5 natural vs integrated forest cover.

## Graph units
- Salvanova graph fields: %.
- Caldera graph fields: mg/L.
- Norvale graph fields: %.

No Red Rock scoring, answer keys, task order or research-journal mechanics are changed by this update.
