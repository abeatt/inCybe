import React, { useState, useEffect } from 'react';

/**
 * inCybe Demo Dashboard
 * Industrial Dark Chrome Aesthetic for Phase 1 Demo
 */
const DemoDashboard = () => {
  const [stats, setStats] = useState({ docCount: 0, lastSync: null });
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [status, setStatus] = useState('OFFLINE');

  // Use the port being reported by the server logs
  const API_BASE = window.location.origin.replace(':5173', ':3001');

  // Fetch Vault Stats from the backend (db.js -> API)
  useEffect(() => {
    console.log(`[inCybe] Attempting connection to API at: ${API_BASE}`);
    fetch(`${API_BASE}/api/stats`)
      .then(res => res.json())
      .then(data => { setStats(data); setStatus('ONLINE'); })
      .catch(err => { console.error("Stats fetch failed", err); setStatus('ERROR'); });
  }, []);

  const handleQuery = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: query })
      });
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setResults({ answer: "Error connecting to RAG Engine." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a] font-['Rajdhani'] text-[#e0e0e0] p-4">
      {/* Header / Status Bar */}
      <header className="flex justify-between items-center border-b border-[#ffd70033] pb-2 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-widest text-[#ffd700] uppercase font-['Oswald']">inCybe // Command</h1>
          <p className="text-xs text-[#888] font-['Share_Tech_Mono']">LOCAL_INTELLIGENCE_LAYER_V1.0</p>
          <span className={`text-[10px] ${status === 'ONLINE' ? 'text-green-500' : 'text-red-500'}`}>● {status}</span>
        </div>
        <div className="text-right flex space-x-6">
          <div className="flex flex-col">
            <span className="text-[10px] text-[#888] uppercase">Documents</span>
            <span className="text-[#ffd700] font-bold">{stats.docCount}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-[#888] uppercase">Last Sync</span>
            <span className="text-[#e0e0e0] text-xs">{stats.lastSync ? new Date(stats.lastSync).toLocaleTimeString() : 'NEVER'}</span>
          </div>
        </div>
      </header>

      {/* Main Terminal Area */}
      <main className="flex-1 overflow-y-auto space-y-6">
        <form onSubmit={handleQuery} className="relative">
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask your vault anything..."
            className="w-full bg-[#111] border border-[#333] p-4 rounded-sm focus:border-[#ffd700] outline-none transition-all font-['Share_Tech_Mono']"
          />
          <button 
            disabled={loading}
            className="absolute right-2 top-2 bottom-2 px-6 bg-[#ffd700] text-black font-bold uppercase text-sm hover:bg-[#ffed4a] transition-colors disabled:bg-[#333]"
          >
            {loading ? 'Thinking...' : 'Execute'}
          </button>
        </form>

        {results && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* The LLM Answer */}
            <div className="bg-[#1a1a1a] p-6 border-l-4 border-[#ffd700] rounded-r-md">
              <p className="leading-relaxed text-lg">{results.answer}</p>
            </div>

            {/* Grounded Sources */}
            <div className="mt-6">
              <h3 className="text-xs font-bold text-[#888] uppercase tracking-tighter mb-3">Retrieved Context Sources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {results.sources?.map((source, i) => (
                  <div key={i} className="bg-[#111] border border-[#222] p-3 rounded hover:border-[#444] transition-all">
                    <div className="text-[#ffd700] text-xs font-bold truncate mb-1">
                      {source.path.split(/[\\/]/).pop()}
                    </div>
                    <p className="text-[11px] text-[#777] italic leading-tight">
                      "{source.excerpt}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer Branding */}
      <footer className="mt-auto pt-4 text-center">
        <div className="text-[10px] tracking-[0.3em] text-[#333] uppercase">
          Forged by Giblets Creations
        </div>
      </footer>
    </div>
  );
};

export default DemoDashboard;