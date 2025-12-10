import express from 'express';
import { pesapalService } from '../services/pesapalService.js';

const router = express.Router();

/**
 * POST /api/pesapal/initiate
 * Initiate a payment with Pesapal
 */
router.post('/initiate', async (req, res) => {
  try {
    const {
      propertyId,
      checkIn,
      checkOut,
      guests,
      baseAmount,
      nights,
      customerEmail,
      customerPhone,
      customerFirstName,
      customerLastName
    } = req.body;

    // Validate required fields
    if (!propertyId || !checkIn || !checkOut || !baseAmount || !nights) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['propertyId', 'checkIn', 'checkOut', 'baseAmount', 'nights']
      });
    }

    // Calculate fees (import from frontend utils or recalculate)
    const subtotal = baseAmount * nights;
    const guestFee = Math.round(subtotal * 0.19); // 19% guest fee
    const total = subtotal + guestFee;

    // Generate unique order ID
    const orderId = `MYHOST-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Prepare order data
    const orderData = {
      orderId,
      amount: total,
      currency: 'KES',
      description: `MyHost booking for ${nights} night(s) - Property ID: ${propertyId}`,
      callbackUrl: `${process.env.FRONTEND_URL}/booking/success?orderId=${orderId}`,
      cancellationUrl: `${process.env.FRONTEND_URL}/booking/cancel?orderId=${orderId}`,
      customerEmail: customerEmail || 'guest@myhost.com',
      customerPhone: customerPhone || null,
      customerFirstName: customerFirstName || 'Guest',
      customerLastName: customerLastName || 'User',
      countryCode: 'KE'
    };

    // Submit order to Pesapal
    const paymentResponse = await pesapalService.submitOrder(orderData);

    // TODO: Save booking to database with status 'pending_payment'
    // await saveBooking({
    //   orderId,
    //   propertyId,
    //   checkIn,
    //   checkOut,
    //   guests,
    //   baseAmount,
    //   nights,
    //   subtotal,
    //   guestFee,
    //   total,
    //   pesapalOrderTrackingId: paymentResponse.orderTrackingId,
    //   paymentStatus: 'pending',
    //   bookingStatus: 'pending_payment'
    // });

    res.json({
      success: true,
      orderId,
      orderTrackingId: paymentResponse.orderTrackingId,
      redirectUrl: paymentResponse.redirectUrl,
      message: 'Payment initiated successfully'
    });
  } catch (error) {
    console.error('Error initiating payment:', error);
    res.status(500).json({
      error: 'Failed to initiate payment',
      message: error.message
    });
  }
});

/**
 * GET /api/pesapal/status/:orderTrackingId
 * Check payment status
 */
router.get('/status/:orderTrackingId', async (req, res) => {
  try {
    const { orderTrackingId } = req.params;

    if (!orderTrackingId) {
      return res.status(400).json({ error: 'Order tracking ID is required' });
    }

    const status = await pesapalService.getPaymentStatus(orderTrackingId);

    res.json({
      success: true,
      ...status
    });
  } catch (error) {
    console.error('Error checking payment status:', error);
    res.status(500).json({
      error: 'Failed to check payment status',
      message: error.message
    });
  }
});

/**
 * GET /api/pesapal/ipn
 * Instant Payment Notification (IPN) endpoint
 * Pesapal calls this when payment status changes
 */
router.get('/ipn', async (req, res) => {
  try {
    const {
      OrderTrackingId,
      OrderMerchantReference,
      OrderNotificationType
    } = req.query;

    console.log('IPN received:', {
      OrderTrackingId,
      OrderMerchantReference,
      OrderNotificationType
    });

    // Get payment status from Pesapal
    const paymentStatus = await pesapalService.getPaymentStatus(OrderTrackingId);

    // TODO: Update booking status in database
    // if (paymentStatus.paymentStatus === 'COMPLETED') {
    //   await updateBookingStatus(OrderMerchantReference, {
    //     paymentStatus: 'completed',
    //     bookingStatus: 'confirmed',
    //     paidAt: new Date()
    //   });
    // } else if (paymentStatus.paymentStatus === 'FAILED') {
    //   await updateBookingStatus(OrderMerchantReference, {
    //     paymentStatus: 'failed',
    //     bookingStatus: 'cancelled'
    //   });
    // }

    // Respond to Pesapal (required)
    res.status(200).send('OK');
  } catch (error) {
    console.error('Error processing IPN:', error);
    // Still respond OK to prevent Pesapal from retrying immediately
    res.status(200).send('OK');
  }
});

/**
 * POST /api/pesapal/register-ipn
 * Register IPN URL (run once during setup)
 */
router.post('/register-ipn', async (req, res) => {
  try {
    const ipnId = await pesapalService.registerIPN();
    
    res.json({
      success: true,
      ipnId,
      message: 'IPN registered successfully. Add PESAPAL_IPN_ID to your .env file'
    });
  } catch (error) {
    console.error('Error registering IPN:', error);
    res.status(500).json({
      error: 'Failed to register IPN',
      message: error.message
    });
  }
});

export { router as pesapalRouter };

