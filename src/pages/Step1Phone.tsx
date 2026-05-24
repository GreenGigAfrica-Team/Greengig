import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../firebase';
import AuthLayout from '../components/AuthLayout';
import ProgressBar from '../components/ProgressBar';
import PhoneInput, { type PhoneValue } from '../components/PhoneInput';
import styles from './Step1Phone.module.css';

export default function Step1Phone() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState<PhoneValue>({ dialCode: '+234', digits: '', full: '', isValid: false });
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const recaptchaRef = useRef<RecaptchaVerifier | null>(null);

  const showError = touched && phone.digits.length > 0 && !phone.isValid;
  const showHelper = phone.isValid && !error;

  useEffect(() => {
    recaptchaRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
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
    setLoading(true);
    setError('');
    try {
      const confirmation = await signInWithPhoneNumber(auth, phone.full, recaptchaRef.current);
      navigate('/onboarding/verify', { state: { phone: phone.digits, fullPhone: phone.full, confirmation } });
    } catch (err: unknown) {
      recaptchaRef.current?.clear();
      recaptchaRef.current = null;
      setError(err instanceof Error ? err.message : 'Failed to send OTP. Try again.');
    } finally { setLoading(false); }
  }

  return (
    <AuthLayout>
      <ProgressBar current={1} total={5} />
      <div className={styles.body}>
        <h2 className={styles.heading}>Get started in 2 minutes</h2>
        <p className={styles.sub}>No email. Just your phone number</p>
        <form onSubmit={handleSubmit} noValidate>
          <label className={styles.label} htmlFor="phone">Phone number</label>
          <PhoneInput onChange={(val) => { setPhone(val); setError(''); }} error={showError} valid={showHelper} />
          {showError && <p className={styles.errorText}>Please enter a valid phone number</p>}
          {showHelper && <p className={styles.helperText}>We'll send a one time code to this number</p>}
          {error && <p className={styles.errorText}>{error}</p>}
          <div id="recaptcha-container" style={{ margin: '16px 0' }} />
          <button type="submit" disabled={loading}
            className={`${styles.btn} ${phone.isValid && !loading ? styles.btnActive : styles.btnMuted}`}>
            {loading ? 'Sending…' : 'Send OTP'}
          </button>
        </form>
        <p className={styles.loginLink}>
          Already have an account?{' '}
          <a href="#" className={styles.loginAnchor} onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Log in</a>
        </p>
      </div>
    </AuthLayout>
  );
}
