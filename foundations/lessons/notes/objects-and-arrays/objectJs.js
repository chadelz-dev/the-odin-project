// Objects (javascript.info)

// Creating Objects

// 1. Object Constructor:
let person = new Object();

// 2. Object Literals:
let user = {};

// ////////////////////////////////////////////////////////////////////////////

// Adding Properties to declared but empty objects:
user = {
  name: "John",
  age: 30,
};
console.log(`user name and age: ${user.name}, ${user.age}`);

// Overwriting Objects:
user = {
  name: "Jane",
  age: 25,
};
console.log(`user name and age: ${user.name}, ${user.age}`);

// Using Object Literals for number key-names:
let bottlesObj = {
  1: "One",
  2: "Two",
  99: "Ninety-Nine",
};
console.log(bottlesObj);

// Adding Properties to existing Objects using Dot Notation:
user.surname = "Doe";
console.log(
  `user name, age and surname: ${user.name}, ${user.age}, ${user.surname}`
);

// Adding Properties to existing Objects using Square Bracket Notation:
user["city"] = "New York";
console.log(`user name and city: ${user.name}, ${user.city}`);

// Square Brackets are more for Key-Names with Spaces:
user["likes birds"] = true;
console.log(`user name and likes birds: ${user.name}, ${user["likes birds"]}`);

// & Special Characters (hyphens)
user["has-clearance"] = true;
console.log(
  `user name and has-clearance: ${user.name}, ${user["has-clearance"]}`
);

// also used for adding numeric key-Names
let secretsToTheUniverse = {};

// adding properties
secretsToTheUniverse[1] = "One";
secretsToTheUniverse[2] = "Two";
secretsToTheUniverse[42] =
  "The Answer to the Ultimate Question of Life, The Universe, and Everything";

console.log(secretsToTheUniverse);
console.log(secretsToTheUniverse[42]);

// also used for adding Dynamic Values ex: from variables
let firstKey = "pet";
let secondKey = "faveColour";

user[firstKey] = "dog";
user[secondKey] = "red";

// Adding Properties using Object.assign()
Object.assign(user, { isAdmin: true, isSuperUser: true });
console.log(user);

// Adding Properties using Spread Operator (...) and editing existing values
user = { ...user, hobby: "surfing", isSuperUser: false };
console.log(user);

// ////////////////////////////////////////////////////////////////////////////

// Removing Properties:

// delete special character key-name properties:
delete user["likes birds"];
console.log(user[`likes birds`]); // returns undefined

// delete regular key-name properties:
delete user.faveColour;
console.log(user); // faveColour property is removed

// ////////////////////////////////////////////////////////////////////////////

// Computed Properties (same as dynamic value key-names from variables)

let fruit = "apple";

let bag = { [fruit]: 5 }; // name of property is taken from the variable fruit

// change the value of apples
bag[fruit] = 10;
console.log(bag); //  returns { apple: 10 }

// change the name of properties using dynamic values
bag = {
  [fruit + "Computers"]: 5, // bag.appleComputers = 5
};
console.log(bag); //  returns { appleComputers: 5 }

// not a dynamic value no square brackets
bag = { fruit: 5 }; // name of property is now fruit and not apple
console.log(bag); //  returns { fruit: 5 }

// ////////////////////////////////////////////////////////////////////////////

// Property Value Shorthand:

function makeUser(name, age) {
  return {
    name, // same as typing name: name
    age, // same as typing age: age
    // ...other properties
  };
}

let user2 = makeUser("Alice", 30);
console.log(user2); // Alice

// ////////////////////////////////////////////////////////////////////////////

// Property Name Rules Keys can be any string or symbol. even reserved words

let loopObject = { for: 1, let: 2, return: 3 };
console.log(loopObject);

// ////////////////////////////////////////////////////////////////////////////

// Property Existence Test:

let nexusBalance526 = {};

// using object.property === undefined (true = property does not exist)
console.log(nexusBalance526.noSuchProperty === undefined);

