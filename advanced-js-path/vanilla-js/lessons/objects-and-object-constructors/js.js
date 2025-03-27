// test whether js is connected:
document.body.style.backgroundColor = "#f0f0f0";

// refresher on objects

// object literal syntax

const myObject = {
  property: "Value!",
  anotherProperty: 22,
  "obnoxious property": function () {
    // do stuff
  },
};

// accessing properties

// dot notation
myObject.property; // "value"

// bracket notation
myObject["obnoxious property"]; // function

/*  

-- code explained:

 - myObject is an object

   - has 3 properties:

     - property (string)
     - anotherProperty (number)
     - obnoxious property (function) 

       - obnoxious property is a function but it is also a computed property name

       - or a special character property name because of the space in the name

    
 - dot notation

   - clean and readable. the prefered option.

   - myObject.property


 - bracket notation

   - not recommended but it is used in some use cases for example here:

     - we have a property name that has a space in it which would 
       - make the dot notation invalid (myObject.obnoxious property)


     - it is also flexible for dynamic keys, like variables, example:

       const variable = "property";
       myObject[variable];  // 'Value!'
       myObject.variable;  // undefined

       - dot notation (myObject.variable) looks for a PROPERTY literally
         -  named variable and not the value of the variable, 'property'.

       - bracket notation evaluates the expresiion inside the brackets []

         - it doesn't search for a property literally named 'variable'
           - it searches for the value of the variable, which is 'property'

       - so essentially myObject[variable] is the same as myObject['property']

*/

// ////////////////////////////////////////////////////////////////////////////

// objects as design patterns for grouping and organizing data

// scattered variables
const playerOneName = "Tim";
const playerTwoName = "Jenn";
const playerOneMarker = "X";
const playerTwoMarker = "O";

// organized with objects
const playerOne = {
  name: "Tim",
  marker: "X",
};

const playerTwo = {
  name: "Jenn",
  marker: "O",
};

// function use:
function printName(player) {
  console.log(player.name); // accessing name property on any object passed
}
printName(playerOne, playerTwo); // Tim

// dynamic use:
function gameOver(winningPlayer) {
  console.log("Congratulations!");
  console.log(winningPlayer.name + " is the winner!");
}
gameOver(playerOne); // 1st line: "Congratulations!" 2nd: "Tim is the winner!"

// ////////////////////////////////////////////////////////////////////////////

// object constructors

function PlayerConstructor(name, marker) {
  this.name = name;
  this.marker = marker;
}

// use case:
const playerExample = new PlayerConstructor("Steve", "X");
console.log(playerExample.name); // Steve
// new keyword: creates an object, sets this & assigns properties to the object

// with method:
function Player(name, marker) {
  // new.target mete-property: safegaurd against constructors without new keyword
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.name = name;
  this.marker = marker;
  this.sayName = function () {
    console.log(this.name);
  };
}

const playerFour = new Player("Steve", "X");
const playerFive = new Player("Also Steve", "O");
playerFour.sayName(); // Steve
playerFive.sayName(); // Also Steve

