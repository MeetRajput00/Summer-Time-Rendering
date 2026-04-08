# Summer Time Rendering: The RPG

A 2D sprite-based, browser-based single-player RPG inspired by the anime/manga *Summer Time Rendering*. Built with modern web technologies, this project focuses on a single-player RPG experience with mystery, time-loop mechanics, and narrative depth.

## 🌟 Vision
To create a production-grade interactive world where players can explore the mystery of Hitogashima island, interact with NPCs, and face the "Shadows" in a fully single-player environment.

## 🛠 Tech Stack
- **Frontend**: [Phaser 3](https://phaser.io/) (Game Engine), [React](https://reactjs.org/) (UI/HUD), [Vite](https://vitejs.dev/) (Build tool)
- **Backend**: [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), [tsx](https://github.com/privatenumber/tsx) (Modern runner) for save states
- **Shared**: [TypeScript](https://www.typescriptlang.org/) (Strongly typed patterns across client and server)
- **Monorepo Management**: npm Workspaces

## 📁 Project Structure
The project uses a monorepo structure to share types and logic between the client and server.

```text
.
├── packages/
│   ├── client/     # Phaser + React frontend
│   ├── server/     # Node.js REST API for persistence
│   └── shared/     # Shared types and game logic
├── docs/           # Project documentation and roadmaps
└── assets/         # Raw assets and sprite sources
```

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (included with Node.js)

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd summer-time-rendering
   ```
2. Install dependencies for the entire monorepo:
   ```bash
   npm install
   ```

### Running Locally
You can run both the client and server simultaneously using the root command:
```bash
npm run dev
```
- **Client**: [http://localhost:5173](http://localhost:5173)
- **Server**: [http://localhost:3000](http://localhost:3000)

## 🏗 Development Workflow

### Shared Package
If you modify `packages/shared`, ensure it is built so the client and server can see the changes:
```bash
npm run build -w @summer/shared
```

### REST API Backend
The server provides endpoints for:
- Saving and loading loop states.
- Persisting high-level progression.

### Client-Side Rendering
The client is responsible for:
- Interpolating player/NPC positions for smooth visuals.
- Rendering the tilemap and sprites.
- Handling local UI animations and inputs.

## 📖 Documentation
Detailed documentation is kept in the `docs/` directory:
- [Roadmap & Tasks](docs/01_PM_Roadmap_and_Tasks.md): Current progress and future goals.
- [Story & Gameplay](docs/02_Story_and_Gameplay_Tasks.md): Narrative details and mechanics.

## 🤝 Contributing
1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Follow the established TypeScript patterns in `packages/shared`.
3. Ensure the project builds without errors: `npm run build`
4. Submit a Pull Request.

---
*Inspired by the work of Yasuki Tanaka.*
