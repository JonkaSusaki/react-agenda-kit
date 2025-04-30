import "./styles.css";
export { default as WeekView } from "./components/Week/WeekView";
export { default as MonthView } from "./components/Month/MonthView";

export { getAgendaKitConfig, setAgendaKitConfig } from "./config";

export type { Item } from "./types/item";
export type { WeekDays, Locale, Months, WeekDaysArray } from "./types/locales";

export { pt } from "./locales/pt";
export { en } from "./locales/en";
