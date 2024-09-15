// Import the express module
const express = require("express");
const fs = require('fs');

// Import mock user data from a local JSON file
const users = require("./MOCK_DATA.json");

// Create an instance of an Express application
const app = express();

// Set the port number for the server to listen on
const PORT = 8001;

// Middleware to parse URL-encoded bodies from POST requests
app.use(express.urlencoded({ extended: false }));

// Define a GET route to retrieve all users
app.get("/api/users", (req, res) => {
    // Send the users data as a JSON response
    return res.json(users);
});

// Define a GET route to retrieve a specific user by ID
app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id == id);

    // Send the matched user data as a JSON response
    return res.json(user);
});

// Define a POST route to create a new user
app.post('/api/users', (req, res) => {
    const body = req.body;
    users.push({ ...body, id: users.length + 1 });

    // Write the updated users array to the JSON file
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
        if (err) return res.status(500).json({ status: "error", message: "Failed to save user" });
        return res.json({ status: "success", id: users.length });
    });
});

// Define a PATCH route to update a specific user by ID
app.patch('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const body = req.body;

    // Find the user to update
    const user = users.find(user => user.id === id);
    if (!user) return res.status(404).json({ status: "error", message: "User not found" });

    // Update the user and preserve the original ID
    const updatedUser = { ...user, ...body, id: id };
    users[id - 1] = updatedUser;

    // Write the updated user list back to the JSON file
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
        if (err) return res.status(500).json({ status: "error", message: "Failed to update user" });
        return res.json({ status: "Success", updatedUser });
    });
});

// Define a DELETE route to delete a specific user by ID
app.delete('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);

    // Filter out the user by ID
    const remainingUsers = users.filter(user => user.id !== id);
    if (remainingUsers.length === users.length) {
        return res.status(404).json({ status: "error", message: "User not found" });
    }

    // Overwrite the users array with the remaining users
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(remainingUsers), (err) => {
        if (err) return res.status(500).json({ status: "error", message: "Failed to delete user" });
        return res.json({ status: "success", message: `User with ID ${id} deleted.` });
    });
});

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server Started at port: ${PORT}`));
