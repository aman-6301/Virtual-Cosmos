# 🌌 Virtual Cosmos

Virtual Cosmos is a high-performance, real-time spatial networking application. It combines a high-fidelity 2D canvas engine with proximity-based communication to create an immersive digital void where users can interact, move, and chat in a shared universe.

---

## 🚀 Key Features

- **Spatial Communication**: Dynamic proximity-based chat system. You can only communicate with users within your "Cosmic Radius."
- **High-Performance Rendering**: Built on **PixiJS (v8)**, utilizing WebGL/WebGPU for smooth 60FPS movement and animations.
- **Glassmorphism UI**: A modern, sleek interface built with **Tailwind CSS 4**, featuring frosted glass effects, neon glows, and smooth transitions.
- **Real-time Synchronization**: Low-latency player movement and state synchronization powered by **Socket.io**.
- **Persistent History**: Chat sessions and messages are persisted in **MongoDB**, allowing for future room-based history retrieval.
- **Interactive Feedback**: Dynamic visual indicators for proximity, connection status, and real-time "bubble" chat overlays above avatars.

---

## 🛠️ Technology Stack

### 💻 Frontend (Client)
- **React 18**: Component-based UI library for managing application state and HUD.
- **PixiJS v8**: Advanced 2D web graphics engine for high-performance canvas rendering.
- **Tailwind CSS 4**: Utility-first CSS framework for modern, responsive glassmorphism design.
- **Socket.io-client**: Real-time bidirectional event-based communication.
- **Vite**: Ultra-fast frontend build tool and development server.
- **Lucide/SVG**: Optimized vector graphics for a clean, professional aesthetic.

### ⚙️ Backend (Server)
- **Node.js**: Asynchronous event-driven JavaScript runtime.
- **Express**: Minimalist web framework for handling REST API endpoints.
- **Socket.io**: Real-time engine for player state broadcasting and proximity logic.
- **MongoDB**: NoSQL database for persistent storage of chat messages and sessions.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **Dotenv**: Zero-dependency module for loading environment variables.

---

## 🔌 API Endpoints

The server exposes a RESTful API for retrieving historical data and managing the cosmos state.

### 💬 Chat History
- **`GET /history/:roomKey`**
  - **Description**: Fetches the last 50 messages for a specific interaction room.
  - **Parameters**: `roomKey` (A stable identifier generated from sorted participant IDs).
  - **Response**: `200 OK` with an array of message objects (username, text, timestamp).

### 🌍 World State
- **`GET /`**
  - **Description**: Health check endpoint to verify server status.
  - **Response**: `200 OK` - "Virtual Cosmos server is running".

---

## 📂 Project Structure

```text
virtual-cosmos/
├── client/                 # Frontend Application
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # React UI components (Chat, Modal, Canvas)
│   │   ├── game/           # PixiJS logic & Sprite management
│   │   ├── hooks/          # Custom React hooks (Socket, Proximity)
│   │   ├── shared/         # Constants shared across client files
│   │   ├── App.jsx         # Main Layout & HUD Orchestration
│   │   ├── main.jsx        # React entry point
│   │   └── index.css       # Global styles & Tailwind 4 layers
│   ├── .env.development    # Local development environment
│   ├── index.html          # HTML template
│   └── vite.config.js      # Vite configuration
│
└── server/                 # Backend Application
    ├── models/             # Mongoose schemas (Message, Session)
    ├── constants.js        # Server-side constants (Radii, World Size)
    ├── db.js               # Database connection logic
    ├── roomManager.js      # logic for managing room interactions
    ├── index.js            # Socket.io events & Express server
    └── .env                # Server environment variables
```

---

## 💡 Key Architectural Ideas

### 1. Spatial Logic (Proximity Radius)
The "Magic" of the cosmos lies in its spatial constraints. Both the client (visually) and the server (authoritatively) enforce a `PROXIMITY_RADIUS`. 
- **Server-side Validation**: The server recomputes proximity every time a player moves, ensuring chat messages are only broadcast to nearby peers.
- **Client-side Feedback**: The UI dynamically updates the "Proximity Ring" around your avatar to indicate when you've successfully established a link with another user.

### 2. Rendering Optimization
Instead of using React for the game world (which would cause excessive re-renders), the project uses a **Managed PixiJS Instance**. React handles the "Shell" (HUD, Chat Panel), while PixiJS handles the high-frequency tick loop for player movement and interpolation.

### 3. Input Handling
To prevent "Ghost Movement," the engine intelligently monitors focus states. When the user is actively typing in the `ChatPanel` or `UsernameModal`, global WASD listeners are bypassed, allowing for seamless communication without moving the avatar.

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (Local or Atlas)

### Server Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your MongoDB URI:
   ```env
   MONGO_URI=mongodb://localhost:27017/virtual-cosmos
   PORT=3001
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Client Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.development` file and point it to your server:
   ```env
   VITE_SERVER_URL=http://localhost:3001
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🎮 How to Play

1. **Join**: Enter your name in the "Command Center" to spawn in the cosmos.
2. **Move**: Use **WASD** or **Arrow Keys** to navigate the digital void.
3. **Connect**: Move your purple proximity ring over another player (green avatar) to establish a communication link.
4. **Chat**: Once "Established," the chat panel on the right will unlock. Broadcast your messages to nearby players.
5. **View**: Messages will appear both in the chat sidebar and as floating bubbles above players' heads.

## 👤 Author

- **Aman Raj** - *Core Development & Architecture*

---

## 📜 License
This project is for demonstration and research purposes. Feel free to use and adapt it for your own digital universes.
