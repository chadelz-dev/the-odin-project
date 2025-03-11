const add = function (a, b) {
  return a + b;
};
console.log(add(1, 2));

const subtract = function (a, b) {
  return a - b;
};
console.log(subtract(1, 2));

const sum = function (arr) {
  let result = arr.reduce((sum, currentVal) => sum + currentVal, 0);
  return result;
};
console.log(sum([1, 2]));

const multiply = function (arr) {
  let result = arr.reduce((sum, currentVal) => sum * currentVal, 1);
  return result;
};
console.log(multiply([1, 2]));

const power = function (a, b) {
  return a ** b;
};
console.log(power(1, 2));

const factorial = function (num) {
  if (num === 0) return 1;

  let startingNum = num; // 4 ; 12 ; 24
  let iterationCount = startingNum - 1; // ; 3 ; 2 ; 1
  let interimNum; // null ; 12 ; 24

  for (i = iterationCount; i >= 1; i--) {
    interimNum = startingNum * i; // 4 x 3 = 12 ; 12 x 2 = 24 ; 24 x 1
    startingNum = interimNum; // 12 ; 24 ; 24
  }
  return startingNum;
};
console.log(factorial(10));

// Do not edit below this line
module.exports = {
  add,
  subtract,
  sum,
  multiply,
  power,
  factorial,
};
