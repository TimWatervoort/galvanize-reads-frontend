document.addEventListener(`DOMContentLoaded`, () => {

  const getBooks = document.querySelector('#getBooks');
  const getAuthors = document.querySelector('#getAuthors');

  getBookContent();
  getAuthorContent();

  document.addEventListener('click', event => {
    if (/edit/.test(event.target.id)) {
      let id = event.target.id.replace(/edit/, '');
      editBook(id);
    } else if (/submit/.test(event.target.id)) {
      let id = event.target.id.replace(/submit/, '');
      submitEdits(id);
    } else if (/delete/.test(event.target.id)) {
      let id = event.target.id.replace(/delete/, '');
      deleteBook(id);
    } else if (/delauthor/.test(event.target.id)) {
      let id = event.target.id.replace(/delauthor/, '');
      deleteAuthor(id);
    } else if (/edauthor/.test(event.target.id)) {
      let id = event.target.id.replace(/edauthor/, '');
      editAuthor(id);
    } else if (/subauthor/.test(event.target.id)) {
      let id = event.target.id.replace(/subauthor/, '');
      submitEdits(id);
    }
  })

});

const authCol = document.querySelector('#authorsCollapse');
const bookCol = document.querySelector('#booksCollapse');
const setHere = document.querySelector('#setHere');

// Set info for the book
function bookTemplate(info) {
  let result = `<p><img class='mr-3' src=${info.coverUrl}></img>
  <span>
  Title: ${info.title}<br>
  Genre: ${info.genre}<br>
  Description: ${info.description}<br>
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
  cardbody.appendChild(makeButton('edit', info.id));
  cardbody.appendChild(makeButton('delete', info.id));
  return cardbody;
}

// Make edit and delete buttons
function makeButton(type, id, content) {
  let button = document.createElement('button');
  button.classList.add('btn');
  button.classList.add('btn-secondary');
  button.classList.add('mb-2');
  button.id = `${type}${id}`;
  button.innerText = content || type.toUpperCase();
  return button;
}

// Add an author to the dropdown
function addAuthor(info) {
  let cardbody = document.createElement('div');
  cardbody.classList.add('card');
  cardbody.classList.add('card-body');
  cardbody.innerHTML = authorTemplate(info);
  cardbody.appendChild(makeButton('edauthor', info.id, 'EDIT'));
  cardbody.appendChild(makeButton('delauthor', info.id, 'DELETE'));
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
  axios.get('https://rocky-castle-97526.herokuapp.com/authors')
  .then(result => {
    populateAuthors(result.data);
  });
}

// Request to get books
function getBookContent() {
  axios.get('https://rocky-castle-97526.herokuapp.com/books')
    .then(result => {
      populateBooks(result.data);
    });
}

// Make an edit form
function makeForm(input, id, data) {
  let form = document.createElement('input');
  form.setAttribute('type', 'text');
  form.setAttribute('style', 'width: 300px;')
  form.id = (`${input}Form`);
  form.setAttribute('value', data)
  return form;
}

// Make an editable card
function makeEditableCard(data) {
  console.log(data);
  bookCol.appendChild(makeForm('title', data.id, data.title));
  bookCol.appendChild(document.createElement('br'))
  bookCol.appendChild(makeForm('genre', data.id, data.genre));
  bookCol.appendChild(document.createElement('br'))
  bookCol.appendChild(makeForm('description', data.id, data.description));
  bookCol.appendChild(document.createElement('br'))
  bookCol.appendChild(makeForm('authors', data.id, data.authors));
  bookCol.appendChild(document.createElement('br'))
  bookCol.appendChild(makeForm('coverUrl', data.id, data.coverUrl));
  bookCol.appendChild(document.createElement('br'))
  bookCol.appendChild(makeButton('submit', data.id));
}

// Get needed info for book
function editBook(id) {
  bookCol.innerHTML = '';
  axios.get(`https://rocky-castle-97526.herokuapp.com/books/${id}`).then(result => {
    makeEditableCard(result.data);
  });
}

// Submit the edits
function submitEdits(id) {
  let info = {
    title: document.querySelector('#titleForm').value,
    genre: document.querySelector('#genreForm').value,
    description: document.querySelector('#descriptionForm').value,
    coverUrl: document.querySelector('#coverUrlForm').value,
    authors: document.querySelector('#authorsForm').value
  }
  axios.put(`https://rocky-castle-97526.herokuapp.com/books/${id}`, info)
    .then(result => {
      console.log(result);
      getAuthorContent();
    })
    .catch(err => {
      console.log(err);
    })
}

// Delete a book
function deleteBook(id) {
  axios.delete(`https://rocky-castle-97526.herokuapp.com/books/${id}`)
    .then(result => {
      console.log(result);
      getBookContent();
    })
}

// Delete an author
function deleteAuthor(id) {
  axios.delete(`https://rocky-castle-97526.herokuapp.com/authors/${id}`)
    .then(result => {
      console.log(result);
      getAuthorContent();
    })
    .catch(err => {
      console.log(err);
    })
}

// Make an editable author card
function makeEditableAuthorCard(data) {
  authCol.appendChild(makeForm('firstName', data.id, data.firstName));
  authCol.appendChild(makeForm('lastName', data.id, data.lastName));
  authCol.appendChild(makeForm('portraitUrl', data.id, data.portraitUrl));
  authCol.appendChild(makeButton('subauthor', data.id, 'SUBMIT'));
}

// Get needed info for author
function editAuthor(id) {
  authCol.innerHTML = '';
  axios.get(`https://rocky-castle-97526.herokuapp.com/authors/${id}`).then(result => {
    makeEditableAuthorCard(result.data);
  });
}

// Submit author edits
function submitAuthorEdits(id) {
  let info = {
    firstName: firstNameForm.value,
    lastName: lastNameForm.value,
    coverUrl: coverUrlForm.value
  }
  axios.put(`https://rocky-castle-97526.herokuapp.com/authors/${id}`, info)
    .then(result => {
      getAuthorContent();
    })
    .catch(err => {
      console.log(err);
    })
}
