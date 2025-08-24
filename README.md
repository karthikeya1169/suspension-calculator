🚗 #Suspension Calculator Pro
An advanced suspension dynamics calculator for ATVs and vehicles, built with React (Vite + Tailwind) frontend and a backend (Node/Express or Python) for calculations.

This tool helps engineers and students analyze ride frequency, damping, roll compliance, bump compliance, and weight transfer, with color-coded performance summaries and exportable engineering reports.

📌 Features
🎨 Professional UI – Clean, engineering-grade dashboard (light/dark mode).

📊 Suspension Metrics – Natural frequencies, spring rates, damping ratios, roll stiffness, weight transfer.

🟢🟠🔴 Color Grading – Highlights safe, borderline, or dangerous values.

❓ Help Tooltips – Definitions and safe ranges for each metric.

📑 Report Export – Generate Word/PDF reports in clean engineering style.

⚖️ Comparison Mode – Compare two suspension setups side by side.

🛠️ Tech Stack
Frontend: React + Vite + TypeScript + TailwindCSS

Backend: Node.js/Express (or Python FastAPI if configured)

Deployment: Netlify/Vercel (frontend), Render/Heroku (backend)

📂 Project Structure
bash
Copy
Edit
project-root/
│── client/          # React frontend
│── server/          # Backend (API & calculations)
│── shared/          # Shared code (constants, utils)
│── package.json     # Dependencies
│── vite.config.ts   # Vite config for frontend
│── tailwind.config.ts
│── .gitignore
🚀 Getting Started
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/yourusername/suspension-calculator.git
cd suspension-calculator
2. Install Dependencies
For frontend & backend:

bash
Copy
Edit
# Install root dependencies
npm install

# Go to frontend
cd client
npm install

# Go to backend
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

Backend → http://localhost:5000/ (or whichever port you set)

🌍 Deployment
Frontend
Netlify or Vercel:

Go to Netlify or Vercel.

Connect GitHub repo or drag client/dist folder.

It will auto-deploy.

Backend
Render (recommended):

Push code to GitHub.

Create new Web Service in Render.

Point to server/.

Set Start Command → npm start.

📊 Example Outputs
Ride Quality Score: 7.2/10 (Good)

Handling Balance: Neutral

Roll Compliance: Excellent

Bump Compliance: Fair (Needs Softer Damping)

🤝 Contributing
Pull requests are welcome! For major changes, open an issue first to discuss what you’d like to change.

📜 License
MIT License – free to use, modify, and share.


