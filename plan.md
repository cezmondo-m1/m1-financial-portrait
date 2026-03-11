# Financial Portrait — Plan

## Overview
Financial Portrait is a new tab within "Your Finances" that provides M1 Intelligence-driven insights into a user's current wealth position. It combines personalized narrative analysis of their balance sheet with stress testing capabilities, helping users understand their financial vulnerabilities in real time.

The experience is clinical and conversational—honest about gaps and contradictions, but approachable. It uses their actual numbers and positions them as active participants in wealth building, not passive observers.

**Core Value:** Users get clarity on who they are financially *right now*, not predictions about the future. This feeds into resilience testing and actionable portfolio adjustments.

---

## User Flow

1. **Land on Financial Portrait tab** (new tab within Your Finances, alongside Balance Sheet, Cash Flow, Investment Profile)
2. **See wealth narrative + tension callout + key insight bullets** (all generated from their balance sheet snapshot and risk questionnaire)
3. **Choose to test resilience** (optional CTA: "Test Your Resilience")
4. **Pick a stress scenario** (Market Drop 30%, Job Loss, or Major Life Event)
5. **View animated stress test results** (before/after net worth, liquidity runway, asset composition shift, which assets got hit hardest)
6. **Read "Here's why" section** (auto-expanded, Claude-generated explanation tied to their specific scenario and numbers)
7. **CTA to adjust portfolio** (link to Balance Sheet or specific M1 Invest account for rebalancing)

---

## Data Requirements

### From M1 Backend
- **Balance Sheet snapshot:** Total assets, total liabilities, net worth, asset breakdown by category (real estate, investments, cash, other), account-level detail
- **Risk questionnaire response:** User's stated risk tolerance (conservative, moderate, aggressive)
- **Account structure:** List of M1 Invest accounts (if multiple) for portfolio adjustment CTA
- **Expense baseline:** Monthly/annual spend (for liquidity runway calculation)

### From Claude
- Generate personalized wealth narrative using real numbers
- Flag tension between stated risk tolerance and actual allocation
- Generate stress test outcomes and explanations
- Create "Here's why" copy specific to user's scenario and numbers

---

## Feature: Wealth Narrative & Tension Callout

### What Lives Here
**Wealth Narrative** — A personalized 2-3 sentence prose analysis using their actual numbers.
- Example: "Your $1.2 million in real estate represents 62% of your net worth. It's your foundation, but it limits flexibility. Your investment portfolio is lean at 23%, suggesting conservative growth instincts. You carry manageable debt, but your liquidity is thin."
- Tone: Clinical, direct, M1's voice. Use real numbers. Don't sugarcoat.

**Key Insight Bullets** — 3-4 scannable callouts highlighting their position.
- Example:
  - "62% of wealth locked in illiquid real estate"
  - "Investment portfolio underweight relative to asset base"
  - "Manageable debt-to-asset ratio (20%)"
  - "Liquidity covers ~2 months of expenses"

**Tension Callout** — Always shown. Flags contradictions or alignment.
- **If tension exists:** "Your stated risk tolerance is moderate, but your actual allocation skews conservative. Your cash reserves cover 2.1 months of expenses—below the 3–6 month threshold for your asset profile."
- **If no tension:** "Your allocation aligns with your stated risk profile. You're well-positioned for your stated goals."
- Visual treatment: Warning box (amber/yellow) if tension, success box (green) if aligned.

---

## Feature: Resilience Stress Test

### Three Scenario Buttons
1. **Market Drop 30%** — Equities and investment accounts decline 30%. Real estate values soften slightly (5-10%). Impact on net worth, liquidity, which accounts bleed most.
2. **Job Loss** — User loses primary income. Show how long liquid assets sustain them. Highlight emergency fund sufficiency.
3. **Major Life Event** — Large unexpected expense (home purchase down payment, medical emergency). Drain a portion of liquid assets. Show impact on net worth and remaining runway.

### Stress Test Results Screen

**Before/After Snapshot**
- Net worth: absolute change + percentage drop
- Liquidity runway: months of expenses covered (before vs after)
- Debt-to-asset ratio: shift in percentage points
- Top 2 asset classes: side-by-side bars showing pre/post composition

**Visual: Asset Composition Shift**
- Two columns: "Current" and "After [Scenario]"
- Bar chart showing top 1-2 asset classes (real estate, investments, cash)
- Highlight which assets got hit hardest with color/opacity change
- Include dollar values for clarity

**"Here's Why" Section (Auto-Expanded)**
- Claude-generated explanation specific to user's scenario and numbers
- Example for Market Drop: "Your $142k investment portfolio would decline to ~$99k, a 30% hit. This reduces your total net worth from $487k to $447k (8% overall). Your liquidity runway drops from 2.1 months to 1.8 months—still manageable, but tighter. Real estate values soften modestly, reducing your collateral base by ~$45k."
- Explain *why* specific assets got hit (market sensitivity, concentration, liquidity constraints)
- Keep it conversational but data-driven

