/**
 * Azure AD Redirect URI Diagnostic Tool
 * Run this in your browser console to check current MSAL configuration
 */

export const diagnoseRedirectURI = () => {
    console.log('🔍 Azure AD Redirect URI Diagnostics');
    console.log('=====================================');

    // Check environment variables
    console.log('📋 Environment Variables:');
    console.log('  REACT_APP_CLIENT_ID:', process.env.REACT_APP_CLIENT_ID || 'NOT SET');
    console.log('  REACT_APP_TENANT_ID:', process.env.REACT_APP_TENANT_ID || 'NOT SET');
    console.log('  REACT_APP_REDIRECT_URI:', process.env.REACT_APP_REDIRECT_URI || 'NOT SET');

    // Check current URL
    console.log('\n🌐 Current Application:');
    console.log('  Current URL:', window.location.href);
    console.log('  Origin:', window.location.origin);
    console.log('  Protocol:', window.location.protocol);
    console.log('  Host:', window.location.host);

    // Import and check MSAL config
    import('./msalConfig').then(({ msalConfig }) => {
        console.log('\n⚙️ MSAL Configuration:');
        console.log('  Client ID:', msalConfig.auth.clientId);
        console.log('  Authority:', msalConfig.auth.authority);
        console.log('  Redirect URI:', msalConfig.auth.redirectUri);
        console.log('  Post Logout URI:', msalConfig.auth.postLogoutRedirectUri);

        console.log('\n✅ Recommended Azure AD Settings:');
        console.log('  Platform Type: Single-page application (SPA)');
        console.log('  Redirect URIs to add in Azure Portal:');
        console.log('    - http://localhost:3000');
        console.log('    - http://localhost:3000/');
        console.log('    - http://localhost:3000/dashboard');
        console.log('    - https://localhost:3000 (if using HTTPS)');

        console.log('\n🔗 Azure Portal Link:');
        console.log('  https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/~/Authentication/appId/' + msalConfig.auth.clientId);
    }).catch(error => {
        console.error('❌ Error loading MSAL config:', error);
    });

    return 'Diagnostics complete - check console output above';
};

// Usage: Add this to any React component and call diagnoseRedirectURI()
// Or run in browser console: diagnoseRedirectURI()