// ////////////////////////////////////////////////////////////////////////////

// example 6: aliases
import { makeTask as taskCreator } from './taskTools.js';

const tasks = [];

tasks.push(taskCreator('study es6 modules'));
tasks.push(taskCreator('learn about aliases'));

console.log(tasks);

/*

// ////////////////////////////////////////////////////////////////////////////

-- example 6: aliases

-- what it does:

 - uses aliases to rename task exports/imports


-- how it works:

 - export alias: createTaskItem -> makeTask

 - import alias makeTask -> taskCreator

 - the original function:
 
   - const createTaskItem = (desc) => ({ id: Date.now(), desc });

   - creates an object with an id and description


-- why it was used:

 - resolves conflicts, improves clarity

 - interview questions: handle naming conflicts

*/
