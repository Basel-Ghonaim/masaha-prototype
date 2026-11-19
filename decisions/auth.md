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
state, the language, the theme and the width (or all three widths), or «قارن التصاميم»: the original and its designs side by side at 390, two by two at
768 and 1440 (it opens at 390). The view is kept in the address.

## How the variants are built

- Each page's variant is `variants/<Page>/<design>.jsx` and `.css`, registered in
  `variants/index.js` under the names below (built inside a function, so the file adds no
  top-level name to the pages' one global scope). The five files of a design are two lines each: they
  load one kit, **`variants/_auth/kit.jsx`**, compiled by the page's own Babel (a synchronous read, once),
  and draw their page; the CSS files import `_auth/base.css` and `_auth/<design>.css`. The page logic is
  one for every design, so a state behaves the same in each and only the design differs.
- The kit reads the shared modules (`shared.jsx`, `auth.jsx`) and changes none; its names start with
  `Ax`/`ax`, so no page global is overwritten.
- **The reset e-mail** has no script for a `?v=` to replace, and the original is never edited, so its
  design is a standalone page: `variants/Reset email/<design>.html` (the lab shows it).

## The fixed points each design keeps

- **The layout (A1):** from 1280 two columns — the form on the start side, no card; the ink panel at the
  end. 768–1279 one column, the h1 at a fixed offset from the top on every page (no vertical centring).
  The phone: full width, no card, no frame (no line under the header either); fields and buttons 52 px (Slate's
  polish: 48 px).
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
- **The critique's points:** Google's button in Google's dark theme with no white frame (1, 2); Slate's
  polish draws it at the box production's Google button has, 40 × at most 400, and sizes the column to it; forgot password's form shown at once, the recovery's read a
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

### `slate` — «اللوح» Slate (2026-11-15; polished the same day, after the owner chose it)
*The A1 as written: the form quiet on the page, beside it an ink slab with the whole Strip, drawn.*
- **What it changes:**
  - **The panel:** two equal columns. The Strip the full height of the panel, at its far side: a quiet
    land (`neutral-800` mixed half into `neutral-900`, its border `neutral-700`), its **coast drawn as
    its own line**, finer and brighter (`neutral-300`, 1.25 px; 1.5 px from 1440). The spaces are
    berry dots of a size in **screen pixels** (9 px across, a 1.5 px ring of the panel's colour), so
    the Strip's scale never shrinks them. Gaza City's nine sit closer together than a dot is wide, so
    a **circle over the sea** shows that city four times larger, its coast running through it, tied to
    a ring on the Strip by a thin line: the nine read as nine. All 13 show at 1280, 1440 and 1920 and
    at the panel's 640 px minimum height. The title, its line and the caption sit in the bottom-right
    corner the land leaves empty (the start in Arabic, the end in English). On the forced change the
    panel shows the logo, the drawing and its caption only: no «أين تعمل اليوم؟» to a staff member.
  - **Dark:** the panel is as deep as the page (`neutral-950`), set apart by its hairline
    (`neutral-800`) and the drawing (land `neutral-900`): never a lighter grey card.
  - **Below 1280:** a small solid Strip (27 × 34 px, `neutral-400`; dark `neutral-600`) beside the
    logo, clear of its 8 px space, its spaces in the berry: the brand's touch on the phone and tablet.
  - **The form:** 400 px wide, its h1 at 128 px from the top (72 px on the tablet, 24 px under the
    header on the phone). One **8 px rhythm**: label to field 8, field to its line 8, 24 between
    fields, 32 to the button and between the head, the body and the foot. The foot is **one quiet
    group, centred** on the column (the owner's word): the links, and on register the owners' note at
    its head. The sign-in button has no icon. States are the design system's alerts. The sent
    address carries a berry dot.
  - **The column's heights:** Google's row is drawn at the box production's Google button has
    (`size: large`): **40 px tall, as wide as the column up to 400, its own 4 px corners**; Google's
    own dark button in dark, no white frame. The fields and the submit are **40 px from 768 with a
    mouse** (the system's `control-height`, the same 40 as Google's), **44 px on touch** from 768,
    and **48 px on the phone** — A1's larger controls there, Google's row staying 40.
  - **The password conditions:** one line under the field, on register, reset and the forced change,
    the field's description and `aria-live="polite"`: before typing, muted, «8 أحرف على الأقل، فيها
    حرف ورقم»; while typing, only what is missing («ينقصها رقم»، «ينقصها حرف ورقم»، «ينقصها 3 أحرف
    لتصل إلى 8»، «ينقصها رقم، وحرفان آخران لتصل إلى 8»…); once all are met, a berry tick and «كلمة
    المرور مناسبة»; past 72 bytes, production's «طويلة جدًا — اختصرها». A submit with a rule unmet
    shows production's field error, focused. The rules are production's: 8 characters, any letter
    `\p{L}`, any digit `\p{N}`.
  - **Smaller:** «نسيت كلمة المرور؟» and «سجّل الدخول بهذا البريد» take a 44 px target; the panel's
    logo shows its focus in `neutral-50` on the ink; forgot password's offline note over the form uses
    the form's words («تعذّر الاتصال»، «تحقّق من اتصالك بالإنترنت ثم حاول مرة أخرى.»). No motion.
- **Proposed against masaha's design system:**
  - The auth page's h1 at `heading-1` (30 px; 28 on the phone) instead of the card title's 17 px —
    *the page needs a title, not a card's.*
  - The panel's title at 40 / 1.35 / 600, a step between `heading-1` and `display` — *the brand's line,
    seen from across the room on a 1440 screen.*
  - Controls of 48 px on the phone (`control-height` is 40, 44 on touch) — *A1's larger fields where
    thumbs are*; from 768 the system's own heights, matching Google's 40.
  - The panel: a full-height ink surface, a new surface; in dark, `neutral-950` with a hairline.
  - The password's rules as one line of what is missing, replacing `PasswordRules`' checklist (the
    owner's choice) — *the heaviest element of the page becomes one quiet line.*
  - A drawing of the Strip with a magnified circle: a new kind of figure.
- **Kept:** the system's alerts, type face and weights, its radii; the order of the form.
- **The polish** is behind Slate's own flag (`polish` in the kit's `AX_DESIGNS`) and stylesheet.

### `slate2` — «اللوح ٢» Slate 2 (Sign in only, 2026-11-19)
*The owner's critique of Slate's panel: it looked half empty — a logo, a drawing and a few words — and
its parts unrelated. The supervisor's reading: three islands on no common line, a drawing cut off at
random, a panel larger than what it carries, and its line repeating the form's lede.*
- **What it changes (the panel only; the form is Slate's, the frame carries `ax--slate` too):**
  - **The panel is narrower:** 5 : 7 (the form's column the wider).
  - **The Strip is the panel's art:** drawn larger than the panel (`slice`), its land running off the
    top and the bottom, **all 13 spaces in view** at 1280, 1440 and 1920; **no lens** — at this size
    Gaza City's nine read apart on the Strip itself.
  - **The words are one block** in the bottom-right corner the land leaves empty (the start in Arabic,
    the end in English): the title and a **new line on what the product is** (not the form's lede again).
  - **The logo leaves the panel** for the page's header, at its start beside the tools, as below 1280.
- **Proposed against masaha's design system:** the panel at 5 : 7.
- **The owner's look (2026-11-19):** a count of the spaces was tried under the words and removed — "it
  will change, and has nothing to do with a sign-in page". And the drawing "is now neither east nor west:
  nothing can be understood from it" — the Strip cropped this large no longer reads as a place. A new
  round of designs follows, by a worker of its own (the supervisor's `DESIGN\AUTH\7_NEW_DESIGNS_PROMPT.md`).
- **Kept:** Slate's form, its rhythm, its states; the ink panel; the drawing's grid, coast and sea lines.

### `atlas` — «الأطلس» Atlas (Sign in only, 2026-11-19, round 4)
*The owner's look at Slate 2: the drawing "is neither east nor west — nothing can be understood from it". A map
does not read as a place because it is drawn larger. It reads as one through its names, its north and its water.
Round 4's designer (`DESIGN\AUTH\8_REPORT.md`): Slate's panel failed because nothing on it could be read, and
because its parts never pointed at each other.*
- **What it changes (the panel; the form is Slate's, and the frame carries `ax--slate` too):**
  - **The panel is an atlas page,** 1 : 1 from 1280, in the ink (Slate's deepest ink in dark). It reads top to
    bottom:
    - the question «أين تعمل اليوم؟» and Slate 2's line on what the product is;
    - the atlas;
    - the key «كل نقطة مساحة عمل في الدليل», with a berry square.
  - **The atlas:**
    - The whole Strip, north up, never mirrored. The map is always west of its index, in both languages.
    - It is drawn at the largest size the panel leaves it (about 1.35 px per 111 m at 1440).
    - The land is Slate's dot grid, with a hairline border. The coast is the one bright line.
    - The sea is hatched horizontally in a band along the coast, as engraved maps draw water, and named
      «البحر المتوسط».
    - A north arrow with «ش» sits at its head.
    - The 13 spaces are berry squares, 7 px, with the logo's rounded corners, ringed in the ink. There is no lens:
      Gaza City's nine read as a cluster, which is what they are.
  - **The index:** to the land's east, four places, each on a parallel (a hairline at the mean latitude of its
    spaces) that runs from its spaces to its name:
    - غزة, for Gaza City's nine;
    - النصيرات, for two;
    - دير البلح, for one;
    - المواصي, for one.
    The names are the directory's own lookups: the governorate for Gaza City, the area for the others. The
    snapshot gives Gaza City's nine three areas, one of them wrong (Golden Hub is filed under «شمال قطاع غزة» but
    sits in Gaza City), so the city is named by its governorate. In Arabic the names end on the question's edge
    (the right). In English the map starts on it (the left).
  - **Below 1280,** the same panel closes the page under the form, at full width. The map is sized by the width
    (0.6–1.15 px per 111 m), and the sea's name wraps rather than cross the hatching.
  - **The logo** stays in the header at every width, as in Slate 2.
  - Every stroke, square and label keeps its screen size (measured once laid out, and again on a resize).
- **Proposed against masaha's design system:**
  - **Place names on the drawing,** and a north mark and the sea's name. The earlier rounds chose "no place
    names"; this proposes them, because they are what make the drawing a place.
  - **A berry mark as a rounded square,** the logo's own dot, wherever the spark marks a place.
  - The panel at 1 : 1, with Slate's surface and Slate's 40 px title.
- **Kept:** Slate's form, its rhythm and its states; the ink panel; the Strip's outline and its 13 real spaces; no
  count of any kind. In production, the squares and the names would both come from the directory's pins and
  lookups, never from a list written by hand.

### `threshold` — «العتبة» Threshold (Sign in only, 2026-11-19, round 4)
*No panel and no art. The owner's "half empty" is answered with function: the width goes to the page's two
audiences, people coming back and people who are new (or who run a space). GOV.UK's sign-in, with its masthead,
heading and one column, and GitHub's and Amazon's "new here?" block are the references.*
- **What it changes:**
  - **An ink masthead at every width,** the full width of the page. It holds:
    - the logo (the dark one) and the tools, on the ink;
    - the page's h1 at display size: 44 px from 1024, 40 on the tablet, 30 on the phone;
    - the lede, in `neutral-300`.
    In dark, the masthead is Slate's deepest ink, with a hairline at its foot.
  - **The current path:** a 4 px edge in the berry at the masthead's foot, exactly over the form's column. This is
    the design system's own selected mark (an edge), marking the form you are on.
  - **The two ways in,** on one grid under the masthead:
    - the form at the start, 400 px, as Slate's;
    - from 1024, beside it and past a hairline, the way for a new account: «ليس لديك حساب؟» as an h2,
      register's own line, «إنشاء حساب» as an outline button (it keeps `next`), and register's owners' note with
      «تواصل معنا».
    Below 1024 that column follows the form, after a hairline.
  - **The foot line goes:** its words now head the new-account column.
- **Proposed against masaha's design system:**
  - An auth page's h1 at `display` (44 / phone 30), on an ink masthead: a new surface, the ink as a page's head.
  - The selected edge used at the scale of a page, to mark the current path.
  - Sign-in carrying register's line and the owners' note: words production has, on register.
- **Kept:** Slate's form, its rhythm and its states. All the words are the catalogue's; this design adds none.
  There is still no way back, since the logo is the way home (Slate's order).

### The reset e-mail, in Slate
Within e-mail limits (tables, inline styles, no SVG, no image, no web font required); the brand is the
word «مساحة», as production's e-mail has it; production's words and its link printed as text.
- **Slate:** the ink band with the word in white, the card under it, the button the card's width, and
  the action's words as the card's title. No spark.
- The greeting «مرحبًا،» is kept but joined to the request's line; the title is the action's own words
  («تعيين كلمة مرور جديدة»), no new words.

## New words (proposals — the owner settles them)

| Where | Arabic | English |
|---|---|---|
| The panel's title | أين تعمل اليوم؟ | Where will you work today? |
| The panel's line | بحسابك تحفظ مساحاتك المفضّلة وتتابع بلاغاتك، ومنه يدير أصحاب المساحات مساحاتهم. | Your account keeps your favourite spaces and follows your reports; space owners run their space from it. |
| The Strip's caption | كل نقطة مساحة عمل في الدليل | Each dot is a space in the directory |
| Slate 2's panel line | دليل مساحات العمل في قطاع غزة: ساعاتها وأسعارها، وهل هي مفتوحة الآن. | The Gaza Strip's coworking directory: their hours, their prices, and whether they're open now. |
| Atlas: the drawing's north | ش | N |
| Atlas: the sea's name | البحر المتوسط | Mediterranean Sea |
| Atlas: the index (assistive) | مناطق مساحات العمل في الدليل | Where the directory's coworking spaces are |
| The Strip's name (assistive) | رسم لقطاع غزة، عليه مساحات العمل في الدليل | A drawing of the Gaza Strip, with the directory's coworking spaces on it |
| The Strip's description (assistive) | رسم فنّي لا خريطة. النقاط من بيانات الدليل في 14 نوفمبر 2026. | An artistic drawing, not a map. The dots are from the directory's data of 14 November 2026. |
| The letter rule (replaces «حرف واحد على الأقل»; the checklist, which Slate's one line replaces) | حرف واحد على الأقل، بأي لغة | At least one letter, in any language |
| Slate's password line, before typing | 8 أحرف على الأقل، فيها حرف ورقم | At least 8 characters, with a letter and a number |
| … while typing: a letter, a digit, both | ينقصها حرف · ينقصها رقم · ينقصها حرف ورقم | Needs a letter · Needs a number · Needs a letter and a number |
| … while typing: the length alone (1, 2, 3–7) | ينقصها حرف واحد / حرفان / N أحرف لتصل إلى 8 | Needs 1 more character / N more characters to reach 8 |
| … while typing: both | ينقصها رقم، وحرف آخر / وحرفان آخران / وN أحرف أخرى لتصل إلى 8 | Needs a number and N more characters to reach 8 · Needs a letter, a number and N more characters to reach 8 |
| … once met (after a berry tick) | كلمة المرور مناسبة | Good password |

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

- 2026-11-15 — **`slate` «اللوح» chosen**: "the one I like most, but it has errors and needs work to
  look more professional". Coast and Dots stay as they are, with no more work on them. Slate then had
  one polish round (above), from the review of the three designs and the supervisor's look at its
  captures; the one-line password conditions and the centred foot are the owner's own points.
- 2026-11-19 — **Coast and Dots retired** (the owner's word: "we won't adopt them"): their files, the
  lab's two entries and the kit's code for them removed. Their description is this file's history
  before this date. Slate stays.
- 2026-11-15 — **the owner's mix for Slate's drawing**, drawn by the supervisor: the land as a fine dot grid, the coast one bright line with three faint sea lines, the 13 real spaces in the berry, and a berry lens over the sea that shows Gaza City ×3.5 — fully over the sea (the earlier circle edged onto the land). The phone's small Strip mark is removed (it read as a stray icon).
- 2026-11-15 — **the panel is the deepest surface in both themes**: in dark a step deeper than the page in the same cool ink (`neutral-950` 70 % with black). A berry-tinted panel was tried and rejected by the owner (two blacks of different hue, and lighter than the page).
- 2026-11-15 — **the order** (the owner's points): register's owners' note under the lede, before the form; the privacy line under the button; the foot one line («لديك حساب؟ تسجيل الدخول» / «ليس لديك حساب؟ إنشاء حساب») — «العودة إلى الرئيسية» dropped from sign in and register, the logo being the way home. Forgot and reset keep their way back to sign in.
- Promoted into the original: not yet.
- Built in masaha: not yet.
