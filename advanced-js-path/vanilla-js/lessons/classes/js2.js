console.log("------ js2 file starts here: ------");
/*

// ////////////////////////////////////////////////////////////////////////////


-- extends keyword

 - enables class inheritance,

   - allows a child class to inherit properties & methods from a parent class.


 - used in class declarations/expressions to establish a prototype chain,

   - linking the child class and its instances to the parent behavior.



-- key points:

-- syntax:

 class ChildClass extends ParentClass { ...}

 - where ParentClass is a constructor function (class or built-in) or null.


-- what it does

 - sets up a child class to inherit from a parent class.

 - the child gets all the parents methods and properties plus,

   - it can add its own or override the parent's.


-- prototype chain:

 - 'extends' sets Child.prototype._proto_ to Parent.prototype

   - so that the child inherits instance methods.

   - it also sets Child._proto_ to Parent for static methods.


-- the super keyword:

 - in a child class's constructor, 
 
   - super() calls the parent's constructor to initialize its properties.

   - you pass arguments to super to match the parent's constructor parameters


-- why use "extends"

 - avoid duplicating code.

   - for example: a PriorityTask can reuse a Task's completion logic,

   - while adding priority-specific logic.  


-- terms
 
 - constructor:

   - a function/method that initializes an object 
   
   - (eg: this.taskDescription = description)


 - prototype:

   - an object holding a class's methods, shared instances, and static methods.


 - inheritance:

   - the child gets the parent's behavior automatically.
   
   - (eg properties, methods, static methods)

*/

// ////////////////////////////////////////////////////////////////////////////

// extends keyword

// example 1 (basic class inheritance):

// base class for tasks
class Task {
  constructor(description) {
    this.taskDescription = description; // store description
    this.isCompleted = false; // track if task is done
  }
  toggleComplete() {
    this.isCompleted = !this.isCompleted; // flips isCompleted value
  }
  getDescription() {
    return this.taskDescription; // returns plain description
  }
}

// priority task, inherits from Task
class PriorityTask extends Task {
  constructor(description, priorityLevel) {
    super(description); // calls Task's constructor to set this.taskDescription
    this.priorityLevel = priorityLevel; // store priority level
  }
  getDescription() {
    return `${this.taskDescription} [Priority: ${this.priorityLevel}]`;
  }
}

// //////

// test
const basicTask = new Task("go for walk");
const urgentTask = new PriorityTask("exhale slower than you inhale", "high");

console.log(basicTask.getDescription());
console.log(urgentTask.getDescription());
console.log("before toggling urgentTask is completed:", urgentTask.isCompleted);
urgentTask.toggleComplete();
console.log("after toggling urgentTask is completed:", urgentTask.isCompleted);

/*

// ////////////////////////////////////////////////////////////////////////////

-- example 1 (basic class inheritance):

-- how it works:

 - priority task, inherits from Task and adding a priority level property


 - extends Task:

   - Links PriorityTask.prototype.__proto__ to Task.prototype, 
   
   - inheriting toggleComplete, getDescription.


-- constructor:

 - Task: 
   
   - Sets this.taskDescription = description (e.g., “go for walk”), 
     
   - and sets this.isCompleted = false.


 - PriorityTask:

   - super(description) calls Task’s constructor, then sets this.priorityLevel.

     - super(description): Passes description to Task, 
   
     - then setting taskDescription, as well asisCompleted.


   - getDescription: Overridden to append [Priority: ${priorityLevel}].

     - original getDescription: Returns this.taskDescription.

*/

// ////////////////////////////////////////////////////////////////////////////

// example 2 (old-style and modern class inheritance)

// old style constructor
function legacyTask(description) {
  this.legacyDescription = description;
}

// adding a method to the LegacyTask prototype
legacyTask.prototype.markDone = function () {
  this.legacyCompleted = true; // mark as done
};

