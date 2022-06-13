const express = require('express')
const app = express()
var bodyParser = require('body-parser')
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const port = 3000
const studentRoute = require('./routes/student');
const teacherRoute = require('./routes/teacher');
const subjectRoute = require('./routes/subject');

const {logger} = require('./middlewares');

app.use('/user',logger, studentRoute);
app.use('/teacher',logger, teacherRoute);
app.use('/subject',logger, subjectRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})