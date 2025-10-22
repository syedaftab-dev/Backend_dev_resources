// how get the package
// const catMe=require('cat-me')
// console.log(catMe())


// Lets create server using HTTP

const http=require('http') // already installed in node js

const server = http.createServer((req,res)=>{

    if(req.url == '/about'){ //    '/about' -> routing 
        res.end("The about page")
    }
    if(req.url=='/'){
        res.end("hello world!") // agar koi hume request bhejtha hai server pe .end se usse response de sakthe
    }
}); // creating a server with a call back -> request and response


server.listen(3000) // check the repsonse using this 