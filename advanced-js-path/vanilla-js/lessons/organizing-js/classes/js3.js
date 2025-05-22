// ////////////////////////////////////////////////////////////////////////////
console.log("------ static member properties: ------");
// ////////////////////////////////////////////////////////////////////////////
/*

-- static member properties key concepts:


 - static fields: store data once per class, not per instance.

   - useful for shared state (eg: configurations or counters for all instances)


 - static methods: perform tasks related to the class, not the instance.

   - useful creating instances, or processing data without needing an instance.


 - access rules:

   - for non-instance access:
   
     - use ClassName.staticMember or this.constructor.staticMember 
     
   - instance access fails: (eg: instance.staticMember) 


 - inheritance:

   - subclasses inherit static members but can also define their own.

     - shadowing the parent members if names overlap.

   -  eg: subclasses built using extends keyword inherit static members.


 - initialization: 

   - static fields can have initializers (eg: static x = value)

   - static blocks run once during class evaluation.


 - real world use:

   - static members are common in utitlity libraries (eg: Math, String, etc),

     - configuration management, or factory patterns 

     - eg: creating objects with specific settings / configurations.


*/

// ////////////////////////////////////////////////////////////////////////////

// example 1 (defining and using static members):

class ProductInventory {
  // static fields:
  static totalStock = 0; // tracks total stock across all products
  static productCatalog = new Map(); // maps product IDs to names

  // static methods: add a product to the catalog and update total stock
  static addProduct(id, name, quantity) {
    this.productCatalog.set(id, name); // store product in catalog
    this.totalStock += quantity; // update total stock levels
    return `Added ${quantity} of ${name} to inventory`;
  }

  // retrieves total stock
  static getTotalStock() {
    return `total stock: ${this.totalStock} items.`;
  }
}

// using the static members
console.log(ProductInventory.addProduct("p1", "Laptop", 50));
console.log(ProductInventory.addProduct("p2", "Phone", 100)); // added 100 of phone to inventory

console.log(ProductInventory.getTotalStock()); // total stock: 150 items.
console.log(ProductInventory.productCatalog.get("p1")); // laptop
console.log(ProductInventory.productCatalog); // Map(2) {'p1' => 'Laptop', 'p2' => 'Phone'}

/*

// ////////////////////////////////////////////////////////////////////////////

-- example 1 (defining and using static members):

-- what it does:

 - manages a stores inventory  by tracking total stock and product catalog.

 - static methods add products and report stock levels.


-- how it works:

 - totalStock: a static field storing the sum of all product quantities.

 - productCatalog: a static Map storing product IDs and names, 
                    shared across the class.

 - addProduct: a static method updating totalStock and productCatalog.

 - getTotalStock: a static method accessing totalStock via this (the class).

 - static members are accessed via ProductInventory and not instances.


-- why use it::

 - static fields ensure one shared state instead of duplicating it per instance

 - static methods are logical for class level operations.

   - eg: adding products doesn't require an instance.

 - using Map for productCatalog provides key-value storage, 

   - common in real systems.

*/

// ////////////////////////////////////////////////////////////////////////////

// example 2 (static members in inheritance)

class NotificationService {
  // static fields
  static totalNotifications = 0;
  static notificationTypes = new Set();

  // static methods
  // logs a notification and updates count
  static sendNotification(type, message) {
    this.notificationTypes.add(type); // track notification type
    this.totalNotifications += 1; // increment notification count
    return `sent ${type} ${message}`;
  }

  // retrieve notifications summary
  static getSummary() {
    return `Total notifications: ${this.totalNotifications}`;
  }
}

class EmailNotificationService extends NotificationService {
  //static field
  static emailNotifications = 0;

  // static methods:
  // sends email notification, reusing parent logic
  static sendEmailNotification(message) {
    // call parent static method
    const result = super.sendNotification("email", message);

    this.emailNotifications += 1; // track email specific count
    return `${result} (email)`;
  }

  // overrides parent to include email stats
  static getSummary() {
    const parentSummary = super.getSummary(); // store parent method result
    return `${parentSummary}, ${this.emailNotifications} via email`;
  }
}

// using static members
console.log(NotificationService.sendNotification("sms", "meeting at 3pm"));
console.log(
  EmailNotificationService.sendEmailNotification("another meeting at 5p")
);

console.log(NotificationService.getSummary()); // Total notifications: 2
console.log(EmailNotificationService.getSummary()); // Total notifications: 2, 1 via email

console.log(EmailNotificationService.notificationTypes.has("email")); // true

