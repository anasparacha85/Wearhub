import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import SignupModal from './Components/SignupModal'
import AdminSignupModal from './Components/AdminSignupModal'
import { AuthContextProvider } from './Store/Auth'
import LoginModel from './Components/LoginModel'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux'
import store from './Store/Store'

function App() {
  const [count, setCount] = useState(0)
 
  return (
    <>
  
  <AuthContextProvider>
  <ToastContainer
position="top-right"
autoClose={2500}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"

/>
  <Header />

    <Outlet/>
    <SignupModal />
    <LoginModel  />
    <AdminSignupModal />
    <Footer/>
  </AuthContextProvider>
    
    
   
     
    </>
  )
}

export default App
