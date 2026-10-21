import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ShieldOff, Search, ZoomIn, ZoomOut, Maximize, X, Activity, Server, Database, Cloud, AlertCircle, RefreshCw } from 'lucide-react';
import { Card, CardContent, Badge, NeuralInsight, Button, Progress } from '../components/ui';

// Mock Nodes Data
const nodes = [
  { id: 'internet', label: 'INTERNET GW', type: 'entry', x: 400, y: 50, risk: 'LOW', shape: 'circle' },
  { id: 'cdn', label: 'CDN.EXAMPLE.COM', type: 'network', x: 200, y: 150, risk: 'LOW', shape: 'circle' },
  { id: 'vpn', label: 'VPN-GATEWAY', type: 'network', x: 600, y: 150, risk: 'HIGH', shape: 'circle' },
  { id: 'api', label: 'API.PROD.EXAMPLE.COM', type: 'service', x: 400, y: 200, risk: 'CRITICAL', shape: 'diamond' },
  { id: 'stripe', label: 'STRIPE-API', type: 'third-party', x: 250, y: 280, risk: 'LOW', shape: 'triangle' },
  { id: 'sendgrid', label: 'SENDGRID-API', type: 'third-party', x: 550, y: 280, risk: 'MEDIUM', shape: 'triangle' },
  { id: 'auth', label: 'AUTH-SERVICE', type: 'service', x: 400, y: 320, risk: 'CRITICAL', shape: 'diamond' },
  { id: 'admin', label: 'ADMIN-PANEL', type: 'service', x: 600, y: 320, risk: 'HIGH', shape: 'diamond' },
  { id: 'dev', label: 'DEV.EXAMPLE.COM', type: 'service', x: 200, y: 320, risk: 'HIGH', shape: 'circle' },
  { id: 'db-cache', label: 'DB-CACHE-01', type: 'database', x: 300, y: 450, risk: 'HIGH', shape: 'square' },
  { id: 'db-primary', label: 'DB-PRIMARY', type: 'database', x: 500, y: 450, risk: 'CRITICAL', shape: 'square' },
  { id: 's3', label: 'S3-BUCKET-PROD', type: 'cloud', x: 500, y: 550, risk: 'MEDIUM', shape: 'circle' },
];

const edges = [
  { source: 'internet', target: 'cdn' },
  { source: 'internet', target: 'api' },
  { source: 'internet', target: 'vpn' },
  { source: 'api', target: 'stripe' },
  { source: 'api', target: 'sendgrid' },
  { source: 'api', target: 'auth' },
  { source: 'api', target: 'dev' },
  { source: 'vpn', target: 'admin' },
  { source: 'auth', target: 'db-cache' },
  { source: 'auth', target: 'db-primary' },
  { source: 'admin', target: 'db-primary' },
  { source: 'db-primary', target: 's3' },
];

const attackPath = ['internet', 'api', 'auth', 'db-primary'];

const simulationSteps = [
  { title: 'INITIAL ACCESS', cve: 'CVE-2024-1337', node: 'api', desc: 'RCE via payload injection on api.prod', ai: '[01] INGRESS PAYLOAD DETECTED\n[02] ARBITRARY CODE EXECUTED IN CONTAINER\n[03] SHELL ACCESS ACQUIRED' },
  { title: 'LATERAL MOVEMENT', cve: 'T1550', node: 'auth', desc: 'JWT exfiltration and pivot to auth-service', ai: '[01] MEMORY DUMP INITIATED\n[02] PERMISSIVE JWT EXTRACTED\n[03] PIVOT TO INTERNAL NETWORK SUCCESSFUL' },
  { title: 'PRIVILEGE ESCALATION', cve: 'T1068', node: 'auth', desc: 'Sudoers misconfiguration exploit', ai: '[01] ENUMERATING LOCAL PRIVILEGES\n[02] SUDO MISCONFIGURATION IDENTIFIED\n[03] ROOT SHELL SPAWNED' },
  { title: 'DATA EXFILTRATION', cve: 'T1040', node: 'db-primary', desc: 'Direct database connection established', ai: '[01] BYPASSING APP CONTROLS\n[02] DIRECT POSTGRES CONN INITIATED\n[03] DUMPING CUSTOMER TABLE (2.4M RECORDS)' },
];

