import { LIGHT, DARK, SPACING } from '../tokens';
import PrimaryTabs from '../components/PrimaryTabs';
import SecondaryPills from '../components/SecondaryPills';
import WebFooter from '../components/WebFooter';
import FinancialPortrait from './FinancialPortrait';

const SUB_TABS = ['Balance sheet', 'Cash flow', 'Financial portrait', 'Investment profile', 'Investor disclosures', 'Risk profile'];

export default function FinancialPortraitShell({ darkMode = false, activeSubTab, onSubTabChange, monthlyExpenses, annualIncome, layout = {} }) {
  const t = darkMode ? DARK : LIGHT;
  const pad = layout.contentPadding ?? 64;
  const navW = (layout.navWidth ?? 264) + (layout.panelWidth ?? 0);

  return (
    <div style={{
      flex: 1,
      backgroundColor: t.bgNeutralPrimary,
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    }}>
      {/* Fixed primary tabs */}
      <div style={{
        position: 'fixed',
        top: 56,
        left: navW,
        right: 0,
        zIndex: 10,
        backgroundColor: t.bgNeutralPrimary,
        padding: `0 ${pad}px`,
        overflowX: 'auto',
      }}>
        <PrimaryTabs activeTab="Your finances" darkMode={darkMode} />
      </div>
      <div style={{ height: 57 }} />

      {/* Content area */}
      <div style={{
        flex: 1,
        padding: `${SPACING.m}px ${pad}px`,
        display: 'flex',
        flexDirection: 'column',
        gap: SPACING.m,
      }}>
        {/* Sub-pills */}
        <div style={{ overflowX: 'auto' }}>
          <SecondaryPills
            tabs={SUB_TABS}
            activeTab={activeSubTab}
            onTabChange={onSubTabChange}
            darkMode={darkMode}
          />
        </div>

        {/* Financial Portrait content */}
        <FinancialPortrait darkMode={darkMode} monthlyExpenses={monthlyExpenses} annualIncome={annualIncome} />

      </div>

      {/* Footer */}
      <WebFooter darkMode={darkMode} />
    </div>
  );
}
