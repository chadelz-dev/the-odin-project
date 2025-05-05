// ////////////////////////////////////////////////////////////////////////////

// example 2: pre-es6 module patterns with IIFE

// create private scope and expose only 1 variable
const appUtils = (() => {
  const internalGreeting = 'Welcome, User from IIFE!';
  const internalExit = 'Goodbye, User from IIFE!';
  return internalGreeting;
})();

/*

// ////////////////////////////////////////////////////////////////////////////

-- example 2: pre-es6 module patterns with IIFE

-- what it does:

 - uses IIFE for private scope and exposing only 1 variable


-- how it works:

 - IIFE scopes variables, only internalGreeting is returned

   - internalGreeting is returned but not accessible as "internalGreeting",

   - rather you access it by calling the IIFE function appUtils

     - see iifeConsumer.js : console.log(appUtils);


 - internalExit is not returned, keeping it private.


-- why it was used:

 - mimics modularity pre-es6, controlling exposure of variables.


-- pitfalls:

 - verbose and error prone (eg: forgetting return)

 - relies on global scope for sharing, can cause conflicts.

*/
