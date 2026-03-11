import { LIGHT, DARK, SPACING, RADIUS } from '../tokens';

export default function SecondaryPills({ tabs, activeTab, onTabChange, darkMode = false }) {
  const t = darkMode ? DARK : LIGHT;

  return (
    <div style={{
      display: 'flex',
      gap: SPACING['2xs'],
      flexWrap: 'wrap',
    }}>
      {tabs.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <button
            key={tab}
            onClick={() => onTabChange?.(tab)}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
              fontWeight: isActive ? 600 : 400,
              lineHeight: '20px',
              color: isActive ? t.fgNeutralMain : t.fgNeutralSecondary,
              background: isActive ? t.bgInfoSubtle : 'transparent',
              border: `1px solid ${isActive ? t.borderInfo : t.borderMain}`,
              borderRadius: RADIUS.xl,
              padding: `${SPACING['2xs']}px ${SPACING.s}px`,
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
