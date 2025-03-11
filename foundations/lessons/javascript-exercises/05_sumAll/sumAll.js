const sumAll = function(firstNum, secondNum) {

    let lowestNum;
    let highestNum;
    let finalSum = 0;

    // check if firstNum and secondNum are numbers
    if (firstNum < 0 || secondNum < 0 || !Number.isInteger(firstNum) || !Number.isInteger(secondNum)) 
        {
            console.log(`${firstNum}, ${secondNum}: there was an error`);
            return 'ERROR';
        }
        console.log(firstNum, secondNum, "there was no error");

    // determine the lowest and highest numbers
    lowestNum = Math.min(firstNum, secondNum);
    highestNum = Math.max(firstNum, secondNum);

    // log the lowest and highest numbers to check
    console.log(lowestNum, highestNum);
    
    // add all numbers between lowestNum and highestNum
    for (let i = lowestNum; i <= highestNum; i++)
            finalSum += i;

    console.log(finalSum, "finalSum");
    return finalSum;
    
};


// Do not edit below this line
module.exports = sumAll;
