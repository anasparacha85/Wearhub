const {ShopModel,popularmodel,TopTrendingModel}=require('../Model/ShopModel');
const shopItems=async(req,res)=>{
    try {
        const shopdata=await ShopModel.find({});
       
        // console.log(shopdata);
        
        res.status(200).json(shopdata);
    } catch (error) {
        res.status(500).json({FailureMessage:'internal server error'})
        
    }
}
const popularItems=async(req,res)=>{
    try {
        const shopdata=await popularmodel.find({});
       
        // console.log(shopdata);
        
        res.status(200).json(shopdata);
    } catch (error) {
        res.status(500).json({FailureMessage:'internal server error'})
        
    }
}
const toptrendingItems=async(req,res)=>{
    try {
        const shopdata=await TopTrendingModel.find({});
       
        // console.log(shopdata);
        
        res.status(200).json(shopdata);
    } catch (error) {
        res.status(500).json({FailureMessage:'internal server error '})
        
    }
}

const MensItems=async (req,res)=>{
    try {
        const mensdata=await ShopModel.find({Category:'Mens'})
        if(!mensdata){
            return res.status(401).json({FailureMessage:'No products in Mens COllection'})
        }
        res.status(200).json(mensdata)
    } catch (error) {
res.status(500).json({msg:'Internal server error from mensitems'})
        
    }

}
const WomensItems=async (req,res)=>{
    try {
        const womensdata=await ShopModel.find({Category:'Womens'})
        if(!womensdata){
            return res.status(401).json({FailureMessage:'No products in Womens COllection'})
        }
        res.status(200).json(womensdata)
    } catch (error) {
res.status(500).json({msg:'Internal server error from womensitems'})
        
    }

}
const Sayaitems=async(req,res)=>{
    try {
        const sayadata=await ShopModel.find({brand:'Saya'});
        res.status(200).json(sayadata);

    } catch (error) {
        res.status(500).json({FailureMessage:'internal server error from saya'})
    }
}
const Bonaanzaitems=async(req,res)=>{
    try {
        const Bonanazadata=await ShopModel.find({brand:'Bonanza'});
        res.status(200).json(Bonanazadata);

    } catch (error) {
        res.status(500).json({FailureMessage:'internal server error from bonanza'})
    }
}
const Khaadiitems=async(req,res)=>{
    try {
        const khaadidata=await ShopModel.find({brand:'Khaadi'});
        res.status(200).json(khaadidata);

    } catch (error) {
        res.status(500).json({FailureMessage:'internal server error from khaadi'})
    }
}
const jitems=async(req,res)=>{
    try {
        const jdata=await ShopModel.find({brand:'j.'});
        res.status(200).json(jdata);

    } catch (error) {
        res.status(500).json({FailureMessage:'internal server error from j.'})
        console.log('j.interal server',error);
        
    }
}

const findproductbyid=async (req,res)=>{
   
    try{
        const params=req.params;
        console.log(params.id);
    
    const proddata=await ShopModel.findOne({_id:params.id})
    console.log(proddata);
    
    res.status(200).json(proddata);
}

catch(error){
console.log(error);
res.status(500).json({FailureMessage:"internal servver error from findprodbyid"})
}
    
}
const findproductbybrandname=async(req,res)=>{
try {
    const query=req.query;
    const proddata=await ShopModel.find({brand:query.brand ,Category:query.Category})

    console.log("hey",proddata);
    
    if(!proddata){
        return res.status(401).json({msg:`can't find any products related to ${query.brand} and ${query.Category}` })
    }
    res.status(200).json(proddata)
    
} catch (error) {
    res.status(500).json({FailureMessage:"internal server error from products by brand name",error:error})
}
}
module.exports={shopItems,popularItems,toptrendingItems,MensItems,WomensItems,Sayaitems,Bonaanzaitems,Khaadiitems,jitems,findproductbyid,findproductbybrandname}