// modern class
class ModernTask {
  constructor(description) {
    this.modernDescription = description;
    this.modernCompleted = false; // track completion
  }
  markDone() {
    this.modernCompleted = true; // mark as done
  }
}

// //////

// inherit from old style
class LegacyPriorityTask extends legacyTask {
  constructor(description, priorityTag) {
    super(description); // calls legacyTask's constructor with this description
    this.priorityTag = priorityTag;
  }
  getTaskInfo() {
    return `${this.legacyDescription} [Priority: ${this.priorityTag}]`;
  }
}

// inherit from modern
class ModernPriorityTask extends ModernTask {
  constructor(description, priorityTag) {
    super(description); // calls ModernTask's constructor
    this.priorityTag = priorityTag;
  }
  getTaskInfo() {
    return `${this.modernDescription} [Priority: ${this.priorityTag}]`;
  }
}

// //////

// test
const oldTask = new LegacyPriorityTask("do push ups", "high");
const newTask = new ModernPriorityTask("stretch", "urgent");

console.log(oldTask.getTaskInfo());
console.log(newTask.getTaskInfo());

oldTask.markDone();
newTask.markDone();

console.log(
  "oldTask and newTask are done:",
  oldTask.legacyCompleted,
  newTask.modernCompleted
);

// ////////////////////////////////////////////////////////////////////////////

// example 3 (mixins with dynamic extends)

// mixin to add action logging with time (mixins are using arrow functions)
const trackMixin = (BaseClass) =>
  class extends BaseClass {
    trackAction(action) {
      return `${
        this.taskDescription
      }:\n ${action} at ${new Date().toLocaleTimeString()}`;
    }
  };

// base task
class SimpleTask {
  constructor(description) {
    this.taskDescription = description;
  }
}

// tracked task with mixin
class TrackedTask extends trackMixin(SimpleTask) {
  constructor(description) {
    super(description);
  }
}

// tracked priority task from example 1
class TrackedPriorityTask extends trackMixin(PriorityTask) {
  constructor(description, priorityLevel) {
    super(description, priorityLevel);
  }
}

// test
const trackedTask = new TrackedTask("do the weekly chores");
console.log("tracked task description:\n", trackedTask.taskDescription);
console.log(trackedTask.trackAction("started"));

const trackedPriorityTask = new TrackedPriorityTask(
  "tan some steak for supper",
  "mid"
);

console.log(
  "tracked priority task description:\n",
  trackedPriorityTask.taskDescription
);

console.log(trackedPriorityTask.trackAction("started"));
console.log(trackedPriorityTask.trackAction("finished"));
trackedPriorityTask.toggleComplete();

console.log(
  "trackedPriorityTask isCompleted:\n",
  trackedPriorityTask.isCompleted
);

// ////////////////////////////////////////////////////////////////////////////

// example 4 ()
// Base class for tasks
class BasicTaskBuilder {
  constructor(description) {
    this.taskDescription = description; // Store description
    this.isCompleted = false; // Track completion
  }
  toggleComplete() {
    this.isCompleted = !this.isCompleted; // Flip completion
  }
  getDescription() {
    return this.taskDescription; // Return description
  }
}

// Priority task
class PriorityTaskBuilder extends BasicTaskBuilder {
  constructor(description, priorityLevel) {
    super(description); // Set taskDescription, isCompleted
    this.priorityLevel = priorityLevel; // Add priority
  }
  getDescription() {
    return `${this.taskDescription} [Priority: ${this.priorityLevel}]`; // Add priority
  }
}

// Mixin for tracking
const trackMixin2 = (Base) =>
  class extends Base {
    trackAction(action) {
      return `${
        this.taskDescription
      }: ${action} at ${new Date().toLocaleTimeString()}`; // Log action
    }
  };

// Tracked task
class TrackedTask2 extends trackMixin2(BasicTaskBuilder) {
  constructor(description) {
    super(description); // Set taskDescription, isCompleted
  }
  getDescription() {
    return this.taskDescription; // Use BasicTaskBuilder’s description
  }
}

