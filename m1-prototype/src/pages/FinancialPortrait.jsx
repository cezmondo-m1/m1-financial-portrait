import { useState, useEffect, useRef } from 'react';
import { LIGHT, DARK, SPACING, RADIUS, TYPE } from '../tokens';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartLine, faBriefcase, faHouseChimney,
  faArrowRight, faChevronDown, faChevronUp,
  faExclamationTriangle, faCheckCircle, faShieldHalved,
} from '@fortawesome/free-solid-svg-icons';
import { FINANCIAL_PORTRAIT } from '../data/financialPortraitData';

function formatDollar(value) {
  const abs = Math.abs(Math.round(value));
  const formatted = '$' + abs.toLocaleString('en-US');
  return value < 0 ? '-' + formatted : formatted;
}

function formatPct(value) {
  return Math.abs(value).toFixed(1) + '%';
}

// ── Net Worth Hero ──────────────────────────────────────────────────

function NetWorthHero({ data, darkMode }) {
  const t = darkMode ? DARK : LIGHT;
  const totalValue = data.assetBreakdown.reduce((sum, s) => sum + s.value, 0);

  return (
    <div style={{
      background: darkMode
        ? `linear-gradient(135deg, #0C1931, #152B56)`
        : `linear-gradient(135deg, #152B56, #3C5A94)`,
      borderRadius: RADIUS.l,
      padding: SPACING.l,
      display: 'flex',
      flexDirection: 'column',
      gap: SPACING.s,
    }}>
      <div style={{
        ...TYPE.ps600,
        fontFamily: 'Inter, sans-serif',
        color: darkMode ? '#8F9BAE' : '#99ADD5',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
      }}>
        Net Worth
      </div>
      <div style={{
        ...TYPE.hl600,
        fontFamily: 'Inter, sans-serif',
        color: '#FFFFFF',
      }}>
        {formatDollar(data.netWorth)}
      </div>

      {/* Composition bar */}
      <div style={{
        display: 'flex',
        height: 8,
        borderRadius: RADIUS.xs,
        overflow: 'hidden',
        gap: 2,
        marginTop: SPACING['2xs'],
      }}>
        {data.assetBreakdown.map((segment, i) => (
          <div
            key={i}
            style={{
              flex: segment.value / totalValue,
              backgroundColor: t[segment.color] || segment.color,
              borderRadius: i === 0 ? '4px 0 0 4px' : i === data.assetBreakdown.length - 1 ? '0 4px 4px 0' : 0,
            }}
          />
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: SPACING.s, marginTop: SPACING['3xs'] }}>
        {data.assetBreakdown.map((segment, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: t[segment.color] || segment.color,
              flexShrink: 0,
            }} />
            <span style={{
              ...TYPE.ps400,
              fontFamily: 'Inter, sans-serif',
              color: darkMode ? '#8F9BAE' : '#CCD6EA',
            }}>
              {segment.label} {formatDollar(segment.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Wealth Narrative ────────────────────────────────────────────────

function WealthNarrative({ data, darkMode }) {
  const t = darkMode ? DARK : LIGHT;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: SPACING.m,
    }}>
      {/* Prose */}
      <p style={{
        ...TYPE.pl400,
        fontFamily: 'Inter, sans-serif',
        color: t.fgNeutralMain,
        margin: 0,
      }}>
        {data.narrative}
      </p>

      {/* Key insight bullets */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: SPACING.xs,
      }}>
        {data.insights.map((insight, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: SPACING.xs,
          }}>
            <div style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: t.fgSecondary,
              flexShrink: 0,
              marginTop: 9,
            }} />
            <span style={{
              ...TYPE.pm400,
              fontFamily: 'Inter, sans-serif',
              color: t.fgNeutralMain,
            }}>
              {insight}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Tension Callout ─────────────────────────────────────────────────

function TensionCallout({ tension, darkMode }) {
  const t = darkMode ? DARK : LIGHT;
  const hasTension = tension.hasTension;

  const bgColor = hasTension ? t.bgWarningSubtle : t.bgSuccessSubtle;
  const borderColor = hasTension ? t.borderWarning : t.borderSuccess;
  const iconColor = hasTension ? t.fgWarningShade : t.fgSuccess;
  const icon = hasTension ? faExclamationTriangle : faCheckCircle;
  const titleText = hasTension ? 'Tension detected' : 'Aligned';

  return (
    <div style={{
      backgroundColor: bgColor,
      border: `1px solid ${borderColor}`,
      borderRadius: RADIUS.m,
      padding: SPACING.m,
      display: 'flex',
      gap: SPACING.s,
    }}>
      <FontAwesomeIcon
        icon={icon}
        style={{ fontSize: 20, color: iconColor, flexShrink: 0, marginTop: 2 }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING['3xs'] }}>
        <span style={{
          ...TYPE.pm600,
          fontFamily: 'Inter, sans-serif',
          color: hasTension ? (darkMode ? '#DCC272' : t.fgWarningShade) : t.fgSuccess,
        }}>
          {titleText}
        </span>
        <span style={{
          ...TYPE.pm400,
          fontFamily: 'Inter, sans-serif',
          color: t.fgNeutralMain,
        }}>
          {tension.message}
        </span>
      </div>
    </div>
  );
}

// ── Scenario Button ─────────────────────────────────────────────────

const SCENARIO_ICONS = {
  marketDrop: faChartLine,
  jobLoss: faBriefcase,
  majorLifeEvent: faHouseChimney,
};

function ScenarioButton({ scenario, isSelected, onClick, darkMode }) {
  const t = darkMode ? DARK : LIGHT;

  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: SPACING.xs,
        padding: `${SPACING.m}px ${SPACING.s}px`,
        backgroundColor: isSelected ? t.bgInfoSubtle : t.bgNeutralPrimary,
        border: `1.5px solid ${isSelected ? t.borderActive : t.borderMain}`,
        borderRadius: RADIUS.m,
        cursor: 'pointer',
        transition: 'all 200ms ease-out',
      }}
    >
      <FontAwesomeIcon
        icon={SCENARIO_ICONS[scenario.id]}
        style={{
          fontSize: 24,
          color: isSelected ? t.fgPrimary : t.fgNeutralSecondary,
        }}
      />
      <span style={{
        ...TYPE.pm600,
        fontFamily: 'Inter, sans-serif',
        color: t.fgNeutralMain,
        textAlign: 'center',
      }}>
        {scenario.label}
      </span>
      <span style={{
        ...TYPE.pxs400,
        fontFamily: 'Inter, sans-serif',
        color: t.fgNeutralSecondary,
        textAlign: 'center',
      }}>
        {scenario.description}
      </span>
    </button>
  );
}

