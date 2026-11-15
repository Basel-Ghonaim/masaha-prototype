# Masaha — the prototype

The clickable prototype and the design archive of **Masaha** (مساحة), a bilingual (Arabic RTL /
English) platform for coworking spaces in the Gaza Strip. The product itself, and every fact about
it (scope, rules, copy, the design system), lives in the production repository,
[Basel-Ghonaim/masaha](https://github.com/Basel-Ghonaim/masaha). This repository holds only the
design work.

It was `docs/design/` in that repository until 2026-11-15, and moved here with its history
([ADR 0020](https://github.com/Basel-Ghonaim/masaha/blob/main/docs/architecture/decisions/0020-design-archive-own-repository.md)).
The screens were made in Claude Design (2026-09-29) with a synced copy of the design system,
vendored under `prototype/_ds/`, and have been **maintained here by hand** since that project was
deleted.

**The prototype is the living design.** Design reviews take it apart, the owner decides, and the
decisions are applied to `prototype/`. So the prototype, not the screenshots, is what a feature is
built from:

- **The design as delivered** is at the tag `design-2026-09-29`, and nothing here is expected to
  match it any more. [CHANGES.md](CHANGES.md) lists every decision applied since, with its date.
- **The screenshots in `screens/` are from before the fix phase.** They show the design as
  delivered, and `prototype/` shows it as it is; where they disagree, the prototype is right.
- **New design work is a variant of a page** ([below](#variants)): the page stays the original,
  and each idea is drawn beside it and chosen by the owner.

## What is here

| Path | What it is |
|---|---|
| `SCREENS.md` | **Start here.** The 33 screens of the product → prototype pages and board sections |
| `INDEX.md` | Every frame of the design board (570 frames in 56 sections), in order: label, prototype URL with its state parameters, viewport, screenshot |
| `screens/` | A full-page screenshot of every distinct frame (437 WebP images), one folder per board section. Sections whose frames all repeat earlier ones have no folder; `INDEX.md` links each frame to its file |
| `prototype/` | The clickable HTML prototypes: 41 pages, the board (`Flows - states.html`), sample data and copy. Fully offline (React, Babel, fonts and the design-system bundle are vendored) |
| `prototype/BRIEF.md` | The brief every page and variant is designed against: who the users are, what is fixed, what a variant may change |
| `prototype/variants/` | The page variants and their registry, `index.js` |
| `decisions/` | One file per page with variants: what each changes, and what the owner chose and why |
| `CHANGES.md` | Every decision applied to the living design: what changed, where, and when |
| `scripts/` | The two checks run on the prototype before each commit (below) |
| `CLAUDE.md` | The rules for the AI assistants that work here |

## How to run it

The pages load their `.jsx` files over HTTP, so opening them with `file://` does not work. Serve the
`prototype/` folder:

```bash
python -m http.server 8080 --directory prototype      # or: npx serve prototype
```

Then open `Flows - states.html` (the whole board) or any page directly. States are URL parameters,
for example `Desk.html?role=reception&dialog=checkout&pid=pv0`,
`Finance.html?theme=dark&tab=debts`, `Customers.html?lang=en`. `INDEX.md` lists every one.

## Variants

`<Page>.html` is always the original. `<Page>.html?v=<name>` draws a variant of it.

- A variant is one file, `prototype/variants/<Page>/<name>.jsx`, which takes the place of the page's
  own inline script: it usually starts as a copy of that script and changes what it proposes. It
  may add `prototype/variants/<Page>/<name>.css`. The shared modules (`masaha/*.jsx`) and the sample
  data are the same for the original and every variant.
- It is registered in `prototype/variants/index.js` under the page's file name, with its labels:
  `'Sign in': [{ name: 'calm', ar: 'هادئة', en: 'Calm', css: true }]`.
- **The switcher**, in the page's corner, lists the original and its variants, and reloads the page
  with the one chosen; the other parameters (`?lang=`, `?theme=`, a state) are kept. It shows only on
  a page that has a variant, never inside the board's frames, and not with `?switcher=0` (for
  screenshots). A link to the same page keeps the variant; a link to another page does not.
- An unknown `?v=` shows the original.
- Each variant is described in `decisions/<Page>.md` ([decisions/README.md](decisions/README.md)).

How it works: `masaha/variants.js`, loaded after `i18n.js` and before Babel, sets the page's inline
`text/babel` block inert and adds the variant's file in its place before Babel compiles the page.

## Checking the prototype

The prototype has no linter and no test lane, so two scripts stand in, run from the repository's
root with Node alone:

- `node scripts/check-parse.mjs` parses every `.jsx` module, every page's inline script and every
  variant with the vendored Babel, and fails on a syntax error, which would blank the page;
- `node scripts/check-classes.mjs` fails on a class that no stylesheet defines, which the prebuilt
  `_ds_bundle.css` makes silently dead (the few already dead are listed in the script by file, so the
  same class anywhere else still fails). It reads only class names written literally in `class="…"`
  or `className="…"`: a class chosen in a condition, built by `cn(…)`, passed in another prop or
  named as an object key is not seen.

**What they cannot see:** anything that happens once the page runs, a block drawn twice, a missing
gap, a section in the wrong place. The Directory's filters were once drawn twice and passed both,
and a 420-page load matrix too. Those need the pages opened in a browser, at 390, 768 and 1440, and
looked at.

**One scope for every script.** Each page's modules and inline scripts compile apart but share the
page's global scope, so a top-level name in one is everyone's. Two rules follow: no module or page
script uses object rest (`const { a, ...rest } = props`). Babel compiles it with a helper list,
`_excluded`, that the next script using rest overwrites, so held-back props leak (DI-27; pick them by
hand, as `shared.jsx`'s `without` does). And no top-level name that the browser already owns, such
as `name`. A variant replaces its page's inline script, so it may reuse that script's names.

## Implementing from it, in masaha

1. **The prototype is a specification, not code to copy.** It is a React prototype with inline
   Babel. Each screen is rebuilt in `masaha` with its design-system components, its four zones,
   TanStack Query and the typed copy catalogues, following its documents. Never import or paste
   prototype code or its CSS.
2. **Read the source, not only the pictures.** `prototype/masaha/*.jsx` holds the exact structure,
   states and conditions of each screen; the screenshots show the result **as it was delivered**,
   which the fix phase has moved on from ([CHANGES.md](CHANGES.md)).
   - `i18n.js`: the Arabic and English copy used on the screens; the starting point for catalogue
     lines (review wording against masaha's glossary).
   - `data.js`, `details-data.js`, `desk-data.js`, `owner-data.js`, `admin-data.js`: sample data
     only; the real rules live in masaha's
     [data model](https://github.com/Basel-Ghonaim/masaha/blob/main/docs/architecture/data-model.md).
3. **Neither wins automatically.** The design owns behaviour and look; masaha's documents (ADRs, the
   data model, the design system's foundation) own the rules. Every conflict between a screen and
   them is recorded and decided.
4. **Each slice links its screens.** A feature PR in masaha names the SCREENS.md rows it implements
   and compares its result with the matching screenshots (light, dark, English, phone where they
   exist). masaha links the files of this repository by URL, so a file it cites is never renamed or
   moved without a masaha PR that repoints it.

## Known limits of the archive

- **Navigation icons are placeholders.** Claude Design only had part of the icon set; the final
  icons are chosen in code (F-6).
- **Sample data is illustrative.** Some admin frames reuse text from another space (for example
  Golden Hub's edit form shows Focus Hub's description).
- **The Google button loads the Roboto font from Google Fonts;** offline it falls back to the
  system font.
- **The About page's five screenshots** were edited when the archive moved here, to take out the
  line U11 removed from the page ([CHANGES.md](CHANGES.md)); the rest of each is as delivered.
