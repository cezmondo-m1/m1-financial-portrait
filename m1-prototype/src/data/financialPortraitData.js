// Financial Portrait data — derived dynamically from balance sheet + cash flow inputs
import { BALANCE_SHEET } from './balanceSheetData';

const bs = BALANCE_SHEET;

// Compute liquid assets from balance sheet subcategories
const cashAndSavings = bs.assets.cashAndSavings.subcategories.reduce((sum, s) => sum + s.total, 0);
const liquidAssets = cashAndSavings;

// Compute from composition totals (these are the canonical aggregates)
const investmentAssets = bs.assetComposition.find(a => a.label === 'Investable assets')?.value ?? 0;
const realEstateAssets = bs.assetComposition.find(a => a.label === 'Real estate')?.value ?? 0;
const otherAssets = bs.assetComposition.find(a => a.label === 'Other significant assets')?.value ?? 0;

const totalAssets = bs.totalAssets;
const totalLiabilities = bs.totalLiabilities;
const netWorth = bs.netWorth;
const riskTolerance = bs.riskTolerance;

export function buildFinancialPortrait(monthlyExpenses = bs.monthlyExpenses, annualIncome = 175000) {
  // Derived metrics
  const liquidityRunwayMonths = parseFloat((liquidAssets / monthlyExpenses).toFixed(1));
  const debtToAssetRatio = parseFloat(((totalLiabilities / totalAssets) * 100).toFixed(1));
  const realEstateConcentration = parseFloat(((realEstateAssets / totalAssets) * 100).toFixed(1));
  const investmentAllocationPct = parseFloat(((investmentAssets / totalAssets) * 100).toFixed(1));
  const savingsRate = annualIncome > 0 ? parseFloat((((annualIncome - monthlyExpenses * 12) / annualIncome) * 100).toFixed(1)) : 0;

  return {
    // Snapshot
    netWorth,
    totalAssets,
    totalLiabilities,
    liquidAssets,
    investmentAssets,
    realEstateAssets,
    otherAssets,
    monthlyExpenses,
    annualIncome,
    riskTolerance,

    // Derived
    liquidityRunwayMonths,
    debtToAssetRatio,
    realEstateConcentration,
    investmentAllocationPct,
    savingsRate,

    // Asset composition for chart
    assetBreakdown: bs.assetComposition.map(item => ({
      label: item.label,
      value: item.value,
      color: item.color,
    })),

    // Liability composition for chart
    liabilityBreakdown: bs.liabilityComposition.map(item => ({
      label: item.label,
      value: item.value,
      color: item.color,
    })),

    // Narrative (mock Claude output)
    narrative: `Your $${(realEstateAssets / 1000000).toFixed(1)} million in real estate represents ${realEstateConcentration}% of your net worth. It's your foundation, but it limits flexibility. Your investment portfolio is lean at ${investmentAllocationPct}%, suggesting conservative growth instincts. You carry manageable debt, but your liquidity is thin.`,

    // Key insight bullets
    insights: [
      `${realEstateConcentration}% of wealth locked in illiquid real estate`,
      `Investment portfolio underweight relative to asset base`,
      `Manageable debt-to-asset ratio (${debtToAssetRatio}%)`,
      `Liquidity covers ~${liquidityRunwayMonths} months of expenses`,
    ],

    // Tension callout
    tension: {
      hasTension: true,
      message: `Your stated risk tolerance is ${riskTolerance}, but your actual allocation skews conservative. Your cash reserves cover ${liquidityRunwayMonths} months of expenses—below the 3–6 month threshold for your asset profile.`,
    },

    // Stress test scenarios
    stressTests: {
      marketDrop: {
        id: 'marketDrop',
        label: 'Market Drop 30%',
        description: 'Equities decline 30%, real estate softens 5–10%',
        calculate: () => {
          const newInvestments = Math.round(investmentAssets * 0.7);
          const newRealEstate = Math.round(realEstateAssets * 0.93);
          const newOther = otherAssets;
          const newLiquid = liquidAssets;
          const newTotalAssets = newInvestments + newRealEstate + newOther + newLiquid;
          const newNetWorth = newTotalAssets - totalLiabilities;
          const newLiquidityRunway = parseFloat((newLiquid / monthlyExpenses).toFixed(1));
          const newDebtToAsset = parseFloat(((totalLiabilities / newTotalAssets) * 100).toFixed(1));

          return {
            before: { netWorth, liquidityRunway: liquidityRunwayMonths, debtToAssetRatio, investments: investmentAssets, realEstate: realEstateAssets },
            after: { netWorth: newNetWorth, liquidityRunway: newLiquidityRunway, debtToAssetRatio: newDebtToAsset, investments: newInvestments, realEstate: newRealEstate },
            netWorthChange: newNetWorth - netWorth,
            netWorthChangePct: parseFloat((((newNetWorth - netWorth) / netWorth) * 100).toFixed(1)),
            explanation: `Your $${(investmentAssets / 1000).toFixed(0)}k investment portfolio would decline to ~$${(newInvestments / 1000).toFixed(0)}k, a 30% hit. This reduces your total net worth from $${(netWorth / 1000).toFixed(0)}k to $${(newNetWorth / 1000).toFixed(0)}k (${Math.abs(parseFloat((((newNetWorth - netWorth) / netWorth) * 100).toFixed(1)))}% overall). Your liquidity runway remains at ${newLiquidityRunway} months—cash is unaffected.`,
            hardestHit: [
              { label: 'Investments', lossPct: 30, lossAmount: investmentAssets - newInvestments },
              { label: 'Real estate', lossPct: 7, lossAmount: realEstateAssets - newRealEstate },
            ],
          };
        },
      },
      jobLoss: {
        id: 'jobLoss',
        label: 'Job Loss',
        description: 'Primary income removed, liquid assets sustain expenses',
        calculate: () => {
          const monthsOfRunway = parseFloat((liquidAssets / monthlyExpenses).toFixed(1));
          const hitsZeroBefore6 = monthsOfRunway < 6;

          return {
            before: { netWorth, liquidityRunway: liquidityRunwayMonths, debtToAssetRatio, investments: investmentAssets, realEstate: realEstateAssets },
            after: { netWorth, liquidityRunway: monthsOfRunway, debtToAssetRatio, investments: investmentAssets, realEstate: realEstateAssets },
            netWorthChange: 0,
            netWorthChangePct: 0,
            monthsUntilDepleted: monthsOfRunway,
            hitsZeroBefore6,
            explanation: `You'd deplete liquid reserves in ${monthsOfRunway} months at your current $${monthlyExpenses.toLocaleString()}/month spending rate. ${hitsZeroBefore6 ? `That's below the 6-month emergency threshold—you'd need to liquidate investments or access other assets to cover expenses.` : `You have a reasonable buffer, but consider rebuilding to a 6-month target.`} Your net worth isn't immediately impacted, but sustained job loss would erode your cash position quickly.`,
            hardestHit: [
              { label: 'Cash & savings', lossPct: 100, lossAmount: liquidAssets },
            ],
          };
        },
      },
      majorLifeEvent: {
        id: 'majorLifeEvent',
        label: 'Major Life Event',
        description: 'Large unexpected expense drains 25% of liquid assets',
        calculate: () => {
          const drainAmount = Math.round(liquidAssets * 0.25);
          const newLiquid = liquidAssets - drainAmount;
          const newTotalAssets = totalAssets - drainAmount;
          const newNetWorth = newTotalAssets - totalLiabilities;
          const newLiquidityRunway = parseFloat((newLiquid / monthlyExpenses).toFixed(1));
          const newDebtToAsset = parseFloat(((totalLiabilities / newTotalAssets) * 100).toFixed(1));

          return {
            before: { netWorth, liquidityRunway: liquidityRunwayMonths, debtToAssetRatio, investments: investmentAssets, realEstate: realEstateAssets },
            after: { netWorth: newNetWorth, liquidityRunway: newLiquidityRunway, debtToAssetRatio: newDebtToAsset, investments: investmentAssets, realEstate: realEstateAssets },
            netWorthChange: newNetWorth - netWorth,
            netWorthChangePct: parseFloat((((newNetWorth - netWorth) / netWorth) * 100).toFixed(1)),
            drainAmount,
            explanation: `A $${(drainAmount / 1000).toFixed(0)}k expense consumes 25% of your liquid reserves. Your liquidity runway drops from ${liquidityRunwayMonths} to ${newLiquidityRunway} months. Net worth impact is modest at ${Math.abs(parseFloat((((newNetWorth - netWorth) / netWorth) * 100).toFixed(1)))}%.`,
            hardestHit: [
              { label: 'Cash & savings', lossPct: 25, lossAmount: drainAmount },
            ],
          };
        },
      },
    },
  };
}

// Default export for backward compatibility
export const FINANCIAL_PORTRAIT = buildFinancialPortrait();
