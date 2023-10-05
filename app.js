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

    // console.log(list);
}

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

    //Innstantiate Ui
    const ui = new UI();

    // Add book to list
    ui.addBook(newBook);

    // Clear Fields
    ui.clearFields();


    e.preventDefault();
})
