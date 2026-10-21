import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ShieldAlert, Key, Globe, Search, RefreshCw, FileWarning, Eye, AlertTriangle } from 'lucide-react';
import { Card, CardContent, Badge, NeuralInsight, Button } from '../components/ui';
import { mockThreatIntel, mockThirdPartyRisk } from '../data/mockData';

export default function Intelligence() {
  const [activeTab, setActiveTab] = useState('threats'); // 'threats', 'darkweb', 'thirdparty'

  const tabs = [
    { id: 'threats', label: 'Threat Intel', icon: <ShieldAlert className="h-4 w-4" /> },
    { id: 'darkweb', label: 'Dark Web Monitor', icon: <Globe className="h-4 w-4" /> },
    { id: 'thirdparty', label: 'Third-Party Risk', icon: <FileWarning className="h-4 w-4" /> },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Tabs Header */}
      <div className="flex items-center justify-between border-b border-slate-700 pb-2">
        <div className="flex gap-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 pb-2 text-[10px] uppercase tracking-wider font-mono transition-colors relative ${activeTab === tab.id ? 'text-blue-400' : 'text-slate-500 hover:text-slate-300'}`}
            >
              {tab.icon} {tab.label}
              {activeTab === tab.id && (
                <motion.div layoutId="activetab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-t-full" />
              )}
            </button>
          ))}
        </div>
        <Button variant="outline" size="sm" className="gap-2 text-slate-400 font-mono text-[10px] uppercase tracking-widest bg-[#0f172a]/50 border-white/5">
          <RefreshCw className="h-3 w-3" /> Sync Intel
        </Button>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'threats' && (
            <div className="space-y-4">
              {mockThreatIntel.map((threat) => (
                <Card key={threat.id} className="border-l-4 rounded-r-xl border-t-white/5 border-b-transparent border-r-transparent bg-[#0f172a]/80" style={{ borderLeftColor: threat.severity === 'CRITICAL' ? '#f43f5e' : threat.severity === 'HIGH' ? '#f97316' : '#f59e0b' }}>
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">{threat.name}</h3>
                        <p className="text-[10px] font-mono text-slate-400 mt-1">TARGET: <span className="text-slate-300">{threat.target}</span> // TTP: <code className="text-slate-300 bg-[#020617] px-1 border border-white/5 rounded">{threat.technique}</code></p>
                      </div>
                      <Badge variant={threat.severity.toLowerCase()}>{threat.severity}</Badge>
                    </div>
                    
                    <NeuralInsight 
                      variant="info"
                      steps={[
                        `[01] INGESTING INTEL ON ${threat.name}`,
                        `[02] MATCHING TTP TO LOCAL INFRASTRUCTURE`,
                        `[03] THREAT ANALYSIS: ${threat.description}`
                      ]}
                      className="mt-4"
                    />
                  </CardContent>
                </Card>
              ))}
              
              {/* Add a few more mocked ones directly here for density */}
              <Card className="border-l-4 border-slate-700 bg-[#020617]/50">
                <CardContent className="p-5 flex items-center justify-center opacity-50">
                  <div className="text-center">
                    <Eye className="h-5 w-5 text-slate-500 mx-auto mb-2" />
                    <p className="font-mono text-[10px] tracking-widest uppercase text-slate-500">MONITORING 142 OTHER ACTIVE THREAT GROUPS...</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'darkweb' && (
            <div className="space-y-6">
              <Card className="border-rose-900/50 bg-gradient-to-r from-rose-950/20 to-transparent">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-rose-500 flex items-center gap-2 tracking-wider uppercase">
                      <AlertTriangle className="h-5 w-5 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]" /> 3 COMPROMISED IDENTITIES
                    </h2>
                    <p className="text-[10px] font-mono text-slate-400 mt-1">SOURCE: CLEARNET / DARKWEB DB DUMPS. ACTION REQUIRED IMMEDIATELY.</p>
                  </div>
                  <Button className="bg-rose-600 hover:bg-rose-700 text-white font-mono text-[10px] uppercase tracking-widest">Enforce Password Resets</Button>
                </CardContent>
              </Card>

              <div className="grid gap-4">
                {[
                  { id: 1, email: 'admin@example.com', source: 'RockYou2024', date: '2 days ago', risk: 'CRITICAL', ai: 'This is a highly privileged account. The leaked password was verified as currently active in Active Directory.' },
                  { id: 2, email: 'j.doe@example.com', source: 'LinkedIn Scrape 2023', date: '1 month ago', risk: 'MEDIUM', ai: 'Password is older and does not match current AD requirements, but suggests user reuses passwords.' },
                  { id: 3, email: 'support@example.com', source: 'Zendesk Dump', date: '3 months ago', risk: 'HIGH', ai: 'Shared mailbox credential leak. Could lead to social engineering or customer data access.' }
                ].map(leak => (
                  <Card key={leak.id} className="bg-[#0f172a]/80">
                    <CardContent className="p-5 flex flex-col md:flex-row gap-6">
                      <div className="shrink-0 w-64 border-r border-white/5 pr-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Key className="h-4 w-4 text-slate-500" />
                          <span className="font-mono text-sm text-slate-200">{leak.email}</span>
                        </div>
                        <p className="font-mono text-[10px] text-slate-500 mb-1">SOURCE: <span className="text-slate-300">{leak.source}</span></p>
                        <p className="font-mono text-[10px] text-slate-500">DISCOVERED: {leak.date}</p>
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <NeuralInsight 
                          variant="critical"
                          steps={[
                            `[01] INGESTED COMPROMISED CREDENTIAL: ${leak.email}`,
                            `[02] CONTEXT: ${leak.ai}`,
                            `[03] STATUS: REQUIRES ACTION`
                          ]}
                        />
                      </div>
                      <div className="shrink-0 flex flex-col justify-center gap-2 items-end">
                        <Badge variant={leak.risk.toLowerCase()} className="w-fit mb-2">{leak.risk}</Badge>
                        <Button size="sm" variant="outline" className="font-mono text-[10px] uppercase tracking-widest border-white/10 bg-[#020617]/50">Mark Reviewed</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'thirdparty' && (
            <div className="space-y-6">
              <Card>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-400 uppercase bg-slate-800/50 border-b border-slate-700">
                      <tr>
                        <th className="px-4 py-3 font-medium">Package / Vendor</th>
                        <th className="px-4 py-3 font-medium">Version</th>
                        <th className="px-4 py-3 font-medium">Top CVE</th>
                        <th className="px-4 py-3 font-medium">Internal Assets Affected</th>
                        <th className="px-4 py-3 font-medium">Risk Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockThirdPartyRisk.map((tp) => (
                        <tr key={tp.id} className="border-b border-white/5 hover:bg-[#020617]/50">
                          <td className="px-4 py-4 font-bold font-mono text-xs text-slate-200">{tp.package}</td>
                          <td className="px-4 py-4 text-slate-400 font-mono text-[11px]">{tp.version}</td>
                          <td className="px-4 py-4"><Badge variant="outline" className="border-rose-500/30 text-rose-400 font-mono text-[10px]">{tp.cve}</Badge></td>
                          <td className="px-4 py-4 font-mono text-[11px] text-slate-300">{tp.assets}</td>
                          <td className="px-4 py-4">
                            <span className={`font-mono text-sm ${tp.riskScore > 80 ? 'text-rose-400' : 'text-orange-400'}`}>{tp.riskScore}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              <NeuralInsight 
                variant="info"
                steps={[
                  "[01] SUPPLY CHAIN ASSESSMENT INITIATED",
                  "[02] DETECTED: express v4.17.1 INTRODUCES CRITICAL RISK TO api.prod AND auth-service.",
                  "[03] RECOMMENDATION: UPDATE TO v4.18.2 TO MITIGATE CVE-2022-24999.",
                  "[04] PROJECTED DELTA: +25 VENDOR SCORE POINTS."
                ]}
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