// Detailed task
class DetailedToDo extends BasicTaskBuilder {
  constructor(description, priorityLevel, extraNotes) {
    super(description); // Set taskDescription, isCompleted
    this.priorityLevel = priorityLevel; // Priority or null
    this.extraNotes = extraNotes; // Notes or null
  }
  getDescription() {
    let desc = this.taskDescription; // Start with description
    if (this.priorityLevel) desc += ` [Priority: ${this.priorityLevel}]`; // Add priority
    if (this.extraNotes) desc += ` (Notes: ${this.extraNotes})`; // Add notes
    return desc;
  }
}

// Task storage
const tasks = [];

function addTask() {
  // Get inputs
  const taskInput = document.getElementById("taskInput"); // Description input
  const priorityInput = document.getElementById("priorityInput"); // Priority input
  const notesInput = document.getElementById("notesInput"); // Notes input
  const trackInput = document.getElementById("trackInput"); // Checkbox for tracking

  // Clean values
  const description = taskInput.value.trim(); // Task description
  const priority = priorityInput.value.trim(); // Priority or ""
  const notes = notesInput.value.trim(); // Notes or ""

  // Validate
  if (!description) return; // Skip if no description

  // Create task with ternary
  const task =
    priority || notes
      ? new DetailedToDo(description, priority || null, notes || null) // DetailedToDo for priority/notes
      : trackInput.checked
      ? new TrackedTask2(description)
      : new BasicTaskBuilder(description); // TrackedTask2 if checked, else BasicTaskBuilder

  // Store and clear
  tasks.push(task); // Add task
  taskInput.value = ""; // Clear text inputs
  priorityInput.value = "";
  notesInput.value = "";
  trackInput.checked = false; // Uncheck checkbox
  displayTasks(); // Show tasks
}

function displayTasks() {
  // Get elements
  const taskList = document.getElementById("taskList"); // Task <ul>
  const logArea = document.getElementById("logArea"); // Log <div>
  taskList.innerHTML = ""; // Clear list
  logArea.innerHTML = ""; // Clear logs

  // Show tasks
  tasks.forEach((task, index) => {
    const li = document.createElement("li"); // New task item
    li.textContent = task.getDescription(); // Show description
    if (task.isCompleted) li.style.textDecoration = "line-through"; // Strike if done

    const completeBtn = document.createElement("button"); // Complete button
    completeBtn.textContent = "Done";
    completeBtn.onclick = () => {
      task.toggleComplete(); // Toggle completion
      if (task instanceof TrackedTask2) {
        // If TrackedTask2
        logArea.innerHTML += `<p>${task.trackAction("Completed")}</p>`; // Log action
      }
      displayTasks(); // Refresh
    };

    li.appendChild(completeBtn); // Add button
    taskList.appendChild(li); // Add task
  });
}

// ////////////////////////////////////////////////////////////////////////////
console.log("------ private properties: ------");
// ////////////////////////////////////////////////////////////////////////////

