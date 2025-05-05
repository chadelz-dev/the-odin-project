// ////////////////////////////////////////////////////////////////////////////

// example 4: default exports:

import socialFeedSettings from './feedSettings.js';

console.log('feedConfig object: \n', socialFeedSettings);

console.log('maxPosts:', socialFeedSettings.maxPosts);
console.log('theme:', socialFeedSettings.theme);
/*


// ////////////////////////////////////////////////////////////////////////////

-- example 4: default exports:

-- what it does:

 - exportd a feed configuration object, imported with a custom name


-- how it works:

 - default exports allow custom import names

 - browser loads feedSettings.js via import statement and returns the object


-- why it was used:

 - ideal for single value modules like a config settings object.

 - relevance for interview questions: export single class/object.

 */
