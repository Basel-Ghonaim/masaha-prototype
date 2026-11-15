# Masaha project brief (apply to every page and every variant)

> Updated 2026-11-15, when the archive moved to its own repository and design work became page
> variants. The brief the screens were first designed against is in the history, at the tag
> `design-2026-09-29`. The product's facts are masaha's ([CLAUDE.md](../CLAUDE.md)); this brief is
> the short form a designer works from.

## Who uses it

- **Visitors**, signed in or not: remote workers, students and anyone who needs a place with power
  and internet in the Gaza Strip, often on a phone and a weak connection. They find a space, see
  whether it is open and has room, its prices and how to reach it.
- **Space owners**: run their space from the dashboard — the front desk, customers, payments,
  finance, the space's public page, staff and settings.
- **Reception staff** of one space: the front desk, customers, their own payments of the day,
  announcements.
- **The platform's admin**: the spaces, their owners, the users, the data reports, the lookups and
  the platform's settings.

## Fixed

- Default: Arabic RTL, light, phone 360 + desktop 1280. Every page also has its dark theme and its
  English LTR version (the `?theme=dark` and `?lang=en` versions of the same page).
- The identity: ink + berry and the logo, as masaha's design system takes them.
- In scope (dashboard): staff accounts (Reception role) and manual payment recording at the desk
  (cash / transfer).
- Out of scope — never show or mention: seat booking/reservation, online payment, printed
  invoices/receipts, expenses and profit, point of sale, reviews/ratings, QR codes, in-app claiming
  of a space, automated notifications (email/SMS/push).
- No fake data: no ratings, no seat counts, no invented figures.

## What a variant may change

Masaha's design system (its components, tokens and conventions: logical sides, words as props) is
where every page starts. A variant may **propose** a change to it: the layout, the type scale and the
typeface, spacing, surfaces (cards, borders, shadows, radii), imagery and motion. Each change is
stated as a proposal in the page's decision file (`decisions/<Page>.md`), with its reason, since the
design system itself changes only in masaha. The identity's colours are not a proposal: they are
fixed.

## Product rules
- Live status is a state, never a number: متاح / ممتلئ / مغلق الآن. Unverified spaces: "لا تتوفر حالة مباشرة". Capacity never shown publicly.
- Prices display only ("للعرض فقط · الدفع في المساحة") with "آخر تحديث قبل …". Periods optional (hour/day/week/month); price may be for students or a shift ("شهري — الوردية الصباحية"). Stale + unverified: hide number, show "السعر غير محدّث — تواصل مع المساحة". Stale + verified: show with "قد يكون تغيّر".
- Areas: governorate → area. Hours: one range per day, Friday often closed; shifts may exist inside hours.
- Contacts are a list (WhatsApp, phone, email, Instagram, Facebook, TikTok, website); numbers LTR.
- Unverified space: "هل أنت صاحب المساحة؟ تواصل معنا". Every space page: "الإبلاغ عن معلومة خاطئة".
- Show loading (skeleton), empty and error states where a screen has data.

## Dashboard roles
- OWNER: نظرة عامة · مكتب الاستقبال · الزبائن · الدفعات · المالية والتقارير · الباقات والأسعار · ملف المساحة · الإعلانات · بلاغات البيانات · الموظفون · الإعدادات; space switcher.
- RECEPTION (one space, no switcher): مكتب الاستقبال · الزبائن · دفعاتي اليوم · الإعلانات. No overview, no income figures.
- Both: top-bar public state badge + «ضبط الحالة» (Full for 30 د / ساعة / ساعتين / حتى الإغلاق).
- No «يومي» subscription; a same-day visit is a visit, never a subscriber.

## Sample data
Focus Hub, Number One Hub, Branch Hub, ZM Hub, Golden Hub, White Space in An-Nasr and Al-Rimal (Gaza City). 3–4 ₪/hour, 14–30 ₪/day, 90–150 ₪/week, 270–500 ₪/month; Number One Hub has a student month at 250 ₪. Placeholder phones/emails only.
Dashboard demo: Focus Hub, capacity 40 (private), 27 present; owner «أحمد», receptionist «سامي». Prices ساعة 3 · يوم 15 · أسبوع 90 · شهر 300 · شهر طلاب 250 ₪.
