// unique namespace to avoid conflicts with other scripts
const ES6Features = {
  createCalculator() {
    return {
      add: (a, b) => a + b, // arrow function for concise syntax
      subtract: (a, b) => a - b,
    };
  },

  createCalculatorES5() {
    return {
      add: function (a, b) {
        return a + b;
      },
      subtract: function (a, b) {
        return a - b;
      },
    };
  },

  // display results in UI
  display() {
    const calc = this.createCalculator();
    const calcES5 = this.createCalculatorES5();

    // get the output div to work with
    const output = document.getElementById('output');

    output.innerHTML = `
    <p>ES6 Calculator: Add(5, 3) = ${calc.add(5, 3)}</p>
    <p>ES6 Calculator: Subtract(5, 3) = ${calc.subtract(5, 3)}</p>
    <p>ES5 Calculator: Add(6, 2) = ${calcES5.add(6, 2)}</p>
    <p>ES5 Calculator: Subtract(6, 2) = ${calcES5.subtract(6, 2)}</p>
    `;
    console.log('ES6 Add:', calc.add(5, 3));
  },
};

// global function to trigger button onclick="runES6Features()
function runES6Features() {
  ES6Features.display();
}
