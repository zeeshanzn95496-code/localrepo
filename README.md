# 🌟 Mercedes-Benz | 140 Years of Excellence (1886 – 2026)

A luxury automotive web experience celebrating **140 Years of Mercedes-Benz Heritage, Innovation, and Performance**. Built with bespoke modern web technologies, responsive layouts, dedicated model dossiers, an extensive historical archive, and a cinematic Dark/Light mode toggle.

---

## 📸 Overview

This project is a tribute and digital showcase for **Mercedes-Benz**, highlighting iconic AMG, Maybach, EQ, and luxury class vehicles alongside an archival timeline spanning from Carl Benz's 1886 Patent-Motorwagen to the electric and autonomous mobility of 2026.

---

## ✨ Key Features

### 🏎️ 1. Interactive Models Showcase
- **Curated Vehicle Lineup**: Explore dedicated showcase cards with smooth hover animations and direct links to comprehensive specification dossiers:
  - **Mercedes-Benz GLC 43 AMG** – Sporty Performance Meets Everyday Luxury
  - **Mercedes-Benz S-Class** – The Benchmark of Automotive Excellence
  - **Mercedes-Benz GLS 450d** – The S-Class Among Luxury SUVs
  - **Mercedes-AMG C 63 S E-Performance** – High-Performance Hybrid Engineering
  - **Mercedes-AMG CLS 63** – Elegance, Power, and Timeless Design
  - **Mercedes-Benz CLA Sedan** – Avant-Garde Coupé Silhouette and Agility
- **Deep-Dive Specification Pages**: Each vehicle features:
  - Key performance badges (Horsepower, 0–100 km/h, Top Speed)
  - Detailed engine and powertrain breakdown
  - Interactive exterior paint swatches (Obsidian Black, Polar White, Selenite Grey, etc.)
  - Equipment & optional package list (Burmester® 3D Sound, AMG Ride Control, Head-Up Display)
  - Tabbed exterior/interior gallery preview

### 📜 2. 140-Year Historical Archive (`about.html`)
- An in-depth chronological journey covering **28 eras in 5-year increments (1886 to 2026)**.
- Features authentic historical photography for every era, tracking:
  - The invention of the automobile & Bertha Benz's historic long-distance journey
  - The birth of the 1901 Mercedes 35 PS and the three-pointed star
  - The legendary 1930s & 1950s Silver Arrows racing dominance
  - The 300 SL "Gullwing" and pioneering crumple zone safety innovations
  - Modern breakthroughs: ABS, airbags, AMG merger, MBUX Hyperscreen, and Concept EQXX

### 🌓 3. Cinematic Dark / Light Theme Engine (`theme.js`)
- **Native View Transitions API**: Circular ripple / reveal effect that expands smoothly from the user's click position on supported browsers (Chrome, Edge, Safari 18+).
- **Radial Sweep Fallback**: Elegant CSS animation overlay for browsers without native View Transitions support.
- **Persistent Preferences**: Saves selection in `localStorage` (`mb_theme_preference`) and syncs in real-time across open browser tabs.
- **Zero Flash of Unstyled Content (FOUC)**: Early-executing script loads prior to DOM rendering to ensure seamless aesthetics.

### 🎥 4. Media & Video Experience
- Hero video showcase featuring the **Mercedes-Maybach SL 680**.
- Rotating SVG 3-pointed star brand icon in the navigation bar.
- MBUX Hyperscreen feature highlight section.

### 📝 5. VIP Test Drive Request
- Customized luxury consultation & test-drive booking form.
- Organized selection dropdown covering:
  - Sedans (A, C, E, S, CLA)
  - SUVs (GLA, GLB, GLC, GLE, GLS, Maybach, G-Class)
  - Coupes & Roadsters (CLE, SL, SLC)
  - AMG Performance Lineup (A 45 S, C 63 S, E 53, GT 63 S, G 63)
  - Mercedes-EQ All-Electric Range (EQA, EQB, EQE, EQS)
  - Ultra-Luxury Maybach Series (S 680, GLS 600)

