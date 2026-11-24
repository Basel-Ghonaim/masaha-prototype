const { DirectionProvider, Toaster, toast, Button, Card, CardHeader, CardContent, CardFooter, Alert, AlertTitle, AlertDescription, AlertAction, EmptyState, Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, Field, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Textarea, Skeleton, CircleCheckIcon, ChevronStartIcon, SearchXIcon, Input, InputAction, EyeIcon, EyeOffIcon, XIcon } = window.MasahaDesignSystem;
const M = window.MASAHA;

const directoryHref = () => { try { return 'Directory.html' + (sessionStorage.getItem('masaha:dir-query') || ''); } catch (e) { return 'Directory.html'; } };
// After sign-in / register the user comes back here, signed in, with the favourite saved (or the report open).
const authHref = (page, kind) => {
  const id = pageParams.get('id') || 'focus';
  const next = `Space details.html?id=${id}&auth=1${kind === 'fav' ? '&fav=1' : '&dialog=report'}`;
  return `${page}?next=${encodeURIComponent(next)}`;
};
const REPORT_TOPICS = [tr("الأسعار", "Prices"), tr("ساعات العمل", "Opening hours"), tr("التواصل", "Contact"), tr("الموقع", "Location"), tr("المرافق", "Amenities"), tr("أخرى", "Other")];

// AUTH_IN_PLACE (masaha's ADR 0021): the sign-in opens over this page. P1: a dialog from 768 px; below it a
// full-screen panel with a top bar and its close button; one history entry at the same address, so Back closes it
// and keeps the page. P2: its views — sign in, register, the reset link's request, the link sent, and the password
// changed in another tab (A1) — and their states. Signing in keeps the page and completes the pressed action. The
// primary action is in the berry (A18), as a proposal. The words are production's catalogue's, except where marked
// NEW. Demo: ?dialog=signin|signin-report &view=signin|register|forgot|sent|changed
// &state=wrong|rate|busy|google-off|google-taken|taken|resend
function InPlaceGoogle({ busy, label }) {
  return (
    <button type="button" className="gsi-button" disabled={busy} aria-busy={busy}>
      <svg viewBox="0 0 48 48" width="20" height="20" aria-hidden="true">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
      </svg>
      <span>{label || tr("المتابعة باستخدام Google", "Continue with Google")}</span>
    </button>
  );
}

function InPlaceOr() {
  return (
    <div className="flex items-center gap-3" role="separator" aria-label={tr("أو", "or")}>
      <span className="h-px flex-1 bg-border"></span>
      <span className="text-caption text-muted-foreground" aria-hidden="true">{tr("أو", "or")}</span>
      <span className="h-px flex-1 bg-border"></span>
    </div>
  );
}

function inPlaceMask(email) {
  const at = email.indexOf('@');
  return at < 1 ? email : email[0] + '•••' + email.slice(at);
}

function inPlaceClock(s) {
  return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
}

