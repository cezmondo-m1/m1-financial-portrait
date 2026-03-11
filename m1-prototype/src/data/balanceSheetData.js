// Mock balance sheet data matching the Figma Hi-Fi reference
// Node 12496:132817 — "Balance sheet-Filledout - Max state - All categories"

export const BALANCE_SHEET = {
  totalAssets: 2107849,
  totalLiabilities: 180200,
  netWorth: 1927649,

  assetComposition: [
    { label: 'Investable assets', value: 345360, color: 'chartDatapoint3' },
    { label: 'Real estate', value: 1700000, color: 'chartDatapoint2' },
    { label: 'Other significant assets', value: 62489, color: 'chartDatapoint1' },
  ],

  liabilityComposition: [
    { label: 'Mortgage', value: 125000, color: '#D6A55C' },
    { label: 'Credit cards', value: 5050, color: '#F4E0A2' },
    { label: 'Other debts and loans', value: 50150, color: '#EDD17B' },
  ],

  assets: {
    cashAndSavings: {
      label: 'Cash and savings',
      subcategories: [
        {
          label: 'Total cash and savings accounts',
          total: 62489,
          items: [
            { name: 'M1 High-Yield Cash Account - 0282', institution: 'M1 Finance', value: 62489 },
            { name: 'Everyday savings – 3068', institution: 'Chase', value: 1000 },
          ],
        },
        {
          label: 'Total checking accounts',
          total: 500,
          items: [
            { name: 'Everyday checking – 1234', institution: 'Bank of America', value: 500 },
          ],
        },
        {
          label: 'Total physical cash',
          total: 1000,
          items: [],
        },
      ],
      cta: { label: 'Open M1 Earn account' },
    },
    investments: {
      label: 'Investments',
      subcategories: [
        {
          label: 'Retirement',
          total: 62489,
          items: [
            { name: 'Traditional IRA', institution: 'M1 Finance', value: 62489 },
            { name: 'SEP IRA', institution: 'M1 Finance', value: 62489 },
            { name: 'Roth IRA', institution: 'M1 Finance', value: 62489 },
          ],
        },
        {
          label: 'Brokerage',
          total: 76200,
          items: [
            { name: 'Individual - 028', institution: 'M1 Finance', value: 50000 },
            { name: 'Individual - 123', institution: '[External institution name]', value: 0 },
          ],
        },
        {
          label: 'Health',
          total: 76200,
          items: [
            { name: 'Individual - 028', institution: 'M1 Finance', value: 50000 },
            { name: 'Individual - 123', institution: '[External institution name]', value: 0 },
          ],
        },
        {
          label: 'Crypto',
          total: 76200,
          items: [
            { name: 'Individual - 028', institution: 'M1 Finance', value: 50000 },
            { name: 'Individual - 123', institution: '[External institution name]', value: 0 },
          ],
        },
      ],
      cta: { label: 'Open M1 Invest account' },
    },
    realEstate: {
      label: 'Real estate',
      subcategories: [
        {
          label: 'Total real estate value',
          total: 1175000,
          items: [
            { name: 'Primary property estimated value', value: 1175000 },
          ],
        },
      ],
    },
    otherAssets: {
      label: 'Other significant assets',
      subcategories: [
        {
          label: 'Total other assets',
          total: 70000,
          items: [
            { name: 'Auto', value: 15000 },
            { name: 'Engagement ring', value: 55000 },
          ],
        },
      ],
    },
  },

  liabilities: {
    mortgage: {
      label: 'Mortgage',
      subcategories: [
        {
          label: 'Total mortgage balance',
          total: 125000,
          items: [
            { name: '6.25%', institution: 'Vacation property', value: 125000 },
          ],
        },
      ],
    },
    creditCards: {
      label: 'Credit cards',
      subcategories: [
        {
          label: 'Total credit card debt',
          total: 125000,
          items: [
            { name: '22.9% APR', institution: 'Chase Sapphire Preferred', value: 1850 },
            { name: '22.9% APR', institution: 'AMEX Gold', value: 3200 },
          ],
        },
      ],
    },
    otherLoans: {
      label: 'Other loans or debts',
      subcategories: [
        {
          label: 'Total other debt',
          total: 50150,
          items: [
            { name: 'Auto loan • 22.9% APR', institution: '2022 Tesla Model Y', value: 28400 },
            { name: 'Student loan • 22.9% APR', institution: 'Federal Direct', value: 21750 },
          ],
        },
      ],
    },
  },

  riskTolerance: 'moderate',
  monthlyExpenses: 6500,
};
