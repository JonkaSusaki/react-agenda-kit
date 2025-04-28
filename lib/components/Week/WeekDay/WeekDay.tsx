import { useMemo } from "react";
import styles from "./styles.module.css";
import { getWeekDaysArray, zeroPad } from "../../../core";
import { pt } from "../../../locales/pt";
type Props = {
  date: Date;
  currentDate: Date;
};

const weekDays = getWeekDaysArray(pt);

export default function WeekDay({ date, currentDate }: Props) {
  const selected = useMemo(() => {
    return date.getDate() === currentDate.getDate();
  }, [currentDate, date]);

  return (
    <div className={styles.container}>
      <div
        className={`${styles.content} ${
          selected ? styles.contentSelected : ""
        }`}
      >
        <span className={`${styles.name} ${selected ? styles.selected : ""}`}>
          {weekDays[date.getDay()].short}
        </span>
        <div>
          <span className={`${styles.day} ${selected ? styles.selected : ""}`}>
            {zeroPad(date.getDate(), 2)}
          </span>
        </div>
      </div>
    </div>
  );
}
