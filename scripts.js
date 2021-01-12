//Get all the required selectors
//Arrange the slides next to each other
//When i click right, moves slide to right
//When i click left, moves slide to left
//When i click nav indicators, move to that slide


//Get all the required selectors
const track = document.querySelector('.carousel__track')
const slides = Array.from(track.children)
const prevButton = document.querySelector('.carousel__button--left')
const nextButton = document.querySelector('.carousel__button--right')
const dotsNav = document.querySelector('.carousel__nav')
const dots = Array.from(dotsNav.children)


//Arrange the slides next to each other
const slideWidth = slides[0].getBoundingClientRect().width
// slides[0].style.left = `${slideWidth * 0}px`
// slides[1].style.left = `${slideWidth * 1}px`
// slides[2].style.left = `${slideWidth * 2}px`
slides.forEach((slide, index) => {
  slide.style.left = `${slideWidth * index}px`
})

//When i click right, moves slide to right
nextButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide')
  const nextSlide = currentSlide.nextElementSibling
  const currentDot = dotsNav.querySelector('.current-slide')
  const nextDot = currentDot.nextElementSibling;
  //Move the slide
  moveToNextSlide(track, currentSlide, nextSlide)
  updateDots(currentDot, nextDot)

})

//When i click left, moves slide to left
prevButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide')
  const prevSlide = currentSlide.previousElementSibling
  const currentDot = dotsNav.querySelector('.current-slide')
  const prevDot = currentDot.previousElementSibling;
  moveToNextSlide(track, currentSlide, prevSlide)
  updateDots(currentDot, prevDot)
})

//When i click nav indicators, move to that slide
dotsNav.addEventListener('click', e => {
  //What indicator was clicked on
  const targetDot = e.target.closest('button')//this will prevent adding the click on the container. Will only target circles
  if (!targetDot) return;
  const currentSlide = track.querySelector('.current-slide')
  const currentDot = dotsNav.querySelector('.current-slide')
  const targetIndex = dots.findIndex(dot => dot === targetDot)
  const targetSlide = slides[targetIndex]

  moveToNextSlide(track, currentSlide, targetSlide)

  updateDots(currentDot, targetDot)

})

function moveToNextSlide(track, currentSlide, targetSlide) {
  const amountToMove = targetSlide.style.left
  track.style.transform = `translateX(-${amountToMove})`
  currentSlide.classList.remove('current-slide')
  targetSlide.classList.add('current-slide')
}

function updateDots(currentDot, targetDot) {
  currentDot.classList.remove('current-slide')
  targetDot.classList.add('current-slide')
}