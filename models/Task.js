const mongoose = require('mongoose');

// setup the schema of our database, only the attributes will be sent
const TaskSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, 'must provid name'],
        trim:true, // get rid of whitespace
        maxlength:[20, 'name can not be more than 20 characters']
    },
    completed: {
        type: Boolean,
        default: false
    },
})

module.exports = mongoose.model('Task', TaskSchema)