document.addEventListener('DOMContentLoaded', () => {

  const titleForm = document.querySelector('#titleForm');
  const genreForm = document.querySelector('#genreForm');
  const descriptionForm = document.querySelector('#descriptionForm');
  const coverForm = document.querySelector('#coverForm');
  const authorsForm = document.querySelector('#authorsForm');
  const submit = document.querySelector('#submit');

  submit.addEventListener('click', event => {
    event.preventDefault();
    postBook();
  });

});

function postBook () {
  let newBook = {
    title: titleForm.value,
    genre: genreForm.value,
    description: descriptionForm.value,
    coverUrl: coverForm.value,
    authors: authorsForm.value
  }
  axios.post('https://rocky-castle-97526.herokuapp.com/books', newBook)
  .then(result=> {
    console.log(result.data);
    makeCard(result.data);
  })
  .catch(err=>{
    makeErr();
  });
}

function makeDiv(cl) {
  let div = document.createElement('div');
  div.classList.add(cl);
  return div;
}

function makeCard(dat) {
  setHere.appendChild(makeDiv('card')).appendChild(makeDiv('card-body')).innerText = `Posted: ${dat.title}, a ${dat.genre.toLowerCase()} book by ${dat.authors}.`
}

function makeErr() {
  setHere.innerHTML = '';
  setHere.classList.add('bg-danger')
  setHere.appendChild(makeDiv('card')).appendChild(makeDiv('card-body')).innerText = 'Post failed!'
}
