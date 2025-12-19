# 🚀 Deploy MyHost to Vercel

This guide will help you deploy your MyHost app to Vercel (free hosting).

## 📋 Prerequisites

1. **GitHub Account** (free)
2. **Vercel Account** (free) - Sign up at: https://vercel.com/
3. **Your code pushed to GitHub** (optional but recommended)

---

## 🎯 Method 1: Deploy via Vercel Dashboard (Easiest)

### Step 1: Prepare Your Code

1. **Make sure your code is ready:**
   ```bash
   # Test build locally first
   npm run build
   ```

2. **Push to GitHub** (if not already):
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

### Step 2: Deploy on Vercel

1. **Go to Vercel:**
   - Visit: https://vercel.com/
   - Sign up or log in (free account)

2. **Import Your Project:**
   - Click "Add New..." → "Project"
   - Import from GitHub (connect your GitHub account if needed)
   - Select your `MyHost` repository
   - Click "Import"

3. **Configure Project:**
   - **Framework Preset:** Vite (should auto-detect)
   - **Root Directory:** `./` (leave as is)
   - **Build Command:** `npm run build` (auto-filled)
   - **Output Directory:** `dist` (auto-filled)
   - **Install Command:** `npm install` (auto-filled)

4. **Environment Variables** (Optional - for backend API):
   - Click "Environment Variables"
   - Add: `VITE_API_URL` = `https://your-backend-url.com`
   - Or leave empty if using default `http://localhost:5000`

5. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your app will be live! 🎉

### Step 3: Get Your Live URL

- Vercel will give you a URL like: `https://myhost-abc123.vercel.app`
- You can also add a custom domain later

---

## 🎯 Method 2: Deploy via Vercel CLI (For Developers)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy

```bash
# In your project root folder
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (your account)
# - Link to existing project? No (first time)
# - Project name? myhost (or your choice)
# - Directory? ./
# - Override settings? No
```

### Step 4: Deploy to Production

```bash
vercel --prod
```

---

## ⚙️ Configuration

Your `vercel.json` is already configured with:

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures:
- ✅ Single Page App routing works
- ✅ All routes redirect to `index.html`
- ✅ Assets are cached properly

---

## 🔧 Environment Variables

### Frontend Environment Variables

If your app needs to connect to a backend API, add these in Vercel:

1. **Go to Project Settings → Environment Variables**
2. **Add:**
   - `VITE_API_URL` = `https://your-backend-api.com`
   - Or leave empty to use default `http://localhost:5000`

### Example:
```
VITE_API_URL=https://myhost-api.herokuapp.com
```

---

## 🔄 Updating Your Deployment

### Option 1: Automatic (Recommended)

If you connected GitHub:
- **Every push to `main` branch = Auto-deploy**
- Vercel automatically builds and deploys
- You get a preview URL for each commit

### Option 2: Manual

```bash
# Deploy latest changes
vercel --prod
```

---

## 🌐 Custom Domain

1. **Go to Project Settings → Domains**
2. **Add your domain** (e.g., `myhost.com`)
3. **Follow DNS instructions** from Vercel
4. **Wait for DNS propagation** (usually 5-30 minutes)

---

## 🔍 Troubleshooting

### Build Fails

**Error: "Module not found"**
- Check that all dependencies are in `package.json`
- Run `npm install` locally to verify

**Error: "Build command failed"**
- Test locally: `npm run build`
- Check for TypeScript/ESLint errors
- Review build logs in Vercel dashboard

### App Shows Blank Page

**Check:**
1. Browser console for errors
2. Network tab for failed requests
3. Verify `vercel.json` has correct rewrites
4. Check environment variables are set

### API Not Working

**If backend is separate:**
1. Make sure backend is deployed (Heroku, Railway, etc.)
2. Update `VITE_API_URL` in Vercel environment variables
3. Redeploy frontend

### Routing Issues

**404 on refresh:**
- Verify `vercel.json` has the rewrites rule
- Should redirect all routes to `/index.html`

---

## 📊 Vercel Features

### Analytics (Free Tier)
- Page views
- Performance metrics
- Real-time visitor stats

### Preview Deployments
- Every commit gets a preview URL
- Test before merging to production
- Share preview links with team

### Automatic HTTPS
- SSL certificate included
- Secure by default

---

## 🚀 Backend Deployment (Separate)

Your backend (`myhost-backend`) needs separate hosting:

### Option 1: Railway (Recommended - Free)
```bash
cd myhost-backend
# Install Railway CLI
npm install -g @railway/cli
railway login
railway init
railway up
```

### Option 2: Heroku
```bash
cd myhost-backend
heroku create myhost-api
git push heroku main
```

### Option 3: Render
- Connect GitHub repo
- Select `myhost-backend` folder
- Deploy as Node.js service

---

## ✅ Deployment Checklist

Before deploying:
- [ ] Test build locally: `npm run build`
- [ ] Check `vercel.json` exists
- [ ] Verify all dependencies in `package.json`
- [ ] Test app locally: `npm run dev`
- [ ] Push code to GitHub (recommended)
- [ ] Set environment variables in Vercel (if needed)

After deploying:
- [ ] Visit your Vercel URL
- [ ] Test all pages load correctly
- [ ] Verify API calls work (if backend connected)
- [ ] Check mobile responsiveness
- [ ] Test search and filters

---

## 📝 Quick Commands

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy (preview)
vercel

# Deploy (production)
vercel --prod

# View deployments
vercel ls

# Remove deployment
vercel remove
```

---

## 🎉 You're Live!

Once deployed, your app will be available at:
- **Preview:** `https://myhost-git-branch-username.vercel.app`
- **Production:** `https://myhost-username.vercel.app`
- **Custom Domain:** `https://yourdomain.com` (if configured)

---

## 📚 Resources

- **Vercel Docs:** https://vercel.com/docs
- **Vite + Vercel:** https://vercel.com/guides/deploying-vite
- **Vercel Dashboard:** https://vercel.com/dashboard

---

## 💡 Tips

1. **Use GitHub Integration** - Automatic deployments on every push
2. **Preview Deployments** - Test before going live
3. **Environment Variables** - Keep secrets secure
4. **Custom Domain** - Brand your app with your domain
5. **Analytics** - Monitor your app's performance

**Ready to deploy?** Push your code to GitHub and import to Vercel! 🚀

