document.body.style.backgroundColor = "#90f0f0";

// global scope:
let globalAge = 23;

// local scope (function scope) before es6:
function printAge(age) {
  // local function scope:
  var varAge = 22;
  console.log("console log for varAge within function", varAge);
  console.log("console log for age param within function", age);

  // block scope (only available within curly braces {} of the if block):
  if (age > 0) {
    const constAge = age * 2;
    console.log(
      "console log for constAge nested in a block, within a function",
      constAge
    ); // prints 66
  }
  // console.log("constAge param outside block scope", constAge); // error unavailable to function scope
}
printAge(33); // prints 33 and 23

console.log("console log for globalAge outside function", globalAge); // prints 23

// var follows function scope:
// console.log(varAge); // unavailable to global scope = error

// ////////////////////////////////////////////////////////////////////////////

// closures: functions with memory:

function makeMultiplication(firstNumber) {
  const first = firstNumber;

  // function with locked in closure scope of 'first':
  return function resultingNumber(secondNumber) {
    const second = secondNumber;
    return first * second;
  };
}

// making a function that returns a function:
const multiplyByTwo = makeMultiplication(2);
console.log("multiply 3 by 2: ", multiplyByTwo(3)); // prints 6

// make another function
const multiplyByThreeQuarters = makeMultiplication(0.75);
console.log("multiply 1 by 3/4: ", multiplyByThreeQuarters(1)); // prints 0.75

/*

// ////////////////////////////////////////////////////////////////////////////

-- factory function notes:

-- Scope

-- global scope:

 - variables declared outside of any function or curly braces

   - are in the global scope - avialable to all functions

 - you can use them anywhere in your code

// //////


-- local scope (function scope) before es6:

 - variables declared inside a function are only available inside that function

   - this is called function scope

 - before ES6 (a big update to JS) you could use var to declare a variable

   - and var follows function scope.

// //////


-- block scope (function scope) after es6:

 - let and const were introduced in ES6

 - they are both block scoped.

   - meaning they only available within the nearest pair of curly braces {}

   - like in an if statement or a for loop.


-- key take away

 - var stays within functions.

 - let and const stay within block scopes, or curly braces {}

   - they can be inside a block, which is inside a function 
   
   - but only be avialable in the curly braces of the block it is in.


 - if you try use variables outside of their scope, JS will complain.

// ////////////////////////////////////////////////////////////////////////////


-- closures: functions with memory:

 - a closure in javascript: 
   
   - are functions that have access (memory) to variables in their outer scope

   - even after that outer scope has finished executing.


 - js automatically stores the state of a closure in the heap memory,

   - even after the parent function has returned.


 - if closures hold references to large or unnecessary data, 

   - it can lead to memory leaks, 

   - where memory is not released even when it is no longer needed.


-- code:

function makeMultiplication(firstNumber) {
  const first = firstNumber;

  return function resultingNumber(secondNumber) {
    const second = secondNumber;
    return first * second;
  };
}

const multiplyByTwo = makeMultiplication(2);
console.log("multiply 3 by 2: ", multiplyByTwo(3)); // prints 6


-- code explained:

 - makeMultiplication(2) 
 
   - sets first to equal 2, returns an new function (resultingNumber)

   - and resultingNumber knows about the variable first (2)


 - multiplyByTwo

   - is the returned function ( makeMultiplication(2) ) 
   
     - and it remembers  the variable "first" being equal to 2,

       - because of the closure


 - multiplyByTwo(3)
   
   - takes 3 as the secondNumber parameter

   - makes the second variable equal to 3 

   - returns the result of first * second
 
 
 - closure role

   - the inner function resultingNumber references first in its scope:

     - return first * second so,


     - when makeMultiplication(2) returns resultingNumber, 

       - and assigns it to multiplyByTwo, the function reference/name 

       - javascript does not return the function itself,

         - rather it bundles the function with the variables it references,

         - this bundling together process is closure.


     - it is not first itself keeping the value of first in memory.

       - it is the fact that resultingNumber needs first to work,

       - and the closure ensures first exists as long as multiplyByTwo exists

*/

