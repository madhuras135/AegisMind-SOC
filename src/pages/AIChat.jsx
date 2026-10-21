import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, TerminalSquare, Search, MessageSquare, History, ShieldAlert } from 'lucide-react';
import { Button } from '../components/ui';

export default function AIChat() {
  const [input, setInput] = useState('');
  const endOfMessagesRef = useRef(null);

  const mockHistory = [
    { id: 1, title: 'Analyze Redis Exposure', time: '10:24 AM' },
    { id: 2, title: 'Correlate Ingress Logs', time: '09:15 AM' },
    { id: 3, title: 'What-If: Patch CVE-2024-1337', time: 'YESTERDAY' },
    { id: 4, title: 'Vendor NPM Risk Assessment', time: 'YESTERDAY' },
  ];

  const [conversation, setConversation] = useState([
    {
      role: 'user',
      content: 'Analyze the recent anomalies on api.prod. Specifically looking for JWT Exfiltration indicators.',
    },
    {
      role: 'ai',
      isTyping: false,
      logicChain: [
        '[ANALYZING] Query parameters identified: "api.prod", "JWT Exfiltration"',
        '[CROSS-REF] Checking CVE database and ingress logs window 24H...',
        '[CORRELATION] Found matching signature: CVE-2024-1337',
        '[CONCLUSION] Risk level CRITICAL. Immediate intervention required.'
      ],
      content: `AegisMind Neural Core has completed the analysis of **api.prod**.

**Findings:**
Multiple unauthorized attempts to access \`/api/v1/auth/tokens\` were detected originating from an unknown IP block. The payload matches known signatures for CVE-2024-1337, attempting to bypass input validation and dump active JWTs.

**Code Execution Vector:**
\`\`\`javascript
// Vulnerable API Route
app.post('/api/v1/auth/tokens', (req, res) => {
  const { userId } = req.body;
  // Missing input sanitization allows NoSQL injection
  db.collection('tokens').find({ userId: userId }).toArray((err, tokens) => {
    // ...
  });
});
\`\`\`

**Risk Mitigation Checklist:**
- [x] Block originating IP range immediately (Automated Action Initiated)
- [ ] Patch input validation layer (Sanitize \`userId\` parameter)
- [ ] Force rotate all active JWTs for affected users
- [ ] Apply temporary WAF rule to rate-limit \`/api/v1/auth/tokens\`

Confidence Interval: **94.2%**`,
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // In a real app we'd add the user message, then stream the AI response.
    // For this mock, we just add the user message and a stub.
    setConversation(prev => [
      ...prev, 
      { role: 'user', content: input },
      { 
        role: 'ai', 
        logicChain: ['[PROCESSING] Receiving user input...'], 
        content: 'System acknowledging input. Additional context required to execute query.' 
      }
    ]);
    setInput('');
  };

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6 font-mono relative overflow-hidden">
      {/* Left Side: History */}
      <div className="w-64 bg-[#0f172a]/50 border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] rounded flex flex-col backdrop-blur-md hidden md:flex shrink-0 relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.02)_2px,rgba(255,255,255,0.02)_4px)] pointer-events-none" />
        
        <div className="p-4 border-b border-white/5 bg-[#020617]/50 relative z-10">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
            <History className="h-4 w-4 text-blue-500" />
            Session Logs
          </h3>
        </div>
        
        <div className="p-3 relative z-10">
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-500" />
            <input 
              type="text" 
              placeholder="SEARCH LOGS..." 
              className="w-full bg-[#020617] border border-white/10 rounded pl-8 pr-3 py-1.5 text-[9px] uppercase tracking-widest text-slate-300 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1 relative z-10">
          {mockHistory.map(item => (
            <div key={item.id} className="p-2 rounded hover:bg-[#020617]/50 border border-transparent hover:border-white/5 cursor-pointer transition-colors group">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[9px] text-slate-500 uppercase tracking-widest">{item.time}</span>
              </div>
              <p className="text-[10px] text-slate-300 truncate group-hover:text-blue-400 transition-colors uppercase tracking-wider">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side: Terminal */}
      <div className="flex-1 bg-[#020617] border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),_0_0_20px_rgba(59,130,246,0.1)] rounded flex flex-col relative overflow-hidden z-10">
        {/* CRT Scanline Overlay */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.05)_2px,rgba(255,255,255,0.05)_4px)] pointer-events-none z-20" />
        {/* Edge Lighting Top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent z-20" />

        <div className="flex items-center justify-between p-4 border-b border-white/5 bg-[#0f172a]/30 relative z-10">
          <div className="flex items-center gap-3">
            <TerminalSquare className="h-5 w-5 text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-widest">Neural Terminal</h2>
            <span className="text-[9px] text-slate-500 bg-[#020617] border border-white/10 px-1.5 py-0.5 rounded ml-2">MODEL: CLAUDE-3.5-SONNET</span>
          </div>
          <div className="flex gap-2">
             <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
             <span className="text-[9px] text-blue-400 tracking-widest uppercase">CONNECTION SECURE</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 relative z-10 scrollbar-thin scrollbar-thumb-slate-800">
          {conversation.map((msg, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              {msg.role === 'user' ? (
                <div className="max-w-[80%] bg-[#0f172a] border border-white/10 rounded p-4 text-xs text-slate-300 shadow-md">
                  <span className="text-blue-500 mr-2">{'>'}</span>{msg.content}
                </div>
              ) : (
                <div className="w-full max-w-[90%]">
                  {/* Logic Chain */}
                  {msg.logicChain && (
                    <div className="mb-4 pl-4 border-l-2 border-blue-500/30 space-y-1">
                      {msg.logicChain.map((step, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.2 }}
                          className={`text-[10px] ${step.includes('CRITICAL') ? 'text-rose-400' : 'text-blue-400/80'} uppercase tracking-widest`}
                        >
                          {step}
                        </motion.div>
                      ))}
                    </div>
                  )}
                  
                  {/* Main Content */}
                  <div className="bg-[#020617] border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] rounded p-5 text-xs text-slate-300 leading-relaxed border-l-2 border-l-blue-500">
                     {/* Super simple markdown parser for the mock */}
                     <div className="space-y-4">
                       {msg.content.split('\n\n').map((paragraph, pIdx) => {
                         if (paragraph.startsWith('\`\`\`')) {
                           return (
                             <pre key={pIdx} className="bg-[#0f172a] border border-white/5 p-3 rounded text-[10px] text-emerald-400 overflow-x-auto">
                               <code>{paragraph.replace(/\`\`\`javascript|\`\`\`/g, '')}</code>
                             </pre>
                           );
                         }
                         if (paragraph.startsWith('**')) {
                            const lines = paragraph.split('\n');
                            return (
                              <div key={pIdx}>
                                {lines.map((line, lIdx) => {
                                  if (line.startsWith('- [ ]') || line.startsWith('- [x]')) {
                                    return <div key={lIdx} className="ml-4 my-1 flex items-start gap-2 text-[11px]"><span className={line.includes('[x]') ? 'text-blue-500' : 'text-slate-500'}>{line.includes('[x]') ? '[X]' : '[ ]'}</span> <span className={line.includes('[x]') ? 'text-slate-300 line-through opacity-70' : 'text-slate-300'}>{line.replace(/- \[[x ]\] /, '')}</span></div>;
                                  }
                                  return <p key={lIdx} className={line.startsWith('**') ? 'text-blue-400 font-bold mb-2 uppercase tracking-widest' : ''}>{line.replace(/\*\*/g, '')}</p>
                                })}
                              </div>
                            )
                         }
                         
                         return <p key={pIdx}>{paragraph}</p>;
                       })}
                     </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
          <div ref={endOfMessagesRef} />
        </div>

        <div className="p-4 bg-[#0f172a]/50 border-t border-white/5 relative z-10 backdrop-blur-md">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <span className="absolute left-4 text-blue-500 font-bold">{'>'}</span>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="QUERY NEURAL CORE..." 
              className="w-full bg-[#020617] border border-white/10 rounded pl-8 pr-12 py-3 text-xs uppercase tracking-widest text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]"
            />
            {/* Blinking Cursor Simulation (if empty) */}
            {input.length === 0 && (
              <span className="absolute left-[165px] top-1/2 -translate-y-1/2 w-1.5 h-4 bg-blue-500 animate-pulse" />
            )}
            
            <button 
              type="submit" 
              disabled={!input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded text-slate-500 hover:text-blue-400 hover:bg-[#020617] transition-colors disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          <div className="flex justify-between items-center mt-2 px-2">
            <p className="text-[8px] text-slate-600 uppercase tracking-widest">PRESS ENTER TO EXECUTE</p>
            <p className="text-[8px] text-slate-600 uppercase tracking-widest">AEGISMIND NEURAL TERMINAL V2.4</p>
          </div>
        </div>
      </div>
    </div>
  );
}
