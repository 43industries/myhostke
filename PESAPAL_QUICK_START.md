# 🚀 Pesapal Quick Start Guide

Follow these steps to get Pesapal payments working in your MyHost app.

## Step 1: Create a Pesapal Account

1. **Visit Pesapal Website**
   - Go to: https://www.pesapal.com/
   - Click "Sign Up" or "Get Started"

2. **Register Your Business**
   - Choose "Merchant" account type
   - Fill in your business details:
     - Business name
     - Business registration number
     - Contact information
     - Bank account details
   - Upload required documents (business registration, ID, etc.)

3. **Wait for Approval**
   - Usually takes 1-3 business days
   - You'll receive an email when approved

## Step 2: Get Your API Credentials

### For Testing (Sandbox - Start Here!)

1. **Log in to Pesapal Dashboard**
   - Go to: https://developer.pesapal.com/
   - Or log in at: https://www.pesapal.com/

2. **Navigate to Developer/API Section**
   - Look for "API Credentials" or "Developer Tools"
   - Find "Sandbox" or "Test Environment"

3. **Get Your Test Credentials**
   - **Consumer Key** (looks like: `qkio1BGGYgTz5MNFyZcbF1LhjEHGN2kk0RIdZUyuVmxs`)
   - **Consumer Secret** (looks like: `bclnWicdIUZjMf9CAhtJXkttZfQwruF9jETk5uYO8hc=`)
   
   ⚠️ **Important:** These are test credentials. Use them for development only!

### For Production (After Testing)

1. Complete merchant verification
2. Request production credentials from Pesapal support
3. Replace sandbox credentials with production ones

## Step 3: Set Up Your Backend Environment

1. **Navigate to Backend Folder**
   ```bash
   cd myhost-backend
   ```

2. **Create `.env` File**
   - Create a new file named `.env` in the `myhost-backend` folder
   - Copy this template:

   ```env
   # Pesapal Credentials (Get these from Step 2)
   PESAPAL_CONSUMER_KEY=your_consumer_key_here
   PESAPAL_CONSUMER_SECRET=your_consumer_secret_here
   PESAPAL_ENVIRONMENT=sandbox
   
   # Your Application URLs
   BASE_URL=http://localhost:5000
   FRONTEND_URL=http://localhost:5173
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # IPN ID (You'll get this after Step 4)
   PESAPAL_IPN_ID=
   ```

3. **Add Your Credentials**
   - Replace `your_consumer_key_here` with your actual Consumer Key
   - Replace `your_consumer_secret_here` with your actual Consumer Secret
   - Save the file

## Step 4: Register IPN (Webhook) URL

The IPN (Instant Payment Notification) tells your server when payments are completed.

### Option A: Using ngrok (For Local Testing)

1. **Install ngrok** (if not installed)
   - Download from: https://ngrok.com/download
   - Or install via: `npm install -g ngrok`

2. **Start Your Backend Server**
   ```bash
   cd myhost-backend
   npm install  # If you haven't already
   npm start
   ```

3. **Start ngrok in Another Terminal**
   ```bash
   ngrok http 5000
   ```
   
   You'll see something like:
   ```
   Forwarding  https://abc123.ngrok.io -> http://localhost:5000
   ```

4. **Register IPN**
   - Copy the ngrok URL (e.g., `https://abc123.ngrok.io`)
   - In Pesapal Dashboard, go to IPN Settings
   - Add IPN URL: `https://abc123.ngrok.io/api/pesapal/ipn`
   - Or use the API endpoint: `POST /api/pesapal/register-ipn`

5. **Get IPN ID**
   - After registering, you'll receive an IPN ID
   - Add it to your `.env` file:
     ```env
     PESAPAL_IPN_ID=your_ipn_id_here
     ```

### Option B: Using Your Production Domain

1. **Deploy Your Backend**
   - Deploy to a server with a public URL (e.g., Heroku, AWS, DigitalOcean)

2. **Register IPN in Pesapal Dashboard**
   - IPN URL: `https://yourdomain.com/api/pesapal/ipn`
   - Get the IPN ID and add to `.env`

## Step 5: Install Dependencies & Start Server

1. **Install Backend Dependencies**
   ```bash
   cd myhost-backend
   npm install
   ```

2. **Start the Backend Server**
   ```bash
   npm start
   # or
   node server.js
   ```

   You should see:
   ```
   Server running on port 5000
   ```

## Step 6: Configure Frontend

1. **Update Frontend Environment**
   - Create or update `.env` in the root folder:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

2. **Start Frontend**
   ```bash
   npm run dev
   ```

## Step 7: Test the Payment Flow

1. **Test in Sandbox Mode**
   - Make a test booking
   - Use Pesapal test credentials:
     - **Test Phone:** Check Pesapal documentation for current test numbers
     - **Test Card:** Use test card numbers from Pesapal docs

2. **Verify Payment**
   - Complete a test payment
   - Check your backend logs for IPN notifications
   - Verify booking status updates

## Step 8: Go Live (Production)

1. **Complete Merchant Verification**
   - Submit all required documents
   - Wait for approval

2. **Get Production Credentials**
   - Request production Consumer Key and Secret
   - Update your `.env`:
     ```env
     PESAPAL_CONSUMER_KEY=your_production_key
     PESAPAL_CONSUMER_SECRET=your_production_secret
     PESAPAL_ENVIRONMENT=live
     ```

3. **Update IPN URL**
   - Register production IPN URL
   - Update `PESAPAL_IPN_ID` in `.env`

4. **Deploy**
   - Deploy backend with production credentials
   - Update frontend to point to production API

## Troubleshooting

### ❌ "Failed to authenticate with Pesapal"
- Check your Consumer Key and Secret are correct
- Verify `PESAPAL_ENVIRONMENT` is set correctly
- Make sure credentials match the environment (sandbox vs live)

### ❌ "IPN not receiving notifications"
- Verify IPN URL is publicly accessible
- Check ngrok is running (for local testing)
- Ensure IPN ID is set in `.env`
- Check backend logs for errors

### ❌ "Payment redirect not working"
- Verify `FRONTEND_URL` in `.env` is correct
- Check callback URLs in payment request
- Ensure frontend is running

### ❌ "CORS errors"
- Make sure backend CORS is configured
- Check frontend URL is allowed in backend CORS settings

## Useful Links

- **Pesapal Developer Docs:** https://developer.pesapal.com/
- **Pesapal API Reference:** https://developer.pesapal.com/api3
- **Pesapal Support:** support@pesapal.com
- **ngrok:** https://ngrok.com/

## Quick Checklist

- [ ] Created Pesapal account
- [ ] Got Consumer Key and Secret
- [ ] Created `.env` file with credentials
- [ ] Set up ngrok (for local testing)
- [ ] Registered IPN URL
- [ ] Got IPN ID and added to `.env`
- [ ] Installed backend dependencies
- [ ] Started backend server
- [ ] Started frontend
- [ ] Tested payment flow
- [ ] Verified IPN notifications work

## Need Help?

If you get stuck:
1. Check the error messages in your backend console
2. Review Pesapal documentation
3. Check that all environment variables are set correctly
4. Verify your IPN URL is accessible from the internet

---

**Next Steps:** Once payments are working, you can add M-Pesa, Card, and Bank Transfer methods as well!

