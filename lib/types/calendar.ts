export type CalendarDate = [string, string, string];

export type MonthDay = {
  day: number;
  month: number;
  year: number;
  inMonth?: boolean;
  selected: boolean;
};
