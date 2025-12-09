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

🌌 RoomMind
Your Mixed-Reality Productivity Dome
RoomMind transforms any physical room into a focused mixed-reality cockpit powered by intelligent spatial interfaces and AI-enhanced workflows.
Designed for makers, students, devs, and creators who want deep focus without disconnecting from their real environment.
📎 Badges
<p align="center">
  <img src="https://img.shields.io/badge/status-active-brightgreen" />
  <img src="https://img.shields.io/badge/license-MIT-blue" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/AI-Gemini-4285F4?logo=google" />
</p>

📘 Overview
RoomMind reimagines productivity by blending your real physical environment with adaptive MR overlays and AI-powered spatial utilities. Instead of trapping you inside a VR world, RoomMind enhances the actual room you’re in — creating a “dome of focus” that helps you think, create, and work more effectively.
Think of it as a hybrid workspace where your walls, desk, and surroundings become interactive surfaces that host tools, dashboards, and AI helpers.

✨ Features
🌀 Mixed-Reality Room Transformation
Overlay productivity tools in your real environment
Spatial UI components that anchor to your room

🤖 AI-Powered Workspace
Integrated Gemini API (or any LLM)
Smart suggestions, code help, writing assistance
AI-guided task organization and focus management

🛠 Lightweight & Extensible
Modular component architecture
Add your own MR widgets
Web-native, no heavy game engine required

⚡️ Instant Local Dev
Powered by Vite for blazing-fast reloads
Pure TypeScript + React
Zero-backend architecture (optional APIs supported)

📂 Project Structure
RoomMind/
│
├── components/         # Reusable MR + UI components
├── services/           # AI, state, and utility services
├── assets/             # Images, icons, 3D assets (optional)
├── hooks/              # Custom React hooks for MR interactions
│
├── App.tsx             # Main application UI
├── main.tsx            # App bootstrap + React rendering
├── constants.ts        # Global constants
├── types.ts            # Type definitions
│
├── tsconfig.json
├── package.json
├── vite.config.ts
└── README.md

🧰 Tech Stack
Layer	Technology
UI Framework	React + TypeScript
Build Tool	Vite
Runtime	Browser / WebXR / MR APIs
AI Services	Gemini API (configurable)
Styling	CSS / custom MR UI components

🚀 Getting Started
1. Clone the Repository
git clone https://github.com/Zenieverse/RoomMind.git
cd RoomMind
2. Install Dependencies
npm install
3. Set Up Environment Variables
Create a file named .env.local:
GEMINI_API_KEY=your_api_key_here
4. Run Development Server
npm run dev
Open the URL printed in the console (usually http://localhost:5173).

🧪 Usage
Once running, you can:
Activate the MR view
Spawn virtual panels for notes, tasks, documents, and AI interactions
Use voice + text prompts
Rearrange tools by dragging in 3D space
Ask the AI to organize your tasks into a room-scale layout
RoomMind is designed to feel like you are installing tools into your room.

📘 Diagrams
Architecture Diagram
Component Diagram
MR Layout Diagram
Workflow Diagram


<img width="740" height="621" alt="IMG_1409" src="https://github.com/user-attachments/assets/9241fde6-7605-4a3b-b479-8aabf602aad8" />
<img width="1536" height="1137" alt="IMG_1410" src="https://github.com/user-attachments/assets/ccc4ef1c-dbe2-473d-ad1d-ea6a5afe326b" />
![IMG_1411](https://github.com/user-attachments/assets/4de3950a-bacd-42dc-b0e0-30c4972afbe7)
<img width="1411" height="417" alt="IMG_1413" src="https://github.com/user-attachments/assets/2de4b10f-7a10-4899-b09f-f4d787b9a438" />
![IMG_1414](https://github.com/user-attachments/assets/2991de28-4afb-46c6-b1a9-136464500c5e)



🤝 Contributing
Contributions are welcome!
To contribute:
Fork the project
Create your feature branch
git checkout -b feature/my-feature
Commit your changes
Push the branch and open a Pull Request
Please ensure code is formatted and typed properly.

📌 Roadmap
Multi-room environment memory
Custom MR widgets (clock, kanban board, holographic file browser)
Full gesture-based interactions
Enhanced AI agent with autonomy + focus coaching
Mobile + headset-ready build
Add spatial sound cues

🪪 License
Distributed under the MIT License.
See LICENSE for details.

⭐ Support the Project
If RoomMind inspires you, please consider starring the repo — it helps others discover the project and supports continued development
