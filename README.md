# 🎬 Faceless Finance Videos

An MVP web app for generating faceless YouTube finance videos using AI. Generate scripts with OpenAI GPT-4, convert them to speech with ElevenLabs, and export everything in seconds.

## Features

- **Script Generator** — One-click AI script generation using OpenAI GPT-4 tailored for 60-second YouTube Shorts
- **Script Editor** — Review and freely edit the generated script before proceeding
- **Voice Generator** — Convert the script to speech via ElevenLabs TTS with a choice of male or female voice
- **Export Section** — Download the audio as MP3, copy the script to clipboard, download as `.txt`, or start over
- **Step-by-step wizard** — Clear 4-step progress indicator guides you through the flow
- **Loading states** — Spinners and disabled buttons during API calls
- **Dark theme** — Clean, minimal dark UI built with Tailwind CSS

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| Backend | Node.js + Express |
| Script AI | OpenAI GPT-4 |
| Voice AI | ElevenLabs TTS |

## Project Structure

```
├── backend/
│   ├── package.json
│   ├── .env.example
│   ├── server.js              # Express server (port 3001)
│   └── routes/
│       ├── scriptRoutes.js    # POST /api/generate-script
│       └── voiceRoutes.js     # POST /api/generate-voice
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx            # Step wizard & state management
│       ├── index.css
│       ├── api/
│       │   └── api.js         # API layer (fetch wrappers)
│       └── components/
│           ├── ScriptGenerator.jsx
│           ├── ScriptEditor.jsx
│           ├── VoiceGenerator.jsx
│           └── ExportSection.jsx
├── .gitignore
└── README.md
```

## Setup

### Prerequisites

- Node.js 18+
- An [OpenAI API key](https://platform.openai.com/api-keys)
- An [ElevenLabs API key](https://elevenlabs.io/)

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and fill in your API keys:

```
OPENAI_API_KEY=your_openai_api_key_here
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
```

Start the backend server:

```bash
npm start
# Server runs on http://localhost:3001
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

1. **Step 1 – Generate**: Click "Generate Script" to create a 60-second finance script using GPT-4.
2. **Step 2 – Edit**: Review and modify the script in the textarea, then click "Continue to Voice".
3. **Step 3 – Voice**: Choose a voice (Rachel/female or Antoni/male) and click "Generate Voice". Preview the audio inline.
4. **Step 4 – Export**: Download the MP3, copy the script to clipboard, download as `.txt`, or start over.

## API Endpoints

### `POST /api/generate-script`

Generates a YouTube Shorts finance script using OpenAI GPT-4.

**Request body:**
```json
{ "topic": "personal finance" }
```
*(topic is optional, defaults to "personal finance")*

**Response:**
```json
{ "script": "..." }
```

---

### `POST /api/generate-voice`

Converts text to speech using ElevenLabs.

**Request body:**
```json
{
  "text": "Your script text here",
  "voiceId": "21m00Tcm4TlvDq8ikWAM"
}
```
*(voiceId is optional, defaults to Rachel)*

**Available voice IDs:**
| Voice | Gender | ID |
|-------|--------|----|
| Rachel | Female | `21m00Tcm4TlvDq8ikWAM` |
| Antoni | Male | `ErXwobaYiN019PkySvjV` |

**Response:** Binary MP3 audio stream (`Content-Type: audio/mpeg`)

## Environment Variables

All secrets are stored in `backend/.env` (never committed to git).

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | OpenAI API key for GPT-4 access |
| `ELEVENLABS_API_KEY` | ElevenLabs API key for TTS |