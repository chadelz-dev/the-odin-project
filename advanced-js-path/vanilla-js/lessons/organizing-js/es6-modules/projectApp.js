// ////////////////////////////////////////////////////////////////////////////

// example 8: entry point and dependency graph
import { projectList, addProject } from './projectManager.js';

addProject('ES6 module system being added via projectApp');
addProject('ES6 modules are great');

console.log(projectList);

/*

// ////////////////////////////////////////////////////////////////////////////

-- example 8: entry point and dependency graph

-- what it does:

 - uses a single entry point for a project manager


-- how it works:

 - projectApp.js imports from projectManager.js,

 - which imports from projectUtils.js


-- why it was used:

 - single entry point amplifies setup, supports tree-shaking

   - tree shaking is an optimization technique:
   
   - it removes unused code (dead code) from the final bundle 
   
     - by only including code that is actually imported and used in your app.


   - think of it like shaking a tree 
   
     - the dead leaves (unused code) fall off, 
     
     - leaving only the essential parts that your app needs, 
     
       - this results in smaller bundle sizes.

 - interview questions: show a dependency graph, or what is a tree shaking?
 
*/
