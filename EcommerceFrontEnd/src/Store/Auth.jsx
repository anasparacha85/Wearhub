import { useContext,createContext, useEffect } from "react";
import { useState } from "react";
export const AuthContext=createContext();
export const AuthContextProvider=({children})=>{
    const [jwttoken, setjwttoken] = useState(localStorage.getItem('token'))
    const [AdminKey, setAdminKey] = useState(localStorage.getItem('Admin Key'))
    const [isSignupOpen, setSignupOpen] = useState(false);
    const [isloginopen, setisloginopen] = useState(false);
    const [isAdminSignupOpen, setisAdminSignupOpen] = useState(false)
    const [productss, setproductss] = useState([]);
     const [isLoading, setisLoading] = useState(false)
        
    
  const [cartopen, setcartopen] = useState(false)
    const settokentols=(token)=>{
        return localStorage.setItem('token',token);

    }
    const isLoggedIn=!!jwttoken;
    const LogoutTrue = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('Admin Key');
      };
    const saveAdminKeytoLs=(AdminKey)=>{
        return localStorage.setItem('Admin Key',AdminKey)
    }
    const fetchwommensCollection=()=>{
        setisLoading(true)
          fetch(`${base_URL}/api/Shop/womens`,{
              method:'GET'
          }).then((res)=>{
              return res.json()
          }).then((data)=>{
  setproductss(data)
          }).catch((error)=>{
              console.log(error);
              
          }).finally(()=>{
            setisLoading(false)
          })
          
      }
   
      const fetchmensCollection=()=>{
        setisLoading(true)
          fetch(`${base_URL}/api/Shop/mens`,{
              method:'GET'
          }).then((res)=>{
              return res.json()
          }).then((data)=>{
  setproductss(data)
          }).catch((error)=>{
              console.log(error);
              
          }).finally(()=>{
            setisLoading(false)
          })
      }
     
      const fetchproduct = () => {
        setisLoading(true);
        fetch(`${base_URL}/api/Shop/ShopItems`, {
          method: "GET",
        })
          .then((res) => res.json())
          .then((Data) => {
            setproductss(Data);
          })
          .finally(() => {
            setisLoading(false);
          });
      };
    
    
    
    const base_URL='http://localhost:5000'
    return ( <AuthContext.Provider value={{settokentols, base_URL,saveAdminKeytoLs,jwttoken ,LogoutTrue,AdminKey,isLoggedIn,isAdminSignupOpen,isSignupOpen,isloginopen,setSignupOpen,setisAdminSignupOpen,setisloginopen,cartopen,setcartopen,isLoading,setisLoading,productss,setproductss,fetchmensCollection,fetchwommensCollection,fetchproduct} }>
        {children}
    </AuthContext.Provider>
    )
}

export const useAuth=()=>{
    const storecontextvalue=useContext(AuthContext);
    if(!storecontextvalue){
       throw new Error('UseContext must be used inside the provider');
       
    }
    return storecontextvalue;
}