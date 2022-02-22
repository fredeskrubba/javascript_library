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
            if (value === "read" && book[value] === true){
                let bookInfo = document.createElement("p");
                bookInfo.textContent = "Read";
                bookInfo.classList.add("book-read");
                bookContainer.appendChild(bookInfo);    
            } else if(value === "read" && book[value] === false){
                let bookInfo = document.createElement("p");
                bookInfo.textContent = "Not Read";
                bookInfo.classList.add("book-read");
                bookContainer.appendChild(bookInfo); 
            }else {
                let bookInfo = document.createElement("p");
                bookInfo.textContent = value + ": " + book[value];
                bookContainer.appendChild(bookInfo);
            }
        }
        let cancelBook = document.createElement("div");
        cancelBook.classList.add("remove-book-button");
        let cancelBookText = document.createElement("p");
        cancelBookText.textContent = "Remove Book";
        cancelBook.appendChild(cancelBookText);
        bookContainer.appendChild(cancelBook);
        cancelBook.addEventListener("click", ()=>{
            removeBook(book);
        })
        bookContainer.appendChild(addSlider(book));
    });
}


displayBooks(libraryArray);


// remove the book where the removebook button is located
function removeBook(book){
    libraryArray.splice(libraryArray.indexOf(book), 1);
    while (bookWrapper.firstChild){
        bookWrapper.removeChild(bookWrapper.firstChild);
    }
    displayBooks(libraryArray);
}

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

function removeBooks(array){
    array.forEach(book => {
        while (bookWrapper.firstChild){
            bookWrapper.removeChild(bookWrapper.firstChild);
        }
    });
}
submitBookButton.addEventListener("click", ()=>{
    addBookToLibrary(addCustomBook());
    addBook.style.display = "none";
    showModal.textContent = "Add Book";
    removeBooks(libraryArray);
    displayBooks(libraryArray);
})

function addSlider(book){
    let readSlider = document.createElement("label");
    readSlider.classList.add("switch");
    let sliderInput = document.createElement("input");
    sliderInput.type = "checkbox";
    sliderInput.classList.add("slider-check");
    let sliderSpan = document.createElement("span");
    sliderSpan.classList.add("slider");
    readSlider.appendChild(sliderInput);
    readSlider.appendChild(sliderSpan);
    if (book.read === true){
        sliderInput.checked = true;        
    }
    sliderInput.addEventListener("click", ()=>{
        if (book.read === true){
            book.read = false;
        } else if (book.read === false){
            book.read = true;
        }
        while (bookWrapper.firstChild){
            bookWrapper.removeChild(bookWrapper.firstChild);
        }
        libraryArray.forEach(book => {
            let bookContainer = document.createElement("div");
            bookContainer.classList.add("book-container");
            bookWrapper.appendChild(bookContainer);
            // for loop that goes over every key in the book, and adds it value to the dom
            for (value in book){
                if (value === "read" && book[value] === true){
                    let bookInfo = document.createElement("p");
                    bookInfo.textContent = "Read";
                    bookInfo.classList.add("book-read");
                    bookContainer.appendChild(bookInfo);    
                } else if(value === "read" && book[value] === false){
                    let bookInfo = document.createElement("p");
                    bookInfo.textContent = "Not Read";
                    bookInfo.classList.add("book-read");
                    bookContainer.appendChild(bookInfo); 
                }else {
                    let bookInfo = document.createElement("p");
                    bookInfo.textContent = value + ": " + book[value];
                    bookContainer.appendChild(bookInfo);
                }
            }
            let cancelBook = document.createElement("div");
            cancelBook.classList.add("remove-book-button");
            let cancelBookText = document.createElement("p");
            cancelBookText.textContent = "Remove Book";
            cancelBook.appendChild(cancelBookText);
            bookContainer.appendChild(cancelBook);
            cancelBook.addEventListener("click", ()=>{
                removeBook(book);
            })
            bookContainer.appendChild(addSlider(book));
        });
    })
    return readSlider;
}