import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Maximize2, Minimize2, Send, Bot, Shield, Loader2 } from 'lucide-react';
import { Badge, Button } from './ui';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef(null);

  const initialMessages = [
    { role: 'ai', text: 'Hello! I am SafeGuard AI. How can I assist you with your security posture today?' },
    { role: 'user', text: 'Why is my security score low?' },
    { role: 'ai', text: 'Your score is currently 64/100. This is primarily due to 2 critical CVEs discovered recently, a public exploit available for your S3 bucket, and an unauthenticated Redis instance. If you fix these issues, your score is projected to improve by 15 points.', actions: ['View Issues', 'Run AutoFix'] },
    { role: 'user', text: 'How do I fix the Redis exposure?' },
    { role: 'ai', text: 'To fix the Redis exposure on db-cache-01:\n1. Edit redis.conf and set `requirepass your_strong_password`.\n2. Ensure it only binds to local interfaces `bind 127.0.0.1`.\n3. Verify your VPC firewall blocks port 6379 from the internet.\nApplying this fix will increase your score by +8 points.', actions: ['Open AutoFix'] },
    { role: 'user', text: 'What’s our biggest risk right now?' },
    { role: 'ai', text: 'Your biggest risk is CVE-2024-1337 on api.prod.example.com. It has a CVSS of 9.8 (Remote Code Execution). An attacker could exploit this to pivot directly to db-primary and expose customer data.', actions: ['View CVE', 'Simulate Attack'] },
  ];

  const [messages, setMessages] = useState(initialMessages);

  const handleSend = (text = input) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: 'I understand. Since I am operating in a mock environment for this demo, I cannot perform real-time analysis on that specific query. However, I recommend checking the Vulnerabilities dashboard for more details.' 
      }]);
    }, 1500);
  };

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isOpen, isFullscreen]);

  const suggestions = [
    "Why is my score low?",
    "Most critical issue?",
    "Fix the database exposure",
    "Show attack path"
  ];

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:bg-blue-700 transition-colors flex items-center justify-center z-50 group"
      >
        <div className="absolute right-full mr-4 bg-slate-800 text-slate-200 text-sm py-1.5 px-3 rounded-lg border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none">
          Ask SafeGuard AI
        </div>
        <div className="relative flex items-center justify-center">
          <Shield className="h-7 w-7" />
          <MessageSquare className="h-3.5 w-3.5 absolute bottom-0 -right-1 text-blue-200" fill="currentColor" />
        </div>
      </button>
    );
  }

  const containerClasses = isFullscreen 
    ? "fixed inset-0 z-50 bg-slate-900 md:pl-60 pt-16 flex flex-col transition-all duration-300" // Takes up layout content area
    : "fixed bottom-6 right-6 w-full max-w-[400px] h-[600px] max-h-[85vh] bg-slate-900 border border-slate-700 shadow-2xl rounded-xl flex flex-col z-50 transition-all duration-300 overflow-hidden";

  return (
    <div className={containerClasses}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-slate-800 border-b border-slate-700 shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-purple-900/50 border border-purple-500/30 flex items-center justify-center">
            <Bot className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-slate-100 leading-none">SafeGuard AI</h3>
              <Badge variant="ai" className="px-1.5 py-0 text-[10px]">AI</Badge>
            </div>
            <p className="text-xs text-purple-300/80 mt-1">Powered by Claude Sonnet 4</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-700 transition-colors hidden md:block"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
          <button 
            onClick={() => { setIsOpen(false); setIsFullscreen(false); }}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-sm' 
                : 'bg-purple-950/40 border border-purple-800/50 text-slate-200 rounded-tl-sm'
            }`}>
              <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
              {msg.actions && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {msg.actions.map(act => (
                    <button key={act} className="text-xs bg-purple-900/40 hover:bg-purple-800 border border-purple-700/50 text-purple-200 px-3 py-1.5 rounded-md transition-colors">
                      {act}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-purple-950/40 border border-purple-800/50 rounded-2xl rounded-tl-sm px-4 py-4 flex gap-1 items-center">
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
            </div>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-slate-800 border-t border-slate-700 shrink-0">
        {!isFullscreen && (
          <div className="flex overflow-x-auto gap-2 pb-3 scrollbar-hide no-scrollbar -mx-4 px-4 mask-edges">
            {suggestions.map(s => (
              <button 
                key={s} 
                onClick={() => handleSend(s)}
                className="whitespace-nowrap text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1.5 rounded-full transition-colors border border-slate-600"
              >
                {s}
              </button>
            ))}
          </div>
        )}
        <div className="relative flex items-center">
          <input 
            type="text" 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask SafeGuard AI..."
            className="w-full bg-slate-900 border border-slate-700 rounded-full pl-4 pr-12 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
          />
          <button 
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-4 w-4 -ml-0.5" />
          </button>
        </div>
      </div>
      
      {/* CSS for edge masking on suggestions */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
