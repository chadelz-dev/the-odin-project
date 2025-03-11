
// -- Creating a Div and Content
const container = document.querySelector("#container");

//  - create a div element
const content = document.createElement("div");
content.classList.add("content");
content.textContent = "This is the glorious text-content!";

container.appendChild(content);

//  - create red text p element
const redText = document.createElement("p");
redText.style.color = "red";
redText.classList.add("content");
redText.textContent = "Hey I'm red!";

container.appendChild(redText);

//  - create blue text h3 element
const blueText = document.createElement("h3");
blueText.style.color = "blue";
blueText.classList.add("content");
blueText.textContent = "I'm a blue h3!";

container.appendChild(blueText);

//  - create an inner div element
const innerDiv = document.createElement("div");
innerDiv.style.border = "1px solid black";
innerDiv.style.backgroundColor = "pink";

container.appendChild(innerDiv);

//  - create an h1 element in the innerDiv element
const h1 = document.createElement("h1");
h1.textContent = "I'm in a div";

innerDiv.appendChild(h1);

//  - create a p tag in the innerDiv element
const plainText = document.createElement("p");
plainText.textContent = "ME TOO!";

innerDiv.appendChild(plainText);

// ////////////////////////////////////////////////////////////////////////////


// -- Buttons (3 ways to add events to a buttun)

//  - Events - Method 2 - Adding event listener to button (less ideal ex):
const btn = document.querySelector("#btn");
btn.onclick = () => alert("Hello World");


//  - Method 3 - Adding event listener to button (best option):
const btn2 = document.querySelector("#btn2");
btn2.addEventListener("click", () => {
  alert("Hello World");
});


// //////

// -- Using Named functions for all 3 examples:

//  - METHOD 1 - (least ideal ex.) - being called by the button itself
function alertFunction() {
    alert("YAY! YOU DID IT!");
  }
  

// METHODS 2 & 3
function alertFunction2() {
    alert("YAY! YOU DID IT!");
  }
// Method 3
function alertFunction3() {
    alert("YAY! YOU DID IT again!");
  }

// grabbing the button
const btn3 = document.querySelector("#btn3");
  
// METHOD 2 - assigning the function to the button (only 1 of these)
btn3.onclick = alertFunction2;
  
// METHOD 3 - listerner event attached to the button (many of these)
btn3.addEventListener("click", alertFunction3);

// ////////////////////////////////////////////////////////////////////////////


// -- Event Objects (event parameters)

// grabbing the button
const btn4 = document.querySelector("#btn4");

// show target info ex.:
btn4.addEventListener("click", function (e) {
    console.log("Target Info Below:");
    console.log(e);
  });
  
// show element ex.:
btn4.addEventListener("click", function (e) {
    console.log("Target Element Below:");
  console.log(e.target);
});

// change colour ex.:
btn4.addEventListener("click", function (e) {
    e.target.style.background = "blue";
  });

// ////////////////////////////////////////////////////////////////////////////


// -- Attaching Listeners to Groups of Noes (NodeLists)

// buttons is a node list. It looks and acts much like an array.
const buttons = document.querySelectorAll(".groupedBtns");

// we use the .forEach method to iterate through each button
buttons.forEach((button) => {
  // and for each one we add a 'click' listener
  button.addEventListener("click", () => {
    alert(button.id);
  });
});
