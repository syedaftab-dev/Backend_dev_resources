// all the routes related user are created here
// to make is easy and more efiicient handling

const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator'); // middleware to validate input
// importing db schema and collection
const userModel = require('../models/user.model')
// bycrpt
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// register page
router.get('/register', (req, res) => {
    res.render('register')
})

/* 
email: - 
    'a@a.com' -> is it valid email
    '    ab@g.com'->trim spaces
*/

router.post('/register',
    // validation rules
    body('email').trim().isEmail().isLength({ min: 13 }),
    body('username').trim().isLength({ min: 3 }),
    body('password').trim().isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req); // validate and return errors
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid data'
            })
        }
        const { email, username, password } = req.body;
        // encrypting password from other like hackers
        const hashPassword = await bcrypt.hash(password, 10) // 10 ->for balance for performance
        const newUser = await userModel.create({
            email,
            username,
            password: hashPassword
        })
        res.json(newUser)
    })

//login page

router.get('/login', (req, res) => {
    res.render('login');
})
router.post('/login',
    body('username').trim().isLength({ min: 3 }),
    body('password').trim().isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors,
                message: "invalid credientials"
            })
        }
        const { username, password } = req.body;
        const user = await userModel.findOne({
            username: username
        })
        // if user not found
        if (!user) {
            return res.status(400).json({
                message: 'username or password is incorrect'
            })
        }
        // if user is found check it password 
        const isMatch = await bcrypt.compare(password, user.password) // compares the password return true/false
        if (!isMatch) {
            return res.status(400).json({
                message: 'username or password is incorrect'
            })
        }
        // password is matched we generate a token - we use a package jsonwebtoken
        // why token->token se patha chaltha kii user pahele se register hai ya nai
        const token = jwt.sign({
            userId: user._id,
            email: user.email,
            username: user.username
        },
            process.env.JWT_SECRET,
        )
        // we send token in the form of cookie to frontend
        res.cookie('token',token); // token name ,token value
        res.send('logged iin!')
    })
module.exports = router

















/* ---- /user/test ---------*/


// router.get('/test',(req,res)=>{
//     res.send('user test route')
// })

// // we need export these routers and use in app.js
// module.exports=router;