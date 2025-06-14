import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { act } from "react";
import { useSelector } from "react-redux";
export const base_URL = "https://wearhubbackend.vercel.app";


// Fetch men's collection
export const fetchmensCollection = createAsyncThunk(
    "products/fetchMensCollection",
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch(`${base_URL}/api/Shop/mens`,{
          method:'GET'
        });
        if (!response.ok) {
          throw new Error("Failed to fetch men's collection");
        }
        return await response.json();
      } catch (error) {
        console.log(error.message);
        
        return rejectWithValue(error.message);
      }
    }
  );
  
  // Fetch women's collection
  export const fetchwommensCollection = createAsyncThunk(
    "products/fetchWomensCollection",
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch(`${base_URL}/api/Shop/womens`,{
          method:'GET'
        });
        if (!response.ok) {
          throw new Error("Failed to fetch women's collection");
        }
        return await response.json();
      } catch (error) {
        console.log(error.message);
        return rejectWithValue(error.message);
      }
    }
  );
  
  // Fetch all products
  export const fetchproduct = createAsyncThunk(
    "products/fetchProducts",
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch(`${base_URL}/api/Shop/ShopItems`,{
          method:'GET'
        });
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return await response.json();
      } catch (error) {
        console.log(error.message);
        return rejectWithValue(error.message);
      }
    }
  );
  export const fetchProductById=createAsyncThunk(
    "Products/fetchProductById",
    async ({id,jwttoken},{rejectWithValue})=>{
      try {
        const response=await  fetch(`${base_URL}/api/Shop/Product/${id}`,{
          method:'GET',
          headers:{
            "Authorization":jwttoken
          }
        })
        const data=await response.json()
        return data;
      } catch (error) {
        return rejectWithValue(error.FailureMessage)
        
      }
    }
  )

  export const fetchProductByBrandName=createAsyncThunk(
    "Products/fetchProductsByBrand",
    async ({brand,Category,jwttoken},{rejectWithValue})=>{
      try {
        const response= await fetch(`${base_URL}/api/Shop/ProductByBrand?brand=${brand}&Category=${Category}`,{
          method:'GET',
          headers:{
          "Authorization":jwttoken
          }
        })
        const data=await response.json()
        return data;
      } catch (error) {
        return rejectWithValue(error.FailureMessage)
        
      }
    }
  )

  const ProductSlice=createSlice({
    name:'products',
    initialState:{
      ProductById:{},
      ProductByBrand:[],
      
     
        products:[],
        isLoading:false,
        error:null

    },
    reducers:{
        setProducts:(state,action)=>{
            state.products=action.payload
           
        },
        setProductById:(state,action)=>{
          state.ProductById=action.payload
        }

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchmensCollection.pending,(state)=>{
            state.isLoading=true;
            state.error=null
        })
        builder.addCase(fetchmensCollection.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.products=action.payload;
        })
        builder.addCase(fetchmensCollection.rejected,(state,action)=>{
            state.isLoading=false;
            state.error=action.payload
        })
        builder.addCase(fetchwommensCollection.pending,(state)=>{
            state.isLoading=true;
            state.error=null
        })
        builder.addCase(fetchwommensCollection.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.products=action.payload
        })
        builder.addCase(fetchwommensCollection.rejected,(state,action)=>{
            state.isLoading=false;
            state.error=action.payload
        })
        builder.addCase(fetchproduct.pending,(state)=>{
            state.isLoading=true;
            state.error=null
        })
        builder.addCase(fetchproduct.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.products=action.payload
        })
        builder.addCase(fetchproduct.rejected,(state,action)=>{
            state.isLoading=false;
            state.error=action.payload
        })
        builder.addCase(fetchProductById.pending,(state)=>{
          state.isLoading=true;
          state.error=null
      })
      builder.addCase(fetchProductById.fulfilled,(state,action)=>{
          state.isLoading=false;
          state.ProductById=action.payload
      })
      builder.addCase(fetchProductById.rejected,(state,action)=>{
          state.isLoading=false;
          state.error=action.payload
      })
      builder.addCase(fetchProductByBrandName.pending,(state)=>{
        state.isLoading=true;
        state.error=null
        state.ProductByBrand=[{}]
      })
      builder.addCase(fetchProductByBrandName.fulfilled,(state,action)=>{
        state.isLoading=false;
        state.ProductByBrand=action.payload
    })
    builder.addCase(fetchProductByBrandName.rejected,(state,action)=>{
        state.isLoading=false;
        state.error=action.payload
        state.ProductByBrand=[]
    })

    }
  })

  export default ProductSlice.reducer
