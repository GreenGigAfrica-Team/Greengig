import styles from './TaskCard.module.css';

export interface Task {
  id: number;
  title: string;
  location: string;
  date: string;
  time: string;
  type: string;
  org: string;
  spotsLeft: number;
  pay: number;
  icon: string;
  neighborhood: string;
}

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.cardLeft}>
        <div className={styles.iconWrap}>
          <img src={task.icon} alt={task.type} className={styles.iconImg} />
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>{task.title}</h3>
          <p className={styles.meta}>
            {task.location}&nbsp;&bull;&nbsp;{task.date}&nbsp;&bull;&nbsp;{task.time}
          </p>
          <div className={styles.tags}>
            <span className={styles.typeTag}>{task.type}</span>
            <span className={styles.orgTag}>{task.org}</span>
          </div>
        </div>
      </div>
      <div className={styles.cardRight}>
        <span className={styles.spotsBadge}>{task.spotsLeft} spots left</span>
        <span className={styles.pay}>₦{task.pay.toLocaleString()}</span>
      </div>
    </div>
  );
}