// ////////////////////////////////////////////////////////////////////////////

// factory functions:

// notes on object literal shorthand first:

// old way of defining an object with variables:
const name = "Bob";
const age = 28;
const color = "red";

// explicit property assignment (traditional way):
const thatObject = { name: name, age: age, color: color };
console.log("explicit property assignment: ", thatObject); // { name: "Bob", age: 28, color: "red" }

// newer object literal shorthand method:
const nowFancyObject = { name, age, color };
console.log("object literal shorthand:", nowFancyObject); // { name: "Bob", age: 28, color: "red" }

// also easier for console logging:
console.log("easy for quick console logging", { name, age, color }); // { name: "Bob", age: 28, color: "red" }

// //////
// //////

// factory function example:
function createDiscordUser(name) {
  const discordName = "@" + name;
  return { name, discordName };
}

const userOne = createDiscordUser("Bob");
console.log("factory function createUser() - userOne: ", userOne); // { name: "Bob", discordName: "@Bob" }

/*

// ////////////////////////////////////////////////////////////////////////////


-- factory functions:

 - are just regular functions that create and return objects and functions.

 - the benefit is is in:

   - no need for the new keyword

   - no need for prototypes, 
   
   - just call the function and you get an object.


 - factory functions are a much better alternative to using constructors.


-- code:

function createDiscordUser(name) {
  const discordName = "@" + name;
  return { name, discordName };
}

const userOne = createDiscordUser("Bob");


-- code explained:

 - createDiscordUser("Bob")

   - takes "Bob" as the name parameter

   - creates a discordName variable by adding "@" to the name

   - returns an object with name and discordName properties

   

-- a note on object creation shorthand:

 - traditionally, to create an object you would do this:

const name = "Bob";
const age = 28;
const color = "red";

const thatObject = { name: name, age: age, color: color };


 - but with the shorthand, 
 
   - we can now use the object literal syntax to create an object:

const nowFancyObject = { name, age, color };


 - the shorthand works because JS uses the variable name as the property name

 - it also uses the variables value as the property value, 

   - but only if that variable is already defined, 

   - so if name, age or color aren't variables in the scope, this wont work.

     - the property names need existing variables to pull their values from.

     - plus a neat bonus; it makes logging cleaner, ex:
     
console.log({ name, age, color }); // { name: "Bob", age: 28, color: "red" }

*/

// ////////////////////////////////////////////////////////////////////////////

// destructuring: unpacking objects and arrays:

// destructuring: unpacking objects:
const objOne = { a: 1, b: 2, c: 4 };
const { a, b, c } = objOne;
console.log("destructuring an object: ", a, b, c); // 1 2 4

// destructuring: unpacking arrays:
const arrOne = [1, 2, 3, 4, 5];
const [first, second, third, , fifth] = arrOne; // skip fifth
console.log("destructuring an array: ", first, second, third, fifth); // 1 2 3

/*

// ////////////////////////////////////////////////////////////////////////////


-- destructuring: unpacking objects:

 - you can pull properties out of an object/array and assign them to variables.


-- arrays:

 - When using array destructuring, even though we use square bracket syntax [],

   - we're not creating a new array,
   
   - we're actually creating individual variables.


 - The square brackets [] in destructuring:
 
   - are just a special syntax that tells javascript to:
 
   - "match these variable names to array positions in order".


-- code example for array destructuring:

const [first, second, third, , fifth] = arrOne;

 - this above, is the equivalent to below:

const first = arrOne[0];
const second = arrOne[1];
const third = arrOne[2];
const fifth = arrOne[4];

// //////
// //////


-- objects:

 - 

-- code example for object destructuring:

 - Object destructuring works in a similar way as array destructuring. 
 

 - The curly braces {} in destructuring an object:
 
   -  are just syntax for matching property names, not creating a new object.


 - the "skip" or not get the value of the property:

   -  simply just leave out any properties you don't want

   - with objects you match by property name, not by position.


-- code example for object destructuring:

const { a, b, c } = objOne;

 - this above, is the equivalent to below:

const a = objOne.a;
const c = objOne.c;

*/

