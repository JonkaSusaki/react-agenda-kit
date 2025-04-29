import { MonthDay } from "../../../types/calendar";
import { Item } from "../../../types/item";
import styles from "./styles.module.css";
import { zeroPad } from "../../../core";

type Props = {
  weekDay: string | undefined;
  cell: MonthDay;
  items: Item[];
};

export default function MonthCell({ weekDay, cell, items }: Props) {
  return (
    <div className={styles.container}>
      <span className={styles.weekDay}>{weekDay}</span>
      <div
        className={`${styles.cellDay} ${cell.selected ? styles.selected : ""}`}
      >
        {/* {cell.day} */}
        {zeroPad(cell.day, 2)}
      </div>
      <div className={styles.content}>
        {items
          .filter((_, index) => index < 3) // Para aparecer somentne 3 por dia
          .map((item) => {
            return <div className={styles.item}>{item.title}</div>;
          })}
      </div>
    </div>
  );
}
