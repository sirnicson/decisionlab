# DecisionLab — UI/UX Data Sheet V2.4.4

## Release

**Version:** 2.4.4  
**Phase:** Final correction & consolidation  
**Release focus:** Salvanova model consistency and safe downstream propagation

## Product-development intent

V2.4.4 corrects two internally inconsistent Salvanova data relationships while protecting the rest of DecisionLab. This is not a new feature line and does not change the approved interaction architecture.

## Authoritative Salvanova model locks

### Hare model

`Next-year population = current population × 1.10 − 75,000`

Use nearest whole hare.

| Period | With wolves |
|---|---:|
| Year 0 | 500,000 |
| Year 1 | 475,000 |
| Year 2 | 447,500 |
| Year 3 | 417,250 |
| Year 4 | 383,975 |
| Year 5 | 347,373 |

The No-wolves trajectory remains unchanged at 10% annual compounding.

**Dependent benchmark:** relocation from 347,373 to 300,000 = **13.64%**.

### Tourism model

Use the 80% vegetation baseline and a proportional economic relationship of **$5,000 per vegetation percentage point**.

| Period | Vegetation | Tourism change |
|---|---:|---:|
| Year 0 | 80% | $0 |
| Year 1 | 85% | $25,000 |
| Year 2 | 89% | $45,000 |
| Year 3 | 94% | $70,000 |
| Year 4 | 98% | $90,000 |
| Year 5 | 100% | $100,000 |

Year-5 no-intervention tourism loss remains **$75,000** from the 80% → 65% planning assumption.

## Research Journal

Canonical evidence resolution remains the display authority. V2.4.4 also adds a targeted saved-session migration so affected pre-release Salvanova journal entries are refreshed without changing order or Important state.

## Analysis / Report / Result propagation

- Analysis Year-5 with-wolves benchmark: **347,373 hares**.
- Analysis relocation benchmark: **13.64%**.
- Written Report Year-5 with-wolves benchmark: **347,373 hares**.
- The current Written Report has no relocation-percentage field; none is added.
- Tourism's principal Analysis/Report endpoints remain **$75,000 loss** and **$100,000 gain**.
- Result Review inherits these values from canonical scenario definitions; no separate result-data copy exists.

## Persistence compatibility

`salvanovaModelRevision` is session-scoped and optional for backward compatibility. Migration activates only for a Salvanova session below the current revision. It refreshes former benchmark values only when the saved value matches the previous canonical benchmark, preventing unrelated learner inputs from being silently overwritten.

## Locked baseline

V2.4.4 does not change:

- Caldera or Norvale data;
- Sea Wolf data or mechanics;
- Visual Report mini-case data;
- Graph Selection mechanics;
- Red Rock scoring weights;
- timers or progression locks;
- Learning / Simulation feedback rules;
- Journal interaction mechanics;
- CSS, branding or layout.
