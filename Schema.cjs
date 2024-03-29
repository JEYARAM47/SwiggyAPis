const mongoose=require('mongoose')
const restaurantsSchema=new mongoose.Schema({
    areaname:{
        type:String
    },
    avgRating:{
        type:Number
    },
    costForTwo:{
        type:String
    },
    cuisines:{
        type:Array
    },
    imageLink:{
        type:String
    },
    name:{
        type:String
    }
},{versionKey:false})
const Restaurant=mongoose.model('restaurantList',restaurantsSchema)


const userSchema=new mongoose.Schema({
    contact:{
        type:Number
    },
    userName:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
},{versionKey:false})
const Users=mongoose.model('userDetails',userSchema)

module.exports={Restaurant,Users}