/*

// ////////////////////////////////////////////////////////////////////////////

-- example 2 (static members in inheritance)

-- what it does:

 - manages notifications (eg SMS, email) with a base class and an,

   - email-specific subclass, tracking total and type-specific notifications.


-- how it works:

 - totalNotifications: a static field counting all notifications.

 - notificationTypes: a static Set tracking unique notification types.

   - what the Set does:

     - only stores unique values - duplicates are automatically removed.

       - each value can occur only once in a Set

     - it can store any type of value (strings, numbers, objects, etc.)

     - static notificationTypes = new Set(); 
     
       - is used to track different types of notifications that have been sent,
         ensuring each type is only counted once.


-- why use it:

 - super reuses parent logic, ensuring DRY (don't repeat yourself) code.

 - static fields centralize shared state (eg: totalNotifications).

 - Set for notificationTypes ensures unique types, fitting messaging systems.

 - subclass static methods extend functionality 
 
   - while leveraging inherited members

*/

// ////////////////////////////////////////////////////////////////////////////

// example 3 (calling static members from other methods)

class UserManager {
  // static fields
  static activeSessions = 0;

  // static methods:
  // incrememnts active sessions and logs a message
  static addSession() {
    this.activeSessions += 1;
    return `Session added. Active: ${this.activeSessions}`;
  }

  // calls another static method
  static reportSessions() {
    // access static field and method via this
    return `${this.addSession()} sessions reported.`;
  }

  // non static method (accesses static methods)
  constructor(userId) {
    // access static members via class name or this.constructor
    console.log(UserManager.activeSessions); // direct class access
    console.log(this.constructor.addSession()); // class name access via constructor

    // define a new instance field
    this.userId = userId;
    console.log(`user with ID: ${this.userId} created.`);
  }
}

// using static members
console.log(UserManager.addSession()); // Session added, Active: 1
console.log(UserManager.reportSessions()); // Session added, Active: 2 sessions reported.
const u1 = new UserManager("u1"); // Session added. Active 3 | user with ID: u1 created.
const u2 = new UserManager("u2"); // Session added. Active 4 | user with ID: u2 created.

/*

// ////////////////////////////////////////////////////////////////////////////

-- example 3 (calling static members from other methods)

-- what it does:

 - tracks active user sessions and reports them,

   - showing static member access from static and non-static methods.


-- how it works:

 - activeSessions: a static field tracking sessions count.

 - addSession: a static method updating activeSessions.

 - reportSessions: a static method calling addSession via this.

 - constructor: a non static method accessing static memebers via:

   - UserManager.activeSessions and this.constructor.addSession()


-- why use it:

 - static fields centralize shared state. (eg: session count)

 - this in static methods refers to the class, 
 
   - enabling clean access to other static members.

 - non static methods use this.constructor to access static members.

   - as this refers to the instance, it is used to access the class.

*/

// ////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////

console.log("------ Difference Between Static and Instance Methods: ------");

// Difference Between Static and Instance Methods

// static methods:
class ProductInventory2 {
  static addProduct(id) {
    return `Added product ${id}`;
  }
}
console.log(ProductInventory2.addProduct("p1")); // "Added product p1"

// instance methods:
class ProductInventory3 {
  constructor(id) {
    this.id = id;
  }
  getId() {
    return this.id;
  }
}
const inventory = new ProductInventory3("p1");
console.log(inventory.getId()); // "p1"

/*

// ////////////////////////////////////////////////////////////////////////////

--Difference Between Static and Instance Methods

-- static methods:

 - definition:

   - functions defined on the class itself using the static keyword,   
   - accessed via the class name (e.g., ClassName.method()).

 - purpose: 
 
   - handle class-level tasks, like utilities, factory methods,       
   - or managing shared data (e.g., ProductInventory.addProduct).

 - access:
 
   - called on the class (ClassName.method()) or via this.constructor.method()
   - in  non-static methods.also not available on instances (instance.method).

-- instance methods:


 - definition: 
 
   - functions defined on the class prototype,
   - available on instances created with new.

 - purpose:

   - operate on instance-specific data (e.g., this.id)
   - or behavior (e.g., updating an object’s state).

 - access:
 
   - called on instances (instance.method()) 
   - using this (refers to the instance). Not directly accessible via the class.


-- Key Differences:

 - Scope: 
 
   - Static methods belong to the class; instance methods belong to instances.

   - Data Access: Static methods access static fields or class-level data,
   - instance methods access instance fields (this properties).

 - Use Case:
 
   - Static for utilities or shared operations (e.g., UserManager.addSession);
   - instance for object-specific behavior (e.g., user.getId).

 - access Error: 
 
   - Calling a static method on an instance (instance.staticMethod) 
   - or an instance method on a class (ClassName.instanceMethod) fails.

*/

