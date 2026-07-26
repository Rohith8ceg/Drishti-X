# DRISHTI-X

### AI Crime Intelligence Copilot

DRISHTI-X is a cinematic, AI-assisted investigation workspace built for command-level crime intelligence. It turns mock FIR, suspect, vehicle, network, and hotspot data into explainable leads, risk forecasts, investigation replays, and executive-ready briefings.

> **Hackathon demo note:** DRISHTI-X intentionally uses deterministic, client-side mock data. It requires no API key, backend, or external crime-data connection, allowing a reliable, zero-latency demo.

## The problem

Investigators and district leaders must often connect fragmented reports, CCTV clues, suspect relationships, and emerging patterns under time pressure. Traditional dashboards show data, but do not guide the next investigative action or make the reasoning behind it clear.

## The solution

DRISHTI-X presents a unified **Investigation Canvas** where users can ask in natural language, inspect criminal links, replay an investigation, assess hotspot risk, and produce a briefing. It is designed to make the path from signal to action clear and demonstrable.

## Key capabilities

| Capability | What it demonstrates |
| --- | --- |
| **Conversational Copilot** | Natural-language investigation prompts with suggested follow-up questions and dashboard view switching. |
| **Criminal Network Graph** | A connected, interactive network of a criminal group, associates, vehicle evidence, and linked FIR. Select any node for a pattern explanation. |
| **Case Replay** | A step-by-step animated sequence from incident report to CCTV, vehicle linkage, and recommended action. |
| **Predictive Risk Map** | Spatial hotspot visualization with risk scores and detailed, expandable seven-day forecasts. |
| **Detective Mode** | Visible multi-agent orchestration for automatically progressing from a reported incident to a prepared briefing. |
| **Explainability** | Confidence meters and "Why?" evidence views that make the mock AI conclusion inspectable. |
| **Audit Trail** | Reviewable timeline of investigation activity and system decisions. |
| **AI Briefing Generator** | One-click executive briefing with PDF export or print fallback. |
| **Voice & language toggle** | English/Kannada speech-recognition toggle where the browser supports the Web Speech API. |

## Demo flow

1. Open the SP login view and choose **Enter Command Center**.
2. Ask: `Show chain snatching patterns in Mysuru`.
3. Select **Network Graph** and click a node to inspect its relationship explanation.
4. Select **Case Timeline**, then press **Play** to replay the investigation.
5. Select **Risk Heatmap** and hover a hotspot; expand a forecast for the AI reasoning and risk probability.
6. Click **Auto-Investigate** to show the agentic workflow, then open **Intelligence Brief** to view the Investigation workspace and export the briefing.
7. Select **Audit Logs** to review recorded intelligence activity.

## Tech stack

- **Framework:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS 4, cinematic glassmorphism design system
- **Interaction & motion:** Framer Motion, Lucide icons
- **Network visualization:** React Flow (`@xyflow/react`)
- **Document export:** `html2pdf.js`
- **Data:** deterministic client-side mock intelligence engine with 500+ crime records and 150+ suspects

## Architecture

```text
Mock intelligence engine
        |
        +-- Conversational Copilot --> dashboard filters / context-aware view selection
        |
        +-- Criminal Network Graph --> entity relationship explanation
        +-- Case Replay -----------> investigation chronology
        +-- Risk Forecast ---------> hotspot map + recommendations
        +-- Investigation Workspace -> Detective Mode + briefing + audit trail
```

All feature data is generated locally in [`src/lib/mockData.ts`](src/lib/mockData.ts). The command center composition lives in [`src/components/dashboard/MainDashboard.tsx`](src/components/dashboard/MainDashboard.tsx).

## Run locally

### Prerequisites

- Node.js 20 or later
- npm 10 or later

### Setup

```bash
git clone <your-repository-url>
cd Drishti-X
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm run start
```

## Project structure

```text
src/
+-- app/                         # Next.js App Router entry point and global styling
+-- components/
|   +-- agent/                   # Multi-agent orchestration UI
|   +-- copilot/                 # Chat, voice toggle, follow-up prompts
|   +-- dashboard/               # SP entry screen and Command Center layout
|   +-- intelligence/            # Forecast, recommendations, briefing, explainability
|   +-- tools/                   # Audit trail
|   +-- visualizers/             # Case replay timeline
|   +-- workspace/               # Investigation Canvas and Detective Mode
+-- lib/mockData.ts              # Deterministic mock intelligence dataset
```

## Responsible-use statement

DRISHTI-X is a prototype for demonstration and decision-support exploration only. Its mock predictions, confidence scores, recommendations, and relationship links are not evidence and must not be used for real-world enforcement decisions. A production implementation would require human review, governance, audit controls, privacy protection, data-quality validation, and fairness testing.

## Team

Built for the DRISHTI-X hackathon submission.

---

If you find this project useful, please star the repository.
