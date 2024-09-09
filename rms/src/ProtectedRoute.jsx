import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router'

function ProtectedRoute({ children }) {

  const [authenticated ,setAuthenticated] = useState(!!localStorage.getItem('token'))

  const user = useSelector((state) => state.user)
  const dispatch = useDispatch();

  const navigate = useNavigate()

  useEffect(() => {

    const checkToken = ()=>{
       dispatch(setAuthenticated({isAuthenticated:authenticated}))

       
    }
  }, [user])

  return children
}

export default ProtectedRoute