import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { 
  Shield, LayoutDashboard, Network, AlertTriangle, 
  Database, Bell, FileText, BrainCircuit, MessageSquare, 
  Settings, ChevronLeft, ChevronRight, Search, Sun, Moon 
} from 'lucide-react';
import { cn } from './ui';
import { motion } from 'framer-motion';
import ChatWidget from './ChatWidget';

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const [tickerText, setTickerText] = useState('BOOTING CORE...');

  useEffect(() => {
    const sequence = [
      { text: 'BOOTING CORE...', delay: 1000 },
      { text: 'SYNCING NODES...', delay: 2000 },
      { text: 'ANALYZING VULNS...', delay: 3500 },
      { text: 'SYSTEM: OPTIMAL // NODES: 47 // LATENCY: 24ms', delay: 5000 },
    ];
    let timeouts = sequence.map(seq => setTimeout(() => setTickerText(seq.text), seq.delay));
    return () => timeouts.forEach(clearTimeout);
  }, []);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Attack Surface', icon: Network, path: '/attack-surface' },
    { name: 'Vulnerabilities', icon: AlertTriangle, path: '/vulnerabilities' },
    { name: 'Assets', icon: Database, path: '/assets' },
    { name: 'Alerts', icon: Bell, path: '/alerts' },
    { name: 'Reports', icon: FileText, path: '/reports' },
    { name: 'Intelligence', icon: BrainCircuit, path: '/intelligence' },
    { name: 'AI Chat', icon: MessageSquare, path: '/chat' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  const getPageTitle = () => {
    const current = navItems.find(item => item.path === location.pathname);
    if (current) return current.name;
    if (location.pathname === '/onboarding') return 'Onboarding';
    return 'Dashboard';
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#020617] text-slate-100 relative">
      {/* Scanline Animation */}
      <motion.div 
        initial={{ top: '-10%' }}
        animate={{ top: '110%' }}
        transition={{ duration: 2, ease: "linear" }}
        className="absolute left-0 right-0 h-1 bg-white/10 z-50 pointer-events-none shadow-[0_0_15px_rgba(255,255,255,0.5)]"
      />

      {/* Sidebar */}
      <aside 
        className={cn(
          "flex flex-col border-r border-white/5 bg-[#0f172a] transition-all duration-300 relative z-40",
          sidebarOpen ? "w-60" : "w-16"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-white/5 bg-[#020617]/50">
          <div className="flex items-center overflow-hidden">
            <img src="/aegismind-logo.png" alt="AegisMind Logo" className="h-8 w-8 object-contain shrink-0 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
            <span className={cn("ml-3 text-xl font-bold font-mono tracking-widest text-slate-100 transition-opacity duration-300 uppercase", !sidebarOpen && "opacity-0 w-0")}>
              Aegis<span className="text-blue-500">Mind</span>
            </span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center px-3 py-2.5 rounded-lg transition-colors group relative",
                isActive 
                  ? "bg-blue-500/10 text-blue-500" 
                  : "text-slate-400 hover:bg-slate-700 hover:text-slate-100"
              )}
            >
              {({ isActive }) => (
                <>
                  {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-r-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />}
                  <item.icon className={cn("h-5 w-5 shrink-0 transition-all", isActive ? "text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] opacity-100" : "text-slate-500 opacity-40 group-hover:opacity-100 group-hover:text-slate-300")} />
                  <span className={cn("ml-3 font-mono text-xs tracking-widest uppercase transition-opacity duration-300", !sidebarOpen && "opacity-0 w-0 overflow-hidden")}>
                    {item.name}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/5 p-3">
          <div className="flex items-center rounded p-2 hover:bg-[#020617] cursor-pointer transition-colors">
            <div className="h-8 w-8 rounded-full bg-[#020617] border border-white/10 flex items-center justify-center text-xs font-mono font-bold tracking-wider">
              AS
            </div>
            <div className={cn("ml-3 overflow-hidden transition-all duration-300", !sidebarOpen && "opacity-0 w-0")}>
              <p className="text-xs font-mono text-slate-200 tracking-wider uppercase">Arjun Sharma</p>
              <p className="text-[9px] font-mono tracking-widest text-slate-500 uppercase">SYS_ADMIN</p>
            </div>
          </div>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mt-4 w-full flex items-center justify-center py-2 text-slate-500 hover:text-slate-200 bg-[#020617]/50 hover:bg-[#020617] border border-white/5 rounded transition-colors"
          >
            {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/5 bg-[#0f172a]/80 backdrop-blur-md px-6 shadow-[inset_0_-1px_0_rgba(255,255,255,0.05)] z-20">
          <div className="flex items-center gap-6">
            <h1 className="text-sm font-mono tracking-widest uppercase text-slate-200">{getPageTitle()}</h1>
            <div className="hidden md:flex items-center gap-2 border-l border-white/10 pl-6 h-8">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              <span className="font-mono text-[10px] text-blue-400 tracking-widest uppercase">
                {tickerText}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative w-64 lg:w-80 hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input 
                type="text" 
                placeholder="QUERY SYSTEM..." 
                className="h-9 w-full rounded border border-white/10 bg-[#020617] pl-10 pr-4 text-xs font-mono text-slate-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-colors"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-white/10 bg-[#0f172a] px-1.5 font-mono text-[9px] font-bold text-slate-500 tracking-wider">
                  CMD+K
                </kbd>
              </div>
            </div>

            <button className="relative rounded p-2 text-slate-500 hover:bg-[#020617] hover:text-slate-300 transition-colors border border-transparent hover:border-white/5">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-[#0f172a]"></span>
            </button>
            
            <button className="rounded p-2 text-slate-500 hover:bg-[#020617] hover:text-slate-300 transition-colors border border-transparent hover:border-white/5">
              <Moon className="h-4 w-4" />
            </button>

            <button className="inline-flex h-9 items-center justify-center rounded bg-blue-600 px-4 py-2 font-mono text-[10px] tracking-widest uppercase text-white shadow transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-400">
              INITIATE SCAN
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-[#020617] p-6 relative z-10">
          <Outlet />
        </main>
      </div>
      
      {/* Floating Chat Widget */}
      <ChatWidget />
    </div>
  );
}
