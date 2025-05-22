/*

// ////////////////////////////////////////////////////////////////////////////


-- property getters & settters (core concepts):

 - js has 2 types of object properties:

   - 1. Data Properties: 
   
     - hold a value (eg obj.name = "person name")

   - 2. Accessor Properties: 

     - defined by "get" and "set" methods. 
       - executed when the property is read or written

     - look like regular properties but run code behind the scenes.

        - setters execute code when a value is assigned to a property

          - this is NB.

          - normal methods and factory functions require a call to return

          - so you'd use fullName() to call a method or factory function

            - but you do not call a setter in the same way.

            - the code is triggered by the setter method itself.

            - all you have to do is assign a value to the property

              - that you expect a setter to take as an argument, when defined.



 - basic getters & setters:

   - getter: 

     - a function that runs when you read the property, no arguments.

     - returns a value

     - syntax: get propertyName()


   - setter:

     - function that runs when you assign a value to a property,

     - takes 1 argument. (the value you want to assign to the property)

     - process the value.

     - syntax: set propertyName(value) {...}

     - With a setter, the assignment syntax (=) triggers the code execution.



 - syntax options:

   - object literal: get propName() and set propName(value) {}

   - Object.defineProperty: define accessors dynamically with a descriptor.


*/

// ////////////////////////////////////////////////////////////////////////////

// Property Getters & Settters (Core Concepts):

// example 1: full name accessor

const user1 = {
  name: "Alice",
  surname: "Cooper",

  // getter method: (for reading properties) makes a prop "read-only"
  get fullName() {
    console.log("Getter ran!");
    return `${this.name} ${this.surname}`;
  },
  // setter method: (for writing properties) makes a prop "write-only"
  set fullName(value) {
    const parts = value.split(" "); // split the value by a space

    // validate there are 2 parts to the input, not more, not less
    if (parts.length !== 2) {
      console.log(
        "Invalid Name, Please provide a first and last name separated by a space."
      );
      return; // exit the setter method before it does anything
    }
    // set the properties if they passed validation
    console.log(`Setter ran with value: ${value}`);
    [this.name, this.surname] = parts;
  },
};

// testing
console.log("checking user1.fullName:", user1.fullName);

// setting a new value for user1 using the .fullName property
user1.fullName = "RobZombie"; // throws an error
user1.fullName = "Rob Zombie"; // accepted

console.log("name:", user1.name, "| surname:", user1.surname);

// example 2: dynamic full name using Object.defineProperty()

const user2 = {
  name: "Jane",
  surname: "Doe",
};

// attach "fullName" accessor to user2 using Object.defineProperty
Object.defineProperty(user2, "FullName", {
  get() {
    return `${this.name} ${this.surname}`;
  },
  set(value) {
    [this.name, this.surname] = value.split(" ");
  },
  enumerable: true, // makes the accessor visible in loops
  configurable: true, // can be re-defined or deleted
});

console.log("checking user2.FullName:", user2.FullName);

// demonstrate no if statement to check if value is two values
user2.FullName = "BobStuckTogetherMarley";
console.log("name:", user2.name, "| surname:", user2.surname);

// give user2 a new name using the set method fullName
user2.FullName = "Bob Marley";

console.log("name:", user2.name, "| surname:", user2.surname);

// ////////////////////////////////////////////////////////////////////////////

// validation - smarter getters & setters:

const user3 = {
  _name: "Genghis",
  get name() {
    return this._name;
  },
  set name(value) {
    // check if property fits our validation criteria
    if (value.length < 4) {
      console.log(
        "Invalid Name, Please provide a name longer than 3 characters."
      );
      return;
    }
    // otherwise, set the property
    this._name = value;
  },
};

/*


// ////////////////////////////////////////////////////////////////////////////

-- validation - smarter getters & setters:

 - getters/setters control access to an underlyig property.

   - often prefixed with a "_" to indicate it's private convention.


 - NB note:

   - "_" is not truly private, it's just a convention.

     - it's not a security feature. external code can still access it.

     - eg: user3._name

       - the "_" is just a naming convention.


   - added a more real world example of validation to example 1.

     - checks if the value is 2 separate words, 

     - ensures surname is not left undefined.
*/

// ////////////////////////////////////////////////////////////////////////////

// replacing a data property with an accessor property

