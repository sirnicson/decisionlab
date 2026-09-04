# V2.2.1 — Global Chart Data-Point Visibility

## Implemented rule
Every quantitative chart mark in the application must expose its exact underlying value without requiring the learner to estimate from visual position.

### Shared chart renderer
`src/components/ExhibitRenderer.tsx` now makes every line point and bar mark interactive. The same behaviour therefore applies wherever `ExhibitRenderer` / `ExhibitChart` is used, including:

- Red Rock Investigation standard charts;
- Graph Selection generated previews;
- Red Rock Visual Report case charts;
- chart visualisations embedded in integrated Results review.

### Red Rock mini trends
The custom small-multiple charts used by Salvanova Exhibit 2 and Caldera Exhibit 1 now use the same tooltip/focus interaction through `ChartInteraction.tsx`.

### Interaction
- Hover: temporarily reveals series/category/value.
- Keyboard focus: reveals the same value and exposes an accessible label.
- Tap/click: pins the active value for touch use; tapping/selecting another mark updates it.
- Exact units are preserved when the chart supplies one.
- Large integers are displayed with thousands separators.

### Visual treatment
Interactive points enlarge slightly on hover/focus. Bars receive a focus stroke. Tooltip cards use the existing dark institutional green and white text so the interaction remains within the established Solve It visual system.

### Non-changes
No dataset, scoring formula, answer key, Research Journal evidence rule, Red Rock stage mechanic or Sea Wolf mechanic is changed. Decorative chart-choice icons are not data charts and remain non-interactive.
