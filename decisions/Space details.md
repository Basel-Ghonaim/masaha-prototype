# Space details

Page: `prototype/Space details.html` · screen 3 of [SCREENS.md](../SCREENS.md)

## Variants

### `inplace` — الدخول في مكانه / Sign in in place (2026-11-24)
- **What it changes:** the heart and «الإبلاغ عن معلومة غير صحيحة» no longer open a dialog with two links to the
  sign-in and register pages; they open the sign-in itself over this page, titled by the action. From 768 px it is
  a dialog; below it a full-screen panel with a top bar and its close button, sliding up (none under reduced motion).
  Opening it adds one history entry at the same address, so Back closes it and keeps the page. Signing in keeps the
  page and completes the action (the heart filled and its toast, or the report dialog open). On a phone the focus
  goes to the title, so the keyboard does not open at once.
- **Proposed against masaha's design system:** an overlay that is a dialog on wide screens and a full-screen panel on
  a phone (the layer has `Dialog` and `Sheet`, neither switches by width); the primary action in the berry — a step
  darker than the spark in light (`spark-600`, white text), the spark in dark (`spark-400`, dark text) — against
  ADR 0019's "never on an action" (the owner's A18, 2026-11-24).
- **Kept:** the page itself; the reasons' titles and lines; Google first, then the e-mail and the password.
- **Not yet (P2):** register and the reset link's request inside the overlay, every state (wrong password, rate
  limit, Google unavailable, the e-mail taken), the focus back on the heart after closing.
- **Why:** AUTH_IN_PLACE (masaha's ADR 0021, in draft): a guest who presses the heart is most often new; the round
  trip through the pages sent exactly them away.

## The owner's choice

- 2026-11-24 — **inplace** P1 approved by the owner: the shell (a dialog from 768 px, a full-screen panel with a
  close button below it, Back closing it) and the berry primary action. P2 (the content and every state) next.
- Promoted into the original: not yet.
- Built in masaha: not yet.
