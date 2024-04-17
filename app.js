const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect')
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.static('./public')) // the web app
app.use(express.json())

// routes
app.use('/api/v1/tasks', tasks);
app.use(notFound); // when the route doesn't exist
app.use(errorHandlerMiddleware); // How express.js handle errors

const port = 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Serve is listening on port ${port}...`));
    } catch (error) {
        console.log(error)
    }
}

start()