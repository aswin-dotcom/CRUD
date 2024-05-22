const mongoose=require('mongoose');
const ProductSchema=new mongoose.Schema({
    Productname:{
        type:"String",
        required:true
    },
    Productprice:{
        type:Number,
        default:0
    }




})
module.exports=mongoose.model('Product',ProductSchema);