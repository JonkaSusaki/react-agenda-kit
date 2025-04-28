import { useMemo } from "react";
import { calendar, calendarDateToDate, getWeekNumber } from "../../../core";
import styles from "./styles.module.css";
import WeekDay from "../WeekDay";
import WeekHours from "../WeekHours";
import { Item } from "../../../types/item";

type Props = {
  currentDate: Date;
  items: Item[];
};

export default function WeekView({ currentDate, items }: Props) {
  const renderedWeekDays = useMemo(() => {
    const weekDays: Date[] = [];
    const calendarResult = calendar(
      currentDate.getMonth() + 1,
      currentDate.getFullYear()
    );

    calendarResult.forEach((day) => {
      const dayDate = calendarDateToDate(day);
      if (getWeekNumber(dayDate) === getWeekNumber(currentDate)) {
        weekDays.push(dayDate);
      }
    });

    return weekDays;
  }, [currentDate]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {renderedWeekDays.map((day) => (
          <WeekDay currentDate={currentDate} date={day} key={day.toString()} />
        ))}
      </div>
      <WeekHours items={items} />
    </div>
  );
}
