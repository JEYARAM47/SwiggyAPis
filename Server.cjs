const bodyParser=require('body-parser')
const express=require('express')
const mongoose=require('mongoose')
const {ObjectId}=require('mongoose')
const cors=require('cors')
const{Restaurant,Users}=require('./Schema.cjs')
const app=express()
app.use(bodyParser.json())
app.use(cors())
async function connectToDb(){
    try{
       await mongoose.connect('mongodb+srv://Jeyaram:Jeyaram123@cluster0.pzaa78t.mongodb.net/Swiggy?retryWrites=true&w=majority')
        const port=process.env.PORT || 8000
        app.listen(port,function(){
            console.log(`Listening on port ${port}`)
        })
    }
    catch(error){
        console.log(error)
    }
}
app.post('/add-restaurant', async function(request,response){
    try{
        await Restaurant.create({
            "areaname":request.body.areaname,
            "avgRating":request.body.avgRating,
            "costForTwo":request.body.costForTwo,
            "cuisines":request.body.cuisines,
            "imageLink":request.body.imageLink,
            "name":request.body.name
        })
        response.status(201).json({
            "status":"Success"
        })
    }catch(error){
        response.status(500).json({
            "status":"not success",
            "error":error
        })

    }
})
app.get('/get-restaurant-details',async function(request,response){
    try{
        const restaurantDetails=await Restaurant.find()
        response.status(200).json(restaurantDetails)

    }catch(error){
        response.status(500).json({
            "status":"no details",
            "error":error
        })

    }
})
app.delete('/delete-restaurant-detail/:id',async function(request,response){
   try{
       await Restaurant.findByIdAndDelete(request.params.id)
       response.status(200).json({
        "Status":"Deleted"
       })
   }catch(error){
    response.status(500).json({
        "status":"no details",
        "error":error
    })
   }
})
app.post('/create-new-user', function(request,response){
    try{ Users.create({
         "userName":request.body.userName,
         "password":request.body.password,
         "email":request.body.email,
         "contact":request.body.contact
     })
     response.status(210).json({
         "status":"received"
     })}catch(error){
         response.status(500).json({
             "status":"not recived"
         })
     }
 })
 app.post('/Validate-user',async function(request,response){
     try{
         const user=await Users.findOne({
             "email":request.body.email,
             "password":request.body.password
         })
         if(user){
             response.status(200).json({
                 "Message":"Valid user"
             })
         }
         else{
             response.status(401).json({
                 "Message":"Invalid user"
             })
         }
 
     }catch(error){
         response.status(500).json({
             "status":"not recived"
         })
     }
     
 })
connectToDb()