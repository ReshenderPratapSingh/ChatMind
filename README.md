# ChatMind — Minimal Full-Stack Deployment Skeleton

A minimal full-stack skeleton designed to validate deployment pipelines before building application features:
- **Backend**: Node.js + Express + Mongoose
- **Database**: MongoDB Atlas (M0 Free Tier)
- **Frontend**: React + Vite
- **Deployment Targets**: Backend → [Render](https://render.com), Frontend → [Vercel](https://vercel.com)

---

## Project Structure

```text
project-root/
├── server/
│   ├── models/
│   │   └── Ping.js        # Mongoose schema: { message: String, createdAt: Date }
│   ├── routes/
│   │   └── health.js      # GET /api/health and GET /api/test-db
│   ├── server.js          # Express app, CORS, mongoose.connect, /api mount
│   ├── .env.example       # Example server env configuration
│   ├── .env               # Local server variables (gitignored)
│   └── package.json
├── client/
│   ├── src/
│   │   ├── App.jsx        # Single-page testing UI with health and DB checks
│   │   ├── index.css      # Design system styling
│   │   └── main.jsx       # Vite React entrypoint
│   ├── .env.example       # Example client env configuration
│   ├── .env               # Local client variables (gitignored)
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── .gitignore             # Ignores .env files, node_modules, and dist
└── README.md              # Deployment and troubleshooting guide
```

---

## Quick Start (Local Development)

### 1. Backend Setup
1. Navigate to `server/`:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Set your MongoDB Atlas connection string in `server/.env`:
   ```env
   PORT=5001
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/ChatMind?retryWrites=true&w=majority
   ```
   > **Note**: Ensure `/ChatMind` is included right before the `?` so Mongoose writes to your intended database instead of defaulting to `test`.
5. Start the backend:
   ```bash
   npm run dev
   # or npm start
   ```
6. Verify locally in another terminal:
   ```bash
   curl -i http://localhost:5001/api/health
   curl -i http://localhost:5001/api/test-db
   ```

### 2. Frontend Setup
1. Navigate to `client/`:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Ensure `client/.env` points to the local backend:
   ```env
   VITE_API_URL=http://localhost:5001
   ```
4. Start the frontend:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:5173` in your browser.

---

## Deployment Guide

### Step 1: MongoDB Atlas Setup (Free M0 Cluster)

1. **Sign in / Create Account**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign in.
2. **Create a Free Cluster**:
   - Click **Create** / **Build a Database**.
   - Choose the **M0 Free** shared tier.
   - Select your preferred cloud provider and region close to your users (e.g., AWS / Frankfurt or Mumbai or N. Virginia).
   - Click **Create Deployment**.
3. **Configure Database User Credentials**:
   - Go to **Security** → **Database Access**.
   - Click **Add New Database User**.
   - Choose **Password** authentication.
   - Enter a username (e.g., `chatmind_admin`) and a strong password. Note these credentials.
   - Assign user privileges: **Read and write to any database**.
   - Click **Add User**.
4. **Configure Network Access (IP Whitelist)**:
   - Go to **Security** → **Network Access**.
   - Click **Add IP Address**.
   - Click **Allow Access from Anywhere** (adds `0.0.0.0/0`).
   - Click **Confirm**. *(Required because cloud hosts like Render use dynamic outgoing IPs).*
5. **Get Connection String**:
   - Go to **Deployments** → **Database**.
   - Click **Connect** next to your cluster.
   - Select **Drivers** (Node.js).
   - Copy the SRV connection URI:
     ```text
     mongodb+srv://<username>:<password>@<cluster-address>.mongodb.net/?retryWrites=true&w=majority
     ```
   - **Crucial step**: Replace `<password>` with your database password (ensure special characters are URL-encoded) and append `/ChatMind` before the query parameter `?`:
     ```text
     mongodb+srv://chatmind_admin:mypassword@cluster0.abcde.mongodb.net/ChatMind?retryWrites=true&w=majority
     ```

---

### Step 2: Render Backend Deployment (`server/`)

1. **Push Code to GitHub**:
   - Ensure your repository is committed and pushed to GitHub (verify `.env` is **NOT** committed).
2. **Create Render Web Service**:
   - Sign in to [Render](https://render.com).
   - Click **New +** → **Web Service**.
   - Connect your GitHub repository.
3. **Configure Web Service Settings**:
   - **Name**: `chatmind-server` (or your choice).
   - **Region**: Select a region close to your database.
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: `Free`
4. **Set Environment Variables in Render**:
   - Scroll down to the **Environment Variables** section.
   - Add key-value pairs:
     - `MONGO_URI`: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/ChatMind?retryWrites=true&w=majority`
     - *(Optional)* `PORT`: Leave default or set `5001`. Render automatically injects `PORT=10000` which `server.js` reads via `process.env.PORT`.
5. **Deploy**:
   - Click **Create Web Service**.
   - Monitor the build and deploy logs. When finished, you will see:
     ```text
     ==> Your service is live 🎉
     🚀 Server running on port 10000
     ✅ MongoDB connected successfully to Atlas!
     ```
6. **Note Public URL**:
   - Copy your service URL from the top of the Render dashboard (e.g., `https://chatmind-server.onrender.com`).
   - Test in your browser: `https://chatmind-server.onrender.com/api/health`.

---

### Step 3: Vercel Frontend Deployment (`client/`)

1. **Sign in to Vercel**:
   - Go to [Vercel](https://vercel.com) and log in with GitHub.
2. **Import Project**:
   - Click **Add New...** → **Project**.
   - Select your `ChatMind` GitHub repository.
3. **Configure Build & Project Settings**:
   - **Project Name**: `chatmind-client`
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click **Edit** and choose `client`.
   - **Build Command**: `npm run build` (or leave default Vite detected).
   - **Output Directory**: `dist` (Vite default).
4. **Set Environment Variables**:
   - Expand the **Environment Variables** section.
   - Add:
     - **Key**: `VITE_API_URL`
     - **Value**: Your Render backend URL (e.g., `https://chatmind-server.onrender.com` without trailing slash).
5. **Deploy**:
   - Click **Deploy**.
   - Once deployed, click the provided Vercel URL (e.g., `https://chatmind-client.vercel.app`).
6. **Verify End-to-End**:
   - Open your deployed Vercel site.
   - Click **Check Health** → Confirm HTTP 200 `{ status: "ok" }`.
   - Click **Check DB** → Confirm HTTP 200 `{ status: "ok", message: "Database write and read successful", data: { ... } }`.

---

## Troubleshooting Guide

### 1. CORS Errors (Cross-Origin Resource Sharing)

**What it looks like in the browser console:**
```text
Access to fetch at 'https://chatmind-server.onrender.com/api/health' from origin 'https://chatmind-client.vercel.app'
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
TypeError: Failed to fetch
```

**Why it occurs:**
Browsers block cross-origin HTTP requests if the server does not return headers permitting the caller's origin.

**How to resolve:**
- In this skeleton, `server/server.js` enables open CORS by default:
  ```javascript
  const cors = require('cors');
  app.use(cors()); // Permits all origins
  ```
- When restricting CORS for production later, specify the allowed Vercel domain explicitly:
  ```javascript
  app.use(cors({
    origin: [
      'https://chatmind-client.vercel.app',
      'http://localhost:5173'
    ],
    credentials: true
  }));
  ```
- Make sure `app.use(cors())` is placed **before** any route definitions in `server.js`.

---

### 2. Environment Variables Not Being Picked Up

**Symptoms:**
- The frontend shows `VITE_API_URL: (not configured)` or makes requests to `undefined/api/health`.
- The backend logs `⚠️ MONGO_URI is not set in environment variables`.

**Why it occurs & How to resolve:**
- **Vite Prefix Requirement**: Vite only bundles client environment variables that start with `VITE_`. Any variable named `API_URL` without `VITE_` is ignored by Vite for security reasons. Always name it `VITE_API_URL`.
- **Compile-Time Bundling**: Unlike backend Node.js apps where `process.env` is evaluated at runtime, Vite bakes `import.meta.env.*` into the static JavaScript bundles during `vite build`.
- **Redeployment Requirement**: Whenever you update `VITE_API_URL` in Vercel's project dashboard:
  1. Go to **Deployments** in Vercel.
  2. Click the three dots on the latest deployment → **Redeploy**.
  3. Simply saving the variable in the settings without a redeploy will **not** update the existing build!

---

### 3. MongoDB Connection Timeouts / ServerSelectionError

**What it looks like in server logs:**
```text
MongooseServerSelectionError: connection <monitor> to 100xapps-shard-00-00.lcgiyhr.mongodb.net:27017 closed
or
MongoServerSelectionError: connection timed out after 30000 ms
```

**Why it occurs & How to resolve:**
1. **IP Whitelist in Atlas**:
   - Render uses dynamic IP addresses that change on every deploy or restart.
   - In MongoDB Atlas, navigate to **Network Access** and make sure `0.0.0.0/0` (Allow Access from Anywhere) is active.
2. **Password Special Characters**:
   - If your database user password contains characters like `@`, `:`, `/`, `?`, or `#`, they will break URI parsing.
   - Either URL-encode the special characters (e.g. `@` becomes `%40`) or choose an alphanumeric password in Atlas **Database Access**.
3. **Database Name Missing**:
   - Ensure your connection string includes `/ChatMind` before the query parameters:
     ```text
     ...mongodb.net/ChatMind?retryWrites=true&w=majority
     ```
4. **Render Free Tier Cold Start**:
   - Render free web services spin down after 15 minutes of inactivity. The first request after spindown may take 30–50 seconds while the instance boots. Subsequent requests will be fast.
