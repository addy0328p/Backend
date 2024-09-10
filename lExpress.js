// Importing the 'express' module to create an Express application
const express = require("express");

// Importing the 'http' module to create an HTTP server
const http = require("http");

// Initializing the Express application
const app = express();

// Defining the route for the home page ('/').
// When the home page is accessed, it sends a simple message to the user.
app.get('/', (req, res) => {
    return res.send("Hello from home page");
});

// Defining the route for the '/about' page.
// It takes two query parameters, 'name' and 'age', and includes them in the response.
// For example: Accessing '/about?name=John&age=30' will display the message with the query details.
app.get('/about', (req, res) => {
    return res.send("Hello from About pg" + " hey " + req.query.name + " you are " + req.query.age);
});

// Creating the HTTP server using the Express app
const myServer = http.createServer(app);

// Starting the server on port 7002 and logging a message when it starts
myServer.listen(7002, () => console.log("server started"));
