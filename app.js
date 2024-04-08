const express = require('express');
const app = express();
const tasks = require('./routes/tasks');

// routes
app.get('/', (req, res) => {
    res.send('Task Manager App')
});

app.use('/api/v1/tasks', tasks);

const port = 3000;

app.listen(port, console.log(`Serve is listening on port ${port}...`));