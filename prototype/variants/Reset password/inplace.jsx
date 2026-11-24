const { DirectionProvider, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Field, Input, InputAction, Button, Alert, AlertTitle, AlertDescription, AlertAction, EyeIcon, EyeOffIcon, LogInIcon, CircleCheckIcon, TriangleAlertIcon, Spinner, EmptyState, CircleAlertIcon } = window.MasahaDesignSystem;
// AUTH_IN_PLACE P2, loop 2 (masaha's ADR 0021): the reset link's page, opened from the e-mail. When the reset was
// asked from the sign-in over a space's page, the link carries that page (`next`) and the held action. NEW: the page
// says where it returns, and once the password is set it signs in right here — the e-mail filled, the focus in the
// new password's field for the browser's password manager — then returns to the space with the action done. Never a
// sign-in by itself (ADR 0021 point 4). Demo: ?from=focus (a held favourite) · &state=success|invalid|…
const fromSpace = pageParams.get('from') ? M.spaces.find((s) => s.id === pageParams.get('from')) : null;
const M = window.MASAHA;
const initialState = pageParams.get('state');

function ResetSignIn() {
  const [pw, setPw] = React.useState('');
  const [show, setShow] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState();
  const submit = (e) => {
    e.preventDefault();
    if (!pw) return setError(tr("أدخل كلمة المرور", "Enter your password"));
    setError(); setBusy(true);
    setTimeout(() => {
      if (fromSpace) handOffToast({ title: tr("أهلًا بعودتك", "Welcome back"), description: favSavedLine(fromSpace) });
      location.href = fromSpace ? `Space details.html?v=inplace&id=${fromSpace.id}&auth=1&fav=1` : 'Home.html?auth=1';
    }, 900);
  };
  return (
    <>
      <CardHeader>
        <CircleCheckIcon className="size-6 text-success" aria-hidden="true" />
        <CardTitle>{tr("تم تغيير كلمة المرور، وسُجّل خروجك من كل الأجهزة", "Your password was changed, and you were signed out on all devices")}</CardTitle>
        <CardDescription>{fromSpace
          ? tr(`سجّل الدخول بكلمة المرور الجديدة، ونعيدك إلى ${spaceName(fromSpace)} لنكمل حفظها في مفضّلتك.`, `Sign in with your new password, and we take you back to ${spaceName(fromSpace)} to finish saving it.`)
          : tr("سجّل الدخول بكلمة المرور الجديدة.", "Sign in with your new password.")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" noValidate onSubmit={submit}>
          <Field label={tr("البريد الإلكتروني", "Email")}>
            <Input type="email" dir="ltr" autoComplete="email" defaultValue="sara@example.com" />
          </Field>
          <Field label={tr("كلمة المرور", "Password")} error={error}>
            <Input autoFocus type={show ? 'text' : 'password'} dir="ltr" autoComplete="current-password" value={pw} onChange={(e) => setPw(e.target.value)}
              action={<InputAction label={show ? tr("إخفاء كلمة المرور", "Hide password") : tr("إظهار كلمة المرور", "Show password")} icon={show ? <EyeOffIcon /> : <EyeIcon />} onClick={() => setShow(!show)} />} />
          </Field>
          <Button type="submit" className="inplace-primary w-full" loading={busy}>{tr("تسجيل الدخول", "Sign in")}</Button>
        </form>
      </CardContent>
    </>
  );
}

function ResetScreen() {
  const [theme, setTheme] = useTheme();
  const checkLeft = useRetryAfter(initialState === 'checkfailed');
  const [pw, setPw] = React.useState(initialState === 'typing' ? 'masaha' : '');
  const [error, setError] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [state, setState] = React.useState(['invalid', 'success', 'loading', 'unreachable', 'checkfailed'].includes(initialState) ? initialState : 'form');
  // ?state=loading is a frame: it stays. Without ?state the form shows at once.
  React.useEffect(() => { if (state === 'loading' && !initialState) { const t = setTimeout(() => setState('form'), ACTION_MS); return () => clearTimeout(t); } }, [state]);
  const retry = () => { setState('loading'); setTimeout(() => setState('form'), ACTION_MS); };

  const submit = (e) => {
    e.preventDefault();
    if (!pw) return setError(tr("أدخل كلمة المرور الجديدة", "Enter the new password"));
    if (!passwordOk(pw)) return setError(tr("كلمة المرور لا تستوفي الشروط أدناه", "The password doesn’t meet the rules below"));
    setError(); setLoading(true);
    setTimeout(() => { setLoading(false); setState('success'); }, 1100);
  };

  return (
    <AuthShell theme={theme} setTheme={setTheme}>
      <Card className="w-full md:max-w-md">
        {state === 'loading' && (
          <>
            <CardHeader>
              <CardTitle>{tr("تعيين كلمة مرور جديدة", "Set a new password")}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center py-6"><Spinner label={tr("جارٍ التحميل", "Loading")} /></CardContent>
          </>
        )}
        {state === 'unreachable' && (
          <>
            <CardHeader>
              <CardTitle>{tr("تعيين كلمة مرور جديدة", "Set a new password")}</CardTitle>
            </CardHeader>
            <CardContent>
              <EmptyState icon={<CircleAlertIcon />} title={tr("لا يوجد اتصال بالإنترنت", "No internet connection")} description={tr("ستظهر البيانات عند عودة الاتصال.", "The data will appear when you’re back online.")}>
                <Button variant="outline" onClick={retry}>{tr("إعادة المحاولة", "Try again")}</Button>
              </EmptyState>
            </CardContent>
          </>
        )}
        {state === 'checkfailed' && (
          <>
            <CardHeader>
              <CardTitle>{tr("تعيين كلمة مرور جديدة", "Set a new password")}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <RateLimitAlert left={checkLeft} />
              <p className="text-body-sm">{tr("افتح الرابط من بريدك الإلكتروني مرة أخرى.", "Open the link in your email again.")}</p>
            </CardContent>
          </>
        )}
        {state === 'invalid' && (
          <>
            <CardHeader>
              <CardTitle>{tr("انتهت صلاحية الرابط أو استُخدم من قبل", "The link has expired or was already used")}</CardTitle>
              <CardDescription>{tr("روابط الاستعادة صالحة لمدة ساعة ولمرة واحدة فقط.", "Reset links are valid for one hour and can be used once.")}</CardDescription>
            </CardHeader>
            <CardContent><Button className="w-full" asChild><a href="Forgot password.html">{tr("اطلب رابطًا جديدًا", "Request a new link")}</a></Button></CardContent>
          </>
        )}
        {state === 'success' && <ResetSignIn />}
        {state === 'form' && (
          <>
            <CardHeader>
              <CardTitle>{tr("تعيين كلمة مرور جديدة", "Set a new password")}</CardTitle>
              <CardDescription>{tr("للحساب ", "For ")}<Ltr>{maskEmail('sara@example.com')}</Ltr></CardDescription>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col gap-4" noValidate onSubmit={submit}>
                <div className="flex flex-col gap-2">
                  <PasswordField label={tr("كلمة المرور الجديدة", "New password")} value={pw} onChange={setPw} error={error} disabled={loading} rules={false} />
                  {/* A7: the conditions as one line, as in the in-place register. */}
                  <p className="text-body-sm text-muted-foreground" aria-live="polite">{passwordOk(pw) ? tr("✓ كلمة المرور مناسبة", "✓ The password is fine") : tr("8 أحرف على الأقل، فيها حرف ورقم", "At least 8 characters, with a letter and a number")}</p>
                </div>
                {fromSpace && (
                  <Alert variant="info"><AlertDescription>{tr(`بعد الحفظ سجّل الدخول هنا، ونعيدك إلى ${spaceName(fromSpace)} لنكمل حفظها في مفضّلتك.`, `After saving, sign in here and we take you back to ${spaceName(fromSpace)} to finish saving it to your favourites.`)}</AlertDescription></Alert>
                )}
                <Button type="submit" className="inplace-primary w-full" loading={loading}>{tr("حفظ كلمة المرور", "Save password")}</Button>
              </form>
            </CardContent>
          </>
        )}
        {state !== 'success' && <CardFooter className="flex flex-col gap-2"><Button variant="link" size="sm" asChild><a href="Sign in.html">{tr("العودة إلى تسجيل الدخول", "Back to sign in")}</a></Button></CardFooter>}
      </Card>
    </AuthShell>
  );
}

ReactDOM.createRoot(document.getElementById('ds-root')).render(<DirectionProvider dir={DIR}><ResetScreen /></DirectionProvider>);
