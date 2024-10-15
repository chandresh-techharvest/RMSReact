import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAuthenticated } from "../Redux/Slice/userSlice";

function ForgotPassword() {
    

    const [formData, setFormData] = useState({
        email: "",
    });

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

            const res = await axios.post(
                "http://localhost:4000/forgot-password",
                formData
            );

            setFormData({
                email:"",
            });
            setMessage({
                ...message,
                success: res.data,
            });
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
            <div className="wrapper">
                <div className="title">Forgot-Password</div>
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleValue}
                            required
                        />
                        <label>Email Address</label>
                    </div>
                    <div className="field">
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>
            {message.success && (
                <div className="alert alert-success mt-3" role="alert">
                    {message.success}
                </div>
            )}
            {message.danger && (
                <div className="alert alert-danger mt-3" role="alert">
                    {message.danger}
                </div>
            )}
        </>
    )
}

export default ForgotPassword