const people = [
  {
    name: "Carly",
    yearOfBirth: 1942,
    yearOfDeath: 1970,
  },
  {
    name: "Ray",
    yearOfBirth: 1962,
    yearOfDeath: 2011,
  },
  {
    name: "Jane",
    yearOfBirth: 1912,
    // yearOfDeath: 1941,
  },
];

const findTheOldest = function (array) {
  // adding current year as death year, if it doesnt exist
  const withDeathYears = array.map((person) => ({
    ...person,
    yearOfDeath: person.yearOfDeath || new Date().getFullYear(),
  }));
  console.log("After death years:", withDeathYears);

  // defining an age, for easy comparison
  const withAges = withDeathYears.map((person) => ({
    name: person.name,
    age: person.yearOfDeath - person.yearOfBirth,
  }));
  console.log("After age calculation:", withAges);

  // getting the oldest
  const oldest = withAges.reduce((oldest, person) =>
    person.age > oldest.age ? person : oldest
  );
  console.log("Final result:", oldest);

  return oldest;
};
// console.log(findTheOldest(people));

// //////

// refactoring map methods and reduce methods into a chain
// (can get confusing because of how conicse it is)

const findTheOldest2 = function (array) {
  return array
    .map((person) => ({
      ...person,
      yearOfDeath: person.yearOfDeath || new Date().getFullYear(),
    }))
    .map((person) => ({
      name: person.name,
      age: person.yearOfDeath - person.yearOfBirth,
    }))
    .reduce((oldest, person) => (person.age > oldest.age ? person : oldest));
};
console.log(findTheOldest2(people));

// Do not edit below this line
module.exports = findTheOldest;
