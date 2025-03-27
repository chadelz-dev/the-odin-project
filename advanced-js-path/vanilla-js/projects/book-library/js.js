// Set background color
document.body.style.backgroundColor = "#f0f090";

// Define table headers
const headerLabels = [
  "Title",
  "Release Year",
  "Author",
  "Pages",
  "Book Read",
  "Unique ID",
  "Actions",
];

// Book constructor function
function Book(title, releaseYear, author, pages, bookRead) {
  this.title = title;
  this.releaseYear = releaseYear;
  this.author = author;
  this.pages = pages;
  this.bookRead = bookRead;
  this.uniqueID = crypto.randomUUID();
}

// Method to toggle read status added to Book constructor prototype
Book.prototype.toggleRead = function () {
  // swaps the boolean value
  this.bookRead = !this.bookRead;
  return this.bookRead;
};

// Initialize library with default books
const myLibrary = [
  new Book(
    "The Bible: Latin Vulgate",
    405,
    "Various Authors (translated by St. Jerome)",
    1200,
    true
  ),
  new Book("The Kybalion", 1908, "Three Initiates", 150, true),
  new Book("Who Am I?", 1923, "Sri Ramana Maharshi", 50, true),
  new Book(
    "Kashmir Shaivism: The Secret Supreme",
    1985,
    "Swami Lakshmanjoo",
    135,
    true
  ),
  new Book("The Quran", 632, "Muhammad (revealed)", 604, true),
];

// Function to add new book to library
function addBookToLibrary(title, releaseYear, author, pages, bookRead) {
  const newBook = new Book(title, releaseYear, author, pages, bookRead);
  myLibrary.push(newBook);
}

// testing the addBookToLibrary function
addBookToLibrary("test book", 2025, "Me", 1, false);

// Function to toggle read status in the table (toggle button calls this function)
function toggleReadStatus(event) {
  // get the row which has the value we want to change
  const row = event.target.closest("tr");
  if (row) {
    // Get row index and toggle the book's read status (-1 accounts for header)
    const rowIndex = Array.from(row.parentNode.children).indexOf(row) - 1;
    // using the toggleRead prototype function
    myLibrary[rowIndex].toggleRead();
    // Update the display in the table
    const readStatusCell = row.querySelector(`td.table-cell-${rowIndex}-4`);
    readStatusCell.textContent = myLibrary[rowIndex].bookRead;
  }
}

// Function to delete a book from the library
function deleteBook(event) {
  const row = event.target.closest("tr"); // get row

  if (row) {
    // get index number for dynamic values
    const rowIndex = Array.from(row.parentNode.children).indexOf(row) - 1;
    // Remove book from array and table
    myLibrary.splice(rowIndex, 1);
    row.remove();

    // Rebuild the table to ensure indices stay in sync (indices = plural index)
    createTable(headerLabels, myLibrary);
  }
}

// ////////////////////////////////////////////////////////////////////////////

