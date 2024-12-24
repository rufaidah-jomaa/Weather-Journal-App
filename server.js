const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extends:false}));
app.use(bodyParser.json());
app.use(express.json());
const cors =require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Post Route
app.post('/add', addInfo);

function addInfo(req, res) {
  projectData['date'] = req.body.date;
  projectData['temp'] = req.body.temp;
  projectData['content'] = req.body.content;
  res.send(projectData);
}

app.get('/all', getInfo);
function getInfo(req, res) {
  res.send(projectData);
}
// setup server 
const port = 3000;
const server = app.listen(port,listening)
function listening(){
    console.log('Eng. Rufaidah Jomaa');
    console.log(`Server is running on port ${port}`);
}