/*

-- private instance fields (class for managing sensitive data)


-- key concepts

 - private properties:

   - class fields/methods (instance properties) are prefixed with a hash (#)

   - they are not shared with the class prototype and,

   - are only accessible within the defining class.


 - encapsulation:

   - prevents external access, ensuring data integrity.

   - (eg: hiding sensitive data, preventing tampering)


 - types:

   - includes private instance/static fields, methods, getters and setters.


 - restrictions:
 
   - no external access (causes syntax error) or deletion (non-deletable)
 
   - not inherited, private properties in different classes are distinct.

   - a class can't have a static method and instance method with the same name
   
     - since they share the same namespace, eg:

       class Example {
         static test() {}   // Static method
         test() {}          // Instance method 
       }


 - initialization:

   - instance fields:

     - for base classes (which do not extend another class)

       - initialization code goes before the constructor

       class Example {
         // 1. DURING CLASS EVALUATION:
         static staticField = 'static';        // Static fields
         static #privateStaticField = 'psf';   // Private static fields
         #privateField = 'private';            // Private instance fields

         // 2. BEFORE CONSTRUCTOR (if base class):
         publicField = 'public';               // Public instance fields

         constructor() {
           // Constructor code
         }
       }


     - for subclasses (which extend another class)

       - initialization code goes after the super() call.

       - accessing this before super() will cause an error.

       class SubExample extends Example {
         // 1. DURING CLASS EVALUATION:
         static staticField = 'static';        // Static fields
         static #privateStaticField = 'psf';   // Private static fields
         #privateField = 'private';            // Private instance fields

         // 2. AFTER super() (if subclass):
         constructor() {
           super();
           // Public instance fields are initialized here
           this.publicField = 'public';        // Public instance fields
         }
       }

     - Initialization:

       - PUBLIC Instance fields: 

         - Before constructor (base class) or after super() (subclass).


       - Static fields and Private fields (both static and instance):

         - At class evaluation.

*/

// ////////////////////////////////////////////////////////////////////////////

// private instance fields (class for managing sensitive data)

class UserProfileConstructor {
  #email; // private field for sensitive data

  constructor(email) {
    this.setEmail(email); // use setter for validation
  }

  // public method to update email with validation
  setEmail(email) {
    // check if email is valid
    if (!email.includes("@")) {
      throw new Error(
        "Invalid email format, please make sure to use an '@' symbol."
      );
    }
    // if valid, set the email
    this.#email = email; // only accessible here (within the class)
  }

  // public method to retrieve email
  getEmail() {
    return this.#email;
  }
}

const user = new UserProfileConstructor("john@example.com");
console.log(user.getEmail());

// set email
user.setEmail("bob@example.com");
console.log(user.getEmail());

/*

// ////////////////////////////////////////////////////////////////////////////

-- private static fields (class tracking total instances)

-- what it does:

 - store a user's email address in a private field.
 - allowing updates only through a a validated setter method.


-- how it works:

 - #email: private field, initialized in constructor via setEmail.

 - setEmail: validates input before assigning to #email.

 - getEmail: safely exposes #email without direct access.


-- relevance:

 - encapsulation: #email can't be accessed directly.

 - interview tasks: design a class to manage user info with hidden fields

*/

// ////////////////////////////////////////////////////////////////////////////

// private static fields (class tracking total instances)

class Cart {
  static #cartCount = 0; // private static field for tracking created carts

  constructor() {
    Cart.#cartCount++; // increment cart count on creation
  }

  // public static method to access count
  static getCartCount() {
    return Cart.#cartCount;
  }
}

const cart1 = new Cart();
const cart2 = new Cart();
const cart3 = new Cart();

console.log(Cart.getCartCount()); // 3
// console.log(cart1.getCartCount()); cannot access through individual carts

/*

// ////////////////////////////////////////////////////////////////////////////

-- private static fields

-- what it does:

 - counts how many Cart instances exist, storing the count privately.


-- how it works:

 - #cartCount: static private field, initialized to 0 at class evaluation.

 - constructor: increments #cartCount on creation of a new cart.

 - getCartCount: public accessor for #cartCount.

 - cart1.getCartCount(): cannot access private field #cartCount.


-- relevance:

 - useful in e-commerce analytics (eg: how many users started a cart?)

 - interview problems: "track class instances"

*/

// ////////////////////////////////////////////////////////////////////////////

// private methods: (class for formatting social media post privately)

class PostManager {
  #formatPost(content) {
    // private method to clean and fromat content
    return content.trim().replace(/\s+/g, " ").slice(0, 280);
  }

  createPost(content) {
    const formattedContent = this.#formatPost(content);
    return `Posted: ${formattedContent}`;
  }
}

const manager = new PostManager();
console.log(manager.createPost("           Hello World! "));

