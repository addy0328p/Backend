// Import the express module to create the web server
const express = require("express");

// Import the filesystem module to work with files (e.g., for logging)
const fs = require('fs');

// Import mock user data from a local JSON file (static data for the example)
const users = require("./MOCK_DATA.json");

// Create an instance of an Express application
const app = express();

// Define the port the server will listen on
const PORT = 8000;

// Middleware to parse URL-encoded data from POST requests
// 'extended: false' specifies that the querystring library will be used
app.use(express.urlencoded({ extended: false }));

// Custom middleware to log every request to a file
app.use((req, res, next) => {
    console.log("hello from middleware1");

    // Append log details (timestamp, request method, path) to a log.txt file
    fs.appendFile("log.txt", `\n${Date.now()}:${req.method}:${req.path}\n`,
        (err, data) => {
            // Continue to the next middleware once logging is complete
            next();
        });
});

// Another middleware that will intercept requests and send a response
app.use((req, res, next) => {
    console.log("hello from middleware 2", req.myusername);
    
    // Respond with "hey" before proceeding to any routes
    // This middleware essentially short-circuits further request processing
    return res.end("hey");
});

// Route to retrieve all users
// GET /api/users
app.get("/api/users", (req, res) => {
    // Sends the entire mock user dataset as JSON
    return res.json(users);
});

// Route to retrieve a user by their ID
// GET /api/users/:id
app.get('/api/users/:id', (req, res) => {
    // Extract the user ID from the request parameters and convert to number
    const id = Number(req.params.id);

    // Find the user in the dataset that matches the requested ID
    const user = users.find(user => user.id == id);

    // Return the matched user as JSON
    return res.json(user);
});

// Route to create a new user
// POST /api/users
app.post('/api/users', (req, res) => {
    // Access form data sent in the POST request body
    const body = req.body;

    // Add the new user data to the mock data array, assigning a new ID
    users.push({ ...body, id: users.length + 1 });

    // Write the updated users array back to the JSON file (persisting changes)
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        // Send success response with the new user's ID
        return res.json({ status: "success", id: users.length });
    });
});

// Route to update an existing user
// PATCH /api/users/:id
app.patch('/api/users/:id', (req, res) => {
    // Extract user ID from the route parameters
    const id = Number(req.params.id);
    
    // Extract the updated data from the request body
    const body = req.body;

    // Find the user to update in the dataset
    const user = users.find((user) => user.id === id);

    // Create an updated user object by merging the existing user data and the new data
    const updatedUser = { ...user, ...body };
    updatedUser.id = id; // Ensure the ID remains unchanged

    // Update the user in the users array (assuming user IDs start at 1)
    users[id - 1] = updatedUser;

    // Write the updated users array to the JSON file
    fs.writeFile('MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        // Send success response with the updated user object
        return res.json({ status: "Success", updatedUser });
    });
});

// Route to delete a user by ID (currently not fully implemented)
// DELETE /api/users/:id
app.delete('/api/users/:id', (req, res) => {
    // Respond with a placeholder status since the delete logic isn't implemented
    return res.json({ status: "pending" });
});

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server Started at port: ${PORT}`));