// ////////////////////////////////////////////////////////////////////////////

// private variables and functions, keeping secrets:

function createUser(name) {
  let formattedName = name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");

  const discordName = "@" + formattedName;
  let reputation = 0; // private variable

  const getReputation = () => reputation; // arrow function for reading reputation
  const giveReputation = () => reputation++; // arrow function for giving reputation

  return { name, discordName, getReputation, giveReputation };
}

// create a user
const chadelz = createUser("Chadelz");

// give some reputation to chadelz
chadelz.giveReputation(); // increase reputation by 1
chadelz.giveReputation(); // increase reputation again

// console log the reputation
console.log(
  "call getReputation() on chadelz object: ",
  chadelz.getReputation()
); // prints 2

// temporary object created from the chadelz object for console logging
console.log("temporary object for console logging: ", {
  discordName: chadelz.discordName,
  reputation: chadelz.getReputation(),
});

// Instead of logging them separately like:
console.log("console log individual properties: ", chadelz.discordName);
console.log("console log individual properties: ", chadelz.getReputation());

/*

// ////////////////////////////////////////////////////////////////////////////

-- private variables and functions, keeping secrets:

 - factory functions can use closure to hide variables and functions,

   - making them "private" - you cannot access them directly from outside.

   

-- code:

function createUser(name) {
  let formattedName = name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");

  const discordName = "@" + formattedName;
  let reputation = 0; // private variable

  const getReputation = () => reputation; // arrow function for reading reputation
  const giveReputation = () => reputation++; // arrow function for giving reputation

  return { name, discordName, getReputation, giveReputation };
}


-- code explained:

 - "reputation" value is private because it is not in the returned object.

 - only "getReputation" and "giveReputation" can access the reputation value.


 - you cannot do chadelz.reputation

   - it is undefined.


 - this keeps data safe,

   - nobody can accidentally or sneakily set reputation to something crazy.

   - you control how the data is accessed or changed.


 - .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())

   - Splits the string into an array of words and then,

   - Maps over each word to:

     - Take first character ( charAt(0) ) and make it uppercase
     - Take rest of word ( slice(1) ) and make it lowercase
     - Combine them together
     - Joins the words back together with hyphens
*/

// ////////////////////////////////////////////////////////////////////////////

// prototypal inhereitance with factory functions, sharing abilities:

// example 1 picking what you need:
function createPlayer(name, level) {
  // taking getReputation and giveReputation from createUser
  const { getReputation, giveReputation } = createUser(name);

  // creating a new function that returns the level and one to increase it
  const getLevel = () => level;
  const increaseLevel = () => level++;

  // returning what we need
  return {
    name,
    getReputation,
    giveReputation,
    getLevel,
    increaseLevel,
  };
}

const player = createPlayer("Chadelz the First", 1);

player.giveReputation(); // increases reputation by 1
player.increaseLevel(); // increases level by 1

// this player object has no discordNmae
console.log({
  name: player.name,
  level: player.getLevel(),
  reputation: player.getReputation(),
});

// //////
// //////

// example 2 using Object.assign to pick and choose what you need:
function createAnotherPlayer(name, level) {
  const user = createUser(name);

  const getLevel = () => level;
  const increaseLevel = () => level++;

  return Object.assign(user, { getLevel, increaseLevel });
}

const anotherPlayer = createAnotherPlayer("Chadelz the Second", 10);
anotherPlayer.giveReputation(); // increases reputation by 1
anotherPlayer.giveReputation(); // increases reputation again
anotherPlayer.increaseLevel(); // increases level by 1

console.log({
  name: anotherPlayer.name,
  discordName: anotherPlayer.discordName,
  level: anotherPlayer.getLevel(),
  reputation: anotherPlayer.getReputation(),
});

