const fs = require('fs');

// Synchronous call to write a string to a file.
// It creates 'test.txt' if it doesn't exist and overwrites if it does.
fs.writeFileSync('./test.txt', 'Hello');

// Asynchronous call to write a string to a file.
// It creates 'test2.txt' if it doesn't exist and writes data.
// The callback function will handle errors but is empty here.
fs.writeFile("./test2.txt", "Hello I m asynchronus call", (err) => {});

// Synchronous call to read data from 'Contacts.txt'.
// 'utf-8' encoding ensures the file is read as a string.
const ap = fs.readFileSync('./Contacts.txt', "utf-8");
console.log(ap);

// Asynchronous call to read data from 'Contacts.txt'.
// If there’s an error, it logs the error, else it logs the file content.
const app = fs.readFile('./Contacts.txt', "utf-8", (err, result) => {
    if (err) {
        console.log("error", err);
    } else {
        console.log(result);
    }
});

// Synchronous call to append data to 'test.txt' without overwriting existing content.
// Adds a timestamp and custom message, preserving the previous content.
fs.appendFileSync('./test.txt', `this does not overwrite data it append means add data ${Date.now()} Hey there you logged on this date`);

// Synchronous call to copy the content of 'test.txt' to 'test2.txt'.
// If 'test2.txt' exists, it will be overwritten.
fs.cpSync('./test.txt', './test2.txt');

// Synchronous call to delete 'test2.txt'.
// Throws an error if the file doesn't exist.
fs.unlinkSync('./test2.txt');

// Synchronous call to retrieve and log the stats of 'Contacts.txt'.
// Returns metadata such as size, creation time, and file permissions.
console.log(fs.statSync('./Contacts.txt'));

// Asynchronous call to create a directory structure (folders).
// {recursive:true} ensures that intermediate directories ('a/b') are created if they don't exist.
fs.mkdir("my--docs/a/b", {recursive: true});
