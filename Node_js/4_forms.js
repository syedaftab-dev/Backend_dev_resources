const express = require('express');
const app = express();
app.set('view engine', 'ejs')
const morgan=require('morgan')
// import use model
const userModel=require('./models/user') // with we can do CRUD operation
// import connection
const dbConnection=require('./config/db')



// TOPIC - FRONTEND se input data ko server ke thorugh backend main bhejna

app.get('/',(req,res)=>{
    res.render('index');
})

// a middleware to read data from post method
app.use(morgan('dev'))
// bult in middlware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// we have to builtin middlware to use css,js other static files
app.use(express.static("public"))



// we need a route to read data from input
app.post('/get-form-data',(req,res)=>{
    // console.log(req.query); 
    // req.query ke ander atha data,even we can see password(that is sensitive)
    // url main bhi password dhikra
    // how to resolve it by get -> post
    // data comes in req.body
    console.log(req.body) // we got undefined default due to express, we can use middleware to see data  -> morgan
    // and the data is not visible in url
    res.send('data recieved!')
})

app.listen(3000)

// GET -> FRONTEND SE BACKEND KO DATA
// POST -> BACKEND SE FRONTEND KO DATA

// how to add css first make a folder name public add css file into that