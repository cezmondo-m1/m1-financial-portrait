import { useState } from 'react';
import { LIGHT, DARK, SPACING, RADIUS } from '../tokens';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faExpand, faPlus, faEllipsisVertical, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const SUGGESTIONS = [
  'Did I earn dividends this month?',
  'Strategies to diversify my portfolio',
  "What's the latest market news?",
  'Am I out performing the S&P 500?',
  'Metrics to consider when evaluating holdings',
];

export default function M1IntelligencePanel({ darkMode = false, onClose }) {
  const t = darkMode ? DARK : LIGHT;
  const [activeTab, setActiveTab] = useState('Chat');
  const [inputValue, setInputValue] = useState('');

  return (
    <div style={{
      width: 360,
      flexShrink: 0,
      backgroundColor: t.bgNeutralPrimary,
      borderRight: `1px solid ${t.borderMain}`,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      boxSizing: 'border-box',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `${SPACING.s}px ${SPACING.m}px`,
        borderBottom: `1px solid ${t.borderMain}`,
      }}>
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 14,
          fontWeight: 400,
          lineHeight: '20px',
          color: '#1C2026',
        }}>
          New chat
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.xs }}>
          <FontAwesomeIcon icon={faExpand} style={{ fontSize: 16, color: '#546073', cursor: 'pointer' }} />
          <FontAwesomeIcon icon={faPlus} style={{ fontSize: 16, color: '#546073', cursor: 'pointer' }} />
          <FontAwesomeIcon icon={faEllipsisVertical} style={{ fontSize: 16, color: '#546073', cursor: 'pointer' }} />
          <FontAwesomeIcon icon={faTimes} style={{ fontSize: 18, color: '#546073', cursor: 'pointer' }} onClick={onClose} />
        </div>
      </div>

      {/* Tabs: Chat | History */}
      <div style={{
        display: 'flex',
        gap: 40,
        borderBottom: `1px solid #D4DBE6`,
        paddingLeft: SPACING.xs,
      }}>
        {['Chat', 'History'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
              fontWeight: activeTab === tab ? 600 : 400,
              lineHeight: '20px',
              color: activeTab === tab ? '#1C2026' : '#546073',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab ? '1px solid #1C2026' : '1px solid transparent',
              padding: '20px 12px 16px 12px',
              cursor: 'pointer',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Welcome content */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: `${SPACING.l}px ${SPACING.m}px`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: SPACING.m,
      }}>
        {/* Greeting text */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 22,
            fontWeight: 500,
            lineHeight: '28px',
            color: '#1F5B7A',
            marginBottom: SPACING.xs,
          }}>
            Join early <span style={{ fontStyle: 'italic' }}>beta</span> for
            <br />M1 Intelligence
          </div>
        </div>

        {/* M1 logo icon */}
        <div style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          border: '2px solid #B7D9E8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <img src="/m1Logo32.svg" alt="" width={40} height={40} style={{ opacity: 0.6 }} />
        </div>

        {/* Input field */}
        <div style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          border: '1px solid #8F9BAE',
          borderRadius: 12,
          padding: 12,
          backgroundColor: '#FFFFFF',
          boxSizing: 'border-box',
        }}>
          <input
            type="text"
            placeholder="Ask M1 Intelligence"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
              lineHeight: '20px',
              color: '#1C2026',
              backgroundColor: 'transparent',
            }}
          />
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 40,
            backgroundColor: '#E8ECF2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
          }}>
            <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: 14, color: '#546073' }} />
          </div>
        </div>

        {/* Disclaimer text */}
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 14,
          fontWeight: 400,
          lineHeight: '20px',
          color: '#546073',
          textAlign: 'center',
          margin: 0,
        }}>
          M1 Intelligence is powered by AI and relies on new and evolving technology. As a beta tester, you may run into errors and will need to verify information independently.
        </p>

        {/* Ask a question button */}
        <button style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 15,
          fontWeight: 600,
          lineHeight: '20px',
          color: '#FFFFFF',
          backgroundColor: '#1F5B7A',
          border: 'none',
          borderRadius: 30,
          padding: '14px 32px',
          cursor: 'pointer',
        }}>
          Ask a question
        </button>

        {/* Terms */}
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 12,
          fontWeight: 400,
          lineHeight: '16px',
          color: '#546073',
          textAlign: 'center',
          margin: 0,
        }}>
          By selecting "Ask a question", I agree to{' '}
          <span style={{ color: '#1F5B7A', cursor: 'pointer' }}>M1's AI Terms of Use</span>.
        </p>
      </div>
    </div>
  );
}
