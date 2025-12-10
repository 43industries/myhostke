/**
 * Payment Utilities for MyHost Platform
 * Implements Airbnb-style split fee model
 */

// Fee configuration (similar to Airbnb)
export const FEE_CONFIG = {
  hostFeePercent: 3,      // 3% of base rate (deducted from host payout)
  guestFeePercent: 19,     // 19% of base rate (added to guest total)
  totalFeePercent: 22      // Total platform fee
};

/**
 * Calculate booking fees using split fee model
 * @param {number} baseAmount - Base nightly rate
 * @param {number} nights - Number of nights
 * @returns {Object} Fee breakdown
 */
export const calculateBookingFees = (baseAmount, nights) => {
  if (!baseAmount || !nights || nights <= 0) {
    return {
      subtotal: 0,
      hostFee: 0,
      guestFee: 0,
      total: 0,
      hostPayout: 0,
      platformFee: 0,
      nights: 0
    };
  }

  const subtotal = baseAmount * nights;
  const hostFee = Math.round(subtotal * (FEE_CONFIG.hostFeePercent / 100));
  const guestFee = Math.round(subtotal * (FEE_CONFIG.guestFeePercent / 100));
  const total = subtotal + guestFee;
  const hostPayout = subtotal - hostFee;
  const platformFee = hostFee + guestFee;
  
  return {
    subtotal,
    hostFee,
    guestFee,
    total,
    hostPayout,
    platformFee,
    nights
  };
};

/**
 * Calculate number of nights between two dates
 * @param {string} checkIn - Check-in date (YYYY-MM-DD)
 * @param {string} checkOut - Check-out date (YYYY-MM-DD)
 * @returns {number} Number of nights
 */
export const calculateNights = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 0;
  
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  
  if (end <= start) return 0;
  
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

/**
 * Format currency for display
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: KSh)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'KSh') => {
  return `${currency} ${amount.toLocaleString('en-KE')}`;
};

/**
 * Validate booking dates
 * @param {string} checkIn - Check-in date
 * @param {string} checkOut - Check-out date
 * @returns {Object} Validation result
 */
export const validateBookingDates = (checkIn, checkOut) => {
  const errors = [];
  
  if (!checkIn) {
    errors.push('Check-in date is required');
  }
  
  if (!checkOut) {
    errors.push('Check-out date is required');
  }
  
  if (checkIn && checkOut) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (start < today) {
      errors.push('Check-in date cannot be in the past');
    }
    
    if (end <= start) {
      errors.push('Check-out date must be after check-in date');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

