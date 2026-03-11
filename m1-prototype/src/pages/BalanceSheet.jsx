import { LIGHT, DARK, SPACING } from '../tokens';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PrimaryTabs from '../components/PrimaryTabs';
import SecondaryPills from '../components/SecondaryPills';
import SummaryCard from '../components/SummaryCard';
import BalanceSheetSection from '../components/BalanceSheetSection';
import WebFooter from '../components/WebFooter';
import { BALANCE_SHEET } from '../data/balanceSheetData';

const SUB_TABS = ['Balance sheet', 'Cash flow', 'Financial Portrait', 'Investment profile', 'Investor disclosures'];

function ActionButton({ label, darkMode }) {
  const t = darkMode ? DARK : LIGHT;
  return (
    <button style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'Inter, sans-serif',
      fontSize: 13,
      fontWeight: 600,
      lineHeight: '19px',
      color: t.fgPrimary,
      background: 'none',
      border: `1px solid ${t.fgPrimary}`,
      borderRadius: 22,
      padding: '11px 15px 11px 22px',
      cursor: 'pointer',
    }}>
      {label}
      <FontAwesomeIcon icon={faPlus} style={{ fontSize: 12 }} />
    </button>
  );
}

export default function BalanceSheet({ darkMode = false, activeSubTab, onSubTabChange }) {
  const t = darkMode ? DARK : LIGHT;
  const data = BALANCE_SHEET;

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

        {/* Page title */}
        <h1 style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 20,
          fontWeight: 300,
          lineHeight: '28px',
          letterSpacing: -0.32,
          color: t.fgNeutralMain,
          margin: 0,
        }}>
          Balance sheet
        </h1>

        {/* Two-column layout */}
        <div style={{
          display: 'flex',
          gap: SPACING['5xl'],
        }}>
          {/* LEFT COLUMN — Assets */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: SPACING['3xl'] }}>
            {/* Summary card + Add button */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.m }}>
              <SummaryCard
                title="Total assets"
                total={data.totalAssets}
                composition={data.assetComposition}
                darkMode={darkMode}
              />
              <ActionButton label="Add asset" darkMode={darkMode} />
            </div>

            {/* Asset categories */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING['4xl'] }}>
              <BalanceSheetSection category={data.assets.cashAndSavings} darkMode={darkMode} />
              <BalanceSheetSection category={data.assets.investments} darkMode={darkMode} />
              <BalanceSheetSection category={data.assets.realEstate} darkMode={darkMode} />
              <BalanceSheetSection category={data.assets.otherAssets} darkMode={darkMode} />
            </div>
          </div>

          {/* RIGHT COLUMN — Liabilities */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: SPACING['3xl'] }}>
            {/* Summary card + Add button */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.m }}>
              <SummaryCard
                title="Total liabilities"
                total={data.totalLiabilities}
                composition={data.liabilityComposition}
                darkMode={darkMode}
              />
              <ActionButton label="Add liability" darkMode={darkMode} />
            </div>

            {/* Liability categories */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING['4xl'] }}>
              <BalanceSheetSection category={data.liabilities.mortgage} darkMode={darkMode} />
              <BalanceSheetSection category={data.liabilities.creditCards} darkMode={darkMode} />
              <BalanceSheetSection category={data.liabilities.otherLoans} darkMode={darkMode} />
            </div>
          </div>
        </div>

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
