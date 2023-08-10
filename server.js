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

    app.get("/posts/list", async function(req, res){
        var posts = await post.find();
        res.json(posts);
    })

    app.post("/posts/add", async function(req, res){
        
        res.json(req.body)

        const newpost = new post({
            title: req.body.titl,
            content: req.body.content,
            date: req.body.date
        })

        await newpost.save()
        const response = {message: "New post created"}
        res.json(response);
    })

    // app.get("/posts/list/:userid", async function(req, res){
    //     var post = await post.find({userid: req.body.userid});
    //     res.json(post)
    // })
})

const PORT = process.env.PORT || 5050
app.listen(PORT, ()=>{
    console.log(PORT)
})

