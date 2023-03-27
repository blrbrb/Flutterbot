module.exports = {
    send: function(callback, message) {
        callback(removeEveryoneMentions(message));
    },
    removeEveryone: removeEveryoneMentions
}

function removeEveryoneMentions(text) {

    if (typeof text !== "string") {
        console.warn("Something called this function without passing in a string");
        text = String(text);
    }

    // Define regex pattern to match @everyone mentions
    const pattern = /@everyone/g;

    // Use String.replace() to replace all matches of the pattern with an empty string
    const updatedText = text.replace(pattern, "");

    // Return the updated text
    return updatedText;
}