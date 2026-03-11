# Balance Sheet — Figma Reference

> Extracted from Figma file `GnnnAWqvszwSFUMX3rgOmw` ("ECP - Balance Sheet")
> Node: `12496:132817` — "Balance sheet-Filledout - Max state - All categories"
> Screenshot: `reference-balance-sheet.png`

---

## Page Structure (1620x2673)

```
FRAME "Balance sheet-Filledout - Max state - All categories" (1620x2673, fill=#ffffff)
├── FRAME "Web-rail-nav" (264x2617) — Left sidebar navigation
├── FRAME "Web-L3-nav" (1620x56) — Top header bar
├── FRAME "Full width" (1356x2617) — Main content area
│   ├── FRAME "Tab group" — Primary tabs (About you, Your finances*, M1 accounts, ...)
│   ├── FRAME "Tab bar" — Sub-pills (Balance sheet*, Cash flow, Investment profile, Investor disclosures)
│   ├── INSTANCE "Financial Outlook Header" — Page title "Balance sheet"
│   ├── FRAME (two-column layout, 588px + 588px)
│   │   ├── LEFT COLUMN — Assets
│   │   │   ├── Total assets card (summary)
│   │   │   ├── "Add asset" button
│   │   │   ├── Cash and savings section
│   │   │   ├── Investments section
│   │   │   ├── Real estate section
│   │   │   └── Other significant assets section
│   │   └── RIGHT COLUMN — Liabilities
│   │       ├── Total liabilities card (summary)
│   │       ├── "Add liability" button
│   │       ├── Mortgage section
│   │       ├── Credit cards section
│   │       └── Other loans or debts section
│   ├── INSTANCE "Links" — Disclosures link
│   └── LINE — Divider
```

---

## Primary Tab Bar (Top-Level Navigation)

Component: `Tab states`

| Tab | Font | Color | State |
|-----|------|-------|-------|
| About you | Inter 400 16px | `#1C2026` | Default |
| **Your finances** | Inter 600 16px | `#1C2026` | Active (bottom border `#1C2026`) |
| M1 accounts | Inter 400 16px | `#1C2026` | Default |
| Documents | Inter 400 16px | `#1C2026` | Default |
| Security | Inter 400 16px | `#1C2026` | Default |
| Preferences | Inter 400 16px | `#1C2026` | Default |
| Platform fee | Inter 400 16px | `#1C2026` | Default |

Layout: HORIZONTAL, padding 16px/12px, each tab ~100-128px wide, 56px tall

---

## Sub-Pills Bar (Section Navigation)

Component: `Tab states` (pill variant)

| Pill | Font | Color | Background | Border | State |
|------|------|-------|------------|--------|-------|
| **Balance sheet** | Inter 600 14px | `#1C2026` | `#E8EDF5` (BG/Info Subtle) | `#99ADD5` (Border/Info) | Active |
| Cash flow | Inter 400 14px | `#546073` | transparent | `#D4DBE6` (Border/Main) | Default |
| Investment profile | Inter 400 14px | `#546073` | transparent | `#D4DBE6` (Border/Main) | Default |
| Investor disclosures | Inter 400 14px | `#546073` | transparent | `#D4DBE6` (Border/Main) | Default |

Layout: HORIZONTAL, gap=8px, pill radius=24px, pill padding=8px/16px

---

## Page Title

Component: `Financial Outlook Header` (comp `10557:23625`)

- Text: "Balance sheet"
- Font: Inter 300 20px/28px (HXXS/300)
- Color: `#1C2026` (FG/Neutral Main)

---

## Summary Cards (Total Assets / Total Liabilities)

Component: `Total assets card` (comp `12050:115744`)

### Layout
- Size: 588x232
- Padding: 24px all sides
- Radius: 12px (Radius/M)
- Border: 1px `#D4DBE6` (Border/Main)
- Fill: `#FFFFFF` (BG/Neutral Primary)
- Internal gap: 6px (vertical), then 16px between sub-sections

### Content Structure
1. **Label:** "Total assets" / "Total liabilities" — Inter 600 18px, `#000000`
2. **Value:** "$2,107,849" / "$180,200" — Inter 600 28px/32px (HS/600), `#152B56` (FG/Secondary)
3. **Composition label:** "Composition" — Inter 600 12px/16px (PS/600), `#000000`
4. **Composition bar:** Stacked horizontal bar, 540px wide, 7px tall
   - Assets bar colors: `#CCD6EA` (Blue/02), `#99ADD5` (Blue/03), `#3C5A94` (Blue/04), `#D4DBE6` (Grey/03)
   - Liabilities bar colors: similar blue palette
5. **Legend:** Vertical list with colored dots (8x8 ellipses), gap=6px
   - Text: Inter 400 14px/20px (PM/400), `#000000`
   - Dot colors match bar segments

### Sample Data
**Assets:**
- Investable assets $345,360 (dot: `#D4DBE6`)
- Real estate $1,700,000 (dot: `#99ADD5`)
- Other significant assets $62,489 (dot: `#3C5A94`)

**Liabilities:**
- Mortgage $125,000
- Credit cards $5,050
- Other debts and loans $50,150

---

## Action Buttons (Add Asset / Add Liability)

Component: `Buttons` (comp `7679:5917` — Secondary/Outlined variant)

