// Import the express module
const express = require("express");

// Import mock user data from a local JSON file
const users = require("./MOCK_DATA.json");

// Create an instance of an Express application
const app = express();

// Set the port number for the server to listen on
const PORT = 8000;

// Define a GET route to retrieve all users
app.get("/api/users", (req, res) => {
    // Send the users data as a JSON response
    return res.json(users);
});

// Define a GET route to retrieve a specific user by ID
app.get('/api/users/:id', (req, res) => {
    // Extract the ID from the route parameters and convert it to a number
    const id = Number(req.params.id);

    // Find the user in the users array with a matching ID
    const user = users.find(user => user.id == id);

    // Send the matched user data as a JSON response
    return res.json(user);
});

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server Started at port: ${PORT}`));
