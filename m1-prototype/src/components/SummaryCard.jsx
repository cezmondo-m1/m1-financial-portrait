import { LIGHT, DARK, SPACING, RADIUS } from '../tokens';

function formatDollar(value) {
  return '$' + Math.round(value).toLocaleString('en-US');
}

export default function SummaryCard({ title, total, composition, darkMode = false }) {
  const t = darkMode ? DARK : LIGHT;
  const totalValue = composition.reduce((sum, c) => sum + c.value, 0);

  return (
    <div style={{
      border: `1px solid ${t.borderMain}`,
      borderRadius: RADIUS.m,
      padding: SPACING.m,
      backgroundColor: t.bgNeutralPrimary,
      display: 'flex',
      flexDirection: 'column',
      gap: SPACING.s,
    }}>
      {/* Title + Value */}
      <div>
        <div style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 18,
          fontWeight: 600,
          lineHeight: '24px',
          letterSpacing: -0.25,
          color: t.fgNeutralMain,
        }}>
          {title}
        </div>
        <div style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 28,
          fontWeight: 600,
          lineHeight: '32px',
          letterSpacing: -0.32,
          color: t.fgSecondary,
          marginTop: 2,
        }}>
          {formatDollar(total)}
        </div>
      </div>

      {/* Composition bar */}
      <div>
        <div style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 12,
          fontWeight: 600,
          lineHeight: '16px',
          color: t.fgNeutralMain,
          marginBottom: SPACING['2xs'],
        }}>
          Composition
        </div>
        <div style={{
          display: 'flex',
          height: 7,
          borderRadius: 4,
          overflow: 'hidden',
          gap: 2,
        }}>
          {composition.map((segment, i) => (
            <div
              key={i}
              style={{
                flex: segment.value / totalValue,
                backgroundColor: t[segment.color] || segment.color,
                borderRadius: i === 0 ? '4px 0 0 4px' : i === composition.length - 1 ? '0 4px 4px 0' : 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {composition.map((segment, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: SPACING['2xs'] }}>
            <div style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: t[segment.color] || segment.color,
              flexShrink: 0,
            }} />
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
              fontWeight: 400,
              lineHeight: '20px',
              color: t.fgNeutralMain,
            }}>
              {segment.label} {formatDollar(segment.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
