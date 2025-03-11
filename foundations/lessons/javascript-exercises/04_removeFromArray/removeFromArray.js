const removeFromArray = function(arr, ...theArgs) {
    let arrToEdit = [...arr];
    let args = [...theArgs];
    let newArray = [];

    // iterate each element of arrToEdit
    for (let i = 0; i < arrToEdit.length; i++)
        {
            // flag to determine whether current element should be added
            let addToNewArray = true;

            // iterate each element of args
            for (let j = 0; j < args.length; j++)
                {
                    // check if current element is equal to any element in args
                    if (arrToEdit[i] === args[j])
                        {
                            // the next if statement will return false 
                            addToNewArray = false;
                            break
                        }
                }
            // only add element to newArray if addToNewArray is true
                if (addToNewArray)
                {
                    newArray.push(arrToEdit[i]);
                }
        }
        // check newAray befroe returning it
        console.log(newArray);
        return newArray;
};

// Do not edit below this line
module.exports = removeFromArray;
