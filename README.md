# Business Chatbot Demo
A production-style chatbot built with **Next.js, Tailwind and OpenAI**.  
Demonstrates how AI chatbots can adapt to different business needs.

- Customer Support  
- Sales Assistant  
- Booking Assistant  
- Tech Support  

## 🚀 Features
- Clean chat UI with bubbles and input  
- Mode selector to switch chatbot role  
- Live connection to OpenAI API  
- Responsive design (desktop & mobile)  

## 🔧 Tech Stack
- **Framework:** Next.js 15 (App Router)  
- **UI:** Tailwind CSS 
- **AI:** OpenAI GPT 
- **Language:** TypeScript  

## 📂 Project Structure
src/app/page.tsx -> Landing page
src/app/chat/page.tsx -> Main chatbot UI
src/app/api/chat/route.ts -> API route that talks to OpenAI


## 🛠 Setup

# 1. Clone the repo
git clone https://github.com/hetxtd/business-chatbot-demo.git
cd business-chatbot-demo

# 2. Install dependencies
npm install

# 3. Add your OpenAI API key to .env.local
echo "OPENAI_API_KEY=your_key_here" > .env.local

# 4. Run the dev server
npm run dev
The app will be available at http://localhost:3000 (or next free port).

📸 Screenshot


👤 Author
Chatbot demo by Nasir Adewolu
Open to collaborations, freelance projects, and roles in AI Engineering / Data / Digital Analytics.