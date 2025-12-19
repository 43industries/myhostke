/**
 * Pesapal Setup Verification Script
 * Run this to check if your Pesapal credentials are configured correctly
 * 
 * Usage: node check-pesapal-setup.js
 */

import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkEnvVar(name, required = true) {
  const value = process.env[name];
  if (!value && required) {
    log(`❌ ${name} is not set`, 'red');
    return false;
  } else if (!value) {
    log(`⚠️  ${name} is not set (optional)`, 'yellow');
    return true;
  } else {
    log(`✅ ${name} is set`, 'green');
    return true;
  }
}

async function testPesapalAuth() {
  const consumerKey = process.env.PESAPAL_CONSUMER_KEY;
  const consumerSecret = process.env.PESAPAL_CONSUMER_SECRET;
  const environment = process.env.PESAPAL_ENVIRONMENT || 'sandbox';
  
  const baseURL = environment === 'sandbox' 
    ? 'https://cybqa.pesapal.com/pesapalv3'
    : 'https://pay.pesapal.com/v3';

  try {
    log('\n🔐 Testing Pesapal Authentication...', 'blue');
    
    const response = await axios.post(
      `${baseURL}/api/Auth/RequestToken`,
      null,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        auth: {
          username: consumerKey,
          password: consumerSecret
        }
      }
    );

    if (response.data.token) {
      log('✅ Successfully authenticated with Pesapal!', 'green');
      log(`   Token received: ${response.data.token.substring(0, 20)}...`, 'green');
      return true;
    } else {
      log('❌ Authentication failed: No token received', 'red');
      return false;
    }
  } catch (error) {
    log('❌ Authentication failed!', 'red');
    if (error.response) {
      log(`   Status: ${error.response.status}`, 'red');
      log(`   Error: ${JSON.stringify(error.response.data)}`, 'red');
    } else {
      log(`   Error: ${error.message}`, 'red');
    }
    return false;
  }
}

async function main() {
  log('\n' + '='.repeat(60), 'bold');
  log('🔍 Pesapal Setup Verification', 'bold');
  log('='.repeat(60) + '\n', 'bold');

  // Check environment variables
  log('📋 Checking Environment Variables:', 'blue');
  const checks = [
    checkEnvVar('PESAPAL_CONSUMER_KEY'),
    checkEnvVar('PESAPAL_CONSUMER_SECRET'),
    checkEnvVar('PESAPAL_ENVIRONMENT', false),
    checkEnvVar('BASE_URL', false),
    checkEnvVar('FRONTEND_URL', false),
    checkEnvVar('PESAPAL_IPN_ID', false)
  ];

  const allRequired = checks[0] && checks[1];
  
  if (!allRequired) {
    log('\n❌ Required environment variables are missing!', 'red');
    log('   Please check your .env file.', 'yellow');
    process.exit(1);
  }

  // Test authentication
  const authSuccess = await testPesapalAuth();

  // Summary
  log('\n' + '='.repeat(60), 'bold');
  if (authSuccess) {
    log('✅ Setup looks good! You can start using Pesapal.', 'green');
    log('\n📝 Next Steps:', 'blue');
    log('   1. Register your IPN URL (if not done)', 'yellow');
    log('   2. Add PESAPAL_IPN_ID to your .env file', 'yellow');
    log('   3. Start your backend server: npm start', 'yellow');
    log('   4. Test a payment in your app', 'yellow');
  } else {
    log('❌ Setup incomplete. Please fix the issues above.', 'red');
    log('\n💡 Tips:', 'blue');
    log('   - Double-check your Consumer Key and Secret', 'yellow');
    log('   - Make sure PESAPAL_ENVIRONMENT is "sandbox" or "live"', 'yellow');
    log('   - Verify your credentials match the environment', 'yellow');
  }
  log('='.repeat(60) + '\n', 'bold');
}

main().catch(console.error);