// exercise - create a
function BookConstructor(title, author, pages, bookRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.bookRead = bookRead;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.bookRead ? "read" : "not read yet"
    }`;
  };
}

const bookOne = new BookConstructor("The Hobbit", "J.R.R. Tolkien", 295, false);
console.log(bookOne.info()); // The Hobbit by J.R.R. Tolkien, 295 pages, not read yet

/*

-- object constructors

 - object constructors are used when:
   - you need to create duplicates (like our player example or inventory items)

 - object constructors are regular functions with an uppercase initial letter.


 - you can use the constructor by calling the function with the 'new' keyword

   - because constructors are just regular functions,

   - they can be called without using the 'new' keyword, by mistake.

     - which causes hard to track errors, to prevent this:

     - you can use the new.target meta-property in the function (as above)

       if (!new.target) {
       throw Error("You must use the 'new' operator to call the constructor");

       - new.target ensures 'new' is used, else 'this' keyword might misbind.
  



*/

// ////////////////////////////////////////////////////////////////////////////

// the prototype:

// accessing an object's prototype

// created with an object creator function and a 'new' keyword returns true
console.log(Object.getPrototypeOf(playerFour) === Player.prototype);

// created without an object creator function, returns false
console.log(Object.getPrototypeOf(playerExample) === Player.prototype);

// accessing the prototype
Player.prototype.sayHello = function () {
  console.log("Hello, I'm a player!");
};

playerFour.sayHello(); // logs "Hello, I'm a player!"

// Object.getPrototypeOf() vs. .__proto__ vs. [[Prototype]]

// don't do this this:
console.log(playerFour.__proto__ === Player.prototype);

// this is the same as, so rather do this:
console.log(Object.getPrototypeOf(playerFour) === Player.prototype);

/* 

-- the prototype

 1.- all objects have a prototype  in JavaScript

   - player objects created earlier also have a prototype

 2.
 - the prototype is another object

   - the prototype is the object that the constructor function will return

   - the prototype object can have properties and methods

     - just like our player objects created earlier have:

     - properties like .name .marker and functions like .sayName attached

3.
 - the original object inherits from,
 -  and has access to all of its prootype's properties and methods

   - here the 'original' object refers to an object like:
   
     - playerFour and playerFive - created with the object constructor function

     - these objects have access to the prototype's properties and methods

// ////// 


-- accessing the prototype

 - using the 3 points above to explain the prototype using the code below:

console.log(Object.getPrototypeOf(playerFour) === Player.prototype);


-- explained:

1. 
 - check the objects prototype by using Object.getPrototypeOf() function

 - playerFour is the object being passed and checked.

2.
 - the return value, or result of this function, refers to the:

   - .prototype property of the object constructor (i.e. Player(name, marker))

3.
 - all Player objects have a value refering to the Player.prototype property

   - so any properties or methods defined on Player.prototype,

   - will be avialable to objects created with the Player object constructor


 - what does defining on the prototype mean:

   - basically anything created in the Player.prototype object constructor, eg:

   
     Player.prototype.sayHello = function() {
        console.log("Hello, I'm a player!");
     };
     playerFour.sayHello(); // logs "Hello, I'm a player!"


     - sayHello() is defined on the Player.prototype object

     - playerFour can then use it

     - this is how to define / attach other properties and methods to an object

// //////


-- .__proto__ vs. [[Prototype]]

 - non standard and deprecated  way of acheiving  Object.getPrototypeOf()
 
 - you find this in legacy code.

   - playerFour.[[Prototype]] is the  same as playerFour.__proto__

   - just use Object.getPrototypeOf() instead




*/

// ////////////////////////////////////////////////////////////////////////////

// prototypal inheritance:

// Player.__proto__ === Object.prototype
console.log(Object.getPrototypeOf(Player.prototype) === Object.prototype); // true

//output may slightly differ based on browser:
console.log(playerFour.valueOf()); // output Object { name: "Steve", marker: "X" }

// using .hasOwnProperty() to check if a property is defined on an object
console.log(playerFour.hasOwnProperty("valueOf")); // false
console.log(Object.prototype.hasOwnProperty("valueOf")); // true

/*

-- prototypal inheritance:

 - what use is an objects prototype?

   - you can define properties and functions common among all objects
     -  on the prototype to save memory

   - playerFour and Five  objects inherit from the Player.prototype object, 
     - which allows them to access functions like sayHello()

     - they get it from the method we defined for sayHello on Player.prototype

       - Player.prototype.sayHello = function () { code }
  
// //////   


-- the prototype chain 

 - js uses prototypes to enable inheritance.

 - every object has a hidden link to a prototype 
   - an object that it inherits from

 - this forms a prototype chain,
   - js searches this chain to find properties and methods

-- code:

console.log(Object.getPrototypeOf(Player.prototype) === Object.prototype); 
console.log(playerFour.valueOf()); 


-- explained:

 - .valueOf() is a method that is defined on the Object prototype

   - it comes as a result of Object.getPrototypeOf(Player.prototype):
   -  having the value of Object.prototype

   - Player.prototype inherits from Object.prototype

   - the valueOf() function is defined on Object.prototype,
     - just like the .sayHello() function is defined on Player.prototype


 - how do we know valueOf() is defined on Object.prototype?

   - we can make use of another function called .hasOwnProperty()

// //////

   
-- how it works:

 - when you access a property, (eg, playerFour.valueOf()) js checks:

 - 1. the object itself:

   - does playerFour have valueOf()? - No
     - playerFour only has the .name .marker and .sayName properties

 - 2. its prototype:

   - Object.getPrototypeOf(playerFour) is Player.prototype

     - does it have valueOf()? - No, just sayHello


 - 3. the next prototype:

   - Object.getPrototypeOf(Player.prototype) is Object.prototype
     - does it have valueOf()? - Yes, it does.


 - the Chain

   - playerFour -> Player.prototype -> Object.prototype -> null

   - end of the line:

     - Object.getPrototypeOf(Object.prototype) is null,

     - if a property is not found by then, js returns undefined

*/

// ////////////////////////////////////////////////////////////////////////////

// recommended method for prototypal inheritance:

// example 1 - make Player inherit from Person

// Person Object Constructor Function
function PersonConstructorTwo(name) {
  this.name = name;
}

// attaching a method to Person.prototype
PersonConstructorTwo.prototype.sayName = function () {
  console.log(`Hello, I'm ${this.name}`);
};

