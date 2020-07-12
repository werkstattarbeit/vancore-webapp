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

        //Disable swipe left
        swipeRightIsWorking = false;

    } else if (targetIndex === slides.length - 1) {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');

        //Disable swipe right
        swipeLeftIsWorking = false;
    } else {
        prevButton.classList.remove("is-hidden");
        nextButton.classList.remove("is-hidden");

        //Enable all swipe
        swipeLeftIsWorking = true;
        swipeRightIsWorking = true;
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
    updatePagenumber(prevIndex);
    setContactPageStyle(prevIndex);
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
    updatePagenumber(nextIndex);
    setContactPageStyle(nextIndex);
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
    setContactPageStyle(targetIndex);
});



/************************/
/*                      */
/*        SCORES        */
/*                      */
/************************/

// Represents all inputs from every slide
var scores = [0,0,0,null,0,0,0,null,0,0,0,null,0,0,0,null,0,0,0,null,0,0,0,null];

$('input:radio').on('click', function(e) {
    let inputRadioClicked = $(e.currentTarget);
    const currentSlide = track.querySelector('.current-slide');
    const currentIndex = slides.findIndex(slide => slide === currentSlide);
    scores[currentIndex] = inputRadioClicked.attr('value');
    updateProgressbar()
    updateMail()

    // Update final score
    let currentScore = calculateChanges()
    const finalScore = document.getElementById('final-score');
    const errorMessage = document.getElementById('error-message');
    //if (scores.includes(0)) {
        errorMessage.innerHTML= "Ihr score konnte noch nicht berechnet werden. Bitte beantworte Frage" + getAllIndexes(scores, 0);
    //} else {
        finalScore.innerHTML= currentScore;
    //}

});

function calculateChanges() {
    let sum = 0
    scores.forEach(val => {
        if (val != null) {
            sum += parseInt(val)
        }
    });
    return sum
}

// Find all 0s to display which question still needs to be answered
function getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i+1);
    }
    return indexes;
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
/*  Update Pagenumber   */
/*                      */
/************************/

const updatePagenumber = (targetIndex) => {
    const currentPageNumber = document.getElementById('carousel__indicator-pagenumber');
    const index = targetIndex + 1;
    currentPageNumber.innerHTML= index;
};

/************************/
/*                      */
/*  Update Progressbar  */
/*                      */
/************************/

const updateProgressbar = () => {
    let i;
    for (i = 0; i < scores.length; i++) {
        if (scores[i] != null && scores[i] != 0) {
            dots[i].classList.add('carousel__indicator-checked');
        }
    }
};


/************************/
/*                      */
/*       Contact        */
/*                      */
/************************/

const setContactPageStyle = (currentIndex) => {
    const navContent        = document.querySelector(".carousel__nav-content"); // display: none
    const carousel          = document.querySelector(".carousel");
    const arrowLeft         = document.querySelector("#arrow-left");
    const pageNumber        = document.querySelector(".carousel__indicator-pagenumber");

    if(currentIndex === slides.length - 1) {
        console.log(currentIndex, ":\t last page reached.");
        carousel.style.background = "#1A2247";
        navContent.style.background = "#1A2247";
        arrowLeft.src="img/arrow-left-white.svg"
        pageNumber.style.color = "#ffffff"
    }
    else {
        console.log(currentIndex, ":\t not last page");
        carousel.style.background = "#E1F0FF";
        navContent.style.background = "#E1F0FF";
        arrowLeft.src="img/arrow-left.svg"
        pageNumber.style.color = "#5e7aff"
    }
};

/************************/
/*                      */
/*        Swipes        */
/*                      */
/************************/
let hammertime = new Hammer(track);
let swipeLeftIsWorking = true;
let swipeRightIsWorking = false;

hammertime.on("swipeleft", function(ev) {
    if (swipeLeftIsWorking) {
        goRight()
    }
});
hammertime.on("swiperight", function(ev) {
    if (swipeRightIsWorking) {
        goLeft()
    }
});


