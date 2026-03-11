import { useState } from 'react';
import TopHeader from './components/TopHeader';
import WebRailNav from './components/WebRailNav';
import M1IntelligencePanel from './components/M1IntelligencePanel';
import BalanceSheet from './pages/BalanceSheet';
import FinancialPortraitShell from './pages/FinancialPortraitShell';
import CashFlow from './pages/CashFlow';
import useBreakpoint from './useBreakpoint';

const PANEL_WIDTH = 360;

export default function App() {
  const [activeSubTab, setActiveSubTab] = useState('Balance sheet');
  const [annualIncome, setAnnualIncome] = useState(175000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(5000);
  const [navOpen, setNavOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const baseLayout = useBreakpoint();

  // Adjust layout when panel is open — content shifts right by panel width
  const layout = {
    ...baseLayout,
    panelOpen,
    panelWidth: panelOpen ? PANEL_WIDTH : 0,
  };

  function renderPage() {
    switch (activeSubTab) {
      case 'Financial portrait':
        return (
          <FinancialPortraitShell
            activeSubTab={activeSubTab}
            onSubTabChange={setActiveSubTab}
            monthlyExpenses={monthlyExpenses}
            annualIncome={annualIncome}
            layout={layout}
          />
        );
      case 'Cash flow':
        return (
          <CashFlow
            activeSubTab={activeSubTab}
            onSubTabChange={setActiveSubTab}
            annualIncome={annualIncome}
            onAnnualIncomeChange={setAnnualIncome}
            monthlyExpenses={monthlyExpenses}
            onMonthlyExpensesChange={setMonthlyExpenses}
            layout={layout}
          />
        );
      default:
        return (
          <BalanceSheet
            activeSubTab={activeSubTab}
            onSubTabChange={setActiveSubTab}
            layout={layout}
          />
        );
    }
  }

  return (
    <div style={{
      fontFamily: 'Inter, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#FFFFFF',
    }}>
      {/* Top header (fixed) */}
      <TopHeader
        layout={layout}
        onMenuToggle={() => setNavOpen(!navOpen)}
      />
      <div style={{ height: 56 }} />

      {/* Main layout: sidebar + panel + content */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Side nav */}
        {baseLayout.navMode !== 'hidden' && (
          <>
            <WebRailNav layout={layout} onIntelligenceClick={() => setPanelOpen(!panelOpen)} />
            <div style={{ width: baseLayout.navWidth, flexShrink: 0 }} />
          </>
        )}

        {/* Mobile nav overlay */}
        {baseLayout.navMode === 'hidden' && navOpen && (
          <>
            <div
              onClick={() => setNavOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                top: 56,
                backgroundColor: 'rgba(0,0,0,0.4)',
                zIndex: 14,
              }}
            />
            <WebRailNav layout={{ ...layout, navMode: 'open', navWidth: 264 }} onIntelligenceClick={() => { setPanelOpen(!panelOpen); setNavOpen(false); }} />
          </>
        )}

        {/* M1 Intelligence Panel — fixed, between nav and content */}
        {panelOpen && (
          <>
            <div style={{
              position: 'fixed',
              top: 56,
              left: baseLayout.navWidth,
              bottom: 0,
              width: PANEL_WIDTH,
              zIndex: 12,
              borderRight: '1px solid #D4DBE6',
            }}>
              <M1IntelligencePanel onClose={() => setPanelOpen(false)} />
            </div>
            <div style={{ width: PANEL_WIDTH, flexShrink: 0 }} />
          </>
        )}

        {renderPage()}
      </div>
    </div>
  );
}
