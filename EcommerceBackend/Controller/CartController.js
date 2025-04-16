const Cart = require("../Model/CartModal");
const {ShopModel}=require('../Model/ShopModel')
const AddtoCart=async(req,res)=>{
    try {
        const {productId,quantity,price}=req.body;
        console.log(productId,quantity,price);
        
        const Cartdata=await  Cart.findOne({userId:req.user._id})
        console.log(Cartdata);
        
        if(Cartdata){
let itemsindex=Cartdata.items.findIndex(
    item=>item.productId==productId
)
console.log("hello",itemsindex);

    if(itemsindex>-1){
        
        console.log("hell",Cartdata.items[itemsindex].Quantity);
       let pr= Cartdata.items[itemsindex].TotalPrice
       pr=pr+(price*quantity)

        console.log("hellprice",pr);
        
         Cartdata.items[itemsindex].Quantity+=quantity
         Cartdata.items[itemsindex].TotalPrice=pr
    }
        
        else{
          
             Cartdata.items.push({userId:req.user._id,productId:productId,Quantity:quantity,TotalPrice:price*quantity})
                
  

        } 
        await Cartdata.save(); 
        res.status(200).json({SuccessMessage:"Product have Been Added to Cart",Cartdata})

} 
       
    
        else{
const NewCart=await Cart.create({userId:req.user._id,items:[{productId:productId,Quantity:quantity,TotalPrice:price*quantity}]})
        res.status(200).json({SuccessMessage:"Product have Been Added to Cart",NewCart})
        }
    } catch (error) {
        console.log(error);
        
        res.status(500).json({FailureMessage:"Internal server error"})
    }
}

const FetchUserCart=async(req,res)=>{
    try {
        let CartData=await Cart.findOne({userId:req.user._id}).populate('items.productId')
        if(!CartData){
            return res.status(400).json({FailureMessage:"No Products in the Card"})
        }
        
       
        res.status(200).json({SuccessMessage:"cart fecthed",CartData})
    } catch (error) {
        console.log(error);
        
        res.status(500).json({FailureMessage:"Internal Server error"})
        
    }
}

const handlequantity=async(req,res)=>{
    try {
        const {productId,action}=req.body;
        console.log(productId);
        
        const findproduct=await ShopModel.findOne({_id:productId})
        console.log(findproduct);
        
        if(!findproduct){
            res.status(400).json({SuccessMessage:"No Products Found"})
        }
        let finddata=await Cart.findOne({userId:req.user._id})
        let index=finddata.items.findIndex(
            item=>item.productId==productId
        )
        if(index>-1){
            let price=finddata.items[index].TotalPrice;
            console.log("total pirce",price);
            
            let originalprice=findproduct.price;
            console.log("orig price",originalprice);
            
            if(action=='increase'){
                finddata.items[index].TotalPrice+=originalprice
                console.log(price);
                
                finddata.items[index].Quantity+=1
            }
            if(action=="decrease"){
                finddata.items[index].TotalPrice-=originalprice
                console.log(price);
                
                if(finddata.items[index].Quantity>=0){
                finddata.items[index].Quantity-=1
                }
                else{
                    res.status(400).json({FailureMessage:"Quantity is Already zero"})
                }
            }
        }
        await finddata.save()
        res.status(200).json({SuccessMessage:"Cart Updated SUccessfully",finddata})

        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({FailureMessage:"Internal Server error"})
        
    }
}



module.exports={AddtoCart,FetchUserCart,handlequantity}