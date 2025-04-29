import { CalendarDate } from "../types/calendar";
import { Locale, Months, WeekDays, WeekDaysArray } from "../types/locales";

const CALENDAR_WEEKS = 6;

/**
 * Returns a WeekDays object from the given Locale with week days in short format.
 *
 * @param locale - The Locale from which to get the short week days.
 * @returns A WeekDays object with short week days.
 */
export function getWeekDaysShort(locale: Locale): WeekDays {
  return locale.weekDaysShort;
}

/**
 * Returns an array of objects containing the short and long names of week days
 * based on the provided Locale.
 *
 * Each object in the array has:
 * - `short`: the short name of the week day.
 * - `long`: the full name of the week day.
 *
 * @param locale - The Locale from which to derive week days.
 * @returns An array of objects with short and long week day names.
 */

export function getWeekDaysArray(locale: Locale): WeekDaysArray {
  return Object.keys(locale.weekDays).map((key) => {
    return {
      short: locale.weekDaysShort[key as keyof WeekDays],
      long: locale.weekDays[key as keyof WeekDays],
    };
  });
}

/**
 * Returns a Months object from the given Locale with month names in short format.
 *
 * @param locale - The Locale from which to get the short month names.
 * @returns A Months object with short month names.
 */
export function getMonthsShort(locale: Locale): Months {
  return locale.monthsShort;
}

/**
 * Gets the current year.
 *
 * @returns The current year as a number.
 */
export function getCurrentYear() {
  return new Date().getFullYear();
}

/**
 * Gets the current month.
 *
 * @returns The current month as a number, where 1 is January and 12 is December.
 */
export function getCurrentMonth() {
  return new Date().getMonth() + 1;
}

/**
 * Gets the number of days in a given month.
 *
 * @param month - The month for which to get the number of days, where 1 is January and 12 is December.
 * @param year - The year to consider for the month (in case of February).
 * @returns The number of days in the given month.
 */
export function getMonthDays(
  month = getCurrentMonth(),
  year = getCurrentYear()
) {
  const months30 = [4, 6, 9, 11];
  const leapYear = year % 4 === 0;
  return month === 2
    ? leapYear
      ? 29
      : 28
    : months30.includes(month)
    ? 30
    : 31;
}

/**
 * Gets an array of strings with hours from 00:00 to 23:00.
 *
 * @returns An array of strings with hours from 00:00 to 23:00.
 */
export function getHoursArray() {
  const hoursArray: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    const formattedHour = hour.toString().padStart(2, "0");
    hoursArray.push(`${formattedHour}:00`);
  }
  return hoursArray;
}

/**
 * Returns the month and year preceding the given month and year.
 *
 * @param month - The current month as a number, where 1 is January and 12 is December.
 * @param year - The current year as a number.
 * @returns An object containing the previous month and year.
 *
 * @example
 * getPreviousMonth(1, 2000); // returns { month: 12, year: 1999 }
 * getPreviousMonth(12, 2000); // returns { month: 11, year: 2000 }
 */

export const getPreviousMonth = (month: number, year: number) => {
  const prevMonth = month > 1 ? month - 1 : 12;
  const prevMonthYear = month > 1 ? year : year - 1;
  return { month: prevMonth, year: prevMonthYear };
};

/**
 * Returns the month and year following the given month and year.
 *
 * @param month - The current month as a number, where 1 is January and 12 is December.
 * @param year - The current year as a number.
 * @returns An object containing the next month and year.
 *
 * @example
 * getNextMonth(1, 2000); // returns { month: 2, year: 2000 }
 * getNextMonth(12, 2000); // returns { month: 1, year: 2001 }
 */
export function getNextMonth(month: number, year: number) {
  const nextMonth = month < 12 ? month + 1 : 1;
  const nextMonthYear = month < 12 ? year : year + 1;
  return { month: nextMonth, year: nextMonthYear };
}

export function zeroPad(value: number, length: number = 2) {
  return `${value}`.padStart(length, "0");
}

export function getMonthFirstDay(
  month = getCurrentMonth(),
  year = getCurrentYear()
) {
  return +new Date(`${year}-${zeroPad(month, 2)}-01`).getDay() + 2;
}

/**
 * Calendar builder for a month in the specified year
 * Returns an array of the calendar dates.
 * Each calendar date is represented as an array => [YYYY, MM, DD]
 *
 * @param month - The month for which to build the calendar, where 1 is January and 12 is December.
 * @param year - The year for which to build the calendar.
 * @returns An array of calendar dates.
 */
