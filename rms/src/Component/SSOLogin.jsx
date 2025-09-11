import React, { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../Utils/msalConfig";
import { callMsGraph } from "../Utils/graphApiUtils";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthenticated } from "../Redux/Slice/userSlice";
import axios from "axios";
import '../styles/floating-animations.css';

function SSOLogin() {
    const { instance, accounts } = useMsal();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleMicrosoftLogin = async () => {
        setLoading(true);
        setError("");

        try {
            // Trigger the login popup
            const loginResponse = await instance.loginPopup(loginRequest);

            if (loginResponse && loginResponse.account) {
                // Get access token
                const tokenRequest = {
                    ...loginRequest,
                    account: loginResponse.account,
                };

                const tokenResponse = await instance.acquireTokenSilent(tokenRequest);

                // Call Microsoft Graph to get user profile
                const userProfile = await callMsGraph(tokenResponse.accessToken);

                if (userProfile) {
                    // Exchange Microsoft token for backend JWT
                    const exchangeResponse = await axios.post(
                        "https://rsmapi.vercel.app/auth/sso-exchange",
                        {
                            microsoftToken: tokenResponse.accessToken,
                            userProfile: userProfile
                        }
                    );

                    if (exchangeResponse.data.token) {
                        // Store backend authentication information
                        localStorage.setItem("userId", exchangeResponse.data.user._id);
                        localStorage.setItem("role", exchangeResponse.data.user.role);
                        localStorage.setItem("token", exchangeResponse.data.token); // Backend JWT token
                        localStorage.setItem("userEmail", exchangeResponse.data.user.email);
                        localStorage.setItem("userName", exchangeResponse.data.user.name);
                        localStorage.setItem("authType", "SSO");
                        localStorage.setItem("ssoId", exchangeResponse.data.ssoId);

                        // Update Redux state
                        dispatch(
                            setAuthenticated({
                                userId: exchangeResponse.data.user._id,
                                isAuthenticated: true,
                            })
                        );

                        // Navigate to dashboard
                        setTimeout(() => {
                            navigate("/dashboard");
                        }, 1000);
                    }
                }
            }
        } catch (error) {
            console.error("Microsoft SSO Login Error:", error);
            if (error.response?.status === 401) {
                setError("Microsoft authentication failed. Please try again.");
            } else if (error.response?.status === 500) {
                setError("Server error during authentication. Please contact support.");
            } else {
                setError("Failed to login with Microsoft. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await instance.logoutPopup();
            localStorage.clear();
            dispatch(
                setAuthenticated({
                    userId: null,
                    isAuthenticated: false,
                })
            );
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const isAuthenticated = accounts.length > 0;

    return (
        <div className="sso-login-container">
            {!isAuthenticated ? (
                <div>
                    <button
                        type="button"
                        className="btn btn-primary btn-block microsoft-sso-btn"
                        onClick={handleMicrosoftLogin}
                        disabled={loading}
                        style={{
                            backgroundColor: "#0078d4",
                            borderColor: "#0078d4",
                            padding: "12px 24px",
                            fontSize: "16px",
                            borderRadius: "4px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            width: "100%",
                            marginBottom: "10px"
                        }}
                    >
                        {loading ? (
                            <span>Signing in...</span>
                        ) : (
                            <>
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 21 21"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="microsoft-logo-float"
                                >
                                    <rect x="1" y="1" width="9" height="9" fill="#f25022" />
                                    <rect x="12" y="1" width="9" height="9" fill="#00a4ef" />
                                    <rect x="1" y="12" width="9" height="9" fill="#ffb900" />
                                    <rect x="12" y="12" width="9" height="9" fill="#7fba00" />
                                </svg>
                                Sign in with Microsoft
                            </>
                        )}
                    </button>
                    {error && (
                        <div className="alert alert-danger mt-2" role="alert">
                            {error}
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <p>Welcome, {accounts[0].name}!</p>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleLogout}
                    >
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    );
}

export default SSOLogin;