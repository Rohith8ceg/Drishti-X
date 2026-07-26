# DRISHTI-X: AI Crime Intelligence Copilot - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build DRISHTI-X, a deployable, high-impact mock AI Crime Intelligence Copilot that operates as an **Autonomous AI Investigator**. It moves beyond chatbots and dashboards to deliver actionable intelligence, predictive risk forecasting, visual case replays, and multi-agent orchestration.

**Architecture:** Next.js 14+ (App Router), React, Tailwind CSS, Framer Motion, React Flow / Vis Network, Recharts, Leaflet. Client-side mock data engine (500+ records) to guarantee flawless, zero-latency hackathon demos on the Catalyst platform.

---

## UI/UX Aesthetic Strategy (Non-Traditional Design)

To ensure this feels like a premium, futuristic "Palantir x ChatGPT" Copilot rather than a traditional boring dashboard, we will strictly adhere to the following design system:

1.  **Cinematic Dark Mode:** Deep space backgrounds (`#0B0F19`, `#050505`) to reduce eye strain for investigators, contrasted with vibrant neon accents (Cyan for intelligence, Amber for alerts, Red for high risk).
2.  **Glassmorphism & Depth:** Heavy use of frosted glass panels (`backdrop-blur-xl`, `bg-white/5`, `border-white/10`) layered over dynamic background glows. No flat, solid-colored cards.
3.  **Fluid Micro-Animations (Framer Motion):** 
    *   **Agent Thinking:** Pulsing glows and animated typing cursors when AI is processing.
    *   **Node Revealing:** Case Replay and Network Graphs will draw their lines and pop in nodes sequentially (spring animations).
4.  **Spatial Layouts:** Moving away from rigid grid dashboards. We will use a fluid 3-column "Investigation Canvas" (Left: Chat, Center: Visual Board, Right: Insights) that dynamically resizes based on context.
5.  **Premium Typography:** Sleek sans-serif fonts (e.g., *Inter*, *Outfit*, or *Geist*) with tight kerning and high-contrast font weights (thin for data labels, bold for metrics).
6.  **Minimalist Data Visualization:** Charts (Recharts) will hide axes and grids by default, using glowing lines, gradients, and custom rich tooltips to keep the UI clean.

---

## User Review Required

> [!IMPORTANT]
> **The "Winning Stack" Demo Flow Integration**
> The implementation tasks have been restructured to exactly map to the 6 Intelligence Modules and 11 Standout Features you highlighted. This ensures every single "Wow" factor—from the Investigation Canvas to the Case Replay—is built sequentially.
> Does this task breakdown align with your vision for the final pitch?

---

## The 6 Intelligence Modules

1. **Conversational Investigation:** Understands context, filters, summarizes, and suggests next questions.
2. **AI Investigation Timeline:** Visual chronological node flow of a case (Complaint -> FIR -> CCTV -> Prediction).
3. **Criminal Network Graph:** Interactive node drill-down (Person -> Phone -> Vehicle -> Crime).
4. **Crime Pattern Intelligence:** Explanations of *why* trends are happening, not just charts.
5. **Predictive Risk Forecast:** Confidence-backed hotspot predictions (e.g., 92% risk in Whitefield due to weekend/festival).
6. **AI Briefing Generator:** One-click PDF generation for SPs.

## The 11 Standout Features (Hackathon Winners)

1. **Detective Mode:** Agentic workflow that automatically starts investigating when a crime is reported.
2. **Explain Every Answer:** "Why?" transparency for every insight (Evidence, Confidence, Precedents).
3. **Ask Follow-up Questions:** ChatGPT-like suggested next steps.
4. **Multi-Agent Investigation:** Visible orchestration (Investigator, Analyst, Predictor, Legal, Reporter).
5. **Kannada + English:** Seamless text and voice switching.
6. **AI Confidence Meter:** Visual gauges for evidence strength.
7. **Investigation Canvas:** A live detective board linking all entities in one view.
8. **What Changed Since Yesterday?:** Immediate SP login insights (New networks, emerging hotspots).
9. **Natural Language Dashboard:** Dashboard charts update via conversational prompts instead of dropdowns.
10. **AI Recommendations:** Actionable deployments (Increase CCTV, Deploy Patrol).
11. **AI Case Replay:** Cinematic, animated sequence of how an investigation unfolded.

