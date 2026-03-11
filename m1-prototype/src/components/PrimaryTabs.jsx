import { LIGHT, DARK, SPACING } from '../tokens';

const TABS = [
  'About you',
  'Your finances',
  'M1 accounts',
  'Documents',
  'Security',
  'Preferences',
  'Platform fee',
];

export default function PrimaryTabs({ activeTab = 'Your finances', onTabChange, darkMode = false }) {
  const t = darkMode ? DARK : LIGHT;

  return (
    <div style={{
      display: 'flex',
      gap: SPACING['2xs'],
      borderBottom: `1px solid ${t.borderMain}`,
    }}>
      {TABS.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <button
            key={tab}
            onClick={() => onTabChange?.(tab)}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 16,
              fontWeight: isActive ? 600 : 400,
              lineHeight: '24px',
              letterSpacing: -0.25,
              color: t.fgNeutralMain,
              background: 'none',
              border: 'none',
              borderBottom: isActive ? `2px solid ${t.fgNeutralMain}` : '2px solid transparent',
              padding: `${SPACING.s}px ${SPACING.xs}px`,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
