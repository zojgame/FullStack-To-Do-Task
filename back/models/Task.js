const { Schema, model } = require('mongoose')

const Task = new Schema({
    title: {type: String, required: true},
    isDone: {type: Boolean, default: false},
    description: String,    
    deadline: Date,
    created: { type: Date, required: true, default: Date.now },
    owner: {type: String, ref: 'User', required: true}
})

module.exports = model('Task', Task)