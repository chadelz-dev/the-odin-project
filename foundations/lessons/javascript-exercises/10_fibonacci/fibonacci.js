const fibonacci = function (num) {
  let convertedNumb = Number(num);
  console.log(typeof convertedNumb, convertedNumb);

  let result;

  if (convertedNumb === 0) {
    result = 0;
    console.log(result);
    return result;
  } else if (convertedNumb === 1) {
    result = 1;
    console.log(result);
    return result;
  } else if (convertedNumb < 0) {
    result = "OOPS";
    console.log(result);
    return result;
  }

  desiredTerm = convertedNumb;
  let a = 0;
  let b = 1;

  for (i = 0; i < desiredTerm - 1; i++) {
    let nextTerm = a + b;
    // console.log(nextTerm);

    a = b;
    b = nextTerm;
    result = b;
  }
  console.log(result);
  return result;
};
fibonacci("2");

// Do not edit below this line
module.exports = fibonacci;
