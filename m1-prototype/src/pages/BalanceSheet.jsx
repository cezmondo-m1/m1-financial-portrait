import { LIGHT, DARK, SPACING } from '../tokens';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PrimaryTabs from '../components/PrimaryTabs';
import SecondaryPills from '../components/SecondaryPills';
import SummaryCard from '../components/SummaryCard';
import BalanceSheetSection from '../components/BalanceSheetSection';
import WebFooter from '../components/WebFooter';
import { BALANCE_SHEET } from '../data/balanceSheetData';

const SUB_TABS = ['Balance sheet', 'Cash flow', 'Financial portrait', 'Investment profile', 'Investor disclosures', 'Risk profile'];

function ActionButton({ label, darkMode }) {
  return (
    <button style={{
      display: 'inline-flex',
      alignItems: 'center',
      alignSelf: 'flex-start',
      gap: 8,
      fontFamily: 'Inter, sans-serif',
      fontSize: 14,
      fontWeight: 600,
      lineHeight: '20px',
      color: '#2A7DA7',
      background: 'none',
      border: '2px solid #2A7DA7',
      borderRadius: 24,
      padding: '12px 24px',
      cursor: 'pointer',
    }}>
      {label}
      <FontAwesomeIcon icon={faPlus} style={{ fontSize: 14 }} />
    </button>
  );
}

export default function BalanceSheet({ darkMode = false, activeSubTab, onSubTabChange, layout = {} }) {
  const t = darkMode ? DARK : LIGHT;
  const data = BALANCE_SHEET;
  const pad = layout.contentPadding ?? 64;
  const navW = (layout.navWidth ?? 264) + (layout.panelWidth ?? 0);
  const isSmall = layout.bp === 'xs' || layout.bp === 's';

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

        {/* Two-column layout (stacks on small screens) */}
        <div style={{
          display: 'flex',
          flexDirection: isSmall ? 'column' : 'row',
          gap: isSmall ? SPACING.l : 48,
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
