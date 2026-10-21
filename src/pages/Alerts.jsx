import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, ExternalLink, ChevronDown, ChevronRight, Info } from 'lucide-react';
import { Card, CardContent, Badge, Button } from '../components/ui';
import { mockAlerts } from '../data/mockData';

export default function Alerts() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [expandedSections, setExpandedSections] = useState({ CRITICAL: true, WARNING: true, INFO: false });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleResolve = (id) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
    // In a real app we would show a toast here. For this demo, the card simply animating out is enough visual feedback, 
    // but we can add a visual toast if needed.
  };

  const groupedAlerts = useMemo(() => {
    return alerts.reduce((acc, alert) => {
      if (!acc[alert.severity]) acc[alert.severity] = [];
      acc[alert.severity].push(alert);
      return acc;
    }, { CRITICAL: [], WARNING: [], INFO: [] });
  }, [alerts]);

  const totalRaw = 47;
  const currentActionable = alerts.length;

  const getSeverityColor = (sev) => {
    if (sev === 'CRITICAL') return 'text-red-500 bg-red-950/50 border-red-900';
    if (sev === 'WARNING') return 'text-orange-500 bg-orange-950/50 border-orange-900';
    return 'text-blue-500 bg-blue-950/50 border-blue-900';
  };

  const getSeverityIcon = (sev) => {
    if (sev === 'INFO') return <Info className="h-5 w-5" />;
    return <AlertTriangle className="h-5 w-5" />;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="flex items-center justify-between p-4 bg-blue-950/20 border border-blue-500/20 rounded">
        <div className="flex items-center gap-3 text-blue-200">
          <Badge variant="ai" className="text-[10px] font-mono tracking-widest uppercase">AI Filtered</Badge>
          <span className="font-mono text-xs uppercase tracking-wider">
            Reduced <span className="text-blue-400 font-bold">{totalRaw}</span> raw alerts to <span className="text-blue-400 font-bold">{currentActionable}</span> actionable priority items
          </span>
        </div>
        <Button variant="outline" className="border-blue-500/30 text-blue-300 hover:bg-blue-900/30 font-mono text-[9px] uppercase tracking-widest h-8">
          View Raw Logs
        </Button>
      </div>

      {/* Alert Sections */}
      {['CRITICAL', 'WARNING', 'INFO'].map(severity => {
        const sectionAlerts = groupedAlerts[severity];
        if (sectionAlerts.length === 0 && severity === 'CRITICAL') return null; // Don't hide empty critical section, wait actually if it's 0 we can show 0
        
        return (
          <div key={severity} className="space-y-3">
            <button 
              onClick={() => toggleSection(severity)}
              className="flex items-center gap-2 text-slate-400 hover:text-slate-100 font-mono text-xs tracking-widest uppercase w-full text-left transition-colors"
            >
              {expandedSections[severity] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              {severity} Alerts
              <Badge variant={severity.toLowerCase()} className="ml-2 py-0.5">{sectionAlerts.length}</Badge>
            </button>

            <AnimatePresence>
              {expandedSections[severity] && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-3 overflow-hidden"
                >
                  {sectionAlerts.length === 0 ? (
                    <div className="text-[10px] font-mono tracking-widest uppercase text-slate-500 p-4 bg-[#020617]/50 rounded border border-white/5 border-dashed">
                      No active {severity.toLowerCase()} alerts.
                    </div>
                  ) : (
                    <AnimatePresence>
                      {sectionAlerts.map(alert => (
                        <motion.div 
                          key={alert.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, x: 20 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Card className={`border-l-4 rounded bg-[#0f172a]/50 border-y-white/5 border-r-white/5 hover:bg-[#0f172a]/80 transition-colors shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] ${
                            severity === 'CRITICAL' ? 'border-l-rose-500' : 
                            severity === 'WARNING' ? 'border-l-orange-500' : 
                            'border-l-blue-500'
                          }`}>
                            <CardContent className="p-4 flex gap-4 items-start">
                              <div className={`p-2 rounded border ${getSeverityColor(severity)} shrink-0 mt-0.5`}>
                                {getSeverityIcon(severity)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-4 mb-1">
                                  <h3 className="font-bold text-slate-200 font-mono text-sm tracking-wider uppercase truncate">{alert.title}</h3>
                                  <span className="text-[9px] font-mono text-slate-500 whitespace-nowrap">{alert.time}</span>
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-[9px] font-mono tracking-widest uppercase bg-[#020617] border border-white/10 px-1.5 py-0.5 rounded text-slate-400">
                                    {alert.asset}
                                  </span>
                                </div>
                                <p className="text-[11px] font-mono text-slate-300 leading-relaxed">{alert.description}</p>
                              </div>
                              <div className="flex flex-col gap-2 shrink-0 ml-4 border-l border-white/5 pl-4">
                                <Button size="sm" variant="outline" className="w-full justify-start gap-2 h-8 font-mono text-[9px] tracking-widest uppercase border-white/5 bg-[#020617]/50 text-slate-400 hover:text-white">
                                  <ExternalLink className="h-3 w-3" /> Navigate
                                </Button>
                                <Button size="sm" variant="ghost" onClick={() => handleResolve(alert.id)} className="w-full justify-start gap-2 h-8 font-mono text-[9px] tracking-widest uppercase hover:text-emerald-400 hover:bg-emerald-500/10">
                                  <CheckCircle className="h-3 w-3" /> Resolve
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