function SpacePilotConstructor(name, birthday) {
  this.name = name;
  this.birthday = birthday;

  // creating a new accessor property called "age"
  Object.defineProperty(this, "age", {
    get() {
      const todayYear = new Date().getFullYear();
      return todayYear - this.birthday.getFullYear();
    },
    enumerable: true,
  });
}

const pilot1 = new SpacePilotConstructor("Buzz", new Date(1993, 9, 26));
console.log("pilot1.name:", pilot1.name);
console.log("pilot1.age:", pilot1.age);
console.log("pilot1.birthday:", pilot1.birthday);
/*

// ////////////////////////////////////////////////////////////////////////////

-- replacing a data property with an accessor property

 -  originally age might have been a date property. (age = 25)
    
    - now the getter calculates the age from birthday,

    - keeping old code (eg: pilot.age) functional.

    - no setter, age is a read-only property.

 - this is the best way to avoid replacing birthday with age,

   - and having code dependent on the birthday property break,

   - now code relying on birthday is left untouched.

   - and new code requiring age can be added without breaking anything too.

// ////////////////////////////////////////////////////////////////////////////


-- Notes on terminology:

 - accessor property:

   - a property defined by get / set methods, not a static value.


 - data property:

   - a property with a direct value (eg: obj.name = "person name")


 - descriptor:

   - an object defining a properties behavior. ( eg {get: ..., set: ...} )


 - enumerable:

   - a property that can be enumerated by a for...in loop. (iterated over)

  
 - configurable:

   - properety can be re-defined or deleted.


*/

// ////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////

/*


-- Class Basic Syntax:

 - class definition: 

   - template for creating objects with properties (state) and methods (behavior)


 - syntax:

   - class ClassName {...}

   - uses class keyword, constrcutor for initialization, 
      and methods defined inside


 - instantiation:

  - new ClassName()

  - creates an instance of the class

     - uses new keyword and creates an object by calling the constructor


 - underlying mechanics:

   - classes are functions,

   - methods are stored in the prototype property of the function


 - features:

   - supports getters / setters, computed names, static methods,

     - class fields (instance properties) and bound methods.


 - differences from functions:

   - 1. class constructor: 

     - Put instance-specific properties in the constructor ex:

     class userProfile {
        constructor(userName) {
          this.name = userName;
        }

        greet() {
          console.log(`Hello, ${this.userName}`); // Method
        }
      }

     - initialize instance properties (unique properties to each instance)

     - use this keyword and are created fresh for each new object

     - they are NOT static, each instance gets its own copy.

     - no commas between methods—unlike object literals.




   - 2. class methods (outside the constructor):
 
     - methods defined outside the constructor are added to the class prototype

     - they are shared by all instances of the class.

     - more memory efficient since:

       - they are not created for each instance



   - class methods are called with the class name as the first argument

   - requires the new keyword to instantiate a class

   - non enumerable properties (methods are not enumerable)

   - strict mode by default.


*/

console.log("------ Class Basics: ------");

// Class Basic Syntax:

// define a class "UserProfile" with a concstructor to set a userName property
class UserProfile {
  constructor(userName) {
    this.userName = userName; // instance property
  }

  // define a method "greet" to log a greeting
  greet() {
    console.log(`Hello, ${this.userName}`);
  }
}

// create a new object
const profile1 = new UserProfile("Vladimir");

profile1.greet();

// ////////////////////////////////////////////////////////////////////////////

// classes are functions:

class Account {
  constructor(balance) {
    this.balance = balance;
  }

  checkBalance() {
    console.log(`Account Balance: ${this.balance}`);
  }
}

console.log(typeof Account); // function
console.log(Account === Account.prototype.constructor); // true

console.log(Account.prototype.checkBalance); // f  checkBalance() {...}
console.log(Object.getOwnPropertyNames(Account.prototype)); // (2) ['constructor', 'checkBalance']

// ////////////////////////////////////////////////////////////////////////////

// class expressions:

// helper function that returns a class constructor not the constructor itself:

// factory function for stormtrooper types
function createTrooperType(accuracy, maxHHealth) {
  return class {
    constructor(trooperId) {
      this.trooperId = trooperId;
      this.health = maxHHealth;
    }

    shoot() {
      console.log(`${this.trooperId} fires with ${accuracy}% accuracy`);
      return accuracy; // shot power for jedi to deflect
    }

    takeHit(damage) {
      this.health = Math.max(0, this.health - damage);
    }
  };
}