// ////////////////////////////////////////////////////////////////////////////

// static factory methods

class UserClassConstructor {
  constructor(id, role) {
    this.id = id;
    this.role = role;
  }

  // static factory method
  static createUser(id, isAdmin = false) {
    const role = isAdmin ? "admin" : "user"; // create role based on admin flag
    return new UserClassConstructor(id, role); // creates configured instance
  }
}

const nonAdminUser = UserClassConstructor.createUser("nonAdminUser"); // nonAdminUser
const adminUser = UserClassConstructor.createUser("adminUser", true); // adminUser

console.log(nonAdminUser.id, nonAdminUser.role); // "nonAdminUser" "user"
console.log(adminUser.id, adminUser.role); // "adminUser" "admin"

/*

// ////////////////////////////////////////////////////////////////////////////

--  static factory methods

-- what it is:

 -  is a static method that creates and returns instances of a class

    - often with specific configurations.


-- what it does:

 - simplifies instance creation with predefined settings.


-- why static:

 - factory methods are class-level utilities. not tied to instances.


 */

// ////////////////////////////////////////////////////////////////////////////

// singleton example:

class AppConfig {
  static instance = null;

  static getInstance() {
    if (!this.instance) {
      this.instance = new AppConfig();
    }
    return this.instance;
  }

  constructor() {
    this.settings = {
      apiUrl: "https://api.example.com",
      timeout: 5000,
      environment: "production",
    };
  }

  // Update settings dynamically
  setEnvironment(env) {
    this.settings.environment = env;
    this.settings.apiUrl =
      env === "production"
        ? "https://api.example.com"
        : "https://test-api.example.com";
  }

  // Get specific setting
  getSetting(key) {
    return this.settings[key];
  }
}

// define and get the single instance
const config1 = AppConfig.getInstance();
const config2 = AppConfig.getInstance();

// check if they are the same instance
console.log("config1 === config2", config1 === config2); // true (same instance)

// accessing the settings via the instance
console.log("config1:", config1.settings.apiUrl); // "https://api.example.com"
console.log("config2:", config2.settings.apiUrl); // "https://api.example.com"

// Usage in an app
const config = AppConfig.getInstance();

// get specific setting using getSetting with a key name
console.log("config apiUrl:", config.getSetting("apiUrl")); // "https://api.example.com"

// setting a new environment
config.setEnvironment("test");

// check the apiUrl on old instance
console.log(
  "config apiUrl after changing environment:",
  config.getSetting("apiUrl")
);

// Another part of the app uses the same instance
const sameConfig = AppConfig.getInstance();

// check the apiUrl on new instance
console.log(
  "sameConfig new instance enviro:",
  sameConfig.getSetting("environment")
); // "test" (same state)

// setting a new environment
config.setEnvironment("production");

// check the new apiUrl
console.log(
  "config apiUrl after changing environment:",
  config.getSetting("apiUrl")
);

/*

// ////////////////////////////////////////////////////////////////////////////

-- singleton example:

-- definition:

 - a singleton is a design pattern ensuring a clas has only one instance.

 - with a single point of access to that instance.

 - in JS, static fields often store this instance or shared data,

   - as they exist one per class, not per instance.


-- how it uses static fields:

 - static fields hold data shared across the class,

   - like a single configuration object or a unique instance, for example:

   - a static field can store the sole instance of a class or a shared resource

     - eg: config object


-- what It does:

 - ensures one AppConfig instance exists, stored in the static instance field. 
  
   - all parts of the app access the same settings. 


 - why Singleton: 
 
   - the static instance guarantees one object, 
   
   - preventing multiple configs with conflicting settings.



-- notes on code 

 - console.log(config1 === config2); // true 
 
   - demonstrates that getInstance() returns the same object every time, 
   
   - proving the singleton pattern works.


 - it’s a teaching tool to show, no matter how many times you call getInstance()
 
   - you get the same instance, not new ones. 
   
   - This is critical for understanding why singletons are useful.


 - Singletons can make code harder to test (hard to reset state). 
 
   - Use them only for truly shared resources like configs:

     - API Clients: 
     
       - Libraries like Axios use a singleton-like config to
       - ensure all HTTP requests use the same base URL and headers.

     - Database Connections: 
     
       - A singleton ensures one database connection pool,  
       - avoiding resource exhaustion.

     - Logging:
     
       - A single logger instance ensures all logs go to the same file or service.






*/
