# 🤖 Expert Chat AI Assistant

An AI-powered tech assistant built with **React (TypeScript)** and **Express.js**, designed to mimic the personalities and teaching styles of two mentors — **Hitesh Choudhary** and **Piyush Garg** — using **persona prompting**.  
Ask them anything tech-related, and get responses in their unique style!

---

## 📌 Features
- 🧠 **Persona Prompting** – AI responds in the style of Hitesh Choudhary or Piyush Garg.
- 💬 **Tech Q&A** – Ask questions about programming, frameworks, tools, and more.
- ⚡ **Real-time Interaction** – Smooth, responsive UI built with React + TypeScript.
- 🌐 **Express.js Backend** – Handles AI API requests securely.
- 🔐 **Environment Variables** – API keys are securely stored.

---

## 🚀 Live Demo
🔗 **Live Link:** [Coming Soon](#)

---

## 🛠️ Tech Stack
**Frontend:** React, TypeScript, TailwindCSS *(or your styling choice)*  
**Backend:** Express.js, Node.js  
**AI Provider:** Google Gemini Pro API *(via OpenAI SDK format)*  
**Others:** dotenv for environment variables

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Natwar2002/Persona-AI.git
cd Persona-AI

# Open integrated terminal with server
npm install
npm start

# Open integrated terminal with client
npm install
npm run dev
```

After Cloning create a .env in root directory of your client and server and put these

### server/.env
AI_API_KEY="your_api_key_here"

### client/.env
VITE_SOCKET_URL="ws://localhost:3000"