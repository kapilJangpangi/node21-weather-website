const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2')

//messageOne.textContent = 'ols'

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()//prevent the default behaviour of refresh the page
  const location = search.value
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';
  fetch('http://localhost:3000/weather?address=' + encodeURIComponent(location))
  .then(response => {
    response.json().then(data => {
      if(data.error) {
        messageOne.textContent = data.error
        //console.log(data.error)
      } else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
        //console.log(data.location);
        //console.log(data.forecast);
      }
    });
  })
} )