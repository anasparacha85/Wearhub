import { createSlice,createAsyncThunk,  } from "@reduxjs/toolkit";
import { base_URL } from "./ProductSlice";
export const LoginUser=createAsyncThunk(
    "auth/LoginUser",
    async (credentials,{rejectWithValue})=>{
        try {
            const response=await fetch(`${base_URL}/api/auth/login`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(credentials)
            })
            const data=await response.json()
            return data
        } catch (error) {
            return rejectWithValue(error.message)
            
        }
    }
);

export const RegisterUser=createAsyncThunk(
    "auth/RegisterUser",
    async (credentials,{rejectWithValue})=>{
        try {
            const response=await  fetch(`${base_URL}/api/auth/User/Signup`,{
                method:'POST',
                body:JSON.stringify(credentials),
                headers:{
                  'Content-Type':'application/json'
                }})

                const data=await response.json()
                return data;
        } catch (error) {
            return rejectWithValue(error.FailureMessage)
        }

    }
);

export const RegisterAdmin=createAsyncThunk(
    "auth/RegisterAdmin",
    async (credentials,{rejectWithValue})=>{
        try {
            const response=await   fetch(`${base_URL}/api/auth/Admin/Signup`,{
                method:'POST',
                body:JSON.stringify(credentials),
                headers:{
                  'Content-Type':'application/json'
                }})

                const data=await response.json()
                return data;
        } catch (error) {
            return rejectWithValue(error.FailureMessage)
        }

    }
);

 const AuthSlice=createSlice(
    {
        name:'auth',
        initialState:{
            user:null,
            JwtToken:localStorage.getItem('Jwt token') || null,
            AdminKey:localStorage.getItem('Admin key') || null,
            loading:false,
            error:null


        },
        reducers:{
            LogoutTrue:(state)=>{
                localStorage.removeItem('Jwt token');
                localStorage.removeItem('Admin key');
                state.JwtToken=null;
                state.AdminKey=null;
            },
            setUser:(state,action)=>{state.user=action.payload},
        },
        extraReducers:(builder)=>{
            builder
            .addCase(LoginUser.pending,(state)=>{
                state.loading=true;
                state.error=null;
            })
            .addCase(LoginUser.fulfilled,(state,action)=>{
                state.loading=false;
                state.user=action.payload;
                state.JwtToken=action.payload.token
                state.AdminKey=action.payload.AdminSecretKey;
                localStorage.setItem('Admin key',action.payload.AdminSecretKey)
                localStorage.setItem('Jwt token',action.payload.token)

            })
            .addCase(LoginUser.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload
            })
            .addCase(RegisterUser.pending,(state)=>{
                state.loading=true;
                state.error=null;
            })
            .addCase(RegisterUser.fulfilled,(state,action)=>{
                state.loading=false;
                state.user=action.payload;
              
              

            })
            .addCase(RegisterUser.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload
            })
            .addCase(RegisterAdmin.pending,(state)=>{
                state.loading=true;
                state.error=null;
            })
            .addCase(RegisterAdmin.fulfilled,(state,action)=>{
                state.loading=false;
                state.user=action.payload;
              
               

            })
            .addCase(RegisterAdmin.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload
            })
        }
    }
)

export const {LogoutTrue,setUser}=AuthSlice.actions
export default AuthSlice.reducer