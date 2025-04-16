import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../Store/Auth";
import Card from "../Components/Card";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById ,fetchProductByBrandName, base_URL} from "../Slices/ProductSlice";
import { toast } from "react-toastify";


const ProductsDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("10");
  

 
  const [productsbybrandname, setproductsbybrandname] = useState([])
  const params=useParams()
const productstate=useSelector((state)=>state.products)
const {ProductById,ProductByBrand,loading}=productstate
const dispatch=useDispatch()
const JwtToken=useSelector((state)=>state.auth.JwtToken)


// const fetchprodbyid=()=>{
//   setisloading(true)
//   fetch(`${base_URL}/api/Shop/Product/${params.id}`,{
//     method:'GET',
//     headers:{
//       Authorization:jwttoken
//     }
    
    

//   }).then((res)=>{
//     console.log(res);
    
//     return res.json()
//   }).then((data)=>{
//     // console.log("productbyiddata",data);
//     setproductsbyid(data)
//     console.log("idprod",productsbyid);

    
    
//   }).catch((error)=>{
//     console.log(error);
    
//   }).finally(()=>{
// setisloading(false)
//   })
// }
// const fetchprodbybrandname = useCallback(() => {
//   if (!productsbyid.brand) return; // Prevent fetch if brand is undefined/null
// setisloading(true)
//   fetch(`${base_URL}/api/Shop/ProductByBrand?brand=${productsbyid.brand}&Category=${productsbyid.Category}`, {
//     method: "GET",
//     headers:{
//       Authorization:jwttoken
//     }
//   })
//     .then((res) => res.json()) // Convert response to JSON
//     .then((data) => {
//       setproductsbybrandname(data); // Update state
//       console.log("Fetched products by brand and Category:", productsbybrandname); // Log updated data
//     })
//     .catch((error) => {
//       console.error("Error fetching products:", error);
//     }).finally(()=>{
//       setisloading(false)
//     });
// }, [ProductById.brand,ProductById.Category]); // Add dependency


 const arr=[ProductById.smallimage1,ProductById.smallimage2,ProductById.smallimage3]
useEffect(()=>{
  dispatch(fetchProductById({id:params.id,jwttoken:JwtToken}))
  console.log(ProductById);
  

  
},[params.id,dispatch])
useEffect(()=>{
  if(ProductById.brand && ProductById.Category){
  dispatch(fetchProductByBrandName({brand:ProductById.brand,Category:ProductById.Category,jwttoken:JwtToken}))
 
  
  }
  console.log(ProductByBrand);
  

},[dispatch,ProductById.brand,ProductById.Category])


// useEffect(()=>{
//   fetchprodbybrandname()
// },[fetchprodbybrandname])


  const handleQuantityChange = (type) => {
    if (type === "increase") {
      setQuantity(quantity + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const AddtoCart=()=>{
    fetch(`${base_URL}/api/Cart/AddToCart`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        "Authorization":JwtToken
      },
      body:JSON.stringify({productId:params.id,quantity:quantity,price:ProductById.price})
    }).then((res)=>{
      return res.json()
    }).then((data)=>{
      console.log(data);
      if(data.SuccessMessage){
      toast.success(data.SuccessMessage)
      }
      if(data.FailureMessage){
        toast.error(data.FailureMessage)
      }
      
    })
  }
  return (
   
    loading?(<div className="h-screen w-screen  flex items-center justify-center"><ClipLoader color="white" size={50} loading={isloading}/></div>):
    <div className=" text-gray-100 min-h-screen p-4 md:p-8">
      <div className="container mx-auto">
        {/* Product Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Image Gallery */}
          <div >
            <div className="flex  items-center   justify-around">
                  {/* Thumbnail List */}
              <div className="flex flex-col items-start space-y-4 mt-4 ">
                {arr
                  .map((value,index) => (
                    <img
                      key={index}
                      src={value}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-20 h-20 rounded-lg cursor-pointer hover:opacity-80"
                    />
                  ))}
              </div>
              {/* Main Image */}
              <img
                src={ProductById.bigimage}
                alt="Product"
                className="w-full h-auto max-w-md rounded-lg"
              />
            
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{ProductById.name}</h1>
            <p className="text-green-400 font-semibold text-2xl">PKR {ProductById.price}</p>
            <p className="line-through text-gray-400">PKR {ProductById.price+4000}</p>
            <p className="text-gray-300 text-sm">
              Brand: {ProductById.brand} | Pay in 3 installments of PKR {(ProductById.price/100)*35}
            </p>
            <button onClick={AddtoCart} className="bg-black text-white py-3 px-6 w-full rounded-lg font-bold hover:bg-gray-800 transition">
              ADD TO BAG
            </button>

            {/* Product Options */}
            <div>
              <h3 className="font-bold">Quantity</h3>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  className="bg-gray-700 w-10 h-10 flex items-center justify-center rounded-lg"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("increase")}
                  className="bg-gray-700 w-10 h-10 flex items-center justify-center rounded-lg"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-bold">Size</h3>
              <div className="flex items-center space-x-2 mt-2">
                {["8", "10", "12", "14", "16"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-4 border ${
                      selectedSize === size
                        ? "bg-green-500 text-white border-green-500"
                        : "bg-gray-800 text-gray-300 border-gray-600"
                    } rounded-lg hover:bg-gray-700 transition`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
        {/* Details Section */}
       
          <div className="  rounded-lg">
            <h3 className="text-lg font-bold">Details</h3>
            <p className="text-gray-300 text-sm mt-2">
{ProductById.description}
            </p>
          </div>

       
          </div>
        </div>


        {/* You May Also Like Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">You May Also Like</h2>
          <div className="md:grid md:grid-cols-4 flex flex-col">
            {ProductByBrand
              .map((products, idx) => (
                <Card key={products._id} image={products.bigimage} price={products.price}category={products.Category} title={products.name} id={products._id}/>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetail;
