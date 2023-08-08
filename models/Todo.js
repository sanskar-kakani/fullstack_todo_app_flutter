const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
    },

    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Todo", todoSchema)