function useInPlaceCountdown(from) {
  const [left, setLeft] = React.useState(from);
  React.useEffect(() => {
    if (left <= 0) return undefined;
    const t = setTimeout(() => setLeft(left - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);
  return [left, setLeft];
}

function InPlacePassword({ label, value, onChange, autoComplete, error, rule }) {
  const [show, setShow] = React.useState(false);
  const ok = value.length >= 8 && /\p{L}/u.test(value) && /\d/.test(value);
  return (
    <div className="flex flex-col gap-2">
      <Field label={label} error={error}>
        <Input type={show ? 'text' : 'password'} dir="ltr" autoComplete={autoComplete} enterKeyHint="done" value={value} onChange={(e) => onChange(e.target.value)}
          action={<InputAction label={show ? tr("إخفاء كلمة المرور", "Hide password") : tr("إظهار كلمة المرور", "Show password")} icon={show ? <EyeOffIcon /> : <EyeIcon />} onClick={() => setShow(!show)} />} />
      </Field>
      {/* A7: the password's conditions as one line — before typing, what it needs; once met, a tick. */}
      {rule && (
        <p className={'inplace-rule text-body-sm ' + (ok ? 'is-met' : 'text-muted-foreground')} aria-live="polite">
          {ok ? tr("✓ كلمة المرور مناسبة", "✓ The password is fine") : tr("8 أحرف على الأقل، فيها حرف ورقم", "At least 8 characters, with a letter and a number")}
        </p>
      )}
    </div>
  );
}

function InPlaceBack({ onClick }) {
  return (
    <Button type="button" variant="link" size="sm" className="inplace-back self-start px-0" onClick={onClick}>
      <ChevronStartIcon />{tr("العودة إلى تسجيل الدخول", "Back to sign in")}
    </Button>
  );
}

function InPlaceSignIn({ open, onClose, onDone, space }) {
  const demoView = pageParams.get('view');
  const demo = pageParams.get('state');
  const [view, setView] = React.useState(demoView || 'signin');
  const [email, setEmail] = React.useState(demo === 'wrong' || demo === 'rate' || demo === 'taken' || ['sent', 'changed', 'forgot'].includes(demoView) ? 'sara@example.com' : '');
  const [password, setPassword] = React.useState(demo === 'busy' ? 'masaha2026' : '');
  const [name, setName] = React.useState(demo === 'taken' ? tr("سارة", "Sara") : '');
  const [busy, setBusy] = React.useState(demo === 'busy');
  const [failure, setFailure] = React.useState(demo === 'wrong' ? 'wrong' : demo === 'taken' ? 'taken' : null);
  const [google, setGoogle] = React.useState(demo === 'google-off' ? 'off' : demo === 'google-taken' ? 'taken' : null);
  const [rateLeft] = useInPlaceCountdown(demo === 'rate' ? 299 : 0);
  const [resendLeft, setResendLeft] = useInPlaceCountdown(view === 'sent' && demo !== 'resend' ? 58 : 0);
  const [tried, setTried] = React.useState(false);

  // Back closes it: one history entry at the same address while it is open (P1).
  React.useEffect(() => {
    if (!open) return undefined;
    history.pushState({ inplace: 1 }, '');
    const onPop = () => onClose('back');
    addEventListener('popstate', onPop);
    return () => removeEventListener('popstate', onPop);
  }, [open]);
  const close = () => { if (busy) return; if (history.state && history.state.inplace) history.back(); else onClose(); };
  const go = (next) => { setFailure(null); setGoogle(null); setTried(false); setView(next); };
  const finish = (how) => {
    setBusy(true);
    setTimeout(() => { setBusy(false); if (history.state && history.state.inplace) history.go(-1); onDone(open, how, name); }, 800);
  };

  const fav = open !== 'report';
  const sName = space ? spaceName(space) : '';
  const titles = {
    signin: fav ? tr("سجّل الدخول لحفظ المساحات في المفضّلة", "Sign in to save spaces to your favourites") : tr("سجّل الدخول للإبلاغ عن معلومة", "Sign in to report information"),
    // NEW: register keeps the reason in its title.
    register: fav ? tr("أنشئ حسابًا لحفظ المساحات في المفضّلة", "Create an account to save spaces to your favourites") : tr("أنشئ حسابًا للإبلاغ عن معلومة", "Create an account to report information"),
    forgot: tr("نسيت كلمة المرور", "Forgot password"),
    sent: tr("تفقّد بريدك الإلكتروني", "Check your email"),
    changed: tr("تم تغيير كلمة المرور", "Your password was changed"),
  };
  const lines = {
    signin: fav ? tr("تجد المساحات التي تحفظها في حسابك على أي جهاز.", "Spaces you save are in your account on any device.") : tr("لتجد الردّ على بلاغك في «بلاغاتي».", "So you’ll find the reply to your report in “My reports”."),
    register: tr("احفظ مساحاتك المفضّلة وتابع البلاغات التي ترسلها.", "Save your favourite spaces and follow the reports you send."),
    forgot: tr("أدخل البريد الذي سجّلت به، وسنرسل إليه رابطًا لتعيين كلمة مرور جديدة.", "Enter the email you signed up with, and we’ll send it a link to set a new password."),
    sent: tr("إذا كان هذا البريد مسجّلًا لدينا، ستصلك رسالة فيها رابط لتعيين كلمة مرور جديدة. الرابط صالح لمدة ساعة. تفقّد مجلد الرسائل غير المرغوب فيها.", "If this email is registered with us, you’ll get a message with a link to set a new password. The link is valid for one hour. Check your spam folder."),
    // NEW (A1): the tab that waited learns the reset happened elsewhere.
    changed: tr("وسُجّل خروجك من كل الأجهزة. سجّل الدخول بكلمة المرور الجديدة.", "You were signed out on all devices. Sign in with your new password."),
  };

  const emailField = (autoFocusNext) => (
    <Field label={tr("البريد الإلكتروني", "Email")} error={tried && !email.includes('@') ? tr("تحقّق من كتابة البريد الإلكتروني، مثل name@example.com", "Check the email, like name@example.com") : failure === 'taken' ? tr("يوجد حساب بهذا البريد الإلكتروني.", "An account with this email already exists.") : undefined}>
      <Input type="email" inputMode="email" dir="ltr" autoComplete="email" placeholder="name@example.com" enterKeyHint={autoFocusNext ? 'next' : 'send'} value={email} onChange={(e) => setEmail(e.target.value)} />
    </Field>
  );

  const googleBlock = (label) => (
    <>
      <InPlaceGoogle busy={busy} label={label} />
      {google === 'off' && (
        <Alert variant="warning"><AlertTitle>{tr("تعذّرت المتابعة باستخدام Google", "Couldn’t continue with Google")}</AlertTitle>
          <AlertDescription>{tr("الدخول باستخدام Google غير متاح الآن. استخدم البريد الإلكتروني وكلمة المرور، أو حاول لاحقًا.", "Signing in with Google isn’t available right now. Use your email and password, or try later.")}</AlertDescription></Alert>
      )}
      {google === 'taken' && (
        <Alert variant="destructive"><AlertTitle>{tr("تعذّرت المتابعة باستخدام Google", "Couldn’t continue with Google")}</AlertTitle>
          <AlertDescription>{tr("يوجد حساب بهذا البريد الإلكتروني. سجّل الدخول بكلمة مروره؛ وإن لم تعرفها فأعد تعيينها من «نسيت كلمة المرور»، أو اطلبها ممّن أنشأ حسابك.", "An account with this email already exists. Sign in with its password; if you don’t know it, reset it from “Forgot password”, or ask whoever created your account.")}</AlertDescription>
          <AlertAction><Button variant="outline" size="sm" onClick={() => go('forgot')}>{tr("نسيت كلمة المرور؟", "Forgot password?")}</Button></AlertAction></Alert>
      )}
      <InPlaceOr />
    </>
  );

  let body = null;
  if (view === 'signin' || view === 'changed') {
    const submit = (e) => { e.preventDefault(); setTried(true); if (!email.includes('@') || !password) return; finish('signin'); };
    body = (
      <form className="inplace-form" onSubmit={submit} noValidate>
        {view === 'signin' && googleBlock()}
        {failure === 'wrong' && (
          <Alert variant="destructive" role="alert"><AlertTitle>{tr("تعذّر تسجيل الدخول", "Couldn’t sign in")}</AlertTitle>
            <AlertDescription>{tr("البريد الإلكتروني أو كلمة المرور غير صحيحة.", "The email or password is incorrect.")}</AlertDescription></Alert>
        )}
        {emailField(true)}
        <div className="flex flex-col gap-2">
          <InPlacePassword label={tr("كلمة المرور", "Password")} value={password} onChange={setPassword} autoComplete="current-password" error={tried && !password ? tr("أدخل كلمة المرور", "Enter your password") : undefined} />
          <Button type="button" variant="link" size="sm" className="self-start px-0" onClick={() => go('forgot')}>{tr("نسيت كلمة المرور؟", "Forgot password?")}</Button>
        </div>
        {rateLeft > 0 && <p className="text-body-sm text-destructive" role="status">{tr("محاولات كثيرة، حاول بعد ", "Too many attempts, try again in ")}<Ltr>{inPlaceClock(rateLeft)}</Ltr></p>}
        <Button type="submit" className="inplace-primary w-full" loading={busy} disabled={rateLeft > 0}>{tr("تسجيل الدخول", "Sign in")}</Button>
      </form>
    );
  } else if (view === 'register') {
    const submit = (e) => { e.preventDefault(); setTried(true); if (!name.trim() || !email.includes('@') || password.length < 8) return; finish('register'); };
    body = (
      <form className="inplace-form" onSubmit={submit} noValidate>
        {googleBlock()}
        <Field label={tr("الاسم", "Name")} error={tried && !name.trim() ? tr("أدخل اسمك", "Enter your name") : undefined}>
          <Input autoComplete="name" enterKeyHint="next" value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        {emailField(true)}
        {failure === 'taken' && (
          <Button type="button" variant="outline" size="sm" className="self-start" onClick={() => go('signin')}>{tr("سجّل الدخول بهذا البريد", "Sign in with this email")}</Button>
        )}
        <InPlacePassword label={tr("كلمة المرور", "Password")} value={password} onChange={setPassword} autoComplete="new-password" rule />
        <Button type="submit" className="inplace-primary w-full" loading={busy}>{tr("إنشاء الحساب", "Create account")}</Button>
        <p className="text-body-sm text-muted-foreground">{tr("اقرأ ", "Read the ")}<a href="Privacy.html" target="_blank" rel="noopener" className="inplace-link">{tr("سياسة الخصوصية", "privacy policy")}</a></p>
      </form>
    );
  } else if (view === 'forgot') {
    const submit = (e) => { e.preventDefault(); setTried(true); if (!email.includes('@')) return; setBusy(true); setTimeout(() => { setBusy(false); setResendLeft(58); go('sent'); }, 700); };
    body = (
      <form className="inplace-form" onSubmit={submit} noValidate>
        {emailField(false)}
        <Button type="submit" className="inplace-primary w-full" loading={busy}>{tr("أرسل رابط الاستعادة", "Send reset link")}</Button>
      </form>
    );
  } else if (view === 'sent') {
    body = (
      <div className="inplace-form">
        <p className="text-body-sm text-muted-foreground">{tr("أُرسلت إلى ", "Sent to ")}<Ltr>{inPlaceMask(email || 'sara@example.com')}</Ltr></p>
        {/* NEW: what happens to the pressed action, so the guest knows nothing is lost. */}
        <Alert variant="info"><AlertDescription>
          {fav ? tr(`بعد تعيين كلمة المرور الجديدة نعيدك إلى ${sName}، ونكمل حفظها في مفضّلتك.`, `Once your new password is set, we bring you back to ${sName} and finish saving it to your favourites.`)
            : tr(`بعد تعيين كلمة المرور الجديدة نعيدك إلى ${sName}، لتكمل بلاغك.`, `Once your new password is set, we bring you back to ${sName} to finish your report.`)}
        </AlertDescription></Alert>
        <Button variant="outline" className="w-full" disabled={resendLeft > 0} onClick={() => setResendLeft(58)}>
          {resendLeft > 0 ? <>{tr("أعد الإرسال بعد ", "Resend in ")}<Ltr>{inPlaceClock(resendLeft)}</Ltr></> : tr("أعد الإرسال", "Resend")}
        </Button>
        <Button variant="link" size="sm" className="self-center" onClick={() => { setEmail(''); go('forgot'); }}>{tr("استخدم بريدًا آخر", "Use another email")}</Button>
      </div>
    );
  }

  const changedAlert = view === 'changed' && (
    <Alert variant="info" role="status" className="inplace-done"><CircleCheckIcon aria-hidden="true" /><AlertTitle>{titles.changed}</AlertTitle><AlertDescription>{lines.changed}</AlertDescription></Alert>
  );
  const head = view === 'changed' ? { t: titles.signin, l: lines.signin } : { t: titles[view], l: lines[view] };

  return (
    <Dialog open={!!open} onOpenChange={(o) => { if (!o) close(); }}>
      {open && (
        <DialogContent closeLabel={tr("إغلاق", "Close")} className="inplace-panel"
          onEscapeKeyDown={(e) => { if (busy) e.preventDefault(); }}
          onOpenAutoFocus={(e) => { if (!matchMedia('(min-width: 768px)').matches) { e.preventDefault(); const t = document.querySelector('.inplace-title'); if (t) t.focus(); } }}>
          <div className="inplace-bar">
            <DialogClose asChild><Button variant="ghost" size="icon" aria-label={tr("إغلاق", "Close")} disabled={busy}><XIcon /></Button></DialogClose>
          </div>
          <div className="inplace-body">
            {(view === 'forgot' || view === 'sent') && <InPlaceBack onClick={() => go('signin')} />}
            <DialogHeader className="inplace-head">
              <DialogTitle className="inplace-title" tabIndex={-1}>{head.t}</DialogTitle>
              <DialogDescription>{head.l}</DialogDescription>
            </DialogHeader>
            {changedAlert}
            {body}
            {view === 'signin' && (
              <p className="inplace-new text-body-sm text-muted-foreground">{tr("جديد على مساحة؟ ", "New to Masaha? ")}
                <Button type="button" variant="link" size="sm" className="px-0" onClick={() => go('register')}>{tr("إنشاء حساب", "Create an account")}</Button></p>
            )}
            {view === 'register' && (
              <p className="inplace-new text-body-sm text-muted-foreground">{tr("لديك حساب؟ ", "Have an account? ")}
                <Button type="button" variant="link" size="sm" className="px-0" onClick={() => go('signin')}>{tr("تسجيل الدخول", "Sign in")}</Button></p>
            )}
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}

function ReportDialog({ open, onOpenChange, space }) {
  const [topic, setTopic] = React.useState('');
  const [msg, setMsg] = React.useState('');
  const [tried, setTried] = React.useState(false);
  const submit = (e) => {
    e.preventDefault(); setTried(true);
    if (!topic || !msg.trim()) return;
    onOpenChange(false); setTopic(''); setMsg(''); setTried(false);
    toast.success(space.verified ? tr("أرسلنا البلاغ إلى إدارة المساحة", "We sent your report to the space") : tr("أرسلنا البلاغ إلى فريق مساحة", "We sent your report to the Masaha team"));
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent closeLabel={tr("إغلاق", "Close")}>
        <DialogHeader>
          <DialogTitle>{tr("الإبلاغ عن معلومة غير صحيحة", "Report wrong information")}</DialogTitle>
          {/* U10 (PU-010): who reads it, by the space's verification, and where the answer appears. */}
          <DialogDescription>{tr("عن ", "About ")}<SpaceName space={space} />{tr(". ", ". ")}{space.verified ? tr("يصل البلاغ إلى إدارة المساحة، وتجد ردّها في «بلاغاتي».", "Your report goes to the space’s management; you’ll find their reply in “My reports”.") : tr("يراجع فريق مساحة البلاغ، وتجد الردّ في «بلاغاتي».", "The Masaha team reviews it; you’ll find the reply in “My reports”.")}</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
          <Field label={tr("ما المعلومة غير الصحيحة؟", "What’s wrong?")} error={tried && !topic ? tr("اختر نوع المعلومة", "Choose what’s wrong") : undefined}>
            <Select value={topic} onValueChange={setTopic}>
              <SelectTrigger><SelectValue placeholder={tr("اختر", "Choose")} /></SelectTrigger>
              <SelectContent>{REPORT_TOPICS.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
            </Select>
          </Field>
          <Field label={tr("التفاصيل", "Details")} helper={tr("مثلًا: السعر الشهري أصبح 320 ₪", "For example: the monthly price is now ₪320")} error={tried && !msg.trim() ? tr("اكتب ما الذي تغيّر", "Write what has changed") : undefined}>
            <Textarea value={msg} onChange={(e) => setMsg(e.target.value)} required rows={4} />
          </Field>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline" type="button">{tr("رجوع", "Back")}</Button></DialogClose>
            <Button type="submit">{tr("إرسال", "Send")}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function PlatformContactDialog({ open, onOpenChange }) {
  const c = M.platformContact;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent closeLabel={tr("إغلاق", "Close")}>
        <DialogHeader>
          <DialogTitle>{tr("تواصل مع فريق مساحة", "Contact the Masaha team")}</DialogTitle>
          <DialogDescription>{tr("أخبرنا أنك تدير هذه المساحة، وسنتواصل معك لتأكيد معلوماتها.", "Tell us you run this space, and we’ll get in touch to confirm its information.")}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Button variant="outline" className="justify-between" asChild><a href={'https://wa.me/' + c.whatsapp.replace(/\D/g, '')} target="_blank" rel="noopener">{tr("واتساب", "WhatsApp")}<span dir="ltr" className="text-muted-foreground">{c.whatsapp}</span></a></Button>
          <Button variant="outline" className="justify-between" asChild><a href={'mailto:' + c.email}>{tr("بريد", "Email")}<span dir="ltr" className="text-muted-foreground">{c.email}</span></a></Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DetailsSkeleton() {
  return (
    <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:items-start" aria-hidden="true">
      <div className="flex flex-col gap-6 lg:col-span-8">
        <Skeleton className="gallery-h rounded-xl" />
        <div className="flex flex-col gap-2"><Skeleton className="h-8 w-48" /><Skeleton className="h-4 w-32" /></div>
        <div className="flex flex-col gap-2"><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-3/4" /></div>
        <Skeleton className="h-64 rounded-xl" />
      </div>
      <div className="lg:col-span-4"><Skeleton className="h-120 rounded-xl" /></div>
    </div>
  );
}

function SpaceDetailsScreen() {
  const [theme, setTheme] = useTheme();
  const near = useNearMe();
  const [state, setState] = React.useState(pageParams.get('state') || 'ready');
  React.useEffect(() => { if (state === 'loading' && !pageParams.get('state')) setTimeout(() => setState('ready'), 900); }, []);
  const [signedIn, setSignedIn] = React.useState(pageParams.get('auth') === '1');
  const space = M.spaces.find((s) => s.id === (pageParams.get('id') || 'focus'));
  if (space && pageParams.get('demo') === 'stale') Object.assign(space, { stale: true, updatedDays: 40 });
  const [fav, setFav] = React.useState(pageParams.get('fav') === '1' && !actionFails('fav'));
  const [signIn, setSignIn] = React.useState(pageParams.get('dialog') === 'signin' ? 'fav' : pageParams.get('dialog') === 'signin-report' ? 'report' : false);
  const [report, setReport] = React.useState(pageParams.get('dialog') === 'report');
  const [platform, setPlatform] = React.useState(false);
  // C4: the save failing on the way back (P8) says so, with a way to try again.
  React.useEffect(() => {
    if (space && pageParams.get('fav') === '1' && actionFails('fav')) {
      const t = setTimeout(() => {
        toast.error(tr(`تعذّر حفظ ${spaceName(space)} في المفضّلة`, `Couldn’t save ${spaceName(space)} to your favourites`), { action: { label: tr("إعادة المحاولة", "Try again"), onClick: () => { setFav(true); toast.success(favSavedLine(space)); } } });
      }, 400);
      return () => clearTimeout(t);
    }
  }, []);
  React.useEffect(() => { if (space) document.title = `${spaceName(space)} — ${tr('مساحة', 'Masaha')}`; }, []);

  const crumbs = (
    <Breadcrumb label={tr("مسار التنقل", "Breadcrumb")}>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="Home.html">{tr("الرئيسية", "Home")}</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbLink href={directoryHref()}>{tr("المساحات", "Spaces")}</BreadcrumbLink></BreadcrumbItem>
        {space && state !== 'notfound' && <><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage><SpaceName space={space} /></BreadcrumbPage></BreadcrumbItem></>}
      </BreadcrumbList>
    </Breadcrumb>
  );

  const shell = (content, bar) => (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <SiteHeader current="directory" theme={theme} setTheme={setTheme} />
      <main className={'mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 md:px-8 ' + (bar ? 'pb-24 md:pb-6' : '')}>
        {/* PU-022: one way back — the breadcrumb from 768, «العودة إلى المساحات» alone below it. */}
        <div className="hidden md:block">{crumbs}</div>
        <Button variant="link" size="sm" className="self-start px-0 md:hidden" asChild><a href={directoryHref()}><ChevronStartIcon />{tr("العودة إلى المساحات", "Back to spaces")}</a></Button>
        {content}
      </main>
      <SiteFooter />
      {bar}
      <PageToaster />
    </div>
  );

  if (state === 'loading') return shell(<DetailsSkeleton />);
  if (!space || state === 'notfound') {
    return shell(
      <Card>
        <EmptyState icon={<SearchXIcon />} title={tr("هذه المساحة غير متاحة", "This space isn’t available")} description={tr("ربما أُزيلت من الدليل أو أن الرابط غير صحيح.", "It may have been removed from the directory, or the link is wrong.")}>
          <Button asChild><a href="Directory.html">{tr("تصفّح المساحات", "Browse spaces")}</a></Button>
        </EmptyState>
      </Card>
    );
  }

  const km = near.coords ? M.distanceKm(near.coords, space) : null;
  const wa = space.contacts.find((c) => c.type === 'whatsapp');
  const call = space.contacts.find((c) => M.channels[c.type].phone);
  const toggleFav = () => {
    if (!signedIn) return setSignIn('fav');
    setFav(!fav); toast(!fav ? tr("أُضيفت إلى المفضلة", "Added to favourites") : tr("أُزيلت من المفضلة", "Removed from favourites"));
  };
  const openReport = () => (signedIn ? setReport(true) : setSignIn('report'));

  const bar = (wa || call) && (
    <div className="fixed inset-x-0 bottom-0 z-10 border-t border-border bg-background px-4 py-3 md:hidden">
      <div className="flex gap-2">
        {wa && <Button className="flex-1" asChild><a href={M.channels.whatsapp.href(wa.value)} target="_blank" rel="noopener">{tr("واتساب", "WhatsApp")}</a></Button>}
        {call && <Button variant="outline" className="flex-1" asChild><a href={M.channels[call.type].href(call.value)}>{tr("اتصال", "Call")}</a></Button>}
      </div>
    </div>
  );

  return shell(
    <>
      {space.closure && (
        <Alert variant="warning">
          <AlertTitle>{space.closure.title}</AlertTitle>
          <AlertDescription>{tr("إعلان من إدارة المساحة · ", "Announcement from the space · ")}{space.closure.date}</AlertDescription>
        </Alert>
      )}
      <div className="flex flex-col gap-10 lg:grid lg:grid-cols-12 lg:items-start lg:gap-8">
        <div className="flex min-w-0 flex-col gap-10 lg:col-span-8">
          <div className="flex flex-col gap-6">
            <Gallery space={space} />
            <header className="flex flex-col gap-1">
              {/* PU-014: the heart beside the name it acts on, not at the far end of the column. */}
              <div className="flex items-center gap-3">
                <h1 className="min-w-0 text-heading-1"><SpaceName space={space} /></h1>
                <Button variant="outline" size="icon" aria-pressed={fav} aria-label={fav ? tr("إزالة من المفضلة", "Remove from favourites") : tr("حفظ في المفضلة", "Save to favourites")} onClick={toggleFav} className={fav ? 'text-primary' : ''}><HeartIcon filled={fav} /></Button>
              </div>
              {otherName(space) && (LANG === 'en' ? <p lang="ar" dir="rtl" className="self-start text-body text-muted-foreground">{otherName(space)}</p> : <p lang="en" dir="ltr" className="self-start text-body text-muted-foreground">{otherName(space)}</p>)}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-body-sm text-muted-foreground">
                <span>{areaLine(space)}</span>
                {space.verified && <span className="inline-flex items-center gap-1 text-primary"><CircleCheckIcon className="size-4" aria-hidden="true" />{tr("موثّقة", "Verified")}</span>}
                {!space.photos && <span>{tr("لا توجد صور بعد", "No photos yet")}</span>}
              </div>
            </header>
            {/* U4 (PU-009): the same relative age as every other fact on the page, from the profile's date,
                and the notice's one action inside it. */}
            {!space.verified && (
              <Alert variant="info">
                <AlertDescription>{tr("جمع فريق مساحة هذه المعلومات ولم تؤكدها إدارة المساحة بعد · آخر تحديث للمعلومات ", "The Masaha team collected this information; the space hasn’t confirmed it yet · Information updated ")}{M.ago(space.fresh.profile)}</AlertDescription>
                <AlertAction><Button variant="outline" size="sm" onClick={() => setPlatform(true)}>{tr("هل تدير هذه المساحة؟ تواصل معنا", "Do you run this space? Contact us")}</Button></AlertAction>
              </Alert>
            )}
            <div className="lg:hidden"><StatusCard space={space} km={km} /></div>
          </div>
          {/* U8: one order at every width — what is happening, what it costs, when it is open, what it
              has, what it is, where it is; the contacts below `lg`, then the report. */}
          <AnnouncementsSection space={space} />
          <PricesSection space={space} />
          <HoursSection space={space} />
          <AmenitiesSection space={space} />
          <AboutSection space={space} />
          <LocationSection space={space} user={near.coords} userSource={near.loc.source} />
          <div className="lg:hidden"><ContactSection space={space} /></div>
          <div className="border-t border-border pt-6">
            <Button variant="link" className="px-0" onClick={openReport}>{tr("الإبلاغ عن معلومة غير صحيحة", "Report wrong information")}</Button>
          </div>
        </div>
        <aside className="details-aside hidden lg:col-span-4 lg:block" aria-label={tr("الحالة والتواصل", "Status & contact")}>
          <StatusContactCard space={space} km={km} />
        </aside>
      </div>
      <InPlaceSignIn open={signIn} space={space} onClose={() => setSignIn(false)} onDone={(why, how, who) => {
        setSignIn(false); setSignedIn(true);
        const hello = how === 'register' ? tr(`أهلًا ${who || 'سارة'}، تم إنشاء حسابك`, `Welcome ${who || 'Sara'}, your account is ready`) : tr("أهلًا بعودتك", "Welcome back");
        if (why === 'report') { setReport(true); toast.success(hello); }
        else { setFav(true); toast.success(hello, { description: favSavedLine(space) }); }
      }} />
      <ReportDialog open={report} onOpenChange={setReport} space={space} />
      <PlatformContactDialog open={platform} onOpenChange={setPlatform} />
    </>,
    bar
  );
}

ReactDOM.createRoot(document.getElementById('ds-root')).render(<DirectionProvider dir={DIR}><SpaceDetailsScreen /></DirectionProvider>);
