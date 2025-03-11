// ////////////////////////////////////////////////////////////////////////////

// from the odin project

console.log("// ////////////////////////////");
console.log("Array Methods");

// the long way of doing it

let sumArray = [1, 2, 3, 4, 5];

function sumOfTripledEvens(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    // 1. check if the number is even
    if (array[i] % 2 === 0) {
      // 2. triple the even number
      const tripleEvenNumber = array[i] * 3;

      // 3. add the tripled even number to sum
      sum += tripleEvenNumber;
    }
  }
  return sum;
}

console.log(sumOfTripledEvens(sumArray)); // 18

// the short way of doing it

console.log(
  sumArray
    .filter((num) => num % 2 === 0)
    .map((num) => num * 3)
    .reduce((acc, num) => acc + num, 0)
); // 18

// ////////////////////////////////////////////////////////////////////////////

console.log("The Map Method");

//array for examples
const arr = [1, 2, 3, 4, 5];

// function for passing (if not using inline functions)
function addOne(num) {
  return num + 1;
}

// passing addOne as a callback function to map() on arr
const mappedArr = arr.map(addOne); // create new array

console.log(mappedArr); // Outputs [2, 3, 4, 5, 6]

// original array not changed!
console.log(arr); // Outputs [1, 2, 3, 4, 5]

// same thing using an inline method:
const inlineMappedArr = arr.map((num) => num + 1); // creates new array

console.log(inlineMappedArr); // Outputs [2, 3, 4, 5, 6]

// ////////////////////////////////////////////////////////////////////////////

console.log("The Filter Method");

function isOdd(num) {
  return num % 2 !== 0;
}

// filttering arr for odd numbers using isOdd as a callback function
const oddNums = arr.filter(isOdd); // creates new array with filter()

console.log(oddNums); // Outputs [1, 3, 5];

console.log(arr); // Outputs [1, 2, 3, 4, 5], original array is not affected

// ////////////////////////////////////////////////////////////////////////////

console.log("The Reduce Method");

const productOfAllNums = arr.reduce((total, currentItem) => {
  return total * currentItem;
}, 1); // , 1 is the initial value of the accumulator.

console.log(productOfAllNums); // Outputs 120;

console.log(arr); // Outputs [1, 2, 3, 4, 5]

const productOfAllNumsInitFive = arr.reduce((total, currentItem) => {
  return total * currentItem;
}, 5); // , 10 is the initial value of the accumulator.

console.log(productOfAllNumsInitFive); // Outputs 1200;

// same thing without an accumulator initial value.
const productWithNoInitalValue = arr.reduce((total, currentItem) => {
  return total * currentItem;
}); // no acculumator initial value.

console.log(productWithNoInitalValue); // Outputs 120; (starts at 1)

// ////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////

// array methods from javascript.info

console.log("Array Methods");

console.log("Add/Remove Elements");

let flowers = ["rose", "tulip", "lily"];
console.log(flowers); // ["rose", "tulip", "lily"]

// 1. arr.push(...items) – Add items to the end
flowers.push("daisy");
console.log(flowers); // ["rose", "tulip", "lily", "daisy"]

// 2. arr.pop() – Remove the last item
flowers.pop();
console.log(flowers); // ["rose", "tulip", "lily"]

// 3. arr.shift() – Remove the first item
flowers.shift();
console.log(flowers); // ["tulip", "lily"]

// 4. arr.unshift(...items) – Add items to the beginning
flowers.unshift("orchid");
console.log(flowers); // ["orchid", "tulip", "lily"]

// ////////////////////////////////////////////////////////////////////////////

console.log("splice() method:");

console.log("removing elements using splice()");

let colors = ["red", "green", "blue"];
console.log(colors); // ["red", "green", "blue"]

// changing colors array
colors.splice(1, 1); // From index 1, remove 1 element
console.log(colors); // ["red", "blue"]

// //////

console.log("replace and remove elements using splice()");

let fruits = ["apple", "banana", "cherry", "date"];
console.log(fruits); // ["apple", "banana", "cherry", "date"]

// changing fruits array
fruits.splice(0, 3, "kiwi", "grape"); // Remove 3 elements, insert 2
console.log(fruits); // ["kiwi", "grape", "date"]

// //////

console.log("getting removed elements using splice()");

let animals = ["cat", "dog", "rabbit", "fox"];
console.log(animals); // ["cat", "dog", "rabbit", "fox"]

// getting removed elements
let removedAnimals = animals.splice(0, 2); // Remove 2 elements from the start
console.log(removedAnimals); // ["cat", "dog"]

// //////

console.log("insert without removal using splice()");

let tech = ["laptop", "mouse", "keyboard"];
console.log(tech); // ["laptop", "mouse", "keyboaard"]

tech.splice(2, 0, "monitor", "printer"); // Insert at index 2 without removing
console.log(tech); // ["laptop", "mouse", "monitor", "printer", "keyboard"]

// //////

console.log("using negative numbers with splice()");

// specify the position from the end of the array.

let numbers = [10, 20, 50];
console.log(numbers); // [10, 20, 50]

numbers.splice(-1, 0, 30, 40); // Insert before the last element
console.log(numbers); // [10, 20, 30, 40, 50]

// insert at the end with arr.length
numbers.splice(numbers.length, 0, 60, 70); // Equivalent to -0
console.log(numbers); // [10, 20, 30, 40, 50, 60, 70]

// ////////////////////////////////////////////////////////////////////////////

console.log("slice() method:");

let letters = ["a", "b", "c", "d"];

