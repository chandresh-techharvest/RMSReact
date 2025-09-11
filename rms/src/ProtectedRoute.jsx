import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Navigate } from 'react-router'
import { setAuthenticated } from "./Redux/Slice/userSlice"
import { useMsal } from "@azure/msal-react"

function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const { accounts } = useMsal()

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    const ownerId = localStorage.getItem('ownerId')
    const clientId = localStorage.getItem('clientId')
    const token = localStorage.getItem('token')
    const authType = localStorage.getItem('authType')
    const role = localStorage.getItem('role')

    // Check for SSO authentication
    if (authType === 'SSO' && accounts.length > 0 && token) {
      dispatch(setAuthenticated({ userId: userId, isAuthenticated: true }))
    }
    // Check for traditional authentication
    else if (token && role) {
      if (role === "SuperAdmin") {
        dispatch(setAuthenticated({ userId: userId, isAuthenticated: !!token }))
      } else if (role === "Owner") {
        dispatch(setAuthenticated({ ownerId: ownerId, isAuthenticated: !!token }))
      } else if (role === "ClientMaster") {
        dispatch(setAuthenticated({ clientId: clientId, isAuthenticated: !!token }))
      }
    }
  }, [dispatch, accounts])

  return user.user.isAuthenticated ? children : <Navigate to='/' />
}

export default ProtectedRoute