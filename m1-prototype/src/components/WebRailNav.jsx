import { LIGHT, DARK, SPACING } from '../tokens';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faPiggyBank, faChartLine, faHandHoldingUsd,
  faMagnifyingGlass, faUser, faCircleQuestion, faRightFromBracket,
  faChevronDown, faBrain,
} from '@fortawesome/free-solid-svg-icons';

function NavItem({ icon, label, selected, darkMode, onClick }) {
  const t = darkMode ? DARK : LIGHT;
  const bg = selected ? t.bgInfoSubtle : 'transparent';
  const borderLeft = selected ? `2px solid ${t.fgSecondary}` : '2px solid transparent';
  const textColor = selected ? t.fgSecondary : t.fgNeutralMain;

  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: SPACING.s,
        padding: `${SPACING['2xs']}px ${SPACING.m}px`,
        height: 40,
        backgroundColor: bg,
        borderLeft,
        cursor: 'pointer',
        boxSizing: 'border-box',
      }}
    >
      <FontAwesomeIcon icon={icon} style={{ fontSize: 18, color: textColor, width: 24, textAlign: 'center' }} />
      <span style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: 14,
        fontWeight: 600,
        lineHeight: '20px',
        color: textColor,
      }}>
        {label}
      </span>
    </div>
  );
}

function NavSection({ icon, label, darkMode, hasChevron = true }) {
  const t = darkMode ? DARK : LIGHT;
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: SPACING.s,
      padding: `${SPACING['2xs']}px ${SPACING.m}px`,
      height: 40,
      cursor: 'pointer',
      boxSizing: 'border-box',
    }}>
      <FontAwesomeIcon icon={icon} style={{ fontSize: 18, color: t.fgNeutralMain, width: 24, textAlign: 'center' }} />
      <span style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: 14,
        fontWeight: 600,
        lineHeight: '20px',
        color: t.fgNeutralMain,
        flex: 1,
      }}>
        {label}
      </span>
      {hasChevron && (
        <FontAwesomeIcon icon={faChevronDown} style={{ fontSize: 10, color: t.fgNeutralSecondary }} />
      )}
    </div>
  );
}

export default function WebRailNav({ darkMode = false }) {
  const t = darkMode ? DARK : LIGHT;

  return (
    <div style={{
      width: 264,
      minHeight: '100%',
      backgroundColor: t.bgNeutralPrimary,
      borderRight: `1px solid ${t.borderMain}`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxSizing: 'border-box',
      flexShrink: 0,
    }}>
      {/* Top section */}
      <div>
        {/* M1 Intelligence button */}
        <div style={{ padding: `${SPACING.m}px ${SPACING['2xs']}px ${SPACING.s}px` }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: SPACING['2xs'],
            padding: `${SPACING.xs}px ${SPACING.m}px`,
            borderRadius: 24,
            backgroundColor: t.bgNeutralPrimary,
            border: `1px solid ${t.borderMain}`,
            cursor: 'pointer',
          }}>
            <FontAwesomeIcon icon={faBrain} style={{ fontSize: 16, color: t.fgNeutralMain }} />
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
              fontWeight: 600,
              lineHeight: '20px',
              color: t.fgNeutralMain,
            }}>
              M1 Intelligence ⌘i
            </span>
          </div>
        </div>

        {/* Main nav */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING['3xs'] }}>
          <NavItem icon={faHome} label="Home" darkMode={darkMode} />
          <NavSection icon={faPiggyBank} label="Earn" darkMode={darkMode} />
          <NavSection icon={faChartLine} label="Invest" darkMode={darkMode} />
          <NavSection icon={faHandHoldingUsd} label="Borrow" darkMode={darkMode} />
          <NavSection icon={faMagnifyingGlass} label="Research" darkMode={darkMode} />
        </div>
      </div>

      {/* Footer */}
      <div style={{
        borderTop: `1px solid ${t.borderMain}`,
        padding: `${SPACING['2xs']}px 0 ${SPACING.m}px`,
        display: 'flex',
        flexDirection: 'column',
        gap: SPACING['3xs'],
      }}>
        <NavItem icon={faUser} label="Taylor Maede" selected darkMode={darkMode} />
        <NavItem icon={faCircleQuestion} label="Help" darkMode={darkMode} />
        <NavItem icon={faRightFromBracket} label="Log out" darkMode={darkMode} />
      </div>
    </div>
  );
}