console.log(letters.slice(0, 3)); // a, b, c
console.log(letters.slice(-2)); // c, d
console.log(letters.slice()); // ["a", "b", "c", "d"] (shallow copy)

console.log(letters); // ["a", "b", "c", "d"] (original array is not modified)

// ////////////////////////////////////////////////////////////////////////////

console.log("concat() method:");

let concatArray = [1, 2, 3];
let anotherArray = [4, 5];
let andAnotherArray = [6, 7];

console.log(concatArray);
console.log(anotherArray);
console.log(andAnotherArray);

// single value
console.log(concatArray.concat(anotherArray)); // [1, 2, 3, 4, 5]

// multiple arrays
console.log(concatArray.concat(anotherArray, andAnotherArray)); // [1, 2, 3, 4, 5, 6, 7]

// multiple values
console.log(
  concatArray.concat(
    anotherArray,
    "a space between",
    andAnotherArray,
    [8, 9],
    10
  )
); // [1, 2, 3, 4, 5, "a space between", 6, 7, 8, 9, 10]

// //////

console.log("Array-Like Objects (with Symbol.isConcatSpreadable property)");

let arrayLikeObject = {
  0: "you",
  1: "got",
  2: "it",
  length: 3,
  [Symbol.isConcatSpreadable]: true,
};

console.log(concatArray.concat(arrayLikeObject, anotherArray, 6));
// above outputs: [1, 2, 3, "you", "got", "it", 4, 5, 6]

// ////////////////////////////////////////////////////////////////////////////

console.log("forEach() method:");

let shapes = ["square", "rectangle", "circle", "triangle"];

shapes.forEach((shape, index, array) => {
  console.log(`${shape} is at index ${index}`);
  console.log(`access all array items using the (array) arugment ${array}`);
});

// ////////////////////////////////////////////////////////////////////////////

console.log("sort() method: default:");

// default sort() behavior

let arrayForSorting = [15, 2, 1];
arrayForSorting.sort();

console.log(arrayForSorting); // 1, 15, 2 (incorrect)

// //////

console.log("sort() method: comparison function ascending:");

let arrayForSorting2 = [15, 2, 1];
arrayForSorting2.sort((a, b) => a - b);
console.log(arrayForSorting2); // 1, 2, 15 (correct ascending)

// //////

console.log("sort() method: comparison function descending:");

let arrayForSorting3 = [15, 2, 1];
arrayForSorting3.sort((a, b) => b - a);
console.log(arrayForSorting3); // 15, 2, 1 (correct descending)

// //////

console.log("localeCompare() method:");

let countries = [
  "Österreich",
  "Ägypten",
  "Spanien",
  "Türkei",
  "Deutschland",
  "Ungarn",
  "Vietnam",
  "Andorra",
];

const incorrectSortedCountries = countries.sort();
console.log(incorrectSortedCountries); // incorrect

const countriesAscending = countries.sort((a, b) => a.localeCompare(b));
console.log(countriesAscending); // correct

const countriesDescending = countries.sort((a, b) => b.localeCompare(a));
console.log(countriesDescending); // correct

// ////////////////////////////////////////////////////////////////////////////

console.log("reverse() method:");

let ascendingNumbers = [1, 2, 3, 4, 5, 6, 7];

ascendingNumbers.reverse();
console.log(ascendingNumbers); // [7, 6, 5, 4, 3, 2, 1]

// ////////////////////////////////////////////////////////////////////////////

console.log("split() method:");

let starWarsNames = "Luke Skywalker, Han Solo, Leia Organa, C-3PO, R2-D2";

let arrayOfStarWarsNames = starWarsNames.split(", ");
console.log(arrayOfStarWarsNames);

// //////

console.log("join() method:");

// making a copy so it doesnt intefere with previous array
let arrayOfStarWarsNamesCopy = arrayOfStarWarsNames.slice();
arrayOfStarWarsNamesCopy.reverse();

let reversedStringOfStarWarsNames = arrayOfStarWarsNamesCopy.join(" | ");
console.log(reversedStringOfStarWarsNames);

// ////////////////////////////////////////////////////////////////////////////

console.log("reduce() method:");

console.log("reduce() method Summing an Array:");

let expenses = [150, 215, 342, 69, 507, 120, 450];

let totalExpenses = expenses.reduce((sum, expense) => sum + expense, 0);

console.log(totalExpenses); // 1853

console.log("reduce() method Finding the Longest Name:");

let participants = [
  "John",
  "Alexander",
  "Jen",
  "Christopher",
  "Joe",
  "Ingonyama",
];

let longestName = participants.reduce(
  (longest, name) => (name.length > longest.length ? name : longest),
  ""
);

console.log(longestName); //

// ////////////////////////////////////////////////////////////////////////////

console.log("Array.isArray() method:");

console.log(Array.isArray([1, 2, 3])); // true
console.log(Array.isArray("Hello")); // false

// ////////////////////////////////////////////////////////////////////////////

console.log("thisArgs in most methods:");

let army = {
  minAge: 18,
  maxAge: 27,
  canJoin(user) {
    return user.age >= this.minAge && user.age < this.maxAge;
  },
};

let armyUsers = [{ age: 16 }, { age: 20 }, { age: 23 }, { age: 30 }];

// Using army.canJoin with army as thisArg (wrong way)
// let soldiers = armyUsers.filter(army.canJoin, army);

// Using army.canJoin with army as thisArg - this is explicily bound to army object
let soldiers = armyUsers.filter((user) => army.canJoin(user)); // prefered way

console.log(soldiers);
// Output: [ { age: 20 }, { age: 23 } ]
