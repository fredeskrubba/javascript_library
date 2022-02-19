let libraryArray = [];

const showModal = document.querySelector("#plus-book");
const addBook = document.querySelector("#addbook-container");

showModal.addEventListener("click", ()=>{
    if (addBook.style.display === "flex"){
        addBook.style.display = "none";
        showModal.textContent = "Add Book"
    } else {
        addBook.style.display = "flex";
        showModal.textContent = "Cancel";
    }
});


// constructor
function Book(title, author, year, read){
    this.title = title;
    this.author = author;
    this.year = year;
    this.read = read;
}

const lotr = new Book("Lord of the rings", "J.R.R. Tolkien", 1954, true);
const lordOfTheFlies = new Book("Lord of the flies", "William Golding", 1954, false);


function addBookToLibrary(book){
    return libraryArray.push(book);
}

addBookToLibrary(lotr);
addBookToLibrary(lordOfTheFlies);

let bookWrapper = document.querySelector("#book-wrapper");
function displayBooks(array){
    array.forEach(book => {
        let bookContainer = document.createElement("div");
        bookContainer.classList.add("book-container");
        bookWrapper.appendChild(bookContainer);
        // for loop that goes over every key in the book, and adds it value to the dom
        for (value in book){
            let bookInfo = document.createElement("p");
            bookInfo.textContent = value + ": " + book[value];
            bookContainer.appendChild(bookInfo);
        }
    });
}

displayBooks(libraryArray);

const submitBookButton = document.querySelector("#submit-book");

function addCustomBook(){
    let customBookName = document.querySelector("#name").value;
    let customBookAuthor = document.querySelector("#author").value;
    let customBookYear = document.querySelector("#year").value;
    let confirmRead;
    if (document.querySelector("#confirm-read").checked){
        confirmRead = true;
    } else {
        confirmRead = false;
    }
    let customBook = new Book(customBookName, customBookAuthor, customBookYear, confirmRead);
    return customBook;
}

submitBookButton.addEventListener("click", ()=>{
    addBookToLibrary(addCustomBook());
    addBook.style.display = "none";
    showModal.textContent = "Add Book";
})