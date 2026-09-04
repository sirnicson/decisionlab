# V2.4.3 — Progressive disclosure and review-density consolidation

## Phase

**Final correction & consolidation.**

DecisionLab is substantially complete. V2.4.3 reduces interface density and improves review usability without reopening established Red Rock or Sea Wolf task mechanics.

## Product problems addressed

### 1. Red Rock sidebar density

When a learner progressed from Investigation to Analysis and then Report, subpage shortcuts from earlier mother stages remained visible. This consumed sidebar height and weakened the distinction between the current phase and completed phases.

### 2. Sea Wolf sidebar density

Sea Wolf exposed the active site's full stage sequence as a flat list. Because each study contains three connected sites, the sidebar did not use the site structure itself as the main progress hierarchy.

### 3. Home mode-card copy wrapping

The matched Learning / Simulation cards were aligned correctly, but the description measure remained slightly narrow for the Learning copy.

### 4. Graph Selection card footprint

The chart-choice cards used a relatively shallow 68px preview area, leaving the chart-selection interaction visually smaller than the available report canvas.

### 5. Result-page Detailed Review length

All Detailed Review content rendered fully expanded. This made result pages long and forced secondary diagnostic detail to compete with the Client Debrief, Primary Concern and Performance Snapshot.

## Changes implemented

### Red Rock progressive-disclosure sidebar

- `Investigation`, `Analysis` and `Report` remain visible as mother stages.
- Only the mother stage associated with the currently viewed Red Rock page renders its subpage shortcuts.
- Moving into a new mother stage automatically collapses the previous stage and expands the current stage.
- Existing button availability, stage locks and progression rules are unchanged.

### Sea Wolf site-based progressive disclosure

- The three scenario sites are now persistent mother sections in the dark sidebar.
- The current site expands to show its stage sequence.
- Completed sites collapse to a completed summary row.
- Future sites remain collapsed and visually locked.
- `Transfer Review` appears inside the current site when it is actually applicable to that site's carried-forward microbes.
- The stage list remains informational; Sea Wolf's locked sequential progression is unchanged.

### Home mode-card description refinement

- `.mode-card-description` maximum measure increases from `21ch` to `24ch`.
- Equal card dimensions, title alignment, icon dimensions, optical icon scaling and selected-state styling are preserved.

### Graph Selection card enlargement

- Individual chart-choice cards receive a larger selectable footprint.
- The chart-preview row increases from 68px to 118px on desktop.
- Chart glyphs are proportionally enlarged within the new preview area.
- Three-column layout, accepted chart types and selected-state mechanics are unchanged.

### Cross-workstream Detailed Review disclosure

A shared disclosure component now governs all Detailed Review groups.

**Red Rock**
- Analysis
- Written Report
- Graph Selection
- Visual Report

**Sea Wolf**
- Site Profiling
- Treatment Construction

All sections:
- start collapsed;
- use the full header row as the disclosure control;
- show a clear open/closed chevron;
- expand independently;
- expose their existing review content only when opened;
- are keyboard-accessible through a native button and `aria-expanded`.

Client Debrief, Primary Concern and Performance Snapshot remain visible without disclosure.

## Deliberately unchanged

- Red Rock scenario values, answer keys and tolerances
- Salvanova hare projection values and modelling assumptions
- Salvanova intermediate tourism projection values
- Red Rock scoring and timers
- Red Rock stage-lock rules
- Research Journal sorting, Important/Unmark and Return mechanics
- Sea Wolf routing decks and expected allocations
- Sea Wolf characteristic, prospect and treatment scoring
- Sea Wolf treatment locks and sequential progression
- Learning / Simulation feedback rules

## Deferred to V2.4.4

Two Salvanova modelling questions remain deliberately unresolved in V2.4.3 and are recorded in `V2_4_4_ITERATION_LIST.md`:

1. hare-projection mechanics versus the stated 10% growth and annual predation assumptions;
2. intermediate tourism projection values versus the stated vegetation-to-tourism relationship.
