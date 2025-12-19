# ⚡ Quick Start Guide - MyHost App

## What You Need to Get Started

### ✅ Required:
1. **Node.js** (v16+) - ✅ You have it! (v24.11.1)
2. **Dependencies installed** - Check below

---

## 🚀 Start the App (Choose One)

### Option 1: Frontend Only (Simplest - 2 Commands)

**Just want to see the app?** This is the fastest way:

```bash
# 1. Install dependencies (if not done)
npm install

# 2. Start the app
npm run dev
```

Then open: **http://localhost:3000** (or the URL shown in terminal)

**Note:** Payments won't work without backend, but you can browse properties, search, and see all features!

---

### Option 2: Full Setup (Frontend + Backend)

**Want payments and full functionality?**

#### Terminal 1 - Backend:
```bash
cd myhost-backend
npm install          # First time only
npm start
```

#### Terminal 2 - Frontend:
```bash
# In root folder
npm install          # First time only
npm run dev
```

Then open: **http://localhost:3000**

---

## 📋 Quick Checklist

Run these commands to check your setup:

```bash
# Check Node.js
node --version       # Should show v16 or higher ✅

# Check if dependencies installed
# Frontend:
if (Test-Path "node_modules") { Write-Host "✅ Frontend ready" } else { Write-Host "❌ Run: npm install" }

# Backend:
if (Test-Path "myhost-backend\node_modules") { Write-Host "✅ Backend ready" } else { Write-Host "❌ Run: cd myhost-backend && npm install" }
```

---

## 🎯 What Works Without Backend

✅ Browse properties  
✅ Search by location  
✅ Filter properties  
✅ View property details  
✅ Category browsing  
✅ Favorites (local storage)  
✅ All UI features  

❌ Payments (needs backend)  
❌ Booking submission (needs backend)  
❌ Host dashboard (needs backend)  

---

## 🔧 If Something Doesn't Work

### "npm is not recognized"
- Restart terminal after installing Node.js
- Or use full path: `C:\Program Files\nodejs\npm.cmd`

### "Port already in use"
- Close other apps using port 3000
- Or change port in `vite.config.js`

### "Cannot find module"
- Run `npm install` in the folder with the error

### "Backend connection failed"
- Make sure backend is running: `cd myhost-backend && npm start`
- Check it says: `🚀 MyHost API server running on http://localhost:5000`

---

## 📝 Environment Variables (Optional)

### For Payments (Backend):
Create `myhost-backend/.env`:
```env
PORT=5000
FRONTEND_URL=http://localhost:3000
PESAPAL_CONSUMER_KEY=your_key
PESAPAL_CONSUMER_SECRET=your_secret
PESAPAL_ENVIRONMENT=sandbox
```

### For Frontend:
Create `.env` in root (optional):
```env
VITE_API_URL=http://localhost:5000
```

---

## 🎉 You're Ready!

**Minimum to start:**
1. ✅ Node.js installed (you have it!)
2. Run `npm install`
3. Run `npm run dev`
4. Open http://localhost:3000

**That's it!** The app will work for browsing and viewing properties.

For payments, see [START_PESAPAL.md](./START_PESAPAL.md)

---

## 📚 More Help

- **Full setup guide:** [GET_STARTED.md](./GET_STARTED.md)
- **Payment setup:** [START_PESAPAL.md](./START_PESAPAL.md)
- **Troubleshooting:** [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

