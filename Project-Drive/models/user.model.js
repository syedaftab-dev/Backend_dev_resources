const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true, // compulsary
        trim:true,
        lowercase:true,
        unique:true,
        minlength:[3,'Username must be atleast 3 char long'] // min len,error is not
    },
    email:{
        type:String,
        required:true, // compulsary
        trim:true,
        lowercase:true,
        unique:true,
        minlength:[13,'email must be atleast 13 char long'] // min len,error is not
    },
    password:{
        type:String,
        required:true, // compulsary
        trim:true,
        minlength:[5,'password must be atleast 5 char long'] // min len,error is not
    }
})

const user=mongoose.model('user',userSchema) // collectioon,schema
module.exports=user;