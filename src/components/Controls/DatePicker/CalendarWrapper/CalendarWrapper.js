import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Calendar from '../Calendar';
import Box from '@material-ui/core/Box';
import { CancelButton, ApplyButton } from 'components/StyledComponents';

import { useStyles } from './style';

const CalendarWrapper = ({
  currentDate,
  onChange,
  onClose,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [selectedDate, setSelectedDate] = useState(() => currentDate);

  const handleChangeDate = (date) => {
    setSelectedDate(date)
  }

  const handleApply = () => {
    onChange(selectedDate);
    onClose();
  }

  return (
    <div className={classes.root}>
      <Calendar 
        selectedDate={selectedDate}
        handleChangeDate={handleChangeDate}
      />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        marginTop="20px"
      >
        <CancelButton className={classes.mr20} onClick={onClose}>
          {t('#button.cancel')}
        </CancelButton>
        <ApplyButton onClick={handleApply}>
          {t('#button.apply')}
        </ApplyButton>
      </Box>
    </div>
  )
}

export default CalendarWrapper;