# 📦 Push MyHost to GitHub - Step by Step

## Step 1: Install Git (If Not Installed)

1. **Download Git:**
   - Go to: https://git-scm.com/download/win
   - Download and install Git for Windows
   - Use default settings during installation

2. **Verify Installation:**
   - Open a new terminal/PowerShell
   - Run: `git --version`
   - Should show something like: `git version 2.x.x`

## Step 2: Create GitHub Repository

1. **Go to GitHub:**
   - Visit: https://github.com
   - Sign up or log in

2. **Create New Repository:**
   - Click the "+" icon (top right) → "New repository"
   - Repository name: `myhostke`
   - Description: "MyHost - Countryside Accommodation Platform"
   - Choose: **Public** or **Private**
   - **DO NOT** check "Initialize with README" (we already have files)
   - Click "Create repository"

3. **Copy the repository URL:**
   - You'll see a page with setup instructions
   - Copy the HTTPS URL (looks like: `https://github.com/yourusername/myhostke.git`)

## Step 3: Push Your Code

Open PowerShell/Terminal in your project folder (`D:\MyHost`) and run these commands:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - MyHost app"

# Add your GitHub repository (replace with your actual URL)
git remote add origin https://github.com/yourusername/myhostke.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Note:** Replace `yourusername` with your actual GitHub username in the URL.

## Step 4: Verify

1. Go to: https://github.com/yourusername/myhostke
2. You should see all your files there!

## Troubleshooting

### "git is not recognized"
- Install Git from https://git-scm.com/download/win
- Restart terminal after installation

### "Authentication failed"
- GitHub may ask for username/password
- Use a Personal Access Token instead of password:
  1. GitHub → Settings → Developer settings → Personal access tokens
  2. Generate new token (classic)
  3. Select scopes: `repo` (full control)
  4. Copy the token
  5. Use token as password when pushing

### "Repository not found"
- Check the repository URL is correct
- Make sure you created the repo on GitHub first
- Verify your username in the URL

## Next: Deploy to Vercel

Once on GitHub, you can easily deploy to Vercel:
1. Go to https://vercel.com
2. Import from GitHub
3. Select `myhostke` repository
4. Deploy!

