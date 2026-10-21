import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldAlert, Activity, AlertTriangle, ShieldCheck, 
  ArrowUpRight, ArrowDownRight, Clock, Shield, Database, Network
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, Tooltip as RechartsTooltip, YAxis } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent, Badge, Progress, NeuralInsight, Button } from '../components/ui';
import { mockActivityFeed, mockAlerts, mockScoreHistory } from '../data/mockData';

export default function Dashboard() {
  const [score, setScore] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      // Animate score 0 -> 64
      let current = 0;
      const interval = setInterval(() => {
        current += 1;
        setScore(current);
        if (current >= 64) clearInterval(interval);
      }, 20); 
      return () => clearInterval(interval);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Calculate needle rotation: 0 score = -90deg, 100 score = 90deg.
  // We want an overshoot to ~72, then settle back to 64.
  // Framer motion can handle the spring physics. We just pass the target rotation.
  const targetRotation = (64 / 100) * 180 - 90;

  return (
    <div className="space-y-6">
      {/* Top Row: Stat Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Score Card - Tachometer */}
        <Card className="relative overflow-hidden group">
          <CardContent className="p-6 flex flex-col items-center justify-between h-full min-h-[160px]">
            <div className="w-full flex justify-between items-start mb-2">
               <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Security Score</p>
               <span className="font-mono text-[10px] text-slate-500">SYS_ID: 809A</span>
            </div>
            
            <div className="relative w-48 h-24 mt-2">
              <svg className="w-full h-full" viewBox="0 0 100 50">
                {/* Background Track */}
                <path d="M 10 45 A 40 40 0 0 1 90 45" fill="none" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
                
                {/* Active Track */}
                <motion.path 
                  d="M 10 45 A 40 40 0 0 1 90 45" 
                  fill="none" 
                  stroke="#3b82f6" 
                  strokeWidth="8" 
                  strokeLinecap="round"
                  pathLength="100"
                  strokeDasharray="100"
                  initial={{ strokeDashoffset: 100 }}
                  animate={{ strokeDashoffset: 100 - score }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />

                {/* Ticks every 10 units */}
                {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(val => {
                   const angle = (val / 100) * Math.PI;
                   const x1 = 50 - 36 * Math.cos(angle);
                   const y1 = 45 - 36 * Math.sin(angle);
                   const x2 = 50 - 44 * Math.cos(angle);
                   const y2 = 45 - 44 * Math.sin(angle);
                   return <line key={val} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#334155" strokeWidth="1" />;
                })}
              </svg>
              
              {/* Needle */}
              <motion.div 
                className="absolute bottom-1 left-1/2 w-1 h-16 bg-gradient-to-t from-slate-300 to-white origin-bottom rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                style={{ marginLeft: '-2px', transformOrigin: 'bottom center' }}
                initial={{ rotate: -90 }}
                animate={{ rotate: targetRotation }}
                transition={{ type: 'spring', stiffness: 60, damping: 10, mass: 1 }}
              >
                 <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-slate-100 rounded-full shadow-lg" />
              </motion.div>

              <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center translate-y-4">
                <span className="text-3xl font-bold text-white tracking-tighter drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">{score}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col items-center gap-1 w-full">
               <div className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <ArrowUpRight className="h-3 w-3" /> +5 delta
               </div>
               <p className="font-mono text-[9px] text-slate-500 mt-1">CONFIDENCE INTERVAL: 94.2%</p>
            </div>
          </CardContent>
        </Card>

        {/* Other Stat Cards */}
        <Card hoverable critical>
          <CardContent className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Critical Threats</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-rose-500 drop-shadow-[0_0_10px_rgba(244,63,94,0.4)]">4</span>
                </div>
              </div>
              <div className="rounded border border-rose-900 bg-rose-950/30 p-2 shadow-[inset_0_0_10px_rgba(244,63,94,0.1)]">
                <ShieldAlert className="h-5 w-5 text-rose-500" />
              </div>
            </div>
            <div className="mt-4 flex justify-between items-end border-t border-slate-800 pt-2">
               <p className="font-mono text-[10px] text-slate-500">VEC: HIGH_RISK</p>
               <p className="font-mono text-[10px] text-rose-500 animate-pulse">ACTION REQ</p>
            </div>
          </CardContent>
        </Card>

        <Card hoverable>
          <CardContent className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Nodes</p>
                <div className="mt-2 text-3xl font-bold text-slate-100">47</div>
              </div>
              <div className="rounded border border-blue-900 bg-blue-950/30 p-2">
                <Activity className="h-5 w-5 text-blue-400" />
              </div>
            </div>
            <div className="mt-4 flex justify-between items-end border-t border-slate-800 pt-2">
               <p className="font-mono text-[10px] text-slate-500">LATENCY: 24MS</p>
               <p className="font-mono text-[10px] text-emerald-500">SYNCED</p>
            </div>
          </CardContent>
        </Card>

        <Card hoverable>
          <CardContent className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Anomalies Detected</p>
                <div className="mt-2 text-3xl font-bold text-slate-100">12</div>
              </div>
              <div className="rounded border border-amber-900 bg-amber-950/30 p-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              </div>
            </div>
            <div className="mt-4 flex justify-between items-end border-t border-slate-800 pt-2">
               <p className="font-mono text-[10px] text-slate-500">WINDOW: 24H</p>
               <p className="font-mono text-[10px] text-amber-500">ANALYZING</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Risk Assessment Card */}
      <Card className="border-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.03)]">
        <CardHeader className="pb-4 border-b border-slate-800 flex flex-row items-center justify-between">
          <CardTitle className="text-sm uppercase tracking-wider text-slate-300">AegisMind Assessment</CardTitle>
          <span className="font-mono text-[10px] text-slate-500 border border-slate-800 px-2 py-0.5 rounded">MODEL: CLAUDE-4-SONNET</span>
        </CardHeader>
        <CardContent className="grid gap-8 md:grid-cols-2 pt-6">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-slate-400">EXTERNAL EXPOSURE</span>
                <span className="text-amber-400">58%</span>
              </div>
              <Progress value={58} indicatorColor="bg-amber-500" className="h-1.5 bg-slate-800" />
            </div>
            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-slate-400">VULN SEVERITY</span>
                <span className="text-rose-500">71%</span>
              </div>
              <Progress value={71} indicatorColor="bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]" className="h-1.5 bg-slate-800" />
            </div>
            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-slate-400">ENTROPY LEVEL</span>
                <span className="text-blue-400">63%</span>
              </div>
              <Progress value={63} indicatorColor="bg-blue-500" className="h-1.5 bg-slate-800" />
            </div>
          </div>
          <div className="flex flex-col justify-center h-full">
            <NeuralInsight 
              steps={[
                "[01] CORRELATING INGRESS LOGS...",
                "[02] DETECTED: JWT EXFILTRATION ATTEMPT",
                "[03] CROSS-REFERENCING CVE-2024-1337",
                "[04] RISK ASSESSED: CRITICAL."
              ]}
              variant="critical"
            />
          </div>
        </CardContent>
      </Card>

      {/* Priority Panel — “Fix First” */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">Priority Intervention <span className="text-[10px] font-mono font-normal text-slate-500 ml-2">QUEUE: 3</span></h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { id: 1, severity: 'critical', asset: 'db-cache-01', title: 'Unauthenticated Edge Access', desc: 'Redis instance exposed. Potential data dump vector.', points: '+8 pts' },
            { id: 2, severity: 'critical', asset: 'api.prod.example.com', title: 'Binary Path Hijacking', desc: 'RCE via Log4j variant detected on ingress payload.', points: '+6 pts' },
            { id: 3, severity: 'high', asset: 'dev.example.com', title: 'Hardcoded Secrets', desc: 'S3 bucket sync script contains plaintext AWS keys.', points: '+4 pts' },
          ].map((item) => (
            <Card key={item.id} hoverable critical={item.severity === 'critical'} className="border-slate-800 transition-colors">
              <CardContent className="p-5 flex flex-col h-full relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant={item.severity}>{item.severity.toUpperCase()}</Badge>
                  <span className="font-mono text-xs text-emerald-400">{item.points}</span>
                </div>
                <h4 className="font-bold text-slate-200 mb-1">{item.title}</h4>
                <p className="font-mono text-xs text-blue-400 mb-3">{item.asset}</p>
                <p className="text-xs text-slate-400 mb-6 flex-1 leading-relaxed">{item.desc}</p>
                <div className="flex gap-2">
                  <Button size="sm" className="w-full font-mono text-[10px] tracking-widest uppercase">Patch</Button>
                  <Button size="sm" variant="outline" className="w-full font-mono text-[10px] tracking-widest uppercase bg-slate-900/50 hover:bg-slate-800">Simulate</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Middle Row */}
      <div className="grid gap-6 md:grid-cols-12">
        <Card className="md:col-span-5">
          <CardHeader className="border-b border-slate-800 pb-3">
            <CardTitle className="text-xs uppercase tracking-wider">Event Telemetry</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gradient-to-b before:from-slate-800 before:via-slate-700 before:to-transparent">
              {mockActivityFeed.map((item, i) => (
                <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border border-slate-700 bg-[#020617] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow shadow-[#020617] z-10">
                    {item.type === 'critical' ? <ShieldAlert className="h-3 w-3 text-rose-500" /> :
                     item.type === 'score_down' ? <ArrowDownRight className="h-3 w-3 text-orange-500" /> :
                     item.type === 'fixed' ? <ShieldCheck className="h-3 w-3 text-emerald-500" /> :
                     item.type === 'score_up' ? <ArrowUpRight className="h-3 w-3 text-emerald-500" /> :
                     <Activity className="h-3 w-3 text-blue-500" />}
                  </div>
                  {/* Content */}
                  <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] bg-slate-900/80 p-3 rounded border border-slate-800 group-hover:bg-slate-800 transition-colors shadow-sm">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[9px] font-mono text-slate-500 flex items-center gap-1"><Clock className="h-2.5 w-2.5" /> {item.time}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-snug">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-7">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-800 pb-3">
            <CardTitle className="text-xs uppercase tracking-wider">Filtered Alerts</CardTitle>
            <span className="font-mono text-[10px] text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">47 RAW &rarr; 12 ACTIONABLE</span>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-3">
              {mockAlerts.slice(0, 3).map((alert) => (
                <div key={alert.id} className="flex gap-4 items-start p-3 rounded bg-[#020617]/50 border border-slate-800 hover:border-slate-700 transition-colors">
                  <div className={`mt-0.5 rounded p-1.5 border ${alert.severity === 'CRITICAL' ? 'bg-rose-950/30 border-rose-900 text-rose-500' : 'bg-orange-950/30 border-orange-900 text-orange-500'}`}>
                    <AlertTriangle className="h-3 w-3" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-xs font-bold text-slate-200">{alert.title}</h4>
                      <span className="font-mono text-[10px] text-slate-500">{alert.time}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{alert.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-gradient-to-b from-rose-950/10 to-transparent border-t-rose-500/20">
          <CardContent className="p-5 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-rose-500" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">Dark Web Intercepts</h3>
              </div>
              <span className="font-mono text-[10px] text-slate-500">SOURCE: ROCKYOU24</span>
            </div>
            <p className="text-3xl font-bold text-rose-400 mb-1">3 <span className="text-xs font-normal text-slate-400 uppercase tracking-widest ml-1">Leaked Creds</span></p>
            <p className="font-mono text-[10px] text-slate-500 mt-auto pt-4">ACTION REQUIRED IMMEDIATELY</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-b from-amber-950/10 to-transparent border-t-amber-500/20">
          <CardContent className="p-5 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Network className="h-4 w-4 text-amber-500" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">Vendor Risk</h3>
              </div>
              <span className="font-mono text-[10px] text-slate-500">NPM: EXPRESS</span>
            </div>
            <p className="text-3xl font-bold text-amber-500 mb-1">2 <span className="text-xs font-normal text-slate-400 uppercase tracking-widest ml-1">Critical Deps</span></p>
            <p className="font-mono text-[10px] text-slate-500 mt-auto pt-4">v4.17.1 VULNERABLE</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">30-Day Entropy</h3>
              <Badge variant="outline" className="text-rose-400 border-rose-400/30 font-mono text-[10px] py-0">DEGRADED</Badge>
            </div>
            <div className="flex-1 min-h-[80px] relative">
              <svg width="0" height="0">
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
              </svg>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockScoreHistory}>
                  <YAxis domain={['dataMin - 5', 'dataMax + 5']} hide />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '4px', fontFamily: 'JetBrains Mono', fontSize: '10px' }}
                    itemStyle={{ color: '#F1F5F9' }}
                    cursor={{ stroke: '#1e293b' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#3b82f6" 
                    fillOpacity={1} 
                    fill="url(#colorScore)" 
                    strokeWidth={2}
                    style={{ filter: 'url(#neonGlow)' }}
                    activeDot={{ r: 4, fill: '#60A5FA', stroke: '#0f172a', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
