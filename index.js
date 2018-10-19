document.addEventListener(`DOMContentLoaded`, () => {

  getBookContent();
  getAuthorContent();

});

const authCol = document.querySelector('#authorsCollapse');
const bookCol = document.querySelector('#booksCollapse');

// Set info for the book
function bookTemplate (info) {
  let result = `<p><img src=${info.coverUrl}></img>
  <span class='ml-3'>
  Title: ${info.title}<br>
  </span>
  <span class='ml-3'>
  Genre: ${info.genre}<br>
  </span>
  <span class='ml-3'>
  Description: ${info.description}<br>
  </span>
  <span class = 'ml-3'>
  Authors: ${info.authors.join(', ')}
  </span>
  <p>
  `
  return result;
}

// Set info for the author
function authorTemplate(info) {
  let result = `<p><img src=${info.portraitUrl}></img>
  <span class='ml-3'> ${info.firstName} ${info.lastName}
  <p>
  `
  return result;
}

// Add a book to the dropdown
function addBook(info) {
  let cardbody = document.createElement('div');
  cardbody.classList.add('card');
  cardbody.classList.add('card-body');
  cardbody.innerHTML = bookTemplate(info);
  return cardbody;
}

// Add an author to the dropdown
function addAuthor(info) {
  let cardbody = document.createElement('div');
  cardbody.classList.add('card');
  cardbody.classList.add('card-body');
  cardbody.innerHTML = authorTemplate(info);
  return cardbody;
}

// Determine whether we are getting one book or multiple books
function populateBooks(books) {
  if (Array.isArray(books)) {
    books.forEach(book => {
      bookCol.appendChild(addBook(book));
    })
  } else {
    bookCol.appendChild(addBook(books));
  }
}

// Determine whether we are getting one author or multiple authors
function populateAuthors(authors) {
  if (Array.isArray(authors)) {
    authors.forEach(author => {
      authCol.appendChild(addAuthor(author));
    })
  } else {
    authCol.appendChild(addAuthor(authors));
  }
}

// Request to get authors
function getAuthorContent() {
  // axios.get('url/authors')
  // .then(result => {
  //   populateAuthors(data);
  // });
  let result = {
    id: 1,
    firstName: 'Daniel',
    lastName: 'Youngandstrong',
    portraitUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Abraham_Lincoln_O-77_matte_collodion_print.jpg/220px-Abraham_Lincoln_O-77_matte_collodion_print.jpg'
  }
  populateAuthors(result);
}

// Request to get books
function getBookContent() {
  // axios.get('url/books')
  // .then(result => {
  //   populateBooks(result.data);
  // });
  let result = [{
      id: 1,
      title: 'The Wonderful Book',
      genre: 'Thriller',
      coverUrl: 'https://ewedit.files.wordpress.com/2016/09/hpsorcstone.jpg?w=405',
      description: 'This book is awful.',
      authors: ['Abraham Lincoln', 'Daniel Youngandstrong']
    },
    {
      id: 2,
      title: 'Book the Book',
      genre: 'Mystery',
      coverUrl: 'https://ewedit.files.wordpress.com/2016/09/hpsorcstone.jpg?w=405',
      description: 'This book is ok.',
      authors: ['Abraham Lincoln']
    }
  ]
  populateBooks(result);
}
