const express = require('express');
const app = express();

const mogoose = require('mongoose')
const Todo = require('./models/Todo')

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

mogoose.connect("mongodb+srv://sanskarkakani:sanskar@cluster0.ka9xprr.mongodb.net/todo").then(function(){

    app.get("/", function(req, res){
        res.send("API is working!")
    })

    app.get("/todos/list", async function(req, res){
        var todos = await Todo.find();
        res.json(todos);
    })

    app.post("/todos/add", async function(req, res){
        
        res.json(req.body)

        const newTodo = new Todo({
            title: req.body.titl,
            content: req.body.content,
            date: req.body.date
        })

        await newTodo.save()

        const response = {message: "New Message created"}
        res.json(response);
    })

    // app.get("/todos/list/:userid", async function(req, res){
    //     var todo = await Todo.find({userid: req.body.userid});
    //     res.json(todo)
    // })

})

const PORT = process.env.PORT || 5050
app.listen(PORT, ()=>{
    console.log(PORT)
})
