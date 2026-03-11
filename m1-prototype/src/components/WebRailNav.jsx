import { useState } from 'react';
import { LIGHT, DARK, SPACING, TYPE } from '../tokens';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faPiggyBank, faChartLine, faHandHoldingUsd,
  faMagnifyingGlass, faUser, faCircleQuestion, faRightFromBracket,
  faChevronDown, faChevronUp, faFileLines,
  faPlus, faArrowRightArrowLeft,
} from '@fortawesome/free-solid-svg-icons';

// ── AppNavigationItem ───────────────────────────────────────────────
// Spec: Navigation.md > AppNavigationItem
// States: Default, Hover, Focused, Selected
// Sizing: width fills parent (264px context), height 40px
// Padding: 8px top/bottom, 24px left/right
// Icon-to-text spacing: 16px
// Selected: BG/Info Subtle bg, Blue/05 1px left border, elevated gradient icon

function AppNavigationItem({ icon, label, selected, darkMode, onClick, caption }) {
  const t = darkMode ? DARK : LIGHT;
  const [hovered, setHovered] = useState(false);

  let bg = 'transparent';
  let borderLeft = '1px solid transparent';
  let textColor = t.fgNeutralMain;
  let captionColor = t.fgNeutralMain;
  let iconColor = t.fgNeutralMain;

  if (selected) {
    bg = t.bgInfoSubtle;
    borderLeft = `1px solid ${t.fgSecondary}`;
    textColor = t.fgSecondary;
    captionColor = t.fgSecondary;
    iconColor = t.fgSecondary;
  } else if (hovered) {
    bg = 'rgba(158,158,158,0.12)';
  }

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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
        transition: 'background-color 100ms ease-out',
      }}
    >
      <FontAwesomeIcon
        icon={icon}
        style={{ fontSize: 18, color: iconColor, width: 24, textAlign: 'center', flexShrink: 0 }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
        <span style={{
          ...TYPE.pm600,
          fontFamily: 'Inter, sans-serif',
          color: textColor,
        }}>
          {label}
        </span>
        {caption && (
          <span style={{
            ...TYPE.ps400,
            fontFamily: 'Inter, sans-serif',
            color: captionColor,
          }}>
            {caption}
          </span>
        )}
      </div>
    </div>
  );
}

// ── web-menu-labels ─────────────────────────────────────────────────
// Spec: Navigation.md > web-menu-labels
// Small uppercase section label within nav-section sub-menus
// Color: Grey/04 #8F9BAE, bottom border: Border/Main 1px
// Padding: 8px top/bottom, 64px left
// Font: Inter 500 10px/12px

function WebMenuLabel({ label, darkMode }) {
  const t = darkMode ? DARK : LIGHT;
  return (
    <div style={{
      paddingTop: SPACING['2xs'],
      paddingBottom: SPACING['2xs'],
      paddingLeft: 64,
      paddingRight: SPACING.m,
      borderBottom: `1px solid ${t.borderMain}`,
    }}>
      <span style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: 10,
        fontWeight: 500,
        lineHeight: '12px',
        color: t.grey04,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
      }}>
        {label}
      </span>
    </div>
  );
}

// ── SubNavigationItem ───────────────────────────────────────────────
// Spec: Navigation.md > SubNavigationItem
// Padding: 12px top/bottom, 64px left, 24px right
// Content-to-icon spacing: 16px
// Title: Inter 600 14px/20px
// Amount: Inter 400 14px/20px
// Caption: Inter 400 12px/16px

function SubNavigationItem({ title, amount, caption, endIcon, selected, darkMode }) {
  const t = darkMode ? DARK : LIGHT;
  const [hovered, setHovered] = useState(false);

  let bg = 'transparent';
  let borderLeft = 'none';
  if (selected) {
    bg = t.bgNeutralTertiary;
    borderLeft = `0.6px solid ${t.fgNeutralMain}`;
  } else if (hovered) {
    bg = 'rgba(158,158,158,0.08)';
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: `${SPACING.xs}px ${SPACING.m}px ${SPACING.xs}px 64px`,
        backgroundColor: bg,
        borderLeft,
        cursor: 'pointer',
        boxSizing: 'border-box',
        transition: 'background-color 100ms ease-out',
      }}
    >
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
        <span style={{
          ...TYPE.pm600,
          fontFamily: 'Inter, sans-serif',
          color: t.fgNeutralMain,
        }}>
          {title}
        </span>
        {amount && (
          <span style={{
            ...TYPE.pm400,
            fontFamily: 'Inter, sans-serif',
            color: t.fgNeutralMain,
          }}>
            {amount}
          </span>
        )}
        {caption && (
          <span style={{
            ...TYPE.ps400,
            fontFamily: 'Inter, sans-serif',
            color: t.fgNeutralSecondary,
          }}>
            {caption}
          </span>
        )}
      </div>
      {endIcon && (
        <FontAwesomeIcon
          icon={endIcon}
          style={{ fontSize: 16, color: t.fgNeutralSecondary, flexShrink: 0, marginLeft: SPACING.s }}
        />
      )}
    </div>
  );
}

