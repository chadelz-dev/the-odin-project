const repeatString = function(string, num) {
    if (num < 0) {
        return "ERROR"; // Handle negative numbers immediately
    }

    if (num === 0) {
        return ""; // Handle zero without entering the loop
    }

    let finalString = ''; // Initialize the final string

    for (let i = 0; i < num; i++) {
        finalString += string; // Append the string
    }

    return finalString; // Return the final result
};

// Example usage
console.log(repeatString("hey", 3));    // Expected: "heyheyhey"
console.log(repeatString('hello', 10)); // Expected: "hellohellohello..."
console.log(repeatString('hi', 1));     // Expected: "hi"
console.log(repeatString('bye', 0));    // Expected: ""
console.log(repeatString('goodbye', -1)); // Expected: "ERROR"


// Do not edit below this line
module.exports = repeatString;
