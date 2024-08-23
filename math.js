// Function that adds two numbers and returns the sum
function add(a, b) {
    return a + b;
}
function sub(a,b)
{
    return a-b;
}
// Export the add function so that it can be used in other files
module.exports = {
  addFun:  add,
    subFn:sub,
};