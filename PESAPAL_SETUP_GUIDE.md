# Pesapal Setup Guide for MyHost

## Step 1: Create Pesapal Account

1. **Visit Pesapal Website**
   - Go to: https://www.pesapal.com/
   - Click "Sign Up" or "Get Started"

2. **Register as Merchant**
   - Fill in your business details
   - Provide required documentation (business registration, etc.)
   - Wait for account approval (usually 1-3 business days)

3. **Access Developer Dashboard**
   - Once approved, log in to your account
   - Navigate to "Developers" or "API" section
   - You'll need:
     - **Consumer Key**
     - **Consumer Secret**

## Step 2: Get API Credentials

### For Testing (Sandbox):
1. Go to Pesapal Developer Dashboard
2. Navigate to "Sandbox" or "Test Environment"
3. Generate test credentials:
   - Consumer Key (for testing)
   - Consumer Secret (for testing)
4. Use sandbox URLs for development

### For Production:
1. Complete merchant verification
2. Request production credentials
3. Use production URLs

## Step 3: Environment Variables

Create a `.env` file in the `myhost-backend` directory:

```env
# Pesapal Credentials
PESAPAL_CONSUMER_KEY=your_consumer_key_here
PESAPAL_CONSUMER_SECRET=your_consumer_secret_here
PESAPAL_ENVIRONMENT=sandbox
# Options: 'sandbox' or 'live'

# Application URLs
BASE_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000

# Server Configuration
PORT=5000
NODE_ENV=development

# Database (if using)
DATABASE_URL=your_database_url_here
```

## Step 4: Pesapal API Endpoints

### Sandbox URLs:
- Base URL: `https://cybqa.pesapal.com/pesapalv3`
- IPN (Webhook) URL: Your server URL + `/api/pesapal/ipn`

### Production URLs:
- Base URL: `https://pay.pesapal.com/v3`
- IPN (Webhook) URL: Your server URL + `/api/pesapal/ipn`

## Step 5: Configure Webhook (IPN)

1. In Pesapal Dashboard, go to "IPN Settings"
2. Add your IPN URL: `https://yourdomain.com/api/pesapal/ipn`
3. For local testing, use a service like ngrok:
   ```bash
   ngrok http 5000
   ```
   Then use: `https://your-ngrok-url.ngrok.io/api/pesapal/ipn`

## Step 6: Test Credentials

Pesapal provides test credentials for sandbox:
- Test phone numbers for M-Pesa
- Test card numbers for card payments
- Check Pesapal documentation for current test credentials

## Important Notes

⚠️ **Security:**
- Never commit `.env` file to git
- Keep Consumer Secret secure
- Use environment variables in production

⚠️ **Testing:**
- Always test in sandbox first
- Verify webhook URLs are accessible
- Test all payment methods (M-Pesa, cards)

⚠️ **Production:**
- Complete merchant verification
- Use HTTPS for all URLs
- Set up proper error handling
- Monitor payment webhooks

## Support

- Pesapal Documentation: https://developer.pesapal.com/
- Pesapal Support: support@pesapal.com
- API Reference: https://developer.pesapal.com/api3

## Next Steps

After setting up credentials:
1. Install backend dependencies: `npm install`
2. Configure `.env` file with your credentials
3. Start the server: `npm run dev`
4. Test payment flow