**CTA: Adjust Your Portfolio**
- Link to Balance Sheet or M1 Invest account
- Copy: "Rebalance to reduce concentration risk" or "Explore alternative allocations"

---

## Claude's Role

### Generate Wealth Narrative
- Input: Balance sheet data (real numbers, asset breakdown)
- Output: 2-3 sentence personalized prose + 3-4 key insight bullets
- Requirements:
  - Use actual dollar amounts and percentages
  - Match M1's voice: honest, direct, no jargon
  - Highlight contradictions or strengths
  - Scannable format (bullets for insights)

### Flag Tension / Alignment
- Input: Stated risk tolerance (from questionnaire) + actual asset allocation
- Output: Tension callout or alignment message
- Requirements:
  - Always show, even if aligned
  - Be specific about the gap (if one exists)
  - Use their actual numbers

### Generate Stress Test Results
- Input: Balance sheet snapshot + scenario choice (Market Drop, Job Loss, Major Life Event)
- Output: Before/after metrics + "Here's why" explanation
- Requirements:
  - Calculate net worth impact (absolute + percentage)
  - Calculate liquidity runway before/after
  - Identify which asset classes get hit hardest
  - Generate explanation tied to their specific numbers and scenario
  - Keep explanations conversational but precise

---

## UI/UX Specifications

### Layout & Hierarchy
- **Tab placement:** New tab within Your Finances (Balance Sheet, Cash Flow, Financial Portrait, Investment Profile, Investor Disclosures)
- **Narrative section:** Hero card at top with net worth summary + composition bar, followed by narrative prose + bullets + tension callout
- **Stress test CTA:** Button below narrative ("Test Your Resilience")
- **Stress test results:** Full-screen modal or dedicated section with before/after cards side-by-side, asset composition visual below, "Here's why" section auto-expanded at bottom

### Visual Treatment
- **Narrative card:** Clean white background, dark blue accents (M1 brand), amber warning box for tension
- **Stress test results:** Before (current state) in white, After (post-shock) in dark blue gradient for visual contrast
- **Asset composition bars:** Color-coded by asset class (real estate, investments, cash, other) with opacity shift showing decline
- **Tone:** M1's clinical honesty + conversational warmth. No fluff, no hedging. Numbers speak.

### Animations
- **Stress test transition:** Subtle animation when results load—numbers animate from before to after state over ~1.2 seconds, showing the shift
- **Asset bars:** Bars shrink/shift in real time as stress scenario is applied

---

## Stress Test Logic

### Market Drop 30%
- Equities decline 30% (investments, brokerage accounts, crypto)
- Real estate values soften 5-10% (market shock impact)
- Cash unaffected
- Calculate new net worth, liquidity runway, asset ratio
- Highlight: Investment portfolio as primary loser

### Job Loss
- Remove monthly income from available cash flow
- Show how many months of expenses liquid assets cover (before assuming no recovery)
- Highlight: Emergency fund sufficiency, whether they hit zero cash before 6 months
- Educational copy should address: "You'd deplete liquid reserves in X months. Consider rebuilding emergency fund to 6-month target."

### Major Life Event
- Drain 15-25% of liquid assets (or prompt user to input amount, if possible)
- Show impact on net worth, remaining liquidity runway
- Highlight: Cash/savings as primary loser
- Educational copy should address: "This event consumes your emergency buffer. You'd need to rebuild savings or access other assets."

### General Calculations
- **Liquidity runway:** Liquid assets / monthly expenses = months of runway
- **Debt-to-asset ratio:** Total liabilities / total assets = percentage
- **Concentration risk:** Largest asset class / total assets = percentage
- All metrics should update post-shock and be displayed as before/after

---

## Implementation Notes for Claude Code

1. **Prompt structure:** Pass balance sheet snapshot + risk questionnaire data + scenario choice to Claude. Request structured output (narrative, tension callout, stress test metrics, explanation).
2. **Data parsing:** M1 backend returns balance sheet as JSON. Claude parses and generates insights. For now, use mock data for stress test calculations; can wire to backend later.
3. **Tone consistency:** Brief Claude with M1's voice guidelines (honest, direct, no hedging, clinical but conversational).
4. **Reusability:** Design prompts so they can be iterated on without changing the overall feature structure.

---

## Success Metrics (Future)
- Users engage with stress test (% who click "Test Your Resilience")
- Users take action post-stress test (navigate to portfolio adjustment)
- Narrative clarity (qualitative feedback—does it resonate?)
- Tension detection accuracy (does the flagged tension match user perception?)
