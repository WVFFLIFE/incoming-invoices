import { enGB, fi } from 'date-fns/locale';
import {
  startOfWeek,
  format,
  addDays,
} from 'date-fns';

function getLocale() {
  /* eslint-disable */
  return top?.window?.USER_LANGUAGE_CODE === 1035
    ? fi
    : enGB;
  /* eslint-enable  */
}

export const getShortWeeks = () => {
  const locale = getLocale();
  const firstDOW = startOfWeek(new Date(), { weekStartsOn: 1 });

  return Array.from(Array(7)).map((e, i) => format(addDays(firstDOW, i), 'EEEEEE', { locale }))
}

export const getMonthsList = () => {
  const months = [];
  const locale = getLocale();

  for (let i = 0; i < 12; i++) {
    months.push(locale.localize.month(i, { width: 'wide' }));
  }

  return months;
}

export const getYearsList = (from, to) => {
  const list = [];

  for (let i = from; i <= to; i++) {
    list.push(i);
  }

  return list;
}

export const localeFormat = (date, f) => {
  return format(date, f, { locale: getLocale() })
}