const fs = require('fs');

// Blocking request - Synchronous call to write a string to a file.
// The program waits until 'test.txt' is completely written before moving on.
fs.writeFileSync('./test.txt', 'Hello, this is a synchronous write.');

// Blocking request - Synchronous read operation.
// The program will wait until 'Contacts.txt' is fully read before proceeding to the next line.
const data = fs.readFileSync('./Contacts.txt', 'utf-8');
console.log("Synchronous Read: ", data);

// Blocking request - Synchronous append operation.
// This appends data to 'test.txt' without overwriting the existing content.
fs.appendFileSync('./test.txt', 'This is appended text in a synchronous call.');

// Blocking request - Synchronous copy operation.
// Copies content from 'test.txt' to 'test2.txt'. The program waits until the copy is done.
fs.cpSync('./test.txt', './test2.txt');

// Blocking request - Synchronous file delete operation.
// Deletes 'test2.txt'. The program waits until the file is completely removed.
fs.unlinkSync('./test2.txt');

// Blocking request - Synchronous stats.
// Retrieves and logs metadata about 'Contacts.txt', such as size and creation time.
const stats = fs.statSync('./Contacts.txt');
console.log("File Stats (Synchronous): ", stats);

// Non-blocking request - Asynchronous operation to write data to 'test.txt'.
// The program does not wait and moves on. Once the write is done, the callback logs the result.
fs.writeFile('./test.txt', 'Hello, this is an asynchronous write.', (err) => {
    if (err) {
        console.log("Error writing file:", err);
    } else {
        console.log("File written asynchronously");
    }
});

// Non-blocking request - Asynchronous read operation.
// The program will continue executing without waiting for 'Contacts.txt' to be read.
// Once reading is complete, the callback logs the result.
fs.readFile('./Contacts.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log("Error reading file:", err);
    } else {
        console.log("Asynchronous Read: ", data);
    }
});

// Non-blocking request - Asynchronous append operation.
// Appends data to 'test.txt'. The callback handles any errors and logs success once done.
fs.appendFile('./test.txt', 'This is appended asynchronously.', (err) => {
    if (err) {
        console.log("Error appending to file:", err);
    } else {
        console.log("Data appended asynchronously");
    }
});

// Non-blocking request - Asynchronous copy operation.
// Copies content from 'test.txt' to 'test2.txt' asynchronously. The program doesn't wait.
fs.copyFile('./test.txt', './test2.txt', (err) => {
    if (err) {
        console.log("Error copying file:", err);
    } else {
        console.log("File copied asynchronously");
    }
});

// Non-blocking request - Asynchronous file delete operation.
// Deletes 'test2.txt'. The program does not wait; once deletion completes, the callback logs the result.
fs.unlink('./test2.txt', (err) => {
    if (err) {
        console.log("Error deleting file:", err);
    } else {
        console.log("File deleted asynchronously");
    }
});

// Non-blocking request - Asynchronous stats.
// Retrieves metadata about 'Contacts.txt'. The program continues running, and the callback logs the result once done.
fs.stat('./Contacts.txt', (err, stats) => {
    if (err) {
        console.log("Error getting file stats:", err);
    } else {
        console.log("File Stats (Asynchronous): ", stats);
    }
});

// Non-blocking request - Asynchronous directory creation.
// Creates the directory structure 'my--docs/a/b' asynchronously. The 'recursive: true' option ensures intermediate directories are created if they don't exist.
fs.mkdir("my--docs/a/b", { recursive: true }, (err) => {
    if (err) {
        console.log("Error creating directories:", err);
    } else {
        console.log("Directories created asynchronously");
    }
});

console.log("This log shows that async operations are non-blocking.");
