import { useMemo } from "react";
import { getHoursArray } from "../../../core";
import { Item } from "../../../types/item";
import styles from "./styles.module.css";
import WeekHourCell from "../WeekHourCell";

type Props = {
  items: Item[];
};

export default function WeekHours({ items }: Props) {
  const hoursArray = useMemo(() => getHoursArray(), []);

  return (
    <div className={styles.container}>
      {hoursArray.map((hour) => {
        const itemsList = items?.filter((i) => {
          const hourText = new Date(i.date)
            .getHours()
            .toString()
            .padStart(2, "0");

          return hour.split(":")[0] === hourText;
        });

        return <WeekHourCell key={hour} hour={hour} items={itemsList} />;
      })}
    </div>
  );
}
