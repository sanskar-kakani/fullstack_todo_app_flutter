const express = require('express');
const app = express();

const mogoose = require('mongoose')
const post = require('./models/Post')

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

mogoose.connect("mongodb+srv://sanskarkakani:sanskar@cluster0.ka9xprr.mongodb.net/post").then(function(){

    app.get("/", function(req, res){
        res.send("API is working!")
        res.end(res.statusCode)
    })

    app.get("/post/list", async function(req, res){
        var posts = await post.find();
        res.json(posts);
    })

    app.get("/post/add", async function(req, res){
        
        // res.json(req.body)

        const newpost = new post({
            title: "sanskar",
            content: "kakani",
        })

        // await newpost.save()
        const response = {message: "New post created", data: newpost}
        res.json(response);
    })

    // app.get("/posts/list/:userid", async function(req, res){
    //     var post = await post.find({userid: req.body.userid});
    //     res.json(post)
    // })
})

// const PORT = process.env.PORT || 5050
app.listen(5050, ()=>{
    // console.log(PORT)
})

