//DOM elements
const newBookForm = document.querySelector('.newBookForm');
const library = document.querySelector('.library');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const radiosInput = document.getElementsByName('status');

let myLibrary = [];

function Book(title, author, numPages, hasRead) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.hasRead = hasRead;
}

function addToLibrary(title, author,pages, hasRead) {
  myLibrary.push(new Book(title, author, pages, hasRead));
  updateDisplay();
}

function updateDisplay() {
  while(library.lastChild.id !== 'newBookButton') {
    library.removeChild(library.lastChild);
  }

  myLibrary.forEach(entry => {
    createBookTile(entry);
  });
} 

function createBookTile(book) {
  //elements for tile creation
  const newEntry = document.createElement("div");
  const newP = document.createElement('p');

  //creates button to update read status
  const readButton = document.createElement("button");
  readButton.textContent = "Change Read Status"
  readButton.classList.add("readButton");
 
  //creates button to delete book 
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete Book";
  deleteButton.classList.add("deleteButton");

  //create a tile
  library.appendChild(newEntry);
  newEntry.appendChild(newP);
  newP.innerText=
    `Title: \n${book.title}\n
      Author: \n${book.author}\n
      Number of Pages: \n${book.numPages}\n
      Read?: \n${book.hasRead}
    `;
  newEntry.appendChild(readButton);
  newEntry.appendChild(deleteButton);
  newEntry.classList.add("tile");

  readButton.addEventListener('click', () => {
    if(book.hasRead === 'Yes') {
      book.hasRead = 'No';
    }
    else {
      book.hasRead = 'Yes';
    }
    updateDisplay();
  });

  deleteButton.addEventListener('click', () => {
    myLibrary.splice(myLibrary.indexOf(book), 1);
    updateDisplay();
  });
}

function getValues() {
  let readVal = '';

  radiosInput.forEach(btn => {
    if(btn.checked) {
      readVal = btn.id;
    }
  });
  
  addToLibrary(titleInput.value, authorInput.value, pagesInput.value, readVal);
  closeForm();
}

function openForm() {
  newBookForm.style.display = "block";
}

function closeForm() {
  newBookForm.style.display = "none";
}
