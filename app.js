// Book Constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor
function UI(){

}
 
// Add Book to list
UI.prototype.addBook = function(newBook){
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');
    row.innerHTML = `<td>${newBook.title}</td>
                     <td>${newBook.author}</td>
                     <td>${newBook.isbn}</td>
                     <td><a href='#' class="btn btn-danger">X</a></td>`;
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
    }, 3000); 
}

// Clear fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

//Event Listeners
document.getElementById('book-form').addEventListener('submit', function(e){

    // Get form values 
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

    
    // Instantiate new book 
    const newBook = new Book(title, author, isbn);

    //Instantiate Ui
    const ui = new UI();

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
