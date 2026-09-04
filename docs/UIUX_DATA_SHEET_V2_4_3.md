# DecisionLab — UI/UX Data Sheet V2.4.3

## Release

**Version:** 2.4.3  
**Phase:** Final correction & consolidation  
**Release focus:** Progressive disclosure, result-review density and Graph Selection footprint

## Authoritative V2.4.3 changes

### Red Rock navigation

- Mother stages: `INVESTIGATION`, `ANALYSIS`, `REPORT`.
- Only the active mother stage renders its subpage shortcuts.
- Non-active mother-stage headings remain visible and collapsed.
- Existing access/lock logic remains authoritative.

### Sea Wolf navigation

- Mother sections are the three sites in the selected Sea Wolf study.
- Current site: expanded with stage sequence.
- Completed site: collapsed completed summary.
- Future site: collapsed and locked.
- Transfer Review is shown only in the active site's stage sequence when applicable.
- No free navigation is introduced.

### Home mode cards

`mode-card-description` maximum measure: `24ch`.

### Red Rock Graph Selection

- Desktop chart-option minimum height: 174px.
- Desktop chart-preview height: 118px.
- Mobile chart-option minimum height: 158px.
- Mobile chart-preview height: 104px.
- Existing chart options and selection behaviour remain unchanged.

### Detailed Review disclosure

Collapsed by default and independently expandable:

- Red Rock — Analysis
- Red Rock — Written Report
- Red Rock — Graph Selection
- Red Rock — Visual Report
- Sea Wolf — Site Profiling
- Sea Wolf — Treatment Construction

The header row is a native button with `aria-expanded`; Client Debrief, Primary Concern and Performance Snapshot remain permanently visible.

## Protected baseline

V2.4.2 data consistency corrections and V2.3.10 Research Journal pointer sorting remain in force. No scenario datasets, score calculations, answer keys, timers or Sea Wolf treatment/routing mechanics are changed in V2.4.3.
