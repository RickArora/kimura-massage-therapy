#!/usr/bin/env python3
import base64
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "ads" / "intro-reel-slides"
OUT.mkdir(parents=True, exist_ok=True)

NAVY = "#0F2742"
NAVY_DARK = "#080F1C"
NAVY_MID = "#162F50"
ORANGE = "#E85D04"
CREAM = "#F2F4F8"
MUTED = "rgba(255,255,255,.72)"


def data_uri(path):
    raw = path.read_bytes()
    ext = path.suffix.lower().replace(".", "")
    mime = "jpeg" if ext in {"jpg", "jpeg"} else "png"
    return f"data:image/{mime};base64,{base64.b64encode(raw).decode()}"


profile = data_uri(ROOT / "assets" / "rmt-profile-circle-600.png")
treatment = data_uri(ROOT / "assets" / "kimura-60-minute-initial-treatment.jpg")
logo = data_uri(ROOT / "assets" / "kimura-logo-mark-300.png")


def tspans(lines, x, y, size, weight=700, fill="#fff", line=1.15, anchor="start"):
    out = [f'<text x="{x}" y="{y}" font-size="{size}" font-weight="{weight}" fill="{fill}" text-anchor="{anchor}">']
    for i, text in enumerate(lines):
        dy = 0 if i == 0 else size * line
        out.append(f'<tspan x="{x}" dy="{dy}">{text}</tspan>')
    out.append("</text>")
    return "\n".join(out)


def shell(content, filename):
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920">
  <defs>
    <clipPath id="circleProfile"><circle cx="806" cy="1268" r="150"/></clipPath>
    <clipPath id="photoRound"><rect x="88" y="300" width="904" height="678" rx="34"/></clipPath>
    <linearGradient id="shade" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="{NAVY}"/>
      <stop offset="1" stop-color="{NAVY_DARK}"/>
    </linearGradient>
  </defs>
  <rect width="1080" height="1920" fill="url(#shade)"/>
  <path d="M760 0 H1080 V1920 H922 Z" fill="{ORANGE}" opacity=".96"/>
  <path d="M-150 0 H325 V1920 H-150 Z" fill="{NAVY_DARK}" opacity=".62"/>
  <g opacity=".055" stroke="#fff" stroke-width="3">
    <path d="M-60 360 L1140 560"/><path d="M-60 610 L1140 810"/><path d="M-60 860 L1140 1060"/>
    <path d="M-60 1110 L1140 1310"/><path d="M-60 1360 L1140 1560"/><path d="M-60 1610 L1140 1810"/>
  </g>
  <image href="{logo}" x="72" y="78" width="86" height="86"/>
  <text x="174" y="116" font-size="33" font-weight="800" fill="#fff">KIMURA MASSAGE</text>
  <text x="174" y="154" font-size="25" font-weight="600" fill="{MUTED}">Brampton RMT</text>
  {content}
</svg>'''
    (OUT / filename).write_text(svg)


shell(f'''
  <rect x="74" y="318" width="556" height="76" rx="18" fill="{ORANGE}"/>
  <text x="352" y="368" font-size="34" font-weight="800" fill="#fff" text-anchor="middle">NEW CLIENT INTRO OFFER</text>
  <text x="72" y="592" font-size="190" font-weight="900" fill="#fff">$89</text>
  {tspans(["60-minute RMT", "initial treatment"], 84, 710, 70, 850, "#fff", 1.08)}
  <text x="86" y="910" font-size="40" font-weight="600" fill="{MUTED}">Assessment included. New clients only.</text>
  <circle cx="806" cy="1268" r="160" fill="{NAVY_MID}" stroke="{ORANGE}" stroke-width="8"/>
  <image href="{profile}" x="656" y="1118" width="300" height="300" clip-path="url(#circleProfile)"/>
  <text x="100" y="1310" font-size="48" font-weight="850" fill="#fff">Ricky Arora, RMT</text>
  {tspans(["Deep tissue massage, trigger point work,", "sports recovery, and practical stretches."], 100, 1380, 36, 650, MUTED, 1.28)}
''', "slide-01.svg")

shell(f'''
  {tspans(["Neck tight?", "Back locked up?"], 76, 500, 102, 900, "#fff", 1.23)}
  <text x="76" y="820" font-size="102" font-weight="900" fill="{ORANGE}">Gym soreness?</text>
  {tspans(["Start with a focused RMT assessment", "and treatment plan."], 82, 1045, 50, 760, MUTED, 1.25)}
  <rect x="82" y="1280" width="720" height="138" rx="26" fill="#fff" opacity=".1"/>
  <text x="120" y="1366" font-size="45" font-weight="800" fill="#fff">Built for desk workers + athletes</text>
''', "slide-02.svg")

shell(f'''
  <image href="{treatment}" x="88" y="300" width="904" height="678" preserveAspectRatio="xMidYMid slice" clip-path="url(#photoRound)"/>
  <rect x="88" y="300" width="904" height="678" rx="34" fill="{NAVY_DARK}" opacity=".16"/>
  <text x="88" y="1100" font-size="82" font-weight="900" fill="#fff">What is included</text>
  <g font-size="45" font-weight="750" fill="#fff">
    <circle cx="112" cy="1250" r="14" fill="{ORANGE}"/><text x="148" y="1265">60 minutes of treatment</text>
    <circle cx="112" cy="1350" r="14" fill="{ORANGE}"/><text x="148" y="1365">Deep tissue + trigger points</text>
    <circle cx="112" cy="1450" r="14" fill="{ORANGE}"/><text x="148" y="1465">Cupping if appropriate</text>
    <circle cx="112" cy="1550" r="14" fill="{ORANGE}"/><text x="148" y="1565">Hot towels + stretch advice</text>
  </g>
''', "slide-03.svg")

shell(f'''
  <text x="84" y="575" font-size="112" font-weight="900" fill="#fff">Open daily</text>
  <text x="84" y="720" font-size="106" font-weight="900" fill="{ORANGE}">9AM to 9PM</text>
  {tspans(["14 Block Road,", "Brampton"], 88, 930, 66, 850, "#fff", 1.15)}
  {tspans(["Private treatment space", "with on-site parking."], 92, 1155, 45, 650, MUTED, 1.25)}
''', "slide-04.svg")

shell(f'''
  <text x="80" y="580" font-size="122" font-weight="900" fill="#fff">Book online</text>
  <text x="86" y="705" font-size="48" font-weight="850" fill="{ORANGE}">kimuramassage.noterro.com</text>
  <text x="90" y="930" font-size="64" font-weight="850" fill="#fff">$89 intro appointment</text>
  {tspans(["New clients only.", "Same-day appointments may be available."], 92, 1015, 42, 650, MUTED, 1.28)}
  <rect x="86" y="1290" width="650" height="118" rx="25" fill="{ORANGE}"/>
  <text x="411" y="1366" font-size="56" font-weight="900" fill="#fff" text-anchor="middle">BOOK NOW</text>
''', "slide-05.svg")

print(OUT)