- Text: "Add asset" / "Add liability" — Inter 600 13px, `#2A7DA7` (FG/Primary)
- Icon: add20 (plus icon), `#2A7DA7`
- Border: `#2A7DA7` (Border/Active)
- Radius: ~22px (pill shape)
- Padding: ~11px/15px/11px/22px
- Size: 139x41

---

## Category Section Pattern

Each asset/liability category follows the same pattern:

### Section Header
Component: `Main section` (comp `11690:11999`)

- Layout: VERTICAL, gap=8px, bottom padding=16px
- Bottom border: `#99ADD5` (Blue/03 — acts as accent separator)
- Title: Inter 600 18px/24px (PXL/600), `#1C2026`
- Edit icon: 24x24 pencil icon, fill `#2A7DA7`, right-aligned

### Total Row
Component: `Total section` (comp `11690:12003`)

- Layout: HORIZONTAL, gap=24px
- Label: Inter 600 16px/24px (PL/600), `#1C2026`
- Value: Inter 600 16px/24px (PL/600), `#1C2026`, right-aligned

### List Item Row
Component: `List item` (comp `11690:12000`)

- Size: 588x72
- Layout: HORIZONTAL, gap=24px
- Padding: 12px top/bottom
- Border bottom: 1px `#D4DBE6` (Border/Main) — between items, not on last
- **Line 1:** Account name (Inter 400 16px, `#1C2026`) + Value (Inter 400 16px, `#1C2026`, right-aligned)
- **Line 2:** Institution (Inter 400 14px, `#546073` — FG/Neutral Secondary)
- Internal gap: 4px between lines

### Category Spacing
- Between categories: gap=64px
- Between sub-categories (within Investments): gap=32px
- Between Total row and list items: continuous vertical flow
- Between summary card and first category: gap=54px

---

## Sample Data Values

### Assets (Left Column, 588px)

| Category | Sub-category | Item | Institution | Value |
|----------|-------------|------|-------------|-------|
| Cash and savings | Total cash and savings | | | $62,489 |
| | Savings | M1 High-Yield Cash Account - 0282 | M1 Finance | $62,489 |
| | Savings | Everyday savings – 3068 | Chase | $1,000 |
| | Total checking | | | $500 |
| | Checking | Everyday checking – 1234 | Bank of America | $500 |
| | Total physical cash | | | $1,000 |
| Investments | Retirement | | | $62,489 |
| | | Traditional IRA | M1 Finance | $62,489 |
| | | SEP IRA | M1 Finance | $62,489 |
| | | Roth IRA | M1 Finance | $62,489 |
| | Brokerage | | | $76,200 |
| | | Individual - 028 | M1 Finance | $50,000 |
| | | Individual - 123 | [External institution] | $0 |
| | Health | | | $76,200 |
| | Crypto | | | $76,200 |
| Real estate | Total real estate | | | $1,175,000 |
| | | Primary property estimated value | | $1,175,000 |
| Other significant assets | Total other assets | | | $70,000 |

### Liabilities (Right Column, 588px)

| Category | Item | Detail | Value |
|----------|------|--------|-------|
| Mortgage | Total mortgage balance | | $125,000 |
| | 6.25% | Vacation property | $125,000 |
| Credit cards | Total credit card debt | | $125,000 |
| | 22.9% APR | Chase Sapphire Preferred | $1,850 |
| | 22.9% APR | AMEX Gold | $3,200 |
| Other loans or debts | Total other debt | | $50,150 |
| | Auto loan • 22.9% APR | 2022 Tesla Model Y | $28,400 |
| | Student loan • 22.9% APR | Federal Direct | $21,750 |

---

## Two-Column Layout

| Property | Value |
|----------|-------|
| Total content width | 1356px (after sidebar) |
| Column width | 588px each |
| Gap between columns | 180px (1356 - 588 - 588) |
| Layout direction | Assets (left), Liabilities (right) |
| Column vertical gap | 54px between summary card section and category sections |
| Category vertical gap | 64px between categories |

---

## CTA Buttons (Open Account)

Component: `Buttons` (comp `7679:5914` — Secondary/Outlined variant)

- Text: "Open M1 Earn account" / "Open M1 Invest account" — Inter 600 13px, `#2A7DA7`
- Border: `#2A7DA7`
- Radius: ~22px (pill)
- Placed at bottom of Cash and savings / Investments sections

---

## Key Components Referenced

| Component | ID | Usage |
|-----------|-----|-------|
| Financial Outlook Header | `10557:23625` | Page title |
| Total assets card | `12050:115744` | Summary card |
| Tab states (pill) | via Tab bar | Sub-navigation pills |
| Tab states (underline) | via Tab group | Primary navigation tabs |
| Main section | `11690:11999` | Category header with accent border |
| Total section | `11690:12003` | Subtotal row |
| List item | `11690:12000` | Account detail row |
| List item-v2 | `11690:26941` | Single-line variant (Real estate) |
| Buttons (outlined) | `7679:5917` | Add asset/liability |
| Buttons (outlined) | `7679:5914` | Open account CTA |
| edit24 | `10415:4687` | Edit pencil icon |
| AppNavigationItem | — | Sidebar nav items |
| Web-rail-nav | — | Sidebar container |
| Links | — | Disclosures footer link |
