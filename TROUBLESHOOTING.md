# 🔧 Troubleshooting Guide

This guide covers common issues and their solutions.

---

## 🚫 Installation Issues

### ❌ Error: "npm is not recognized" or "node is not recognized"

**Problem:** Node.js is not installed or not in your system PATH.

**Solution:**

1. **Check if Node.js is installed:**
   ```bash
   node --version
   ```

2. **If not installed:**
   - Download from https://nodejs.org/
   - Install the LTS (Long Term Support) version
   - **Important:** Restart your computer after installation
   - Verify: `node --version` and `npm --version`

3. **If installed but still not recognized:**
   - On Windows: Add Node.js to PATH:
     - Search "Environment Variables"
     - Add: `C:\Program Files\nodejs\` to PATH
     - Restart terminal

---

### ❌ Error: "Cannot find module" or "Module not found"

**Problem:** Dependencies are not installed.

**Solution:**

```bash
# Delete node_modules and reinstall
rm -rf node_modules
rm package-lock.json
npm install
```

Or on Windows:
```powershell
rmdir /s node_modules
del package-lock.json
npm install
```

---

### ❌ Error: "EACCES: permission denied"

**Problem:** Permission issues (usually on Mac/Linux).

**Solution:**

```bash
# Don't use sudo! Fix npm permissions instead:
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.profile
source ~/.profile

# Then try installing again:
npm install
```

---

### ❌ Error: "gyp ERR! stack Error: Python not found"

**Problem:** Some packages need Python to build.

**Solution:**

**Windows:**
```bash
npm install --global windows-build-tools
```

**Mac:**
```bash
xcode-select --install
```

**Linux:**
```bash
sudo apt-get install python3 build-essential
```

Then try `npm install` again.

---

## 🚀 Running the App Issues

### ❌ Error: "Port 3000 is already in use" (EADDRINUSE)

**Problem:** Another application is using port 3000.

**Solution 1 - Use a different port:**

Edit `vite.config.js`:
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,  // Change to any available port
    strictPort: true
  }
});
```

**Solution 2 - Find and kill the process:**

**Windows:**
```powershell
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

**Mac/Linux:**
```bash
lsof -i :3000
kill -9 <PID>
```

---

### ❌ Blank Page / White Screen

**Problem:** Various causes - build issues, routing problems, or errors.

**Solutions:**

1. **Check Browser Console:**
   - Press `F12` to open DevTools
   - Click "Console" tab
   - Look for error messages
   - Share the error if asking for help

2. **Hard Refresh:**
   - Windows/Linux: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

3. **Clear Cache:**
   - `Ctrl + Shift + Delete` → Clear cache
   - Or use Incognito mode to test

4. **Check Vite Config:**
   - Make sure `base` is set correctly
   - For local dev, it should be `'/'` or undefined
   - For GitHub Pages, it should match your repo name

5. **Rebuild:**
   ```bash
   npm run build
   npm run preview
   ```

---

### ❌ Error: "Failed to resolve import" or "Cannot find module 'react'"

**Problem:** Dependencies aren't installed properly.

**Solution:**

```bash
# Clean reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

### ❌ App works locally but not after deployment

**Problem:** Build configuration issues.

**Solutions:**

1. **Check base path in `vite.config.js`:**
   ```javascript
   // For GitHub Pages:
   base: '/your-repo-name/',
   
   // For Netlify/Vercel:
   base: '/',  // or remove the base property
   ```

2. **Test production build locally:**
   ```bash
   npm run build
   npm run preview
   ```
   If it works at `localhost:8080`, the issue is with deployment config.

3. **Check hosting platform logs:**
   - Netlify: Check deploy logs
   - Vercel: Check function logs
   - GitHub Pages: Check Actions tab

---

## 🌐 Deployment Issues

### ❌ Netlify: "Page Not Found" on refresh

**Problem:** SPA (Single Page App) routing issue.

**Solution:**

Create `public/_redirects` file:
```
/*    /index.html   200
```

Then rebuild and redeploy.

---

### ❌ GitHub Pages: Images/Assets not loading

**Problem:** Incorrect base path.

**Solution:**