// defining the Object
nexusBalance526 = {
  name: "Nexus Balance 526",
  type: "Catamaran",
  length: 15.8, // in meters
  sailArea: 140, // square meters
  cabins: 3,
  motor: "Yanmar 4JH4-HTE",
  daggerBoards: true,
};

// using "in" to check the existence of the property:
console.log("Checking an Existing Property: ", "length" in nexusBalance526); // returns true

console.log(
  "Checking a Non-Existing Property: ",
  "flyingWings" in nexusBalance526
); // returns false

// checking a variable for property name
let yachtKey = "sailArea";
console.log(yachtKey in nexusBalance526); // returns true

// why in is better than === undefined in some use cases:
nexusBalance526.motor = undefined;

console.log(nexusBalance526.motor); // returns undefined (but property exists)
console.log("motor" in nexusBalance526); // returns true
console.log(nexusBalance526.motor === undefined); // returns true

nexusBalance526.motor = "Yanmar 4JH4-HTE";

// ////////////////////////////////////////////////////////////////////////////

// The "for...in" loop: specificaly designed for objects

// iterates over all enumerable properties of an object
// is different from the for(;;) construct

// Ex. Iterating over an objects Properties:

for (let prop in nexusBalance526) {
  console.log(prop); // logs properties names
  console.log(nexusBalance526[prop]); // logs property values
}

// //////

// Rules for Property Order:

// Interger-like keys: Sorted in ascending order
// Non-integer keys: Sorted in creation order

// Ex. Interger-like Keys Sorting:
let phoneCodesWrong = {
  49: "Germany",
  41: "Switzerland",
  44: "Great Britain",
  // ..,
  1: "USA",
};

for (let code in phoneCodesWrong) {
  console.log(`Interating through phoneCodesWrong: ${code}`); // 1, 41, 44, 49
}

// Fixing Integer-like Sorting with Non-integer Keys:
let phoneCodesFixed = {
  "+49": "Germany",
  "+41": "Switzerland",
  "+44": "Great Britain",
  "+1": "USA",
};

for (let code in phoneCodesFixed) {
  console.log(`Interating through phoneCodesFixed: ${code}`); // +49, +41, +44, +1
  console.log(+code);
}

// ////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////

// -- Difference between Objects and Primitives (Odin Project Section)

console.log(
  "-- Difference between Objects and Primitives (Odin Project Section)"
);

// Copying Primitives
let originalData = 42;
let copiedData = originalData; // copiedData is a copy of data

copiedData = 99; // changing copiedData does not affect originalData

console.log(originalData); // Outputs: 42
console.log(copiedData); // Outputs: 99

// Copying Objects
const originalObj = { data: 42 };
const copiedObj = originalObj; // copiedObj is a reference to the same object

copiedObj.data = 99; // changing copiedObj affects the original object

console.log(originalObj.data); // Outputs: 99
console.log(copiedObj.data); // Outputs: 99

// functions with the same behavior
function increaseCounterObject(objectCounter) {
  objectCounter.counter += 1; // does affect the original variable
}

function increaseCounterPrimitives(primitiveCounter) {
  primitiveCounter += 1; // doesn't affect the original variable
}

const object = { counter: 0 };
let primitive = 0;

increaseCounterObject(object);
increaseCounterPrimitives(primitive);

console.log(object.counter); // Outputs: 1
console.log(primitive); // Outputs: 0

// Reassigning Object Data Type Varaibles
let animal = { species: "dog" };
let dog = animal; // dog and animal refer to the same object

animal = { species: "cat" }; // reassigning animal to a new object

console.log(animal); // { species: "cat" }
console.log(dog); // { species: "dog" }

// Changing Content Will Affect All Variables Referencing the object
let wildCat = { species: "lion" };
let anotherWildCat = wildCat;

anotherWildCat.species = "leopard"; // changes wilCat's species property too

console.log(wildCat); // { species: "leopard" }
console.log(anotherWildCat); // { species: "leopard" }

// reassigning example re-inforcement
let wildCat2 = { species: "lion" };
let anotherWildCat2 = wildCat2;

anotherWildCat2 = { species: "leopard" };

console.log(wildCat2); // { species: "lion" }
console.log(anotherWildCat2); // { species: "leopard" }
