// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Grab els with class of like-glyph
// loop each el through a for each loop
// attach a click event listener for each el
// invoke the callServer function as each el is iterated
document.addEventListener('DOMContentLoaded', ()=> {
  const hearts = document.querySelectorAll('.like-glyph')
  hearts.forEach(heart => {
    heart.addEventListener('click', (e)=>{
      callServer(e)
    })
  })
})

// callServer is invoked on the hearts el click event.
// We start by invoking the mock server function.
// After receiving our response, we run the updateHeart function.
// When the "server" returns a failure status, we grab the modal div, 
// ... change the class to render the error message, and change the text content to read error.
// After 3 seconds, change the modal div class to hide the error message el.
callServer = (e) => {
  mimicServerCall()
  .then(() => {
    updateHeart(e)
  })
  .catch((error) => {
    const errorMessage = document.querySelector('#modal')
    const p = document.querySelector('#modal p')
    errorMessage.classList.remove('hidden')
    p.textContent = error
    setTimeout(()=>{
      errorMessage.classList.add('hidden')
    } ,3000)
  })
}

// below, we use an if...else statement 
// ... to toggle the hearts el text from full heart to empty.
updateHeart = (e) => {
  if (e.target.textContent === EMPTY_HEART) {
    e.target.textContent = FULL_HEART
    e.target.classList.add('activated-heart')
  } else {
    e.target.textContent = EMPTY_HEART
    e.target.classList.remove('activated-heart')
  }
}


//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}