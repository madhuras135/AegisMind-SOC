export const mockAssets = [
  { id: 'a1', name: 'api.prod.example.com', type: 'API', riskLevel: 'CRITICAL', vulnCount: 6, lastScanned: '2 mins ago', status: 'Active', ip: '10.0.1.45', region: 'us-east-1' },
  { id: 'a2', name: 'db-primary', type: 'Database', riskLevel: 'CRITICAL', vulnCount: 3, lastScanned: '5 mins ago', status: 'Active', ip: '10.0.2.10', region: 'us-east-1' },
  { id: 'a3', name: 'db-cache-01', type: 'Database', riskLevel: 'HIGH', vulnCount: 2, lastScanned: '15 mins ago', status: 'Active', ip: '10.0.2.11', region: 'us-east-1' },
  { id: 'a4', name: 'auth-service', type: 'Service', riskLevel: 'CRITICAL', vulnCount: 2, lastScanned: '1 hour ago', status: 'Active', ip: '10.0.1.50', region: 'us-east-1' },
  { id: 'a5', name: 'admin-panel', type: 'Web App', riskLevel: 'HIGH', vulnCount: 4, lastScanned: '3 hours ago', status: 'Active', ip: '10.0.3.5', region: 'us-west-2' },
  { id: 'a6', name: 'cdn.example.com', type: 'CDN', riskLevel: 'LOW', vulnCount: 1, lastScanned: '12 hours ago', status: 'Active', ip: 'Global', region: 'Global' },
  { id: 'a7', name: 'vpn-gateway', type: 'Network', riskLevel: 'HIGH', vulnCount: 2, lastScanned: '1 day ago', status: 'Active', ip: '198.51.100.1', region: 'us-east-1' },
  { id: 'a8', name: 's3-bucket-prod', type: 'Cloud', riskLevel: 'MEDIUM', vulnCount: 1, lastScanned: '2 days ago', status: 'Active', ip: 'AWS', region: 'us-east-1' },
  { id: 'a9', name: 'dev.example.com', type: 'Web App', riskLevel: 'HIGH', vulnCount: 3, lastScanned: '1 hour ago', status: 'Active', ip: '10.0.4.10', region: 'us-west-2' },
  { id: 'a10', name: 'stripe-api', type: 'Third Party', riskLevel: 'LOW', vulnCount: 0, lastScanned: '6 hours ago', status: 'Active', ip: 'External', region: 'External' },
  { id: 'a11', name: 'sendgrid-api', type: 'Third Party', riskLevel: 'MEDIUM', vulnCount: 1, lastScanned: '6 hours ago', status: 'Active', ip: 'External', region: 'External' },
  { id: 'a12', name: 'file-upload-service', type: 'Service', riskLevel: 'MEDIUM', vulnCount: 2, lastScanned: '1 day ago', status: 'Active', ip: '10.0.1.60', region: 'us-east-1' },
];

