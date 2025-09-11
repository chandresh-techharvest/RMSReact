/**
 * Microsoft SSO Configuration Checker
 * Run this script to verify your MSAL configuration is properly set up
 */

import { msalConfig } from '../Utils/msalConfig';

export const checkMSALConfig = () => {
    const issues = [];

    // Check if client ID is configured
    if (!msalConfig.auth.clientId || !process.env.REACT_APP_CLIENT_ID) {
        issues.push('❌ Client ID not configured in .env file (REACT_APP_CLIENT_ID)');
    } else {
        console.log('✅ Client ID is configured from environment variables');
    }

    // Check if tenant ID is configured
    if (!process.env.REACT_APP_TENANT_ID || msalConfig.auth.authority.includes('undefined')) {
        issues.push('❌ Tenant ID not configured in .env file (REACT_APP_TENANT_ID)');
    } else {
        console.log('✅ Authority/Tenant ID is configured from environment variables');
    }

    // Check if redirect URI is set
    if (!msalConfig.auth.redirectUri) {
        issues.push('❌ Redirect URI not configured');
    } else {
        console.log('✅ Redirect URI is configured:', msalConfig.auth.redirectUri);
    }

    // Display results
    if (issues.length === 0) {
        console.log('🎉 All MSAL configuration checks passed!');
        console.log('📋 Configuration Summary:');
        console.log('   - Client ID:', process.env.REACT_APP_CLIENT_ID ? process.env.REACT_APP_CLIENT_ID.substring(0, 8) + '...' : 'Not set');
        console.log('   - Tenant ID:', process.env.REACT_APP_TENANT_ID ? process.env.REACT_APP_TENANT_ID.substring(0, 8) + '...' : 'Not set');
        console.log('   - Redirect URI:', msalConfig.auth.redirectUri);
        return true;
    } else {
        console.log('⚠️  Configuration Issues Found:');
        issues.forEach(issue => console.log(issue));
        console.log('\n📖 Please refer to Microsoft_SSO_Setup.md for configuration instructions');
        return false;
    }
};

// Usage example:
// import { checkMSALConfig } from './path/to/this/file';
// checkMSALConfig();