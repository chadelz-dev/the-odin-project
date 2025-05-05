// ////////////////////////////////////////////////////////////////////////////

// example 9: CommonJS
import { camelCaseStrESM } from './stringUtils.js';

console.log(camelCaseStrESM('Camel case this string'));

/*

// ////////////////////////////////////////////////////////////////////////////

-- example 9: CommonJS

-- what it does:

 - compares CommonJS and ESM syntax for a string utility function


-- how it works:

 - commonJS (stringUtils.cjs):

   - uses module.exports to export an object.

   - imported with require in Node.js

   - dynamic module system - Node.js only.


 - ESM (stringUtils.js):

   - ESM - in case you forgot, es6 modules.

   - uses export keyword to export a named value.

   - imported with the import keyword in Node.js (ESM mode) or browsers.

   - static module system, Node.js and browsers compatible.


-- why it was used:

 - demonstrates the syntax differences,

   - CommonJS for legacy Node.js and ESM for modern apps.


 - stringUtils.cjs is for Node.js 


 - stringUtils.js is for browsers and Node.js


 - .cjs is common in older Node.js projects and npm packages.

 
 - interview questions: 
 
   - 'explain require vs import'

   - or 'compare CommonJS vs ESM'



*/
