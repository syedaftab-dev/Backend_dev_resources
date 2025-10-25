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


// to take user details as page to show
app.get('/register',(req,res)=>{
    res.render('register')
})
app.post('/register', async (req,res)=>{
    const {username,email,password}=req.body;
    
    // creating user in database this is an asynscronous code
    // makeing it sysnchronous by giveing asyn in above callback

    // we created user in this ie CRUD ,Create -> done
    const newUser = await userModel.create({
        username:username,
        email:email,
        password:password
    })
    /* we got this with with extra variables _id and __v created by monggose
        with _id it make every user unique with ids and __v -> no of times user updated
            {
        "username": "b",
        "email": "b@b.com",
        "password": "b",
        "_id": "68fc61fee424b6b45bc09d75",
        "__v": 0
        }
    */
    res.send(newUser)
})

// READ OPERATIONS
app.get('/get-users',(req,res)=>{
    // brings ALL users from DB inside then
    // we can get specific user by giving coniditon
    // what if we give a condition which doesnt exist it gives -> []

    // userModel.find({username:'b'}).then((users)=>{
    //     res.send(users);
    // })
    // brings only one user

    userModel.findOne({
        username:'b' // we have 2 b user but it give only one with first in DB
        // what if we give a condition which doesnt exist it gives -> nothing on screen ie null on console 
    }).then((user)=>{
        res.send(user)
    })
})

// UPDATE OPERATIONS

app.get('/update-user',async (req,res)=>{
    // first we need to find the user and then update
    // we have combine method
    await userModel.findOneAndUpdate({
        username:'a' // find this
    },{
        email:'c@c.com' // update its email
    })
    res.send('user updated!')
})

//  DELETE OPERATIONS

app.get('/delete-user', async (req,res)=>{
    await userModel.findOneAndDelete({
        username:'a'
    })
    res.send('user deleted!')
})

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