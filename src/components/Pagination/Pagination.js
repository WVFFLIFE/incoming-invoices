import React from 'react';
import {
  makeStyles,
  Select,
  MenuItem
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { usePagination } from '@material-ui/lab/Pagination';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  ul: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
  },
  nav: {
    display: 'block',
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 400,
    letterSpacing: 0.2,
    background: 'transparent',
    border: 0,
    color: '#000',
    cursor: 'pointer',
    outline: 0,
    textTransform: 'capitalize'
  },
  disabledNav: {
    cursor: 'default',
    opacity: .3
  },
  item: {
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 400,
    letterSpacing: 0.2,
    background: 'transparent',
    border: 0,
    color: '#000',
    cursor: 'pointer',
    outline: 0,
  },
  selectedItem: {
    textDecoration: 'underline'
  },
  count: {
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 400,
    lineHeight: '18px',
    letterSpacing: 0.2,
    color: '#000'
  },
  li: {
    '&:first-child': {
      marginRight: 15
    },
    '&:last-child': {
      marginLeft: 15
    }
  },
  rowsPerPageTitle: {
    marginRight: 15,
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 400,
    letterSpacing: 0.2
  },
  icon: {
    top: 6,
    fontSize: '1rem',
    color: '#000',
  },
  selectMenu: {
    minHeight: 'auto'
  },
  selectRoot: {
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 400,
    letterSpacing: 0.2,
    lineHeight: '18px',
    color: '#000'
  },
  select: {
    '&.MuiSelect-select': {
      paddingRight: 17
    }
  },
  countWrapper: {
    maxWidth: 200,
    width: '100%'
  },
  flex: {
    display: 'flex',
    alignItems: 'center'
  }
});

const Pagination = ({
  itemsPerPage,
  totalItems,
  currentPage,
  options,
  onChangeRowsPerPage,
  onChangeCurrentPage
}) => {
  const {t} = useTranslation();
  const classes = useStyles();
  const { items } = usePagination({
    count: Math.ceil(totalItems / itemsPerPage),
    page: currentPage + 1,
    onChange: (e, page) => onChangeCurrentPage(page)
  });

  const to = (currentPage + 1) * itemsPerPage > totalItems ? totalItems : (currentPage + 1) * itemsPerPage;

  return (
    <div className={classes.root}>
      <div className={classes.countWrapper}>
        <p className={classes.count}>
          {t("#pagination", { show: currentPage * itemsPerPage + 1, to, totalItems })}
        </p>
      </div>
      <ul className={classes.ul}>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === 'start-ellipsis' || type === 'end-ellipsis') {
            children = '…';
          } else if (type === 'page') {
            children = (
              <button 
                type="button" 
                className={clsx(classes.item, {
                  [classes.selectedItem]: selected
                })} 
                {...item}
              >
                {page}
              </button>
            );
          } else {
            children = (
              <button 
                type="button"
                className={clsx(classes.nav, {
                  [classes.disabledNav]: item.disabled
                })}
                {...item} 
              >
                {t(`#pagination.direction.${type}`)}
              </button>
            );
          }

          return <li key={index} className={classes.li}>{children}</li>;
        })}
      </ul>
      <div className={classes.flex}>
        <span className={classes.rowsPerPageTitle}>{t("#pagination.count.perpage")}:</span>
        <Select
          classes={{
            icon: classes.icon,
            selectMenu: classes.selectMenu,
            root: classes.selectRoot,
            select: classes.select
          }}
          onChange={onChangeRowsPerPage}
          value={itemsPerPage}
          IconComponent={ExpandMoreIcon}
          disableUnderline
        >
          {options.map(option => {
            return (
              <MenuItem
                value={option}
                key={option}
              >
                {option}
              </MenuItem>
            )
          })}
        </Select>
      </div>
    </div>
  )
}

export default React.memo(Pagination);