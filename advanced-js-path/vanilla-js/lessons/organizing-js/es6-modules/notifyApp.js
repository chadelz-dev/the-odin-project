// ////////////////////////////////////////////////////////////////////////////

// example 7: namespace imports
import * as Notifications from './notifyTools.js';

const message = 'new user joined!';

console.log(Notifications.sendAlert(message));
console.log(
  Notifications.sendInfo('a different user joined, not from a variable.')
);

Notifications.logMessage(
  'this is not a broadcast for survivors of the apocalypse!'
);

/*

// ////////////////////////////////////////////////////////////////////////////

-- example 7: namespace imports

-- what it does:

 - imports all notification utlities as an object


-- how it works:

 - import * as Notifications creates an object with all exports

 - access via Notifications.<export name>


-- why it was used:

 - groups exports avoiding conflicts

 - useful for library imports

 - interview questions: import all utilities / build a library of utilities


-- take note:

 - the imports are in curly braces { }

   - because they are not default exports, but rather named exports

*/
