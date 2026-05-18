import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import ProgressBar from '../components/ProgressBar';
import styles from './Step4Profile.module.css';

// Lagos LGAs — primary market for the pilot
const LGAS = [
  'Agege',
  'Ajeromi-Ifelodun',
  'Alimosho',
  'Amuwo-Odofin',
  'Apapa',
  'Badagry',
  'Epe',
  'Eti-Osa',
  'Ibeju-Lekki',
  'Ifako-Ijaiye',
  'Ikeja',
  'Ikorodu',
  'Kosofe',
  'Lagos Island',
  'Lagos Mainland',
  'Mushin',
  'Ojo',
  'Oshodi-Isolo',
  'Shomolu',
  'Surulere',
];

const INTERESTS = [
  { id: 'waste', label: 'Waste Collection', icon: '🗑️', comingSoon: false },
  { id: 'trees', label: 'Tree Planting', icon: '🌳', comingSoon: true },
  { id: 'farming', label: 'Urban Farming', icon: '🌾', comingSoon: true },
  { id: 'climate', label: 'Climate Data', icon: '📊', comingSoon: true },
  { id: 'recycling', label: 'Recycling', icon: '♻️', comingSoon: false },
  { id: 'education', label: 'Community Education', icon: '📚', comingSoon: false },
];

export default function Step4Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const { phone, path } = location.state ?? {};

  const [name, setName] = useState('');
  const [lga, setLga] = useState('');
  const [interests, setInterests] = useState<Set<string>>(new Set());

  const canContinue = name.trim().length > 0 && lga !== '' && interests.size > 0;

  function toggleInterest(id: string) {
    setInterests((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function handleContinue() {
    if (!canContinue) return;
    navigate('/onboarding/success', {
      state: { phone, path, name, lga, interests: [...interests] },
    });
  }

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
      <ProgressBar current={4} total={5} />
      <div className={styles.body}>
        <h2 className={styles.heading}>Tell us about yourself</h2>
        <div className={styles.fields}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="fullname">
              Full name
            </label>
            <input
              id="fullname"
              type="text"
              className={styles.input}
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="lga">
              Your LGA
            </label>
            <div className={styles.selectWrap}>
              <select
                id="lga"
                className={styles.select}
                value={lga}
                onChange={(e) => setLga(e.target.value)}
              >
                <option value="" disabled>
                  Select your area
                </option>
                {LGAS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              <span className={styles.arrow} aria-hidden="true">
                ▾
              </span>
            </div>
          </div>
          <div className={styles.interestSection}>
            <p className={styles.interestHeading}>I'm interested in</p>
            <div className={styles.grid}>
              {INTERESTS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={[
                    styles.interestCard,
                    item.comingSoon ? styles.interestDisabled : '',
                    !item.comingSoon && interests.has(item.id) ? styles.interestSelected : '',
                  ].filter(Boolean).join(' ')}
                  onClick={() => { if (!item.comingSoon) toggleInterest(item.id); }}
                  aria-pressed={!item.comingSoon && interests.has(item.id)}
                  disabled={item.comingSoon}
                >
                  <span className={styles.interestIcon}>{item.icon}</span>
                  <span className={styles.interestName}>{item.label}</span>
                  {item.comingSoon && <span className={styles.soonBadge}>Coming soon</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={handleContinue}
          className={`${styles.btn} ${canContinue ? styles.btnActive : styles.btnMuted}`}
        >
          Continue
        </button>
      </div>
    </AuthLayout>
  );
}
