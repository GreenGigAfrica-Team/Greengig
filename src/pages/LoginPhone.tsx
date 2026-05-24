import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../firebase';
import AuthLayout from '../components/AuthLayout';
import PhoneInput, { type PhoneValue } from '../components/PhoneInput';
import styles from './LoginPhone.module.css';

export default function LoginPhone() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const verifyPath = pathname.includes('signin') ? '/signin/verify' : '/login/verify';

  const [phone, setPhone] = useState<PhoneValue>({ dialCode: '+234', digits: '', full: '', isValid: false });
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const recaptchaRef = useRef<RecaptchaVerifier | null>(null);

  const showError = touched && phone.digits.length > 0 && !phone.isValid;
  const showHelper = phone.isValid && !error;

  useEffect(() => {
    recaptchaRef.current = new RecaptchaVerifier(auth, 'recaptcha-login', {
      size: 'normal',
      callback: () => {},
      'expired-callback': () => { recaptchaRef.current?.clear(); recaptchaRef.current = null; },
    });
    recaptchaRef.current.render();
    return () => { recaptchaRef.current?.clear(); recaptchaRef.current = null; };
  }, []);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setTouched(true);
    if (!phone.isValid || loading || !recaptchaRef.current) return;
    setLoading(true); setError('');
    try {
      const confirmation = await signInWithPhoneNumber(auth, phone.full, recaptchaRef.current);
      navigate(verifyPath, { state: { phone: phone.digits, fullPhone: phone.full, confirmation } });
    } catch (err: unknown) {
      recaptchaRef.current?.clear(); recaptchaRef.current = null;
      setError(err instanceof Error ? err.message : 'Failed to send OTP. Try again.');
    } finally { setLoading(false); }
  }

  return (
    <AuthLayout>
      <div className={styles.wrapper}>
        <div className={styles.body}>
          <h2 className={styles.heading}>Welcome back</h2>
          <p className={styles.sub}>Enter your phone number and we'll send you a code to log in.</p>
          <form onSubmit={handleSubmit} noValidate>
            <label className={styles.label} htmlFor="phone">Phone number</label>
            <PhoneInput onChange={(val) => { setPhone(val); setError(''); }} error={showError} valid={showHelper} />
            {showError && <p className={styles.errorText}>Please enter a valid phone number</p>}
            {showHelper && <p className={styles.helperText}>We'll send a one time code to this number</p>}
            {error && <p className={styles.errorText}>{error}</p>}
            <div id="recaptcha-login" style={{ margin: '16px 0' }} />
            <button type="submit" disabled={loading}
              className={`${styles.btn} ${phone.isValid && !loading ? styles.btnActive : styles.btnMuted}`}>
              {loading ? 'Sending…' : 'Send OTP'}
            </button>
          </form>
          <p className={styles.signupLink}>
            Don't have an account?{' '}
            <a href="#" className={styles.signupAnchor} onClick={(e) => { e.preventDefault(); navigate('/onboarding/phone'); }}>Sign up</a>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
