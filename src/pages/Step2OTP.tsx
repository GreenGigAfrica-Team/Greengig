import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import ProgressBar from '../components/ProgressBar';
import styles from './Step2OTP.module.css';

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 30;

export default function Step2OTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const phone: string = location.state?.phone ?? '';

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [hasError, setHasError] = useState(false);
  const [countdown, setCountdown] = useState(RESEND_COOLDOWN);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const isFilled = otp.every((d) => d !== '');

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  function focusBox(index: number) {
    inputRefs.current[index]?.focus();
  }

  function handleChange(index: number, e: React.ChangeEvent<HTMLInputElement>) {
    const digit = e.target.value.replace(/\D/g, '').slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    setHasError(false);
    if (digit && index < OTP_LENGTH - 1) focusBox(index + 1);
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    // backspace on an empty box moves focus left
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      focusBox(index - 1);
    }
  }

  // paste support: spread digits across boxes from current focus position
  function handlePaste(e: React.ClipboardEvent) {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pasted) return;
    e.preventDefault();
    const next = [...otp];
    for (let i = 0; i < OTP_LENGTH; i++) {
      next[i] = pasted[i] ?? '';
    }
    setOtp(next);
    focusBox(Math.min(pasted.length, OTP_LENGTH - 1));
  }

  function handleVerify(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!isFilled) return;
    // real apps call the backend here; for now any 6 digits proceed
    navigate('/onboarding/path', { state: { phone } });
  }

  function handleResend() {
    if (countdown > 0) return;
    setOtp(Array(OTP_LENGTH).fill(''));
    setHasError(false);
    setCountdown(RESEND_COOLDOWN);
    setTimeout(() => focusBox(0), 0);
  }

  const formattedPhone = phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');

  return (
    <AuthLayout>
      <div className={styles.backRow}>
        <button className={styles.back} onClick={() => navigate(-1)} type="button">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M15 9H3M8 4L3 9L8 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
      </div>
      <ProgressBar current={2} total={5} />
      <div className={styles.body}>
        <h2 className={styles.heading}>Enter your code</h2>
        <p className={styles.sub}>Code sent to +234 {formattedPhone}</p>
        <form onSubmit={handleVerify} noValidate>
          <div className={styles.boxes} onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputRefs.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className={[
                  styles.box,
                  hasError ? styles.boxError : digit ? styles.boxFilled : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-label={`Digit ${i + 1}`}
              />
            ))}
          </div>
          {hasError && (
            <p className={styles.errorText}>Incorrect code. Please try again.</p>
          )}
          <div className={styles.resendRow}>
            {countdown > 0 ? (
              <span className={styles.resendCooldown}>Resend OTP in {countdown}s</span>
            ) : (
              <button type="button" className={styles.resendBtn} onClick={handleResend}>
                Resend OTP
              </button>
            )}
          </div>
          <button
            type="submit"
            className={`${styles.btn} ${isFilled ? styles.btnActive : styles.btnMuted}`}
          >
            Verify
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}
