// WE WILL MAKE SCHEMA -> Schema is the logical structure of the database that defines how data is stored and how the relationships among data are maintained.

const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    // age:Number,
    // gender:{
    //     type:String,
    //     enum:['male','female']
    // }
})

// imp -> actually implemented into in DB
const userModel=mongoose.model('user',userSchema)

module.exports=userModel // exporte to use somewhere in 4_forms.js

// we didnt connect to database for that we have t make config folder