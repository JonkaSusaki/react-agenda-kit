export type WeekDays = {
  Sunday: string;
  Monday: string;
  Tuesday: string;
  Wednesday: string;
  Thursday: string;
  Friday: string;
  Saturday: string;
};

export type Months = {
  January: string;
  February: string;
  March: string;
  April: string;
  May: string;
  June: string;
  July: string;
  August: string;
  September: string;
  October: string;
  November: string;
  December: string;
};

export type WeekDaysArray = { short: string; long: string }[];

export type Locale = {
  weekDays: WeekDays;
  weekDaysShort: WeekDays;
  months: Months;
  monthsShort: Months;
};
