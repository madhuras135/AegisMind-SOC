"""
AegisMind: Next-Gen Security Operations & Vulnerability Analyzer
Author: Madhura S
Bootcamp: IBM SkillsBuild Cyber Security BootCamp 2026 (BharatCares)
"""

import json
import math
from datetime import datetime

class AegisMindSecurityAnalyzer:
    def __init__(self, target_domain="api.prod.example.com"):
        self.target_domain = target_domain
        self.assets = [
            {"id": "api", "label": "API.PROD.EXAMPLE.COM", "type": "service", "risk": "CRITICAL", "score": 94},
            {"id": "auth", "label": "AUTH-SERVICE", "type": "service", "risk": "CRITICAL", "score": 88},
            {"id": "db-cache", "label": "DB-CACHE-01", "type": "database", "risk": "HIGH", "score": 78},
            {"id": "db-primary", "label": "DB-PRIMARY", "type": "database", "risk": "CRITICAL", "score": 96},
            {"id": "s3", "label": "S3-BUCKET-PROD", "type": "cloud", "risk": "MEDIUM", "score": 45}
        ]
        self.vulnerabilities = [
            {
                "cve": "CVE-2024-1337",
                "asset": "API.PROD.EXAMPLE.COM",
                "severity": "CRITICAL",
                "cvss": 9.8,
                "description": "Remote Code Execution via unauthenticated input payload injection."
            },
            {
                "cve": "CVE-2023-4863",
                "asset": "AUTH-SERVICE",
                "severity": "HIGH",
                "cvss": 8.8,
                "description": "Heap buffer overflow in web library allowing arbitrary memory execution."
            },
            {
                "cve": "EXPOSED-REDIS",
                "asset": "DB-CACHE-01",
                "severity": "HIGH",
                "cvss": 7.5,
                "description": "Unauthenticated Redis cache port exposed to public network interface."
            }
        ]

    def calculate_posture_score(self):
        total_risk = sum(v["cvss"] for v in self.vulnerabilities)
        max_possible = len(self.vulnerabilities) * 10.0
        baseline_score = max(0, int(100 - (total_risk / max_possible) * 40))
        return baseline_score

    def simulate_what_if_patch(self, cve_id="CVE-2024-1337"):
        current_score = self.calculate_posture_score()
        patched_vulns = [v for v in self.vulnerabilities if v["cve"] != cve_id]
        total_risk = sum(v["cvss"] for v in patched_vulns)
        max_possible = max(1, len(patched_vulns)) * 10.0
        projected_score = max(0, int(100 - (total_risk / max_possible) * 30))
        delta = projected_score - current_score
        
        return {
            "patched_cve": cve_id,
            "current_score": current_score,
            "projected_score": projected_score,
            "score_delta": f"+{delta} POINTS",
            "status": "VECTOR SEVERED"
        }

    def generate_security_report(self):
        report = {
            "system": "AegisMind SOC Platform",
            "author": "Madhura S",
            "timestamp": datetime.now().isoformat(),
            "target": self.target_domain,
            "baseline_score": self.calculate_posture_score(),
            "total_assets_scanned": len(self.assets),
            "total_vulnerabilities": len(self.vulnerabilities),
            "simulation": self.simulate_what_if_patch("CVE-2024-1337")
        }
        return report

if __name__ == "__main__":
    analyzer = AegisMindSecurityAnalyzer()
    summary = analyzer.generate_security_report()
    print("==================================================")
    print("  AegisMind Cybersecurity Analyzer - Final Report ")
    print("==================================================")
    print(json.dumps(summary, indent=2))