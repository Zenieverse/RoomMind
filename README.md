<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1C1mOs7q1luYmI-s4sHNYQnlzFWwlDU9v

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

RoomMind — Spatial AI for Human-Aware Mixed Reality Spaces
Transform any room into an adaptive, mood-aware, behaviour-responsive environment.

🚀 Overview

RoomMind reimagines spatial intelligence by turning any physical room into a responsive, adaptive environment that understands mood, intention, and interaction patterns. Using computer vision, environmental sensing, and multimodal AI run locally on-device, RoomMind enables real-time insights into how people use the space — and augments it with personalized lighting, sound, prompts, and experiences.
Built for mixed reality platforms and next-generation spatial operating systems, RoomMind provides a seamless bridge between digital cognition and physical environments.

✨ Key Features

🧠 Mood & Behaviour Recognition
Real-time emotion/mood inference via multimodal sensing
Activity + posture detection (focus, rest, movement, collaboration)
Adaptive scene transitions based on behavioural signals

🌈 Spatial Scene Intelligence
Detects furniture, objects, room type, and spatial layout
Maps movement patterns and micro-interactions
Generates “room states” that trigger automations

⚡ Contextual Automations
Lighting, soundscapes, overlays, task prompts
Intelligent reminders tied to user behaviour
Adaptive productivity modes (Deep Focus, Reset, Creative Boost)

🔒 On-Device Privacy
All inference runs locally on device — no cloud storage, no uploads, full user control.

🏗️ How It Works
RoomMind combines:
Vision-based scene understanding (object detection, pose detection, spatial anchors)
Audio and environmental sensing (noise level, brightness, comfort profile)
A multimodal LLM to reason about user behaviour and generate contextual actions
A local rule engine to trigger adaptive scenes
Mixed-reality rendering for visual overlays or environmental enhancements
The system observes → interprets → responds in a continuous loop.

🛠️ Architecture
 ┌───────────────────────────┐
 │       Sensor Layer        │
 │ Camera • Mic • IMU • Env  │
 └─────────────┬─────────────┘
               ▼
 ┌───────────────────────────┐
 │   Spatial Understanding    │
 │   (objects, posture, map)  │
 └─────────────┬─────────────┘
               ▼
 ┌───────────────────────────┐
 │   Multimodal Reasoning     │
 │  (mood • behaviour • intent)│
 └─────────────┬─────────────┘
               ▼
 ┌───────────────────────────┐
 │     RoomMind Engine       │
 │  Automations & Scene Logic│
 └─────────────┬─────────────┘
               ▼
 ┌───────────────────────────┐
 │  Spatial OS Integration   │
 │ MR Overlays • Lighting     │
 │ Audio • App Interactions   │
 └───────────────────────────┘
 
💡 Use Cases
Productivity Rooms: Adaptive focus mode with lighting + sound + distraction detection
Wellness Rooms: Mood-aware ambience, stress detection, breathing cues
Collaboration Spaces: Real-time group energy mapping
Home Environments: Personalized “enter room” scenes
XR Workflows: Spatial cognitive assistant that responds to the user’s state

🧩 Tech Stack
Computer Vision: MediaPipe, OpenCV, custom pose + object models
Multimodal AI: On-device LLM
Spatial Graph: Custom mapping layer from camera + sensors
Frontend: MR UI + React Native bridge (or platform-native UI)
Backend: Local inference engine + automation rules

📦 Folder Structure (Recommended)
/roommind
├── /app
│   ├── UI
│   ├── Scenes
│   ├── Overlays
├── /engine
│   ├── inference
│   ├── rule_engine
│   ├── automations
├── /models
├── /scripts
├── /docs
│   └── README.md

🔮 Future Roadmap
Multi-person group behaviour modeling
Time-series predictive “room forecasting”
Richer adaptive scenes (guided focus sessions, wellness rituals)
Marketplace for downloadable RoomMind automation packs
API for third-party mixed reality apps
Cross-device synchronization of room profiles

📝 License
MIT License — free to use, modify, and extend.
