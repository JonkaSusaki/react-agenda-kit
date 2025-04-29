import { useMemo } from "react";
import {
  calendar,
  getWeekDaysArray,
  isSameDay,
  isSameMonth,
} from "../../../core";
import styles from "./styles.module.css";
import MonthCell from "../MonthCell";
import { pt } from "../../../locales/pt";
import { Item } from "../../../types/item";

type Props = {
  currentDate: Date;
  items: Item[];
};

const weekDaysArray = getWeekDaysArray(pt);

export default function MonthView({ currentDate, items }: Props) {
  const renderedCells = useMemo(() => {
    const days = calendar(
      currentDate.getMonth() + 1,
      currentDate.getFullYear()
    );

    return days.map((day) => {
      const _date = new Date(
        parseInt(day[0]),
        parseInt(day[1]) - 1,
        parseInt(day[2])
      );

      const shownDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        parseInt(day[2] as string)
      );

      const selected = _date.getDate() === currentDate.getDate();
      return {
        day: parseInt(day[2]),
        month: _date.getMonth() + 1,
        inMonth: isSameMonth(_date, shownDate),
        year: _date.getFullYear(),
        selected,
      };
    });
  }, [currentDate]);

  return (
    <div className={styles.container}>
      {renderedCells.map((cell, index) => (
        <MonthCell
          cell={cell}
          weekDay={index < 7 ? weekDaysArray[index].short : ""}
          items={items.filter((item) => {
            return isSameDay(
              item.date,
              new Date(cell.year as number, cell.month - 1, cell.day)
            );
          })}
        />
      ))}
    </div>
  );
}
