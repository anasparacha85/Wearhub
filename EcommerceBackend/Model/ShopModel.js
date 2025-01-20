const mongoose=require('mongoose');
const ShopSchema=new mongoose.Schema({
    Category:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    brand:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true,
        
    },
    
bigimage:{
    type:String,
    require:true
}
    ,
    smallimage1:{
        type:String,
        require:true
    },
    smallimage2:{
        type:String,
        require:true
    },
    smallimage3:{
        type:String,
        require:true
    },
  
    description:{
        type:String,
        require:true
    }
   
})

const popularSchema=new mongoose.Schema({
     Category:{
    type:String,
    require:true
},
name:{
    type:String,
    require:true
},
brand:{
    type:String,
    require:true
},
price:{
    type:Number,
    require:true,
    
},

bigimage:{
type:String,
require:true
}
,
smallimage1:{
    type:String,
    require:true
},
smallimage2:{
    type:String,
    require:true
},
smallimage3:{
    type:String,
    require:true
},

description:{
    type:String,
    require:true
}

})

const ShopModel=new mongoose.model('ShopProducts',ShopSchema)
const popularmodel=new mongoose.model('popularProducts',popularSchema)
const TopTrendingModel=new mongoose.model('TopTrendingItem',ShopSchema)
module.exports={ShopModel,popularmodel,TopTrendingModel}