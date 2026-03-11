import { useState } from 'react';
import { LIGHT, DARK, SPACING, RADIUS, TYPE } from '../tokens';
import PrimaryTabs from '../components/PrimaryTabs';
import SecondaryPills from '../components/SecondaryPills';
import WebFooter from '../components/WebFooter';

const SUB_TABS = ['Balance sheet', 'Cash flow', 'Financial portrait', 'Investment profile', 'Investor disclosures', 'Risk profile'];

// ── Form Field ──────────────────────────────────────────────────────
// Spec: Form fields component from Input.md
// State: Default filled, Kind: Elevated
// Border: Grey/04 1px, radius 12px
// Label: Inter 400 12px, FG/Neutral Secondary — floated above border
// Input text: Inter 400 16px, FG/Neutral Main
// Padding: 16px all sides

function FormField({ label, value, onChange, darkMode }) {
  const t = darkMode ? DARK : LIGHT;
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      {/* Floating label */}
      <div style={{
        position: 'absolute',
        top: -8,
        left: 12,
        backgroundColor: t.bgNeutralPrimary,
        padding: '0 4px',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        zIndex: 1,
      }}>
        <span style={{
          ...TYPE.ps400,
          fontFamily: 'Inter, sans-serif',
          color: focused ? t.fgPrimary : t.fgNeutralSecondary,
        }}>
          {label}
        </span>
        <span style={{
          ...TYPE.pm400,
          fontFamily: 'Inter, sans-serif',
          color: t.fgNeutralSecondary,
        }}>
          *
        </span>
      </div>

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          height: 56,
          padding: `${SPACING.s}px ${SPACING.s}px`,
          fontFamily: 'Inter, sans-serif',
          fontSize: 16,
          fontWeight: 400,
          lineHeight: '24px',
          letterSpacing: -0.25,
          color: t.fgNeutralMain,
          backgroundColor: t.bgNeutralPrimary,
          border: `1px solid ${focused ? t.borderActive : t.grey04}`,
          borderRadius: RADIUS.m,
          outline: 'none',
          boxSizing: 'border-box',
          transition: 'border-color 200ms ease-out',
        }}
      />
    </div>
  );
}

// ── Cash Flow Page ──────────────────────────────────────────────────

function formatCurrency(num) {
  return '$' + Math.round(num).toLocaleString('en-US');
}

function parseCurrency(str) {
  const num = Number(String(str).replace(/[^0-9.]/g, ''));
  return isNaN(num) ? 0 : num;
}

export default function CashFlow({
  darkMode = false, activeSubTab, onSubTabChange,
  annualIncome = 175000, onAnnualIncomeChange,
  monthlyExpenses = 5000, onMonthlyExpensesChange,
  layout = {},
}) {
  const t = darkMode ? DARK : LIGHT;
  const pad = layout.contentPadding ?? 64;
  const navW = (layout.navWidth ?? 264) + (layout.panelWidth ?? 0);
  const isSmall = layout.bp === 'xs' || layout.bp === 's';
  const [incomeDisplay, setIncomeDisplay] = useState(formatCurrency(annualIncome));
  const [expenseDisplay, setExpenseDisplay] = useState(formatCurrency(monthlyExpenses));

  function handleIncomeChange(val) {
    setIncomeDisplay(val);
    const num = parseCurrency(val);
    if (num > 0) onAnnualIncomeChange?.(num);
  }

  function handleExpenseChange(val) {
    setExpenseDisplay(val);
    const num = parseCurrency(val);
    if (num > 0) onMonthlyExpensesChange?.(num);
  }

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

        {/* Two-column layout: Income (left) + Expenses (right) */}
        <div style={{
          display: 'flex',
          flexDirection: isSmall ? 'column' : 'row',
          gap: isSmall ? SPACING.l : SPACING['5xl'],
        }}>
          {/* LEFT COLUMN — Income */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: SPACING.m }}>
            {/* Section header */}
            <h2 style={{
              ...TYPE.pxl400,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
              color: t.fgSecondary,
              margin: 0,
            }}>
              Income
            </h2>

            {/* Description */}
            <p style={{
              ...TYPE.pl400,
              fontFamily: 'Inter, sans-serif',
              color: t.fgNeutralMain,
              margin: 0,
            }}>
              Your annual gross income before taxes, including salary, bonuses, and other sources of income.
            </p>

            {/* Input field */}
            <FormField
              label="Total annual income"
              value={incomeDisplay}
              onChange={handleIncomeChange}
              darkMode={darkMode}
            />

            {/* Save button — Primary, pill shape, with + icon */}
            <div>
              <button style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                fontFamily: 'Inter, sans-serif',
                fontSize: 15,
                fontWeight: 600,
                lineHeight: '20px',
                color: darkMode ? t.fgNeutralMain : '#FFFFFF',
                backgroundColor: t.fgPrimary,
                border: 'none',
                borderRadius: 30,
                padding: `${SPACING.s}px ${SPACING.l}px`,
                cursor: 'pointer',
                minWidth: 143,
                height: 52,
                transition: 'background-color 100ms ease-out',
              }}>
                Save
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN — Expenses */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: SPACING.m }}>
            {/* Section header */}
            <h2 style={{
              ...TYPE.pxl400,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
              color: t.fgSecondary,
              margin: 0,
            }}>
              Expenses
            </h2>

            {/* Description */}
            <p style={{
              ...TYPE.pl400,
              fontFamily: 'Inter, sans-serif',
              color: t.fgNeutralMain,
              margin: 0,
            }}>
              Your average monthly spending including housing, groceries, childcare, subscriptions, etc.
            </p>

            {/* Input field */}
            <FormField
              label="Current monthly expenses"
              value={expenseDisplay}
              onChange={handleExpenseChange}
              darkMode={darkMode}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <WebFooter darkMode={darkMode} />
    </div>
  );
}
