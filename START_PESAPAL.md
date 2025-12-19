# 🚀 Quick Start: Using Pesapal in MyHost

## TL;DR - Get Started in 5 Minutes

1. **Get Pesapal Credentials**
   - Sign up at: https://www.pesapal.com/
   - Get Consumer Key & Secret from Developer Dashboard

2. **Configure Backend**
   ```bash
   cd myhost-backend
   cp .env.example .env
   # Edit .env and add your credentials
   ```

3. **Test Setup**
   ```bash
   npm install
   npm run check-pesapal
   ```

4. **Start Server**
   ```bash
   npm start
   ```

5. **Start Frontend**
   ```bash
   # In root directory
   npm run dev
   ```

## Detailed Guide

For complete step-by-step instructions, see: **[PESAPAL_QUICK_START.md](./PESAPAL_QUICK_START.md)**

## What You Need

✅ Pesapal account (free to sign up)  
✅ Consumer Key & Secret (from Pesapal dashboard)  
✅ Backend server running  
✅ Frontend app running  

## Quick Test

Once everything is set up:

1. Open your app: http://localhost:5173
2. Browse properties
3. Click "Reserve" on any property
4. Fill in booking details
5. Select "Pesapal" as payment method
6. Click "Pay with Pesapal"
7. You'll be redirected to Pesapal payment page

## Need Help?

- 📖 Full guide: [PESAPAL_QUICK_START.md](./PESAPAL_QUICK_START.md)
- 📚 Pesapal docs: https://developer.pesapal.com/
- 💬 Pesapal support: support@pesapal.com

