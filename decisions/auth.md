# The auth pages

Pages: `prototype/Sign in.html` · `Register.html` · `Forgot password.html` · `Reset password.html` ·
`Change password.html` · `Reset email.html` — screens 5, 6, 7 and the forced change of
[SCREENS.md](../SCREENS.md). One decision file for all six, since one design is chosen for all of them.

**The brief:** the owner's decisions A1–A5 (2026-11-15) and the critique's confirmed points: the form on
the start side with no card and, from 1280 px, an **ink brand panel** on the other side (the logo, a
title, one line on what an account gives, and **the Strip**); 768–1279 one column at a fixed offset; the
phone at full width with no card and no frame. The Strip is an artistic drawing, its dots real spaces in
the berry. Production's facts are masaha's (`docs/features/auth.md`, the copy catalogue): where this file
and masaha disagree, masaha is right.

**Compare them** in [`prototype/Auth lab.html`](../prototype/Auth%20lab.html): the design, the page, its
state, the language, the theme and the width (or all three widths, or the four designs at one width), the
view kept in the address.

## How the variants are built

- Each page's variant is `variants/<Page>/<design>.jsx` and `.css`, registered in
  `variants/index.js` under the three names below. The five files of a design are two lines each: they
  load one kit, **`variants/_auth/kit.jsx`**, compiled by the page's own Babel (a synchronous read, once),
  and draw their page; the CSS files import `_auth/base.css` and `_auth/<design>.css`. The page logic is
  one for the three designs, so a state behaves the same in each and only the design differs.
- The kit reads the shared modules (`shared.jsx`, `auth.jsx`) and changes none; its names start with
  `Ax`/`ax`, so no page global is overwritten.
- **The reset e-mail** has no script for a `?v=` to replace, and the original is never edited, so its
  three designs are standalone pages: `variants/Reset email/<design>.html` (the lab shows them).

## The fixed points each design keeps

- **The layout (A1):** from 1280 two columns — the form on the start side, no card; the ink panel at the
  end. 768–1279 one column, the h1 at a fixed offset from the top on every page (no vertical centring).
  The phone: full width, no card, no frame (no line under the header either); fields and buttons 52 px.
