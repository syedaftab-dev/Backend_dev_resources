const mongoose=require('mongoose')

// it is different from the before
function connectToDB(){

    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log('connected to DB')
    })
}

module.exports = connectToDB