/*

// ////////////////////////////////////////////////////////////////////////////

-- prototypal inhereitance with factory functions, sharing abilities:

 - inhereitance is a way to share abilities between objects.

   - it lets one object use another object's features.


 - with factory functions we can build on existing objects.


-- code:

 console.log({
   discordName: player.discordName,
   level: player.getLevel(),
 });


-- code explained:
 
   - The level parameter already initializes the value of level
     - It's stored in the closure, not as a property of the object

   - You never see level directly in the object
     - because it's private, just like reputation

// //////
// //////


-- code from example 2:

function createAnotherPlayer(name, level) {
  const user = createUser(name);

  const getLevel = () => level;
  const increaseLevel = () => level++;

  return Object.assign(user, { getLevel, increaseLevel });
}

const anotherPlayer = createAnotherPlayer("Chadelz the Second", 10);

anotherPlayer.giveReputation(); 
anotherPlayer.giveReputation(); 
anotherPlayer.increaseLevel(); 

console.log({
  name: anotherPlayer.name,
  discordName: anotherPlayer.discordName,
  level: anotherPlayer.getLevel(),
  reputation: anotherPlayer.getReputation(),
});

-- code explained:

 - createAnotherPlayer starts with a user from createUser

 - adds getLevel and increaseLevel to the user object, (add more features)

 - Object.assign merges everything into a new object, 
 
   - keeping the original user untouched.

*/

// ////////////////////////////////////////////////////////////////////////////

// module patterns with IIFE's, one time packages:

const calculator = (function () {
  const add = (a, b) => a + b;
  const sub = (a, b) => a - b;
  const mul = (a, b) => a * b;
  const div = (a, b) => a / b;

  return { add, sub, mul, div };
})();

console.log(calculator.add(3, 5)); // 8
console.log(calculator.sub(6, 2)); // 4
console.log(calculator.mul(14, 5534)); // 77476

/*

// ////////////////////////////////////////////////////////////////////////////

-- module patterns with IIFE's, one time packages:

 - an IFFE ( immediately invoked function expression )

   - is a function that is executed immediately after it is defined.

   - wrap a factory function in an IIFE to make it a module pattern.

     - they are perfect for creating a single object with private variables.

     

-- code example basic syntax:

const calculator = (function () {})();


-- code explained:

 - (function() { ... })();

   - the brackets () at the end runs the function immediately

   - returns an object with add, sub, mul, div functions


 - add, sub, etc are all private functions.

   - they are not exposed outside of the IIFE, unless returned.


 - calculator is now an object that can be used anywhere.


 - IIFE's are good for when you only need one instance of something.
   - like a calculator, or a logger, or a database connection.

 - keeps your code tidy, hiding the inner workings.



// ////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////


-- note on encapsulation and namespacing (staying organized):


-- encapsulation:

 - building data and functions into one unit (like a module)

   - and only showcasing what is necessary


 - in the calculator example above,

   - the functions are encapsulated inside the module,
   
   - and only the returned ones are usable.


-- namespacing:

 - prevents name clashes.

   - imagine having multiple add functions in your code,

   - how do you know which one to use?


 - with the module pattern, you get calculator.add()

   - it is clean and unique.


 - instead of a loose ad(3, 5) you write calculator.add(3, 5)

   - no confusion with other add functions etc.


// ////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////


-- summary

 - Scope: 
   - Where variables live 
   — global,   function (with var),   or block (with let and const).


 - Closures: 
   - Functions that remember their birth variables, 
   - super useful for privacy.


 - Constructors’ Downsides: 
   - Tricky with new and unreliable with instanceof.


 - Factory Functions:
   - Simple object-makers using closures, no new needed.


 - Private Stuff:
   - Hide variables and functions with closures for safety.


 - Inheritance:
   - Build new objects from old ones with factories.


 - Module Pattern & IIFEs:
   - Create one-off objects with private parts.


 - Encapsulation & Namespacing:
   - Organize and protect your code.



*/
