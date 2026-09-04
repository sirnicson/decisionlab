# V2.1.9 — Red Rock Exhibit Visual Audit

The V2.1.8 Investigation page had two separate visual-render paths: a generic chart panel and an additional chart companion. This caused duplicate charts on Red Rock Exhibit 1 and Exhibit 2 pages.

V2.1.9 uses one `InvestigationVisual` per exhibit and keeps the draggable table as the source of exact values.

- Salvanova Exhibit 1: two-series hare-population line chart.
- Salvanova Exhibit 2: separate vegetation (%) and tourism ($000) trend views inside one visual panel.
- Caldera Exhibit 1: separate readable nitrogen, phosphorus and dissolved-oxygen trends.
- Caldera Exhibit 2: first-year-threshold timing bars.
- Norvale Exhibit 1: natural vs integrated forest-cover line chart.
- Norvale Exhibit 2: separate planting-runway, budget and carbon views because the table uses incompatible units.

No Red Rock source data, calculation logic, answer keys, scoring, drag/drop behaviour or stage mechanics were changed.
