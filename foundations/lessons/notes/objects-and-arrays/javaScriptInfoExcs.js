// camelize a string
let testString = "border-left-width";

let camelize = (str) => {
  let splitString = str.split("-");
  let summedWord = splitString[0];
  // console.log(summedWord);

  splitString.map((current, index) => {
    if (index >= 1) {
      // console.log("we are mapping above 0");

      let firstLetter = current[0].toUpperCase();
      let restOfWord = current.slice(1);

      let joined = firstLetter + restOfWord;
      // console.log(joined);
      summedWord += joined;
      // console.log(summedWord);
    }
  });
  return summedWord;
};

console.log(camelize(testString));

let camalize2 = (str) => {
  return str
    .split("-")
    .map((word, index) => {
      return index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join("");
};

console.log(camalize2(testString));

// ////////////////////////////////////////////////////////////////////////////

// filter range
let arrayForFiltering = [5, 2, 8, 1];

function filterRange(arr, a, b) {
  let newArray = arr.filter((currentVal) => {
    if (currentVal >= a && currentVal <= b) return currentVal;
  });
  return newArray;
}

console.log(filterRange(arrayForFiltering, 1, 4));
console.log(arrayForFiltering);

function filterRange2(arr, a, b) {
  return arr.filter((item) => item >= a && item <= b);
}

console.log(filterRange2(arrayForFiltering, 1, 4));
console.log(arrayForFiltering);

// filter range with removing elements from original array

let filterRangeInPlaceArray = [0, 3, 9, 2];

function filterRangeInPlace(arr, a, b) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] < a || arr[i] > b) {
      arr.splice(i, 1);
      i--;
    }
  }
}

// check the array before editing
console.log(filterRangeInPlaceArray);
// Call the function
filterRangeInPlace(filterRangeInPlaceArray, 1, 4);

// Log the modified array
console.log(filterRangeInPlaceArray); // [2, 1]

// ////////////////////////////////////////////////////////////////////////////

// sort in descending

let sortExArray = [5, 2, 1, -10, 8];

sortExArray.sort((a, b) => b - a);

console.log(sortExArray);

// ////////////////////////////////////////////////////////////////////////////

// sort in descending

let codeArray = ["HTML", "JavaScript", "CSS"];

function copySorted(arr) {
  return arr.slice(0).sort();
}

sorted = copySorted(codeArray);

console.log(sorted);
console.log(codeArray);

// ////////////////////////////////////////////////////////////////////////////

// randomize array

console.log("general random with random probability");

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

// counts of appearances for all possible permutations
let count = {
  123: 0,
  132: 0,
  213: 0,
  231: 0,
  321: 0,
  312: 0,
};

for (let i = 0; i < 1000000; i++) {
  let array = [1, 2, 3];
  shuffle(array);
  count[array.join("")]++;
}

// show counts of all possible permutations
for (let key in count) {
  console.log(`${key}: ${count[key]}`);
}

// //////

// fisher yates

console.log("fisher yates shuffle: (equal probability randomization");

function shuffle2(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// counts of appearances for all possible permutations
let count2 = {
  123: 0,
  132: 0,
  213: 0,
  231: 0,
  321: 0,
  312: 0,
};

for (let i = 0; i < 1000000; i++) {
  let array = [1, 2, 3];
  shuffle2(array);
  count2[array.join("")]++;
}

// show counts of all possible permutations
for (let key in count2) {
  console.log(`${key}: ${count2[key]}`);
}

// ////////////////////////////////////////////////////////////////////////////

// map new users

let john = { name: "John", surname: "Smith", age: 27, id: 1 };
let pete = { name: "Pete", surname: "Hunt", age: 30, id: 2 };
let mary = { name: "Mary", surname: "Key", age: 25, id: 3 };

let users = [john, pete, mary];

let names = users.map((item) => item.name);

console.log(names);

let usersMapped = users.map((user) => ({
  fullName: `${user.name} ${user.surname}`,
  id: user.id,
}));

console.log(usersMapped[0].id); // 1
console.log(usersMapped[0].fullName); // John Smith

let sortedUsers = users.sort((userA, userB) => userA.age - userB.age);

console.log(sortedUsers);

// ////////////////////////////////////////////////////////////////////////////

// creates objects from arrays

let groupedUsers = [
  { id: "john", name: "John Smith", age: 20 },
  { id: "ann", name: "Ann Smith", age: 24 },
  { id: "pete", name: "Pete Peterson", age: 31 },
];

let usersObject = groupById(groupedUsers);

function groupById(array) {
  return array.reduce((obj, value) => {
    obj[value.id] = value;
    return obj;
  }, {});
}

console.log(usersObject);

// ////////////////////////////////////////////////////////////////////////////

// get unique array members

function unique(arr) {
  let result = [];

  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }

  return result;
}

let strings = [
  "Hare",
  "Krishna",
  "Hare",
  "Krishna",
  "Krishna",
  "Krishna",
  "Hare",
  "Hare",
  ":-O",
];

console.log(unique(strings)); // Hare, Krishna, :-O

console.log([...new Set(strings)]);
