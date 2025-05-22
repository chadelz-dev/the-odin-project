// ////////////////////////////////////////////////////////////////////////////

// example 9: CommonJS

// ESM: browser/Node.js string utility
// ESM: browser/Node.js string utility
export const camelCaseStrESM = (str) => {
  // Handle edge cases (empty strings)
  if (!str) return '';

  // Split the string, transform to camelCase, and join without spaces
  return str
    .split(' ')
    .map((word, index) => {
      // Make everything lowercase first
      word = word.toLowerCase();
      // If it's not the first word, capitalize the first letter
      return index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');
};

/*

-- what it does:
 
 - takes a string input

 - handles empty/null strings

 - converts the first word to all lowercase

 - capitalizes subsequent words' first letters

 - removes all spaces

*/
