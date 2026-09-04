# DecisionLab V2.4.6 — Red Rock Analysis proportion and density refinement

## Phase

**Final correction & consolidation.**

## Problem addressed

V2.4.5 correctly established the three-column Analysis workspace, but the Research Journal remained too narrow for comfortable evidence reading while the Analysis pane retained more width and vertical spacing than necessary. The Calculator empty state also contained helper copy that added visual noise to an otherwise functional history area.

## Changes implemented

### 1. Workspace rebalance

- Keep **Analysis | Calculator | Research Journal**.
- Reduce Calculator desktop width from 230px to 205px.
- Increase Journal desktop width from 300px to 370px.
- Reduce the main grid gap from 14px to 12px.
- At <=1450px use 195px Calculator / 340px Journal.

### 2. Analysis density refinement

Analysis-only typography, padding, field height and section spacing are tightened. The change is scoped under `.redrock-workspace.utility-analysis` and does not alter global typography.

### 3. Research Journal density refinement

The wider Journal uses smaller card padding, shorter card minimum height, a slightly smaller reorder handle and compact action controls. Source/description/value spacing is reduced so the added width improves legibility rather than simply enlarging the cards.

### 4. Calculator refinement

The Calculator remains the narrowest rail. Small Analysis-local CSS reductions keep its expression field, result and keypad proportional to the narrower utility area.

### 5. Calculation History empty-state cleanup

The sentence `Completed calculations will appear here.` is removed from `OnscreenCalculator.tsx`. No history-state or arithmetic logic changes.

### 6. Responsive safeguard

The three-column layout collapses earlier at 1260px into a two-column working arrangement and stacks fully below 960px.

## Deliberately unchanged

- V2.4.4 Salvanova model corrections
- Red Rock question/answer content
- Red Rock scoring, tolerances, timers and stage locks
- Calculation History persistence and reuse logic from V2.4.5
- Research Journal behaviour
- Graph Selection and Visual Report mechanics
- Caldera and Norvale data
- Sea Wolf
- Home and Results
- DecisionLab branding
