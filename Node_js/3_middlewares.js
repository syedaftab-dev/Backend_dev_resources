// 3 types of middile ware buitin,custom and 
//  above one is custom one and to use 3rd party install from npm eg morgan
const express = require('express');
const app = express();
app.set('view engine', 'ejs')

// 3rd party middleware - morgan it is logger
const morgan = require('morgan')

app.use(morgan('dev')) // works for all routes

// what if we want for only one route use another call back in the route
// using custom middleware
app.get('/',
    (req,res,next) => {
        const a=5;
        const b=10;
        console.log(a+b)
        next(); // f u miss this,the request stucks,due to no response by middleware
        // next will allow the things run after that 
    },
    (req, res) => {
        res.render('index') // changes made in index.ejs then please restart server 
    })
app.get('/about', (req, res) => {
    res.send('About page')
})

app.get('/profile', (req, res) => {
    res.send('Profile page')
})
// no need to create server express creates it ,it also uses http behind
app.listen(3000)