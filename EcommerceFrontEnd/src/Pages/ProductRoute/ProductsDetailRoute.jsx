import React, { useEffect } from 'react'
import { useAuth } from '../../Store/Auth'
import { useLocation, useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
const ProductsDetailRoute = () => {
 const JwtToken=useSelector((state)=>state.auth.JwtToken)
  const navigate=useNavigate()
  const location=useLocation()
  useEffect(()=>{
    if(!JwtToken){
        navigate(location.state?.from ,{replace:true})
      }
  },[JwtToken,navigate,location])
  return(
    <>
    <Outlet/>
    </>
  )
}

export default ProductsDetailRoute
