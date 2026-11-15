# CLAUDE.md — the prototype's workers

> What every AI assistant must know before working here. [README.md](README.md) says what this
> repository is and how to run it; this file is the rules.

## What this is

The clickable prototype and design archive of **Masaha** (مساحة), a bilingual Arabic RTL / English
platform for coworking spaces in the Gaza Strip. The design work happens here, page by page, as
**variants** the owner compares and chooses from. Nothing here is the product: a chosen design
reaches production only as a Work Item in masaha, built with its design system
([ADR 0020](https://github.com/Basel-Ghonaim/masaha/blob/main/docs/architecture/decisions/0020-design-archive-own-repository.md)).

## The production repository is the one home of product facts

**masaha** ([Basel-Ghonaim/masaha](https://github.com/Basel-Ghonaim/masaha), usually added to the
session read-only with `--add-dir`) owns every fact about the product. Read it; **never edit it from
here**, and never copy its documents here.

| Fact | In masaha |
|---|---|
| The v1 scope, and what is *Not in v1* | [`docs/project/overview.md`](https://github.com/Basel-Ghonaim/masaha/blob/main/docs/project/overview.md) |
| The vocabulary, English and Arabic | [`docs/project/glossary.md`](https://github.com/Basel-Ghonaim/masaha/blob/main/docs/project/glossary.md) |
| The design system: tokens, type, components, screens, the logo | [`docs/frontend/design-system/foundation.md`](https://github.com/Basel-Ghonaim/masaha/blob/main/docs/frontend/design-system/foundation.md) |
| Languages, direction, formatting | [`docs/frontend/localisation.md`](https://github.com/Basel-Ghonaim/masaha/blob/main/docs/frontend/localisation.md) |
| A capability's rules and decisions | [`docs/features/`](https://github.com/Basel-Ghonaim/masaha/tree/main/docs/features) |
| Decisions | [`docs/architecture/decisions/`](https://github.com/Basel-Ghonaim/masaha/tree/main/docs/architecture/decisions) |

When the prototype and masaha disagree on a rule, masaha is right: say so, do not decide it here.

## The original page is never edited

- `prototype/<Page>.html` is the original. **Every idea is a variant**: `<Page>.html?v=<name>`, its
  code in `prototype/variants/<Page>/<name>.jsx` (and, if it needs one, `<name>.css`), registered in
  `prototype/variants/index.js`. README's [Variants](README.md#variants) says how they work.
- **The switcher** in the page's corner lists the original and its variants: it is how the owner
  compares them. Keep each variant's label short, in Arabic and English.
- A variant may not edit the shared modules (`masaha/*.jsx`, `masaha/*.js`) or the sample data. If
  it needs a different component, it defines its own, inside its file, under a name of its own.
- **Promoting a chosen variant** into the original page, and retiring the others, is the owner's
  decision, recorded in the page's decision file, and done as its own commit.

## Fixed points (no variant changes them)

- **The identity:** ink + berry, and the logo
  ([ADR 0019](https://github.com/Basel-Ghonaim/masaha/blob/main/docs/architecture/decisions/0019-ink-and-spark-brand.md),
  [foundation §16](https://github.com/Basel-Ghonaim/masaha/blob/main/docs/frontend/design-system/foundation.md#16-the-logo)).
- **Arabic first:** every page is designed in Arabic, right to left, then checked in English, left to
  right; logical sides only, never left and right.
- **The v1 scope and its *Not in v1* list**: no booking, no online payment, no QR check-in, no
  reviews or ratings, no in-app claiming of a space, and the rest of the list.
- **No fake data:** no ratings, no seat counts and no capacity in public (the live status is a state,
  never a number), no invented figures or claims.
- The product rules of [BRIEF.md](prototype/BRIEF.md).

## What a variant may change freely

Layout, the type scale and the typeface (as a proposal), spacing, surfaces, imagery and motion.
**Each change is stated in the page's decision file** (`decisions/<Page>.md`,
[template](decisions/README.md)) as a proposal against masaha's design system, with its reason:
the design system changes only through masaha's own PR.

## Before each commit

```bash
node scripts/check-parse.mjs
node scripts/check-classes.mjs
```

Both must pass. Then open what you changed in a browser (README's [How to run it](README.md#how-to-run-it)),
in Arabic and English, light and dark, at 390, 768 and 1440, and look at it: the scripts see syntax
and class names, not the page.

The page's scripts share one global scope: no object rest (`const { a, ...rest } = props`), and no
top-level name the browser already owns, such as `name` (README's
[Checking the prototype](README.md#checking-the-prototype)).

## Git

- Commit straight to `main` of this repository. No branches or PRs unless the owner asks.
- Conventional Commits (`feat(sign-in): add the calm variant`), subject ≤ 50 characters, a body
  that says why. Stage by path: never `git add -A` or `git add .`.
- **No tool attribution** in commits or files: no `Co-Authored-By` for a tool, no "generated with".
- Never rename or move a file masaha links to (its documents cite this repository by URL) without
  telling the owner, so masaha's links are repointed in a PR there.

## Never

- Say anywhere for whom, where or as what the project was made: its public identity is the
  product's alone. Ask the owner when unsure.
- Use real people's names, phone numbers or e-mails: placeholders only (`@example.com`,
  `+970 59 000 …`).
- Build anything on masaha's *Not in v1* list, even partly, even as a variant.
