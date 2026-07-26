# DRISHTI-X

### AI Crime Intelligence Copilot

DRISHTI-X is a command-center experience for crime intelligence teams. It unifies investigation context, criminal relationships, location-based risk, decision support, and leadership reporting into one focused workspace.

## Problem statement

Crime intelligence teams work across FIRs, CCTV findings, field reports, suspect records, vehicle leads, and district-level trend data. Connecting those signals quickly is difficult, while operational leaders still need a concise answer to three questions: what is happening, why does it matter, and what should happen next?

DRISHTI-X addresses this gap with an explainable investigation copilot. It brings the operator from a natural-language question to connected entities, case chronology, predictive risk, recommended action, and an executive briefing without moving across disconnected tools.

## Solution overview

The product uses a three-panel Investigation Canvas:

- **Left:** conversational copilot for natural-language investigation and follow-up questions.
- **Center:** interactive intelligence views for criminal networks, case replay, predictive risk, and investigation workflow.
- **Right:** active threats, forecasts, recommendations, confidence indicators, and audit history.

The result is a practical decision-support interface designed for district commanders, investigation officers, crime analysts, and control-room teams.

## Features

| Feature | Functionality | Value |
| --- | --- | --- |
| **SP Command Briefing** | Presents emerging hotspots, repeat-offender signals, new networks, and priority actions immediately after entry. | Gives leaders a fast operational picture. |
| **Conversational Investigation Copilot** | Understands investigation prompts, provides suggested follow-up questions, and automatically opens the relevant view. | Reduces dashboard navigation and speeds up investigation. |
| **Criminal Network Graph** | Connects criminal groups, associates, vehicles, and FIRs. Selecting a node exposes its relationship explanation. | Helps identify links that are difficult to see in tabular records. |
| **Cinematic Case Replay** | Replays the case progression from incident to CCTV review, vehicle connection, and recommended response. | Makes case reasoning easy to communicate and review. |
| **Predictive Risk Heatmap** | Visualizes hotspot concentration, risk severity, time windows, confidence, and risk drivers. | Supports proactive patrol and resource planning. |
| **Detective Mode** | Shows specialist agents progressing through investigation, analysis, network tracing, prediction, and reporting. | Makes agent orchestration visible and understandable. |
| **Explainable Intelligence** | Provides confidence meters and a dedicated "Why?" path for evidence cues, prior incidents, and relationship context. | Keeps high-priority conclusions reviewable. |
| **Action Recommendations** | Converts intelligence into deployable actions such as patrol reinforcement, CCTV checks, and targeted field verification. | Moves beyond insight to operational response. |
| **Audit Trail** | Records investigation activity and intelligence events in a reviewable timeline. | Improves transparency and accountability. |
| **Executive Briefing Generator** | Creates a district-level summary with repeat offenders, hotspots, priorities, and PDF export. | Enables quick leadership communication. |
| **Bilingual Voice Experience** | Supports typed interaction and English/Kannada voice-recognition mode where supported by the browser. | Improves accessibility for field and control-room users. |

## Product walkthrough

1. Enter the SP Command Briefing to review emerging threats and daily intelligence changes.
2. Ask the copilot: `Show chain snatching patterns in Mysuru`.
3. Open **Network Graph** and select any entity to inspect its connected pattern explanation.
4. Open **Case Timeline** and press **Play** to replay the investigation sequence.
5. Open **Risk Heatmap**, hover a hotspot, and expand a forecast to inspect its risk drivers and confidence.
6. Select **Auto-Investigate** to launch the multi-agent workflow.
7. Open **Intelligence Brief** to view the Investigation Canvas and export the executive briefing.
8. Open **Audit Logs** to review recorded intelligence activity.

## Architecture

```text
                                      DRISHTI-X
                              AI CRIME INTELLIGENCE COPILOT
                                             |
        +------------------------------------+------------------------------------+
        |                                                                         |
  COMMAND AND CONTEXT LAYER                                            INTERACTION LAYER
  - SP command briefing                                               - Conversational copilot
  - threat indicators                                                 - suggested follow-ups
  - district priorities                                               - voice/language controls
        |                                                                         |
        +------------------------------------+------------------------------------+
                                             |
                              SHARED INVESTIGATION CONTEXT
                  query + active view + selected entities + risk focus + workflow state
                                             |
       +----------------------+-----------------------+----------------------+----------------------+
       |                      |                       |                      |                      |
 NETWORK INTELLIGENCE   CASE INTELLIGENCE      PREDICTIVE INTELLIGENCE  ACTION INTELLIGENCE  GOVERNANCE LAYER
 - group/entity graph   - replay chronology    - risk heatmap            - recommendations   - confidence meters
 - vehicles and FIRs    - CCTV and vehicle     - risk windows            - Detective Mode     - Why? explanations
 - relationship clues     linkage               - hotspot drivers         - PDF briefing       - audit trail
       |                      |                       |                      |                      |
       +----------------------+-----------------------+----------------------+----------------------+
                                             |
                                  PRESENTATION AND EXPORT
                         responsive command center + motion + briefing PDF
```

### Implementation layers

1. **Experience layer** - Next.js App Router renders the SP entry screen, responsive command-center shell, focused panels, and motion-driven interactions.
2. **Interaction layer** - The copilot manages investigation prompts, follow-up questions, voice input, and intent-aware navigation.
3. **Intelligence layer** - Network, timeline, risk, recommendation, and briefing components transform investigation records into analyst-friendly views.
4. **Orchestration layer** - Detective Mode visualizes handoffs between Investigator, Analyst, Network, Predictor, and Reporter agents.
5. **Explainability layer** - Confidence indicators, evidence narratives, risk drivers, and the audit history make each conclusion inspectable.
6. **Data layer** - A deterministic local intelligence engine provides consistent case, suspect, network, vehicle, and geographic records for reliable demonstration.

## Technology stack

- **Framework:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS 4 and a glassmorphism design system
- **Motion and interaction:** Framer Motion and Lucide icons
- **Network visualization:** React Flow (`@xyflow/react`)
- **Briefing export:** `html2pdf.js`
- **Data engine:** 500+ crime records, 150+ suspects, criminal networks, geographic hotspots, and relationship data

## Project structure

```text
src/
+-- app/                         # App Router entry point, metadata, global styling
+-- components/
|   +-- agent/                   # Multi-agent orchestration
|   +-- copilot/                 # Chat, voice, suggested follow-ups
|   +-- dashboard/               # SP entry and command-center layout
|   +-- intelligence/            # Risk, recommendations, briefing, explainability
|   +-- tools/                   # Audit history
|   +-- visualizers/             # Case replay
|   +-- workspace/               # Investigation Canvas and Detective Mode
+-- lib/                         # Local intelligence data engine
```

## Run locally

### Prerequisites

- Node.js 20 or later
- npm 10 or later

### Setup

```bash
git clone https://github.com/Rohith8ceg/Drishti-X.git
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

## Responsible-use statement

DRISHTI-X is a decision-support prototype. Its predictions, confidence scores, recommendations, and relationship links are not evidence and must not be used as the sole basis for real-world enforcement decisions. A production deployment requires human review, governance, audit controls, privacy protection, data-quality validation, and fairness testing.

## Team

Built for the DRISHTI-X hackathon submission.
