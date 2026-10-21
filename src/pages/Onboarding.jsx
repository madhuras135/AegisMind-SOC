import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, Cloud, Server, Database, ArrowRight, CheckCircle2, ShieldAlert, XCircle } from 'lucide-react';
import { Card, CardContent, Badge, NeuralInsight, Button, Progress, Input } from '../components/ui';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [domain, setDomain] = useState('');
  const [domains, setDomains] = useState([]);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStatus, setScanStatus] = useState('Discovering assets...');
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const handleAddDomain = () => {
    if (domain && !domains.includes(domain)) {
      setDomains([...domains, domain]);
      setDomain('');
    }
  };

  useEffect(() => {
    if (step === 2) {
      let current = 0;
      const interval = setInterval(() => {
        current += 1;
        setScanProgress(current);
        
        if (current === 20) setScanStatus('Scanning 47 assets...');
        if (current === 50) setScanStatus('Analysing vulnerabilities...');
        if (current === 80) setScanStatus('Mapping attack surface...');
        if (current === 95) setScanStatus('Generating AI report...');
        
        if (current >= 100) {
          clearInterval(interval);
          setTimeout(() => setStep(3), 500);
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [step]);

  useEffect(() => {
    if (step === 3) {
      const timer = setTimeout(() => {
        let current = 0;
        const interval = setInterval(() => {
          current += 1;
          setScore(current);
          if (current >= 52) clearInterval(interval);
        }, 20);
        return () => clearInterval(interval);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col relative overflow-hidden">
      {/* Background cyber grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:30px_30px] opacity-30 z-0" />
      
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 w-full max-w-4xl mx-auto">
        
        <div className="flex items-center gap-3 mb-12">
          <img src="/aegismind-logo.png" alt="AegisMind Logo" className="h-10 w-10 object-contain drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
          <h1 className="text-3xl font-bold font-mono tracking-widest uppercase">Aegis<span className="text-blue-500">Mind</span></h1>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full max-w-2xl"
            >
              <div className="text-center mb-8">
                <h2 className="text-xl font-bold font-mono tracking-widest uppercase mb-2">Connect Attack Surface</h2>
                <p className="text-[10px] font-mono tracking-wider text-slate-500 uppercase">Select cloud provider or manually input target scopes.</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <Card className="cursor-pointer border-white/5 bg-[#0f172a]/50 hover:border-blue-500/50 hover:bg-[#0f172a] transition-all">
                  <CardContent className="p-6 flex flex-col items-center justify-center gap-3 text-center">
                    <Cloud className="h-8 w-8 text-blue-500" />
                    <span className="text-xs font-mono tracking-widest uppercase text-slate-200">Connect AWS</span>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer border-white/5 bg-[#0f172a]/50 hover:border-blue-500/50 hover:bg-[#0f172a] transition-all">
                  <CardContent className="p-6 flex flex-col items-center justify-center gap-3 text-center">
                    <Server className="h-8 w-8 text-blue-500" />
                    <span className="text-xs font-mono tracking-widest uppercase text-slate-200">Connect GCP / Azure</span>
                  </CardContent>
                </Card>
              </div>

              <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-white/5"></div>
                <span className="flex-shrink-0 mx-4 font-mono text-[9px] tracking-widest text-slate-500 uppercase">OR ENTER MANUALLY</span>
                <div className="flex-grow border-t border-white/5"></div>
              </div>

              <div className="flex gap-2 mb-4">
                <Input 
                  placeholder="E.G., EXAMPLE.COM, API.PROD.NET" 
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddDomain()}
                  className="font-mono text-[10px] tracking-widest uppercase bg-[#020617] border-white/10 text-slate-200 h-10"
                />
                <Button onClick={handleAddDomain} variant="secondary" className="font-mono text-[10px] tracking-widest uppercase h-10 border-white/10 bg-[#0f172a] hover:bg-[#0f172a]/80 text-slate-200">Add</Button>
              </div>

              <div className="flex flex-wrap gap-2 mb-8 min-h-[40px]">
                {domains.map(d => (
                  <Badge key={d} variant="outline" className="bg-[#020617] border-white/10 text-slate-300 pl-3 pr-2 py-1 flex gap-2 font-mono text-[10px] tracking-widest">
                    {d} <button onClick={() => setDomains(domains.filter(x => x !== d))}><XCircle className="h-3 w-3 text-slate-500 hover:text-rose-500" /></button>
                  </Badge>
                ))}
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setStep(2)} className="w-full md:w-auto px-8 gap-2 bg-blue-600 hover:bg-blue-500 font-mono text-[10px] tracking-widest uppercase h-10" disabled={domains.length === 0}>
                  INITIATE SCAN <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -50 }}
              className="w-full max-w-md text-center flex flex-col items-center"
            >
              <div className="relative w-32 h-32 mb-8">
                <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                <div className="absolute inset-2 border-4 border-blue-500/40 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite_200ms]"></div>
                <div className="absolute inset-4 bg-blue-600/20 border border-blue-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.3)] backdrop-blur">
                  <img src="/aegismind-logo.png" alt="AegisMind Scan" className="h-10 w-10 object-contain drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                </div>
              </div>
              
              <h2 className="text-sm font-bold mb-2 text-slate-200 font-mono tracking-widest uppercase">{scanStatus}</h2>
              <div className="w-full mt-6 bg-[#020617] p-2 rounded border border-white/5">
                <Progress value={scanProgress} indicatorColor="bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" className="h-1.5 bg-[#0f172a]" />
                <div className="flex justify-between mt-2 font-mono text-[9px] tracking-widest uppercase text-slate-500">
                  <span>Progress</span>
                  <span className="text-blue-400">{scanProgress}%</span>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >
              <div className="text-center mb-8">
                <h2 className="text-xl font-bold mb-2 font-mono tracking-widest uppercase text-slate-100">Initial Scan Complete</h2>
                <p className="text-[10px] font-mono tracking-wider text-slate-500 uppercase">AegisMind AI has analysed perimeter. Baseline established.</p>
              </div>

              <div className="grid md:grid-cols-12 gap-6 mb-8">
                <Card className="md:col-span-4 bg-[#0f172a]/80 border-white/5 flex flex-col items-center justify-center p-8 relative overflow-hidden">
                  <div className="absolute top-2 left-2 font-mono text-[9px] text-slate-600">SYS-SCORE</div>
                  <div className="relative h-32 w-32 mb-4">
                    <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                      <circle className="stroke-[#020617]" cx="50" cy="50" r="40" fill="transparent" strokeWidth="8" />
                      <circle
                        className="stroke-orange-500 drop-shadow-[0_0_5px_rgba(249,115,22,0.8)]"
                        cx="50" cy="50" r="40" fill="transparent" strokeWidth="8"
                        strokeDasharray={2 * Math.PI * 40}
                        strokeDashoffset={(2 * Math.PI * 40) - ((score / 100) * (2 * Math.PI * 40))}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold font-mono text-white">{score}</span>
                    </div>
                  </div>
                  <h3 className="text-[10px] font-mono tracking-widest uppercase text-slate-400">Baseline Confidence</h3>
                </Card>

                <div className="md:col-span-8 flex flex-col gap-4">
                  <div className="grid grid-cols-3 gap-4">
                    <Card className="bg-[#0f172a]/50 border-white/5"><CardContent className="p-4 text-center"><p className="text-xl font-bold font-mono text-slate-200">47</p><p className="text-[9px] font-mono tracking-widest uppercase text-slate-500 mt-1">Assets Discovered</p></CardContent></Card>
                    <Card className="bg-[#0f172a]/50 border-white/5"><CardContent className="p-4 text-center"><p className="text-xl font-bold font-mono text-slate-200">23</p><p className="text-[9px] font-mono tracking-widest uppercase text-slate-500 mt-1">Vulnerabilities</p></CardContent></Card>
                    <Card className="border-rose-900/50 bg-rose-950/20"><CardContent className="p-4 text-center"><p className="text-xl font-bold font-mono text-rose-500 drop-shadow-[0_0_5px_rgba(244,63,94,0.5)]">4</p><p className="text-[9px] font-mono tracking-widest uppercase text-rose-400 mt-1">Critical Risks</p></CardContent></Card>
                  </div>
                  
                  <NeuralInsight 
                    variant="info"
                    steps={[
                      "[01] BASELINE ANALYSIS COMPLETE",
                      "[02] DISCOVERED EXPOSURE ON PUBLIC-FACING API (API.PROD)",
                      "[03] DETECTED UNAUTHENTICATED CACHING LAYER",
                      "[04] GENERATED AUTO-FIXES FOR TOP 3 CRITICAL ISSUES",
                      "[05] PROJECTED POST-FIX SCORE: 74/100"
                    ]}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="flex justify-center mt-12">
                <Button onClick={() => setStep(4)} size="lg" className="px-12 py-6 text-xs font-mono tracking-widest uppercase bg-[#0f172a] border border-white/10 hover:bg-[#020617] text-white">Review Interventions</Button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >
              <div className="text-center mb-10">
                <h2 className="text-xl font-bold mb-2 font-mono tracking-widest uppercase text-slate-100">Intervention Queue</h2>
                <p className="text-[10px] font-mono tracking-wider text-slate-500 uppercase">Immediate remediation required for optimal posture.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {[
                  { asset: 'API.PROD.EXAMPLE.COM', title: 'Remote Code Execution', desc: 'CVE-2024-1337 on public API interface.', action: 'Patch Input Validation' },
                  { asset: 'DB-CACHE-01', title: 'Unauthenticated Redis', desc: 'Port 6379 exposed to internet without password.', action: 'Apply Access Controls' },
                  { asset: 'DEV.EXAMPLE.COM', title: 'Exposed Credentials', desc: '.env file containing AWS keys is publicly accessible.', action: 'Rotate & Hide Keys' }
                ].map((item, i) => (
                  <Card key={i} className="border-rose-900/50 bg-[#0f172a]/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border-t-white/10 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-rose-500/50 group-hover:bg-rose-500 transition-colors"></div>
                    <CardContent className="p-6 flex flex-col h-full pl-8">
                      <Badge variant="critical" className="w-fit mb-4">CRITICAL</Badge>
                      <h3 className="font-bold text-slate-100 text-sm uppercase tracking-wider">{item.title}</h3>
                      <p className="text-[10px] font-mono text-slate-500 mb-2 mt-1">{item.asset}</p>
                      <p className="text-[11px] font-mono text-slate-300 mb-6 flex-1">{item.desc}</p>
                      <Button variant="secondary" className="w-full bg-[#020617] border border-white/5 hover:bg-rose-950/30 hover:border-rose-900/50 hover:text-rose-400 font-mono text-[9px] uppercase tracking-widest">{item.action}</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex justify-center">
                <Button onClick={() => navigate('/dashboard')} size="lg" className="px-12 py-6 text-xs font-mono tracking-widest uppercase bg-blue-600 hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)] text-white">
                  ENTER SOC <ArrowRight className="ml-3 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
