import { useAuth } from "../Store/Auth";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { LoginUser } from "../Slices/AuthSLice";
const LoginModel = () => {
  const {settokentols,saveAdminKeytoLs,base_URL}=useAuth()
  const [user, setuser] = useState({email:"",password:""})
  const {isAdminSignupOpen,isSignupOpen,isloginopen,setSignupOpen,setisAdminSignupOpen,setisloginopen}=useAuth()
 
  const onLoginClose=()=>{
    setisloginopen(false)
  }
  
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
console.log("Redux Auth State:", authState); 

  const { loading, error } = useSelector((state) => state.auth); // Get auth state

  
  const onchange = (e) => {
    const { name, value } = e.target;
    setuser({ ...user, [name]: value });
  };

  const onsubmit = async (e) => {
    e.preventDefault();
    dispatch(LoginUser(user))
      .unwrap()
      .then((data) => {
        console.log(data);
        
        if(data.FailureMessage){
      toast.error(data.FailureMessage);
      
        }
        if(data.SuccessMessage){
          toast.success(data.SuccessMessage);
          onLoginClose()
          
        }
      
      
     ;
      
      })
      .catch((err) => toast.error(err));
  };

//   setloading(true)
//   fetch(`${base_URL}/api/auth/login`,{
//     method:'POST',
//     body:JSON.stringify(user),
//     headers:{
//       'Content-Type':'application/json'
//     }
//   }).then((res)=>{
// if(res.ok){
//   setisloginopen(false)
// }
//     return res.json()
//   }).then((data)=>{
//    console.log(data);
//    if(data.SuccessMessage){
//     toast.success(data.SuccessMessage);
//     setuser({email:"",password:""})
//     setTimeout(() => {
//       window.location.reload()
//     }, 2500);
   
//    }

   
  // if(data.FailureMessage){
  //   toast.error(data.FailureMessage)
  // }
   
   
    // if(data.SuccessMessage){
    //   toast.success(SuccessMessage)
    // }
    // if(data.FailureMessage){
    //   toast.error(FailureMessage)
    // }
  //   settokentols(data.token)
  //   if(data.AdminSecretKey){
  //   saveAdminKeytoLs(data.AdminSecretKey)
  //   }
    
  // }).catch((error)=>{
  //   toast.error(error)
    
  // }).finally(()=>{
  //   setloading(false)
  // })
  

  if (!isloginopen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    
      <div className="bg-gray-900 rounded-lg w-[500px] p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onLoginClose}
        >
          ✕
        </button>
        <h2 className="text-3xl font-bold text-center text-gray-400 mb-6">Login to Buy Products</h2>
          
          <form onSubmit={onsubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full px-3 py-2 text-gray-100 border border-gray-500 bg-transparent rounded-md shadow-sm focus:outline-none focus:ring-red-800 focus:border-gray-800 sm:text-sm"

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
                className="mt-1 block w-full px-3 py-2 text-gray-100 border border-gray-500 bg-transparent rounded-md shadow-sm focus:outline-none focus:ring-red-800 focus:border-gray-800 sm:text-sm"

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
              disabled={loading} 
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading?<ClipLoader color='white' size={20} loading={loading}/>:"Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <button onClick={()=>{setisloginopen(false); setSignupOpen(true)}}   className="text-red-600 hover:text-red-500 font-medium">
              Sign Up
            </button>
          </p>
      </div>
    </div>
  );
};

export default LoginModel;
