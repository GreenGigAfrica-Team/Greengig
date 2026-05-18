import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AccountType.module.css';

type AccountType = 'jobseeker' | 'volunteer';

const CARDS = [
  {
    id: 'jobseeker' as AccountType,
    icon: '💰',
    title: 'Job Seeker',
    description: 'Find paid climate tasks near you and earn money via mobile wallet.',
    badge: 'Earn per task',
    points: [
      'Browse tasks in your LGA',
      'Get paid via OPay or PalmPay',
      'Build a verified work history',
    ],
    comingSoon: false,
  },
  {
    id: 'volunteer' as AccountType,
    icon: '🌱',
    title: 'Volunteer',
    description: 'Contribute to climate action and earn a verified certificate and impact score.',
    badge: 'Certificate + impact score',
    points: [
      'Browse tasks in your LGA',
      'Downloadable certificate',
      'Visible impact score on profile',
    ],
    comingSoon: false,
  },
  {
    id: 'org' as any,
    icon: '🏢',
    title: 'Organization',
    description: 'Post climate tasks, find verified workers, and report your impact to donors.',
    badge: 'NGO/GOV/CSR',
    points: [
      'Post and manage tasks',
      'Review proof of work',
      'Export donor impact reports',
    ],
    comingSoon: true,
  },
];

export default function AccountType() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<AccountType>('jobseeker');

  function handleContinue() {
    navigate('/onboarding/phone', { state: { accountType: selected } });
  }

  const label = selected === 'jobseeker' ? 'job seeker' : 'volunteer';

  return (
    <div className={styles.page}>
      <p className={styles.eyebrow}>GET STARTED</p>
      <h1 className={styles.heading}>Who are you signing up as?</h1>
      <p className={styles.sub}>Choose your account type to get started</p>

      <div className={styles.cards}>
        {CARDS.map((card) => (
          <div
            key={card.id}
            className={[
              styles.card,
              card.comingSoon ? styles.cardDisabled : '',
              !card.comingSoon && selected === card.id ? styles.cardSelected : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => {
              if (!card.comingSoon) setSelected(card.id as AccountType);
            }}
          >
            {card.comingSoon && <span className={styles.soon}>Coming soon</span>}
            <span className={styles.icon}>{card.icon}</span>
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardDesc}>{card.description}</p>
            <span className={[styles.badge, card.comingSoon ? styles.badgeGrey : styles.badgeGreen].join(' ')}>
              {card.badge}
            </span>
            <ul className={styles.points}>
              {card.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <button type="button" className={styles.btn} onClick={handleContinue}>
        Continue as a {label}
      </button>
      <p className={styles.loginRow}>
        Already have an account?{' '}
        <a href="#" className={styles.loginLink} onClick={(e) => { e.preventDefault(); navigate('/login'); }}>
          Log in
        </a>
      </p>
    </div>
  );
}
