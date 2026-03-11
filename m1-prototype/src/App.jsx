import { useState } from 'react';
import TopHeader from './components/TopHeader';
import WebRailNav from './components/WebRailNav';
import BalanceSheet from './pages/BalanceSheet';
import FinancialPortraitShell from './pages/FinancialPortraitShell';
import CashFlow from './pages/CashFlow';

export default function App() {
  const [activeSubTab, setActiveSubTab] = useState('Balance sheet');
  const [annualIncome, setAnnualIncome] = useState(175000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(5000);

  function renderPage() {
    switch (activeSubTab) {
      case 'Financial portrait':
        return (
          <FinancialPortraitShell
            activeSubTab={activeSubTab}
            onSubTabChange={setActiveSubTab}
            monthlyExpenses={monthlyExpenses}
            annualIncome={annualIncome}
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
          />
        );
      default:
        return (
          <BalanceSheet
            activeSubTab={activeSubTab}
            onSubTabChange={setActiveSubTab}
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
      <TopHeader />
      <div style={{ height: 56 }} />

      {/* Main layout: sidebar + content */}
      <div style={{ display: 'flex', flex: 1 }}>
        <WebRailNav />
        <div style={{ width: 264, flexShrink: 0 }} />
        {renderPage()}
      </div>
    </div>
  );
}
