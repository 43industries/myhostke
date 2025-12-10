import axios from 'axios';
import crypto from 'crypto';

/**
 * Pesapal Payment Service
 * Handles all Pesapal API interactions
 */

class PesapalService {
  constructor() {
    this.consumerKey = process.env.PESAPAL_CONSUMER_KEY;
    this.consumerSecret = process.env.PESAPAL_CONSUMER_SECRET;
    this.environment = process.env.PESAPAL_ENVIRONMENT || 'sandbox';
    
    // Set base URL based on environment
    this.baseURL = this.environment === 'sandbox' 
      ? 'https://cybqa.pesapal.com/pesapalv3'
      : 'https://pay.pesapal.com/v3';
    
    this.accessToken = null;
    this.tokenExpiry = null;
  }

  /**
   * Get OAuth access token from Pesapal
   */
  async getAccessToken() {
    // Check if we have a valid token
    if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const response = await axios.post(
        `${this.baseURL}/api/Auth/RequestToken`,
        null,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          auth: {
            username: this.consumerKey,
            password: this.consumerSecret
          }
        }
      );

      this.accessToken = response.data.token;
      // Token expires in 1 hour, refresh 5 minutes before
      this.tokenExpiry = Date.now() + (55 * 60 * 1000);
      
      return this.accessToken;
    } catch (error) {
      console.error('Error getting Pesapal access token:', error.response?.data || error.message);
      throw new Error('Failed to authenticate with Pesapal');
    }
  }

  /**
   * Register IPN (Instant Payment Notification) URL
   * This should be done once during setup
   */
  async registerIPN() {
    try {
      const token = await this.getAccessToken();
      const ipnUrl = `${process.env.BASE_URL}/api/pesapal/ipn`;
      
      const response = await axios.post(
        `${this.baseURL}/api/URLSetup/RegisterIPN`,
        {
          url: ipnUrl,
          ipn_notification_type: 'GET'
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      return response.data.ipn_id;
    } catch (error) {
      console.error('Error registering IPN:', error.response?.data || error.message);
      throw new Error('Failed to register IPN URL');
    }
  }

  /**
   * Submit payment order to Pesapal
   * @param {Object} orderData - Order details
   * @returns {Object} Payment response with redirect URL
   */
  async submitOrder(orderData) {
    try {
      const token = await this.getAccessToken();
      const ipnId = process.env.PESAPAL_IPN_ID; // Should be set after registering IPN
      
      const order = {
        id: orderData.orderId,
        currency: orderData.currency || 'KES',
        amount: orderData.amount,
        description: orderData.description,
        callback_url: orderData.callbackUrl,
        cancellation_url: orderData.cancellationUrl,
        notification_id: ipnId,
        billing_address: {
          email_address: orderData.customerEmail,
          phone_number: orderData.customerPhone || null,
          country_code: orderData.countryCode || 'KE',
          first_name: orderData.customerFirstName || '',
          middle_name: '',
          last_name: orderData.customerLastName || '',
          line_1: orderData.billingAddress?.line1 || '',
          line_2: orderData.billingAddress?.line2 || '',
          city: orderData.billingAddress?.city || '',
          state: orderData.billingAddress?.state || '',
          postal_code: orderData.billingAddress?.postalCode || '',
          zip_code: orderData.billingAddress?.zipCode || ''
        }
      };

      const response = await axios.post(
        `${this.baseURL}/api/Transactions/SubmitOrderRequest`,
        order,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      return {
        orderTrackingId: response.data.order_tracking_id,
        redirectUrl: response.data.redirect_url,
        merchantReference: response.data.merchant_reference
      };
    } catch (error) {
      console.error('Error submitting Pesapal order:', error.response?.data || error.message);
      throw new Error('Failed to submit payment order');
    }
  }

  /**
   * Get payment status from Pesapal
   * @param {string} orderTrackingId - Order tracking ID
   * @returns {Object} Payment status
   */
  async getPaymentStatus(orderTrackingId) {
    try {
      const token = await this.getAccessToken();
      
      const response = await axios.get(
        `${this.baseURL}/api/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        }
      );

      return {
        paymentStatus: response.data.payment_status_description,
        paymentMethod: response.data.payment_method,
        amount: response.data.amount,
        currency: response.data.currency,
        merchantReference: response.data.merchant_reference,
        orderTrackingId: response.data.order_tracking_id
      };
    } catch (error) {
      console.error('Error getting payment status:', error.response?.data || error.message);
      throw new Error('Failed to get payment status');
    }
  }
}

// Export singleton instance
export const pesapalService = new PesapalService();

