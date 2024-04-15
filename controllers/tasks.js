const Task = require('../models/Task')

const getAllTasks = async (req, res) => {
    console.log('get all tasks')
    try {
        const tasks = await Task.find({}) // get all the doc in the Task collection
        res.status(200).json({ tasks })
        // res.status(200).json({ success:true, data:{tasks}, amount: tasks.length }) // we can response with more info
    } catch (error) {
        res.status(500).json({ msg:error })
        // res.status(500).json({ success:false, msg:error })
    }
} 

const createTask = async (req, res) => {
    console.log('create a task')
    try{
        const task = await Task.create(req.body)
        res.status(201).json({ task })
    } catch (error) {
        res.status(500).json({ msg:error }) // 500: general server error
    }
}

const getTask = async (req, res) => {
    console.log('get a task')
    try {
        const {id:taskID} = req.params // use taskID as the alia of id from req.params
        const task = await Task.findOne({_id:taskID}) // try to find data that _id is taskID
        if (!task) {
            // If not found, mongoose model returns null, and remember to return
            return res.status(404).json({ msg:`No task with id: ${taskID}`})
        }
        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({ msg:error }) // 500: general server error
    }
}

const updateTask = async (req, res) => {
    console.log('update task')
    try {
        const {id:taskID} = req.params
        // model.findByIdAndUpdate(id, dataToUpdate, optional)
        // new:true->response with the new data, runValidators:true->follow the model schema
        const task = await Task.findByIdAndUpdate({_id:taskID}, req.body, {new:true, runValidators:true})
        if (!task) {
            return res.status(400).json({ msg:`No task with id: ${taskID}` })
        }
        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({ msg:error }) // 500: general server error
    }
}

const deleteTask = async (req, res) => {
    console.log('delete task')
    try {
        const {id:taskID} = req.params
        const task = await Task.findOneAndDelete({_id:taskID})
        if (!task) {
            return res.status(404).json({ msg:`No task with id: ${taskID}`})
        }
        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({ error })
    }
}


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
}