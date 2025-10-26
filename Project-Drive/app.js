const express=require('express')
const app=express();
const userRoute=require('./routes/user.routes')
const dotenv=require('dotenv')
dotenv.config() // to acces env content

// importing database connection
const connectToDB=require('./config/db');
const cookieParser = require('cookie-parser');
connectToDB(); // call it to run that function
const indexRouter=require('./routes/index.routes')
app.set('view engine','ejs')

// middle ware to decode the input data
app.use(express.json())
app.use(express.urlencoded({extended:true})) 
app.use(cookieParser())
// NOTE -> hum routes app.js main nhi banathe,kahi aur banake ke import karthe

// to use the route which is imported
app.use('/',indexRouter) // -> /home
app.use('/user',userRoute) // now the route becoms  '/user/test'

app.listen(3000,()=>{
    console.log('Server is connected to port 3000')
})