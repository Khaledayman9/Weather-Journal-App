// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
//Port for the local server
const port = 8000;


// Spin up the server
const server = app.listen(port, listening);

function listening() {
    console.log("server running");
    console.log(`running on local host ${port}`);
}


const data = [];


// GET Route
app.get('/allWeather', sendData);

function sendData(req, res) {
    res.send(projectData);
}

// POST Route
app.post('/addWeather', addWeather);

function addWeather(req, res) {
    projectData = req.body;
    console.log(projectData);
}