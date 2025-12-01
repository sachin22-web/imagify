# Imagify – AI-Powered Image Editing SaaS

Imagify is a full–stack web app that lets users generate and edit images using AI, manage credits, and pay online to top-up their balance.

- 🔐 Email-based authentication
- 🧠 AI image generation & editing (background removal, transformations, etc.)
- 💰 Credit-based usage with transaction history
- 💳 Online payment integration for buying credits
- 📱 Fully responsive UI

---

## 🚀 Live Demo

**Production URL:** https://imagify.satyaka.in  


<img width="1900" height="958" alt="image" src="https://github.com/user-attachments/assets/534a9bf6-f1b5-45fc-8479-7677550074db" />
<img width="1901" height="934" alt="image" src="https://github.com/user-attachments/assets/59aa8f45-ae59-4f79-aed1-c70d8c422270" />
<img width="1888" height="954" alt="image" src="https://github.com/user-attachments/assets/dd4966ca-4726-479a-8542-0a01ab31a6d2" />
<img width="1850" height="898" alt="image" src="https://github.com/user-attachments/assets/43320818-06ba-4468-973b-3833dcfb456a" />
---

## 🏗️ Project Structure

Monorepo with separate frontend and backend:

```bash
imagify/
├── client/   # React + Vite + Tailwind frontend
└── server/   # Node.js + Express + MongoDB backend
🧰 Tech Stack
Frontend

React

Vite

Tailwind CSS

Axios

Razorpay Checkout (browser SDK)

Backend

Node.js

Express

MongoDB (Mongoose)

JWT for authentication

Razorpay (server SDK)

External AI image API (e.g. ClipDrop or similar)

🔐 Environment Variables
⚠️ Example values only – do NOT commit real secrets.




server/.env
env
Copy code
PORT=4000

MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<db-name>
JWT_SECRET=some-strong-secret-key

# AI image API
CLIPDROP_API=<your-ai-image-api-key>

# Payments
RAZORPAY_KEY_ID=<your-razorpay-key-id>
RAZORPAY_KEY_SECRET=<your-razorpay-key-secret>
CURRENCY=INR
client/.env
For local development:

env
Copy code
VITE_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=<your-razorpay-key-id>
For production build (server + client on same domain):

env
Copy code
VITE_BACKEND_URL=https://imagify.satyaka.in
VITE_RAZORPAY_KEY_ID=<your-razorpay-key-id>
⚙️ Setup & Installation
Clone the project and install dependencies for both backend and frontend.


bash
Copy code
# go to project root
cd imagify
1. Backend (server)
bash
Copy code
cd server
npm install
Make sure server/.env is configured (see above), then:

Development (with auto-reload if script exists):

bash
Copy code
npm run dev     # or: npm run server
Direct run:

bash
Copy code
node server.js
By default the API will run on: http://localhost:4000.

2. Frontend (client)
bash
Copy code
cd ../client
npm install
Ensure client/.env has VITE_BACKEND_URL pointing to your backend.

Development:


bash
Copy code
npm run dev
This starts Vite dev server (usually on http://localhost:5173).

🛠️ Build & Production
Frontend build
bash
Copy code
cd client
npm run build
This generates a production build in client/dist.

Serving frontend + backend together (example Nginx setup)
On production, the typical setup is:

Backend Node server running on http://127.0.0.1:4000

Nginx serving React build from client/dist

All /api/* routes proxy to the Node backend

Example Nginx snippet:

nginx
Copy code
server {
    listen 80;
    listen 443 ssl http2;
    server_name imagify.satyaka.in;

    root /www/wwwroot/imagify.satyaka.in/client/dist;
    index index.html;

    # Frontend (React SPA)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API (Node backend)
    location /api/ {
        proxy_pass http://127.0.0.1:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
On the server, you can keep the backend alive using a process manager like PM2:

bash
Copy code
cd /www/wwwroot/imagify.satyaka.in/server
pm2 start server.js --name imagify-server
pm2 save
👤 Authentication & Credits (High-Level Flow)
User signs up / logs in using email & password.

On successful login, backend returns a JWT which is stored on the client.

Each AI image action consumes credits from the user’s wallet.

When credits are low, the user can purchase more via Razorpay payment.

After successful payment, backend updates the user’s credit balance and logs the transaction.

📦 Scripts Summary
Server (server/package.json)

bash
Copy code
npm run dev      # (optional) dev server with nodemon, if configured
npm start        # or: node server.js
Client (client/package.json)

bash
Copy code
npm run dev      # start Vite dev server
npm run build    # build production bundle
npm run preview  # preview production build locally
📄 License
This project is proprietary. All rights reserved.
Do not distribute or use commercially without permission from the owner.
