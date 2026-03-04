<div align="center">

<!-- Animated Banner -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text=CareerCompass&fontSize=70&fontColor=fff&animation=twinkling&fontAlignY=35&desc=AI-Driven%20Career%20Growth%20%26%20Placement%20Intelligence&descAlignY=60&descSize=18" width="100%"/>

<!-- Badges Row 1 -->
<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black"/>
</p>

<!-- Badges Row 2 -->
<p align="center">
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"/>
  <img src="https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white"/>
</p>

<!-- Status Badges -->
<p align="center">
  <img src="https://img.shields.io/github/stars/yourusername/career-compass?style=social"/>
  <img src="https://img.shields.io/github/forks/yourusername/career-compass?style=social"/>
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square"/>
  <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square"/>
</p>

<br/>

> ### 🧭 *"Measure. Understand. Improve. Get Placed."*
> A full-stack career intelligence platform that helps students analyze skills, track placement readiness, and grow systematically using AI-driven insights.

<br/>

</div>

---

## 📌 Table of Contents

<details>
<summary><b>Click to expand</b></summary>

- [🌟 Vision](#-vision)
- [✨ Key Features](#-key-features)
- [🧩 System Architecture](#-system-architecture)
- [🧠 Skill Evaluation Model](#-skill-evaluation-model)
- [🛠 Tech Stack](#-tech-stack)
- [📊 Platform Modules](#-platform-modules)
- [👨‍💼 Multi-Role System](#-multi-role-system)
- [🔐 Security Architecture](#-security-architecture)
- [📂 Project Structure](#-project-structure)
- [⚙️ Installation](#-installation)
- [🌍 Deployment](#-deployment)
- [🚀 Future Enhancements](#-future-enhancements)
- [👨‍💻 Author](#-author)

</details>

---

## 🌟 Vision

<div align="center">
<table>
<tr>
<td align="center" width="33%">
<img src="https://img.icons8.com/fluency/60/artificial-intelligence.png"/><br/>
<b>AI-Powered Insights</b><br/>
<sub>Smart career recommendations tailored to each student</sub>
</td>
<td align="center" width="33%">
<img src="https://img.icons8.com/fluency/60/combo-chart.png"/><br/>
<b>Data-Driven Analytics</b><br/>
<sub>Visual skill breakdowns and readiness scoring</sub>
</td>
<td align="center" width="33%">
<img src="https://img.icons8.com/fluency/60/goal.png"/><br/>
<b>Placement Focused</b><br/>
<sub>Structured guidance toward real placement success</sub>
</td>
</tr>
</table>
</div>

CareerCompass is built to help students **measure, understand, and improve** their placement readiness using intelligent analytics and structured career guidance — all in one platform.

---

## ✨ Key Features

<div align="center">

| Feature | Description |
|:---|:---|
| 📊 **Career Readiness Score** | Composite score based on DSA, CS fundamentals, projects & resume |
| 📈 **Skill Visualization Dashboard** | Radar charts, bar charts, and performance comparison graphs |
| 🧠 **Intelligent Gap Analysis** | Highlights exactly what to study and which skills need improvement |
| 🎯 **Personalized Improvement Path** | Step-by-step guidance tailored to each student's profile |
| 🧪 **Technical Test System** | In-platform tests to assess and track skill growth |
| 👥 **Multi-Role Platform** | Separate dashboards for Students, Mentors, TPO & Admin |
| 🔐 **Secure Auth System** | Firebase ID token + JWT with role-based access control |

</div>

---

## 🧩 System Architecture

```mermaid
flowchart TD
    A["🖥️ Client — Next.js Frontend"] --> B["⚙️ API Layer — Express.js Backend"]
    A --> C["🔑 Authentication — Firebase"]
    B --> D["🧠 Business Logic Layer"]
    D --> E["🗄️ MongoDB Database"]
    C --> B

    style A fill:#0f172a,color:#38bdf8,stroke:#38bdf8
    style B fill:#0f172a,color:#a78bfa,stroke:#a78bfa
    style C fill:#0f172a,color:#fb923c,stroke:#fb923c
    style D fill:#0f172a,color:#34d399,stroke:#34d399
    style E fill:#0f172a,color:#f472b6,stroke:#f472b6
```

---

## 🧠 Skill Evaluation Model

CareerCompass calculates a **holistic Placement Readiness Score** using four core pillars:

```
┌─────────────────────────────────────────────────────────────┐
│              🎯  PLACEMENT READINESS SCORE                  │
├──────────────────┬──────────────────┬───────────────────────┤
│  📐 DSA Skills   │  🖥️ Core CS      │  🗂️ Projects          │
│  Algorithms &    │  OS, DBMS,       │  Complexity,          │
│  Data Structures │  Networks, OOP   │  Stack, Impact        │
├──────────────────┴──────────────────┴───────────────────────┤
│                    📄 Resume Quality                        │
│           Formatting · Keywords · Completeness              │
└─────────────────────────────────────────────────────────────┘
```

Each component contributes a weighted score toward the **overall readiness percentage** shown on the dashboard.

---

## 🛠 Tech Stack

<div align="center">

### 🖥️ Frontend
![Next.js](https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=nextdotjs)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)

### ⚙️ Backend
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

### 🗄️ Database & Auth
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

### 🔧 Dev Tools
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

</div>

---

## 📊 Platform Modules

<details>
<summary><b>🎓 Student Dashboard</b></summary>

- 📊 Real-time skill analytics with visual charts
- 🎯 Placement readiness score with breakdown
- 📝 Personalized improvement suggestions
- 📈 Performance tracking over time

</details>

<details>
<summary><b>🧪 Test System</b></summary>

- ✅ Attempt technical assessments in-platform
- 📉 Post-test performance analysis
- 📊 Skill growth tracking across attempts
- 🔁 Retry tests to monitor improvement

</details>

<details>
<summary><b>👨‍🏫 Mentor Dashboard</b></summary>

- 👀 Review assigned student progress
- 🎯 Identify individual skill gaps
- 💬 Provide structured guidance and feedback
- 📊 Cohort-level analytics

</details>

<details>
<summary><b>🛡️ Admin Panel</b></summary>

- 👥 User management (create, suspend, delete)
- ✅ Approve Mentor / TPO role requests
- 🔧 Control platform-wide operations
- 📊 Platform usage analytics

</details>

---

## 👨‍💼 Multi-Role System

<div align="center">

```
╔══════════════╦═══════════════════════════════════════════════════════╗
║    Role      ║  Capabilities                                         ║
╠══════════════╬═══════════════════════════════════════════════════════╣
║ 🎓 Student   ║  Track skills · Attempt tests · View insights        ║
║ 👨‍🏫 Mentor   ║  Guide students · Analyze performance                ║
║ 🏢 TPO       ║  Monitor placement readiness · Batch analytics       ║
║ 🛡️ Admin     ║  Manage users · Approve roles · Platform control     ║
╚══════════════╩═══════════════════════════════════════════════════════╝
```

</div>

---

## 🔐 Security Architecture

```
🔒 Security Layers
├── 🔑 Firebase ID Token Verification    (Identity Layer)
├── 🪙 JWT Session Tokens               (Session Layer)
├── 🛡️ Role-Based Access Control (RBAC) (Authorization Layer)
└── 🚧 Protected API Routes             (Route Guard Layer)
```

---

## 📂 Project Structure

```
career-compass/
│
├── 📁 client/                   # Next.js Frontend
│   ├── 📁 app/                  # App router pages
│   ├── 📁 components/           # Reusable UI components
│   ├── 📁 hooks/                # Custom React hooks
│   └── 📁 lib/                  # Utilities & helpers
│
└── 📁 server/                   # Express.js Backend
    ├── 📁 controllers/          # Route handler logic
    ├── 📁 models/               # Mongoose data models
    ├── 📁 routes/               # API route definitions
    ├── 📁 middleware/           # Auth & validation middleware
    └── 📁 config/               # Environment configuration
```

---

## ⚙️ Installation

### Prerequisites
- Node.js `v18+`
- MongoDB (local or Atlas)
- Firebase project configured

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/career-compass.git
cd career-compass
```

### 2️⃣ Install Dependencies

```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

### 3️⃣ Configure Environment Variables

```bash
# server/.env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FIREBASE_PROJECT_ID=your_firebase_project_id

# client/.env.local
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 4️⃣ Run the Application

```bash
# Start Backend (from /server)
npm run dev

# Start Frontend (from /client)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser 🚀

---

## 🌍 Deployment

<div align="center">

| Layer | Platform | Status |
|:---:|:---:|:---:|
| 🖥️ Frontend | **Vercel** | ![Live](https://img.shields.io/badge/Live-brightgreen?style=flat-square) |
| ⚙️ Backend | **Render** | ![Live](https://img.shields.io/badge/Live-brightgreen?style=flat-square) |
| 🗄️ Database | **MongoDB Atlas** | ![Live](https://img.shields.io/badge/Live-brightgreen?style=flat-square) |

</div>

---

## 🚀 Future Enhancements

```
🔮 Coming Soon
│
├── 🤖 AI-Powered Career Path Recommendations
├── 📄 Resume AI Analysis & Feedback Engine
├── 💻 Integrated Coding Practice Module
├── 🎤 AI Interview Simulation
└── 📚 Personalized Interview Preparation Roadmaps
```

---

## 👨‍💻 Author

<div align="center">

<img src="https://avatars.githubusercontent.com/yourusername" width="100px" style="border-radius:50%"/>

### **Kannu**
*B.Tech Computer Science (AI)*

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github)](https://github.com/yourusername)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/yourusername)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white)](https://yourportfolio.com)

> *Full Stack Developer · AI Enthusiast · Building tools that help students succeed*

</div>

---

## ⭐ Support the Project

<div align="center">

If **CareerCompass** helped you or you found it interesting:

[![Star](https://img.shields.io/badge/⭐%20Star%20this%20repo-yellow?style=for-the-badge)](https://github.com/yourusername/career-compass)
[![Fork](https://img.shields.io/badge/🍴%20Fork%20it-orange?style=for-the-badge)](https://github.com/yourusername/career-compass/fork)
[![Share](https://img.shields.io/badge/📢%20Share%20it-blue?style=for-the-badge)](https://twitter.com/intent/tweet?text=Check%20out%20CareerCompass%20-%20an%20AI-powered%20career%20placement%20platform!&url=https://github.com/yourusername/career-compass)

</div>

---

<div align="center">

### 💡 Project Mission

> *CareerCompass aims to become the most comprehensive career intelligence system —*
> *helping students **prepare smarter**, **improve faster**, and **succeed** in technical careers.*

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=100&section=footer" width="100%"/>

**Made with ❤️ by Kannu**

</div>