// ── Animated Number ─────────────────────────────────────────────────

function AnimatedNumber({ value, format = 'dollar', duration = 1200 }) {
  const [displayValue, setDisplayValue] = useState(value);
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const fromRef = useRef(value);

  useEffect(() => {
    const from = fromRef.current;
    const to = value;
    if (from === to) return;

    const startTime = performance.now();
    startRef.current = startTime;

    function animate(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = from + (to - from) * eased;
      setDisplayValue(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        fromRef.current = to;
      }
    }

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value, duration]);

  if (format === 'dollar') return formatDollar(displayValue);
  if (format === 'pct') return formatPct(displayValue);
  if (format === 'months') return displayValue.toFixed(1);
  return Math.round(displayValue);
}

// ── Metric Card ─────────────────────────────────────────────────────

function MetricCard({ label, beforeValue, afterValue, format, suffix, isNegative, darkMode }) {
  const t = darkMode ? DARK : LIGHT;

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: SPACING['3xs'],
    }}>
      <span style={{
        ...TYPE.ps600,
        fontFamily: 'Inter, sans-serif',
        color: t.fgNeutralSecondary,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
      }}>
        {label}
      </span>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: SPACING['2xs'] }}>
        <span style={{
          ...TYPE.hxs600,
          fontFamily: 'Inter, sans-serif',
          color: isNegative ? t.fgCritical : t.fgNeutralMain,
        }}>
          <AnimatedNumber value={afterValue} format={format} />
          {suffix || ''}
        </span>
      </div>
      <span style={{
        ...TYPE.pxs400,
        fontFamily: 'Inter, sans-serif',
        color: t.fgNeutralSecondary,
      }}>
        was {format === 'dollar' ? formatDollar(beforeValue) : format === 'pct' ? formatPct(beforeValue) : beforeValue.toFixed(1)}{suffix || ''}
      </span>
    </div>
  );
}

// ── Asset Bar Comparison ────────────────────────────────────────────

