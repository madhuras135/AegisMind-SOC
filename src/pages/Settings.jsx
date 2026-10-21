import React, { useState } from 'react';
import { Save, Cloud, Key, Bell, Shield, GitBranch, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input } from '../components/ui';

export default function Settings() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-mono tracking-widest uppercase text-slate-100">System Configuration</h2>
          <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mt-1">Manage global integrations, notification routing, and automated response parameters.</p>
        </div>
        <Button onClick={handleSave} className="gap-2 bg-blue-600 hover:bg-blue-500 font-mono text-[10px] tracking-widest uppercase">
          <Save className="h-4 w-4" /> {saved ? 'SAVED' : 'COMMIT CHANGES'}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-white/5 bg-[#0f172a]/50">
          <CardHeader className="border-b border-white/5 pb-3">
            <CardTitle className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase"><Cloud className="h-4 w-4 text-blue-500" /> Cloud Integrations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="flex items-center justify-between p-3 bg-[#020617] rounded border border-white/5">
              <div className="flex items-center gap-3">
                <div className="bg-[#FF9900]/10 p-2 rounded"><Cloud className="h-4 w-4 text-[#FF9900]" /></div>
                <div>
                  <p className="font-mono text-xs text-slate-200">AWS</p>
                  <p className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">Connected: us-east-1</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="font-mono text-[9px] tracking-widest uppercase text-rose-400 border-rose-900/50 bg-rose-950/20 hover:bg-rose-900/40">Disconnect</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#020617] rounded border border-white/5">
              <div className="flex items-center gap-3">
                <div className="bg-[#4285F4]/10 p-2 rounded"><Cloud className="h-4 w-4 text-[#4285F4]" /></div>
                <div>
                  <p className="font-mono text-xs text-slate-200">Google Cloud</p>
                  <p className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">Not connected</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="font-mono text-[9px] tracking-widest uppercase border-white/10 bg-[#0f172a] hover:text-white">Connect</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/5 bg-[#0f172a]/50">
          <CardHeader className="border-b border-white/5 pb-3">
            <CardTitle className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase"><Key className="h-4 w-4 text-purple-500" /> API & Tooling</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
             <div className="flex items-center justify-between p-3 bg-[#020617] rounded border border-white/5">
              <div className="flex items-center gap-3">
                <div className="bg-[#0f172a] p-2 rounded"><GitBranch className="h-4 w-4 text-slate-300" /></div>
                <div>
                  <p className="font-mono text-xs text-slate-200">GitHub</p>
                  <p className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">AutoFix PR Target</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="font-mono text-[9px] tracking-widest uppercase border-white/10 bg-[#0f172a] hover:text-white">Connect</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#020617] rounded border border-white/5">
              <div className="flex items-center gap-3">
                <div className="bg-[#E34F26]/10 p-2 rounded"><Shield className="h-4 w-4 text-[#E34F26]" /></div>
                <div>
                  <p className="font-mono text-xs text-slate-200">Jira</p>
                  <p className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">Auto-ticket Pipeline</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="font-mono text-[9px] tracking-widest uppercase border-white/10 bg-[#0f172a] hover:text-white">Connect</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 border-white/5 bg-[#0f172a]/50">
          <CardHeader className="border-b border-white/5 pb-3">
            <CardTitle className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase"><Bell className="h-4 w-4 text-amber-500" /> Routing Rules</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
             <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h3 className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">Channels</h3>
                  <label className="flex items-center gap-3 bg-[#020617] p-3 rounded border border-white/5 cursor-pointer hover:bg-[#0f172a] transition-colors">
                    <input type="checkbox" defaultChecked className="rounded bg-[#0f172a] border-white/10 text-blue-500" />
                    <div><p className="text-xs font-mono text-slate-200 uppercase tracking-widest">Email Intercepts</p><p className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">arjun@example.com</p></div>
                  </label>
                  <label className="flex items-center gap-3 bg-[#020617] p-3 rounded border border-white/5 cursor-pointer hover:bg-[#0f172a] transition-colors">
                    <input type="checkbox" defaultChecked className="rounded bg-[#0f172a] border-white/10 text-blue-500" />
                    <div className="flex items-center gap-2"><MessageSquare className="h-4 w-4 text-slate-500" /><p className="text-xs font-mono text-slate-200 uppercase tracking-widest">Slack Webhook</p></div>
                  </label>
                </div>
                <div className="space-y-3">
                  <h3 className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">Severity Thresholds</h3>
                  <label className="flex items-center gap-3 bg-[#020617] p-3 rounded border border-white/5 cursor-pointer hover:bg-[#0f172a] transition-colors">
                    <input type="checkbox" defaultChecked className="rounded bg-[#0f172a] border-white/10 text-blue-500" />
                    <p className="font-mono text-xs uppercase tracking-widest text-rose-500">Critical Alerts</p>
                  </label>
                  <label className="flex items-center gap-3 bg-[#020617] p-3 rounded border border-white/5 cursor-pointer hover:bg-[#0f172a] transition-colors">
                    <input type="checkbox" defaultChecked className="rounded bg-[#0f172a] border-white/10 text-blue-500" />
                    <p className="font-mono text-xs uppercase tracking-widest text-orange-400">High Alerts</p>
                  </label>
                  <label className="flex items-center gap-3 bg-[#020617] p-3 rounded border border-white/5 cursor-pointer hover:bg-[#0f172a] transition-colors">
                    <input type="checkbox" className="rounded bg-[#0f172a] border-white/10 text-blue-500" />
                    <p className="font-mono text-xs uppercase tracking-widest text-amber-500">Info Alerts</p>
                  </label>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