---

## 🛠️ Tech Stack

- **HTML5**: Semantic markup, accessible attributes, and responsive video embeds.
- **CSS3 / Modular Stylesheets**:
  - `style.css`: Core design system, luxury typography (`Cinzel` & `Montserrat`), animations, and global dark/light CSS variables.
  - `model.css`: Clean grid rules, card hover states, color swatches, and vehicle specs layouts.
  - `about.css`: Dedicated full-width timeline and historical era cards.
- **JavaScript (Vanilla ES6+)**:
  - `theme.js`: View Transitions API controller, localStorage sync, and dynamic theme icons.
- **Bootstrap 5.3.3**: Responsive navigation collapse, mobile drawer, and layout utilities.
- **Google Fonts**:
  - `Cinzel` (Editorial luxury serif)
  - `Montserrat` (Clean geometric modern sans-serif)

---

## 📂 Project Structure

```plaintext
mercedes/
├── index.html                   # Homepage (Hero, Maybach Video, MBUX, VIP Form)
├── models.html                  # Performance & Luxury Lineup Grid
├── about.html                   # 140 Years of History (1886-2026 Archive)
├── amg-c63-details.html         # Mercedes-AMG C 63 S E-Performance Details
├── cla-sedan-details.html       # Mercedes-Benz CLA Sedan Details
├── cls63-details.html           # Mercedes-AMG CLS 63 Details
├── glc43-details.html           # Mercedes-Benz GLC 43 AMG Details
├── gls450d-details.html         # Mercedes-Benz GLS 450d Details
├── s-class-details.html         # Mercedes-Benz S-Class Details
├── style.css                    # Global Theme, Typography, Base Layouts
├── model.css                    # Vehicle Showcase & Details Stylesheet
├── about.css                    # Historical Timeline & Era Cards Stylesheet
├── theme.js                     # Cinematic Dark/Light Theme Controller
├── images/
│   └── history/                 # 28 Era Photos from 1886 to 2026
├── img/                         # Vehicle Models Photography & Web Assets
└── *.mp4                        # Maybach SL 680 Showcase Video Clips
```

---

## 🚀 Getting Started

Since this is a client-side static web application, no compilation or backend server is strictly required.

### Option 1: Direct File Launch
Simply double-click `index.html` or open it with any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Apple Safari).

### Option 2: Local HTTP Server (Recommended)
Running through a local web server allows all videos, local fonts, and modern JavaScript APIs (like the View Transitions API) to run optimally.

#### Using VS Code Live Server:
1. Open the project folder in VS Code.
2. Right-click `index.html` and click **"Open with Live Server"**.

#### Using Python:
```bash
# In the project root directory:
python -m http.server 8000
```
Then navigate to `http://localhost:8000` in your browser.

#### Using Node.js (`npx serve`):
```bash
npx serve .
```

---

## 🌐 Browser Compatibility

| Browser | Supported | Features |
| :--- | :---: | :--- |
| **Google Chrome / Chromium** | ✅ Yes | Full support (including circular View Transitions API) |
| **Microsoft Edge** | ✅ Yes | Full support (including circular View Transitions API) |
| **Apple Safari (18+)** | ✅ Yes | Full support (including View Transitions) |
| **Mozilla Firefox** | ✅ Yes | Full support (with smooth radial sweep theme fallback) |
| **Mobile Browsers (iOS / Android)** | ✅ Yes | Responsive navigation drawer, touch-friendly grids |

---

## 👤 Author & Credits

- **Project Lead / Developer**: [Zeeshan](https://github.com/zeeshanzn95496-code)
- **Year**: 2026
- **Brand Imagery & Trademarks**: Mercedes-Benz, AMG, and Maybach logos and assets belong to Mercedes-Benz Group AG. Used strictly for educational and portfolio demonstration purposes.

---

> *"The Best or Nothing."* — Gottlieb Daimler
