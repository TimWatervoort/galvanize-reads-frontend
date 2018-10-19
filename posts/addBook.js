document.addEventListener('DOMContentLoaded', () => {



  const titleForm = document.querySelector('#titleForm');
  const genreForm = document.querySelector('#genreForm');
  const descriptionForm = document.querySelector('#descriptionForm');
  const coverForm = document.querySelector('#coverForm');
  const authorsForm = document.querySelector('#authorsForm');
  const submit = document.querySelector('#submit');
  const dropdown = document.querySelector('select');

  function makeOption(name) {
    let option = document.createElement('option');
    option.innerText = name;
    return option;
  }

  function makeList() {
    axios.get('https://rocky-castle-97526.herokuapp.com/authors').then(result => {
      result.data.forEach(author => {
        dropdown.appendChild(makeOption(`${author.firstName} ${author.lastName}`));
      })
    })
  }

  makeList();

  dropdown.addEventListener('click', event => {
    authorsForm.value += `${dropdown.value},`;
  })

  submit.addEventListener('click', event => {
    event.preventDefault();
    postBook();
  });

});

function postBook() {
  let newBook = {
    title: titleForm.value,
    genre: genreForm.value,
    description: descriptionForm.value,
    coverUrl: coverForm.value,
    authors: authorsForm.value.split(',')
  }
  axios.get('https://rocky-castle-97526.herokuapp.com/authors')
    .then(result => {
      if (newBook.authors) {
        let sender = [];
        newBook.authors.forEach(author => {
          if (author === "") return;
          let chooser = result.data.filter(x => {
            return `${x.firstName} ${x.lastName}` === author;
          })
          if (chooser.length === 0) {
            makeErr();
          } else {
            sender.push(chooser[0].id);
          }
          newBook.authors = sender;
        })
      }
      axios.post('https://rocky-castle-97526.herokuapp.com/books', newBook)
        .then(result => {
          console.log(result.data);
          makeCard(result.data);
        })
    })
    .catch(err => {
      makeErr();
    });
}

function makeDiv(cl) {
  let div = document.createElement('div');
  div.classList.add(cl);
  return div;
}

function makeCard(dat) {
  setHere.appendChild(makeDiv('card')).appendChild(makeDiv('card-body')).innerText = `Posted: ${dat.title}.`
}

function makeErr() {
  setHere.innerHTML = '';
  setHere.classList.add('bg-danger')
  setHere.appendChild(makeDiv('card')).appendChild(makeDiv('card-body')).innerText = 'Post failed!'
}