/*

// ////////////////////////////////////////////////////////////////////////////

-- private methods: (class for formatting social media post privately)

-- what it does:

 - formats posts content (eg: trims and limits length) before sharing.


-- how it works:

 - #formatPost: private method handling formatting logic

 - createPost: public method using #formatPost to prepare output

 - replace(/\s+/g, " ")

   / ..... / - forward slashes contain the regular expression (regex) pattern

   \s - This matches any whitespace character (spaces, tabs, line breaks, etc)

   + - This means "one or more" of the previous character "\s+"

   g - flag that means "global" - match ALL occurrences, not just the first one


-- relevance:

 - encapsulation: hides formatting logic to prevent extenral access.

 - interview tasks: design a class to format social media post privately.

*/

// ////////////////////////////////////////////////////////////////////////////

// private getters/setters (class managing stock levels with validation)

class ProductController {
  #stock;

  constructor(initialStock) {
    this.#stock = initialStock;
  }

  get #safeStock() {
    // private getter ensures non-negative stock
    return Math.max(0, this.#stock);
  }

  set #safeStock(value) {
    // private setter validates stock input
    if (value < 0) {
      throw new Error("stock is going to go below zero, please restock");
    }
    // if valid, set the stock
    this.#stock = value;
  }

  updateStock(change) {
    this.#safeStock = this.#stock + change; // use #safeStock setter
    return this.#safeStock;
  }
}

const product = new ProductController(10);
console.log(product.updateStock(15));
console.log(product.updateStock(-3));

/*

// ////////////////////////////////////////////////////////////////////////////

-- private getters/setters (class managing stock levels with validation)

-- what it does:

 - manages product stock levels with validation, ensuring valid updates.


-- how it works:

 - #stock : is a private field for raw stock value.


 - #safeStock getter : returns non-negative stock values.


 - #safeStock setter : validates input and sets stock value :

   - this.#safeStock = this.#stock + change;

     - this.#safeStock : calls the setter
     
     - = this.#stock + change :

       - everything on the right side of the equals sign,
     
       - is passed as the argument to the setter

       - where it is then used as the value variable (this.#stock = value;)


 - updateStock :  uses getter/setter for safe updates.


-- relevance:

 - encapsulation: #stock is hidden, only validated access is allowed/

 - interview task eg: design a class with validated fields.

*/

// ////////////////////////////////////////////////////////////////////////////

// simulating private constructors (a Logger class ensuring single instance logging)

class Logger {
  static #isConstructing = false;
  #logs = []; // private instance field for logs

  constructor() {
    if (!Logger.#isConstructing) {
      throw new Error(
        "Logger is a singleton it cannot be instantiated, use getLogger() instead."
      );
    }
    Logger.#isConstructing = false;
  }

  // public method to add logs
  log(message) {
    this.#logs.push(message);
  }

  // public method to get logs
  getLogs() {
    return [...this.#logs];
  }

  // static method to get the singleton instance
  static createLoggerInstance() {
    Logger.#isConstructing = true;
    return new Logger();
  }
}

const loggerInstance = Logger.createLoggerInstance();
loggerInstance.log("first log added");
loggerInstance.log("second log added");

console.log(loggerInstance.getLogs()); // ["first log added", "second log added"]

// new Logger(); // error: logger cannot be instantiated directly

/*

// ////////////////////////////////////////////////////////////////////////////

-- simulating private constructors (a Logger class ensuring single instance logging)


-- what does it do:

 - creates a single logger instance to store messages securely


-- how it works:

 - #isConstructing : static flag to control instantiation / construction

 - #logs : private array for log storage

 - createLogger : static factory method to instantiate the singleton

 - log / getLogs : manage logs safely


-- relevance: 

 - useful in apps needing centralized logging (eg debugging tools)

 - or interview tasks (eg: "implement a singleton")

   - singleton:

   - A Singleton is a design pattern 
   
     - that ensures a class has only one instance throughout
   
     - the entire application's lifecycle, 
   
       - while providing a global point of access to that instance.

*/
