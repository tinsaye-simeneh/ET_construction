// This a helper function file for our applicatiion
const HelperFunctions = _ => {
    // Add the forEach methhod to the NodeList and HTMLCollection classes
    HTMLCollection.prototype.forEach = Array.prototype.forEach;
    NodeList.prototype.forEach = Array.prototype.forEach;
};