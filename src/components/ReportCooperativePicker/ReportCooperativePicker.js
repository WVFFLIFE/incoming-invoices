import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { formatNum } from 'helpers';

import { ResizableBox } from 'react-resizable';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { BalanceIcon, ContractIcon } from 'components/Icons';
import DropdownSearch from 'components/DropdownSearch';
import FiltersBar from 'components/FiltersBar';

import clsx from 'clsx';
import { useStyles, useModalBodyStyles } from './style';

const ResizableDropdown = (props) => {
  const {
    width,
    height,
    children
  } = props;

  const [resizableParams, setResizableParams] = useState(() => ({
    width,
    height: height || 413
  }));

  const onResize = (event, { element, size, handle }) => {
    setResizableParams({ width: size.width, height: size.height })
  };

  return (
    <ResizableBox
      width={resizableParams.width}
      height={resizableParams.height}
      minConstraints={[width, 413]}
      axis="both"
      onResize={onResize}
    >
      {children}
    </ResizableBox>
  )
}

const DropdownPickerModal = (props) => {
  const {
    open,
    anchorEl,
    onClose,
    renderBody,
    resizable,
    defaultWidth
  } = props;

  const content = typeof renderBody === 'function' && renderBody(onClose);

  return (
    <Popover
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    // className={classes.popover}
    >
      {
        resizable
          ? (
            <ResizableDropdown
              width={defaultWidth}
            >
              {content}
            </ResizableDropdown>
          ) : (
            <div style={{ width: defaultWidth }}>
              {content}
            </div>
          )
      }
    </Popover>
  )
}

const filtersList = [
  { id: 'inadequateBalance', label: '#filter.inadequatebalance' },
  { id: 'all', label: '#filter.all' }
];

const ModalBody = ({
  cooperatives,
  selectedCooperative
}) => {
  const classes = useModalBodyStyles();
  const searchInput = useRef();
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    if (searchInput.current) {
      searchInput.current.focus();
    }
  }, []);

  const handleChangeFilter = (filter) => {
    setActiveFilter(filter);
  }

  return (
    <div className={classes.body}>
      <DropdownSearch
        ref={searchInput}
      />
      <FiltersBar 
        filtersList={filtersList}
        activeFilter={activeFilter}
        handleChangeFilter={handleChangeFilter}
        withMargin
      />
      <ul className={classes.cooperativesList}>
        {
          cooperatives.map(cooperative => {
            return (
              <li 
                key={cooperative.Id} 
                className={clsx(classes.cooperativeItem, {
                  [classes.selected]: selectedCooperative.Id === cooperative.Id
                })}
              >
                <span className={classes.cooperativeName}>
                  {cooperative.Name}
                </span>

              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

const ReportCooperativePicker = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const root = useRef();

  const {
    cooperatives,
    selectedCooperative,
    disabled,
    resizable,
    selectPrev,
    selectNext,
  } = props;

  const [defaultAnchorEl, setDefaultAnchorEl] = useState(null);
  const open = !!defaultAnchorEl;

  const onOpen = (e) => {
    setDefaultAnchorEl(e.currentTarget);
  }

  const onClose = () => {
    setDefaultAnchorEl(null);
  }

  const handleKeyDown = (e) => {
    e.preventDefault();

    if (e.key === 'Enter') {
      onOpen(e);
    }
  }

  const renderValue = () => {
    return (
      <>
        <div className={classes.valueWrapper}>
          <span className={classes.name}>{selectedCooperative?.Name}</span>
        </div>
        <Box
          display="flex"
          alignItems="center"
        >
          <Box
            display="flex"
            alignItems="center"
            className={classes.balanceWrapper}
          >
            <BalanceIcon className={classes.balancesIcon} />
            <span className={classes.balancesText}>{formatNum(selectedCooperative.AllowedBalance)}</span>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            className={classes.allowedBalanceWrapper}
          >
            <ContractIcon className={classes.balancesIcon} />
            <span className={classes.balancesText}>{formatNum(selectedCooperative.InvoiceSum)}</span>
          </Box>
        </Box>
      </>
    )
  }

  const renderModalBody = () => (
    <ModalBody 
      cooperatives={cooperatives}
    />
  );

  return (
    <>
      <div
        className={clsx(
          classes.root,
          {
            [classes.rootOpen]: open
          },
          {
            [classes.disabled]: disabled
          }
        )}
        ref={root}
        onClick={disabled ? undefined : onOpen}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
      >
        <div className={classes.label}>
          {
            selectedCooperative
              ? (
                <Button className={classes.button}>
                  <ChevronLeftIcon className={classes.arrowIcon} />
                </Button>
              ) : null
          }
          {
            selectedCooperative
              ? renderValue()
              : `- ${t('#control.selectpayer')} -`
          }
          {
            selectedCooperative
              ? (
                <Button className={classes.button}>
                  <ChevronRightIcon className={classes.arrowIcon} />
                </Button>
              ) : null
          }
        </div>
        <Button
          disabled={disabled}
          classes={{
            root: clsx(classes.button, classes.expandBtn, {
              [classes.expandOpen]: open
            }),
            disabled: classes.buttonDisabled
          }}
        >
          <ExpandMoreIcon className={classes.arrowIcon} />
        </Button>
      </div>
      <DropdownPickerModal
        anchorEl={defaultAnchorEl}
        open={open}
        resizable={resizable}
        onClose={onClose}
        renderBody={renderModalBody}
        defaultWidth={
          root.current
            ? root.current.getBoundingClientRect().width
            : undefined
        }
      />
    </>
  )
}

export default ReportCooperativePicker;