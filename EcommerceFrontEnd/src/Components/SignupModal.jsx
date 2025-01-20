// src/components/SignupModal.jsx
import React, { useEffect } from "react";
import { useAuth } from "../Store/Auth";
import { useState } from "react";
import LoginModel from "./LoginModel";
import { NavLink } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css"
const SignupModal = ({ isOpen, onClose ,setsignupopen,setLoginOpen,isLoginOpen }) => {
  useEffect(()=>{
    Aos.init()
  },[])
  const {settokentols}=useAuth()
  const [user, setuser] = useState({name:"",email:"",password:"",ConfirmPassword:""})
  const onchange=(e)=>{
    const {name,value}=e.target;
    setuser({...user,[name]:value})

  }

const onsubmit=(e)=>{
  e.preventDefault();
  fetch('http://localhost:5000/api/auth/signup',{
    method:'POST',
    body:JSON.stringify(user),
    headers:{
      'Content-Type':'application/json'
    }
  }).then((res)=>{
    if(res.ok){
      setsignupopen(false)
      setLoginOpen(true)
      
    }
    return res.json()
  }).then((data)=>{
    console.log(data);
    settokentols(data.token)
    
  }).catch((error)=>{
    console.log(error);
    
  })
  
}
  if (!isOpen) return null;

  return (
    <div id="hel" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 " 
    >
    
      <div className="bg-gray-900 rounded-lg w-[500px] p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-3xl font-bold text-center text-gray-200 mb-6">Sign up to Buy Products</h2>
          
          <form onSubmit={onsubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full px-3 py-2 border border-gray-500 bg-transparent rounded-md shadow-sm focus:outline-none focus:ring-red-800 focus:border-gray-800 sm:text-sm"
                placeholder="Enter your full name"
                required
                value={user.name}
                onChange={onchange}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                className="mt-1 block w-full px-3 py-2 border border-gray-500 bg-transparent rounded-md shadow-sm focus:outline-none focus:ring-red-800 focus:border-gray-800 sm:text-sm"
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
className="mt-1 block w-full px-3 py-2 border border-gray-500 bg-transparent rounded-md shadow-sm focus:outline-none focus:ring-red-800 focus:border-gray-800 sm:text-sm"
                placeholder="Create a password"
                required
                onChange={onchange}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">Confirm Password</label>
              <input
                type="password"
                id="ConfirmPassword"
                name="ConfirmPassword"
                value={user.confirmPassword}
                className="mt-1 block w-full px-3 py-2 border border-gray-500 bg-transparent rounded-md shadow-sm focus:outline-none focus:ring-red-800 focus:border-gray-800 sm:text-sm"                placeholder="Confirm your password"
                required
                onChange={onchange}
                
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <button onClick={()=>{setsignupopen(false)
              setLoginOpen(true)
            }} className="text-red-700 hover:text-red-600 font-medium bg-transparent">
              Login
              </button>
          </p>
          </div>
      <LoginModel isLoginOpen={isLoginOpen} onLoginClose={()=>setLoginOpen(false)}/>
    </div>

  );
};

export default SignupModal;
