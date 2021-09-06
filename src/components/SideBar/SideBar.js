import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  Tabs,
  Tab,
  makeStyles
} from '@material-ui/core';
import {
  PaymentIcon,
  BalanceIcon,
  ReportIcon,
} from 'components/Icons';
import logo from 'assets/images/logo.png';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  logo: {
    display: 'block',
    maxWidth: '100%',
    height: 'auto',
    margin: '0 auto',
    marginBottom: 28
  },
  labelIcon: {
    minHeight: 'auto',
    paddingTop: 0
  },
  sidebar: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: 80,
    height: '100%',
    paddingTop: 8,
    background: '#224060'
  },
  tabRoot: {
    minWidth: 'auto',
    marginBottom: 22,
    paddingLeft: 21,
    paddingRight: 21,
    paddingBottom: 0,
    fontSize: 13,
    fontFamily: 'Lato',
    fontWeight: 700,
    lineHeight: '16px',
    color: '#fff',
    opacity: 1,
    textTransform: 'capitalize',
    transition: 'color .15s linear',
    '&:last-child': {
      marginBottom: 0
    }
  },
  selectedTab: {
    color: '#000'
  },
  indicator: {
    display: 'none'
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    padding: 6,
    background: '#35506E',
    borderRadius: '50%',
    color: '#fff'
  },
  iconWrapperActive: {
    background: '#fff',
    color: '#224060'
  },
  icon: {
    fontSize: '1.2rem'
  },
  reportIcon: {
    fontSize: '0.95rem',
  },
  label: {
    fontSize: 13,
    lineHeight: '16px',
    fontFamily: 'Proxima Nova',
    fontWeight: 600,
    color: '#fff'
  }
}))

const tabsConfig = [
  { id: 'balances', label: "#sidebar.tab.balances", icon: BalanceIcon },
  { id: 'payment', label: "#sidebar.tab.payments", icon: PaymentIcon },
  { id: 'paid', label: "#sidebar.tab.paid", icon: CheckCircleOutlineIcon },
  // { id: 'report', label: '#sidebar.tab.report', icon: ReportIcon }
]

const SideBar = ({
  currentTab,
  handleTabChange
}) => {
  const classes = useStyles();
  const {t} = useTranslation();

  return (
    <div className={classes.sidebar}>
      <img
        className={classes.logo}
        alt="Logo"
        src={logo}
      />
      <Tabs
        classes={{
          indicator: classes.indicator
        }}
        orientation="vertical"
        value={currentTab}
        onChange={handleTabChange}
      >
        {
          tabsConfig.map(({ id, label, icon: Icon }) => {
            const isActive = currentTab === id;
            return (
              <Tab
                key={id}
                classes={{
                  root: classes.tabRoot,
                  selected: classes.selectedTab,
                  labelIcon: classes.labelIcon
                }}
                icon={(
                  <div className={clsx(classes.iconWrapper, {
                    [classes.iconWrapperActive]: isActive
                  })}>
                    <Icon className={clsx(classes.icon, {
                      [classes.reportIcon]: id === 'report'
                    })}/>
                  </div>
                )}
                label={<span className={classes.label}>{t(label)}</span>}
                value={id}
              />
            )
          })
        }
      </Tabs>
    </div>
  )
}

export default React.memo(SideBar);