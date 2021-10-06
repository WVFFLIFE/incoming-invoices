import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setCurrentTab } from 'actions/settingsActions';
import {
  Balances,
  Payments,
  Paid,
  Report,
} from 'containers';
import SideBar from 'components/SideBar';

function App() {
  const dispatch = useDispatch();
  const {currentTab} = useSelector((state: any) => state.settings);
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("#page.title");
  }, []);

  const handleTabChange = useCallback((e, newVal) => {
    if (currentTab === newVal) return;
    dispatch(setCurrentTab(newVal))
  }, [dispatch, currentTab])

  return (
    <div className="wrapper">
      <SideBar
        currentTab={currentTab}
        handleTabChange={handleTabChange}
      />
      <div className="container">
        {currentTab === 'balances' && <Balances />}
        {currentTab === 'payment' && <Payments />}
        {currentTab === 'paid' && <Paid />}
        {currentTab === 'report' && <Report />}
      </div>
    </div>
  );
}

export default App;