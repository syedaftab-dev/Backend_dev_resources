// Creating server using express js 

// before tha install dependencies - > npm i express

const express = require('express')
const app = express(); 

// how to conect htmp 
// we need an engine to run that ejs -> npm i ejs

// telling this file we r  using ejs to render html,before that create a folder name views
app.set('view engine','ejs')


// Middleware -> server se jo request athi hai wo ek function ke thriugh se hoke athi use middleware 

// make a middle ware
app.use((req,res,next)=>{ // this will run before going on any route,u can see on terminal also
    console.log("This is middleware")
    return next(); // if we not write this our page just load
})



// how to rendeer html usong render
app.get('/index',(req,res)=>{
    res.render('index') // changes made in index.ejs then please restart server 
})

// get to create a route
app.get('/',(req,res)=>{
    res.send('hello wrold'); // send response 
})

app.get('/about',(req,res)=>{
    res.send('About page')
})

app.get('/profile',(req,res)=>{
    res.send('Profile page')
})
// no need to create server express creates it ,it also uses http behind
app.listen(3000)