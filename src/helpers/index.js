import { enGB, fi } from 'date-fns/locale';
import {
  startOfWeek,
  addDays,
  format,
  isToday,
  isAfter,
  isTomorrow,
  isEqual,
  set,
  getDate,
  getMonth,
  getYear,
} from 'date-fns';
import { 
  find, 
  get, 
  toLower
} from 'lodash';

export function getPDFLang() {
  /* eslint-disable */
  return top?.window?.USER_LANGUAGE_CODE === 1035
    ? 'fi'
    : 'en-US';
}

function getLocale() {
  /* eslint-disable */
  return top?.window?.USER_LANGUAGE_CODE === 1035
    ? fi
    : enGB;
  /* eslint-enable  */
}

export const DEFAULT_DATE_FORMAT = 'd.M.yyyy';

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

export const defaultFormat = (d) => {
  if (!d) return null;
  let date = new Date(d);
  if (!isValidDate(date)) return null;

  return format(new Date(d), DEFAULT_DATE_FORMAT);
}

export const localeFormat = (date, f) => {
  return format(date, f, { locale: getLocale() })
}

export const getMonthsList = () => {
  const months = [];
  const locale = getLocale();

  for (let i = 0; i < 12; i++) {
    months.push(locale.localize.month(i, { width: 'wide' }));
  }

  return months;
}

export const getShortWeeks = () => {
  const locale = getLocale();
  const firstDOW = startOfWeek(new Date(), { weekStartsOn: 1 });

  return Array.from(Array(7)).map((e, i) => format(addDays(firstDOW, i), 'EEEEEE', { locale }))
}

export const getYearsList = (from, to) => {
  const list = [];

  for (let i = from; i <= to; i++) {
    list.push(i);
  }

  return list;
}

export const orderByType = (data, type) => {
  switch (type) {
    case 'float':
      return typeof data === 'number' ? parseFloat(data) : -Infinity
    case 'date':
      return data ? new Date(data).getTime() : -Infinity
    case 'boolean':
      return data ? 1 : 0;
    default:
      return data
  }
}

const numberToSearchFormat = (num) => {
  return num.toFixed(2).replace('.', ',');
}

export const searchByType = (data, type, comparator, extractKey) => {
  switch (type) {
    case 'float':
      return typeof data === 'number' ? numberToSearchFormat(data) : ''
    case 'string':
      return data ? data.toLowerCase() : ''
    case 'date':
      return formatDate(data)
    case 'array':
      return data
        ? toLower(
          get(
            find(data, { Id: comparator }),
            extractKey
          )
        )
        : ''
    default:
      return data
  }
}

export const isBalanceInadequate = cooperative => {
  if (!cooperative) return true;
  if (cooperative.UrgentBalance === 0) {
    return false;
  }

  if (typeof cooperative.AllowedBalance === 'number') {
    return cooperative.AllowedBalance < cooperative.UrgentBalance
  }

  if (typeof cooperative.Balance === 'number') {
    return cooperative.Balance < cooperative.UrgentBalance
  }

  return false;
}

export const isRejectedInvoice = invoice => {
  return [
    752560001,
    100000004,
    752560000
  ].includes(invoice.InvoiceStatus.Value);
}
export const isPaidInvoice = invoice =>
  invoice.InvoiceStatus?.Value === 100000003;
export const isPendingInvoice = invoice =>
  invoice.InvoiceStatus?.Value === 100000001;
export const isUnpaidInvoice = invoice =>
  invoice.InvoiceStatus?.Value === 100000000;

export const formatDate = (date, formatType = 'd.M.yyyy') => {
  if (!date) {
    return null;
  }

  return format(new Date(date), formatType)
}

export const isOverdue = (currentDate, comparedDate) => {
  return isAfter(currentDate, comparedDate) && !isToday(comparedDate)
}

export const isOverdueSoon = (date) => {
  return isToday(date) || isTomorrow(date)
}

export const isUrgentDate = (currentDate, comparedDate) => {
  return isToday(comparedDate) || isAfter(currentDate, comparedDate)
}

export const findBankAccount = (target, list) => {
  return find(list, { Id: target })
}

export const isAbleToPay = (invoice) => {
  const bankAccount = findBankAccount(invoice.BuyerBankAccountId, invoice.BankAccounts);

  if (!bankAccount) return false;

  return bankAccount.AllowedBalance
    ? invoice.Amount < bankAccount.AllowedBalance
    : invoice.Amount < bankAccount.Balance;
}

export const initTime = (date) => {
  return set(date, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })
}

export const isDisabledDate = (date, comparedDate) => {
  if (!comparedDate || !date) {
    return false;
  }

  let d1 = initTime(comparedDate);
  let d2 = initTime(date);

  return isAfter(d1, d2) || isEqual(d1, d2);
}

export const setRelatedCooperative = (invoices, cooperatives) => {
  return invoices.map(invoice => {
    const RelatedCooperative = get(cooperatives, invoice.Payer.Id) || null;

    return {
      ...invoice,
      RelatedCooperative
    }
  })
}

export const toDateResponse = date => {
  const day = getDate(date);
  const month = String(getMonth(date) + 1).padStart(2, '0');
  const year = getYear(date);

  return `${year}-${month}-${day}T00:00:00`;
}

export const formatNum = (num) => {
  if (typeof num !== 'number') return null;
  return num
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    .replace('.', ',');
}

function toDivide(num) {
	let int = String(Math.trunc(num));

	if(int.length <= 3) return int;

	let space = 0;
	let number = '';

	for(let i = int.length - 1; i >= 0; i--) {
		if(space === 3) {
			number = ' ' + number;
			space = 0;
		}
		number = int.charAt(i) + number;
		space++;
	}

	return number;
}

function mergeNumberRanks(num) {
	let [a, b] = num.split(',');
  
  if (b === undefined) {
  	return toDivide(a);
  }
  
  if (b === '') {
  	return `${toDivide(a)},`
  }
  
  return `${toDivide(a)},${b}`;
}

export const getText = searchTerm => {
  return (text, type = 'string') => {
    let s = type === 'number' && searchTerm
      ? mergeNumberRanks(searchTerm)
      : searchTerm;

    let index = toLower(text).indexOf(toLower(s));
    if (!s || index === -1) {
      return text
    }
  
    let substr = text.substr(index, s.length);
  
    return (
      <>
        {text.slice(0, index)}
        <span className="emphasized">{substr}</span>
        {text.slice(index + substr.length)}
      </>
    )
  }
}

export const floatify = (num) => parseFloat((num).toFixed(10));