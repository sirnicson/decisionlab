# V2.2.2 — Contextual Red Rock Graph Selection

This release replaces the repeated Graph Selection option trio with study-specific chart choices tied to the actual comparison being requested.

## Locked option sets

| Study | Accepted choices | Less-suitable choice |
|---|---|---|
| Salvanova Forest | Clustered bar chart; Slope chart | Scatter plot |
| Caldera Marsh | Dumbbell chart; Clustered bar chart | Line chart |
| Norvale Highlands | Line chart; Slope chart | Pie chart |

Each study still presents exactly three choices. Two are treated as defensible/accepted; one is intentionally less suitable for the communication task.

## Preview behaviour
- The generated preview now renders the chart type actually selected.
- Salvanova groups Year 0/Year 5 by With wolves vs No wolves.
- Caldera groups all six values into Nitrogen, Phosphorus and Dissolved Oxygen Year-0/Year-5 pairs; no indicator is dropped.
- Norvale groups Year 0/Year 5 by Natural recovery vs Integrated restoration.
- Scatter, dumbbell and pie marks inherit the global exact-value hover/focus/tap interaction rule.
- The integrated Task 1 Result review uses the same contextual preview component instead of forcing every submitted graph into a bar chart.

No graph data-field answer values, Investigation data, Analysis answers, Written Report answers or Visual Report case data were changed. The Graph Selection scoring rule itself remains formulaically unchanged, but each study now has two accepted chart types instead of one.
