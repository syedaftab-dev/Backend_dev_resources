// all the routes related user are created here
// to make is easy and more efiicient handling

const express=require('express')
const router=express.Router()
const { body,validationResult } = require('express-validator'); // middleware to validate input
// importing db schema and collection
const userModel=require('../models/user.model')
// bycrpt
const bcrypt=require('bcrypt')


router.get('/register',(req,res)=>{
    res.render('register')
})

/* 
email: - 
    'a@a.com' -> is it valid email
    '    ab@g.com'->trim spaces
*/

router.post('/register',
    // validation rules
    body('email').trim().isEmail().isLength({min: 13}),
    body('username').trim().isLength({min:3}),
    body('password').trim().isLength({min:5}),
    async (req,res)=>{
        const errors = validationResult(req); // validate and return errors
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message:'Invalid data'
            })
        }
        const {email,username,password}=req.body;
        // encrypting password from other like hackers
        const hashPassword=await bcrypt.hash(password,10) // 10 ->for balance for performance
        const newUser=await userModel.create({
            email,
            username,
            password:hashPassword
        })
        res.json(newUser)
})

module.exports=router

















/* ---- /user/test ---------*/


// router.get('/test',(req,res)=>{
//     res.send('user test route')
// })

// // we need export these routers and use in app.js
// module.exports=router;