export const mockVulnerabilities = [
  { id: 'v1', severity: 'CRITICAL', cve: 'CVE-2024-1337', description: 'Remote Code Execution via unsanitized input', asset: 'api.prod.example.com', riskScore: 96, fixDifficulty: 'Easy', timeToExploit: '< 24h' },
  { id: 'v2', severity: 'CRITICAL', cve: 'CVE-2024-2891', description: 'SQL Injection in user search endpoint', asset: 'api.prod.example.com', riskScore: 94, fixDifficulty: 'Moderate', timeToExploit: '< 48h' },
  { id: 'v3', severity: 'CRITICAL', cve: 'CVE-2024-0978', description: 'Authentication Bypass in SSO token validation', asset: 'auth-service', riskScore: 91, fixDifficulty: 'Hard', timeToExploit: '3 days' },
  { id: 'v4', severity: 'CRITICAL', cve: 'CVE-2023-4499', description: 'Exposed Redis instance without password', asset: 'db-cache-01', riskScore: 89, fixDifficulty: 'Easy', timeToExploit: '< 24h' },
  { id: 'v5', severity: 'HIGH', cve: 'CVE-2023-3321', description: 'Cross-Site Scripting (XSS) in admin dashboard', asset: 'admin-panel', riskScore: 78, fixDifficulty: 'Moderate', timeToExploit: '5 days' },
  { id: 'v6', severity: 'HIGH', cve: 'CVE-2024-1122', description: 'Insecure Direct Object Reference (IDOR)', asset: 'dev.example.com', riskScore: 76, fixDifficulty: 'Easy', timeToExploit: '1 week' },
  { id: 'v7', severity: 'HIGH', cve: 'CVE-2023-5588', description: 'Buffer Overflow in VPN client negotiation', asset: 'vpn-gateway', riskScore: 82, fixDifficulty: 'Hard', timeToExploit: '2 weeks' },
  { id: 'v8', severity: 'MEDIUM', cve: 'CVE-2022-1055', description: 'Misconfigured S3 Bucket Permissions', asset: 's3-bucket-prod', riskScore: 65, fixDifficulty: 'Easy', timeToExploit: 'Unknown' },
  { id: 'v9', severity: 'MEDIUM', cve: 'CVE-2023-8899', description: 'Outdated OpenSSL dependency', asset: 'file-upload-service', riskScore: 58, fixDifficulty: 'Moderate', timeToExploit: 'Unknown' },
  { id: 'v10', severity: 'LOW', cve: 'CVE-2021-4422', description: 'Verbose Error Messages', asset: 'cdn.example.com', riskScore: 30, fixDifficulty: 'Easy', timeToExploit: 'N/A' },
  { id: 'v11', severity: 'CRITICAL', cve: 'CVE-2024-5566', description: 'Deserialization of Untrusted Data', asset: 'db-primary', riskScore: 95, fixDifficulty: 'Hard', timeToExploit: '48h' },
  { id: 'v12', severity: 'HIGH', cve: 'CVE-2023-9901', description: 'Privilege Escalation via misconfigured sudo', asset: 'auth-service', riskScore: 80, fixDifficulty: 'Moderate', timeToExploit: '1 week' },
  { id: 'v13', severity: 'MEDIUM', cve: 'CVE-2024-0012', description: 'Weak Password Policy Enforced', asset: 'admin-panel', riskScore: 50, fixDifficulty: 'Easy', timeToExploit: 'N/A' },
  { id: 'v14', severity: 'LOW', cve: 'CVE-2023-1122', description: 'Missing Security Headers', asset: 'dev.example.com', riskScore: 25, fixDifficulty: 'Easy', timeToExploit: 'N/A' },
  { id: 'v15', severity: 'HIGH', cve: 'CVE-2024-2233', description: 'Server-Side Request Forgery (SSRF)', asset: 'api.prod.example.com', riskScore: 85, fixDifficulty: 'Hard', timeToExploit: '10 days' },
  { id: 'v16', severity: 'CRITICAL', cve: 'CVE-2024-9988', description: 'Unauthenticated API Endpoint Exposure', asset: 'admin-panel', riskScore: 92, fixDifficulty: 'Easy', timeToExploit: '< 24h' },
  { id: 'v17', severity: 'MEDIUM', cve: 'CVE-2023-4455', description: 'Directory Traversal', asset: 'file-upload-service', riskScore: 68, fixDifficulty: 'Moderate', timeToExploit: 'Unknown' },
  { id: 'v18', severity: 'HIGH', cve: 'CVE-2024-7766', description: 'Exposed .env file containing credentials', asset: 'dev.example.com', riskScore: 88, fixDifficulty: 'Easy', timeToExploit: '< 24h' },
];