// Function to create and display the table
function createTable(headers, data) {
  // get the container to work with
  const container = document.getElementById("container");

  // create the table and give it a class name
  const table = document.createElement("table");
  table.className = "dynamic-table";

  // Create header row and give class name
  const headerRow = document.createElement("tr");
  headerRow.className = "header-row";

  // Create header cells, assign class name & text to cells for each array element
  headers.forEach((headerText, index) => {
    const th = document.createElement("th");
    th.className = `header-cell-${index}`;
    th.textContent = headerText;
    // assign data-title attribute to first cell
    if (index === 0) th.setAttribute("data-title", "title");
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow); // append header row to table

  // Create data rows for each book
  data.forEach((book, rowIndex) => {
    const row = document.createElement("tr");
    row.className = `table-row-${rowIndex}`;

    // Array of book properties to display, get values from book object
    const bookData = Object.values(book);

    // Create cells for each book property based on bookData
    bookData.forEach((cellData, cellIndex) => {
      const td = document.createElement("td");
      td.className = `table-cell-${rowIndex}-${cellIndex}`;
      td.textContent = cellData;
      if (cellIndex === 0) td.setAttribute("data-title", "title");
      row.appendChild(td);
    });

    // Create action buttons (Delete and Toggle)
    const actionCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    const toggleButton = document.createElement("button");

    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", deleteBook);

    toggleButton.className = "toggle-button";
    toggleButton.textContent = "Toggle Read";
    toggleButton.addEventListener("click", toggleReadStatus);

    actionCell.appendChild(deleteButton);
    actionCell.appendChild(toggleButton);
    row.appendChild(actionCell);

    table.appendChild(row);
  });

  // Clear container and add new table
  container.innerHTML = "";
  container.appendChild(table);
}

// ////////////////////////////////////////////////////////////////////////////

// Create Add Book button and get container for it
const addButtonContainer = document.getElementById("addBookContainer");
const addBookButton = document.createElement("button");
addBookButton.className = "add-book-button";
addBookButton.textContent = "Add Book";

// attach click event listener to button
addBookButton.addEventListener("click", () => {
  // display modal when button is clicked with css display property
  modal.style.display = "block";
});
// append button to container
addButtonContainer.appendChild(addBookButton);

// //////

// Create modal for adding books
const modal = document.createElement("div");
modal.className = "modal";
modal.innerHTML = `
    <div class="modal-content">
        <span class="close">&times;</span>
        <form id="bookForm">
            <input type="text" id="title" placeholder="Title" required>
            <input type="number" id="releaseYear" placeholder="Release Year" required>
            <input type="text" id="author" placeholder="Author" required>
            <input type="number" id="pages" placeholder="Pages" required>
            <div class="checkbox-container">
                <p>Read Book</p>
                <input type="checkbox" id="bookRead">
            </div>
            <button type="submit">Submit Book</button>
        </form>
    </div>
`;

// Add modal to page
document.body.appendChild(modal);

// get the form element
const form = modal.querySelector("#bookForm");

// attach addEventListener to form for submit event
form.addEventListener("submit", (e) => {
  // prevent default form submission to server
  e.preventDefault();

  // Store form values in variables for populating addBookToLibrary function
  const title = document.getElementById("title").value;
  const releaseYear = parseInt(document.getElementById("releaseYear").value);
  const author = document.getElementById("author").value;
  const pages = parseInt(document.getElementById("pages").value);
  const bookRead = document.getElementById("bookRead").checked;

  // Add book using stored variables and update display
  addBookToLibrary(title, releaseYear, author, pages, bookRead);
  createTable(headerLabels, myLibrary); // reset table
  form.reset(); // reset form
  modal.style.display = "none"; // hide modal
});

// Close modal when clicking outside of the form in the greyed out area
window.addEventListener("click", (e) => {
  if (e.target.matches(".modal")) {
    modal.style.display = "none"; // hides the modal
  }
});

// Close modal with X button
const closeButton = modal.querySelector(".close"); // get the button

// attach addEventListener to clicking the X button
closeButton.addEventListener("click", () => {
  modal.style.display = "none";
});

// Create initial table
createTable(headerLabels, myLibrary);

/*

-- creating the table using js,

 - this is just for visualizing purposes, of what is going on and what we are working with.

   - this helps with understanding what the CSS is doing with js.

 - a shortened example of the table

<table class="dynamic-table">
  <tr class="header-row">
    <th class="header-cell-0" data-title="title">Title</th>
    <th class="header-cell-1">Release Year</th>
  </tr>

  <tr class="Table-row-0">
    <td class="table-cell-0-0">The Bible: Latin Vulgate</td>
    <td class="table-cell-0-1">405</td>
    <td class="table-cell-0-5">
      <button class="delete-button">Delete</button>
    </td>
  </tr>

  <tr class="Table-row-1">
    <td class="table-cell-1-0">The Bible: Latin Vulgate</td>
    <td class="table-cell-1-1">405</td>
    <td class="table-cell-1-5">
      <button class="delete-button">Delete</button>
    </td>
  </tr>
</table>

-- code explained

 - the above is the table we are creating exlusively using JS.

 - how practical using js only is, remains to be seen but it is a cool idea

   - the only way to really drill it into your head is by doing it over and over.


 - the fact that the CSS classes pick up the html elements, shows that:

   - the DOM really has the html, even though you do not see it in the index page.

   - granted though building the skeleton in html would have been easier.





*/
