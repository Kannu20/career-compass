AI-Driven Career Growth & Placement Intelligence Platform
<p align="center">

CareerCompass is a modern full-stack career intelligence platform designed to help students analyze their technical skills, track their placement readiness, and improve systematically using data-driven insights.
</p>



The system combines skill analytics, testing systems, and AI-driven recommendations to guide students toward stronger placement outcomes.

🌟 Core Vision

Help students measure, understand, and improve their placement readiness using intelligent analytics and structured career guidance.

✨ Key Features
📊 Career Readiness Analytics

Students receive a placement readiness score based on multiple factors:

Data Structures & Algorithms

Core Computer Science Concepts

Project Strength

Resume Quality

This gives a clear understanding of career preparedness.

📈 Skill Visualization Dashboard

CareerCompass provides interactive analytics:

Radar charts for skill distribution

Bar charts for performance comparison

Overall readiness score

Personalized improvement suggestions

🧠 Intelligent Career Guidance

The platform highlights skill gaps and improvement areas so students know exactly:

What to study

Which skills to improve

How close they are to placements

👨‍💼 Multi-Role System

CareerCompass supports multiple roles:

Role	Capabilities
Student	Track skills, attempt tests, view insights
Mentor	Guide students and analyze performance
TPO	Monitor placement readiness
Admin	Manage users and platform operations
🧩 System Architecture
flowchart TD

A[Client - Next.js Frontend]
B[API Layer - Express.js Backend]
C[Authentication - Firebase]
D[Business Logic Layer]
E[MongoDB Database]

A --> B
A --> C
B --> D
D --> E
C --> B

High Level Architecture
Application Architecture
Backend Architecture
🧠 Skill Evaluation Model

CareerCompass calculates readiness using:

Each component contributes to the overall readiness score.

🛠 Tech Stack
Frontend

Next.js

React

TypeScript

TailwindCSS

Framer Motion

Chart.js / Recharts

Backend

Node.js

Express.js

REST API Architecture

TypeScript

Database

MongoDB

Mongoose ODM

Authentication

Firebase Authentication

JWT Session Tokens

Dev Tools

Git & GitHub

Postman

ESLint

Prettier

📊 Platform Modules
Student Dashboard

Features:

Skill analytics

Performance tracking

Readiness score

Improvement suggestions

Test System

Allows students to:

Attempt technical tests

Analyze performance

Track skill growth

Mentor Dashboard

Mentors can:

Review student progress

Provide guidance

Identify skill gaps

Admin Panel

Admin capabilities:

Manage users

Approve mentor/TPO roles

Control platform operations

🔐 Security Architecture

CareerCompass includes multiple security layers:

Firebase ID token verification

JWT authentication

Role-based access control

Protected API routes

📂 Project Structure
career-compass
│
├── client
│   ├── app
│   ├── components
│   ├── hooks
│   └── lib
│
├── server
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   └── config
⚙️ Installation

Clone repository

git clone https://github.com/yourusername/career-compass.git
cd career-compass

Install dependencies

Frontend:

cd client
npm install

Backend:

cd server
npm install

Run backend

npm run dev

Run frontend

npm run dev
🌍 Deployment

CareerCompass is deployed using:

Frontend → Vercel

Backend → Render

🚀 Future Enhancements

Planned improvements:

AI-powered career recommendations

Resume AI analysis

Coding practice integration

Interview preparation modules

AI interview simulation

👨‍💻 Author

Kannu

B.Tech Computer Science (AI)

Full Stack Developer | AI Enthusiast

⭐ Support

If you like this project:

⭐ Star the repository
🍴 Fork the project
📢 Share with others

💡 Project Mission

CareerCompass aims to become a comprehensive career intelligence system that helps students prepare smarter, improve faster, and succeed in technical careers.
