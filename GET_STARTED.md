# 🚀 Getting Started with MyHost App

This guide will help you get the MyHost app running on your computer.

## ✅ What You Need

### Required Software:
1. **Node.js** (v16 or higher)
   - Download from: https://nodejs.org/
   - Choose the LTS (Long Term Support) version
   - This includes npm (Node Package Manager)

2. **Code Editor** (Optional but recommended)
   - VS Code: https://code.visualstudio.com/
   - Or any text editor

### Optional (For Payments):
- **Pesapal Account** (if you want payment functionality)
  - Sign up at: https://www.pesapal.com/
  - See [START_PESAPAL.md](./START_PESAPAL.md) for details

---

## 🎯 Quick Start (Frontend Only - 3 Steps)

If you just want to see the app working **without payments**, follow these steps:

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start the App
```bash
npm run dev
```

### Step 3: Open in Browser
- The app will open at: **http://localhost:5173**
- Or manually go to: http://localhost:5173

**That's it!** The app should now be running. 🎉

---

## 🔧 Full Setup (With Backend & Payments)

If you want **full functionality including payments**, follow these steps:

### Step 1: Install Frontend Dependencies
```bash
npm install
```

### Step 2: Set Up Backend

1. **Navigate to backend folder:**
   ```bash
   cd myhost-backend
   ```

2. **Install backend dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file** (in `myhost-backend` folder):
   ```env
   # Basic Configuration
   PORT=5000
   NODE_ENV=development
   BASE_URL=http://localhost:5000
   FRONTEND_URL=http://localhost:5173
   
   # Pesapal (Optional - for payments)
   # Get these from: https://developer.pesapal.com/
   PESAPAL_CONSUMER_KEY=your_key_here
   PESAPAL_CONSUMER_SECRET=your_secret_here
   PESAPAL_ENVIRONMENT=sandbox
   PESAPAL_IPN_ID=
   ```

4. **Start backend server:**
   ```bash
   npm start
   ```
   
   You should see: `🚀 MyHost API server running on http://localhost:5000`

### Step 3: Start Frontend

1. **Open a new terminal** (keep backend running)
2. **Go back to root folder:**
   ```bash
   cd ..
   ```
3. **Start frontend:**
   ```bash
   npm run dev
   ```

### Step 4: Open App
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

---

## 📋 Checklist

### Minimum (Frontend Only):
- [ ] Node.js installed
- [ ] Run `npm install` in root folder
- [ ] Run `npm run dev`
- [ ] App opens at http://localhost:5173

### Full Setup (With Backend):
- [ ] Node.js installed
- [ ] Frontend: `npm install` (root folder)
- [ ] Backend: `npm install` (myhost-backend folder)
- [ ] Created `.env` file in `myhost-backend` folder
- [ ] Backend running: `npm start` (in myhost-backend)
- [ ] Frontend running: `npm run dev` (in root)
- [ ] Both servers running successfully

### Optional (Payments):
- [ ] Pesapal account created
- [ ] Pesapal credentials added to `.env`
- [ ] IPN URL registered (see [PESAPAL_QUICK_START.md](./PESAPAL_QUICK_START.md))

---

## 🐛 Troubleshooting

### "npm is not recognized"
- **Solution:** Install Node.js from https://nodejs.org/
- Make sure to restart your terminal after installing

### "Port 5173 already in use"
- **Solution:** Another app is using that port
- Close other apps or change port in `vite.config.js`

### "Cannot find module"
- **Solution:** Run `npm install` in the folder where you see the error

### "Backend connection failed"
- **Solution:** 
  1. Make sure backend is running (`cd myhost-backend && npm start`)
  2. Check that `FRONTEND_URL` in backend `.env` matches your frontend URL
  3. Check that frontend `.env` has `VITE_API_URL=http://localhost:5000`

### "Payment not working"
- **Solution:** 
  1. Check backend is running
  2. Verify Pesapal credentials in `myhost-backend/.env`
  3. See [START_PESAPAL.md](./START_PESAPAL.md) for payment setup

---

## 📁 Project Structure

```
MyHost/
├── src/                    # Frontend React code
│   ├── MyHostApp.jsx      # Main app component
│   └── utils/             # Utility functions
├── myhost-backend/         # Backend API
│   ├── server.js          # Backend server
│   ├── routes/            # API routes
│   └── services/          # Business logic
├── public/                 # Static files (images, etc.)
├── package.json           # Frontend dependencies
└── vite.config.js         # Vite configuration
```

---

## 🎮 Available Commands

### Frontend (Root Folder):
```bash
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Backend (myhost-backend folder):
```bash
npm install          # Install dependencies
npm start            # Start server
npm run dev          # Start with auto-reload
npm run check-pesapal # Verify Pesapal setup
```

---

## 🌐 Deploying to Production

### Frontend:
1. Run `npm run build`
2. Deploy the `dist` folder to:
   - Netlify (drag & drop)
   - Vercel (`vercel` command)
   - GitHub Pages
   - Any web hosting

### Backend:
1. Set up a server (Heroku, AWS, DigitalOcean, etc.)
2. Set environment variables
3. Deploy backend code
4. Update frontend `VITE_API_URL` to point to production backend

---

## 📚 Next Steps

1. **Explore the App:**
   - Browse properties
   - Try searching
   - Test filters
   - View property details

2. **Set Up Payments:**
   - See [START_PESAPAL.md](./START_PESAPAL.md)
   - Or [PESAPAL_QUICK_START.md](./PESAPAL_QUICK_START.md) for detailed guide

3. **Customize:**
   - Update logo colors (see [LOGO_COLORS_GUIDE.md](./LOGO_COLORS_GUIDE.md))
   - Modify property data
   - Add your own properties

---

## 💡 Tips

- **Development:** Use `npm run dev` for hot-reload (changes appear instantly)
- **Testing:** Start with frontend only, add backend when needed
- **Payments:** Can be added later - app works without it
- **Two Terminals:** Keep backend and frontend in separate terminals

---

## ❓ Need Help?

- Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- Review error messages in terminal
- Check that all dependencies are installed
- Verify Node.js version: `node --version` (should be v16+)

---

**Ready to start?** Run `npm install` and then `npm run dev`! 🚀