// ── nav-section ─────────────────────────────────────────────────────
// Spec: Navigation.md > nav-section
// States: Collapsed, Opened, Opened (Full), Opened (Selected)
// Collapsed: only AppNavigationItem header (40px)
// Opened (Selected): BG/Neutral Secondary tinted bg, elevated icon

// Sub-menu data per product
const NAV_SECTIONS = {
  Earn: {
    icon: faPiggyBank,
    groups: [
      {
        label: 'CASH',
        items: [
          { title: 'My Funds', amount: '$8,000.00 available' },
        ],
      },
      {
        label: 'ACTIONS',
        items: [
          { title: 'Add account', caption: 'Individual and joint', endIcon: faPlus },
        ],
      },
    ],
  },
  Invest: {
    icon: faChartLine,
    groups: [
      {
        label: 'BROKERAGE',
        items: [
          { title: 'My Portfolio', amount: '$17,000.00', caption: 'Invest up to $17,000 with margin' },
          { title: 'Long-term investments', amount: '$50,000.00' },
        ],
      },
      {
        label: 'RETIREMENT',
        items: [
          { title: 'Roth IRA', amount: '$25,123.98' },
        ],
      },
      {
        label: 'INSIGHTS',
        items: [
          { title: 'Concentration analysis', caption: 'By sector, asset, and region' },
        ],
      },
      {
        label: 'ACTIONS',
        items: [
          { title: 'Transfer to M1', caption: 'Partial or full account', endIcon: faArrowRightArrowLeft },
          { title: 'Add account', caption: 'Brokerage, retirement, and crypto', endIcon: faPlus },
        ],
      },
    ],
  },
  Borrow: {
    icon: faHandHoldingUsd,
    groups: [
      {
        label: 'MARGIN',
        items: [
          { title: 'Brokerage', amount: '$1,000.00 margin balance' },
        ],
      },
      {
        label: 'ACTIONS',
        items: [
          { title: 'Add a loan', caption: 'Personal or margin', endIcon: faPlus },
        ],
      },
    ],
  },
  Research: {
    icon: faMagnifyingGlass,
    groups: [
      {
        label: null,
        items: [
          { title: 'News' },
          { title: 'Stocks' },
          { title: 'Funds' },
          { title: 'Crypto' },
          { title: 'Model Portfolios' },
          { title: 'My Pies' },
          { title: 'Watchlist' },
        ],
      },
    ],
  },
};