---

## Phase-by-Phase Implementation Tasks

### Task 1: Foundation, Mock Engine, & "What Changed" View (Standout 8)
**Files:**
- Create: `src/lib/mockData.ts`
- Create: `src/components/dashboard/SPLoginView.tsx`

- [ ] **Step 1: Build the Comprehensive Mock Engine**
  Generate 500+ crimes, 150+ suspects, vehicles, phones, networks, and hotspots. Ensure data supports Kannada strings and complex relational mapping.
- [ ] **Step 2: Build SP Login "What Changed" Screen**
  Implement the immediate executive summary showing: "4 New Networks", "12 Repeat Offenders", "3 Emerging Hotspots".
- [ ] **Step 3: Commit Foundation**
  `git commit -m "feat: setup mock engine and SP login what changed view"`

---

### Task 2: Conversational Investigation (Mod 1) & NL Dashboard (Standout 9)
**Files:**
- Create: `src/components/copilot/ChatInterface.tsx`
- Create: `src/components/dashboard/NLFilterBar.tsx`

- [ ] **Step 1: Build Natural Language Chat Input**
  Handle prompts like "Show all chain snatching cases involving two-wheelers near Whitefield during weekends."
- [ ] **Step 2: Connect Chat to Dashboard State**
  Ensure natural language queries automatically update dashboard charts and metrics without manual dropdown filters.
- [ ] **Step 3: Commit Chat & Filters**
  `git commit -m "feat: implement conversational input and natural language dashboard updates"`

---

### Task 3: Investigation Canvas (Standout 7) & Detective Mode (Standout 1)
**Files:**
- Create: `src/components/workspace/InvestigationCanvas.tsx`
- Create: `src/components/workspace/DetectiveAutoWorkflow.tsx`

- [ ] **Step 1: Build Live Detective Board (Canvas)**
  Create a dynamic central workspace that visually places Victim, Crime Scene, Suspects, and Evidence onto a board as the investigation progresses.
- [ ] **Step 2: Implement Detective Mode Auto-Trigger**
  When a new incident is logged, trigger an automated sequence that finds similar crimes -> vehicles -> suspects -> generates a shortlist without user prompting.
- [ ] **Step 3: Commit Canvas & Detective Mode**
  `git commit -m "feat: build live investigation canvas and detective mode automation"`

---

### Task 4: Multi-Agent Orchestration Engine (Standout 4)
**Files:**
- Create: `src/components/agent/AgentPipeline.tsx`

- [ ] **Step 1: Build Visual Multi-Agent UI**
  Render UI cards for the 5 agents: **Investigator** (Finding suspects), **Analyst** (Stats), **Predictor** (Forecasts), **Legal** (IPC sections), **Reporter** (PDFs).
- [ ] **Step 2: Implement Simulated Agent Progress**
  Create sequenced pulsing animations so the judges physically see the agents "working" and handing off data to each other.
- [ ] **Step 3: Commit Multi-Agent Engine**
  `git commit -m "feat: implement visual multi-agent orchestration pipeline"`

---

### Task 5: Visual Timeline (Mod 2) & Case Replay (Standout 11)
**Files:**
- Create: `src/components/visualizers/TimelineView.tsx`
- Create: `src/components/visualizers/CaseReplayPlayer.tsx`

- [ ] **Step 1: Build Interactive Timeline**
  Render static chronological nodes from Complaint down to Recommendation.
- [ ] **Step 2: Build Cinematic Case Replay**
  Add a "Play" button that visually steps through the timeline, animating nodes popping in (🚨 Incident -> 📹 CCTV -> 🚗 Vehicle -> 🤖 AI Recommendation) like a movie.
- [ ] **Step 3: Commit Timeline & Replay**
  `git commit -m "feat: build chronological timeline and animated case replay feature"`

---

