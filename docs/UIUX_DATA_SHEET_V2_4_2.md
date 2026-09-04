# DecisionLab — UI/UX Data Sheet V2.4.2

## Release

**Version:** 2.4.2  
**Phase:** Final correction & consolidation  
**Release focus:** Red Rock Research Journal consistency across Salvanova, Caldera and Norvale

## Product-development intent

V2.4.x is not a new feature line. It is the final correction and consolidation phase for the substantially complete DecisionLab application. Changes may touch presentation, interaction-supporting logic or scenario metadata when required to make already-approved mechanics display and behave consistently.

## Authoritative V2.4.2 corrections

### Salvanova Exhibit 1

- `With wolves · Year 5` = `386,890 hares`
- `No wolves · Year 5` = `805,255 hares`

The V2.4.1 naming pattern is retained; V2.4.2 restores the omitted `hares` units.

### Salvanova Exhibit 2

Research Journal entries use one consistent series/year pattern:

- `Vegetation cover · Year 0` … `Vegetation cover · Year 5`, values in `%`.
- `Tourism revenue · Year 0` … `Tourism revenue · Year 5`, values in full dollars.

The exhibit remains labelled `Tourism revenue index ($000)` and its chart/table data remain stored as `0, 25, 50, 75, 90, 100`. Journal evidence converts those values to `$0, $25,000, $50,000, $75,000, $90,000, $100,000` for decision-ready use.

### Caldera Exhibit 1

Year-5 journal labels align with the preceding years:

- `Nitrogen · Year 5`
- `Phosphorus · Year 5`
- `Dissolved oxygen · Year 5`

Units remain `mg/L` and numeric values are unchanged.

### Norvale Exhibit 1

Year-5 journal labels align with the preceding years:

- `Natural recovery · Year 5`
- `Integrated restoration · Year 5`

Units remain `%` and numeric values are unchanged.

### Norvale Exhibit 2

The generic table column label `Value` is not repeated in the Research Journal. Entries read as `Active restoration`, `Planting capacity`, `Cost`, `Budget`, and `Mature carbon benefit` rather than appending `· Value`.

### Analysis → Research Journal

Numeric analysis outputs use canonical journal formatting:

- thousands separators for large values;
- `$` before currency values;
- `$m` rendered as `$Xm`;
- existing analytical units retained.

The same formatter is used when rendering previously persisted analysis entries so older saved attempts are visually normalised.

## Persistence compatibility

Investigation journal entries now resolve current canonical fact metadata at render and drag time when a matching fact ID exists. The Norvale `Value`-column polish preserves the previous generated fact IDs so existing collected evidence remains addressable.

## Locked baseline

V2.4.2 does not alter:

- Red Rock calculations, answer keys, scoring or tolerances;
- report logic or visual-case mechanics;
- V2.3.10 journal sorting;
- V2.3.7 journal action controls;
- DECISIONLAB branding or layout CSS;
- Sea Wolf mechanics or datasets.
