const express = require('express');
const app = express();
const {sequelize} = require('./src/models/index');
const {router:studentRouter} = require('./src/router/student');
const {router:subjectRouter} = require('./src/router/subject');
const {router:studentActivity} = require("./src/router/activities");

app.use(express.json());
app.get('/', (req, res) => {
  return res.status(200).send("Hey NodeJS")
})

app.use(studentRouter);
app.use(subjectRouter);
app.use(studentActivity);


//Global Erorr Handling
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }
    console.error(err.stack)
    return res.status(500).send('Something broke!')
})

const databaseConnect = async () =>{
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

const server = async() => { 
    await databaseConnect()
    app.listen(process.env.port || 8000, 'localhost', () => {
      console.log("Server is listening at http://%s:%s", 'localhost', 8000)
    })
}

server();