Update `vite.config.js`:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/your-repository-name/',  // Must match your repo name!
  server: {
    port: 3000
  }
});
```

Rebuild and commit:
```bash
npm run build
git add .
git commit -m "Fix base path"
git push
```

---

### ❌ Vercel: Build fails with "Command failed"

**Problem:** Build errors or missing dependencies.

**Solution:**

1. **Check build locally:**
   ```bash
   npm run build
   ```
   Fix any errors shown.

2. **Verify build settings in Vercel:**
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Check Node version:**
   - Add `engines` to `package.json`:
   ```json
   {
     "engines": {
       "node": ">=16.x"
     }
   }
   ```

---

## 🐛 Code Issues

### ❌ Changes not showing in browser

**Solutions:**

1. **Hard refresh:** `Ctrl + Shift + R`
2. **Check if file is saved:** Look for dot in VS Code tab
3. **Restart dev server:** `Ctrl+C`, then `npm run dev`
4. **Clear Vite cache:**
   ```bash
   rm -rf node_modules/.vite
   npm run dev
   ```

---

### ❌ Vite HMR (Hot Module Replacement) not working

**Solution:**

1. **Check if using WSL on Windows:**
   Add to `vite.config.js`:
   ```javascript
   server: {
     watch: {
       usePolling: true
     }
   }
   ```

2. **Check firewall:** Allow Vite through firewall

---

## 🔐 Environment Variables Issues

### ❌ Environment variables not working

**Problem:** Variables not loading or undefined.

**Solutions:**

1. **Prefix with `VITE_`:**
   ```bash
   # .env file
   VITE_API_KEY=your-key-here
   ```

2. **Access correctly in code:**
   ```javascript
   const apiKey = import.meta.env.VITE_API_KEY;
   ```

3. **Restart dev server** after changing `.env` file

4. **For deployment:**
   - Add env vars in hosting platform dashboard
   - Netlify: Site settings → Environment variables
   - Vercel: Project settings → Environment Variables

---

## 📦 Git/GitHub Issues

### ❌ "git is not recognized"

**Solution:**

Install Git:
- Download from https://git-scm.com/
- Install with default options
- Restart terminal

---

### ❌ Large files preventing push

**Problem:** Trying to push `node_modules` or large files.

**Solution:**

1. **Make sure `.gitignore` exists:**
   ```gitignore
   node_modules/
   dist/
   .env
   ```

2. **Remove from Git if already tracked:**
   ```bash
   git rm -r --cached node_modules
   git commit -m "Remove node_modules"
   git push
   ```

---

## 🖥️ Platform-Specific Issues

### Windows Issues

**❌ PowerShell Execution Policy Error**

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

**❌ Path separator issues**

Use `/` instead of `\` in config files.

---

### Mac Issues

**❌ "xcrun: error: invalid active developer path"**

```bash
xcode-select --install
```

---

### Linux Issues

**❌ "watch ENOSPC"** (File watcher limit reached)

```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

---

## 📊 Performance Issues

### ❌ Slow build times

**Solutions:**

1. **Clear cache:**
   ```bash
   rm -rf node_modules/.vite
   npm run build
   ```

2. **Update dependencies:**
   ```bash
   npm update
   ```

3. **Check for large files in `src/`**

---

### ❌ App loads slowly

**Solutions:**

1. **Optimize images:**
   - Compress images (use TinyPNG, Squoosh)
   - Use WebP format
   - Lazy load images

2. **Code splitting:**
   ```javascript
   const MyComponent = lazy(() => import('./MyComponent'));
   ```

3. **Check bundle size:**
   ```bash
   npm run build
   # Check dist/ folder size
   ```

---

## 🆘 Still Having Issues?

### Before Asking for Help:

1. **Check error messages carefully**
2. **Search Google for the exact error message**
3. **Check Stack Overflow**
4. **Look at Vite documentation:** https://vitejs.dev

### What to Include When Asking for Help:

- **Error message** (full text)
- **What you were trying to do**
- **Your OS** (Windows/Mac/Linux)
- **Node version:** `node --version`
- **Steps to reproduce**
- **Screenshots** (if applicable)

---

## 📚 Useful Commands Summary

```bash
# Check versions
node --version
npm --version
git --version

# Clean install
rm -rf node_modules package-lock.json
npm install

# Development
npm run dev

# Production build
npm run build
npm run preview

# Clear cache
rm -rf node_modules/.vite

# View what's using a port (Windows)
netstat -ano | findstr :3000

# View what's using a port (Mac/Linux)
lsof -i :3000
```

---

## 🔗 Helpful Resources

- **Node.js:** https://nodejs.org/
- **Vite Docs:** https://vitejs.dev/
- **React Docs:** https://react.dev/
- **Netlify Docs:** https://docs.netlify.com/
- **Vercel Docs:** https://vercel.com/docs
- **GitHub Pages:** https://pages.github.com/

---

**Good luck!** 🍀

Most issues can be solved by:
1. Restarting your terminal/computer
2. Deleting `node_modules` and running `npm install`
3. Reading error messages carefully
4. Searching for the error on Google

Don't give up! 💪

