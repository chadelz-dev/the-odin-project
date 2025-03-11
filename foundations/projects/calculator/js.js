// Basic math operations
const add = (a, b) => Number((a + b).toFixed(2));
const subtract = (a, b) => Number((a - b).toFixed(2));
const multiply = (a, b) => Number((a * b).toFixed(2));
const divide = (a, b) =>
  b === 0 ? "Nice try! 🙄" : Number((a / b).toFixed(2));

// Calculator state for storing variables
let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetDisplay = false;

// grabbing DOM elements
const smallerDisplay = document.querySelector(".smallerEquationDisplay");
const largerDisplay = document.querySelector(".largerCurrentInputDisplay");
const numberButtons = document.querySelectorAll('[class*="number"]');
const operatorButtons = document.querySelectorAll('[class*="Button"]');
const decimalButton = document.querySelector(".decimalPointButton");
const equalsButton = document.querySelector(".equalsButton");
const clearButton = document.querySelector(".clearAllButton");
const deleteButton = document.querySelector(".deleteLastInputButton");
const zeroButton = document.querySelector(".zeroButton");
const posNegButton = document.querySelector(".posNegButton");
const percentageButton = document.querySelector(".percentageButton");

// Event listeners
numberButtons.forEach((button) => {
  button.addEventListener("click", () => appendNumber(button.textContent));
});

operatorButtons.forEach((button) => {
  if (
    button.textContent === "+" ||
    button.textContent === "-" ||
    button.textContent === "x" ||
    button.textContent === "÷"
  ) {
    button.addEventListener("click", () => setOperation(button.textContent));
  }
});

decimalButton.addEventListener("click", appendDecimal);
equalsButton.addEventListener("click", evaluate);
clearButton.addEventListener("click", clear);
deleteButton.addEventListener("click", deleteLastInput);
zeroButton.addEventListener("click", () => appendNumber("0"));
posNegButton.addEventListener("click", togglePosNeg);
percentageButton.addEventListener("click", convertToPercentage);

// Functions
function appendNumber(number) {
  if (shouldResetDisplay) {
    largerDisplay.textContent = "";
    shouldResetDisplay = false;
  }
  largerDisplay.textContent += number;
}

function appendDecimal() {
  if (shouldResetDisplay) {
    largerDisplay.textContent = "0";
    shouldResetDisplay = false;
  }
  if (!largerDisplay.textContent.includes(".")) {
    largerDisplay.textContent += ".";
  }
}

function setOperation(operator) {
  if (currentOperator !== null) evaluate();
  firstNumber = largerDisplay.textContent;
  currentOperator = operator;
  smallerDisplay.textContent = `${firstNumber} ${currentOperator}`;
  shouldResetDisplay = true;
}

function evaluate() {
  if (currentOperator === null || shouldResetDisplay) return;
  secondNumber = largerDisplay.textContent;
  let result;

  switch (currentOperator) {
    case "+":
      result = add(parseFloat(firstNumber), parseFloat(secondNumber));
      break;
    case "-":
      result = subtract(parseFloat(firstNumber), parseFloat(secondNumber));
      break;
    case "x":
      result = multiply(parseFloat(firstNumber), parseFloat(secondNumber));
      break;
    case "÷":
      result = divide(parseFloat(firstNumber), parseFloat(secondNumber));
      break;
  }

  smallerDisplay.textContent = `${firstNumber} ${currentOperator} ${secondNumber} =`;
  largerDisplay.textContent = result;
  currentOperator = null;
  shouldResetDisplay = true;
}

function clear() {
  largerDisplay.textContent = "";
  smallerDisplay.textContent = "";
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
}

function deleteLastInput() {
  largerDisplay.textContent = largerDisplay.textContent.slice(0, -1);
}

function togglePosNeg() {
  if (largerDisplay.textContent === "") return;

  if (largerDisplay.textContent.startsWith("-")) {
    largerDisplay.textContent = largerDisplay.textContent.slice(1);
  } else {
    largerDisplay.textContent = "-" + largerDisplay.textContent;
  }
}

function convertToPercentage() {
  if (largerDisplay.textContent === "") return;

  const number = parseFloat(largerDisplay.textContent);
  const percentage = number / 100;
  largerDisplay.textContent = percentage.toFixed(2);
}

// ////////////////////////////////////////////////////////////////////////////

// Add keyboard support
document.addEventListener("keydown", handleKeyboardInput);

function handleKeyboardInput(e) {
  // Numbers
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);

  // Operators
  if (e.key === "+") setOperation("+");
  if (e.key === "-") setOperation("-");
  if (e.key === "*" || e.key === "x") setOperation("x");
  if (e.key === "/") setOperation("÷");

  // Equals
  if (e.key === "Enter" || e.key === "=") {
    e.preventDefault(); // Prevent form submission if inside a form
    evaluate();
  }

  // Decimal
  if (e.key === ".") appendDecimal();

  // Backspace
  if (e.key === "Backspace") deleteLastInput();

  // Clear
  if (e.key === "Escape") clear();

  // Add percentage support
  if (e.key === "%") convertToPercentage();
}
