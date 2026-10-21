import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertTriangle, ArrowRight, Copy, Check, ExternalLink, Download, ArrowUpRight, Zap } from 'lucide-react';
import { Card, CardContent, Badge, NeuralInsight, Button, Progress } from '../components/ui';

export default function AutoFix() {
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);

  const mockCode = `function sanitise(input) {
  if (typeof input !== 'string') return '';
  // Enhanced sanitization to prevent RCE
  return input
    .replace(/<[^>]*>?/gm, '')
    .replace(/[&<>"']/g, function(m) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      }[m];
    });
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(mockCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-[#020617] absolute inset-0 z-50">
      {/* Header */}
      <div className="bg-[#0f172a]/90 backdrop-blur border-b border-white/5 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Badge variant="critical" className="text-sm px-3 py-1">CRITICAL</Badge>
          <div>
            <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              CVE-2024-1337 <span className="text-slate-400 font-normal">— Remote Code Execution</span>
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded border border-emerald-500/20">
          <ArrowUpRight className="h-5 w-5" />
          <span className="font-mono text-xs">+12 POINTS IF FIXED</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 max-w-5xl mx-auto w-full">
        {/* Stepper */}
        <div className="mb-8 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-700 -translate-y-1/2 z-0" />
          <div className="absolute top-1/2 left-0 w-1/3 h-0.5 bg-blue-500 -translate-y-1/2 z-0 transition-all duration-500" style={{ width: `${((step - 1) / 2) * 100}%` }} />
          
          <div className="relative z-10 flex justify-between">
            {[1, 2, 3].map((num, idx) => {
              const isActive = num === step;
              const isPast = num < step;
              const labels = ['Review Plan', 'Approve Changes', 'Export & Deploy'];
              
              return (
                <div key={num} className="flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-colors duration-300
                      ${isActive ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 
                        isPast ? 'bg-blue-500 border-blue-500 text-white' : 
                        'bg-slate-800 border-slate-600 text-slate-400'}`}
                  >
                    {isPast ? <Check className="h-5 w-5" /> : num}
                  </div>
                  <span className={`mt-2 text-sm font-medium ${isActive || isPast ? 'text-slate-200' : 'text-slate-500'}`}>
                    {labels[idx]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <NeuralInsight 
              variant="info"
              steps={[
                "[01] ANALYZING VECTOR: ARBITRARY COMMAND EXECUTION",
                "[02] ISOLATING ROOT CAUSE: searchEngine UTILITY",
                "[03] GENERATING PATCH: STRICT INPUT SANITIZATION"
              ]}
            />

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-500" />
                  Implementation Steps
                </h3>
                <ol className="space-y-4">
                  <li className="flex gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded bg-slate-700 text-xs font-bold text-slate-300 shrink-0">1</span>
                    <p className="text-slate-300 text-sm">Navigate to <code className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">api.prod.example.com</code> repository and open <code className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">src/utils/parser.js</code>.</p>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded bg-slate-700 text-xs font-bold text-slate-300 shrink-0">2</span>
                    <div className="w-full">
                      <p className="text-slate-300 text-sm mb-2">Replace the existing <code>sanitise()</code> function with the patched version below:</p>
                      <div className="relative group">
                        <pre className="bg-slate-950 p-4 rounded-lg overflow-x-auto border border-slate-700 text-sm text-slate-300 font-mono">
                          <code>{mockCode}</code>
                        </pre>
                        <button 
                          onClick={handleCopy}
                          className="absolute top-2 right-2 p-1.5 rounded-md bg-slate-800 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-slate-100 hover:bg-slate-700"
                        >
                          {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded bg-slate-700 text-xs font-bold text-slate-300 shrink-0">3</span>
                    <p className="text-slate-300 text-sm">Run <code>npm run test:security</code> to verify the fix locally.</p>
                  </li>
                </ol>
              </CardContent>
            </Card>

            <div className="bg-amber-950/20 border border-amber-900/40 rounded p-4 flex gap-3">
              <AlertTriangle className="h-6 w-6 text-amber-500 shrink-0 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
              <div>
                <h4 className="font-mono text-sm text-amber-500 mb-1">SIDE EFFECTS WARNING</h4>
                <p className="text-sm text-amber-200/70">This change affects <code>auth-service</code>, <code>rate-limiter</code>, and <code>api-gateway</code>. Ensure you test all three dependent services after applying this patch in staging.</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">Impact Analysis</h3>
                <div className="flex items-center justify-center gap-6">
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-bold text-slate-300">64</span>
                    <span className="text-xs text-slate-500 mt-1">Current Score</span>
                  </div>
                  <ArrowRight className="h-6 w-6 text-blue-500" />
                  <motion.div 
                    className="flex flex-col items-center"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <span className="text-4xl font-mono font-bold text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">76</span>
                    <span className="text-[10px] font-mono text-slate-500 mt-1">PROJECTED SCORE</span>
                  </motion.div>
                </div>
                <Progress value={76} indicatorColor="bg-emerald-500" className="mt-6 h-1.5 bg-slate-800" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-3">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Export Options</h3>
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Copy className="h-4 w-4" /> Copy Patch Script
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3">
                  <ExternalLink className="h-4 w-4 text-blue-400" /> Create Jira Ticket
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3">
                  <ExternalLink className="h-4 w-4 text-slate-100" /> Create GitHub Issue
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Download className="h-4 w-4" /> Export PDF Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer Notice */}
      <div className="bg-[#0f172a] border-t border-white/5 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
          <ShieldCheck className="h-4 w-4 text-blue-500" />
          AEGISMIND GENERATES FIXES — IT NEVER AUTO-APPLIES THEM. REVIEW ALL STEPS BEFORE RUNNING.
        </div>
        <div className="flex gap-3">
          <Button variant="ghost">Cancel</Button>
          <Button 
            onClick={() => setStep(s => Math.min(s + 1, 3))}
            className="gap-2"
          >
            {step === 3 ? 'Finish' : 'Next Step'} <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
