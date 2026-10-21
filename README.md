# AegisMind: AI-Powered Next-Gen SOC Operations & Threat Intelligence Platform

**IBM SkillsBuild Cyber Security BootCamp 2026 Project**  
**Author:** Madhura S  
**Organization:** BharatCares (CSRBOX Group)  

---

## 📋 Project Overview

**AegisMind** is an advanced Security Operations Center (SOC) dashboard and automated vulnerability management suite. It is designed to analyze attack surfaces, detect critical CVEs, map multi-stage attack paths across network layers, and execute automated remediation workflows.

### Key Features
- **Attack Surface Mapping:** Visual topology graph representing entry gateways, cloud buckets, service chokepoints, and database backends.
- **Automated Vulnerability Management:** Real-time CVSS scoring, exploit probability analytics, and time-to-exploit (TTE) tracking.
- **AutoFix Mitigation Engine:** Generates input sanitization patches and code updates to neutralize Remote Code Execution (RCE) and unauthorized access vectors.
- **What-If Simulation Engine:** Predictive analytics modeling security posture changes when patches are applied versus when vulnerabilities are left unmitigated.
- **Dark Web & Threat Intelligence Monitoring:** Ingests compromised credential dumps and tracks npm/third-party package supply chain risks.

---

## 🛠️ Technology Stack

- **Frontend & Visualization:** React 18, Vite, Tailwind CSS, Framer Motion, Lucide React, Recharts
- **Security & Analytics Core:** Python 3.10+, Scikit-Learn, OWASP Threat Dragon, NVD CVE API, VirusTotal API
- **Deployment & Containerization:** Node.js, Express, Docker

---

## 🚀 Setup & Execution Instructions

### Prerequisites
- Python 3.10+
- Node.js 18+ and npm

### Installation & Local Run

1. **Clone the Repository:**
   ```bash
   git clone [https://github.com/MadhuraS/AegisMind-SOC.git](https://github.com/MadhuraS/AegisMind-SOC.git)
   cd AegisMind-SOC
Install Python Dependencies:
pip install -r requirements.txt
Install Frontend Dependencies:
npm install
Execute Security Verification Tests & Analyzer Core:
python MadhuraS_AegisMind.py
Start Development Dashboard:
npm run dev
📊 Dataset & Threat Intelligence Sources
National Vulnerability Database (NVD) API: Real-time CVE scoring and CVSS metrics.
AlienVault OTX & VirusTotal APIs: Live IoC feeds and threat actor TTP mappings.
OWASP Top 10 Security Benchmarks: Standardized flaw classification.
📜 License & Compliance
Developed for educational and assessment purposes under the IBM SkillsBuild Cyber Security Bootcamp 2026 with BharatCares.