// factory function for jedi types :
function createJediType(startingEnergy) {
  return class {
    constructor(jediName) {
      this.jediName = jediName;
      this.energy = startingEnergy; // energy doubles as attack strength
    }

    deflect(shotPower) {
      const energyCost = Math.floor(shotPower / 5); // scale cost: 20% -> 4, 80% -> 16
      this.energy -= energyCost;
      console.log(
        `${this.jediName} deflects ${shotPower}% shot! | Energy: ${this.energy}`
      );
    }

    attack(targets) {
      const attackCost = 15; // fixed cost per attack
      this.energy -= attackCost; // reduce energy after attack

      let remainingForce = this.energy; // damage starts as current energy
      console.log(
        `${this.jediName} strikes with ${remainingForce} total force! | Energy: ${this.energy}`
      );

      for (const target of targets) {
        if (remainingForce <= 0) break; // stop if no force left.

        const damage = Math.min(remainingForce, target.health); // deal damage up to health or remaining force

        // damage the storm trooper
        target.takeHit(damage);

        remainingForce -= damage; // deplete force after damage dealt
      }
    }

    rest() {
      this.energy += 30; // rest boosts energy
      console.log(`${this.jediName} rests, energy increased to ${this.energy}`);
    }
  };
}

// //////

//  class constructors that have been returned by calling the factory function:

// define stormtrooper types:
const BasicTrooper = createTrooperType(20, 50); // weak, 20 accuracy and 50 health
const ToughTrooper = createTrooperType(80, 100); // tougher, 80 accuracy and 100 health

// define jedi types:
const GrandMaster = createJediType(95); // yoda's type starts with 95 energy
const HighJedi = createJediType(85); // obi-wan's type starts with 85 energy

// use the class constructors to create different  object instances:

// spawn the troopers:
const tk556 = new BasicTrooper("TK-556");
const tk557 = new BasicTrooper("TK-557");
const tk558 = new BasicTrooper("TK-558");
const tk999 = new ToughTrooper("TK-999");

// Spawn Jedi
const yoda = new GrandMaster("Yoda");
const obiWan = new HighJedi("Obi-Wan Kenobi");

/*

-- class expressions:

 - what is a class expression?

   - a way to define a class in javascript. without giving it a name upfront.

   - defines a class as an expression assignable to a variable.
   
   - it is anonymous until you assign it somewhere.



   - in our code, createTrooperType and createJediType are functions that:

     - return these class expressions, letting us customize parameters.

     - like accuracy or staratingEnergy. before they become usable classes.

     - think of it a blueprint facotry.

       - you tweak the design then get a re-usable template 
       
       - eg: BasicTrooper from createTrooperType(20, 50)

// //////


-- class expression mechanics:
 
 - 1. factory pattern:
 
   - createTrooperType and createJediType are factory functions,
   
   - they return class expressions.

     - they let you configure classes (eg accuracy, startingEnergy etc),

       - before they are named (BasicTrooper, GrandMaster etc)

   - no new keyword used here

     - const BasicTrooper = createTrooperType(20, 50); 

     - just returns a class, no instantiation yet.


 - 2. instantiation:

   - new BasicTrooper("TK556") or new GrandMaster("Yoda") 

     - creates new objects from these classes, not classes 

     - each with their own this (eg: this.health)

   - needs new keyword here, when ever the constructor is called (runs)

     - this sets up a new trooper or jedi each time.


 - 3. closure magic:

   - accuracy in shoot() and startingEnergy in constructor are,

     - locked in when the class is created, 

     - eg: every instance of BasicTrooper uses 20% accuracy because,

       - it is baked into the class expression that built it.


 - 4. no inheritance (yet)

   - there is no direct inheritance here (like extends) but,

   - the factory functions mimic it by producing customized classes.

     - BasicTrooper and ToughTrooper share the same structure,

     - but differ in accuracy and maxHealth.


 - 5. why use class expressions?

   - flexibility:

     - one function creates multiple class types  BasicTrooper vs ToughTrooper)
  
   - encapsulation:

     - accuracy and startingEnergy are locked in, ensuring consistent behavior.

   - mass production:

     - spawn as many troopers or jedi as you want with the new keyword.


     


Class Definition: The source code or template that describes what a class is
—its structure, properties, and methods. It’s the literal block of code
 you write with the class keyword (or returned by a function like createGreeter).
 
 It doesn’t do anything until used.

Class: The runtime entity created from the class definition. 
In JavaScript, this is a constructor function that can be instantiated
 with new to produce objects. It’s the executable result of the definition.


// //////


*/

