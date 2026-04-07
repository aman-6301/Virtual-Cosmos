import { useState } from "react";

export default function UsernameModal({ onEnter }) {
  const [name, setName] = useState("");

  const handleEnter = () => {
    if (name.trim()) {
      onEnter(name.trim());
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100] overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-[#05060f]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full animate-pulse-slow" style={{ animationDelay: '1.5s' }} />

      <div className="glass rounded-3xl p-10 w-full max-w-md flex flex-col gap-8 relative z-10 mx-4 border-white/20">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-tight">
            Virtual Cosmos
          </h1>
          <p className="text-gray-400 font-medium">
            Embark on a journey through the digital void.
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative group">
            <input
              autoFocus
              className="w-full bg-white/5 text-white rounded-2xl px-5 py-4 outline-none border border-white/10 focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all text-lg placeholder:text-gray-600"
              placeholder="Assign your designation..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleEnter()}
            />
          </div>

          <button
            onClick={handleEnter}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-2xl py-4 font-semibold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-purple-900/20 border border-white/10"
          >
            Enter the Void →
          </button>
        </div>

        <div className="flex flex-col items-center gap-4 text-xs font-medium text-gray-500 uppercase tracking-widest">
          <div className="flex gap-6 items-center">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              Live Presence
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Spatial Audio
            </span>
          </div>
          <p className="text-[10px] text-gray-600">
            Use WASD or Arrow Keys to navigate the universe
          </p>
        </div>
      </div>
    </div>
  );
}