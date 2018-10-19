document.addEventListener('DOMContentLoaded', () => {

  const firstName = document.querySelector('#firstName');
  const lastName = document.querySelector('#lastName');
  const portrait = document.querySelector('#portraitUrl');
  const submit = document.querySelector('#submitButton');
  const setHere = document.querySelector('#setHere');

  submit.addEventListener('click', event => {
    event.preventDefault();
    postAuthor();
  })

});


function postAuthor () {
  let author = {
    firstName: firstName.value,
    lastName: lastName.value,
    portrait_url: portrait.value
  }
  axios.post('url/authors', author)
  .then(result => {
    makeCard(result.data[0]);
  })
  .catch(err => {
    console.log(err);
    makeErr()
  })
}

function makeDiv(cl) {
  let div = document.createElement('div');
  div.classList.add(cl);
  return div;
}

function makeCard(dat) {
  setHere.appendChild(makeDiv('card')).appendChild(makeDiv('card-body')).innerText = `Posted: ${dat.firstName} ${dat.lastName}`
}

function makeErr() {
  setHere.innerHTML = '';
  setHere.classList.add('bg-danger')
  setHere.appendChild(makeDiv('card')).appendChild(makeDiv('card-body')).innerText = 'Post failed!'
}
