import React, { useState, useEffect, useRef } from 'react';

// Dynamically resolve API base to support S24 Ultra network access
const API_BASE = window.location.origin.replace(':5173', ':3001');

export default function App() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState({ docCount: '...', lastSync: null });
  const [loading, setLoading] = useState(false);
  const [indexing, setIndexing] = useState(false);
  const scrollRef = useRef(null);

  // Fetch Vault Status
  useEffect(() => {
    fetch(`${API_BASE}/api/stats`)
      .then(res => res.json())
      .then(setStats)
      .catch(err => console.error("Server unreachable", err));
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const triggerReindex = async () => {
    setIndexing(true);
    try {
      const res = await fetch(`${API_BASE}/api/reindex`, { method: 'POST' });
      if (res.ok) {
        // Re-fetch stats immediately after the server acknowledges the start
        const newStats = await fetch(`${API_BASE}/api/stats`).then(r => r.json());
        setStats(newStats);
      }
    } catch (err) {
      setIndexing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    const userMsg = { role: 'user', content: query };
    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: query })
      });
      
      const data = await res.json();
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.answer,
        sources: data.sources 
      }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "⚠️ Connection to inCybe core lost." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto border-x border-[#222]">
      {/* Header */}
      <header className="p-6 border-b border-[#222] flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="gold-gradient-text text-2xl font-bold">inCybe</h1>
          <p className="font-mono text-[10px] text-gray-500 uppercase">Industrial Intelligence Layer</p>
        </div>
        <button 
          onClick={triggerReindex}
          disabled={indexing}
          className={`text-right group ${indexing ? 'animate-pulse' : ''}`}
        >
          <p className="font-mono text-[10px] text-gray-500 uppercase group-hover:text-[#bf953f] transition-colors">Vault Integrity</p>
          <p className="font-mono text-xs text-[#bf953f]">{indexing ? 'SYNCING...' : stats.docCount === '...' ? 'CONNECTING...' : `${stats.docCount} Nodes Indexed`}</p>
        </button>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-sm ${m.role === 'user' ? 'bg-[#222] border border-[#333]' : 'chrome-card'}`}>
              <p className="text-sm leading-relaxed">{m.content}</p>
              
              {m.sources && (
                <div className="mt-4 pt-3 border-t border-[#222] space-y-2">
                  <p className="font-mono text-[10px] uppercase text-gray-500">Sources</p>
                  {m.sources.map((s, si) => (
                    <div key={si} className="group/source chrome-card p-2 border-[#333] hover:border-[#bf953f] transition-colors cursor-help">
                      <div className="text-[11px] text-[#bf953f] font-bold truncate">
                        [{s.path.split(/[\\/]/).pop()}]
                      </div>
                      <p className="text-[10px] text-gray-500 italic mt-1 line-clamp-2 leading-tight group-hover/source:text-gray-300 transition-colors">
                        "{s.excerpt}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && <div className="text-xs font-mono animate-pulse text-gray-500">GENERATE_RESPONSE_IN_PROGRESS...</div>}
        <div ref={scrollRef} />
      </main>

      {/* Input Area */}
      <footer className="p-4 border-t border-[#222]">
        <form onSubmit={handleSubmit} className="relative">
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="QUERY_THE_VAULT..."
            className="w-full bg-[#111] border border-[#333] p-4 pr-12 text-sm font-mono focus:outline-none focus:border-[#bf953f] transition-colors"
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#bf953f] hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
          </button>
        </form>
        <div className="mt-2 text-center">
          <p className="font-mono text-[9px] text-gray-600 uppercase tracking-tighter">
            Local Instance: {API_BASE} // Node: ACTIVE
          </p>
        </div>
      </footer>
    </div>
  );
}