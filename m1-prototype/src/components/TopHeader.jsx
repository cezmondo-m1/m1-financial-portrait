import { LIGHT, DARK, SPACING } from '../tokens';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faGift } from '@fortawesome/free-solid-svg-icons';

export default function TopHeader({ darkMode = false }) {
  const t = darkMode ? DARK : LIGHT;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 56,
      paddingLeft: SPACING.m,
      paddingRight: SPACING.m,
      backgroundColor: t.bgNeutralPrimary,
      borderBottom: `0.5px solid ${t.borderMain}`,
      boxSizing: 'border-box',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.s }}>
        <FontAwesomeIcon icon={faBars} style={{ fontSize: 16, color: t.fgNeutralMain }} />
        {/* M1 Logo placeholder */}
        <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
          <path d="M0 0h3.5v16H0V0zm8.25 0L5 8h3.5l3.25-8H8.25zm3.5 0L15 8h-3.5L8.25 0h3.5zM16.5 0H20v16h-3.5V0z" fill={t.fgNeutralMain} />
        </svg>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: SPACING['2xs'] }}>
        <FontAwesomeIcon icon={faGift} style={{ fontSize: 16, color: '#D6A55C' }} />
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 14,
          fontWeight: 600,
          lineHeight: '20px',
          color: t.fgNeutralSecondary,
        }}>
          Get up to $750 a year
        </span>
      </div>
    </div>
  );
}
