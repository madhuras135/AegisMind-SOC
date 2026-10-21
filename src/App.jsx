import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/Layout';

// Stubs for modules
import Dashboard from './pages/Dashboard';
import Vulnerabilities from './pages/Vulnerabilities';
import AutoFix from './pages/AutoFix';
import WhatIfEngine from './pages/WhatIfEngine';
import AttackSurface from './pages/AttackSurface';
import Assets from './pages/Assets';
import Alerts from './pages/Alerts';
import Reports from './pages/Reports';
import Intelligence from './pages/Intelligence';
import AIChat from './pages/AIChat';
import Settings from './pages/Settings';
import Onboarding from './pages/Onboarding';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="attack-surface" element={<AttackSurface />} />
          <Route path="vulnerabilities" element={<Vulnerabilities />} />
          <Route path="autofix" element={<AutoFix />} />
          <Route path="what-if" element={<WhatIfEngine />} />
          <Route path="assets" element={<Assets />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="reports" element={<Reports />} />
          <Route path="intelligence" element={<Intelligence />} />
          <Route path="chat" element={<AIChat />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