### Task 6: Criminal Network Graph (Mod 3) & Pattern Intelligence (Mod 4)
**Files:**
- Create: `src/components/visualizers/NetworkGraph.tsx`
- Create: `src/components/intelligence/PatternExplainer.tsx`

- [ ] **Step 1: Build Node-Link Graph**
  Integrate React Flow for interactive traversal (Suspect -> Associate -> Vehicle -> Crime).
- [ ] **Step 2: Add Pattern Explainer Popovers**
  Clicking a node or trend line generates a text explanation (e.g., "Vehicle theft up 23% due to festival parking shortage and Gang X activity").
- [ ] **Step 3: Commit Graph & Patterns**
  `git commit -m "feat: build interactive network graph and crime pattern text explainers"`

---

### Task 7: Predictive Forecast (Mod 5), Recommendations (Standout 10), & Confidence (Standout 6)
**Files:**
- Create: `src/components/intelligence/RiskForecastCard.tsx`
- Create: `src/components/intelligence/ActionRecommendations.tsx`
- Create: `src/components/ui/ConfidenceMeter.tsx`

- [ ] **Step 1: Build Risk Forecast Map/Card**
  Show next 7-day risk percentages (e.g., "Whitefield: 92% Risk") with underlying reasons.
- [ ] **Step 2: Add Actionable Recommendations**
  Output concrete steps ("Deploy patrol", "Increase highway checks").
- [ ] **Step 3: Build Confidence Meters**
  Render visual gauges (e.g., "94% Confidence") based on underlying mock evidence vectors.
- [ ] **Step 4: Commit Forecasting & Confidence**
  `git commit -m "feat: build risk forecasting, recommendations, and confidence meters"`

---

### Task 8: Explain Every Answer (Standout 2) & Audit Trail
**Files:**
- Create: `src/components/intelligence/WhyModal.tsx`
- Create: `src/components/tools/AuditLogs.tsx`

- [ ] **Step 1: Build the "Why?" Explainer Modal**
  Ensure every AI conclusion has a clickable "Why?" button showing Similarity %, Previous Incidents, and Common Vehicles.
- [ ] **Step 2: Implement Audit Trail**
  Create an immutable visual log of all prompts, reasoning steps, and AI decisions.
- [ ] **Step 3: Commit Explainability**
  `git commit -m "feat: implement why explainability modal and audit trail"`

---

### Task 9: AI Briefing Generator (Mod 6)
**Files:**
- Create: `src/components/intelligence/BriefingGenerator.tsx`

- [ ] **Step 1: Build One-Click Briefing UI**
  Create the District Summary, Repeat Offenders, and Action Plan view.
- [ ] **Step 2: Add PDF Export**
  Use `html2pdf.js` to allow downloading the briefing instantly.
- [ ] **Step 3: Commit Briefing**
  `git commit -m "feat: build one-click AI briefing generator with PDF export"`

---

### Task 10: Kannada/English Voice (Standout 5) & Follow-ups (Standout 3)
**Files:**
- Create: `src/components/copilot/VoiceToggle.tsx`
- Create: `src/components/copilot/SuggestedFollowUps.tsx`

- [ ] **Step 1: Build Voice & Language Toggle**
  Implement Web Speech API for English and Kannada voice input/output.
- [ ] **Step 2: Add Contextual Follow-up Chips**
  After AI responses, render chips like "Compare districts", "Show hotspot", "Generate FIR summary".
- [ ] **Step 3: Commit Voice & Follow-ups**
  `git commit -m "feat: implement web speech voice mode and contextual follow-up suggestions"`

---

### Task 11: Final Polish, Dark Mode, & Deployment Prep
**Files:**
- Modify: `src/styles/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Apply Global Glassmorphism & Framer Motion**
  Ensure dark mode aesthetics, smooth page transitions, and loading skeletons are perfect.
- [ ] **Step 2: Deployment Build Check**
  Run `npm run build` to ensure the Next.js app compiles cleanly for Catalyst deployment.
- [ ] **Step 3: Commit Polish**
  `git commit -m "style: apply framer motion polish and finalize build"`