// Battle!
console.log("Stormtroopers attack Yoda!");
const troopers = [tk556, tk557, tk558, tk999]; // swarm of troopers
troopers.forEach((trooper) => {
  const shot = trooper.shoot(); // Troopers shoot at Yoda
  yoda.deflect(shot); // Yoda deflects each shot
});

console.log("\nYoda takes a moment to recover!");
yoda.rest(); // Yoda rests after deflecting

console.log("\nObi-Wan attacks the troopers!");
obiWan.attack(troopers); // Obi-Wan’s first attack

console.log("\nSurviving troopers fire back!");
let aliveTroopers = troopers.filter((t) => t.health > 0); // Only alive troopers

// alive troopers now attack Obi-Wan
aliveTroopers.forEach((trooper) => {
  const shot = trooper.shoot();
  obiWan.deflect(shot); // Obi-Wan deflects
});

console.log("\nObi-Wan strikes back!");
obiWan.attack(aliveTroopers); // Obi-Wan attacks with 46 force

console.log("\nObi-Wan rests to recover!");
obiWan.rest(); // Obi-Wan rests

console.log("\nYoda strikes the remaining troopers!");
aliveTroopers = aliveTroopers.filter((t) => t.health > 0); // Update alive troopers
yoda.attack(aliveTroopers); // Yoda hits TK-558 and TK-999

console.log("\nYoda delivers the final blow!");
aliveTroopers = aliveTroopers.filter((t) => t.health > 0); // Only TK-999 left
yoda.attack(aliveTroopers); // Yoda finishes TK-999 with 67 force

// ////////////////////////////////////////////////////////////////////////////

// Getters & Settters (Core Concepts):

class Product {
  constructor(productName) {
    this.name = productName;
  }

  get name() {
    return this._productName;
  }

  set name(value) {
    if (value.length < 3) {
      console.log(`"${value}" is too short, \n the name will not be set`);
      return;
    }
    this._productName = value;
  }
}

const item1 = new Product("iPhone");
console.log("item1.name:", item1.name);

const item2 = new Product("tv");

// ////////////////////////////////////////////////////////////////////////////

// computed method names
const action = "Game";

class Player {
  ["start" + action]() {
    console.log("Game has started!");
  }
}

const player1 = new Player();
player1.startGame();

/*

// ////////////////////////////////////////////////////////////////////////////

-- computed method names

 - what it does:

   - defines a method startGame by computing it at runtime from start + Game


 - how it works:

   - ["start" + "Game"]:

     - square brackets evaluate the expression inside ("startGame")

       - to set the method name  its like writing:

       class Player {
         startGame() {
           console.log("Game has started!");
          }
       }

       - but its dynamic and you could use variables to set the name.


 - why use it:

   - flexibility, lets you build method names dynamically.

   - eg. from variables or loops

   - similar to how you'd do obj["key"] = value in object literals.

   - handy for meta-programming or generated APIs.

*/

// ////////////////////////////////////////////////////////////////////////////

// class fields (instance properties):

class Customer {
  defaultStatus = "Active"; // instance property

  constructor(customerId) {
    this.id = customerId;

    // this.defaultStatus = "Active"; // without class fields
  }

  showStatus() {
    console.log(
      `showStatus call from customer "${this.id}":`,
      this.defaultStatus
    );
  }
}

// instantiating a customer
const cust1 = new Customer(101);

console.log(cust1.defaultStatus); // Active
console.log(Customer.prototype.defaultStatus); // undefined

cust1.showStatus();

/*

// ////////////////////////////////////////////////////////////////////////////

-- class fields (instance properties):

-- what it does:

 - defaultStatus is a class field or instance property

 - it adds a default value as a property on each Customer instance.

   - initialized with "Active",

   - without needing to set it in the constructor.

// //////


-- how it works:

 - defaultStatus = "Active" :

   - a class field declaration.

   - when new Customer() runs, (this.defaultStatus = "Active")

     - this field is added to the new object, after the constructor runs


 - defaultStatus is not in Custmer.prototype:

   - unlike methods, class fields are instance specific - they are not shared.

   - (prototype.defaultStatus) is undefined because:

     - it is not a prototype property, it is a class field instance property.


 - cust1.showStatus() : accesses this.defaultStatus from the instance.

// //////


-- why:

 - cleaner code:

   - avoids cluttering the constructor with default values.

   - perfect for per-instance defaults that don't need to be shared.
*/

