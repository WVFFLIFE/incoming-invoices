import { CooperativeModel } from 'models';
import { useState, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { getCooperativesOptions } from 'selectors';
import { selectReportCooperative } from 'actions/reportActions';

import services from 'services/InternalAPI';

import {
  ControlsBar, FlexWrapper
} from 'components';
import {
  PrintIcon,
  DownloadIcon,
} from 'components/Icons';
import Button from 'components/Button';
import CoooperativePicker from 'components/CooperativePicker';
import DatePicker from 'components/Controls/DatePicker';
import Box from '@material-ui/core/Box';
import FiltersBar from 'components/FiltersBar';

import { useStyles } from './style';

const filtersList = [
  { id: 'all', label: '#filter.allinvoices' },
  { id: 'pending', label: '#filter.pending' },
  { id: 'paid', label: '#filter.paid' },
  { id: 'rejected', label: '#filter.rejected' },
  { id: 'unpaid', label: '#filter.unpaid' }
];

const Report = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { selectedCooperative, cooperatives } = useSelector((state: any) => ({
    cooperatives: (getCooperativesOptions(state) as any),
    selectedCooperative: state.report.selectedCooperative
  }));

  const [dateFilter, setDateFilter] = useState<Date | null>(null);
  const [quickFilter, setQuickFilter] = useState('all');

  const handleChangeDateFilter = useCallback(
    (date: Date | null) => {
      setDateFilter(date);
    },
    []
  )

  const handleSelectCooperative = (coop: CooperativeModel) => {
    dispatch(selectReportCooperative(coop));
  }

  const handleChangeQuickFilter = useCallback(
    (filter: string) => {
      setQuickFilter(filter)
    },
    []
  )

  console.log(selectedCooperative, cooperatives);

  return (
    <>
      <FlexWrapper className="mb-20">
        <h1 className="tab-title">
          {t('#tab.title.report')}
        </h1>
        <Box
          display="flex"
          alignItems="center"
        >
          <Button
            className={classes.printBtn}
            label="Print PDF"
            icon={PrintIcon}
            onClick={() => { }}
          />
          <Button
            className={classes.loadBtn}
            label="Load PDF"
            icon={DownloadIcon}
            onClick={() => { }}
          />
        </Box>
      </FlexWrapper>
      <ControlsBar>
        <FlexWrapper>
          <Box marginRight="20px">
            <CoooperativePicker
              cooperatives={cooperatives}
              selectedCooperative={selectedCooperative}
              handleChangeCooperative={handleSelectCooperative}
            />
          </Box>
          <Box marginRight="20px">
            <DatePicker
              currentDate={dateFilter}
              onChange={handleChangeDateFilter}
            />
          </Box>
          <Box>
            <FiltersBar 
              activeFilter={quickFilter}
              filtersList={filtersList}
              handleChangeFilter={handleChangeQuickFilter}
            />
          </Box>
        </FlexWrapper>
      </ControlsBar>
    </>
  )
}

export default Report;