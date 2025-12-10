# Backend Payment Integration Guide

This directory contains example code for integrating payment gateways with the MyHost platform.

## Payment Flow

1. **Guest initiates booking** → Frontend calculates fees
2. **Payment request sent** → Backend initiates payment via gateway
3. **Guest pays total amount** → Payment gateway processes
4. **Webhook received** → Backend confirms payment, holds funds
5. **After check-in** → Backend releases funds to host (minus host fee)

## Recommended Payment Gateway: Pesapal

### Why Pesapal?
- ✅ No minimum revenue requirement
- ✅ Supports M-Pesa, cards, mobile money
- ✅ Escrow capabilities
- ✅ Easy integration

### Setup Steps:

1. **Create Pesapal Account**
   - Visit: https://www.pesapal.com/
   - Sign up for merchant account
   - Get API credentials (Consumer Key & Secret)

2. **Install Pesapal SDK**
   ```bash
   npm install pesapal-node
   ```

3. **Configure Environment Variables**
   ```env
   PESAPAL_CONSUMER_KEY=your_consumer_key
   PESAPAL_CONSUMER_SECRET=your_consumer_secret
   PESAPAL_ENVIRONMENT=sandbox  # or 'live' for production
   BASE_URL=https://yourdomain.com
   ```

4. **Implement Payment Endpoint**
   ```javascript
   // See payment-integration.js for example
   ```

5. **Set up Webhooks**
   - Configure webhook URL in Pesapal dashboard
   - Handle payment status updates

## Alternative: M-Pesa Daraja API

### Setup Steps:

1. **Create Safaricom Developer Account**
   - Visit: https://developer.safaricom.co.ke/
   - Register and create app
   - Get Consumer Key & Secret

2. **Install Daraja SDK**
   ```bash
   npm install mpesa-node
   ```

3. **Configure Environment Variables**
   ```env
   MPESA_CONSUMER_KEY=your_consumer_key
   MPESA_CONSUMER_SECRET=your_consumer_secret
   MPESA_SHORTCODE=your_business_shortcode
   MPESA_PASSKEY=your_passkey
   MPESA_ENVIRONMENT=sandbox  # or 'production'
   ```

## Database Schema

```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY,
  property_id UUID NOT NULL,
  guest_id UUID NOT NULL,
  host_id UUID NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INTEGER NOT NULL,
  base_amount DECIMAL(10,2) NOT NULL,
  host_fee DECIMAL(10,2) NOT NULL,
  guest_fee DECIMAL(10,2) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  host_payout DECIMAL(10,2) NOT NULL,
  platform_fee DECIMAL(10,2) NOT NULL,
  payment_status VARCHAR(20) DEFAULT 'pending',
  booking_status VARCHAR(20) DEFAULT 'pending',
  payment_order_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Testing

1. Use sandbox/test credentials
2. Test payment flow end-to-end
3. Verify fee calculations
4. Test refund scenarios
5. Test webhook handling

## Production Checklist

- [ ] Switch to production API credentials
- [ ] Set up proper error handling
- [ ] Implement logging
- [ ] Set up monitoring/alerts
- [ ] Configure SSL certificates
- [ ] Set up database backups
- [ ] Implement rate limiting
- [ ] Add authentication/authorization
- [ ] Set up escrow system
- [ ] Configure automated payouts

