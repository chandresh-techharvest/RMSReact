import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from 'react-router'
import { setAuthenticated } from './Redux/Slice/userSlice';

function ProtectedRoute({ children }) {

  const user = useSelector((state) => state.user)
  
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token');
    dispatch(setAuthenticated({userId:userId, isAuthenticated: !!token }));
  }, [dispatch]);

  return user.user.isAuthenticated ? children : <Navigate to='/' />
}

export default ProtectedRoute