import { useState } from "react";
import UsernameModal from "./components/UsernameModal";
import GameCanvas from "./components/GameCanvas";
import ChatPanel from "./components/ChatPanel";
import useSocket from "./hooks/useSocket";

export default function App() {
  const [username, setUsername] = useState("");

  const { socket, messages, players, selfId, connections, toast, sendMove } =
    useSocket(username);

  if (!username) {
    return <UsernameModal onEnter={setUsername} />;
  }

  const isConnected = connections.length > 0;

  return (
    <div className="w-screen h-screen flex relative bg-cosmos-950 overflow-hidden font-sans antialiased">
      {/* Game area */}
      <div className="flex-1 h-full relative min-w-0">
        <GameCanvas
          selfId={selfId}
          players={players}
          messages={messages}
          onMove={sendMove}
          proximityActive={isConnected}
        />

        {/* HUD: Connection Indicator */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
          <div className={`glass px-5 py-2.5 rounded-2xl flex items-center gap-3 transition-all duration-500 transform ${isConnected ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-white tracking-widest uppercase">
              Established: {connections.map((c) => c.name).join(", ")}
            </span>
          </div>
        </div>

        {/* HUD: Controls Info (Bottom Left) */}
        <div className="absolute bottom-6 left-6 z-40 pointer-events-none opacity-40 hover:opacity-100 transition-opacity">
          <div className="glass px-4 py-3 rounded-xl space-y-2">
             <div className="flex gap-2">
                <span className="w-6 h-6 flex items-center justify-center rounded border border-white/20 text-[10px] font-bold">W</span>
                <span className="w-6 h-6 flex items-center justify-center rounded border border-white/20 text-[10px] font-bold">A</span>
                <span className="w-6 h-6 flex items-center justify-center rounded border border-white/20 text-[10px] font-bold">S</span>
                <span className="w-6 h-6 flex items-center justify-center rounded border border-white/20 text-[10px] font-bold">D</span>
                <span className="text-[10px] self-center ml-1 text-gray-400 font-bold uppercase tracking-wider">Navigate</span>
             </div>
          </div>
        </div>

        {/* HUD: Toasts */}
        {toast && (
          <div
            className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-2xl text-white font-medium shadow-2xl backdrop-blur-2xl border transition-all animate-bounce-in ${
              toast.type === "connected"
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-100"
                : "bg-rose-500/10 border-rose-500/20 text-rose-100"
            }`}
          >
            <div className="flex items-center gap-3">
               <div className={`w-2 h-2 rounded-full ${toast.type === 'connected' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.8)]'}`} />
               {toast.text}
            </div>
          </div>
        )}
      </div>

      {/* Floating Chat sidebar */}
      {isConnected && (
        <div className="absolute right-6 top-6 bottom-6 w-96 z-40">
          <ChatPanel
            socket={socket}
            messages={messages}
            connections={connections}
          />
        </div>
      )}
    </div>
  );
}