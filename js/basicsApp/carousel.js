const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

// arrange slides next  to another
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
}

slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
};

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
};

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
    console.log("current slide index: " + targetIndex + "and slides length: " + slides.length)
    if (targetIndex === 0) {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');

    } else if (targetIndex === slides.length - 1) {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    } else {
        prevButton.classList.remove("is-hidden");
        nextButton.classList.remove("is-hidden");
    }
};

// go left function
const goLeft = () => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);

    updateBasics(prevIndex);
    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
    hideShowArrows(slides, prevButton, nextButton, prevIndex);
};
// click left
prevButton.addEventListener('click', e => {
    goLeft()
});


// go right function
const goRight = () => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);

    updateBasics(nextIndex);
    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(slides, prevButton, nextButton, nextIndex);
}
// click right
nextButton.addEventListener('click', e => {
    goRight()
});


// click indicators
dotsNav.addEventListener('click', e => {
    // what indicator was clicked on
    const targetDot = e.target.closest('button');

    if (!targetDot) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    updateBasics(targetIndex);
    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(slides, prevButton, nextButton, targetIndex);
});



/************************/
/*                      */
/*        SCORES        */
/*                      */
/************************/


let scores = [0,null,0];


$('input:radio').on('click', function(e) {
    let inputRadioClicked = $(e.currentTarget);
    const currentSlide = track.querySelector('.current-slide');
    const currentIndex = slides.findIndex(slide => slide === currentSlide);
    scores[currentIndex] = inputRadioClicked.attr('value');

    console.log(calculateChanges());
    console.log(scores);
    console.log('inputName='+inputRadioClicked.attr('name') + ' inputValue='+ inputRadioClicked.attr('value'));
});


function calculateChanges() {
    let score = 0;

    scores.forEach(function (value) {
       score += value;
    });

    return score;
}


/************************/
/*                      */
/*        BASICS        */
/*                      */
/************************/

const basicsStack = document.querySelector('.carousel__basics-blue');
const basicsLetters = Array.from(basicsStack.children);

const basicsTextStack = document.querySelector('.basics__term');
const basicsText = Array.from(basicsTextStack.children);


const getLetterIndex = (slideIndex) => {
    return (slideIndex / 4) | 0;
};


const updateBasics = (targetIndex) => {
    console.log(targetIndex);

    const currentLetter = basicsStack.querySelector('.current-letter');
    const targetLetter = basicsLetters[getLetterIndex(targetIndex)];

    const currentText = basicsTextStack.querySelector('.current-text');
    const targetText = basicsText[getLetterIndex(targetIndex)];

    // If we reach the last slide -> hide all letters
    if (targetIndex === slides.length - 1) {
        currentText.classList.add('hidden-text');
        currentLetter.classList.add('hidden-letter');
    // Else do the normal hide un-hide
    } else {
        currentLetter.classList.remove('current-letter');
        targetLetter.classList.add('current-letter');

        currentLetter.classList.add('hidden-letter');
        targetLetter.classList.remove('hidden-letter');

        currentText.classList.remove('current-text');
        targetText.classList.add('current-text');

        currentText.classList.add('hidden-text');
        targetText.classList.remove('hidden-text');
    }
};


/************************/
/*                      */
/*        Swipes        */
/*                      */
/************************/
console.log("Swipe demo")

let hammertime = new Hammer(track);

hammertime.on("swipeleft", function(ev) {
    goRight()
});
hammertime.on("swiperight", function(ev) {
    goLeft()
});


