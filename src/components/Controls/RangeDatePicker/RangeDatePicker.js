import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import format from 'date-fns/format';

import Wrapper from './Wrapper';
import Dropdown from 'components/Dropdown';
import ArrowIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import { DefaultCalendarIcon } from 'components/Icons';
import { IconButton } from 'components/StyledComponents';

import clsx from 'clsx';
import { useStyles } from './style';

const RangeDatePicker = ({
  from,
  to,
  pattern = 'd.M.yyyy',
  disabled,
  onChange,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState(null);

  const onOpen = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const onClose = () => {
    setAnchorEl(null);
  }

  const open = !!anchorEl;

  return (
    <>
      <div 
        className={clsx(classes.root, {
          [classes.disabled]: disabled
        })}
        onClick={disabled ? undefined : onOpen}
      >
        <Box display="flex" alignItems="center">
          <DefaultCalendarIcon className={classes.calendarIcon} />
          <span className={clsx(classes.text, {
            [classes.placeholder]: !from && !to
          })}>
            {
              from && to ? (
                <>
                  {format(from, pattern)}
                  {' '}
                  {'-'}
                  {' '}
                  {format(to, pattern)}
                </>
              )
                : from
                  ? format(from, pattern)
                  : to
                    ? format(to, from)
                    : `- ${t("#datepicker.empty")} -`
            }
          </span>
        </Box>
        <IconButton disabled={disabled}>
          <ArrowIcon className={classes.arrowIcon} />
        </IconButton>
      </div>
      <Dropdown
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
      >
        <Wrapper 
          from={from}
          to={to}
          onChange={onChange}
          onClose={onClose}
        />
      </Dropdown>
    </>
  )
}

export default RangeDatePicker;