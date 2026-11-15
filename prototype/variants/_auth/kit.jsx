// The auth pages' three designs — «اللوح» Slate, «الساحل» Coast, «النقاط» Dots — in one kit
// (decisions/auth.md). Each auth page's variant (`variants/<Page>/<design>.jsx`) is two lines: it loads
// this file once, compiled by the page's own Babel, and draws its page in its design. The shared
// modules (masaha/shared.jsx, masaha/auth.jsx) are read, never changed; every name here starts with
// `Ax` or `ax`, so no page's global is overwritten. The page logic is one; each design is its CSS
// (`_auth/<design>.css` over `_auth/base.css`) and the few choices in AX_DESIGNS.
(function () {
  const DS = window.MasahaDesignSystem;
  const { DirectionProvider, Field, Input, InputAction, Button, EyeIcon, EyeOffIcon, LogInIcon, LogOutIcon, CheckIcon, CircleCheckIcon, CircleAlertIcon, TriangleAlertIcon, InfoIcon, LanguagesIcon, MoonIcon, SunIcon, ArrowStartIcon } = DS;

  // ── What each design decides beyond its stylesheet ──
  const AX_DESIGNS = {
    slate: { ownerNote: 'bottom', wayBackTop: false },
    coast: { ownerNote: 'top', wayBackTop: true },
    dots: { ownerNote: 'top', wayBackTop: false },
  };

  // ── Words. The product's own are masaha's catalogue (apps/web/src/shared/copy), as they are;
  //    the ones marked NEW are proposals (decisions/auth.md › New words). ──
  const W = {
    home: tr('مساحة — الرئيسية', 'Masaha — home'),
    brand: tr('مساحة', 'Masaha'),
    // NEW: the panel's title, line, and the drawing's caption and name.
    panelTitle: tr('أين تعمل اليوم؟', 'Where will you work today?'),
    panelLine: tr('بحسابك تحفظ مساحاتك المفضّلة وتتابع بلاغاتك، ومنه يدير أصحاب المساحات مساحاتهم.', 'Your account keeps your favourite spaces and follows your reports; space owners run their space from it.'),
    caption: tr('كل نقطة مساحة عمل في الدليل', 'Each dot is a space in the directory'),
    stripName: tr('رسم لقطاع غزة، عليه مساحات العمل في الدليل', 'A drawing of the Gaza Strip, with the directory’s coworking spaces on it'),
    stripDesc: tr('رسم فنّي لا خريطة. النقاط من بيانات الدليل في 14 نوفمبر 2026.', 'An artistic drawing, not a map. The dots are from the directory’s data of 14 November 2026.'),
    lang: LANG === 'en' ? 'العربية' : 'English',
    themeTo: (t) => (t === 'light' ? tr('المظهر الداكن', 'Dark theme') : tr('المظهر الفاتح', 'Light theme')),
    // catalogue: auth
    email: tr('البريد الإلكتروني', 'Email'),
    password: tr('كلمة المرور', 'Password'),
    name: tr('الاسم', 'Name'),
    or: tr('أو', 'or'),
    google: tr('المواصلة باستخدام Google', 'Continue with Google'),
    googleBusy: tr('جارٍ المتابعة باستخدام Google…', 'Continuing with Google…'),
    googleFailed: tr('تعذّرت المتابعة باستخدام Google', 'Couldn’t continue with Google'),
    googleLines: {
      token: tr('لم يتمكّن Google من تأكيد حسابك. حاول مرة أخرى، أو استخدم البريد الإلكتروني وكلمة المرور.', 'Google couldn’t confirm your account. Try again, or use your email and password.'),
      notallowed: tr('يوجد حساب بهذا البريد الإلكتروني. سجّل الدخول بكلمة مروره؛ وإن لم تعرفها فأعد تعيينها من «نسيت كلمة المرور»، أو اطلبها ممّن أنشأ حسابك.', 'An account with this email already exists. Sign in with its password; if you don’t know it, reset it under “Forgot password”, or ask whoever created your account.'),
      unavailable: tr('الدخول باستخدام Google غير متاح الآن. استخدم البريد الإلكتروني وكلمة المرور، أو حاول لاحقًا.', 'Google sign-in isn’t available right now. Use your email and password, or try again later.'),
    },
    enterName: tr('أدخل اسمك', 'Enter your name'),
    badEmail: (<>{tr('تحقّق من كتابة البريد الإلكتروني، مثل', 'Check the email address, for example')} <Ltr>name@example.com</Ltr></>),
    enterPassword: tr('أدخل كلمة المرور', 'Enter your password'),
    rulesUnmet: tr('كلمة المرور لا تستوفي الشروط أدناه', 'The password doesn’t meet the rules below'),
    signIn: {
      title: tr('تسجيل الدخول', 'Sign in'),
      lede: tr('سجّل الدخول لحفظ مساحاتك المفضّلة ومتابعة بلاغاتك، أو لإدارة مساحتك.', 'Sign in to save your favourite spaces and follow your reports, or to run your space.'),
      submit: tr('تسجيل الدخول', 'Sign in'),
      failed: tr('تعذّر تسجيل الدخول', 'Couldn’t sign in'),
      creds: tr('البريد الإلكتروني أو كلمة المرور غير صحيحة.', 'The email or password is incorrect.'),
      forgot: tr('نسيت كلمة المرور؟', 'Forgot password?'),
      noAccount: tr('ليس لديك حساب؟', 'No account?'),
      create: tr('إنشاء حساب', 'Create account'),
      idle: tr('انتهت جلستك بعد 15 دقيقة دون نشاط. سجّل الدخول من جديد.', 'Your session ended after 15 minutes with no activity. Sign in again.'),
      welcome: tr('أهلًا بعودتك', 'Welcome back'),
    },
    register: {
      title: tr('إنشاء حساب', 'Create account'),
      lede: tr('احفظ مساحاتك المفضّلة وتابع البلاغات التي ترسلها.', 'Save your favourite spaces and follow the reports you send.'),
      submit: tr('إنشاء الحساب', 'Create account'),
      failed: tr('تعذّر إنشاء الحساب', 'Couldn’t create the account'),
      taken: tr('يوجد حساب بهذا البريد الإلكتروني.', 'An account with this email already exists.'),
      signInInstead: tr('سجّل الدخول بهذا البريد', 'Sign in with this email'),
      have: tr('لديك حساب؟', 'Have an account?'),
      signIn: tr('تسجيل الدخول', 'Sign in'),
      privacyRead: tr('اقرأ', 'Read the'),
      privacyLink: tr('سياسة الخصوصية', 'privacy policy'),
      ownerNote: tr('تدير مساحة عمل؟ حسابات أصحاب المساحات ينشئها فريق مساحة.', 'Run a coworking space? Space owner accounts are created by the Masaha team.'),
      contact: tr('تواصل معنا', 'Contact us'),
    },
    forgot: {
      title: tr('نسيت كلمة المرور', 'Forgot password'),
      lede: tr('أدخل البريد الذي سجّلت به، وسنرسل إليه رابطًا لتعيين كلمة مرور جديدة.', 'Enter the email you signed up with, and we’ll send it a link to set a new password.'),
      submit: tr('أرسل رابط الاستعادة', 'Send reset link'),
      failed: tr('تعذّر إرسال الرابط', 'Couldn’t send the link'),
      sentTitle: tr('تفقّد بريدك الإلكتروني', 'Check your email'),
      sentMessage: tr('إذا كان هذا البريد مسجّلًا لدينا، ستصلك رسالة فيها رابط لتعيين كلمة مرور جديدة. الرابط صالح لمدة ساعة. تفقّد مجلد الرسائل غير المرغوب فيها.', 'If this email is registered with us, you’ll get a message with a link to set a new password. The link is valid for one hour. Check your spam folder.'),
      sentTo: tr('أُرسلت إلى', 'Sent to'),
      resend: tr('أعد الإرسال', 'Resend'),
      resendIn: tr('أعد الإرسال بعد', 'Resend in'),
      resendLimit: tr('طلبت الرابط مرات كثيرة. أدخل بريدك الإلكتروني من جديد لطلب رابط آخر.', 'You’ve asked for the link too many times. Enter your email again to ask for another.'),
      enterAgain: tr('أدخل بريدك الإلكتروني من جديد', 'Enter your email again'),
      another: tr('استخدم بريدًا آخر', 'Use another email'),
      openTitle: tr('فتحت رابط الاستعادة', 'You’ve opened a reset link'),
      openLede: (m) => tr(<>للحساب <Ltr>{m}</Ltr>. عيّن كلمة المرور الجديدة، أو اطلب رابطًا جديدًا.</>, <>For <Ltr>{m}</Ltr>. Set your new password, or ask for a new link.</>),
      continue: tr('تعيين كلمة مرور جديدة', 'Set a new password'),
      noAccess: tr('لا يمكنك الوصول إلى بريدك؟', 'Can’t access your email?'),
      contact: tr('تواصل معنا', 'Contact us'),
      back: tr('العودة إلى تسجيل الدخول', 'Back to sign in'),
    },
    reset: {
      title: tr('تعيين كلمة مرور جديدة', 'Set a new password'),
      forAccount: (m) => tr(<>للحساب <Ltr>{m}</Ltr></>, <>For <Ltr>{m}</Ltr></>),
      newPassword: tr('كلمة المرور الجديدة', 'New password'),
      submit: tr('حفظ كلمة المرور', 'Save password'),
      failed: tr('تعذّر حفظ كلمة المرور', 'Couldn’t save the password'),
      checkFailed: tr('تعذّر التحقّق من الرابط', 'Couldn’t check the link'),
      reopen: tr('افتح الرابط من بريدك الإلكتروني مرة أخرى.', 'Open the link in your email again.'),
      invalidTitle: tr('انتهت صلاحية الرابط أو استُخدم من قبل', 'The link has expired or was already used'),
      invalidLede: tr('روابط الاستعادة صالحة لمدة ساعة ولمرة واحدة فقط.', 'Reset links are valid for one hour and can be used once.'),
      requestNew: tr('اطلب رابطًا جديدًا', 'Request a new link'),
      doneTitle: tr('تم تغيير كلمة المرور، وسُجّل خروجك من كل الأجهزة', 'Your password was changed, and you were signed out on all devices'),
      doneLede: tr('سجّل الدخول بكلمة المرور الجديدة.', 'Sign in with your new password.'),
      signIn: tr('تسجيل الدخول', 'Sign in'),
    },
    change: {
      title: tr('اختر كلمة مرور جديدة', 'Choose a new password'),
      lede: tr('هذه كلمة مرور مؤقتة. اختر كلمة مرورك لتتابع.', 'This is a temporary password. Choose your own password to continue.'),
      submit: tr('حفظ والمتابعة', 'Save and continue'),
      failed: tr('تعذّر حفظ كلمة المرور', 'Couldn’t save the password'),
      saved: tr('حُفظت كلمة المرور الجديدة', 'Your new password is saved'),
      signOut: tr('تسجيل الخروج', 'Sign out'),
    },
    // catalogue: forms, status
    show: tr('إظهار كلمة المرور', 'Show password'),
    hide: tr('إخفاء كلمة المرور', 'Hide password'),
    rulesLabel: tr('شروط كلمة المرور', 'Password rules'),
    met: tr('— تحقّق', '— met'),
    notMet: tr('— لم يتحقّق بعد', '— not met yet'),
    retryIn: (w) => tr(<>محاولات كثيرة، حاول بعد <Ltr>{w}</Ltr></>, <>Too many attempts. Try again in <Ltr>{w}</Ltr>.</>),
    offlineTitle: tr('تعذّر الاتصال', 'Couldn’t connect'),
    offlineText: tr('تحقّق من اتصالك بالإنترنت ثم حاول مرة أخرى.', 'Check your internet connection and try again.'),
    noNetTitle: tr('لا يوجد اتصال بالإنترنت', 'No internet connection'),
    noNetText: tr('ستظهر البيانات عند عودة الاتصال.', 'The data will appear when you’re back online.'),
    errorTitle: tr('حدث خطأ غير متوقع', 'Something went wrong'),
    errorText: tr('المشكلة عندنا، لا عندك. حاول مرة أخرى بعد قليل.', 'The problem is on our side, not yours. Try again in a moment.'),
    retry: tr('إعادة المحاولة', 'Try again'),
    loading: tr('جارٍ التحميل', 'Loading'),
  };
  // The rules production holds (packages/shared › users › password): any letter, Arabic included (\p{L}).
  const AX_RULES = [
    { id: 'len', label: tr('8 أحرف على الأقل', 'At least 8 characters'), test: (v) => v.length >= 8 },
    // NEW words: the rule accepts any letter, and now says so (critique 11).
    { id: 'letter', label: tr('حرف واحد على الأقل، بأي لغة', 'At least one letter, in any language'), test: (v) => /\p{L}/u.test(v) },
    { id: 'digit', label: tr('رقم واحد على الأقل', 'At least one number'), test: (v) => /[0-9٠-٩]/.test(v) },
    { id: 'bytes', label: tr('طويلة جدًا — اختصرها', 'Too long — shorten it'), test: (v) => new TextEncoder().encode(v).length <= 72, onlyBroken: true },
  ];
  const axPasswordOk = (v) => AX_RULES.every((r) => r.test(v));
  const AX_MASKED = 's•••@example.com';
  const AX_WA = 'https://wa.me/970590000099';

  // ── The Strip (A2): an artistic drawing, north up, never mirrored. The outline is round 3's
  //    approximate one (not survey data); the dots are the directory's 13 spaces at their real
  //    coordinates, from the live public API's snapshot of 2026-11-14. ──
  const AX_OUTLINE = [[31.5944, 34.4898], [31.56, 34.463], [31.523, 34.43], [31.49, 34.403], [31.46, 34.376], [31.43, 34.341], [31.39, 34.294], [31.36, 34.256], [31.33, 34.23], [31.316, 34.219], [31.22, 34.267], [31.248, 34.288], [31.29, 34.323], [31.33, 34.36], [31.38, 34.395], [31.425, 34.42], [31.46, 34.45], [31.495, 34.49], [31.525, 34.515], [31.552, 34.542], [31.588, 34.564]];
  const AX_SPACES = [['focus-hub', 31.53294, 34.45491], ['number-one-hub', 31.52861, 34.45009], ['masahat', 31.52788, 34.43792], ['branch-hub', 31.522347, 34.448569], ['jreas-hub', 31.51981, 34.45768], ['white-space', 31.51938, 34.4473], ['pal-hub', 31.51593, 34.45156], ['golden-hub', 31.51483, 34.45052], ['garden-hub', 31.51304, 34.45432], ['elevate-hub', 31.4501, 34.3942], ['coma-io', 31.44657, 34.39386], ['al-salam-hub', 31.42013, 34.34659], ['masar-tech', 31.36569, 34.27055]];
  // Equirectangular at the Strip's latitude, in units of 0.001° of latitude (about 111 m): x east, y south.
  const K = Math.cos((31.41 * Math.PI) / 180);
  const axP = (lat, lng) => [+((lng - 34.219) * K * 1000).toFixed(2), +((31.5944 - lat) * 1000).toFixed(2)];
  const AX_PTS = AX_OUTLINE.map((p) => axP(p[0], p[1]));
  const AX_DOTS = AX_SPACES.map((s) => ({ id: s[0], xy: axP(s[1], s[2]) }));
  const AX_W = 294.5, AX_H = 374.4;
  // The coast (points 0–9) drawn as a smooth curve; the land borders as straight lines.
  function axCoastD(shift) {
    const c = AX_PTS.slice(0, 10).map((p) => [p[0] - (shift || 0), p[1]]);
    let d = 'M' + c[0].join(' ');
    for (let i = 0; i < c.length - 1; i++) {
      const p0 = c[i - 1] || c[i], p1 = c[i], p2 = c[i + 1], p3 = c[i + 2] || p2;
      const b1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const b2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${b1[0].toFixed(2)} ${b1[1].toFixed(2)} ${b2[0].toFixed(2)} ${b2[1].toFixed(2)} ${p2[0]} ${p2[1]}`;
    }
    return d;
  }
  const AX_SHAPE = axCoastD(0) + AX_PTS.slice(10).map((p) => ' L' + p.join(' ')).join('') + ' Z';
  // North to south, for the dots that appear in turn.
  const AX_DOTS_NS = AX_DOTS.slice().sort((a, b) => a.xy[1] - b.xy[1]);

  // kind: solid (Slate) · line (Coast) · grid (Dots). r is the dot's radius in the drawing's units.
  function AxStrip({ kind, viewBox, align, r, grid, grain, className, motion, decorative }) {
    const uid = ('ax' + React.useId().replace(/[^a-zA-Z0-9_-]/g, ''));
    const vb = viewBox || `-12 -12 ${AX_W + 24} ${AX_H + 24}`;
    const label = decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-labelledby': uid + 't ' + uid + 'd' };
    return (
      <svg className={['ax-strip', 'ax-strip--' + kind, className].filter(Boolean).join(' ')} viewBox={vb} preserveAspectRatio={align || 'xMidYMid meet'} {...label} focusable="false">
        {!decorative && <title id={uid + 't'}>{W.stripName}</title>}
        {!decorative && <desc id={uid + 'd'}>{W.stripDesc}</desc>}
        {kind === 'grid' && (
          <defs>
            <pattern id={uid + 'g'} width={grid || 5} height={grid || 5} patternUnits="userSpaceOnUse">
              <circle cx={(grid || 5) / 2} cy={(grid || 5) / 2} r={(grid || 5) * (grain || 0.2)} className="ax-strip-grain" />
            </pattern>
            <clipPath id={uid + 'c'}><path d={AX_SHAPE} /></clipPath>
          </defs>
        )}
        {kind === 'solid' && <path d={AX_SHAPE} className="ax-strip-land" vectorEffect="non-scaling-stroke" />}
        {kind === 'line' && (
          <g className={motion ? 'ax-draw-on' : undefined}>
            <path d={axCoastD(14)} className="ax-strip-echo ax-strip-echo--2" pathLength="1" vectorEffect="non-scaling-stroke" />
            <path d={axCoastD(7)} className="ax-strip-echo" pathLength="1" vectorEffect="non-scaling-stroke" />
            <path d={AX_SHAPE} className="ax-strip-edge" pathLength="1" vectorEffect="non-scaling-stroke" />
          </g>
        )}
        {kind === 'grid' && (
          <g>
            <rect x="-20" y="-20" width={AX_W + 40} height={AX_H + 40} fill={`url(#${uid}g)`} clipPath={`url(#${uid}c)`} />
            <path d={AX_SHAPE} className="ax-strip-rim" vectorEffect="non-scaling-stroke" />
          </g>
        )}
        <g className={motion ? 'ax-pop-on' : undefined}>
          {AX_DOTS_NS.map((d, i) => (
            <circle key={d.id} cx={d.xy[0]} cy={d.xy[1]} r={r || 2.6} className="ax-strip-dot" vectorEffect="non-scaling-stroke" style={motion ? { animationDelay: (kind === 'line' ? 1100 : 250) + i * 70 + 'ms' } : undefined} />
          ))}
        </g>
      </svg>
    );
  }

  // ── The frame: the form's column (start) and the ink panel (end, from 1280 px) ──
  function AxTools({ theme, setTheme, signOutButton }) {
    return (
      <div className="ax-tools">
        <button type="button" className="ax-tool" onClick={switchLang} lang={LANG === 'en' ? 'ar' : 'en'}><LanguagesIcon aria-hidden="true" /><span>{W.lang}</span></button>
        <button type="button" className="ax-tool ax-tool--icon" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={W.themeTo(theme)}>{theme === 'light' ? <MoonIcon aria-hidden="true" /> : <SunIcon aria-hidden="true" />}</button>
        {signOutButton && <button type="button" className="ax-tool" onClick={signOut}><LogOutIcon aria-hidden="true" /><span className="ax-tool-label">{W.change.signOut}</span></button>}
      </div>
    );
  }
  function AxLogo({ onInk, link = true }) {
    const cls = 'ax-logo' + (onInk ? ' ax-logo--onink' : '');
    return link ? <a href="Home.html" className={cls}><span className="ax-sr">{W.home}</span></a> : <span className={cls} role="img" aria-label={W.brand}></span>;
  }
  function AxFrame({ design, page, wayBack, signOutButton, children }) {
    const [theme, setTheme] = useTheme();
    const linkHome = page !== 'change';
    // The panel's art sits where the land isn't: the Strip runs from the north-east to the south-west.
    const align = design === 'coast' ? 'xMidYMin slice' : design === 'dots' ? 'xMidYMid meet' : DIR === 'rtl' ? 'xMinYMid meet' : 'xMaxYMid meet';
    return (
      <div className={['ax', 'ax--' + design, 'ax-p--' + page].join(' ')}>
        <SkipLink />
        <div className="ax-grid">
          <div className="ax-col">
            <div className="ax-head">
              {design === 'coast' && (
                <div className="ax-band" aria-hidden="true">
                  <AxStrip kind="line" decorative viewBox="110 34 200 80" align="xMidYMid slice" r={1.5} />
                </div>
              )}
              <header className="ax-top">
                <AxLogo link={linkHome} />
                {AX_DESIGNS[design].wayBackTop && wayBack && <div className="ax-top-back">{wayBack}</div>}
                <AxTools theme={theme} setTheme={setTheme} signOutButton={signOutButton} />
              </header>
            </div>
            <main id="main" className="ax-main" tabIndex={-1}>
              <div className="ax-form">{children}</div>
            </main>
          </div>
          <aside className="ax-panel" aria-label={W.brand}>
            <AxLogo onInk link={linkHome} />
            <div className="ax-panel-copy">
              <p className="ax-panel-title">{W.panelTitle}</p>
              <p className="ax-panel-line">{W.panelLine}</p>
            </div>
            <div className="ax-panel-art">
              {design === 'slate' && <AxStrip kind="solid" align={align} r={3} />}
              {design === 'coast' && <AxStrip kind="line" viewBox="96 -24 220 250" align={align} r={2} motion />}
              {design === 'dots' && <AxStrip kind="grid" align={align} r={3} grid={4.6} grain={0.24} motion />}
            </div>
            <p className="ax-panel-cap"><span className="ax-cap-dot" aria-hidden="true"></span>{W.caption}</p>
          </aside>
        </div>
        <PageToaster />
      </div>
    );
  }

  // The page's head: its h1 and line. Dots puts a small Strip beside it on the phone and tablet.
  function AxHead({ design, title, lede, mark }) {
    return (
      <div className="ax-head-text">
        <div className="ax-title-row">
          {mark}
          <h1 className="ax-h1">{title}</h1>
          {design === 'dots' && <AxStrip kind="grid" decorative className="ax-mini" r={11} grid={19} grain={0.3} />}
        </div>
        {lede && <p className="ax-lede">{lede}</p>}
      </div>
    );
  }

  // A form's or a page's state: one element, which each design draws its own way (box, edge or bar).
  const AX_ICONS = { error: CircleAlertIcon, warning: TriangleAlertIcon, info: InfoIcon, offline: window.WifiOffIcon || CircleAlertIcon, spark: CheckIcon };
  function AxNote({ tone, title, children, action }) {
    const Icon = AX_ICONS[tone] || InfoIcon;
    return (
      <div className={['ax-note', 'ax-note--' + tone].join(' ')} role={tone === 'error' || tone === 'warning' || tone === 'offline' ? 'alert' : 'status'}>
        <span className="ax-note-icon" aria-hidden="true"><Icon /></span>
        <div className="ax-note-body">
          {title && <p className="ax-note-title">{title}</p>}
          {children && <div className="ax-note-text">{children}</div>}
          {action && <div className="ax-note-action">{action}</div>}
        </div>
      </div>
    );
  }

  function AxGoogleG() {
    return (
      <svg viewBox="0 0 48 48" width="20" height="20" aria-hidden="true">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
      </svg>
    );
  }
  // Google's button, its failure area above it (production's order), and the divider. Its own colours
  // (Google's branding): light, or dark with no white frame; as wide and as tall as the fields.
  function AxGoogle({ google, failed }) {
    if (google.off) return null;
    return (
      <div className="ax-google-block">
        {failed && <AxNote tone="error" title={W.googleFailed}>{W.googleLines[failed]}</AxNote>}
        <button type="button" className="ax-google" onClick={google.start} disabled={google.busy} aria-busy={google.busy}>
          <AxGoogleG /><span>{google.busy ? W.googleBusy : W.google}</span>
        </button>
        <div className="ax-or" role="separator" aria-label={W.or}><span aria-hidden="true">{W.or}</span></div>
      </div>
    );
  }

  function AxConditions({ value, submitted, id }) {
    return (
      <ul id={id} className="ax-cond" aria-label={W.rulesLabel}>
        {AX_RULES.map((r) => {
          const ok = r.test(value);
          if (r.onlyBroken && ok) return null;
          const bad = !ok && (submitted || r.onlyBroken);
          return (
            <li key={r.id} className={'ax-cond-item ' + (ok ? 'is-met' : bad ? 'is-bad' : 'is-open')}>
              <span className="ax-cond-bar" aria-hidden="true"></span>
              <span className="ax-cond-mark" aria-hidden="true">{ok ? <CheckIcon /> : bad ? <CircleAlertIcon /> : <span className="ax-cond-dash"></span>}</span>
              <span className="ax-cond-label">{r.label}<span className="ax-sr"> {ok ? W.met : W.notMet}</span></span>
            </li>
          );
        })}
      </ul>
    );
  }

  function AxPassword({ label, value, onChange, error, disabled, autoComplete, conditions, submitted }) {
    const [show, setShow] = React.useState(false);
    const rulesId = ('ax' + React.useId().replace(/[^a-zA-Z0-9_-]/g, '')) + 'r';
    return (
      <div className="ax-pass">
        <Field label={label} error={error}>
          <Input type={show ? 'text' : 'password'} dir="ltr" autoComplete={autoComplete} value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)} aria-describedby={conditions ? rulesId : undefined}
            action={<InputAction label={show ? W.hide : W.show} icon={show ? <EyeOffIcon /> : <EyeIcon />} onClick={() => setShow(!show)} />} />
        </Field>
        {conditions && <AxConditions value={value} submitted={submitted || !!error} id={rulesId} />}
      </div>
    );
  }

  function AxEmail({ value, onChange, error, disabled, inputRef }) {
    return (
      <Field label={W.email} error={error}>
        <Input ref={inputRef} type="email" dir="ltr" autoComplete="email" placeholder="name@example.com" value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)} />
      </Field>
    );
  }

  // The way back (production, C4): to the space or page `next` names, else home.
  function AxWayBack() {
    const n = nextSpace();
    const back = n ? { href: `Space details.html?id=${n.space.id}`, label: tr(`العودة إلى ${spaceName(n.space)}`, `Back to ${spaceName(n.space)}`) }
      : pageParams.get('next') ? { href: 'Home.html', label: tr('العودة إلى الصفحة السابقة', 'Back to the previous page') }
      : { href: 'Home.html', label: tr('العودة إلى الرئيسية', 'Back to home') };
    return <a className="ax-back" href={back.href}><ArrowStartIcon aria-hidden="true" /><span>{back.label}</span></a>;
  }

  const AxBusyBar = () => <div className="ax-busy" role="progressbar" aria-label={W.loading}><span></span></div>;

  // ── Sign in ──
  function AxSignIn({ design }) {
    const st = pageParams.get('state');
    const google = useGoogleSignIn();
    const prefill = ['error', 'loading', 'offline', 'ratelimit'].includes(st);
    const [email, setEmail] = React.useState(prefill ? 'name@example.com' : '');
    const [password, setPassword] = React.useState(prefill ? 'masaha2026' : '');
    const [errors, setErrors] = React.useState({});
    const [loading, setLoading] = React.useState(st === 'loading');
    const [failure, setFailure] = React.useState(st === 'error' ? 'creds' : st === 'offline' ? 'offline' : null);
    const left = useRetryAfter(st === 'ratelimit');
    const gFailed = st === 'google' ? 'notallowed' : google.failed;
    const submit = (e) => {
      if (e) e.preventDefault();
      const next = {};
      if (!email.trim() || !EMAIL_RE.test(email)) next.email = W.badEmail;
      if (!password) next.password = W.enterPassword;
      setErrors(next); setFailure(null);
      if (Object.keys(next).length) { setTimeout(() => { const f = document.querySelector('.ax-form [aria-invalid=true]'); if (f) f.focus(); }, 0); return; }
      if (left > 0) return;
      setLoading(true);
      setTimeout(() => { setLoading(false); if (email.startsWith('wrong')) setFailure('creds'); else if (email.startsWith('offline')) setFailure('offline'); else finishAuth(withIntent(W.signIn.welcome)); }, 1200);
    };
    return (
      <AxFrame design={design} page="signin" wayBack={<AxWayBack />}>
        <AxHead design={design} title={W.signIn.title} lede={W.signIn.lede} />
        <div className="ax-body">
          {st === 'idle' && <AxNote tone="info">{W.signIn.idle}</AxNote>}
          <AxGoogle google={google} failed={gFailed} />
          <form className="ax-fields" noValidate onSubmit={submit} aria-busy={loading}>
            {failure === 'creds' && <AxNote tone="error" title={W.signIn.failed}>{W.signIn.creds}</AxNote>}
            {failure === 'offline' && <AxNote tone="offline" title={W.offlineTitle} action={<Button type="button" variant="outline" size="sm" onClick={submit}>{W.retry}</Button>}>{W.offlineText}</AxNote>}
            {left > 0 && <AxNote tone="warning">{W.retryIn(mmss(left))}</AxNote>}
            <AxEmail value={email} onChange={setEmail} error={errors.email} />
            <div className="ax-pass-row">
              <AxPassword label={W.password} value={password} onChange={setPassword} error={errors.password} autoComplete="current-password" />
              <a className="ax-link ax-forgot" href={withNext('Forgot password.html')}>{W.signIn.forgot}</a>
            </div>
            <Button type="submit" className="w-full ax-submit" loading={loading} disabled={left > 0}><LogInIcon aria-hidden="true" />{W.signIn.submit}</Button>
          </form>
        </div>
        <div className="ax-foot">
          <p className="ax-foot-line">{W.signIn.noAccount} <a className="ax-link" href={withNext('Register.html')}>{W.signIn.create}</a></p>
          <div className="ax-foot-back"><AxWayBack /></div>
        </div>
      </AxFrame>
    );
  }

  // ── Register ──
  const AX_REG_DEMO = {
    errors: { name: '', email: 'sara@', password: 'abc' },
    exists: { name: tr('سارة أحمد', 'Sara Ahmad'), email: 'taken@example.com', password: 'masaha2026' },
    ratelimit: { name: tr('سارة أحمد', 'Sara Ahmad'), email: 'sara@example.com', password: 'masaha2026' },
    network: { name: tr('سارة أحمد', 'Sara Ahmad'), email: 'sara@example.com', password: 'masaha2026' },
    loading: { name: tr('سارة أحمد', 'Sara Ahmad'), email: 'sara@example.com', password: 'masaha2026' },
    typing: { name: tr('سارة أحمد', 'Sara Ahmad'), email: 'sara@example.com', password: 'masaha' },
    toolong: { name: tr('سارة أحمد', 'Sara Ahmad'), email: 'sara@example.com', password: 'ب'.repeat(40) + '1' },
    filled: { name: tr('سارة أحمد', 'Sara Ahmad'), email: 'sara@example.com', password: 'مساحة2026' },
  };
  function axRegValidate(v) {
    const e = {};
    if (!v.name.trim()) e.name = W.enterName;
    if (!v.email.trim() || !EMAIL_RE.test(v.email)) e.email = W.badEmail;
    if (!axPasswordOk(v.password)) e.password = W.rulesUnmet;
    return e;
  }
  function AxRegister({ design }) {
    const st = pageParams.get('state');
    const google = useGoogleSignIn();
    const [v, setV] = React.useState(AX_REG_DEMO[st] || { name: '', email: '', password: '' });
    const [errors, setErrors] = React.useState(st === 'errors' ? axRegValidate(AX_REG_DEMO.errors) : st === 'exists' ? { email: W.register.taken } : {});
    const [loading, setLoading] = React.useState(st === 'loading');
    const [submitted, setSubmitted] = React.useState(st === 'errors');
    const [taken, setTaken] = React.useState(st === 'exists');
    const [offline, setOffline] = React.useState(st === 'network');
    const left = useRetryAfter(st === 'ratelimit');
    const set = (k) => (val) => setV((p) => Object.assign({}, p, { [k]: val }));
    const submit = (e) => {
      if (e) e.preventDefault();
      const next = axRegValidate(v);
      setErrors(next); setSubmitted(true); setTaken(false); setOffline(false);
      if (Object.keys(next).length) { setTimeout(() => { const f = document.querySelector('.ax-form [aria-invalid=true]'); if (f) f.focus(); }, 0); return; }
      if (left > 0) return;
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        if (v.email.startsWith('taken')) { setErrors({ email: W.register.taken }); return setTaken(true); }
        window.__pendingUser = { name: v.name.trim(), email: v.email.trim(), method: 'email' };
        finishAuth(withIntent(tr(`أهلًا ${v.name.trim().split(' ')[0]}، تم إنشاء حسابك`, `Welcome ${v.name.trim().split(' ')[0]}, your account is ready`)));
      }, 1200);
    };
    const owner = (
      <p className="ax-owner">{W.register.ownerNote} <a className="ax-link" href="About.html#owners">{W.register.contact}</a></p>
    );
    const at = AX_DESIGNS[design].ownerNote;
    return (
      <AxFrame design={design} page="register" wayBack={<AxWayBack />}>
        <AxHead design={design} title={W.register.title} lede={W.register.lede} />
        {at === 'top' && owner}
        <div className="ax-body">
          <AxGoogle google={google} failed={google.failed} />
          <form className="ax-fields" noValidate onSubmit={submit} aria-busy={loading}>
            {offline && <AxNote tone="offline" title={W.offlineTitle} action={<Button type="button" variant="outline" size="sm" onClick={submit}>{W.retry}</Button>}>{W.offlineText}</AxNote>}
            {left > 0 && <AxNote tone="warning">{W.retryIn(mmss(left))}</AxNote>}
            <Field label={W.name} error={errors.name}>
              <Input autoComplete="name" value={v.name} onChange={(e) => set('name')(e.target.value)} />
            </Field>
            <div className="ax-email-row">
              <AxEmail value={v.email} onChange={set('email')} error={errors.email} />
              {taken && <a className="ax-link ax-instead" href={withNext('Sign in.html')}>{W.register.signInInstead}</a>}
            </div>
            <AxPassword label={W.password} value={v.password} onChange={set('password')} error={errors.password} autoComplete="new-password" conditions submitted={submitted} />
            <Button type="submit" className="w-full ax-submit" loading={loading} disabled={left > 0}>{W.register.submit}</Button>
          </form>
        </div>
        {at === 'bottom' && <div className="ax-owner-bottom">{owner}</div>}
        <div className="ax-foot">
          <p className="ax-foot-line">{W.register.have} <a className="ax-link" href={withNext('Sign in.html')}>{W.register.signIn}</a></p>
          <p className="ax-foot-small">{W.register.privacyRead} <a className="ax-link" href="Privacy.html">{W.register.privacyLink}</a></p>
          <div className="ax-foot-back"><AxWayBack /></div>
        </div>
      </AxFrame>
    );
  }

  // ── Forgot password: the form at once (critique 3); the recovery's read never blanks it ──
  function AxSentTo({ email }) {
    return <p className="ax-sentto"><span className="ax-sentto-dot" aria-hidden="true"></span><span>{W.forgot.sentTo} </span><Ltr>{email}</Ltr></p>;
  }
  function AxForgot({ design }) {
    const st = pageParams.get('state');
    const steps = ['sent', 'spent', 'linkopen'];
    const [step, setStep] = React.useState(steps.includes(st) ? st : 'request');
    const [reading, setReading] = React.useState(st === 'loading');
    const [readFail, setReadFail] = React.useState(st === 'unreachable' ? 'offline' : st === 'failed' ? 'error' : null);
    const [email, setEmail] = React.useState(pageParams.get('email') || (st && st !== 'loading' && st !== 'unreachable' && st !== 'failed' ? 'sara@example.com' : ''));
    const [error, setError] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const limit = useRetryAfter(st === 'ratelimit');
    const [left, setLeft] = useCountdown(step === 'sent' ? 59 : 0);
    const emailRef = React.useRef(null);
    const focusNext = React.useRef(false);
    React.useEffect(() => { if (st === 'loading') return; }, []);
    React.useEffect(() => { if (step === 'request' && focusNext.current) { focusNext.current = false; if (emailRef.current) emailRef.current.focus(); } }, [step]);
    const again = () => { focusNext.current = true; setStep('request'); setEmail(''); setError(); };
    const retryRead = () => { setReadFail(null); setReading(true); setTimeout(() => setReading(false), ACTION_MS); };
    const submit = (e) => {
      if (e) e.preventDefault();
      if (!email.trim() || !EMAIL_RE.test(email)) { setError(W.badEmail); if (emailRef.current) emailRef.current.focus(); return; }
      setError(); if (limit > 0) return;
      setLoading(true);
      setTimeout(() => { setLoading(false); setStep('sent'); setLeft(59); }, 1000);
    };
    const sent = step === 'sent' || step === 'spent';
    const title = sent ? W.forgot.sentTitle : step === 'linkopen' ? W.forgot.openTitle : W.forgot.title;
    const lede = step === 'request' ? W.forgot.lede : step === 'linkopen' ? W.forgot.openLede(AX_MASKED) : null;
    return (
      <AxFrame design={design} page="forgot" wayBack={<a className="ax-back" href={withNext('Sign in.html')}><ArrowStartIcon aria-hidden="true" /><span>{W.forgot.back}</span></a>}>
        <AxHead design={design} title={title} lede={lede} />
        <div className="ax-body">
          {step === 'request' && (
            <form className="ax-fields" noValidate onSubmit={submit} aria-busy={loading || reading}>
              {reading && <AxBusyBar />}
              {readFail === 'offline' && <AxNote tone="offline" title={W.noNetTitle} action={<Button type="button" variant="outline" size="sm" onClick={retryRead}>{W.retry}</Button>}>{W.noNetText}</AxNote>}
              {readFail === 'error' && <AxNote tone="error" title={W.errorTitle} action={<Button type="button" variant="outline" size="sm" onClick={retryRead}>{W.retry}</Button>}>{W.errorText}</AxNote>}
              {limit > 0 && <AxNote tone="warning">{W.retryIn(mmss(limit))}</AxNote>}
              <AxEmail value={email} onChange={setEmail} error={error} inputRef={emailRef} />
              <Button type="submit" className="w-full ax-submit" loading={loading} disabled={limit > 0}>{W.forgot.submit}</Button>
            </form>
          )}
          {sent && (
            <div className="ax-sent" role="status">
              <p className="ax-sent-text">{W.forgot.sentMessage}</p>
              <AxSentTo email={maskEmail(email)} />
              {step === 'sent' ? (
                <Button variant="outline" className="w-full" disabled={left > 0} loading={loading} onClick={() => { setLoading(true); setTimeout(() => { setLoading(false); setLeft(59); }, 900); }}>
                  {left > 0 ? <>{W.forgot.resendIn} <Ltr>{mmss(left)}</Ltr></> : W.forgot.resend}
                </Button>
              ) : (
                <AxNote tone="warning">{W.forgot.resendLimit}</AxNote>
              )}
              <Button variant="outline" className="w-full" onClick={again}>{step === 'spent' ? W.forgot.enterAgain : W.forgot.another}</Button>
            </div>
          )}
          {step === 'linkopen' && (
            <div className="ax-actions">
              <Button className="w-full ax-submit" asChild><a href="Reset password.html">{W.forgot.continue}</a></Button>
              <Button variant="outline" className="w-full" onClick={again}>{W.forgot.enterAgain}</Button>
            </div>
          )}
        </div>
        <div className="ax-foot">
          <p className="ax-foot-line">{W.forgot.noAccess} <a className="ax-link" href={AX_WA} target="_blank" rel="noopener">{W.forgot.contact}</a></p>
          <div className="ax-foot-back"><a className="ax-back" href={withNext('Sign in.html')}><ArrowStartIcon aria-hidden="true" /><span>{W.forgot.back}</span></a></div>
        </div>
      </AxFrame>
    );
  }

  // ── Reset password ──
  function AxReset({ design }) {
    const st = pageParams.get('state');
    const [view, setView] = React.useState(['invalid', 'success', 'loading', 'unreachable', 'checkfailed'].includes(st) ? st : 'form');
    const checkLeft = useRetryAfter(st === 'checkfailed');
    const [pw, setPw] = React.useState(st === 'typing' ? 'masaha' : '');
    const [error, setError] = React.useState();
    const [submitted, setSubmitted] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const retry = () => { setView('loading'); setTimeout(() => setView('form'), ACTION_MS); };
    const submit = (e) => {
      e.preventDefault(); setSubmitted(true);
      if (!axPasswordOk(pw)) { setError(W.rulesUnmet); setTimeout(() => { const f = document.querySelector('.ax-form [aria-invalid=true]'); if (f) f.focus(); }, 0); return; }
      setError(); setLoading(true);
      setTimeout(() => { setLoading(false); setView('success'); }, 1100);
    };
    const back = <a className="ax-back" href="Sign in.html"><ArrowStartIcon aria-hidden="true" /><span>{W.forgot.back}</span></a>;
    let head, body;
    if (view === 'form') {
      head = <AxHead design={design} title={W.reset.title} lede={W.reset.forAccount(AX_MASKED)} />;
      body = (
        <form className="ax-fields" noValidate onSubmit={submit} aria-busy={loading}>
          <AxPassword label={W.reset.newPassword} value={pw} onChange={setPw} error={error} autoComplete="new-password" conditions submitted={submitted} />
          <Button type="submit" className="w-full ax-submit" loading={loading}>{W.reset.submit}</Button>
        </form>
      );
    } else if (view === 'loading') {
      // The link is being checked: the form's own shape, quiet, never a bare spinner.
      head = <AxHead design={design} title={W.reset.title} lede={<span className="ax-skel ax-skel--line" aria-hidden="true"></span>} />;
      body = (
        <div className="ax-fields" aria-busy="true">
          <AxBusyBar />
          <span className="ax-skel ax-skel--label" aria-hidden="true"></span>
          <span className="ax-skel ax-skel--field" aria-hidden="true"></span>
          <span className="ax-skel ax-skel--button" aria-hidden="true"></span>
        </div>
      );
    } else if (view === 'unreachable') {
      head = <AxHead design={design} title={W.reset.title} />;
      body = <AxNote tone="offline" title={W.noNetTitle} action={<Button type="button" variant="outline" size="sm" onClick={retry}>{W.retry}</Button>}>{W.noNetText}</AxNote>;
    } else if (view === 'checkfailed') {
      head = <AxHead design={design} title={W.reset.title} />;
      body = (
        <div className="ax-fields">
          {checkLeft > 0 ? <AxNote tone="warning" title={W.reset.checkFailed}>{W.retryIn(mmss(checkLeft))}</AxNote> : <AxNote tone="info" title={W.reset.checkFailed} />}
          <p className="ax-plain">{W.reset.reopen}</p>
        </div>
      );
    } else if (view === 'invalid') {
      head = <AxHead design={design} title={W.reset.invalidTitle} lede={W.reset.invalidLede} mark={<span className="ax-mark ax-mark--muted" aria-hidden="true"><TriangleAlertIcon /></span>} />;
      body = <div className="ax-actions"><Button className="w-full ax-submit" asChild><a href="Forgot password.html">{W.reset.requestNew}</a></Button></div>;
    } else {
      head = <AxHead design={design} title={W.reset.doneTitle} lede={W.reset.doneLede} mark={<span className="ax-mark ax-mark--done" aria-hidden="true"><CircleCheckIcon /></span>} />;
      body = <div className="ax-actions"><Button className="w-full ax-submit" asChild><a href="Sign in.html"><LogInIcon aria-hidden="true" />{W.reset.signIn}</a></Button></div>;
    }
    return (
      <AxFrame design={design} page="reset" wayBack={view !== 'success' ? back : null}>
        {head}
        <div className="ax-body">{body}</div>
        {view !== 'success' && <div className="ax-foot"><div className="ax-foot-back">{back}</div></div>}
      </AxFrame>
    );
  }

  // ── The forced change of a temporary password (no site navigation until it is changed) ──
  const AX_ROLE_HOME = { owner: 'Owner overview.html', reception: 'Desk.html?role=reception', admin: 'Admin overview.html', user: 'Home.html?auth=1' };
  function AxChange({ design }) {
    const st = pageParams.get('state');
    const role = AX_ROLE_HOME[pageParams.get('role')] ? pageParams.get('role') : 'owner';
    const [pw, setPw] = React.useState(st === 'typing' ? 'gaza2026' : st === 'errors' ? 'gaza' : '');
    const [error, setError] = React.useState(st === 'errors' ? W.rulesUnmet : undefined);
    const [submitted, setSubmitted] = React.useState(st === 'errors');
    const [loading, setLoading] = React.useState(false);
    const [offline, setOffline] = React.useState(st === 'offline');
    const submit = (e) => {
      if (e) e.preventDefault(); setSubmitted(true); setOffline(false);
      if (!axPasswordOk(pw)) { setError(W.rulesUnmet); setTimeout(() => { const f = document.querySelector('.ax-form [aria-invalid=true]'); if (f) f.focus(); }, 0); return; }
      setError(); setLoading(true);
      setTimeout(() => { handOffToast(W.change.saved); location.href = carryParams(AX_ROLE_HOME[role]); }, 1000);
    };
    return (
      <AxFrame design={design} page="change" signOutButton>
        <AxHead design={design} title={W.change.title} lede={W.change.lede} />
        <div className="ax-body">
          <form className="ax-fields" noValidate onSubmit={submit} aria-busy={loading}>
            {offline && <AxNote tone="offline" title={W.offlineTitle} action={<Button type="button" variant="outline" size="sm" onClick={submit}>{W.retry}</Button>}>{W.offlineText}</AxNote>}
            <AxPassword label={W.reset.newPassword} value={pw} onChange={setPw} error={error} autoComplete="new-password" conditions submitted={submitted} />
            <Button type="submit" className="w-full ax-submit" loading={loading}>{W.change.submit}</Button>
          </form>
        </div>
      </AxFrame>
    );
  }

  const AX_PAGES = { signin: AxSignIn, register: AxRegister, forgot: AxForgot, reset: AxReset, change: AxChange };
  window.AxKit = {
    render(page, design) {
      const Page = AX_PAGES[page];
      ReactDOM.createRoot(document.getElementById('ds-root')).render(<DirectionProvider dir={DIR}><Page design={design} /></DirectionProvider>);
    },
  };
})();
