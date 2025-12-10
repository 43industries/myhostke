# Payment Solution for MyHost Platform

## Problem Statement
Flutterwave cannot onboard businesses below Kes 10 million. We need an alternative payment solution that supports:
- Split payment model (charge both host and guest)
- Platform collects payment first, then distributes to host
- Total fee structure around 22% (similar to Airbnb)
- Transparent pricing where guest sees total price including all fees

## Recommended Payment Gateways for Kenya

### 1. **Pesapal** (Recommended for Startups)
**Why Choose Pesapal:**
- ✅ No minimum revenue requirement
- ✅ Supports M-Pesa, Airtel Money, Visa, Mastercard
- ✅ Well-established in East Africa
- ✅ Easy integration with REST APIs
- ✅ Suitable for small to medium businesses
- ✅ Supports split payments and escrow

**Integration:**
- Use Pesapal's API for payment collection
- Implement escrow/hold funds feature
- Release funds to host after check-in completion

**Fees:** ~2.5-3% per transaction

### 2. **DPO Group (Direct Pay Online)**
**Why Choose DPO:**
- ✅ Good for hospitality/tourism sector
- ✅ Multi-currency support
- ✅ Mobile money + card payments
- ✅ Escrow capabilities

**Fees:** ~2.5-3.5% per transaction

### 3. **Paystack**
**Why Choose Paystack:**
- ✅ Developer-friendly APIs
- ✅ Modern infrastructure
- ✅ Expanding into Kenya
- ✅ Good documentation

**Fees:** ~2.5-3% per transaction

### 4. **Direct M-Pesa Integration (Safaricom Daraja API)**
**Why Choose M-Pesa:**
- ✅ Most trusted in Kenya
- ✅ No third-party fees (only Safaricom charges)
- ✅ Direct integration via Daraja API
- ✅ STK Push for seamless payments

**Fees:** ~0.5-1% per transaction (lowest fees)

**Note:** Requires Safaricom business account setup

## Payment Flow Architecture (Airbnb Model)

### How Airbnb/Booking.com Works:
1. **Guest pays total amount** to platform (includes all fees)
2. **Platform holds funds** in escrow
3. **After check-in/confirmation**, platform:
   - Keeps platform fee (from host)
   - Keeps platform fee (from guest)
   - Transfers remaining to host

### Fee Structure Recommendation:
```
Example: Property rate = KSh 5,000/night for 3 nights = KSh 15,000

Host Fee: 3% of base rate = KSh 450
Guest Fee: 19% of base rate = KSh 2,850
Total Platform Fee: KSh 3,300 (22% of base)

Guest Pays: KSh 15,000 + KSh 2,850 = KSh 17,850 (total)
Host Receives: KSh 15,000 - KSh 450 = KSh 14,550
Platform Keeps: KSh 3,300
```

### Alternative (Simpler - Host-Only Fee):
```
Guest Pays: KSh 15,000 (no additional fee shown)
Host Receives: KSh 11,700 (22% deducted)
Platform Keeps: KSh 3,300 (22% of base)
```

**Recommendation:** Use split fee model for transparency, but show total price to guest upfront.

## Implementation Strategy

### Phase 1: Frontend Implementation (Current)
- ✅ Calculate fees transparently
- ✅ Show total price breakdown
- ✅ Display fees to both guest and host

### Phase 2: Backend Integration
1. **Payment Gateway Setup:**
   - Choose Pesapal or M-Pesa Daraja API
   - Set up merchant account
   - Configure webhooks for payment notifications

2. **Payment Flow:**
   ```
   Guest clicks "Book Now"
   → Calculate total (base + guest fee)
   → Initiate payment via gateway
   → Store booking in "pending" state
   → On payment success: Move to "confirmed"
   → Hold funds in escrow
   → After check-in: Release funds to host (minus host fee)
   ```

3. **Database Schema:**
   ```sql
   Bookings:
   - booking_id
   - property_id
   - guest_id
   - check_in, check_out
   - base_amount
   - guest_fee
   - host_fee
   - total_amount (guest pays this)
   - host_payout (host receives this)
   - platform_fee
   - payment_status
   - booking_status
   ```

### Phase 3: Escrow & Payout
- Implement escrow system (hold funds)
- Automated payout to hosts after check-in
- Refund handling for cancellations

## Code Implementation

### Fee Calculation Logic:
```javascript
// Fee configuration
const FEE_CONFIG = {
  hostFeePercent: 3,    // 3% of base rate
  guestFeePercent: 19,   // 19% of base rate
  totalFeePercent: 22    // Total platform fee
};

function calculateBookingFees(baseAmount, nights) {
  const subtotal = baseAmount * nights;
  const hostFee = subtotal * (FEE_CONFIG.hostFeePercent / 100);
  const guestFee = subtotal * (FEE_CONFIG.guestFeePercent / 100);
  const total = subtotal + guestFee;
  const hostPayout = subtotal - hostFee;
  const platformFee = hostFee + guestFee;
  
  return {
    subtotal,
    hostFee,
    guestFee,
    total,
    hostPayout,
    platformFee
  };
}
```

## Next Steps

1. **Choose Payment Gateway:**
   - Start with Pesapal (easiest for small businesses)
   - Or M-Pesa Daraja API (lowest fees, more setup)

2. **Set up Backend:**
   - Create Node.js/Express API
   - Implement booking endpoints
   - Integrate payment gateway

3. **Implement Escrow:**
   - Use payment gateway's escrow feature
   - Or implement manual hold/release logic

4. **Testing:**
   - Test with sandbox/test accounts
   - Verify fee calculations
   - Test refund flows

## Compliance & Legal

- Ensure fee structure is clearly communicated
- Comply with Kenyan payment regulations
- Set up proper accounting for platform fees
- Consider tax implications of platform revenue

