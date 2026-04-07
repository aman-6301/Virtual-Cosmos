import { useState, useRef, useEffect } from "react";

export default function ChatPanel({ socket, messages, connections }) {
  const [text, setText] = useState("");
  const scrollRef = useRef(null);

  const isConnected = connections.length > 0;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    const trimmedMessage = text.trim();
    if (!trimmedMessage || !socket || !isConnected) return;

    socket.emit("chat:message", {
      text: trimmedMessage,
    });

    setText("");
  };

  return (
    <div className="w-full h-full glass rounded-[2rem] flex flex-col overflow-hidden border-white/20">
      {/* Header */}
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500/20 rounded-xl">
             <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
             </svg>
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-widest uppercase">Communication</h2>
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-emerald-400' : 'bg-rose-400'}`} />
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                {isConnected ? `${connections.length} Connection(s) Active` : 'Signal Lost - No Proximity'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
        {!isConnected ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 px-6 opacity-60">
             <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
             </div>
             <div className="space-y-1">
                <p className="text-white text-sm font-bold uppercase tracking-widest">Isolation Mode</p>
                <p className="text-xs text-gray-500 font-medium">Move closer to others to bridge the void.</p>
             </div>
          </div>
        ) : (
          messages?.map((msg, index) => (
            <div key={index} className="group flex flex-col gap-1 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-purple-400 uppercase tracking-tighter">{msg.username}</span>
                <span className="text-[9px] text-gray-600 font-bold group-hover:opacity-100 opacity-0 transition-opacity">{msg.time}</span>
              </div>
              <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-none p-3.5 backdrop-blur-sm group-hover:border-white/20 transition-all">
                <p className="text-sm text-gray-200 leading-relaxed font-medium">{msg.text}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <div className="p-6 border-t border-white/10">
        <div className={`flex gap-3 items-center bg-white/5 p-2 rounded-2xl border transition-all ${isConnected ? 'border-white/10 focus-within:border-purple-500/50 focus-within:ring-4 focus-within:ring-purple-500/10' : 'border-transparent opacity-50'}`}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={!isConnected}
            placeholder={isConnected ? "Broadcast message..." : "Proximity required..."}
            className="flex-1 bg-transparent text-white text-sm px-3 py-1 outline-none font-medium placeholder:text-gray-600"
          />

          <button
            onClick={handleSend}
            disabled={!isConnected}
            className="p-3 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-800 disabled:opacity-50 text-white rounded-xl transition-all shadow-lg shadow-purple-900/40"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}