/**
 * Backend Payment Integration Example
 * This is a template for integrating payment gateways (Pesapal, M-Pesa, etc.)
 * 
 * Choose one payment gateway based on your needs:
 * 1. Pesapal - Recommended for startups (no minimum revenue)
 * 2. M-Pesa Daraja API - Lowest fees, requires Safaricom account
 * 3. DPO Group - Good for hospitality sector
 * 4. Paystack - Modern, developer-friendly
 */

const express = require('express');
const router = express.Router();

// Import payment utilities
const { calculateBookingFees } = require('../src/utils/paymentUtils');

/**
 * Example: Pesapal Payment Integration
 * Documentation: https://developer.pesapal.com/
 */
async function initiatePesapalPayment(bookingData) {
  const { propertyId, checkIn, checkOut, guests, baseAmount, nights } = bookingData;
  
  // Calculate fees
  const fees = calculateBookingFees(baseAmount, nights);
  
  // Pesapal payment request
  const paymentData = {
    amount: fees.total,
    currency: 'KES',
    description: `Booking for ${nights} nights`,
    callback_url: `${process.env.BASE_URL}/payment/callback`,
    cancellation_url: `${process.env.BASE_URL}/payment/cancel`,
    notification_id: `booking_${Date.now()}`,
    billing_address: {
      // Guest billing details
    }
  };
  
  // Make API call to Pesapal
  // const response = await pesapalAPI.createOrder(paymentData);
  
  // Store booking in database with status 'pending_payment'
  // await saveBooking({
  //   ...bookingData,
  //   fees,
  //   paymentStatus: 'pending',
  //   pesapalOrderId: response.order_tracking_id
  // });
  
  return {
    paymentUrl: response.redirect_url,
    orderId: response.order_tracking_id
  };
}

/**
 * Example: M-Pesa Daraja API Integration
 * Documentation: https://developer.safaricom.co.ke/
 */
async function initiateMpesaPayment(bookingData) {
  const { phoneNumber, baseAmount, nights } = bookingData;
  
  // Calculate fees
  const fees = calculateBookingFees(baseAmount, nights);
  
  // M-Pesa STK Push
  const stkPushData = {
    BusinessShortCode: process.env.MPESA_SHORTCODE,
    Password: generatePassword(),
    Timestamp: new Date().toISOString(),
    TransactionType: 'CustomerPayBillOnline',
    Amount: fees.total,
    PartyA: phoneNumber,
    PartyB: process.env.MPESA_SHORTCODE,
    PhoneNumber: phoneNumber,
    CallBackURL: `${process.env.BASE_URL}/api/mpesa/callback`,
    AccountReference: `booking_${Date.now()}`,
    TransactionDesc: `MyHost booking payment`
  };
  
  // Make API call to M-Pesa
  // const response = await mpesaAPI.stkPush(stkPushData);
  
  return {
    checkoutRequestId: response.CheckoutRequestID,
    message: 'Payment prompt sent to your phone'
  };
}

/**
 * Payment Webhook Handler (Pesapal Example)
 * This endpoint receives payment status updates from Pesapal
 */
router.post('/payment/callback', async (req, res) => {
  try {
    const { OrderTrackingId, OrderMerchantReference, OrderNotificationType } = req.body;
    
    // Verify payment status with Pesapal
    // const paymentStatus = await pesapalAPI.getOrderStatus(OrderTrackingId);
    
    if (paymentStatus === 'COMPLETED') {
      // Update booking status to 'confirmed'
      // await updateBookingStatus(OrderMerchantReference, 'confirmed');
      
      // Hold funds in escrow (don't release to host yet)
      // Funds will be released after check-in completion
      
      res.status(200).json({ success: true });
    } else {
      // Payment failed or pending
      res.status(400).json({ success: false, message: 'Payment not completed' });
    }
  } catch (error) {
    console.error('Payment callback error:', error);
    res.status(500).json({ error: 'Payment processing error' });
  }
});

/**
 * Release Funds to Host (After Check-in)
 * This should be called after guest checks in or after a certain period
 */
async function releaseHostPayout(bookingId) {
  try {
    // Get booking details
    // const booking = await getBooking(bookingId);
    
    // Verify check-in has occurred
    // if (booking.status !== 'checked_in') {
    //   throw new Error('Guest has not checked in yet');
    // }
    
    // Calculate host payout (base amount - host fee)
    // const hostPayout = booking.fees.hostPayout;
    
    // Transfer to host's account via payment gateway
    // await pesapalAPI.transfer({
    //   amount: hostPayout,
    //   recipient: booking.host.bankAccount,
    //   reference: `payout_${bookingId}`
    // });
    
    // Update booking status
    // await updateBookingStatus(bookingId, 'completed');
    
    console.log(`Released KSh ${hostPayout} to host for booking ${bookingId}`);
  } catch (error) {
    console.error('Payout error:', error);
    throw error;
  }
}

/**
 * Refund Handler
 * Process refunds for cancellations
 */
async function processRefund(bookingId, refundAmount) {
  try {
    // Get booking details
    // const booking = await getBooking(bookingId);
    
    // Initiate refund via payment gateway
    // await pesapalAPI.refund({
    //   orderId: booking.paymentOrderId,
    //   amount: refundAmount
    // });
    
    // Update booking status
    // await updateBookingStatus(bookingId, 'cancelled');
    
    console.log(`Refunded KSh ${refundAmount} for booking ${bookingId}`);
  } catch (error) {
    console.error('Refund error:', error);
    throw error;
  }
}

module.exports = {
  initiatePesapalPayment,
  initiateMpesaPayment,
  releaseHostPayout,
  processRefund,
  router
};

