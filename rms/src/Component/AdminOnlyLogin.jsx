import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAuthenticated } from "../Redux/Slice/userSlice";
import signIn from '../assets/images/logo.png';
import SSOLogin from './SSOLogin';
import '../styles/floating-animations.css';

function AdminOnlyLogin() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [message, setMessage] = useState({
        success: "",
        danger: "",
    });

    const handleValue = (e) => {
        e.preventDefault();

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Admin login logic would go here
            // For now, we'll keep it simple since the main admin login is through SSO
            console.log("Admin login attempted");
        } catch (error) {
            setMessage({
                ...message,
                danger: error.message,
            });

            setFormData({
                email: "",
                password: "",
            });
        } finally {
            setTimeout(
                () =>
                    setMessage({
                        success: "",
                        danger: "",
                    }),
                3000
            );
        }
    };

    return (
        <>
            <section className="login-content">
                <div className="container">
                    <div className="row align-items-center justify-content-center height-self-center">
                        <div className="col-lg-8">
                            <div className="card auth-card">
                                <div className="card-body p-0">
                                    <div className="d-flex align-items-center auth-content">
                                        <div className="col-lg-7 align-self-center">
                                            <div className="p-3">
                                                <h2 className="mb-2">Admin Sign In</h2>
                                                <p>Login to stay connected.</p>
                                                <div>
                                                    <SSOLogin />
                                                    <p className="text-center mt-3 text-muted">
                                                        Use your Microsoft account to sign in as Admin
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-5 content-right">
                                            <img
                                                src={signIn}
                                                className="img-fluid image-right floating-logo"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {message.success && (
                                <div class="alert alert-success mt-3" role="alert">
                                    {message.success}
                                </div>
                            )}
                            {message.danger && (
                                <div class="alert alert-danger mt-3" role="alert">
                                    {message.danger}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AdminOnlyLogin;