// ////////////////////////////////////////////////////////////////////////////

// example 3: named exports:

// importing named exports
import { uppercaseTitle, shortenContent } from './blogTools.js';

const blogPost = {
  title: 'Mastering ES6 Modules',
  content:
    'ES6 modules simplify code organization with private scopes and explicit imports.',
};

console.log(uppercaseTitle(blogPost.title));
console.log(shortenContent(blogPost.content, 30));
/*

// ////////////////////////////////////////////////////////////////////////////

-- example 3: named exports:

-- what it does:

 - exports blog utilities and imports them for use


-- how it works:

 - blogTools.js exports functions (uppercaseTitle and shortenContent)

 - blogApps.js imports blogTools.js and uses the functions


 - private scope isolates blogPost 

   - it only exists inside this module (blogApps.js)

   - other files cannot access it unless explicitly exported

   - gets its own private scope, preventing global namespace polution.


-- why it was used:

 - named exports for utility modules, 
 
 - explicit imports clarify dependencies.


-- relevance:

 - interview questions: string utility modules

*/
