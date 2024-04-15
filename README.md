#Task Manager Application

This is a task manager web application using express and mongodb.
Source: https://www.youtube.com/watch?v=qwfE7fSVaZM&ab_channel=freeCodeCamp.org

## Start the project
- Type `npm start` terminal.

## Files
- `public`: The html, css, js files. Mainly use `axios` to implement http requestes.
- `app.js`: The main js file, managing the url and middlewares
- `routes/tasks.js`: Use the route functions in controllers, setup the routes
- `controllers/tasks.js`: Implement the route functions
- `db/connect.js`: Use mongoose to connect to MongoDB
- `models/Tasks.js`: Setup schema for database with mongoose
- `middleware/not-found.js`: Set the reponse when the route doesn't exist


## Test with `postman`
- We can use `postman` to test the http functions (create, update, delete...) easily
- In `postman`, we can create a collection to store all the requests we are gonna make for easily access in the future
- We can set a envirement variable to store the port url, and use {{<theName>}} to get access to it. 
- When we need to send body data (post, put, patch, delete), we can add the data in `Body` section, choose `row` -> `JSON` 

## REST API
- `GET`: api/tasks            - Get All TaskS
- `POST`: api/tasks           - Create Tasks
- `GET`: api/tasks/:id        - Get Task
- `PUT/PATCH`: api/tasks/:id  - Update Task
- `DELETE`: api/tasks/:id     - Delete Task

## MongoDB
- NoSQL
- Store Json
- Free Cloud Hosting - Atlas

1. Create a project and cluster

2. Add Database Access
- Go to Database Access and create new user
    - user: chris8332558
    - password: chris92341

3. Add Network Access
- We can setup the access only for our own ip address, or we can allow access from anywhere
    - Access List Entry: 0.0.0.0/0

4. Connect the database to your application
- Go to `Deployment/Database`
- Click `Connect`
- Choose `Connect to your appliction/Drivers`
- Copy your connection string into your application code
    - We'll setup this as the envirenment variable
    - In the string, we need to replace `<password>` with the password we setup.

// To specify a database, we can add the name in the connection string like this: `mongodb+srv://chris8332558:<userpassword>@taskmanager.reidfhl.mongodb.net/TaskManager?retryWrites=true&w=majority&appName=TaskManager`, here I add `TaskManager` in the string, so that I can access this database in the cluster.

// To keep the connection string secret when we publish our code and let other to access out databse, we can use `dotenv` package. We need to create a `.env` file and type `MONGO_URI = <theConnectionString>`, and in the `app.js`, we can `require` it to get the `MONGO_URI`. Don't forget the add `.env` in `.gitignore`

5. Create data in Mongadb
- Go to `Deployment/Database/Collections`
- Click `Create Database` (There is a sample databse, just delete it)
    - Database name: `Store`
    - Collection name: `Products`

// We can create many Database under a project, many Clusters under a Database, many Collections under a Cluters, and many data under a Collection.
// Every data in MongoDB has an unique `_id` created automatically
// We can manipulate CURD directlly in the MongoDB website, but we'll do it through our server
// CRUD: Create Read Update Delete


## Mongoose
We can surely use the native MongoDB package in out app, but `mongoose` provides pretty straightforward API to access mongobd, so we'll use `mongoose` in out app. Checkout [mongoos docs](https://mongoosejs.com/docs/models.html) if the version is different.

### mongoose.model()
When you call mongoose.model() on a schema, Mongoose compiles a model for you.

### mongoose.Schema
We can use mongoose.Schema() to retrict the data schema

### Queries
After we have the mongoose model, we can use some methods like model.find(), model.findOne(), findOneAndDelete()... to operate HTTP requests and update the MongoDB.

### test with postman
When we want to get or update data, we need the `_id`, and we can get them by `getAllTasks()`. Use `GET` in postman to get all the data info.

We need to add `/<_id>` to the path to update or delete it


### PUT v.s PATCH
- PUT: replace the whole items
- PATCH: replace the provided items
- e.g. We have 
```
{
    "name": "testName1",
    "status": "states1"
}
```

If we use `PUT` and send
```
{
    "name": "PUTName1"
}
```

The `"status": "status1"` will gone
But If we use `PTACH`, The `"status": "states1"` will still be there, because `PATCH` only update the given items. But if we use `mongoose` and set a default value to the item in `mongoose.Schema`, the item will be the default value when we use `PUT`.