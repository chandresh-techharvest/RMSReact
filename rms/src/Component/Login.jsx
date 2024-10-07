import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { setAuthenticated } from '../Redux/Slice/userSlice';

function Login() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name:'',
        email: '',
        password: '',
    })

    const [check, setCheck] = useState('SuperAdmin');

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

            if (check === 'SuperAdmin') {
                const res = await axios.post('https://rsmapi.vercel.app/login', formData)

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
            }
            else if (check === 'OwnerMaster') {

                const res = await axios.post('https://rsmapi.vercel.app/ownermasterlogin', formData)

                setFormData({
                    name: '',
                    email: '',
                    password: ''
                })

                if (res.data.OwnerMaster) {
                    if (res.data.OwnerMaster.role === "Owner") {
                        localStorage.setItem('ownerId', res.data.OwnerMaster._id)
                        localStorage.setItem('role', res.data.OwnerMaster.role)
                        localStorage.setItem('token', res.data.token)

                        dispatch(setAuthenticated({ ownerId: res.data.OwnerMaster._id, isAuthenticated: !!res.data.token }))

                        setMessage({
                            ...message,
                            success: res.data.message
                        })

                        setTimeout(() => {
                            navigate('/dashboard')
                        }, 3000);
                    }
                }
            }

        } catch (error) {

            setMessage({
                ...message,
                danger: error.message

            })

            setFormData({
                name:'',
                email: '',
                password: ''
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
            <input type='radio' value='SuperAdmin' checked={check === 'SuperAdmin'} onChange={() => setCheck('SuperAdmin')} style={{ margin: '5px' }} /> SuperAdmin &nbsp;

            <input type='radio' value="OwnerMaster" checked={check === 'OwnerMaster'} onChange={() => setCheck('OwnerMaster')} /> OwnerMaster
            <div className="wrapper">
                <div className="title">
                    Login Form
                </div>
                {
                    check === 'SuperAdmin' ? (<form onSubmit={handleSubmit}>
                        <div className="field">
                            <input type="email" name='email' value={formData.email} onChange={handleValue} required />
                            <label>Email Address</label>
                        </div>
                        <div className="field">
                            <input type="password" name='password' value={formData.password} onChange={handleValue} required />
                            <label>Password</label>
                        </div>
                        <div className="content">
                            <div className="checkbox">
                                <input type="checkbox" id="remember-me" />
                                <label for="remember-me">Remember me</label>
                            </div>
                            <div className="pass-link">
                                <a href="#">Forgot password?</a>
                            </div>
                        </div>
                        <div className="field">
                            <input type="submit" value="Login" />
                        </div>
                        <div className="signup-link">
                            Not a member? <Link to='register'>Signup now</Link>
                        </div>
                    </form>) : (
                        <form onSubmit={handleSubmit}>
                            <div className="field">
                                <input type="text" name='name' value={formData.name} onChange={handleValue} required />
                                <label>Name</label>
                            </div>
                            <div className="field">
                                <input type="email" name='email' value={formData.email} onChange={handleValue} required />
                                <label>Email Address</label>
                            </div>
                            <div className="field">
                                <input type="password" name='password' value={formData.password} onChange={handleValue} required />
                                <label>Password</label>
                            </div>
                            <div className="content">
                                <div className="checkbox">
                                    <input type="checkbox" id="remember-me" />
                                    <label for="remember-me">Remember me</label>
                                </div>
                                <div className="pass-link">
                                    <a href="#">Forgot password?</a>
                                </div>
                            </div>
                            <div className="field">
                                <input type="submit" value="Login" />
                            </div>
                        </form>
                    )
                }
            </div>
            {
                message.success && (
                    <div className="alert alert-success mt-3" role="alert">
                        {message.success}
                    </div>
                )
            }
            {
                message.danger && (
                    <div className="alert alert-danger mt-3" role="alert">
                        {message.danger}
                    </div>
                )
            }
        </>

    )
}

export default Login