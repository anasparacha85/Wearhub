import React, { useEffect } from 'react'
import { useAuth } from '../Store/Auth'
import { Navigate } from 'react-router-dom'
import { LogoutTrue } from '../Slices/AuthSLice'
import { useDispatch } from 'react-redux'

const Logout = () => {
const dispatch=useDispatch()
    useEffect(()=>{
       dispatch(LogoutTrue())
    //    window.location.reload()
    },[dispatch])
    return <Navigate to="/"/>
 
}

export default Logout
