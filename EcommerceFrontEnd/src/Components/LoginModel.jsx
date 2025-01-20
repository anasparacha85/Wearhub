import { useAuth } from "../Store/Auth";
import { useState } from "react";
import { NavLink } from "react-router-dom";
const LoginModel = ({ isLoginOpen, onLoginClose }) => {
  const {settokentols}=useAuth()
  const [user, setuser] = useState({email:"",password:""})
  const onchange=(e)=>{
    const {name,value}=e.target;
    setuser({...user,[name]:value})

  }
const onsubmit=(e)=>{
  e.preventDefault();
  fetch('http://localhost:5000/api/auth/login',{
    method:'POST',
    body:JSON.stringify(user),
    headers:{
      'Content-Type':'application/json'
    }
  }).then((res)=>{
    return res.json()
  }).then((data)=>{
    console.log(data);
    settokentols(data.token)
    
  }).catch((error)=>{
    console.log(error);
    
  })
  
}
  if (!isLoginOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    
      <div className="bg-gray-900 rounded-lg w-[500px] p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onLoginClose}
        >
          ✕
        </button>
        <h2 className="text-3xl font-bold text-center text-gray-400 mb-6">Login</h2>
          
          <form onSubmit={onsubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-500 bg-transparent rounded-md shadow-sm focus:outline-none focus:ring-red-800 focus:border-gray-800 sm:text-sm"

                placeholder="Enter your email"
                required
                value={user.email}
               onChange={onchange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-500 bg-transparent rounded-md shadow-sm focus:outline-none focus:ring-red-800 focus:border-gray-800 sm:text-sm"

                placeholder="Enter your password"
                required
                value={user.password}
                onChange={onchange}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-gray-600" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <NavLink to="/forget" className="text-sm text-red-600 hover:text-red-700">Forgot Password?</NavLink>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <NavLink to="/register" className="text-red-600 hover:text-red-500 font-medium">
              Sign Up
            </NavLink>
          </p>
      </div>
    </div>
  );
};

export default LoginModel;
