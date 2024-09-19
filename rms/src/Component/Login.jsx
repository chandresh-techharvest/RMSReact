import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { setAuthenticated } from '../Redux/Slice/userSlice';

function Login() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [message, setMessage] = useState({
        success: '',
        danger: ''
    })

    const handleValue = (e) => {
        e.preventDefault();

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('https://rsmapi.vercel.app/login', formData)

            console.log("role ", res.data.owner.role);


            setFormData({
                email: '',
                password: ''
            })

            if (res.data.user) {
                if (res.data.user.role === "SuperAdmin") {
                    localStorage.setItem('userId', res.data.user._id)
                    localStorage.setItem('role', res.data.user.role)
                    localStorage.setItem('token', res.data.token)

                    dispatch(setAuthenticated({ userId: res.data.user._id, isAuthenticated: !!res.data.token }))

                    setMessage({
                        ...message,
                        success: res.data.message
                    })

                    setTimeout(() => {
                        navigate('/dashboard')
                    }, 3000);
                }
            }
            else if (res.data.owner) {
                if (res.data.owner.role === "Owner") {
                    localStorage.setItem('ownerId', res.data.owner._id)
                    localStorage.setItem('role', res.data.owner.role)
                    localStorage.setItem('token', res.data.token)

                    dispatch(setAuthenticated({ ownerId: res.data.owner._id, isAuthenticated: !!res.data.token }))

                    setMessage({
                        ...message,
                        success: res.data.message
                    })

                    setTimeout(() => {
                        navigate('/dashboard')
                    }, 3000);
                }
            }

        } catch (error) {
            console.log(error);

            setMessage({
                ...message,
                danger: error.message

            })
        }
        finally {
            setTimeout(() => setMessage({
                success: '',
                danger: ''
            }), 3000)
        }
    }

    return (
        <>
            <div class="wrapper">
                <div class="title">
                    Login Form
                </div>
                <form onSubmit={handleSubmit}>
                    <div class="field">
                        <input type="email" name='email' value={formData.email} onChange={handleValue} required />
                        <label>Email Address</label>
                    </div>
                    <div class="field">
                        <input type="password" name='password' value={formData.password} onChange={handleValue} required />
                        <label>Password</label>
                    </div>
                    <div class="content">
                        <div class="checkbox">
                            <input type="checkbox" id="remember-me" />
                            <label for="remember-me">Remember me</label>
                        </div>
                        <div class="pass-link">
                            <a href="#">Forgot password?</a>
                        </div>
                    </div>
                    <div class="field">
                        <input type="submit" value="Login" />
                    </div>
                    <div class="signup-link">
                        Not a member? <Link to='register'>Signup now</Link>
                    </div>
                </form>
            </div>
            {
                message.success && (
                    <div class="alert alert-success" role="alert">
                        {message.success}
                    </div>
                )
            }
            {
                message.danger && (
                    <div class="alert alert-danger mt-3" role="alert">
                        {message.danger}
                    </div>
                )
            }
        </>

    )
}

export default Login