// Import the express module
const express = require("express");
const fs=require('fs');
// Import mock user data from a local JSON file
const users = require("./MOCK_DATA.json");

// Create an instance of an Express application
const app = express();

// Set the port number for the server to listen on
const PORT = 8000;

// Middleware to parse URL-encoded bodies from POST requests
// extended: false means it uses the classic querystring library
app.use(express.urlencoded({ extended: false }));



app.use((req,res,next)=>
{
console.log("hello from middleware1");
fs.appendFile("log.txt",`\n${Date.now()}:${req.method}:${req.path}\n`,
(err,data)=>
{
    next();
})

});

app.use((req,res,next)=>
    {
        console.log("hello from middleware 2",req.myusername);
        return res.end("hey");
    });


// Define a GET route to retrieve all users
app.get("/api/users", (req, res) => {
    // Send the users data as a JSON response

    res.setHeader("MyName","Aditya Pandey");// always add X to custom header
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

// Define a POST route to create a new user
app.post('/api/users', (req, res) => {
    // Access the form data from the request body
    const body = req.body;
users.push({...body, id:users.length+1});
fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>
{
// Currently, it just returns a pending status response
return res.json({ status: "success",id:users.length });
})
    
});

// Define a PATCH route to update a specific user by ID
app.patch('/api/users/:id', (req, res) => {
    // Currently, it just returns a pending status response
    const id = Number(req.params.id);
    const body = req.body;
    const user = users.find((user) => user.id === id)
    const updatedUser = { ...user, ...body };
    updatedUser.id=id;
    users[id-1]=updatedUser

   fs.writeFile('MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.json({ status: "Success", updatedUser })})
});

// Define a DELETE route to delete a specific user by ID
app.delete('/api/users/:id', (req, res) => {
    // Currently, it just returns a pending status response
    return res.json({ status: "pending" });
});

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server Started at port: ${PORT}`));
