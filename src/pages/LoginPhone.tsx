import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import styles from './LoginPhone.module.css';

function isValidNigerianNumber(digits: string) {
  return /^[789]\d{9}$/.test(digits);
}

function formatDisplay(digits: string) {
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
}

export default function LoginPhone() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const verifyPath = pathname.includes('signin') ? '/signin/verify' : '/login/verify';

  const [digits, setDigits] = useState('');
  const [touched, setTouched] = useState(false);

  const isValid = isValidNigerianNumber(digits);
  const showError = touched && digits.length > 0 && !isValid;
  const showHelper = isValid;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 10);
    setDigits(raw);
  }

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;
    navigate(verifyPath, { state: { phone: digits } });
  }

  return (
    <AuthLayout>
      <div className={styles.wrapper}>
        <div className={styles.body}>
          <h2 className={styles.heading}>Welcome back</h2>
          <p className={styles.sub}>
            Enter your phone number and we'll send you a code to log in.
          </p>
          <form onSubmit={handleSubmit} noValidate>
            <label className={styles.label} htmlFor="phone">
              Phone number
            </label>
            <div
              className={[
                styles.inputWrap,
                showError ? styles.stateError : '',
                showHelper ? styles.stateValid : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <span className={styles.prefix}>+234</span>
              <input
                id="phone"
                type="tel"
                inputMode="numeric"
                className={styles.input}
                placeholder="Enter phone number"
                value={formatDisplay(digits)}
                onChange={handleChange}
                onBlur={() => setTouched(true)}
                aria-describedby={showError || showHelper ? 'phone-msg' : undefined}
              />
            </div>
            {showError && (
              <p id="phone-msg" className={styles.errorText}>
                Please enter a valid +234 phone number
              </p>
            )}
            {showHelper && (
              <p id="phone-msg" className={styles.helperText}>
                We'll send a one time code to this number
              </p>
            )}
            <button
              type="submit"
              className={`${styles.btn} ${isValid ? styles.btnActive : styles.btnMuted}`}
            >
              Send OTP
            </button>
          </form>
          <p className={styles.signupLink}>
            Don't have an account?{' '}
            <a
              href="#"
              className={styles.signupAnchor}
              onClick={(e) => {
                e.preventDefault();
                navigate('/onboarding/phone');
              }}
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
