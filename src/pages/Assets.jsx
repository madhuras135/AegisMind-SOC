import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, List, Shield, ShieldAlert, ShieldCheck, Database, Server, Cloud, Globe, X, Wrench } from 'lucide-react';
import { Card, CardContent, Badge, NeuralInsight, Button } from '../components/ui';
import { mockAssets, mockVulnerabilities } from '../data/mockData';

export default function Assets() {
  const [view, setView] = useState('grid');
  const [selectedAsset, setSelectedAsset] = useState(null);

  const getAssetIcon = (type) => {
    switch (type) {
      case 'Database': return <Database className="h-6 w-6 text-slate-400" />;
      case 'API':
      case 'Service': return <Server className="h-6 w-6 text-slate-400" />;
      case 'Cloud': return <Cloud className="h-6 w-6 text-slate-400" />;
      default: return <Globe className="h-6 w-6 text-slate-400" />;
    }
  };

  const getRiskColor = (risk) => {
    if (risk === 'CRITICAL') return 'text-red-500 bg-red-950/40 border-red-900/50';
    if (risk === 'HIGH') return 'text-orange-500 bg-orange-950/40 border-orange-900/50';
    if (risk === 'MEDIUM') return 'text-amber-500 bg-amber-950/40 border-amber-900/50';
    return 'text-green-500 bg-green-950/40 border-green-900/50';
  };

  const getRiskIcon = (risk) => {
    if (risk === 'CRITICAL') return <ShieldAlert className="h-4 w-4 text-red-500" />;
    if (risk === 'HIGH' || risk === 'MEDIUM') return <Shield className="h-4 w-4 text-orange-500" />;
    return <ShieldCheck className="h-4 w-4 text-green-500" />;
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6 relative overflow-hidden">
      {/* Main Area */}
      <div className={`flex-1 transition-all duration-300 flex flex-col ${selectedAsset ? 'mr-[500px]' : ''}`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold font-mono tracking-widest uppercase text-slate-100 flex items-center gap-2">
            Asset Inventory <Badge variant="outline" className="font-mono text-xs border-white/10 text-slate-400">{mockAssets.length}</Badge>
          </h2>
          <div className="flex items-center gap-1 bg-[#020617] p-1 rounded border border-white/5">
            <button 
              onClick={() => setView('grid')}
              className={`p-1.5 rounded transition-colors ${view === 'grid' ? 'bg-[#0f172a] text-blue-400 border border-white/5 shadow-[0_0_8px_rgba(59,130,246,0.2)]' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button 
              onClick={() => setView('list')}
              className={`p-1.5 rounded transition-colors ${view === 'list' ? 'bg-[#0f172a] text-blue-400 border border-white/5 shadow-[0_0_8px_rgba(59,130,246,0.2)]' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 pb-6">
          {view === 'grid' ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {mockAssets.map((asset) => (
                <Card 
                  key={asset.id} 
                  hoverable 
                  className={`cursor-pointer transition-colors border-white/5 ${selectedAsset?.id === asset.id ? 'border-blue-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),_0_0_15px_rgba(59,130,246,0.3)] bg-[#0f172a]' : 'bg-[#0f172a]/50 hover:bg-[#0f172a]/80'}`}
                  onClick={() => setSelectedAsset(asset)}
                >
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-[#020617] rounded border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                        {getAssetIcon(asset.type)}
                      </div>
                      <Badge variant={asset.riskLevel.toLowerCase()} className="flex items-center gap-1.5 pl-1.5 pr-2">
                        {getRiskIcon(asset.riskLevel)}
                        {asset.riskLevel}
                      </Badge>
                    </div>
                    <h3 className="text-sm font-bold font-mono tracking-wider uppercase text-slate-200 truncate mb-1" title={asset.name}>{asset.name}</h3>
                    <p className="text-[10px] font-mono tracking-widest text-slate-500 mb-4">{asset.type} // {asset.ip}</p>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-white/5">
                      <div className="text-[10px] font-mono tracking-widest uppercase text-slate-500">
                        <span>VULNS: </span>
                        <span className={`font-bold ${asset.vulnCount > 0 ? 'text-rose-500' : 'text-emerald-500'}`}>{asset.vulnCount}</span>
                      </div>
                      <div className="text-[9px] font-mono tracking-widest text-slate-600 uppercase">
                        {asset.lastScanned}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="overflow-hidden border-white/5 bg-[#0f172a]/50">
              <table className="w-full text-sm text-left">
                <thead className="text-[10px] font-mono tracking-widest text-slate-500 uppercase bg-[#020617] border-b border-white/5">
                  <tr>
                    <th className="px-4 py-3 font-medium">Asset Name</th>
                    <th className="px-4 py-3 font-medium">Type</th>
                    <th className="px-4 py-3 font-medium">Risk Level</th>
                    <th className="px-4 py-3 font-medium">Vulnerabilities</th>
                    <th className="px-4 py-3 font-medium">Last Scanned</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-xs">
                  {mockAssets.map((asset) => (
                    <tr 
                      key={asset.id}
                      onClick={() => setSelectedAsset(asset)}
                      className={`border-b border-white/5 hover:bg-[#020617]/50 cursor-pointer transition-colors ${selectedAsset?.id === asset.id ? 'bg-[#0f172a] shadow-[inset_2px_0_0_#3b82f6]' : ''}`}
                    >
                      <td className="px-4 py-4 font-bold text-slate-200 flex items-center gap-3">
                        {getAssetIcon(asset.type)}
                        {asset.name}
                      </td>
                      <td className="px-4 py-4 text-slate-400 text-[10px] uppercase tracking-widest">{asset.type}</td>
                      <td className="px-4 py-4">
                        <Badge variant={asset.riskLevel.toLowerCase()}>{asset.riskLevel}</Badge>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`font-bold ${asset.vulnCount > 0 ? 'text-rose-500' : 'text-emerald-500'}`}>{asset.vulnCount}</span>
                      </td>
                      <td className="px-4 py-4 text-slate-500 text-[10px] uppercase tracking-widest">{asset.lastScanned}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          )}
        </div>
      </div>

      {/* Slide-in Detail Panel */}
      <AnimatePresence>
        {selectedAsset && (
          <motion.div 
            initial={{ x: 500, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 500, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 w-[500px] h-full bg-[#0f172a]/95 backdrop-blur-xl border-l border-white/5 shadow-2xl flex flex-col z-20 overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/5 bg-[#020617]/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#0f172a] rounded border border-white/5">
                  {getAssetIcon(selectedAsset.type)}
                </div>
                <div>
                  <h3 className="font-bold font-mono tracking-wider uppercase text-slate-100">{selectedAsset.name}</h3>
                  <Badge variant={selectedAsset.riskLevel.toLowerCase()} className="mt-1 text-[9px] font-mono py-0">{selectedAsset.riskLevel}</Badge>
                </div>
              </div>
              <button 
                onClick={() => setSelectedAsset(null)}
                className="p-1 rounded text-slate-500 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <NeuralInsight 
                variant={selectedAsset.vulnCount > 0 ? "critical" : "info"}
                steps={[
                  `[01] ANALYZING ASSET: ${selectedAsset.name} (${selectedAsset.type})`,
                  `[02] REGION: ${selectedAsset.region}`,
                  `[03] KNOWN VULNERABILITIES: ${selectedAsset.vulnCount}`,
                  `[04] STATUS: ${selectedAsset.vulnCount > 0 ? 'REQUIRES IMMEDIATE ATTENTION' : 'OPTIMAL'}`
                ]}
              />

              <div>
                <h4 className="text-[10px] font-mono font-semibold text-slate-400 mb-3 uppercase tracking-widest">Metadata</h4>
                <div className="bg-[#020617]/50 rounded border border-white/5 overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <tbody>
                      {Object.entries({
                        'Type': selectedAsset.type,
                        'IP Address': selectedAsset.ip,
                        'Region': selectedAsset.region,
                        'Status': selectedAsset.status,
                        'Last Scanned': selectedAsset.lastScanned
                      }).map(([key, val]) => (
                        <tr key={key} className="border-b border-white/5 last:border-0">
                          <td className="px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-slate-500 w-1/3 bg-[#020617]">{key}</td>
                          <td className="px-4 py-2 text-slate-300 font-mono text-xs">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-mono font-semibold text-slate-400 mb-3 uppercase tracking-widest">Vulnerabilities ({selectedAsset.vulnCount})</h4>
                {selectedAsset.vulnCount === 0 ? (
                  <div className="bg-emerald-950/20 border border-emerald-900/50 rounded p-4 text-center">
                    <ShieldCheck className="h-8 w-8 text-emerald-500 mx-auto mb-2 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <p className="text-xs font-mono tracking-widest uppercase text-emerald-400">No vulnerabilities detected.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {mockVulnerabilities.filter(v => v.asset === selectedAsset.name || selectedAsset.vulnCount > 0).slice(0, selectedAsset.vulnCount).map((v, i) => (
                      <div key={i} className="bg-[#020617]/50 border border-white/5 rounded p-3 flex justify-between items-center">
                        <div>
                          <p className="text-sm font-bold font-mono tracking-wider text-slate-200">{v.cve || `CVE-202X-${1000+i}`}</p>
                          <p className="text-[10px] font-mono text-slate-500 truncate w-48 uppercase">{v.description}</p>
                        </div>
                        <Badge variant={v.severity?.toLowerCase() || 'high'}>{v.severity || 'HIGH'}</Badge>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full mt-2 font-mono text-[9px] uppercase tracking-widest h-8 border-white/10 bg-[#020617]/50 text-slate-400 hover:text-white">View all in Vulnerabilities tab</Button>
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-[10px] font-mono font-semibold text-slate-400 mb-3 uppercase tracking-widest">Dependency Graph (Mini)</h4>
                <div className="bg-[#020617]/50 border border-white/5 rounded p-4 h-32 flex items-center justify-center relative overflow-hidden">
                   {/* Simplified SVG mini-graph */}
                   <svg viewBox="0 0 200 100" className="w-full h-full opacity-70">
                     <circle cx="40" cy="50" r="10" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />
                     <line x1="50" y1="50" x2="90" y2="50" stroke="#1e293b" strokeWidth="2" strokeDasharray="4 2" />
                     <circle cx="100" cy="50" r="12" fill="#3b82f6" className="animate-pulse" />
                     <line x1="110" y1="50" x2="150" y2="30" stroke="#1e293b" strokeWidth="2" />
                     <line x1="110" y1="50" x2="150" y2="70" stroke="#1e293b" strokeWidth="2" />
                     <rect x="150" y="22" width="16" height="16" fill="#f43f5e" rx="2" />
                     <rect x="150" y="62" width="16" height="16" fill="#f59e0b" rx="2" />
                   </svg>
                   <div className="absolute top-2 left-2 text-[9px] text-slate-500 font-mono tracking-widest uppercase">Upstream / Downstream</div>
                </div>
              </div>

            </div>
            
            <div className="p-4 border-t border-white/5 bg-[#020617]/80 shrink-0 backdrop-blur">
               <Button className="w-full gap-2 bg-blue-600 hover:bg-blue-500 font-mono text-[10px] tracking-widest uppercase text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]" disabled={selectedAsset.vulnCount === 0}>
                 <Wrench className="h-4 w-4" /> Fix All Vulnerabilities
               </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