// Player Object Constructor Function
function PlayerConstructorTwo(name, marker) {
  this.name = name;
  this.marker = marker;
}

// attaching a method to Player.prototype
PlayerConstructorTwo.prototype.getMarker = function () {
  console.log(`My marker is '${this.marker}'`);
};

// check before: Player's prototype is Object.prototype
console.log(
  "before: Player's prototype is Object.prototype: ",
  Object.getPrototypeOf(PlayerConstructorTwo.prototype)
);

// Link Player.prototype to Person.prototype using setPrototypeOf()
console.log(
  Object.setPrototypeOf(
    PlayerConstructorTwo.prototype,
    PersonConstructorTwo.prototype
  )
);

// checking after setting the prototype chain Player to inherit from Person
console.log(
  "Players prototype is now Persons.prototype: ",
  Object.getPrototypeOf(PlayerConstructorTwo.prototype)
);

// creating a player object which inherits person properties too
const playerOneConstructed = new PlayerConstructorTwo("Steve", "X");
console.log(playerOneConstructed.name, playerOneConstructed.marker); // Steve

const playerTwoConstructed = new PlayerConstructorTwo("also steve", "O");
console.log(playerTwoConstructed.name, playerTwoConstructed.marker);

// demonstrating both players have both methods from Player and Person prototypes
playerOneConstructed.sayName();
playerOneConstructed.getMarker();

playerTwoConstructed.sayName();
playerTwoConstructed.getMarker();

/*  

-- recommended method for prototypal inheritance:

 - Object.getPrototypeOf() used to get the prototype of an object

 - Object.setPrototypeOf() used to set or mutate the prototype of an object

 - we will see how it works by adding a Person Object Constructor to:

   - the Player example, and making Player inherit from Person


-- code:




Object.setPrototypeOf(Player.prototype, Person.prototype)

 - makes Person.prototype the prototype of Player.prototype

   - now Player instances inherit sayName from Person.prototype

   - they also inherit getMarker from Player.prototype


-- how it works:

 - Object.setPrototypeOf() takes two arguments:

   - the prototype to modify (frst argument) and 
   - the prototype to inherit from (second argument)

   - this builds the Chain:

     - playerOne -> Player.prototype -> Person.prototype -> Object.prototype


 - NB on timing:

   - set the prototype chain with Object.setPrototypeOf() 

     - before creating objects.

     - using it afterwards, can cause problems and slow things down.



-- Dont do this:

Player.prototype = Person.prototype;

 - this will fail because:

   - it directly mutates Player.prototype to Person.prototype

   - same object, not a copy, changes to one affect the other.



*/

// example 2 - Player gets overwritten by Person

// Person Object Constructor Function
function PersonConstructorThree(name) {
  this.name = name;
}

// attaching a method to Person.prototype
PersonConstructorThree.prototype.sayName = function () {
  console.log(`Hello, I'm ${this.name}`);
};

// Player Object Constructor Function
function PlayerConstructorThree(name, marker) {
  this.name = name;
  this.marker = marker;
}

// don't do this irl, it will overwrite the prototype and not inherit from it
PlayerConstructorThree.prototype = PersonConstructorThree.prototype;

// function to demonstrate the overwrite
function Enemy(name) {
  this.name = name;
  this.marker = "^";
}

// demonstrating the overwrite do not do this in real life
Enemy.prototype = PersonConstructorThree.prototype;

Enemy.prototype.sayName = function () {
  console.log("Hahaha");
};

// creating another player
const playerThreeConstructed = new PlayerConstructorThree("Carl", "X");

