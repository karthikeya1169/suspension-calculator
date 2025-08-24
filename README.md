# 🚗 Suspension Calculator Pro  

An advanced **suspension dynamics calculator** for ATVs and vehicles, built with **React (Vite + TailwindCSS + TypeScript)** frontend and a **Node.js/Express backend** for vehicle dynamics calculations.  

This tool helps engineers and students analyze **ride frequency, damping, roll compliance, bump compliance, and weight transfer**, with **color-coded performance summaries** and **exportable engineering reports**.  

---

## 📌 Features
- 🎨 **Premium UI** – Professional, engineering-grade dashboard with light/dark mode  
- 📊 **Suspension Metrics** – Natural frequencies, spring rates, damping ratios, roll stiffness, weight transfer  
- 🟢🟠🔴 **Color Grading** – Highlights safe, borderline, or dangerous values  
- ❓ **Help Tooltips** – Built-in definitions and safe ranges for each parameter  
- 📑 **Report Export** – Generate Word/PDF reports in clean engineering style  
- ⚖️ **Comparison Mode** – Compare two suspension setups side by side  

---

## 📂 Project Structure
SuspensionCalc/
│── client/ # React + Vite frontend
│── server/ # Node.js backend (API + calculations)
│── shared/ # Shared code (constants, utils)
│── package.json # Root dependencies
│── vite.config.ts # Vite config for frontend
│── tailwind.config.ts
│── tsconfig.json
│── .gitignore

yaml
Copy
Edit

---

## 🛠️ Tech Stack
- **Frontend**: React + Vite + TailwindCSS + TypeScript  
- **Backend**: Node.js + Express  
- **Deployment**: Netlify/Vercel (frontend) + Render/Heroku (backend)  

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/karthikeya1169/suspension-calculator.git
cd suspension-calculator/SuspensionCalc
2. Install Dependencies
Install dependencies for both frontend and backend:

bash
Copy
Edit
# Install root dependencies
npm install

# Install frontend
cd client
npm install

# Install backend
cd ../server
npm install
3. Run Locally
Start backend:

bash
Copy
Edit
cd server
npm run dev   # or npm start
Start frontend:

bash
Copy
Edit
cd client
npm run dev
Frontend → http://localhost:5173/ (default Vite port)

Backend → http://localhost:5000/ (default Express port)

🌍 Deployment
Frontend
Deploy the React frontend (client/) to Netlify or Vercel:

bash
Copy
Edit
cd client
npm run build
Upload the generated dist/ folder to Netlify/Vercel.

Backend
Deploy the backend (server/) to Render or Heroku:

Create a new Web Service

Connect your GitHub repo

Build Command: npm install

Start Command: npm start

📊 Example Outputs
Ride Quality Score: 7.2/10 (Good)

Handling Balance: Neutral

Roll Compliance: Excellent

Bump Compliance: Fair (Needs Softer Damping)

📸 Screenshots
(Add screenshots here to showcase the UI and results dashboard)

🤝 Contributing
Pull requests are welcome! For major changes, open an issue first to discuss what you’d like to change.

📜 License
MIT License – free to use, modify, and share.

pgsql
Copy
Edit

---

👉 This README is tailored to your repo’s structure (`SuspensionCalc/` with `client/` and `server/` folders).  
You can copy-paste it directly into your **GitHub `README.md`** file, and it will look clean and professional.  

Would you like me to also **add build badges (Netlify/Render deploy status, Node version, etc.)** to make the README look even more polished for GitHub?







Ask ChatGPT

