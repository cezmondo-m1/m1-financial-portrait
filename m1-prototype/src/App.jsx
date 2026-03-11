import { useState } from 'react';
import TopHeader from './components/TopHeader';
import WebRailNav from './components/WebRailNav';
import BalanceSheet from './pages/BalanceSheet';
import FinancialPortraitShell from './pages/FinancialPortraitShell';

export default function App() {
  const [activeSubTab, setActiveSubTab] = useState('Balance sheet');

  const isPortrait = activeSubTab === 'Financial Portrait';

  return (
    <div style={{
      fontFamily: 'Inter, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#FFFFFF',
    }}>
      {/* Top header */}
      <TopHeader />

      {/* Main layout: sidebar + content */}
      <div style={{ display: 'flex', flex: 1 }}>
        <WebRailNav />
        {isPortrait ? (
          <FinancialPortraitShell
            activeSubTab={activeSubTab}
            onSubTabChange={setActiveSubTab}
          />
        ) : (
          <BalanceSheet
            activeSubTab={activeSubTab}
            onSubTabChange={setActiveSubTab}
          />
        )}
      </div>
    </div>
  );
}
