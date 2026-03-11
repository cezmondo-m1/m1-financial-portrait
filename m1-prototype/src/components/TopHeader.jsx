import { LIGHT, DARK, SPACING } from '../tokens';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faGift } from '@fortawesome/free-solid-svg-icons';

export default function TopHeader({ darkMode = false, layout = {}, onMenuToggle }) {
  const t = darkMode ? DARK : LIGHT;
  const showHamburger = layout.navMode === 'hidden';

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 20,
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
        {showHamburger && (
          <FontAwesomeIcon
            icon={faBars}
            style={{ fontSize: 16, color: t.fgNeutralMain, cursor: 'pointer' }}
            onClick={onMenuToggle}
          />
        )}
        <img src="/m1Logo32.svg" alt="M1" width={24} height={24} />
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
