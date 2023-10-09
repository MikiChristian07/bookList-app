// Book Constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor
function UI(){

}

// Local Storage Constructor  
function Store(){
 
}

// Add Book to list
UI.prototype.addBook = function(newBook){
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');
    row.innerHTML = `<td>${newBook.title}</td>
                     <td>${newBook.author}</td>
                     <td>${newBook.isbn}</td>
                     <td><a href='#' class="delete">X</a></td>`;
    list.appendChild(row);
}

// Show Alert
UI.prototype.showAlert = function (message, className) {
    // Create div
    const div = document.createElement('div');
    // Add class
    div.className = className;
    // Add text 
    div.innerHTML = message;
    // Get parent
    const container = document.querySelector('.container')
    const form = document.querySelector('#book-form');

    // Insert error alert in page
    container.insertBefore(div, form);

    // Remove error after 3secs
    setTimeout(function(){
        div.remove();
    }, 2000); 
}

// Delete Book
UI.prototype.deleteBook = function(target){
    if (target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

// Clear fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Get books form LS
Store.prototype.getBooks = function(){
        let books;

        if (localStorage.getItem('books') === null){
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;

}

// Display Books in UI
Store.prototype.displayBooks = function(){
    const books = Store.getBooks();

    books.forEach(book => {
        const ui = new UI();

        // Add book to the ui
        ui.addBook(book);
    });
}

// Add Book to LS
Store.prototype.addBook = function(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
}

// Remove Book from LS
Store.prototype.removeBook = function(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
        if (book.isbn === isbn){
            books.splice(index, 1);
        }
    });

    localStorage.setItem('books', JSON.stringify(books));   
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);


//Event Listener for Add Book
document.getElementById('book-form').addEventListener('submit', function(e){

    // Get form values 
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

    
    // Instantiate new book 
    const newBook = new Book(title, author, isbn);

    //Instantiate Ui
    const ui = new UI();

    console.log(ui);

    // Validate
    if(title === '' || author === '' || isbn === ''){
        // Error Alert
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        // Add book to list
        ui.addBook(newBook);

        // Clear Fields
        ui.clearFields();

        // Success Alert
        ui.showAlert('Book Added!','success');
    }


    e.preventDefault();
})

// Event Listener for Delete Book
document.getElementById('book-list').addEventListener('click', function(e) {

        //Instantiate Ui
        const ui = new UI();

        // Delete Book
        ui.deleteBook(e.target);

        // Show message
        ui.showAlert('Book Deleted!','success');

        e.preventDefault();
})