# MyHost Backend API

Backend API server for MyHost platform with Pesapal payment integration.

## Quick Start

### 1. Install Dependencies

```bash
cd myhost-backend
npm install
```

### 2. Configure Environment

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Pesapal credentials:
   ```env
   PESAPAL_CONSUMER_KEY=your_consumer_key
   PESAPAL_CONSUMER_SECRET=your_consumer_secret
   PESAPAL_ENVIRONMENT=sandbox
   ```

3. Get your Pesapal credentials from:
   - Sign up: https://www.pesapal.com/
   - Developer Dashboard: https://developer.pesapal.com/

### 3. Register IPN (One-time Setup)

After starting the server, register your IPN URL:

```bash
# Start the server first
npm run dev

# Then in another terminal, register IPN:
curl -X POST http://localhost:5000/api/pesapal/register-ipn
```

Copy the `ipnId` from the response and add it to your `.env`:
```env
PESAPAL_IPN_ID=your_ipn_id_here
```

### 4. Start Server

```bash
npm run dev
```

Server will run on `http://localhost:5000`

## API Endpoints

### Health Check
- `GET /api/health` - Check if server is running

### Payment
- `POST /api/pesapal/initiate` - Initiate payment
- `GET /api/pesapal/status/:orderTrackingId` - Check payment status
- `GET /api/pesapal/ipn` - IPN webhook (called by Pesapal)
- `POST /api/pesapal/register-ipn` - Register IPN URL (one-time)

### Booking
- `POST /api/booking` - Create booking
- `GET /api/booking/:bookingId` - Get booking details

## Testing

### Test Payment Flow

1. Start the server:
   ```bash
   npm run dev
   ```

2. Initiate a payment (using curl or Postman):
   ```bash
   curl -X POST http://localhost:5000/api/pesapal/initiate \
     -H "Content-Type: application/json" \
     -d '{
       "propertyId": "1",
       "checkIn": "2025-02-01",
       "checkOut": "2025-02-04",
       "guests": 2,
       "baseAmount": 5000,
       "nights": 3,
       "customerEmail": "test@example.com",
       "customerPhone": "254712345678"
     }'
   ```

3. Use the `redirectUrl` from response to complete payment in Pesapal sandbox

## Development

- Server runs on port 5000 (configurable via PORT env var)
- Frontend should be on port 3000
- CORS is enabled for frontend URL

## Production

1. Set `PESAPAL_ENVIRONMENT=live`
2. Use production Pesapal credentials
3. Update `BASE_URL` to your production domain
4. Ensure IPN URL is publicly accessible (HTTPS required)
5. Set `NODE_ENV=production`

## Troubleshooting

### "Failed to authenticate with Pesapal"
- Check your Consumer Key and Secret
- Ensure environment matches credentials (sandbox vs live)

### "IPN not receiving callbacks"
- Verify IPN URL is publicly accessible
- Use ngrok for local testing: `ngrok http 5000`
- Check Pesapal dashboard IPN settings

### CORS errors
- Update `FRONTEND_URL` in `.env` to match your frontend URL

## Next Steps

- [ ] Add database integration (MongoDB/PostgreSQL)
- [ ] Implement booking storage
- [ ] Add authentication
- [ ] Implement escrow/payout system
- [ ] Add email notifications

