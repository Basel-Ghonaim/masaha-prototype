# Decisions, one file per page

Each page that has a variant gets one file here, `decisions/<Page>.md` (the page's file name, as
`Sign in.md`), created with its first variant. It says what each variant proposes and what the owner
chose, so the reasons outlive the conversation that settled them. The page's original is described
by the page itself, and by [CHANGES.md](../CHANGES.md) for what changed before variants.

## The template

```markdown
# <Page>

Page: `prototype/<Page>.html` · screen <n> of [SCREENS.md](../SCREENS.md)

## Variants

### `<name>` — <its label> (<date>)
- **What it changes:** the layout, type, spacing, surfaces, imagery or motion, in a line each.
- **Proposed against masaha's design system:** each change that the design system does not have
  today (a typeface, a type step, a spacing step, a surface), with its reason.
- **Kept:** anything a reader might expect it to change and it does not.

## The owner's choice

- <date> — **<name>** chosen (or: the original kept), because <why>. What is kept from the others.
- Promoted into the original: <date, commit> (or: not yet).
- Built in masaha: <PR> (or: not yet).
```

A variant's file never edits the page or the shared modules ([CLAUDE.md](../CLAUDE.md)); the
decision file is where its proposal is said in words.
