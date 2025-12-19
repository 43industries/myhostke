# MyHost - Countryside Accommodation Platform

A React-based web application for connecting countryside travelers with homely accommodation.

## ✨ Features

- Browse properties
- Search by location
- Host dashboard
- Property details
- Responsive design

---

## 🎯 For New Users: How to Download & Run This App

### Prerequisites (Install These First)
1. **Node.js** (v16 or higher) - Download from: https://nodejs.org/
2. **Git** (optional, for cloning) - Download from: https://git-scm.com/

### Step-by-Step Setup
1. **Download/Clone this project** to your computer
2. **Open Terminal/Command Prompt** in the project folder
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Run the app**:
   ```bash
   npm run dev
   ```
5. **Open browser** and go to: `http://localhost:3000`

**That's it!** The app should now be running on your computer.

---

## 📁 Project Structure

- **`src/MyHostApp.jsx`** - Main React component (your app code)
- **`src/main.jsx`** - React entry point
- **`index.html`** - HTML template
- **`vite.config.js`** - Vite configuration (port: 3000)
- **`package.json`** - Dependencies

## 🚀 Development (For Developers)

### Method 1: Using Terminal (Recommended)
1. Open VS Code in this folder
2. Open Terminal (Ctrl + `)
3. Run: `npm run dev`
4. Open browser: `http://localhost:3000`

### Method 2: Using VS Code Debugger
1. Press **F5** or go to Run and Debug (Ctrl+Shift+D)
2. Select **"Launch Chrome against localhost"**
3. Chrome will open automatically

## 📝 Available Commands

- `npm install` - Install all dependencies (run this first!)
- `npm run dev` - Start development server (port 3000)
- `npm run build` - Build for production (creates `dist` folder)
- `npm run preview` - Preview production build locally

## 🌐 Deploy to the Internet

### Option 1: Deploy to Netlify (FREE & Easy)
1. Run `npm run build` to create production files
2. Go to https://app.netlify.com/drop
3. Drag & drop the `dist` folder
4. Your app is now live! Share the URL with anyone

### Option 2: Deploy to Vercel (FREE)
1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel`
3. Follow the prompts
4. Your app is now live!

### Option 3: Deploy to GitHub Pages (FREE)
1. Push your code to GitHub
2. Go to Settings → Pages
3. Select your branch and save
4. Your app will be live at: `https://yourusername.github.io/myhost`

### Option 4: Traditional Web Hosting
1. Run `npm run build`
2. Upload the contents of the `dist` folder to your web host
3. Configure your server to serve the files

## 🛠️ Troubleshooting

- **"npm is not recognized"**: Install Node.js first
- **"vite is not recognized"**: Run `npm install` first
- **Port already in use**: Change port in `vite.config.js`
- **Blank page after build**: Check your base URL in `vite.config.js`

## 📦 Sharing Your Code

### To Share Source Code:
1. **DO NOT** include `node_modules` folder (it's huge!)
2. Share the project folder (others run `npm install`)
3. Or upload to GitHub and share the repository link

### To Share the Built App:
1. Run `npm run build`
2. Share the `dist` folder (this is the compiled app)
3. Or deploy to a hosting service (see deployment options above)

---

## 🤝 Contributing

Feel free to fork this project and make improvements!

## 📄 License

This project is open source and available for personal and commercial use.

