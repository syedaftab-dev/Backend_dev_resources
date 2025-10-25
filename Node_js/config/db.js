const mongoose=require('mongoose')

// connecting to local database using mongodb
const connection = mongoose.connect('mongodb://0.0.0.0/Node_js').then(()=>{
    console.log("Connected to Database")
})

// lets export it
module.exports=connection;