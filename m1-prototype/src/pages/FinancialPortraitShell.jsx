import { LIGHT, DARK, SPACING } from '../tokens';
import PrimaryTabs from '../components/PrimaryTabs';
import SecondaryPills from '../components/SecondaryPills';
import WebFooter from '../components/WebFooter';
import FinancialPortrait from './FinancialPortrait';

const SUB_TABS = ['Balance sheet', 'Cash flow', 'Financial Portrait', 'Investment profile', 'Investor disclosures'];

export default function FinancialPortraitShell({ darkMode = false, activeSubTab, onSubTabChange }) {
  const t = darkMode ? DARK : LIGHT;

  return (
    <div style={{
      flex: 1,
      backgroundColor: t.bgNeutralPrimary,
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    }}>
      {/* Primary tabs */}
      <div style={{ padding: `0 ${SPACING.l}px` }}>
        <PrimaryTabs activeTab="Your finances" darkMode={darkMode} />
      </div>

      {/* Content area */}
      <div style={{
        flex: 1,
        padding: `${SPACING.m}px ${SPACING.l}px`,
        display: 'flex',
        flexDirection: 'column',
        gap: SPACING.m,
      }}>
        {/* Sub-pills */}
        <SecondaryPills
          tabs={SUB_TABS}
          activeTab={activeSubTab}
          onTabChange={onSubTabChange}
          darkMode={darkMode}
        />

        {/* Financial Portrait content */}
        <FinancialPortrait darkMode={darkMode} />

        {/* Disclosures link */}
        <div style={{ padding: `${SPACING.xs}px 0` }}>
          <span style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 16,
            fontWeight: 400,
            lineHeight: '24px',
            letterSpacing: -0.25,
            color: t.fgPrimary,
            cursor: 'pointer',
          }}>
            <sup>1,2</sup>Disclosures
          </span>
        </div>
      </div>

      {/* Footer */}
      <WebFooter darkMode={darkMode} />
    </div>
  );
}
