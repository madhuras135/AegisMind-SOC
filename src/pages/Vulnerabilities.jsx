import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, ChevronRight, ShieldAlert, Zap, GitBranch } from 'lucide-react';
import { Card, CardContent, Badge, NeuralInsight, Button, Progress, Input } from '../components/ui';
import { mockVulnerabilities } from '../data/mockData';

export default function Vulnerabilities() {
  const [search, setSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [selectedVuln, setSelectedVuln] = useState(null);

  const filteredVulns = useMemo(() => {
    return mockVulnerabilities.filter(v => {
      const matchesSearch = v.cve.toLowerCase().includes(search.toLowerCase()) || 
                            v.asset.toLowerCase().includes(search.toLowerCase()) ||
                            v.description.toLowerCase().includes(search.toLowerCase());
      const matchesSeverity = severityFilter === 'All' || v.severity === severityFilter;
      return matchesSearch && matchesSeverity;
    });
  }, [search, severityFilter, mockVulnerabilities]);

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6 relative overflow-hidden">
      {/* Main Table Area */}
      <div className={`flex-1 transition-all duration-300 flex flex-col ${selectedVuln ? 'mr-[480px]' : ''}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 w-full max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search CVEs, assets, descriptions..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2 bg-slate-800 rounded-md p-1 border border-slate-700">
              {['All', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map(sev => (
                <button
                  key={sev}
                  onClick={() => setSeverityFilter(sev)}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${severityFilter === sev ? 'bg-slate-700 text-slate-100' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" /> Filters
          </Button>
        </div>

        <Card className="flex-1 overflow-hidden flex flex-col border-slate-700">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-400 uppercase bg-slate-800/50 border-b border-slate-700">
                <tr>
                  <th className="px-4 py-3 font-medium">Severity</th>
                  <th className="px-4 py-3 font-medium">CVE ID</th>
                  <th className="px-4 py-3 font-medium">Description</th>
                  <th className="px-4 py-3 font-medium">Asset</th>
                  <th className="px-4 py-3 font-medium">Score</th>
                  <th className="px-4 py-3 font-medium">Difficulty</th>
                  <th className="px-4 py-3 font-medium">TTE</th>
                </tr>
              </thead>
              <tbody>
                {filteredVulns.map((v) => (
                  <tr 
                    key={v.id} 
                    onClick={() => setSelectedVuln(v)}
                    className={`border-b border-slate-800/50 hover:bg-slate-800/50 cursor-pointer transition-colors ${selectedVuln?.id === v.id ? 'bg-blue-500/10 border-blue-500/30' : ''}`}
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Badge variant={v.severity.toLowerCase()}>{v.severity}</Badge>
                    </td>
                    <td className="px-4 py-3 font-medium font-mono text-slate-200 whitespace-nowrap">{v.cve}</td>
                    <td className="px-4 py-3 text-slate-300 truncate max-w-[200px] lg:max-w-[300px]">{v.description}</td>
                    <td className="px-4 py-3 font-mono text-[11px] text-slate-300 whitespace-nowrap">{v.asset}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className={`font-mono font-medium ${v.riskScore >= 90 ? 'text-red-400' : v.riskScore >= 70 ? 'text-orange-400' : 'text-amber-400'}`}>
                          {v.riskScore}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Badge variant="outline" className={v.fixDifficulty === 'Easy' ? 'border-green-500/30 text-green-400' : v.fixDifficulty === 'Moderate' ? 'border-amber-500/30 text-amber-400' : 'border-red-500/30 text-red-400'}>
                        {v.fixDifficulty}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{v.timeToExploit}</td>
                  </tr>
                ))}
                {filteredVulns.length === 0 && (
                  <tr>
                    <td colSpan="7" className="px-4 py-8 text-center text-slate-500">
                      No vulnerabilities found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Slide-in Detail Panel */}
      <AnimatePresence>
        {selectedVuln && (
          <motion.div 
            initial={{ x: 480, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 480, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 w-[480px] h-full bg-[#0f172a]/95 backdrop-blur-xl border-l border-white/10 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] flex flex-col z-20 overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/5 bg-[#020617]/50">
              <div className="flex items-center gap-2">
                <Badge variant={selectedVuln.severity.toLowerCase()}>{selectedVuln.severity}</Badge>
                <h3 className="font-semibold font-mono text-slate-100">{selectedVuln.cve}</h3>
              </div>
              <button 
                onClick={() => setSelectedVuln(null)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-700 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-100">{selectedVuln.description}</h2>
                <p className="text-slate-400 mt-1 flex items-center gap-2">
                  TARGET: <code className="bg-[#020617] px-2 py-1 rounded text-xs font-mono text-slate-300 border border-slate-800">{selectedVuln.asset}</code>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#020617]/50 p-3 rounded border border-white/5">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">Time to Exploit</p>
                  <p className="font-mono text-sm text-slate-200">{selectedVuln.timeToExploit}</p>
                </div>
                <div className="bg-[#020617]/50 p-3 rounded border border-white/5">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">Risk Score</p>
                  <p className={`font-mono text-sm ${selectedVuln.riskScore >= 90 ? 'text-rose-400' : 'text-orange-400'}`}>{selectedVuln.riskScore} / 100</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-medium text-slate-300">Exploitation Likelihood</span>
                  <span className="text-xs font-mono text-purple-400">87% confidence</span>
                </div>
                <Progress value={87} indicatorColor="bg-purple-500" className="h-1.5" />
                <div className="mt-2 flex items-center gap-2 text-sm text-red-400 bg-red-950/30 px-3 py-2 rounded border border-red-900/50">
                  <ShieldAlert className="h-4 w-4 shrink-0" />
                  <span>Public PoC exists on GitHub</span>
                </div>
              </div>

              <NeuralInsight 
                variant="critical"
                steps={[
                  `[01] ANALYZING ${selectedVuln.cve} ON NODE...`,
                  `[02] DETECTED: UNRESTRICTED IAM ROLES.`,
                  `[03] PROJECTION: DB PIVOT WITHIN 4 HOURS.`,
                  `[04] RECOMMENDATION: ISOLATE INSTANCE IMMEDIATELY.`
                ]}
              />

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-slate-300">Action Plan</h4>
                <div className="flex gap-3">
                  <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white border-none gap-2">
                    <Zap className="h-4 w-4" /> Open AutoFix
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2">
                    <GitBranch className="h-4 w-4" /> What-If Simulation
                  </Button>
                </div>
              </div>
              
              <div className="pt-4 border-t border-slate-700">
                 <a href="#" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 group">
                   View full CVE details on NVD <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                 </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
