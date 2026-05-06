import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import ProgressBar from '../components/ProgressBar';
import styles from './Step1Phone.module.css';

// Nigerian numbers are 10 digits after +234
// First digit must be 7, 8, or 9 — covers MTN, Airtel, Glo, 9mobile
function isValidNigerianNumber(digits: string) {
  return /^[789]\d{9}$/.test(digits);
}

function formatDisplay(digits: string) {
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
}

export default function Step1Phone() {
  const navigate = useNavigate();
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
    navigate('/onboarding/verify', { state: { phone: digits } });
  }

  return (
    <AuthLayout>
      <ProgressBar current={1} total={5} />
      <div className={styles.body}>
        <h2 className={styles.heading}>Get started in 2 minutes</h2>
        <p className={styles.sub}>No email. Just your phone number</p>
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
              aria-describedby={
                showError ? 'phone-msg' : showHelper ? 'phone-msg' : undefined
              }
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
        <p className={styles.loginLink}>
          Already have an account?{' '}
          <a
            href="#"
            className={styles.loginAnchor}
            onClick={(e) => {
              e.preventDefault();
              navigate('/login');
            }}
          >
            Log in
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}
