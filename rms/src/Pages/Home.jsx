import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setAuthenticated } from '../Redux/Slice/userSlice';

function Home() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleLogout = (e) => {
        e.preventDefault();

        localStorage.removeItem('token')
        
        dispatch(setAuthenticated({isAuthenticated:!!localStorage.getItem('token')}))

        navigate('/')
    }

    return (
        <div>Home
            <br />
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Home