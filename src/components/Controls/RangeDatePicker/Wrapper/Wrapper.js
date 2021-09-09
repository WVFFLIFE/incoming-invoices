import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { initTime } from 'helpers';

import {
  isAfter,
  isBefore,
  startOfYear,
  endOfYear,
  subYears,
  startOfMonth,
  endOfMonth,
  subMonths,
} from 'date-fns';

import Box from '@material-ui/core/Box';
import Calendar from '../../DatePicker/Calendar';
import { CalendarArrow } from 'components/Icons';
import { CancelButton, ApplyButton } from 'components/StyledComponents';

import clsx from 'clsx';
import { useStyles } from './style';

const quickFilters = [
  { id: 'custom', label: '#datepicker.filter.customrange' },
  { id: 'prevyear', label: '#datepicker.filter.previousyear' },
  { id: 'currentyear', label: '#datepicker.filter.currentyear' },
  { id: 'lastmonth', label: '#datepicker.filter.lastmonth' }
];

const Wrapper = ({
  from,
  to,
  onChange,
  onClose,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [range, setRange] = useState(() => ({
    from: from && initTime(from),
    to: to && initTime(to)
  }));
  const [quickFilter, setQuickFilter] = useState('custom');

  useEffect(() => {
    if (quickFilter === 'custom') {
      setRange({
        from: from && initTime(from),
        to: to && initTime(to)
      });
      return;
    }

    if (quickFilter === 'prevyear') {
      const d = subYears(new Date(), 1);
      setRange({
        from: startOfYear(d),
        to: endOfYear(d)
      });
      return;
    }

    if (quickFilter === 'currentyear') {
      setRange({
        from: startOfYear(new Date()),
        to: endOfYear(new Date())
      });
      return;
    }

    if (quickFilter === 'lastmonth') {
      const d = subMonths(new Date(), 1);
      setRange({
        from: startOfMonth(d),
        to: endOfMonth(d)
      });
      return;
    }
  }, [quickFilter, from, to]);

  const handleChangeQuickFilter = (id) => {
    setQuickFilter(id);
  }

  const handleChangeStartDate = useCallback((d) => {
    let from = null,
      to = null;

    if (d && range.to) {
      from = d;

      if (isAfter(d, range.to)) {
        to = d;
      }

      setRange({ from, to: to || range.to });
      return;
    }

    if (!d) {
      to = null;
    }

    setRange({ from: d || null, to });
  }, [range.to])

  const handleChangeEndDate = useCallback(
    (d) => {
      let from = null,
        to = null;

      if (d && range.from) {
        to = d;

        if (isBefore(d, range.from)) {
          from = d;
        }

        setRange({ from: from || range.from, to });

        return;
      }

      setRange(prevState => ({
        ...prevState,
        to: d || null
      }));
    }, [range.from]);

  const onApply = () => {
    onChange(range);
    onClose();
  }

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <div className={classes.tabsWrapper}>
          {
            quickFilters.map(option => {
              const isActive = option.id === quickFilter;

              return (
                <div 
                  className={clsx(classes.tab, {
                    [classes.activeTab]: isActive
                  })} 
                  key={option.id}
                  onClick={() => handleChangeQuickFilter(option.id)}
                >
                  {t(option.label)}
                </div>
              )
            })
          }
        </div>
        <div className={classes.box}>
          <span className={classes.tip}>
            {t('#date.from')}
          </span>
          <Calendar
            selectedDate={range.from}
            limitDate={range.to}
            handleChangeDate={handleChangeStartDate}
            dateInput={true}
          />
        </div>
        <Box padding="0 15px" paddingTop="48px">
          <CalendarArrow className={classes.accessory} />
        </Box>
        <div className={classes.box}>
          <span className={classes.tip}>
            {t('#date.to')}
          </span>
          <Calendar
            selectedDate={range.to}
            limitDate={range.from}
            disabled={!!!range.from}
            handleChangeDate={handleChangeEndDate}
            dateInput={true}
          />
        </div>
      </div>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        marginTop="20px"
      >
        <CancelButton onClick={onClose}>
          {t('#button.cancel')}
        </CancelButton>
        <ApplyButton className={classes.applyBtn} onClick={onApply}>
          {t('#button.apply')}
        </ApplyButton>
      </Box>
    </div>
  )
}

export default Wrapper;
