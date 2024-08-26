const http = require("http");
// Import the HTTP module to create an HTTP server.
// This allows handling incoming requests and responses.

const fs = require("fs");
// Import the file system module for file operations.
// Used here to log request information to a file.

const myserver = http.createServer((req, res) => {
// Create the server using the HTTP module.
// The callback is triggered for each incoming request.

    const log = `${Date.now()}:${req.url} New req recived\n`;
    // Create a log string containing the current timestamp and the URL of the request.
    // This will be logged to a file for tracking requests.

    fs.appendFile('log.txt', log, (err, data) => {
    // Append the log string to a 'log.txt' file, adding new requests at the end.
    // The callback handles the response to the request.

        if (req.url == '/') {
        // Check if the request is for the homepage ("/").
        // If true, respond with "Homepage" content.
            res.end("Homepage");
        }

        else if (req.url == '/About') {
        // Check if the request is for the "/About" page.
        // If true, respond with "About page" content.
            res.end("About page");
        }
    });

    console.log("new request received");
    // Print a message to the console when a new request is received.
    // This helps with debugging and monitoring server activity.

});

myserver.listen(8000, () => {
// Start the server and have it listen on port 8000.
// The callback will run when the server successfully starts.

    console.log("server started");
    // Print a message to the console indicating the server has started.
});
