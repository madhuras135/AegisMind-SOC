import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { ShieldAlert, Zap, AlertTriangle, ArrowRight, TrendingUp, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, Badge, NeuralInsight, Button } from '../components/ui';

export default function WhatIfEngine() {
  const [activeTab, setActiveTab] = useState('fixed'); // 'fixed', 'ignored'

  const ignoreData = [
    { day: 0, prob: 5 },
    { day: 3, prob: 15 },
    { day: 7, prob: 45 },
    { day: 14, prob: 82 },
    { day: 21, prob: 89 },
    { day: 30, prob: 95 },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            AegisMind Simulator <Badge variant="ai" className="text-[10px] py-0">WHAT-IF ENGINE</Badge>
          </h2>
          <p className="font-mono text-slate-500 mt-1 text-[10px]">TARGET: CVE-2024-1337 // NODE: API.PROD.EXAMPLE.COM</p>
        </div>
      </div>

      <div className="flex gap-4 border-b border-white/5 pb-2">
        <button
          onClick={() => setActiveTab('fixed')}
          className={`px-4 py-2 text-sm font-medium rounded-t transition-colors relative ${activeTab === 'fixed' ? 'text-blue-400 bg-blue-500/10' : 'text-slate-400 hover:text-slate-200 hover:bg-[#0f172a]'}`}
        >
          IF PATCHED
          {activeTab === 'fixed' && <motion.div layoutId="whatiftab" className="absolute bottom-[-2px] left-0 right-0 h-0.5 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />}
        </button>
        <button
          onClick={() => setActiveTab('ignored')}
          className={`px-4 py-2 text-sm font-medium rounded-t transition-colors relative ${activeTab === 'ignored' ? 'text-rose-400 bg-rose-500/10' : 'text-slate-400 hover:text-slate-200 hover:bg-[#0f172a]'}`}
        >
          IF IGNORED
          {activeTab === 'ignored' && <motion.div layoutId="whatiftab" className="absolute bottom-[-2px] left-0 right-0 h-0.5 bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)]" />}
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'fixed' ? (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6 relative">
                {/* Arrow connecting the two sides */}
                <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none z-10">
                  <div className="bg-[#020617] p-2 rounded-full border border-white/10 shadow-xl">
                    <ArrowRight className="h-6 w-6 text-slate-500" />
                  </div>
                </div>

                <Card className="border-white/5 opacity-80">
                  <CardContent className="p-6">
                    <h3 className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-6">Current State (Before)</h3>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <span className="text-xs uppercase tracking-wider text-slate-400">Security Score</span>
                        <span className="text-2xl font-mono font-bold text-amber-500">64</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs uppercase tracking-wider text-slate-400">Critical Issues</span>
                        <span className="text-xl font-mono font-bold text-rose-500">4</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs uppercase tracking-wider text-slate-400">Breach Window</span>
                        <span className="text-xl font-mono font-bold text-rose-400">~14 DAYS</span>
                      </div>
                      
                      <div className="pt-4 border-t border-white/5">
                        <p className="text-[10px] font-mono text-slate-500 mb-2">VECTOR PATH</p>
                        <div className="flex items-center gap-2 text-rose-400 font-mono text-[10px]">
                          <ShieldAlert className="h-3 w-3" /> WAN &rarr; API &rarr; AUTH &rarr; DB
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.05)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
                  <CardContent className="p-6 relative z-10">
                    <h3 className="text-[10px] font-mono text-emerald-500 uppercase tracking-wider mb-6 flex items-center justify-between">
                      Projected State (After)
                      <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-pulse font-mono text-[9px]">+12 DELTA</Badge>
                    </h3>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <span className="text-xs uppercase tracking-wider text-slate-300">Security Score</span>
                        <span className="text-3xl font-mono font-bold text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">76</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs uppercase tracking-wider text-slate-300">Critical Issues</span>
                        <span className="text-xl font-mono font-bold text-slate-100">3</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs uppercase tracking-wider text-slate-300">Breach Window</span>
                        <span className="text-xl font-mono font-bold text-emerald-400">~67 DAYS</span>
                      </div>
                      
                      <div className="pt-4 border-t border-white/5">
                        <p className="text-[10px] font-mono text-slate-500 mb-2 flex items-center justify-between">
                          VECTOR STATUS
                          <span className="text-emerald-400 text-[9px] border border-emerald-500/30 px-1.5 py-0.5 rounded">SEVERED</span>
                        </p>
                        <div className="flex items-center gap-2 text-slate-500 font-mono text-[10px]">
                          <CheckCircle2 className="h-3 w-3 text-emerald-500" /> WAN &rarr; API <span className="text-rose-500 font-bold mx-1">X</span> <span className="line-through">AUTH &rarr; DB</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <NeuralInsight 
                variant="info"
                steps={[
                  "[01] SIMULATING PATCH ON API.PROD.EXAMPLE.COM",
                  "[02] VECTOR WAN -> DB SUCCESSFULLY SEVERED",
                  "[03] AUTHENTICATED ACCESS NOW REQUIRED FOR REMAINING EXPLOITS",
                  "[04] RESULT: POSTURE IMPROVED. SOC DETECTION WINDOW INCREASED BY 53 DAYS."
                ]}
              />
              
              <div className="flex justify-end gap-4 mt-6">
                <Button className="bg-blue-600 hover:bg-blue-500 gap-2 font-mono text-[10px] uppercase tracking-widest"><Zap className="h-4 w-4" /> Execute AutoFix</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <Card className="border-rose-900/30 bg-gradient-to-b from-rose-950/10 to-transparent">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2 tracking-wider uppercase"><TrendingUp className="h-4 w-4" /> Exploit Probability</h3>
                      <p className="text-xs text-slate-500 mt-1">PROJECTION: 30-DAY BREACH LIKELIHOOD</p>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-mono font-bold text-rose-500 drop-shadow-[0_0_10px_rgba(244,63,94,0.5)]">89%</span>
                      <p className="text-[10px] font-mono text-rose-400 mt-1">BY T+21 DAYS</p>
                    </div>
                  </div>

                  <div className="h-64 w-full mt-4 relative">
                    <svg width="0" height="0">
                      <defs>
                        <linearGradient id="colorProb" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                        </linearGradient>
                        <filter id="neonRed" x="-20%" y="-20%" width="140%" height="140%">
                          <feGaussianBlur stdDeviation="3" result="blur" />
                          <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>
                    </svg>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={ignoreData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                        <XAxis dataKey="day" stroke="#475569" tickFormatter={(val) => `T+${val}`} tick={{ fontSize: 10, fontFamily: 'JetBrains Mono' }} />
                        <YAxis stroke="#475569" tickFormatter={(val) => `${val}%`} tick={{ fontSize: 10, fontFamily: 'JetBrains Mono' }} />
                        <RechartsTooltip 
                          contentStyle={{ backgroundColor: '#020617', borderColor: '#4c0519', borderRadius: '4px', fontFamily: 'JetBrains Mono', fontSize: '10px' }}
                          formatter={(value) => [`${value}%`, 'Probability']}
                          labelFormatter={(label) => `T+${label} DAYS`}
                          cursor={{ stroke: '#475569' }}
                        />
                        <ReferenceLine x={3} stroke="#f59e0b" strokeDasharray="3 3" label={{ position: 'top', value: 'POC RELEASED', fill: '#f59e0b', fontSize: 10, fontFamily: 'JetBrains Mono' }} />
                        <ReferenceLine x={7} stroke="#f43f5e" strokeDasharray="3 3" label={{ position: 'insideBottomRight', value: 'SCANNERS ACTIVE', fill: '#f43f5e', fontSize: 10, fontFamily: 'JetBrains Mono' }} />
                        <ReferenceLine x={14} stroke="#be123c" strokeDasharray="3 3" label={{ position: 'top', value: 'ACTIVE EXPLOITS', fill: '#be123c', fontSize: 10, fontFamily: 'JetBrains Mono' }} />
                        <Area 
                          type="monotone" 
                          dataKey="prob" 
                          stroke="#f43f5e" 
                          strokeWidth={2} 
                          fillOpacity={1}
                          fill="url(#colorProb)"
                          style={{ filter: 'url(#neonRed)' }}
                          activeDot={{ r: 4, fill: '#f43f5e', stroke: '#020617', strokeWidth: 2 }} 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <NeuralInsight 
                variant="critical"
                steps={[
                  "[01] RISK ASSESSMENT: CRITICAL",
                  "[02] TIMELINE: POC ANTICIPATED T+3 DAYS",
                  "[03] TIMELINE: AUTOMATED SCANNERS ANTICIPATED T+7 DAYS",
                  "[04] WARNING: ACTIVE EXPLOITATION PROBABILITY 82% BY T+14 DAYS WITHOUT INTERVENTION"
                ]}
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
