import { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import TaskCard, { type Task } from '../components/TaskCard';
import styles from './FindTasks.module.css';

const TASK_TYPES = ['Waste Collection', 'Tree Planting', 'Recycling', 'Urban Farming', 'Climate Data'];
const LGA = 'Alimosho LGA';
const LOCATIONS = ['Ikotun', 'Iyana-Ipaja', 'Egbeda', 'Ayoba', 'Alagbado'];

const ICON: Record<string, string> = {
  'Waste Collection': '🗑️',
  'Tree Planting': '🌳',
  'Recycling': '♻️',
  'Urban Farming': '🌾',
  'Climate Data': '📊',
};

const ALL_TASKS: Task[] = [
  {
    id: 1,
    title: 'Community Waste Collection',
    location: 'Iyana-Ipaja Market',
    date: 'May 6, 2026',
    time: '8:00am – 12:00pm',
    type: 'Waste Collection',
    org: 'LAWMA',
    spotsLeft: 2,
    pay: 2500,
    icon: ICON['Waste Collection'],
    neighborhood: 'Iyana-Ipaja',
  },
  {
    id: 2,
    title: 'Neighbourhood Recycling Collection',
    location: 'Aboru Residential Area Iyana-Ipaja',
    date: 'May 13, 2026',
    time: '9:00am – 1:00pm',
    type: 'Recycling',
    org: 'RecyclePoints',
    spotsLeft: 3,
    pay: 3500,
    icon: ICON['Recycling'],
    neighborhood: 'Iyana-Ipaja',
  },
  {
    id: 3,
    title: 'Community Street Cleanup',
    location: 'Aboru, Iyana-Ipaja',
    date: 'May 10, 2026',
    time: '8:00am – 11:00am',
    type: 'Waste Collection',
    org: 'LAWMA',
    spotsLeft: 7,
    pay: 3000,
    icon: ICON['Waste Collection'],
    neighborhood: 'Iyana-Ipaja',
  },
  {
    id: 4,
    title: 'Tree Planting Exercise',
    location: 'Baruwa, Iyana-Ipaja',
    date: 'May 11, 2026',
    time: '7:30am – 10:30am',
    type: 'Tree Planting',
    org: 'LASPARK',
    spotsLeft: 4,
    pay: 3000,
    icon: ICON['Tree Planting'],
    neighborhood: 'Iyana-Ipaja',
  },
  {
    id: 5,
    title: 'Urban Farming Setup – Backyard Garden',
    location: 'Alaguntan, Iyana-Ipaja',
    date: 'May 14, 2026',
    time: '8:00am – 12:00pm',
    type: 'Urban Farming',
    org: 'FYBOI',
    spotsLeft: 4,
    pay: 4000,
    icon: ICON['Urban Farming'],
    neighborhood: 'Iyana-Ipaja',
  },
  {
    id: 6,
    title: 'Climate Data Collection Drive',
    location: 'Ikotun Community Centre',
    date: 'May 15, 2026',
    time: '9:00am – 3:00pm',
    type: 'Climate Data',
    org: 'GreenWatch',
    spotsLeft: 5,
    pay: 3500,
    icon: ICON['Climate Data'],
    neighborhood: 'Ikotun',
  },
  {
    id: 7,
    title: 'Estate Recycling Collection',
    location: 'Egbeda Housing Estate',
    date: 'May 9, 2026',
    time: '8:00am – 12:00pm',
    type: 'Recycling',
    org: 'RecyclePoints',
    spotsLeft: 6,
    pay: 2800,
    icon: ICON['Recycling'],
    neighborhood: 'Egbeda',
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
    // 'latest' keeps the original insertion order
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
