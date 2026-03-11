import { LIGHT, DARK, SPACING, RADIUS } from '../tokens';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

function formatDollar(value) {
  return '$' + Math.round(value).toLocaleString('en-US');
}

function ListItem({ name, institution, value, showDivider, darkMode }) {
  const t = darkMode ? DARK : LIGHT;
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      padding: `${SPACING.xs}px 0`,
      borderBottom: showDivider ? `1px solid ${t.borderMain}` : 'none',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 16,
          fontWeight: 400,
          lineHeight: '24px',
          letterSpacing: -0.25,
          color: t.fgNeutralMain,
        }}>
          {name}
        </span>
        {institution && (
          <span style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 14,
            fontWeight: 400,
            lineHeight: '20px',
            color: t.fgNeutralSecondary,
          }}>
            {institution}
          </span>
        )}
      </div>
      <span style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: 16,
        fontWeight: 400,
        lineHeight: '24px',
        letterSpacing: -0.25,
        color: t.fgNeutralMain,
        whiteSpace: 'nowrap',
      }}>
        {formatDollar(value)}
      </span>
    </div>
  );
}

function TotalRow({ label, value, darkMode }) {
  const t = darkMode ? DARK : LIGHT;
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <span style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: 16,
        fontWeight: 600,
        lineHeight: '24px',
        letterSpacing: -0.25,
        color: t.fgNeutralMain,
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: 16,
        fontWeight: 600,
        lineHeight: '24px',
        letterSpacing: -0.25,
        color: t.fgNeutralMain,
        whiteSpace: 'nowrap',
      }}>
        {formatDollar(value)}
      </span>
    </div>
  );
}

function SubcategoryGroup({ subcategory, darkMode }) {
  return (
    <div>
      <TotalRow label={subcategory.label} value={subcategory.total} darkMode={darkMode} />
      {subcategory.items.map((item, i) => (
        <ListItem
          key={i}
          name={item.name}
          institution={item.institution}
          value={item.value}
          showDivider={i < subcategory.items.length - 1}
          darkMode={darkMode}
        />
      ))}
    </div>
  );
}

export default function BalanceSheetSection({ category, darkMode = false }) {
  const t = darkMode ? DARK : LIGHT;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: SPACING.s,
      borderRadius: RADIUS.m,
    }}>
      {/* Section header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: SPACING.s,
        borderBottom: `2px solid ${t.borderInfo}`,
      }}>
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 18,
          fontWeight: 600,
          lineHeight: '24px',
          letterSpacing: -0.25,
          color: t.fgNeutralMain,
        }}>
          {category.label}
        </span>
        <FontAwesomeIcon
          icon={faPen}
          style={{ fontSize: 14, color: t.fgPrimary, cursor: 'pointer' }}
        />
      </div>

      {/* Subcategories */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.l }}>
        {category.subcategories.map((sub, i) => (
          <SubcategoryGroup key={i} subcategory={sub} darkMode={darkMode} />
        ))}
      </div>

      {/* CTA button */}
      {category.cta && (
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
          padding: '11px 22px 11px 15px',
          cursor: 'pointer',
          alignSelf: 'flex-start',
        }}>
          {category.cta.label}
        </button>
      )}
    </div>
  );
}