function AssetBarComparison({ results, darkMode }) {
  const t = darkMode ? DARK : LIGHT;

  const categories = [
    {
      label: 'Investments',
      before: results.before.investments,
      after: results.after.investments,
      color: t.chartDatapoint2,
    },
    {
      label: 'Real estate',
      before: results.before.realEstate,
      after: results.after.realEstate,
      color: t.chartDatapoint1,
    },
  ];

  const maxValue = Math.max(...categories.map(c => Math.max(c.before, c.after)));

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: SPACING.m,
    }}>
      <div style={{
        ...TYPE.pm600,
        fontFamily: 'Inter, sans-serif',
        color: t.fgNeutralMain,
      }}>
        Asset composition shift
      </div>

      {categories.map((cat, i) => {
        const beforePct = (cat.before / maxValue) * 100;
        const afterPct = (cat.after / maxValue) * 100;
        const declined = cat.after < cat.before;

        return (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: SPACING['3xs'] }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span style={{
                ...TYPE.ps400,
                fontFamily: 'Inter, sans-serif',
                color: t.fgNeutralMain,
              }}>
                {cat.label}
              </span>
              <span style={{
                ...TYPE.ps400,
                fontFamily: 'Inter, sans-serif',
                color: declined ? t.fgCritical : t.fgNeutralSecondary,
              }}>
                {formatDollar(cat.after)} {declined ? `(−${formatDollar(cat.before - cat.after).slice(1)})` : ''}
              </span>
            </div>

            {/* Before bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: SPACING['2xs'],
            }}>
              <span style={{
                ...TYPE.pxs400,
                fontFamily: 'Inter, sans-serif',
                color: t.fgNeutralSecondary,
                width: 48,
                textAlign: 'right',
                flexShrink: 0,
              }}>
                Current
              </span>
              <div style={{
                flex: 1,
                height: 12,
                backgroundColor: t.bgNeutralTertiary,
                borderRadius: RADIUS.xs,
                overflow: 'hidden',
              }}>
                <div style={{
                  width: `${beforePct}%`,
                  height: '100%',
                  backgroundColor: cat.color,
                  borderRadius: RADIUS.xs,
                  transition: 'width 1200ms cubic-bezier(0.22, 1, 0.36, 1)',
                }} />
              </div>
            </div>

            {/* After bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: SPACING['2xs'],
            }}>
              <span style={{
                ...TYPE.pxs400,
                fontFamily: 'Inter, sans-serif',
                color: t.fgNeutralSecondary,
                width: 48,
                textAlign: 'right',
                flexShrink: 0,
              }}>
                After
              </span>
              <div style={{
                flex: 1,
                height: 12,
                backgroundColor: t.bgNeutralTertiary,
                borderRadius: RADIUS.xs,
                overflow: 'hidden',
              }}>
                <div style={{
                  width: `${afterPct}%`,
                  height: '100%',
                  backgroundColor: cat.color,
                  opacity: declined ? 0.5 : 1,
                  borderRadius: RADIUS.xs,
                  transition: 'width 1200ms cubic-bezier(0.22, 1, 0.36, 1)',
                }} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Stress Test Results ─────────────────────────────────────────────

function StressTestResults({ scenarioId, results, darkMode }) {
  const t = darkMode ? DARK : LIGHT;
  const [showExplanation, setShowExplanation] = useState(true);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: SPACING.m,
      animation: 'fadeSlideIn 400ms ease-out',
    }}>
      {/* Before / After metric cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: SPACING.s,
      }}>
        <MetricCard
          label="Net worth"
          beforeValue={results.before.netWorth}
          afterValue={results.after.netWorth}
          format="dollar"
          isNegative={results.netWorthChange < 0}
          darkMode={darkMode}
        />
        <MetricCard
          label="Liquidity runway"
          beforeValue={results.before.liquidityRunway}
          afterValue={results.after.liquidityRunway}
          format="months"
          suffix=" mo"
          isNegative={results.after.liquidityRunway < results.before.liquidityRunway}
          darkMode={darkMode}
        />
        <MetricCard
          label="Debt-to-asset"
          beforeValue={results.before.debtToAssetRatio}
          afterValue={results.after.debtToAssetRatio}
          format="pct"
          suffix=""
          isNegative={results.after.debtToAssetRatio > results.before.debtToAssetRatio}
          darkMode={darkMode}
        />
      </div>

      {/* Asset composition shift */}
      <div style={{
        backgroundColor: t.bgNeutralSecondary,
        borderRadius: RADIUS.m,
        padding: SPACING.m,
      }}>
        <AssetBarComparison results={results} darkMode={darkMode} />
      </div>

      {/* Hardest hit */}
      {results.hardestHit && results.hardestHit.length > 0 && (
        <div style={{
          display: 'flex',
          gap: SPACING.s,
        }}>
          {results.hardestHit.map((hit, i) => (
            <div key={i} style={{
              flex: 1,
              backgroundColor: t.bgCriticalSubtle,
              border: `1px solid ${t.borderCritical}`,
              borderRadius: RADIUS.s,
              padding: `${SPACING.xs}px ${SPACING.s}px`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span style={{
                ...TYPE.pm400,
                fontFamily: 'Inter, sans-serif',
                color: t.fgNeutralMain,
              }}>
                {hit.label}
              </span>
              <span style={{
                ...TYPE.pm600,
                fontFamily: 'Inter, sans-serif',
                color: t.fgCritical,
              }}>
                −{hit.lossPct}% (−{formatDollar(hit.lossAmount).slice(1)})
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Here's why (auto-expanded) */}
      <div style={{
        backgroundColor: t.bgNeutralPrimary,
        border: `1px solid ${t.borderMain}`,
        borderRadius: RADIUS.m,
        overflow: 'hidden',
      }}>
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: `${SPACING.s}px ${SPACING.m}px`,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <span style={{
            ...TYPE.pm600,
            fontFamily: 'Inter, sans-serif',
            color: t.fgNeutralMain,
          }}>
            Here's why
          </span>
          <FontAwesomeIcon
            icon={showExplanation ? faChevronUp : faChevronDown}
            style={{ fontSize: 12, color: t.fgNeutralSecondary }}
          />
        </button>
        {showExplanation && (
          <div style={{
            padding: `0 ${SPACING.m}px ${SPACING.m}px`,
          }}>
            <p style={{
              ...TYPE.pm400,
              fontFamily: 'Inter, sans-serif',
              color: t.fgNeutralMain,
              margin: 0,
            }}>
              {results.explanation}
            </p>
          </div>
        )}
      </div>

      {/* CTA */}
      <div style={{
        display: 'flex',
        gap: SPACING.s,
        alignItems: 'center',
      }}>
        <button style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: SPACING['2xs'],
          fontFamily: 'Inter, sans-serif',
          ...TYPE.pm600,
          color: darkMode ? '#1C2026' : '#FFFFFF',
          backgroundColor: t.fgPrimary,
          border: 'none',
          borderRadius: RADIUS.xl,
          padding: `${SPACING.xs}px ${SPACING.m}px`,
          cursor: 'pointer',
          transition: 'background-color 200ms ease-out',
        }}>
          Adjust your portfolio
          <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: 12 }} />
        </button>
        <span style={{
          ...TYPE.ps400,
          fontFamily: 'Inter, sans-serif',
          color: t.fgNeutralSecondary,
        }}>
          Rebalance to reduce concentration risk
        </span>
      </div>
    </div>
  );
}

// ── Main Financial Portrait Page ────────────────────────────────────

export default function FinancialPortrait({ darkMode = false }) {
  const t = darkMode ? DARK : LIGHT;
  const data = FINANCIAL_PORTRAIT;
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [stressResults, setStressResults] = useState(null);
  const resultsRef = useRef(null);

  const scenarios = [
    data.stressTests.marketDrop,
    data.stressTests.jobLoss,
    data.stressTests.majorLifeEvent,
  ];

  function handleScenarioSelect(scenario) {
    setSelectedScenario(scenario.id);
    const results = scenario.calculate();
    setStressResults(results);

    // Scroll to results after render
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: SPACING.l,
      maxWidth: 720,
    }}>
      {/* Page title */}
      <h1 style={{
        ...TYPE.hxxs300,
        fontFamily: 'Inter, sans-serif',
        color: t.fgNeutralMain,
        margin: 0,
      }}>
        Financial Portrait
      </h1>

      {/* Net worth hero */}
      <NetWorthHero data={data} darkMode={darkMode} />

      {/* Wealth narrative */}
      <WealthNarrative data={data} darkMode={darkMode} />

      {/* Tension callout */}
      <TensionCallout tension={data.tension} darkMode={darkMode} />

      {/* Divider */}
      <div style={{
        height: 1,
        backgroundColor: t.borderMain,
      }} />

      {/* Stress test section */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: SPACING.m,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.xs }}>
          <FontAwesomeIcon icon={faShieldHalved} style={{ fontSize: 20, color: t.fgPrimary }} />
          <span style={{
            ...TYPE.pxl600,
            fontFamily: 'Inter, sans-serif',
            color: t.fgNeutralMain,
          }}>
            Test Your Resilience
          </span>
        </div>

        <p style={{
          ...TYPE.pm400,
          fontFamily: 'Inter, sans-serif',
          color: t.fgNeutralSecondary,
          margin: 0,
        }}>
          See how your finances hold up under different stress scenarios. Pick one to run.
        </p>

        {/* Scenario buttons */}
        <div style={{
          display: 'flex',
          gap: SPACING.s,
        }}>
          {scenarios.map((scenario) => (
            <ScenarioButton
              key={scenario.id}
              scenario={scenario}
              isSelected={selectedScenario === scenario.id}
              onClick={() => handleScenarioSelect(scenario)}
              darkMode={darkMode}
            />
          ))}
        </div>
      </div>

      {/* Stress test results */}
      {stressResults && (
        <div ref={resultsRef}>
          <StressTestResults
            scenarioId={selectedScenario}
            results={stressResults}
            darkMode={darkMode}
          />
        </div>
      )}
    </div>
  );
}
