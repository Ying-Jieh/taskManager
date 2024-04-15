const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect')
require('dotenv').config();
const notFound = require('./middleware/not-found');

// middleware
app.use(express.static('./public')) // the web app
app.use(express.json())

app.use('/api/v1/tasks', tasks);
app.use(notFound); // when the route doesn't exist

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