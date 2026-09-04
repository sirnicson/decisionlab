# V2.4.1 — Exhibit 1 Year 5 evidence-label consistency fix

## Release classification

**Final correction & consolidation — evidence-label consistency correction.**

V2.4.1 begins DecisionLab's final correction and consolidation phase. The release addresses a visible inconsistency in two explicitly bound Year 5 `Fact` labels while preserving the established Red Rock mechanics and interaction model.

## Problem

For Exhibit 1, Years 0–4 are generated from the chart cell context and displayed in the Research Journal as:

- `No wolves · Year 0` … `No wolves · Year 4`
- `With wolves · Year 0` … `With wolves · Year 4`

Year 5 is explicitly bound to named facts (`ex1-y5-nowolves` and `ex1-y5-wolves`). Their manually authored labels used a different phrase structure:

- `Year-5 hare population without wolves`
- `Year-5 hare population with wolves`

The journal therefore displayed Year 5 differently even though it belongs to the same Exhibit 1 series.

## Fix

Only the two bound fact labels were normalised:

- `Exhibit 1 — No Wolves — Year 5`
- `Exhibit 1 — With Wolves — Year 5`

The existing `compactEvidenceLabel()` presentation rule then renders them as:

- `No wolves · Year 5`
- `With wolves · Year 5`

## Behaviour deliberately unchanged

- Fact IDs and Exhibit 1 bindings
- Numeric values (`805255` and `386890`)
- relevance flags
- draggable flags
- answer keys and report labels
- scoring and tolerances
- Investigation chart data
- journal persistence and ordering
- Important / Unmark and Return actions
- V2.3.10 pointer-driven journal sorting
- Red Rock and Sea Wolf routing/timers/mode logic

## Version-history note

This release should be recorded in the eventual DecisionLab version-control/change-track report as the start of the **V2.4 final correction and consolidation phase**. The phase may include visual, interaction, data, content or mechanic-adjacent corrections where needed, but its defining purpose is to reconcile and finish the substantially complete product.