playerThreeConstructed.sayName();

/*  

-- note:

 - if we had used Object.setPrototypeOf() in this example,

   - then we could safely edit the Enemy.prototype.sayName() function

   - without changing the function for Player as well.

*/

// ////////////////////////////////////////////////////////////////////////////

// ////////////////////////////////////////////////////////////////////////////

// more examples from javascript.info/prototype-inheritance

let animal = {
  eats: true,
  walk() {
    console.log(`this ${this.name} is walking`);
  },
};

let rabbit = {
  name: "rabbit",
  jumps: true,
};

// set animal to be the prototype of rabbit
Object.setPrototypeOf(rabbit, animal);

// now you can find both properties 'eats' and 'jumps' on rabbit
console.log("rabbit inherits from animal: ", rabbit.eats, rabbit.jumps);

rabbit.walk(); // logs "this rabbit is walking"

// extending the chain:
let longEar = {
  name: "long eared rabbit",
  earLength: 10,
};

// using setPrototypeOf() to set the prototype chain of longEars to rabbit
Object.setPrototypeOf(longEar, rabbit);

longEar.walk(); // logs "this long eared rabbit is walking"

// you can check if the prototype chain is set correctly with:
console.log(
  "is longEar's prototype rabbit? ",
  Object.getPrototypeOf(longEar) === rabbit // true
);

// using getPrototypeOf() to check the prototype chain
console.log(
  "is rabbit's prototype animal? ",
  Object.getPrototypeOf(rabbit) === animal // true
);

// ////////////////////////////////////////////////////////////////////////////

let user = {
  name: "John",
  surname: "Smith",
  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  },
  get fullName() {
    return `${this.name} ${this.surname}`;
  },
};

let admin = {
  isAdmin: true,
};

// set user to be the prototype of admin
Object.setPrototypeOf(admin, user);

console.log("admin name before setting the name: ", admin.fullName); // logs "John Smith"

// changing the admin name
admin.fullName = "Alice Cooper";

console.log("admin name after setting the name: ", admin.fullName); // logs "Alice Cooper"
console.log("original user name remains the same: ", user.fullName); // logs "John Smith"

// ////////////////////////////////////////////////////////////////////////////

let fish = {
  eats: true,
  swim() {
    if (!this.isSleeping) {
      console.log(`I'm ${this.name} swimming`);
    }
  },
  sleep() {
    this.isSleeping = true;
    if (this.name === "Great White Shark") {
      this.isSleeping = false;
    }
  },
};

let kabeljou = {
  name: "Kabeljou",
  migrates: true,
};
Object.setPrototypeOf(kabeljou, fish); // set fish to the prototype of kabeljou

kabeljou.swim(); // logs "I'm Kabeljou swimming"

kabeljou.sleep(); // activates the sleep function (setting isSleeping to true)
console.log("is kabeljou sleeping? ", kabeljou.isSleeping); // true

let shad = {
  name: "Shad",
  migrates: true,
};
Object.setPrototypeOf(shad, fish); // set fish to the prototype of shad

shad.swim(); // logs "I'm Shad swimming"

shad.sleep(); // activates the sleep function (setting isSleeping to true)
console.log("is shad sleeping? ", shad.isSleeping); // true

let shark = {
  name: "Great White Shark",
  migrates: true,
};
Object.setPrototypeOf(shark, fish); // set fish to the prototype of shark

shark.sleep(); // activates the sleep function but if block has an exception for shark
console.log("is shark sleeping? ", shark.isSleeping); // false

shark.swim(); // logs "I'm Shark swimming"

// checking if the fish object has been affected:
console.log("is fish sleeping? ", fish.isSleeping); // undefined
console.log("has fish got a name? ", fish.name); // false

console.log(
  "the fish object remains untouched, even though its sharing properties"
);

// ////////////////////////////////////////////////////////////////////////////

// for....in loop

// Object.keys only returns a list of own properties (non inherited only)
console.log(Object.keys(shark));

// for...in loop, loops over own and inherited enumerable properties (all)
for (let prop in shark) console.log("shark inherited properties:", prop);

// filtering with hasOwnProperty()

for (let prop in shark) {
  let isOwnProp = shark.hasOwnProperty(prop);
  if (isOwnProp) {
    console.log(`shark own property: ${prop}`);
  } else {
    console.log(`shark inherited property: ${prop}`);
  }
}