export function calendar(month = getCurrentMonth(), year = getCurrentYear()) {
  // Get number of days in the month and the month's first day
  const monthDays = getMonthDays(month, year);
  const monthFirstDay = getMonthFirstDay(month, year);

  // Get number of days to be displayed from previous and next months
  // These ensure a total of 42 days (6 weeks) displayed on the calendar
  const daysFromPrevMonth = monthFirstDay - 1;
  const daysFromNextMonth =
    CALENDAR_WEEKS * 7 - (daysFromPrevMonth + monthDays);

  // Get the previous and next months and years
  const { month: prevMonth, year: prevMonthYear } = getPreviousMonth(
    month,
    year
  );
  const { month: nextMonth, year: nextMonthYear } = getNextMonth(month, year);

  // Get number of days in previous month
  const prevMonthDays = getMonthDays(prevMonth, prevMonthYear);

  // Builds dates to be displayed from previous month
  const prevMonthDates: CalendarDate[] = [...new Array(daysFromPrevMonth)].map(
    (_, index) => {
      const day = index + 1 + (prevMonthDays - daysFromPrevMonth);
      return [prevMonthYear.toString(), zeroPad(prevMonth, 2), zeroPad(day, 2)];
    }
  );

  // Builds dates to be displayed from current month
  const thisMonthDates: CalendarDate[] = [...new Array(monthDays)].map(
    (_, index) => {
      const day = index + 1;
      return [year.toString(), zeroPad(month, 2), zeroPad(day, 2)];
    }
  );

  // Builds dates to be displayed from next month
  const nextMonthDates: CalendarDate[] = [...new Array(daysFromNextMonth)].map(
    (_, index) => {
      const day = index + 1;
      return [nextMonthYear.toString(), zeroPad(nextMonth, 2), zeroPad(day, 2)];
    }
  );

  // Combines all dates from previous, current and next months
  return [...prevMonthDates, ...thisMonthDates, ...nextMonthDates];
}

/**
 * Calculates the week number of a given date.
 *
 * @param date - The date for which to calculate the week number.
 * @returns The week number of the given date in the year.
 *
 * @example
 * getWeekNumber(new Date('2023-01-01')); // returns 1
 * getWeekNumber(new Date('2023-12-31')); // returns 53
 */

export function getWeekNumber(date: Date) {
  const onejan = new Date(date.getFullYear(), 0, 1);
  const numberOfDays = Math.floor(
    (date.getTime() - onejan.getTime()) / (24 * 60 * 60 * 1000)
  );
  const result = Math.ceil((numberOfDays + onejan.getDay() + 1) / 7);
  return result;
}

/**
 * Converts a CalendarDate object to a JavaScript Date object.
 *
 * @param date - The CalendarDate to convert, represented as an array of strings
 * with the format [YYYY, MM, DD].
 * @returns A JavaScript Date object corresponding to the given CalendarDate,
 * with the time set to midnight (00:00:00.000).
 */

export function calendarDateToDate(date: CalendarDate) {
  return new Date(
    Number(date[0]),
    Number(date[1]) - 1, // month is 0-based
    Number(date[2]),
    0,
    0,
    0,
    0 // hour, min, sec, ms
  );
}

/**
 * Determines if the given date is in the same month and year as the base date.
 *
 * @param date - The date to compare.
 * @param basedate - The base date to compare against, defaults to the current date.
 * @returns True if the month and year of both dates are the same, false otherwise.
 */

export function isSameMonth(date: Date, basedate = new Date()) {
  const basedateDate = basedate.getDate();
  const basedateMonth = +basedate.getMonth() + 1;
  const basedateYear = basedate.getFullYear();
  const dateDate = date.getDate();
  const dateMonth = +date.getMonth() + 1;
  const dateYear = date.getFullYear();
  return (
    +basedateDate === +dateDate &&
    +basedateMonth === +dateMonth &&
    +basedateYear === +dateYear
  );
}

/**
 * Determines if the given date is in the same day as the base date.
 *
 * @param date - The date to compare.
 * @param basedate - The base date to compare against, defaults to the current date.
 * @returns True if the day, month and year of both dates are the same, false otherwise.
 */
export function isSameDay(date: Date, basedate = new Date()) {
  const basedateDate = basedate.getDate();
  const basedateMonth = +basedate.getMonth() + 1;
  const basedateYear = basedate.getFullYear();
  const dateDate = date.getDate();
  const dateMonth = +date.getMonth() + 1;
  const dateYear = date.getFullYear();
  return (
    +basedateDate === +dateDate &&
    +basedateMonth === +dateMonth &&
    +basedateYear === +dateYear
  );
}