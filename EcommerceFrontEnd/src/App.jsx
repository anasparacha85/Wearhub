import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import SignupModal from './Components/SignupModal'
import { AuthContextProvider } from './Store/Auth'
import LoginModel from './Components/LoginModel'
function App() {
  const [count, setCount] = useState(0)
  const [isSignupOpen, setSignupOpen] = useState(false);
  const [isloginopen, setisloginopen] = useState(false);
  

  return (
    <>
  <AuthContextProvider>
  <Header onSignupClick={() => setSignupOpen(true)} onloginclick={()=>setisloginopen(true)}/>
    <Outlet/>
    <SignupModal isOpen={isSignupOpen} onClose={() => setSignupOpen(false)}  setsignupopen={setSignupOpen} isLoginOpen={isloginopen} setLoginOpen={setisloginopen}/>
    <LoginModel isLoginOpen={isloginopen} onLoginClose={()=>setisloginopen(false)} />
    <Footer/>
  </AuthContextProvider>
    
    
   
     
    </>
  )
}

export default App
