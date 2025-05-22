// ////////////////////////////////////////////////////////////////////////////

// example 1: pre-es6 global scope

const appMessage = 'a Global Welcome to the App!';

/*

// ////////////////////////////////////////////////////////////////////////////

-- ES6 Modules

-- what it does:

 - shows global scope sharing in non module scripts


-- how it works:

- scripts share global scope, so appMessage is accessible in globalTwo.js

- order matters, globalTwo.js placed first in html would cause a ReferenceError

- pre es6 standard prone to conflicts


-- pitfalls 

 - naming conflicts (eg: 2 config variables with same name)

 - script order dependency


*/
