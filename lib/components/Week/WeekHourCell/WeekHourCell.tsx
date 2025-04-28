import { getWeekDaysArray } from "../../../core";
import { pt } from "../../../locales/pt";
import { Item } from "../../../types/item";
import styles from "./styles.module.css";

type Props = {
  hour: string;
  items: Item[];
};
const weekDays = getWeekDaysArray(pt);

export default function WeekHourCell({ hour, items }: Props) {
  return (
    <div className={styles.container}>
      <span className={styles.hourText}>{hour}</span>

      <div className={styles.hourLine}>
        {weekDays.map((d, weekDayIndex) => {
          const itemList = items?.filter((i) => {
            const weekDay = new Date(i.date).getDay();

            return weekDay === weekDayIndex;
          });

          return (
            <div key={"hour-" + d} className={styles.cell}>
              {itemList.map((i) => {
                const nowMinutes = new Date(i.date).getMinutes();
                const nowHourText = new Date(i.date)
                  .getHours()
                  .toString()
                  .padStart(2, "0");
                const nowMinutesText = nowMinutes.toString().padStart(2, "0");

                return (
                  <div key={i.title} className={styles.item}>
                    {`${nowHourText}:${nowMinutesText}`} - {i.title}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <span className={styles.hourText}>{hour}</span>
    </div>
  );
}
