import { useContext,createContext } from "react";

export const AuthContext=createContext();
export const AuthContextProvider=({children})=>{
    const settokentols=(token)=>{
        return localStorage.setItem('token',token);

    }
    return ( <AuthContext.Provider value={{settokentols}}>
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