// ////////////////////////////////////////////////////////////////////////////

// bound methods with class fields

class TimerButton {
  constructor(label) {
    this.label = label;
  }

  click = () => {
    console.log(`Clicked: ${this.label}`);
  };
}

const btn1 = new TimerButton("Start");
btn1.click(); // logs "Clicked: Start"

const btn2 = new TimerButton("Stop");
btn2.click(); // logs "Clicked: Stop"

// setTimeout(btn1.click, 1000); // "Clicked: Start" (after 1s)

/*

// ////////////////////////////////////////////////////////////////////////////

-- bound methods with class fields

-- what it does:

 - ensures the click method always knows "this" is the TimerButton instance.

   - even with call backs like: setTimeout(btn1.click, 1000); 


-- how it works:

 - click = () => { .. } :

   - a class field using an arrow function.

     - arrow functions bind "this" to the surrounding scope (the instance),

     - when the instance is defined, not only when it is called.


 - bound per instance:

 - unlike regular methods (stored in prototype) this "click":

   - is a field added to each object during creation, 

     - with "this" locked (or bound) to each instance.


 - setTimeout(btn1.click, 1000); :

   - normally "this" would be undefined in a loose method call but the arrow

     - function keeps "this" as btn1 or btn2 depending on the instance.

      
-- why:

 - solves the classic "lost this" problem in javascript callbacks or event handlers.

   - no need for .bind(this) or .call(this) or any other workarounds.


 - an example below with Unbound methods:  

   - regular "click" function is on UnboundButton.prototype,

     - and setTimeout calls it without setting "this", so the this.label fails.

       - arrow function binding "this" to the instance:  click = () => {...}
       - regular doesn't bind "this" to the instance:  click() {...}


 - btn3.click(); :

   - calling it normally, works fine.

   - it logs Go to the console, no worries. however


 - setTimeout(btn3.click, 1000);
    
   - fails because "this" is undefined when the callback runs.

   - that is because a regular function doesn't set "this" to the instance.

     - only the arrow function does that, which is why it is useful.

*/

// ////////////////////////////////////////////////////////////////////////////

// unbound methods with class fields

class UnboundButton {
  constructor(label) {
    this.label = label;
  }

  // regular method and not an arrow function which binds to the instance
  click() {
    console.log(`Clicked UnboundButton: ${this.label}`);
  }
}

const btn3 = new UnboundButton("Go");
btn3.click(); // logs "Clicked UnboundButton: Go"

// setTimeout(btn3.click, 1000); // "Clicked UnboundButton: undefined"

/*

-- summary:

 - syntax:

   class MyClassName { constructor() {..} diffMethods() {..} }

   - defines a constructor and methods with optional fields, getters, setters etc


 - mechanics

   - classes are special functions (constructors)

   - methods live in MyClassName.protoype (they are shared)

   - fields (like defaultStatus) are per-instance (they are not shared)


 - features

   - getters/setters: control property access (get propName,  set propName)

     - encapsulate logic (like validating names)


   - computed names: dynamic method names (["Start", "Game"])

     - flexible method creation.


   - class fields: instance properties (defaultStatus = "Active")

     - easy instance defaults.


   - bound methods: arrow functions lock this (click = () => { .. } )

     - reliable "this" in tricky spots


 - differences between object constructors and class constructors:

   - 1. a function created by "class" is labelled by a special interal property:

     - [[IsClassConstructor]]: true. 

     - it is not entirely the same thing as creating it manually.


   - 2. class methods are non enumerable:

     - a class definition sets enumerable flag to false
     
       - for all methods in proottype

       - it's good because if we for..in over an object,

         - we usually don't want its class methods.


   - 3. classes are always "use strict":

     - all code inside the class construct is automatically in strict mode.


 - usage:

   - new MyClassName() creates an instance with shared methods (via prototype)

     - and unique properties (via fields or constructors)





*/
