import { LIGHT, DARK, SPACING } from '../tokens';

export default function WebFooter({ darkMode = false }) {
  const t = darkMode ? DARK : LIGHT;

  return (
    <div style={{
      borderTop: `1px solid ${t.borderMain}`,
      padding: `${SPACING.xs}px 80px`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: SPACING.s,
    }}>
      <span style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: 16,
        fontWeight: 400,
        lineHeight: '24px',
        letterSpacing: -0.25,
        color: t.fgPrimary,
        textDecoration: 'underline',
        cursor: 'pointer',
      }}>
        Disclosures
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.s }}>
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 14,
          fontWeight: 400,
          lineHeight: '20px',
          color: t.fgNeutralSecondary,
        }}>
          M1: The Finance Super App®
        </span>
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 14,
          fontWeight: 400,
          lineHeight: '20px',
          color: t.fgNeutralSecondary,
        }}>
          © Copyright 2026 M1 Holdings Inc.
        </span>
      </div>
    </div>
  );
}
