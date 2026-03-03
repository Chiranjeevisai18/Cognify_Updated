# 🎵 Cognify — AI-Powered Music Analysis Platform

> Upload any song. Instantly see its chords, melody, stems, and harmony — all synchronized in real time.

![Status](https://img.shields.io/badge/Status-Alpha%20%2F%20MVP-yellow)
![React](https://img.shields.io/badge/Frontend-React%2018%20%2B%20TypeScript-blue)
![Python](https://img.shields.io/badge/Backend-Python%20%2F%20Flask-green)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Reference](#-api-reference)
- [Architecture](#-architecture)
- [Roadmap](#-roadmap)

---

## 🌟 Overview

**Cognify** is an AI-powered music education tool that gives musicians "X-Ray Vision" into any song. By uploading an audio file, users get a full breakdown of its **chord progressions**, **melody contour**, **separated stems** (vocals, drums, bass, other), and **music theory context** — all rendered interactively in the browser.

It is designed for:
- 🎸 **Guitarists & pianists** wanting to quickly learn songs by ear
- 🎙️ **Vocalists** who want to practice on a karaoke-style instrumental
- 🎓 **Music students** who want to understand the theory behind what they hear
- 🎛️ **Producers** who need rapid harmonic analysis and stem isolation

---

## ✨ Features

### 🎧 Smart Stem Mixer
Powered by **Meta's HTDemucs** deep learning model, audio is separated into 4 isolated tracks — Vocals, Drums, Bass, and Other (instruments). Each stem can be independently muted or soloed in real time via a visual mixer panel.

### 🎼 Chord Timeline
Beat-accurate chord detection using the **Chordino Vamp plugin**. Chords are displayed on an auto-scrolling, time-synchronized visual grid showing chord name, bar, and beat information.

### 🎵 Melody & Music Theory Engine
- **PYIN algorithm** (via Librosa) extracts the fundamental frequency (f0) contour frame by frame
- Melody notes are classified in real time as: **Chord Tone**, **Scale Note**, or **Passing Note**
- Global **key detection** using chroma feature analysis

### 🎸 Guitar Fretboard & 🎹 Piano Roll
Interactive instrument visualizers that light up based on the current chord or detected melody note, helping musicians understand exactly what to play and where.

### ⚙️ PRO Audio Engine
A custom-built engine using the **Web Audio API**:
- **Polyphonic stem playback** via concurrent `AudioBufferSourceNode` instances
- **Gain Node Mixer** for zero-latency mute/solo control
- **Variable-speed playback** (0.5× → 1.5×) without pitch shift using a physics-based compound clock system
- **A-B Looping** to isolate and repeat any section of the song
- **Buffer caching** for instant re-play after first load

### 📚 Song Library
Analyzed songs are saved to a local **SQLite database** and can be reloaded instantly without reprocessing.

### 📤 Multi-Format Export
Export your analysis as **CSV**, **MIDI**, **MusicXML**, or a **PDF Lead Sheet**.

### 🔐 Authentication
User accounts managed by **Clerk** (sign-up, sign-in, protected routes).

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 + TypeScript | UI framework |
| Vite | Build tool & dev server |
| Tailwind CSS | Styling |
| React Router v7 | Client-side routing |
| Clerk | Authentication |
| Web Audio API | Custom audio engine |
| @tonaljs/tonal | Music theory utilities |
| jsPDF | PDF export |
| Lucide React | Icons |

### Backend
| Technology | Purpose |
|---|---|
| Python / Flask | REST API server |
| Demucs (HTDemucs) | AI stem separation |
| Chordino (Vamp Plugin) | Chord extraction |
| Librosa (PYIN) | Melody & key detection |
| NumPy / SciPy | Audio signal processing |
| SQLite | Song metadata & analysis storage |
| Flask-CORS | Cross-origin resource sharing |
| asgiref | ASGI/WSGI bridge |

---

## 📁 Project Structure

```
Cognify/
├── client/                     # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/
│   │   │   ├── LandingPage.tsx       # Public landing/marketing page
│   │   │   ├── ChordAnalyzer.tsx     # Main dashboard after login
│   │   │   ├── AudioPlayer.tsx       # PRO audio engine + mixer UI
│   │   │   ├── AudioUpload.tsx       # File upload & analysis trigger
│   │   │   ├── ChordTimeline.tsx     # Scrolling chord grid visualizer
│   │   │   ├── GuitarChord.tsx       # Fretboard diagram component
│   │   │   ├── PracticeMode.tsx      # Focused practice mode UI
│   │   │   ├── ExportPanel.tsx       # Export to CSV/MIDI/PDF/MusicXML
│   │   │   ├── Library.tsx           # Saved song library
│   │   │   ├── SignIn.tsx            # Clerk sign-in page
│   │   │   ├── SignUp.tsx            # Clerk sign-up page
│   │   │   ├── ProtectedRoute.tsx    # Auth guard for private routes
│   │   │   └── PublicRoute.tsx       # Redirect if already logged in
│   │   ├── hooks/
│   │   │   └── useMidi.ts            # MIDI output hook
│   │   ├── utils/
│   │   │   └── AudioCache.ts         # In-memory audio buffer cache
│   │   ├── App.tsx                   # Router & global type definitions
│   │   ├── main.tsx                  # React entry point + Clerk provider
│   │   └── index.css                 # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── backend/                    # Backend (Python / Flask)
│   ├── app.py                        # Main Flask API (routes, analysis pipeline)
│   ├── stem_separator.py             # Demucs wrapper (HTDemucs model)
│   ├── requirements.txt              # Python dependencies
│   ├── cognify.db                    # SQLite database (auto-created)
│   └── uploads/                      # Uploaded audio & separated stems
│
├── .env                        # Environment variables (Clerk keys etc.)
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ and **npm**
- **Python** 3.9+
- **FFmpeg** (required by Demucs for audio decoding) — [Install FFmpeg](https://ffmpeg.org/download.html)
- A **Clerk** account for authentication — [clerk.com](https://clerk.com)
- *(Optional)* A CUDA-compatible GPU for faster stem separation

---

### Backend Setup

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Create and activate a virtual environment
python -m venv venv

# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate

# 3. Install Python dependencies
pip install -r requirements.txt

# 4. Start the Flask server
python app.py
```

The backend will be available at **`http://localhost:5000`**.

> **Note on Stem Separation:** The first analysis will download the HTDemucs model weights (~2GB). Subsequent runs use the cached model. Analysis typically takes **40–60 seconds** on CPU, and significantly less on GPU.

---

### Frontend Setup

```bash
# 1. Navigate to the client directory
cd client

# 2. Install dependencies
npm install

# 3. Create a .env file in the project root (if not already present)
#    and add your Clerk publishable key:
#    VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxx

# 4. Start the development server
npm run dev
```

The frontend will be available at **`http://localhost:5173`**.

> The frontend expects the backend to be running on `http://localhost:5000`.

---

### Environment Variables

Create a `.env` file in the **project root** (`e:/Cognify/.env`):

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key_here
```

---

## 📡 API Reference

All endpoints are served from `http://localhost:5000`.

### `POST /analyze-chords`
Uploads an audio file and runs the full analysis pipeline (stem separation, chord extraction, melody extraction, key detection).

**Request:** `multipart/form-data` with a `file` field (MP3, WAV, etc.)

**Response:**
```json
{
  "duration": 210.4,
  "bpm": 120,
  "key": "G",
  "timeSignature": "4/4",
  "chords": [{ "time": 0.0, "chord": "G", "beat": 1, "bar": 1, "confidence": 1.0 }],
  "melody": [{ "time": 0.1, "pitch": 392.0, "note": "G4", "role": "Chord Tone" }],
  "audioUrl": "http://localhost:5000/uploads/uuid_song.mp3",
  "stems": {
    "vocals": "http://localhost:5000/uploads/htdemucs/.../vocals.wav",
    "drums":  "http://localhost:5000/uploads/htdemucs/.../drums.wav",
    "bass":   "http://localhost:5000/uploads/htdemucs/.../bass.wav",
    "other":  "http://localhost:5000/uploads/htdemucs/.../other.wav"
  }
}
```

### `GET /uploads/<filename>`
Serves a static audio file (original upload or separated stem).

### `POST /api/save`
Saves a song's analysis to the database.
**Body:** `{ "title": "...", "artist": "...", "analysis": { ... } }`

### `GET /api/songs`
Returns a list of all saved songs (metadata only).

### `GET /api/songs/<song_id>`
Returns the full analysis JSON for a saved song.

### `DELETE /api/songs/<song_id>`
Deletes a song and its uploaded audio files from disk.

### `GET /api/mix/<filename>/<mix_type>`
Downloads a stem mix. `mix_type` is either `vocals` or `instrumental` (on-the-fly mix of drums + bass + other).

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Browser (Client)                    │
│                                                         │
│  ┌──────────┐  ┌──────────────┐  ┌───────────────────┐ │
│  │ Clerk    │  │  Audio Engine │  │ Visualizers       │ │
│  │ (Auth)   │  │  (Web Audio   │  │ Chord Timeline    │ │
│  │          │  │   API)        │  │ Guitar / Piano    │ │
│  └──────────┘  └──────┬───────┘  └───────────────────┘ │
│                       │                                 │
└───────────────────────┼─────────────────────────────────┘
                        │ HTTP (REST)
┌───────────────────────┼─────────────────────────────────┐
│               Backend │(Flask @ :5000)                  │
│                       │                                 │
│  ┌────────────────────▼───────────┐                     │
│  │  POST /analyze-chords          │                     │
│  │  ┌──────────────────────────┐  │                     │
│  │  │ 1. Save Upload           │  │                     │
│  │  │ 2. Demucs Stem Separator │  │  HTDemucs model     │
│  │  │ 3. Chordino Extraction   │  │  (htdemucs/*.wav)   │
│  │  │ 4. PYIN Melody / pyin    │  │                     │
│  │  │ 5. Key Detection         │  │                     │
│  │  │ 6. Note Classification   │  │                     │
│  │  └──────────────────────────┘  │                     │
│  └────────────────────────────────┘                     │
│                                                         │
│  ┌─────────────────────────────────┐                    │
│  │  SQLite (cognify.db)            │                    │
│  │  songs: id, title, artist,      │                    │
│  │         created_at, analysis    │                    │
│  └─────────────────────────────────┘                    │
└─────────────────────────────────────────────────────────┘
```

---

## 🗺 Roadmap

- [x] Stem separation (Vocals / Drums / Bass / Other)
- [x] Chord detection with bar/beat alignment
- [x] Melody extraction and note role classification
- [x] Interactive Guitar & Piano visualizers
- [x] A-B Loop + variable-speed playback
- [x] Song library with SQLite persistence
- [x] Export to CSV, MIDI, MusicXML, PDF
- [x] Authentication with Clerk
- [ ] PDF Lead Sheet export (polished)
- [ ] MIDI file download
- [ ] Mobile-responsive layout
- [ ] GPU acceleration toggle (server-side)
- [ ] Support for YouTube URL input

---

## 📄 License

This project is licensed under the **MIT License**.

---

<p align="center">Built with ❤️ for musicians, by musicians.</p>
