const palindromes = function (str) {
  const pattern = /^[a-z]+$/; // Match strings with only letters
  str = str.replace(/3/g, "e").toLowerCase();

  let filteredStr = str
    .split("")
    .filter((currentVal) => {
      if (pattern.test(currentVal)) return true;
    })
    .join("");
  console.log(filteredStr);

  reversedStr = filteredStr.split("").reverse().join("");
  console.log(reversedStr);

  console.log(filteredStr === reversedStr);
  return filteredStr === reversedStr;
};

// console.log(palindromes("racecar!"));

// Do not edit below this line
module.exports = palindromes;