function NavSection({ product, isOpen, isSelected, onToggle, darkMode }) {
  const t = darkMode ? DARK : LIGHT;
  const config = NAV_SECTIONS[product];
  const [headerHovered, setHeaderHovered] = useState(false);

  // Section background per spec: BG/Neutral Secondary when Opened (Selected)
  const sectionBg = isSelected && isOpen ? t.bgNeutralSecondary : 'transparent';
  const headerIconColor = isSelected ? t.fgSecondary : t.fgNeutralMain;
  const headerTextColor = isSelected ? t.fgSecondary : t.fgNeutralMain;

  let headerBg = 'transparent';
  if (isSelected && !isOpen) {
    headerBg = t.bgInfoSubtle;
  } else if (headerHovered && !isOpen) {
    headerBg = 'rgba(158,158,158,0.12)';
  }

  return (
    <div style={{
      backgroundColor: sectionBg,
      transition: 'background-color 200ms ease-out',
    }}>
      {/* Header — AppNavigationItem pattern */}
      <div
        onClick={onToggle}
        onMouseEnter={() => setHeaderHovered(true)}
        onMouseLeave={() => setHeaderHovered(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: SPACING.s,
          padding: `${SPACING['2xs']}px ${SPACING.m}px`,
          height: 40,
          backgroundColor: headerBg,
          borderLeft: isSelected && !isOpen ? `1px solid ${t.fgSecondary}` : '1px solid transparent',
          cursor: 'pointer',
          boxSizing: 'border-box',
          transition: 'background-color 100ms ease-out',
        }}
      >
        <FontAwesomeIcon
          icon={config.icon}
          style={{ fontSize: 18, color: headerIconColor, width: 24, textAlign: 'center', flexShrink: 0 }}
        />
        <span style={{
          ...TYPE.pm600,
          fontFamily: 'Inter, sans-serif',
          color: headerTextColor,
          flex: 1,
        }}>
          {product}
        </span>
        <FontAwesomeIcon
          icon={isOpen ? faChevronUp : faChevronDown}
          style={{ fontSize: 10, color: t.fgNeutralSecondary }}
        />
      </div>

      {/* Sub-menu — spec: 8px header-to-submenu spacing, 16px group spacing */}
      {isOpen && (
        <div style={{
          paddingTop: SPACING['2xs'],
          paddingBottom: SPACING['2xs'],
        }}>
          {config.groups.map((group, gi) => (
            <div key={gi} style={{ marginTop: gi > 0 ? SPACING.s : 0 }}>
              {group.label && (
                <WebMenuLabel label={group.label} darkMode={darkMode} />
              )}
              {group.items.map((item, ii) => (
                <SubNavigationItem
                  key={ii}
                  title={item.title}
                  amount={item.amount}
                  caption={item.caption}
                  endIcon={item.endIcon}
                  darkMode={darkMode}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Web-rail-nav ────────────────────────────────────────────────────
// Spec: Navigation.md > Web-rail-nav
// State=Expanded: 264px wide
// Zones: hot button (top), main nav (middle), footer (bottom)
// Footer: Taylor Maede, Disclosures, Help, Log out
// Section spacing: 24px
// Footer padding: 8px top, 24px bottom, 4px item spacing

export default function WebRailNav({ darkMode = false, selection = 'Settings' }) {
  const t = darkMode ? DARK : LIGHT;
  const [openSection, setOpenSection] = useState(null);

  function handleSectionToggle(product) {
    setOpenSection(openSection === product ? null : product);
  }

  const products = ['Earn', 'Invest', 'Borrow', 'Research'];

  return (
    <div style={{
      position: 'fixed',
      top: 56,
      left: 0,
      bottom: 0,
      width: 264,
      backgroundColor: t.bgNeutralPrimary,
      borderRight: `1px solid ${t.borderMain}`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxSizing: 'border-box',
      overflowY: 'auto',
      zIndex: 15,
    }}>
      {/* Top section */}
      <div>
        {/* M1 Intelligence button — Kind=Feature, Size=Medium, Default */}
        <div style={{ padding: `${SPACING.m}px ${SPACING['2xs']}px` }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            padding: '12px 24px',
            borderRadius: 24,
            backgroundColor: '#FFFFFF',
            cursor: 'pointer',
            height: 44,
            boxSizing: 'border-box',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Gradient border overlay — Gradient/Linear Feature Accent */}
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 24,
              padding: 1.5,
              background: 'linear-gradient(155deg, #2FAED9 20%, rgba(47,174,217,0.1) 43%, rgba(125,201,188,0.1) 50%, #7DC9BC 67%, #2FAED9 100%)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              pointerEvents: 'none',
            }} />
            <img src="/m1Intelligence20.svg" alt="" width={20} height={20} style={{ zIndex: 1 }} />
            <span style={{
              ...TYPE.pm600,
              fontFamily: 'Inter, sans-serif',
              color: '#1C2026',
              zIndex: 1,
            }}>
              M1 Intelligence
            </span>
            <span style={{
              ...TYPE.ps400,
              fontFamily: 'Inter, sans-serif',
              color: t.fgNeutralTertiary,
              zIndex: 1,
            }}>
              ⌘i
            </span>
          </div>
        </div>

        {/* Main nav — spec: 4px item spacing, 24px section spacing */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING['3xs'] }}>
          <AppNavigationItem
            icon={faHome}
            label="Home"
            selected={selection === 'Home'}
            darkMode={darkMode}
          />
          {products.map((product) => (
            <NavSection
              key={product}
              product={product}
              isOpen={openSection === product}
              isSelected={selection === product}
              onToggle={() => handleSectionToggle(product)}
              darkMode={darkMode}
            />
          ))}
        </div>
      </div>

      {/* Footer — spec: 1px top border, 8px padding top, 24px padding bottom, 4px item spacing */}
      {/* Items: Taylor Maede, Disclosures, Help, Log out */}
      <div style={{
        borderTop: `1px solid ${t.borderMain}`,
        paddingTop: SPACING['2xs'],
        paddingBottom: SPACING.m,
        display: 'flex',
        flexDirection: 'column',
        gap: SPACING['3xs'],
      }}>
        <AppNavigationItem
          icon={faUser}
          label="Taylor Maede"
          selected={selection === 'Settings'}
          darkMode={darkMode}
        />
        <AppNavigationItem
          icon={faFileLines}
          label="Disclosures"
          darkMode={darkMode}
        />
        <AppNavigationItem
          icon={faCircleQuestion}
          label="Help"
          darkMode={darkMode}
        />
        <AppNavigationItem
          icon={faRightFromBracket}
          label="Log out"
          darkMode={darkMode}
        />
      </div>
    </div>
  );
}
