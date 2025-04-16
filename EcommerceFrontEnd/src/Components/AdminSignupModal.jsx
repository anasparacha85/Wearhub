import React, { useEffect } from "react";
import { useAuth } from "../Store/Auth";
import { useState } from "react";
import LoginModel from "./LoginModel";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import Aos from "aos";
import "aos/dist/aos.css"
import { RegisterAdmin } from "../Slices/AuthSLice";
import { useDispatch, useSelector } from "react-redux";
const AdminSignupModal = () => {
  useEffect(()=>{
    Aos.init()
  },[])
    const {isAdminSignupOpen,isSignupOpen,isloginopen,setSignupOpen,setisAdminSignupOpen,setisloginopen}=useAuth()
 
 
  const [user, setuser] = useState({name:"",email:"",password:"",ConfirmPassword:"",AdminKey:""})
  const onchange=(e)=>{
    const {name,value}=e.target;
    setuser({...user,[name]:value})

  }
  const onAdminSignupClose=()=>{
    setisAdminSignupOpen(false)
  }
  const dispatch=useDispatch()
  const authstate=useSelector((state)=>state.auth)
  console.log(authstate);
  
   const {loading,error}=authstate
 

  const onsubmit=(e)=>{
    e.preventDefault();
  dispatch(RegisterAdmin(user))
  .unwrap()
  .then((data)=>{
   if(data.SuccessMessage){
    toast.success(data.SuccessMessage)
    setuser({name:"",email:"",password:"",ConfirmPassword:"",AdminKey:""})
    setisAdminSignupOpen(false)
    setisloginopen(true)
   }
   if(data.FailureMessage){
    toast.error(data.FailureMessage)
   }
    
  }).catch((error)=>{
    console.log(error);
    
  })
    
  }
  if (!isAdminSignupOpen) return null;

  return (
    <div id="hel" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 " 
    >
    
      <div className="bg-gray-900 rounded-lg w-[500px] p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onAdminSignupClose}
        >
          ✕
        </button>
        <h2 className="text-3xl font-bold text-center text-gray-200 mb-2">Sign up as User</h2>
        <div className="w-full text-center mb-6"> <button className="text-red-600  bg-transparent " onClick={()=>{setisAdminSignupOpen(false);setSignupOpen(true)}}>Switch to User Sign Up  </button></div>
          
          <form onSubmit={onsubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full text-gray-100 px-3 py-2 border border-gray-500 bg-transparent rounded-md shadow-sm focus:outline-none focus:ring-red-800 focus:border-gray-800 sm:text-sm"
                placeholder="Enter your full name"
                required
                value={user.name}
                onChange={onchange}
                min={3} 
                max={30}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                className="mt-1 block w-full px-3 text-gray-100  py-2 border border-gray-500 bg-transparent rounded-md shadow-sm focus:outline-none focus:ring-red-800 focus:border-gray-800 sm:text-sm"
                placeholder="Enter your email"
                required
                onChange={onchange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={user.password}
className="mt-1 block w-full px-3 py-2 border border-gray-500 text-gray-100  bg-transparent rounded-md shadow-sm focus:outline-none focus:ring-red-800 focus:border-gray-800 sm:text-sm"
                placeholder="Create a password"
                required
                onChange={onchange}
                min={7}
                
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">Confirm Password</label>
              <input
                type="password"
                id="ConfirmPassword"
                name="ConfirmPassword"
                value={user.confirmPassword}
                className="mt-1 block w-full px-3 py-2 border text-gray-100  border-gray-500 bg-transparent rounded-md shadow-sm focus:outline-none focus:ring-red-800 focus:border-gray-800 sm:text-sm"                placeholder="Confirm your password"
                required
                onChange={onchange}
                min={7}
                
                
              />
            </div>
            <div>
              <label htmlFor="AdminSecretKey" className="block text-sm font-medium text-gray-300">Admin Secret Key</label>
              <input
                type="text"
                id="AdminKey"
                name="AdminKey"
                value={user.AdminKey}
                className="mt-1 block w-full px-3 py-2 border text-gray-100  border-gray-500 bg-transparent rounded-md shadow-sm focus:outline-none focus:ring-red-800 focus:border-gray-800 sm:text-sm"                placeholder="Enter a Admin Secret Key" min={10}
                required
                onChange={onchange}
                
              />
            </div>

            <button
            disabled={loading}
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
                {loading?<ClipLoader color="white" loading={loading} size={20}/>:""}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <button onClick={()=>{setisAdminSignupOpen(false)
              setisloginopen(true)
            }} className="text-red-700 hover:text-red-600 font-medium bg-transparent">
              Login
              </button>
          </p>
          </div>
      <LoginModel/>
    </div>

  );
};

export default AdminSignupModal;