export default function AttackSurface() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(-1);
  const [withFix, setWithFix] = useState(false);
  
  useEffect(() => {
    let timer;
    if (isSimulating) {
      if (simStep < simulationSteps.length - 1) {
        timer = setTimeout(() => {
          if (withFix && simStep === 0) {
            return;
          }
          setSimStep(s => s + 1);
        }, 2500);
      } else {
        timer = setTimeout(() => setIsSimulating(false), 5000);
      }
    }
    return () => clearTimeout(timer);
  }, [isSimulating, simStep, withFix]);

  const startSimulation = () => {
    setSelectedNode(null);
    setSimStep(0);
    setIsSimulating(true);
  };

  const getNodeColor = (risk) => {
    switch (risk) {
      case 'CRITICAL': return '#f43f5e'; // rose-500
      case 'HIGH': return '#f97316';     // orange-500
      case 'MEDIUM': return '#f59e0b';   // amber-500
      case 'LOW': return '#10b981';      // emerald-500
      default: return '#64748b';         // slate-500
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Top Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2 bg-[#0f172a]/50 p-1 rounded border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
          <Button variant="ghost" size="sm" className="text-xs uppercase tracking-wider font-mono">Topology</Button>
          <Button variant="ghost" size="sm" className={`text-xs uppercase tracking-wider font-mono ${withFix ? 'text-blue-400 bg-blue-500/10' : ''}`} onClick={() => setWithFix(!withFix)}>
            What-If {withFix && '[PATCHED]'}
          </Button>
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            onClick={startSimulation}
            disabled={isSimulating}
            className={`gap-2 font-mono text-xs tracking-wider uppercase ${isSimulating ? 'bg-rose-950/50 text-rose-500 border border-rose-500/30' : 'bg-rose-600 hover:bg-rose-700 text-white shadow-[0_0_10px_rgba(244,63,94,0.3)]'}`}
          >
            {isSimulating ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4 fill-current" />}
            {isSimulating ? 'SIMULATING...' : 'Simulate Vector'}
          </Button>
          
          <div className="flex items-center gap-1 bg-[#0f172a]/50 p-1 rounded border border-white/5">
            <button className="p-1.5 text-slate-500 hover:text-slate-300"><ZoomOut className="h-4 w-4" /></button>
            <button className="p-1.5 text-slate-500 hover:text-slate-300"><ZoomIn className="h-4 w-4" /></button>
            <button className="p-1.5 text-slate-500 hover:text-slate-300"><Maximize className="h-4 w-4" /></button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 gap-6 min-h-0 relative">
        {/* Graph Area */}
        <Card className="flex-1 relative overflow-hidden border-white/5 bg-[#020617] bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] shadow-[inset_0_1px_10px_rgba(0,0,0,0.5)]">
          <svg className="w-full h-full" viewBox="0 0 800 650" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Normal Edges */}
            {edges.map((edge, i) => {
              const source = nodes.find(n => n.id === edge.source);
              const target = nodes.find(n => n.id === edge.target);
              const attackIndex = attackPath.indexOf(edge.source);
              const isAttackEdge = attackIndex !== -1 && attackPath[attackIndex + 1] === edge.target;
              const isSimulatedActive = isSimulating && isAttackEdge && simStep >= attackIndex;
              const isBlocked = withFix && isAttackEdge && attackIndex >= 1; 

              return (
                <g key={i}>
                  <line 
                    x1={source.x} y1={source.y} x2={target.x} y2={target.y} 
                    stroke={withFix && !isAttackEdge ? "#0f172a" : "#1e293b"} 
                    strokeWidth="2" 
                  />
                  {isSimulatedActive && !isBlocked && (
                    <motion.line
                      x1={source.x} y1={source.y} x2={target.x} y2={target.y}
                      stroke="#f43f5e"
                      strokeWidth="3"
                      strokeDasharray="6 6"
                      initial={{ strokeDashoffset: 100 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      filter="url(#glow)"
                    />
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {nodes.map(node => {
              const color = withFix && node.id !== 'api' && node.id !== 'internet' ? '#1e293b' : getNodeColor(node.risk);
              const isPathNode = attackPath.includes(node.id);
              const pathIndex = attackPath.indexOf(node.id);
              const isSimulatedNode = isSimulating && isPathNode && simStep >= pathIndex;
              const isBlockedNode = withFix && isSimulating && isPathNode && pathIndex > 1;

              return (
                <g 
                  key={node.id} 
                  transform={`translate(${node.x}, ${node.y})`}
                  onClick={() => !isSimulating && setSelectedNode(node)}
                  className={`cursor-pointer transition-all ${!isSimulating && 'hover:brightness-125 hover:scale-110'}`}
                >
                  {isSimulatedNode && !isBlockedNode && (
                    <circle r="35" fill="none" stroke="#f43f5e" strokeWidth="1" className="animate-ping opacity-30" />
                  )}
                  
                  {/* Shapes */}
                  {node.shape === 'circle' && <circle r="20" fill="#020617" stroke={color} strokeWidth="3" filter={isSimulatedNode && !isBlockedNode ? 'url(#glow)' : ''} />}
                  {node.shape === 'square' && <rect x="-18" y="-18" width="36" height="36" rx="4" fill="#020617" stroke={color} strokeWidth="3" filter={isSimulatedNode && !isBlockedNode ? 'url(#glow)' : ''} />}
                  {node.shape === 'diamond' && <rect x="-16" y="-16" width="32" height="32" rx="4" fill="#020617" stroke={color} strokeWidth="3" transform="rotate(45)" filter={isSimulatedNode && !isBlockedNode ? 'url(#glow)' : ''} />}
                  {node.shape === 'triangle' && <polygon points="0,-22 22,18 -22,18" fill="#020617" stroke={color} strokeWidth="3" strokeLinejoin="round" />}
                  
                  {/* Icons inside nodes */}
                  {node.type === 'entry' && <Cloud x="-10" y="-10" width="20" height="20" className="text-slate-500" />}
                  {node.type === 'service' && <Activity x="-10" y="-10" width="20" height="20" className="text-slate-500" />}
                  {node.type === 'database' && <Database x="-10" y="-10" width="20" height="20" className="text-slate-500" />}
                  {node.type === 'network' && <Server x="-10" y="-10" width="20" height="20" className="text-slate-500" />}

                  <text y="35" textAnchor="middle" className="text-[10px] font-mono fill-slate-400 font-medium tracking-wider" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>{node.label}</text>
                  
                  {/* Blocked indicator */}
                  {withFix && node.id === 'api' && isSimulating && (
                    <g transform="translate(20, -20)">
                      <circle r="12" fill="#10b981" />
                      <ShieldOff x="-7" y="-7" width="14" height="14" className="text-[#020617]" />
                    </g>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Minimap Box */}
          <div className="absolute bottom-4 right-4 w-32 h-24 bg-[#0f172a]/80 border border-white/5 rounded p-2 backdrop-blur-md pointer-events-none">
            <svg viewBox="0 0 800 650" className="w-full h-full opacity-40">
              {nodes.map(n => <circle key={n.id} cx={n.x} cy={n.y} r="40" fill={getNodeColor(n.risk)} />)}
            </svg>
            <div className="absolute inset-0 border border-blue-500/30 m-2 rounded bg-blue-500/5" />
          </div>
        </Card>

        {/* Side Panels */}
        <AnimatePresence>
          {selectedNode && !isSimulating && (
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              className="w-80 shrink-0 h-full overflow-y-auto"
            >
              <Card className="h-full border-white/5 bg-[#0f172a]/95 backdrop-blur-xl rounded-xl">
                <CardContent className="p-5 relative h-full flex flex-col">
                  <button onClick={() => setSelectedNode(null)} className="absolute top-4 right-4 text-slate-500 hover:text-slate-300"><X className="h-4 w-4" /></button>
                  
                  <div className="flex items-center gap-3 mb-6 pr-6">
                    <div className="p-3 bg-[#020617] rounded border border-white/5">
                      {selectedNode.type === 'database' ? <Database className="text-slate-400" /> : <Server className="text-slate-400" />}
                    </div>
                    <div>
                      <h3 className="font-bold font-mono text-xs text-slate-200 tracking-wider break-all">{selectedNode.label}</h3>
                      <p className="text-[10px] font-mono text-slate-500 uppercase">{selectedNode.type}</p>
                    </div>
                  </div>

                  <div className="space-y-4 flex-1">
                    <div className="flex justify-between items-center bg-[#020617]/50 p-3 rounded border border-white/5">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Risk Level</span>
                      <Badge variant={selectedNode.risk.toLowerCase()}>{selectedNode.risk}</Badge>
                    </div>

                    <NeuralInsight 
                      variant="info"
                      steps={[
                        `[01] ANALYZING NODE: ${selectedNode.label}`,
                        `[02] ROLE: CRITICAL NETWORK CHOKEPOINT`,
                        `[03] VECTORS: DIRECT INGRESS DETECTED`,
                        `[04] LATERAL MOVEMENT: HIGH PROBABILITY`
                      ]}
                    />

                    {selectedNode.risk === 'CRITICAL' && (
                      <div className="mt-4 border border-rose-900/50 bg-rose-950/20 p-4 rounded relative overflow-hidden">
                        <div className="absolute inset-0 scanline-overlay"></div>
                        <h4 className="text-[10px] font-bold text-rose-500 mb-2 flex items-center gap-2 tracking-widest"><AlertCircle className="h-3 w-3" /> TOP VULNERABILITY</h4>
                        <p className="text-xs text-slate-200 font-mono mb-1">CVE-2024-1337</p>
                        <p className="text-[10px] text-slate-400 mb-4 font-mono">PAYLOAD INJECTION ALLOWING RCE.</p>
                        <Button size="sm" className="w-full bg-rose-600 hover:bg-rose-700 text-white font-mono text-[10px] tracking-widest uppercase">Inspect Details</Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {isSimulating && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="absolute bottom-6 left-6 right-6 lg:left-auto lg:w-[450px] z-10"
            >
              <Card className="border-rose-500/30 shadow-[0_0_30px_rgba(244,63,94,0.15)] bg-[#020617]/95 backdrop-blur-xl">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-4">
                    <h3 className="font-bold text-rose-500 flex items-center gap-2 text-xs uppercase tracking-wider">
                      <AlertCircle className="h-4 w-4" /> Vector Simulation
                    </h3>
                    <div className="text-[10px] font-mono text-slate-500 bg-[#0f172a] px-2 py-1 rounded border border-white/5">
                      STEP {simStep + 1} / {simulationSteps.length}
                    </div>
                  </div>

                  {simStep >= 0 && simStep < simulationSteps.length && (
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={simStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <div>
                          <div className="flex gap-2 items-center mb-2">
                            <Badge variant="outline" className="border-rose-500/30 text-rose-400 font-mono text-[10px] py-0">{simulationSteps[simStep].cve}</Badge>
                            <span className="text-xs font-mono font-bold text-slate-200 tracking-wider">{simulationSteps[simStep].title}</span>
                          </div>
                          <p className="text-[11px] text-slate-400 font-mono uppercase tracking-wide">{simulationSteps[simStep].desc}</p>
                        </div>
                        
                        {withFix && simStep === 0 ? (
                          <div className="bg-emerald-950/30 border border-emerald-900/50 rounded px-4 py-3 text-emerald-400 flex items-center gap-3">
                            <ShieldOff className="h-4 w-4 shrink-0 drop-shadow-[0_0_5px_rgba(16,185,129,0.8)]" />
                            <div>
                              <strong className="block mb-1 text-[10px] uppercase tracking-widest text-emerald-300 font-mono">Vector Severed</strong>
                              <span className="font-mono text-[10px] text-emerald-500/80">PATCH APPLIED TO INGRESS NODE. EXECUTION HALTED.</span>
                            </div>
                          </div>
                        ) : (
                          <NeuralInsight 
                            variant="critical"
                            steps={simulationSteps[simStep].ai.split('\n')}
                          />
                        )}
                        
                        {!withFix && (
                          <Progress value={((simStep + 1) / simulationSteps.length) * 100} indicatorColor="bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]" className="h-1 mt-4 bg-slate-800" />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  )}

                  <div className="mt-6 flex justify-between text-[10px] font-mono text-slate-500 border-t border-white/5 pt-4">
                    <span>T-MINUS: ~6 HOURS</span>
                    <span>TECHNIQUES: 3 IDENTIFIED</span>
                  </div>
                  
                  <button onClick={() => setIsSimulating(false)} className="absolute top-4 right-4 text-slate-600 hover:text-slate-400 transition-colors">
                    <X className="h-4 w-4" />
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