export const mockAlerts = [
  { id: 'al1', severity: 'CRITICAL', title: 'Public database port exposed', description: 'Unauthenticated access possible to Redis instance.', asset: 'db-cache-01', time: '2 min ago' },
  { id: 'al2', severity: 'CRITICAL', title: 'AWS root account login', description: 'Login detected from unknown IP 198.51.100.45.', asset: 'Cloud/AWS', time: '15 min ago' },
  { id: 'al3', severity: 'CRITICAL', title: 'High-volume data exfiltration', description: 'Unusual outbound traffic spike to foreign IP.', asset: 'db-primary', time: '1 hour ago' },
  { id: 'al4', severity: 'WARNING', title: 'Unverified external endpoint communication', description: '3 APIs sending data to unverified external endpoint.', asset: 'api.prod.example.com', time: '3 hours ago' },
  { id: 'al5', severity: 'WARNING', title: 'Credential leak detected', description: 'Employee credentials found in RockYou2024 breach.', asset: 'Dark Web Monitor', time: '5 hours ago' },
  { id: 'al6', severity: 'WARNING', title: 'Failed SSH login spike', description: '50+ failed login attempts from single IP.', asset: 'vpn-gateway', time: '6 hours ago' },
  { id: 'al7', severity: 'WARNING', title: 'New open port detected', description: 'Port 8080 opened dynamically on dev server.', asset: 'dev.example.com', time: '8 hours ago' },
  { id: 'al8', severity: 'WARNING', title: 'Expired SSL certificate', description: 'Internal service certificate expired 2 days ago.', asset: 'file-upload-service', time: '12 hours ago' },
  { id: 'al9', severity: 'INFO', title: 'Routine backup completed', description: 'Daily database snapshot stored successfully.', asset: 'db-primary', time: '1 day ago' },
  { id: 'al10', severity: 'INFO', title: 'User role changed', description: 'Admin privileges granted to newly hired engineer.', asset: 'auth-service', time: '1 day ago' },
  { id: 'al11', severity: 'INFO', title: 'Config file modified', description: 'Nginx config updated by CI/CD pipeline.', asset: 'cdn.example.com', time: '2 days ago' },
  { id: 'al12', severity: 'INFO', title: 'Agent auto-updated', description: 'SafeGuard agent updated to v4.2.0.', asset: 'All Agents', time: '2 days ago' },
];

export const mockActivityFeed = [
  { id: 1, type: 'critical', text: 'New critical vulnerability discovered on api.prod.example.com', time: '2 mins ago' },
  { id: 2, type: 'score_down', text: 'Security score dropped by 2 points', time: '2 mins ago' },
  { id: 3, type: 'fixed', text: 'CVE-2023-1122 patched on dev.example.com', time: '4 hours ago' },
  { id: 4, type: 'score_up', text: 'Security score increased by 1 point', time: '4 hours ago' },
  { id: 5, type: 'alert', text: 'Suspicious login detected on vpn-gateway', time: '1 day ago' },
];

export const mockScoreHistory = [
  { day: 'Mon', score: 68 },
  { day: 'Tue', score: 68 },
  { day: 'Wed', score: 70 },
  { day: 'Thu', score: 69 },
  { day: 'Fri', score: 69 },
  { day: 'Sat', score: 64 }, // Score dropped here
  { day: 'Sun', score: 64 },
];

export const mockThreatIntel = [
  { id: 'ti1', name: 'Ransomware Gang X-Spider', target: 'Finance Sector', technique: 'T1190 - Exploit Public-Facing Application', severity: 'CRITICAL', description: 'Actively exploiting CVE-2024-1337. Immediate patching required for external APIs.' },
  { id: 'ti2', name: 'Zero-Day in popular SSO library', target: 'Enterprise Auth', technique: 'T1068 - Exploitation for Privilege Escalation', severity: 'HIGH', description: 'PoC released on GitHub. Impacts auth-service if not mitigated.' },
  { id: 'ti3', name: 'Cloud Config Scrapers Active', target: 'AWS S3', technique: 'T1530 - Data from Cloud Storage Object', severity: 'MEDIUM', description: 'Automated bots scanning for publicly readable S3 buckets. Verify s3-bucket-prod ACLs.' },
];

export const mockThirdPartyRisk = [
  { id: 'tp1', package: 'express', version: '4.17.1', cve: 'CVE-2022-24999', assets: 'api.prod, auth-service', riskScore: 85 },
  { id: 'tp2', package: 'lodash', version: '4.17.20', cve: 'CVE-2021-23337', assets: 'admin-panel, dev.example', riskScore: 60 },
  { id: 'tp3', package: 'redis', version: '3.1.2', cve: 'CVE-2021-32625', assets: 'db-cache-01', riskScore: 88 },
];
