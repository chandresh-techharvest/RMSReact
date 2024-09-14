import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from 'react-router'
import { setAuthenticated } from './Redux/Slice/userSlice';

function ProtectedRoute({ children }) {

  const user = useSelector((state) => state.user)
  
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    dispatch(setAuthenticated({ isAuthenticated: !!token }));
  }, [dispatch]);

  return user.user.isAuthenticated ? children : <Navigate to='/' />
}

export default ProtectedRoute