import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, Calendar, CheckCircle2, XCircle, X, BarChart as BarChartIcon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { Card, CardContent, Badge, NeuralInsight, Button } from '../components/ui';

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState(null);
  const [toast, setToast] = useState(false);

  const handleDownload = () => {
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  const chartData = [
    { name: 'Last Week', Score: 69, Critical: 2, Fixed: 12 },
    { name: 'This Week', Score: 64, Critical: 4, Fixed: 5 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 relative">
      <h2 className="text-xl font-bold text-slate-100 mb-6 uppercase tracking-wider font-mono">Telemetry Reports</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { id: 'exec', title: 'Executive Report', desc: 'Business risk summary, plain English.', icon: <FileText className="h-6 w-6" /> },
          { id: 'tech', title: 'Technical Report', desc: 'Full CVE list, CVSS scores, fix scripts.', icon: <BarChartIcon className="h-6 w-6" /> },
          { id: 'comp', title: 'Compliance Report', desc: 'Mapped to SOC 2, NIST CSF, ISO 27001.', icon: <CheckCircle2 className="h-6 w-6" /> },
        ].map(report => (
          <Card key={report.id} hoverable className="cursor-pointer border-white/5 bg-[#0f172a]/50" onClick={() => setSelectedReport(report.id)}>
            <CardContent className="p-6 text-center flex flex-col h-full">
              <div className="mx-auto w-12 h-12 rounded-full bg-[#020617] border border-white/10 flex items-center justify-center text-blue-500 mb-4 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                {report.icon}
              </div>
              <h3 className="text-sm font-bold font-mono text-slate-200 mb-2 tracking-wider uppercase">{report.title}</h3>
              <p className="text-[11px] font-mono text-slate-400 mb-6 flex-1">{report.desc}</p>
              <Button variant="outline" className="w-full font-mono text-[10px] uppercase tracking-widest bg-[#020617]/50 border-white/10 text-slate-300 hover:bg-[#020617] hover:text-white">Generate Report</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <AnimatePresence>
        {selectedReport && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#020617] border border-white/10 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#0f172a]/80 backdrop-blur">
                <h2 className="text-sm font-bold text-slate-100 font-mono tracking-widest uppercase">AegisMind Security Report // W43 // Score: 64/100</h2>
                <button onClick={() => setSelectedReport(null)} className="text-slate-500 hover:text-white transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-[#020617]">
                <NeuralInsight 
                  variant="info"
                  steps={[
                    "[01] EXECUTIVE SUMMARY GENERATED",
                    "[02] POSTURE DECLINED: 2 NEW CRITICAL VULNS DISCOVERED ON API.PROD",
                    "[03] REMEDIATION: 5 LOW-PRIORITY ISSUES RESOLVED",
                    "[04] ACTION ITEM: PATCH API GATEWAY IMMEDIATELY TO PREVENT DATA EXFILTRATION"
                  ]}
                />

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-[10px] font-semibold font-mono text-slate-400 uppercase tracking-widest mb-4">Top Risks</h3>
                    <div className="border border-white/5 rounded-lg overflow-hidden bg-[#0f172a]/50">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-[#0f172a] text-slate-500 font-mono text-[10px] tracking-wider uppercase border-b border-white/5">
                          <tr><th className="p-3">Vuln</th><th className="p-3">Asset</th><th className="p-3">Severity</th></tr>
                        </thead>
                        <tbody className="font-mono text-[11px] text-slate-300">
                          <tr className="border-b border-white/5"><td className="p-3">CVE-2024-1337</td><td className="p-3">API.PROD</td><td className="p-3"><Badge variant="critical">CRIT</Badge></td></tr>
                          <tr className="border-b border-white/5"><td className="p-3">REDIS EXPOSED</td><td className="p-3">DB-CACHE-01</td><td className="p-3"><Badge variant="critical">CRIT</Badge></td></tr>
                          <tr><td className="p-3">EXPOSED .ENV</td><td className="p-3">DEV.EXAMPLE</td><td className="p-3"><Badge variant="high">HIGH</Badge></td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[10px] font-semibold font-mono text-slate-400 uppercase tracking-widest mb-4">Historical Comparison</h3>
                    <div className="h-[150px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                          <XAxis dataKey="name" stroke="#475569" fontSize={10} fontFamily="JetBrains Mono" tickLine={false} axisLine={false} />
                          <YAxis stroke="#475569" fontSize={10} fontFamily="JetBrains Mono" tickLine={false} axisLine={false} />
                          <RechartsTooltip cursor={{ fill: '#0f172a' }} contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', fontFamily: 'JetBrains Mono', fontSize: '10px' }} />
                          <Legend wrapperStyle={{ fontSize: '10px', fontFamily: 'JetBrains Mono' }} />
                          <Bar dataKey="Score" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                          <Bar dataKey="Critical" fill="#f43f5e" radius={[2, 2, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-semibold font-mono text-slate-400 uppercase tracking-widest mb-4">Compliance Mapping</h3>
                  <div className="border border-white/5 rounded-lg overflow-hidden bg-[#0f172a]/50">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-[#0f172a] text-slate-500 font-mono text-[10px] tracking-wider uppercase border-b border-white/5">
                        <tr><th className="p-3">Framework</th><th className="p-3 text-center">Controls Checked</th><th className="p-3 text-center">Passing</th><th className="p-3 text-center">Status</th></tr>
                      </thead>
                      <tbody className="font-mono text-[11px] text-slate-300">
                        <tr className="border-b border-white/5">
                          <td className="p-3 font-medium text-slate-200">SOC 2 Type II</td><td className="p-3 text-center text-slate-500">142</td><td className="p-3 text-center">138</td>
                          <td className="p-3 text-center"><Badge variant="outline" className="border-amber-500/30 text-amber-500 font-mono text-[9px] py-0">AT RISK</Badge></td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="p-3 font-medium text-slate-200">NIST CSF 2.0</td><td className="p-3 text-center text-slate-500">108</td><td className="p-3 text-center">108</td>
                          <td className="p-3 text-center"><Badge variant="outline" className="border-emerald-500/30 text-emerald-500 font-mono text-[9px] py-0">PASSING</Badge></td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium text-slate-200">ISO 27001</td><td className="p-3 text-center text-slate-500">93</td><td className="p-3 text-center">89</td>
                          <td className="p-3 text-center"><Badge variant="outline" className="border-rose-500/30 text-rose-500 font-mono text-[9px] py-0">FAILING</Badge></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-white/5 bg-[#0f172a] flex justify-end gap-3">
                <div className="flex items-center gap-2 mr-auto px-3 bg-[#020617] rounded border border-white/5 text-[10px] font-mono text-slate-400 cursor-pointer hover:bg-slate-900 transition-colors uppercase tracking-wider">
                  <input type="checkbox" id="sched" className="rounded bg-[#0f172a] border-white/10 text-blue-500 focus:ring-blue-500 focus:ring-offset-[#020617]" />
                  <label htmlFor="sched" className="cursor-pointer py-2">Schedule Weekly Digest</label>
                </div>
                <Button variant="ghost" onClick={() => setSelectedReport(null)} className="font-mono text-[10px] uppercase tracking-widest text-slate-400 hover:text-white">Close</Button>
                <Button onClick={handleDownload} className="gap-2 bg-blue-600 hover:bg-blue-500 text-white font-mono text-[10px] uppercase tracking-widest">
                  <Download className="h-4 w-4" /> Download PDF
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-950 border border-green-900 text-green-400 px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 z-[60]"
          >
            <CheckCircle2 className="h-5 w-5" />
            Report generated successfully (mock)
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
