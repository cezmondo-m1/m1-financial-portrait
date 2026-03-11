import { useState } from 'react';
import TopHeader from './components/TopHeader';
import WebRailNav from './components/WebRailNav';
import BalanceSheet from './pages/BalanceSheet';

export default function App() {
  const [activeSubTab, setActiveSubTab] = useState('Balance sheet');

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
        <BalanceSheet
          activeSubTab={activeSubTab}
          onSubTabChange={setActiveSubTab}
        />
      </div>
    </div>
  );
}
