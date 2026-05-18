import { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import TaskCard, { type Task } from '../components/TaskCard';
import styles from './FindTasks.module.css';

import wasteIcon from '../assets/images/iconpack/waste collection icon.svg';
import recycleIcon from '../assets/images/iconpack/recycle icon.svg';
import communityIcon from '../assets/images/iconpack/community icon.svg';

const TASK_TYPES = ['Waste Collection', 'Recycling', 'Community Education'];
const LGA = 'Alimosho LGA';
const LOCATIONS = ['Ikotun', 'Iyana-Ipaja', 'Egbeda', 'Ayoba', 'Alagbado'];

const ICON: Record<string, string> = {
  'Waste Collection': wasteIcon,
  'Recycling': recycleIcon,
  'Community Education': communityIcon,
};

const ALL_TASKS: Task[] = [
  {
    id: 1,
    title: 'Community Waste Collection',
    location: 'Iyana-Ipaja Market',
    date: 'May 8, 2026',
    time: '8:00am – 12:00pm',
    type: 'Waste Collection',
    org: 'LAWMA',
    spotsLeft: 2,
    pay: 5000,
    icon: ICON['Waste Collection'],
    neighborhood: 'Iyana-Ipaja',
  },
  {
    id: 2,
    title: 'Public Space Waste Removal',
    location: 'Ayoba',
    date: 'May 13, 2026',
    time: '9:00am – 1:00pm',
    type: 'Waste Collection',
    org: 'LAWMA',
    spotsLeft: 3,
    pay: 6200,
    icon: ICON['Waste Collection'],
    neighborhood: 'Ayoba',
  },
  {
    id: 3,
    title: 'Community Street Cleanup',
    location: 'Aboru',
    date: 'May 10, 2026',
    time: '8:00am – 11:00am',
    type: 'Waste Collection',
    org: 'LAWMA',
    spotsLeft: 7,
    pay: 5500,
    icon: ICON['Waste Collection'],
    neighborhood: 'Iyana-Ipaja',
  },
  {
    id: 4,
    title: 'Neighborhood Waste Bagging',
    location: 'Egbeda',
    date: 'May 11, 2026',
    time: '7:30am – 10:30am',
    type: 'Waste Collection',
    org: 'LAWMA',
    spotsLeft: 4,
    pay: 5800,
    icon: ICON['Waste Collection'],
    neighborhood: 'Egbeda',
  },
  {
    id: 5,
    title: 'Market Waste Sorting',
    location: 'Alaguntan',
    date: 'May 14, 2026',
    time: '8:00am – 12:00pm',
    type: 'Waste Collection',
    org: 'LAWMA',
    spotsLeft: 4,
    pay: 6000,
    icon: ICON['Waste Collection'],
    neighborhood: 'Alagbado',
  },
  {
    id: 6,
    title: 'Neighbourhood Recycling Drive',
    location: 'Aboru Residential Area',
    date: 'May 15, 2026',
    time: '9:00am – 1:00pm',
    type: 'Recycling',
    org: 'RecyclePoints',
    spotsLeft: 3,
    pay: 5500,
    icon: ICON['Recycling'],
    neighborhood: 'Iyana-Ipaja',
  },
  {
    id: 7,
    title: 'Estate Recycling Collection',
    location: 'Egbeda Housing Estate',
    date: 'May 16, 2026',
    time: '8:00am – 12:00pm',
    type: 'Recycling',
    org: 'RecyclePoints',
    spotsLeft: 5,
    pay: 4800,
    icon: ICON['Recycling'],
    neighborhood: 'Egbeda',
  },
  {
    id: 8,
    title: 'Climate Awareness Outreach',
    location: 'Ikotun Community Centre',
    date: 'May 17, 2026',
    time: '10:00am – 2:00pm',
    type: 'Community Education',
    org: 'GreenWatch',
    spotsLeft: 6,
    pay: 4500,
    icon: ICON['Community Education'],
    neighborhood: 'Ikotun',
  },
  {
    id: 9,
    title: 'Waste Management Workshop',
    location: 'Alagbado Town Hall',
    date: 'May 18, 2026',
    time: '9:00am – 12:00pm',
    type: 'Community Education',
    org: 'GreenWatch',
    spotsLeft: 8,
    pay: 4200,
    icon: ICON['Community Education'],
    neighborhood: 'Alagbado',
  },
];

export default function FindTasks() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([...TASK_TYPES]);
  const [selectedLocation, setSelectedLocation] = useState<string>('Iyana-Ipaja');
  const [sortBy, setSortBy] = useState('latest');

  function toggleType(type: string) {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }

  function toggleLocation(loc: string) {
    setSelectedLocation((prev) => (prev === loc ? '' : loc));
  }

  const filtered = useMemo(() => {
    let tasks = ALL_TASKS.filter((t) => selectedTypes.includes(t.type));
    if (selectedLocation) {
      tasks = tasks.filter((t) => t.neighborhood === selectedLocation);
    }
    if (sortBy === 'pay-high') {
      tasks = [...tasks].sort((a, b) => b.pay - a.pay);
    } else if (sortBy === 'spots') {
      tasks = [...tasks].sort((a, b) => b.spotsLeft - a.spotsLeft);
    }
    return tasks;
  }, [selectedTypes, selectedLocation, sortBy]);

  const subtext = selectedLocation ? `${LGA} · ${selectedLocation}` : LGA;

  return (
    <div className={styles.page}>
      <Navbar activePage="find-tasks" />

      <div className={styles.main}>
        {/* ── Sidebar ── */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarSection}>
            <h3 className={styles.sidebarHeading}>Task Type</h3>
            <div className={styles.checkboxList}>
              {TASK_TYPES.map((type) => (
                <label key={type} className={styles.checkboxItem}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={selectedTypes.includes(type)}
                    onChange={() => toggleType(type)}
                  />
                  <span className={styles.checkLabel}>{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.sidebarSection}>
            <h3 className={styles.sidebarHeading}>Location</h3>
            <p className={styles.lgaLabel}>{LGA}</p>
            <div className={styles.locationPills}>
              {LOCATIONS.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  className={`${styles.pill} ${selectedLocation === loc ? styles.pillSelected : ''}`}
                  onClick={() => toggleLocation(loc)}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ── Task list ── */}
        <main className={styles.content}>
          <div className={styles.contentHeader}>
            <div>
              <h1 className={styles.heading}>Available tasks near you</h1>
              <p className={styles.subtext}>{subtext}</p>
            </div>
            <div className={styles.sortWrap}>
              <span className={styles.sortLabel}>Sort by</span>
              <select
                className={styles.sortSelect}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="latest">Latest</option>
                <option value="pay-high">Highest Pay</option>
                <option value="spots">Most Spots</option>
              </select>
            </div>
          </div>

          <div className={styles.taskList}>
            {filtered.length > 0 ? (
              filtered.map((task) => <TaskCard key={task.id} task={task} />)
            ) : (
              <p className={styles.empty}>No tasks match your filters. Try adjusting them.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