- **The Strip (A2):** an inline SVG of about 3 KB, north up, never mirrored with the direction. The
  outline is round 3's approximate one (`ROUND3\directions\_shared\data\strip-outline.json`, "not survey
  data"), its coast smoothed, its land borders straight, **no governorate lines and no place names**.
  The dots are the directory's **13 spaces at their real coordinates**, from the snapshot of the live
  public API of **14 November 2026** (`ROUND3\directions\_shared\data\spaces\`); the date is in the
  drawing's description. Nine of them sit within 2 km in Gaza City and touch: that is the data. In
  production the dots would come from the directory's own pins, never a number written by hand.
- **The berry's job:** it marks the places — the 13 spaces on the Strip and the caption's dot — and, on
  the forms, what matters now: the address a link went to. Never text, never an action, never an error.
- **The forced change's header** holds the language and theme switches and «تسجيل الخروج», which on a
  phone under 480 px shows its icon only (its name kept for assistive technology).
- **The panel is the ink in both themes** (`neutral-900`; in dark, a hairline `neutral-800` at its start
  edge): the brand's surface, not an action, so it does not invert to `neutral-50`, which would glare
  beside a dark page. On it the dark logo (`masaha-logo-dark-berry.svg`) and the spark at `spark-400`.
- **The critique's points, in all three:** Google's button in Google's dark theme with no white frame,
  as wide and as tall as the fields (1, 2); forgot password's form shown at once, the recovery's read a
  thin bar over it, its failure a note with «إعادة المحاولة» over the form (3); the forced change with
  the language and theme switches beside «تسجيل الخروج» (4); the password conditions as a tick or a dash,
  never a circle (5); one top offset (6); a real h1, 26–40 px, over its line (7); no frame in a frame on
  the phone (8); the panel fills the 1920 screen's other half (9); the berry on the Strip and the sent
  address (10); «حرف واحد على الأقل، بأي لغة» (11).
- **Accessibility:** contrast AA in both themes (measured on the captures), a visible focus on every
  control (the tools, Google's button, the show-password button, the links), targets of 44 px, errors tied
  to their fields by the design system's `Field`, `autocomplete` as production (`email`,
  `current-password`, `new-password`, `name`); a failed submit moves the focus to the first invalid field.
- **The words are production's** (`apps/web/src/shared/copy/*/auth.ts`, `forms.ts`, `errors.ts`,
  `status.ts`, `users.ts`); the prototype's older lines were replaced by them (sign-in's line, the
  forced change's line, the way back «العودة إلى الرئيسية»).

## Variants

### `slate` — «اللوح» Slate (2026-11-15)
*The A1 as written: the form quiet on the page, beside it an ink slab with the whole Strip, solid.*
- **What it changes:** two equal columns; the panel's Strip filled `neutral-800`, edged `neutral-600`,
  the full height of the panel, at the panel's far side; its title and line sit in the corner the land
  leaves empty (the bottom of the start side in Arabic, the top in English — the Strip runs north-east to
  south-west). The form 400 px wide, its h1 at 128 px from the top (72 px on the tablet, 24 px under the
  header on the phone). States are the design system's alerts. The sent address carries a berry dot. The
  owner note under the form, on a quiet `muted` block. No motion. Below 1280 no Strip.
- **Proposed against masaha's design system:**
  - The auth page's h1 at `heading-1` (30 px; 28 on the phone) instead of the card title's 17 px —
    *the page needs a title, not a card's.*
  - The panel's title at 40 / 1.35 / 600, a step between `heading-1` and `display` — *the brand's line,
    seen from across the room on a 1440 screen.*
  - Controls at 44 px on desktop and 52 px on the phone (`control-height` is 40 / 44) — *A1's larger
    fields; one size for the field, Google's button and the submit.*
  - The panel: a full-height ink surface, a new surface the system does not have.
- **Kept:** the system's alerts, type face and weights, its radii; the order of the form.

### `coast` — «الساحل» Coast (2026-11-15)
*The Strip as a drawn line: the coast drawn in once, cropped by a narrower panel; on the phone it
crosses an ink band that carries the brand.*
- **What it changes:** the form gets the wider column (7 : 5). The panel draws the Strip's outline as a
  single line (`neutral-400`, 1.5 px) with two echoes of the coast offshore (`neutral-700`, `neutral-800`),
  larger than the panel, so its north — where most spaces are — fills the lower half and the south runs
  off the edge; the title (46 px) and line at the top. Below 1280 the header is an **ink band** (116 px on
  the phone, 148 on the tablet) with the dark logo, the tools, and the same line crossing it over Gaza
  City's dots; the form starts 28 px under it. Editorial type: h1 40 / 1.3 (30 on the phone), lede 17 px,
  labels 15 px, controls 48 px (52 on the phone). States are an edge at the start and words, no box; the
  sent address sits on `muted` with a berry edge. The conditions run on one line that wraps. The way back
  sits in the top bar from 1280. The owner note under the page's line, with a grey edge.
- **Motion:** the line draws in over 1.4 s and the echoes follow; then the dots appear north to south,
  70 ms apart. Off under `prefers-reduced-motion` (the drawing shows whole).
- **Proposed against masaha's design system:** a display step for the auth h1 (40 px) and the panel's
  title (46 px); a 17 px lede; 48 px controls; the ink band as the focus shell's header below 1280; a
  state drawn as a 3 px edge with no fill (the system's `Alert` is a box); a one-time drawing motion,
  longer than the system's 250 ms.
- **Kept:** the type face; the colours of each state (the edge takes the state's colour); the order of
  the form.

### `dots` — «النقاط» Dots (2026-11-15)
*The Strip drawn by its grain: a field of small dots, the spaces lit in the berry; the widest panel and
the most precise form.*
- **What it changes:** the panel takes the wider column (5 : 7). The Strip is a grid of small dots
  (`neutral-600`, about every 500 m) clipped to the outline, a faint rim, the full height of the panel;
  the 13 spaces are larger berry dots at their real places (not snapped to the grid). The title is the
  largest of the three (54 px), in the corner the land leaves empty (the foot of the start side in
  Arabic, its top in English). The form is narrow (380 px), its h1 28 px, 136 px from the top.
  States are compact tinted bars. The conditions are **three short bars**, each named under it, which
  fill with the ink as they are met (red after a submit while unmet) — a checklist, not a strength meter.
  The sent address is a pill with a berry dot. The owner note on `muted`, under the page's line. Below
  1280 a small dotted Strip (58 × 74 px) stands beside the h1: the phone's touch of the brand.
- **Motion:** the berry dots appear north to south, 70 ms apart, after 250 ms; off under reduced motion.
- **Proposed against masaha's design system:** the panel title at 54 / 1.3 (a display step); the
  conditions as bars (the system's `PasswordRules` is a list with marks); compact alerts (13.5 px).
- **Kept:** the type scale for the form (28 px h1 is `heading-1`'s phone size), 44 px controls on
  desktop, the system's radii.

### The reset e-mail, in each design
Within e-mail limits (tables, inline styles, no SVG, no image, no web font required); the brand is the
word «مساحة», as production's e-mail has it; production's words and its link printed as text.
- **Slate:** the ink band with the word in white, the card under it, the button the card's width, and
  the action's words as the card's title. No spark.
- **Coast:** no card: an ink rule across the top, the word, a large title (32 px), the words on white;
  *proposal against foundation §16 (no spark in the e-mail):* the hour the link lasts marked by a 3 px
  berry edge.
- **Dots:** a compact card on `neutral-100`, the button full width, the link in its own quiet box, in a
  monospaced face; *proposal against §16:* a berry dot before the word, as the logo's.
- The greeting «مرحبًا،» is kept but joined to the request's line; the title is the action's own words
  («تعيين كلمة مرور جديدة»), no new words.

## New words (proposals — the owner settles them)

| Where | Arabic | English |
|---|---|---|
| The panel's title | أين تعمل اليوم؟ | Where will you work today? |
| The panel's line | بحسابك تحفظ مساحاتك المفضّلة وتتابع بلاغاتك، ومنه يدير أصحاب المساحات مساحاتهم. | Your account keeps your favourite spaces and follows your reports; space owners run their space from it. |
| The Strip's caption | كل نقطة مساحة عمل في الدليل | Each dot is a space in the directory |
| The Strip's name (assistive) | رسم لقطاع غزة، عليه مساحات العمل في الدليل | A drawing of the Gaza Strip, with the directory's coworking spaces on it |
| The Strip's description (assistive) | رسم فنّي لا خريطة. النقاط من بيانات الدليل في 14 نوفمبر 2026. | An artistic drawing, not a map. The dots are from the directory's data of 14 November 2026. |
| The letter rule (replaces «حرف واحد على الأقل») | حرف واحد على الأقل، بأي لغة | At least one letter, in any language |

## States

Each variant reads the page's `?state=`, with the original's names. **Added** (the original has no
drawing of them):

| Page | State | What it shows |
|---|---|---|
| Sign in | `offline` | The submit could not be sent: «تعذّر الاتصال», its line and «إعادة المحاولة» |
| Sign in | `google` | Google's failure area above the button, with production's line for an address that already has a password (the original's `?google=notallowed`) |
| Sign in | `idle` | A session the server ended for idleness: production's `SESSION_IDLE` line above the form |
| Forgot password | `failed` | The recovery's read failed with the general error, over the form, with «إعادة المحاولة» |
| Change password | `errors` | A submit with the conditions unmet |
| Change password | `offline` | The submit could not be sent |

**Changed:** forgot password's default is the request form at once (the original starts on a spinner);
`loading` is the same form with a thin bar over it; `unreachable` is the form with the offline note and
«إعادة المحاولة» above it (production shows the note alone, with no form) — *a proposal: the request
itself answers where the recovery stands, so the form need not wait for the read.* Reset password's
`loading` is the form's shape as a skeleton with a thin bar, not a spinner.

A password sign-in of an account made with Google answers `INVALID_CREDENTIALS`, the same as a wrong
password, by design (the API never says which): its state is `error`.

## The owner's choice

- Not yet.
- Promoted into the original: not yet.
- Built in masaha: not yet.
