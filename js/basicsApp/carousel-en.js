const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

// Initialise and update score once
let scores = [null,0,0,0,null,0,0,0,null,0,0,0,null,0,0,0,null,0,0,0,null,0,0,0];
updateFinalScore()

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
    updateMissedDots(prevIndex);
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
    updateMissedDots(nextIndex);
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
    updateMissedDots(targetIndex);
});

const updateMissedDots = (targetIndex) => {
    console.log("TargetIndex: " + targetIndex);
    let i;
    for (i = 0; i < targetIndex+1; i++) {
        if (scores[i] === 0) {
            dots[i].classList.add('carousel__indicator-missed');
            console.log("updating RED");
        }
    }
}

/************************/
/*                      */
/*        SCORES        */
/*                      */
/************************/

$("#carousel__last-indicator").on('click', function(e) {

    updateFinalScore();

});

$('input:radio').on('click', function(e) {
    let inputRadioClicked = $(e.currentTarget);
    const currentSlide = track.querySelector('.current-slide');
    const currentIndex = slides.findIndex(slide => slide === currentSlide);
    scores[currentIndex] = inputRadioClicked.attr('value');
    updateProgressbar()
    updateMail()

    updateFinalScore()

});

function updateFinalScore() {
    console.log("Update Score")
    // Update final score
    let currentScore = calculateChanges()

    const finalScoreWrapper = document.getElementById('final-score-wrapper');
    const finalScore = document.getElementById('final-score');
    const errorMessage = document.getElementById('error-message');

    if (scores.includes(0)) {
        errorMessage.innerHTML= "Please answer all questions.";

        finalScoreWrapper.classList.add("is-hidden");
        errorMessage.classList.remove("is-hidden");
    } else {
        finalScore.innerHTML= currentScore+"%";
        updateScoreBar(currentScore);
        updateMessage(currentScore);

        finalScoreWrapper.classList.remove("is-hidden");
        errorMessage.classList.add("is-hidden");
    }
}

// Update ScoreBar and progress color
function updateScoreBar(currentScore) {
    const scoreBar = document.getElementById('progress-value');
    scoreBar.style.width = currentScore + "%";

    if (currentScore >= 80) {
        scoreBar.style.background = "#48e5c2";
    } else if (currentScore < 80 && currentScore >= 50) {
        scoreBar.style.background = "#F7CE5B";
    } else {
        scoreBar.style.background = "#cd2254";
    }
}

function updateMessage(currentScore) {
    const statement = document.getElementById('contact__message-statement');
    const msgReinhard = document.getElementById('contact__message-reinhard');
    const msgMartin = document.getElementById('contact__message-martin');

    if (currentScore >= 80) {
        statement.innerHTML = 'Can you effectively implement your systematic approach in your company?';
        msgReinhard.innerHTML = '"Congratulations. You already have a high level of maturity in your decision-making process."' + '<br> &mdash; Reinhard Vanhöfen';
        msgMartin.innerHTML = '"Are you still at your desk? Take the day off!"' + '<br> &mdash; Martin Moog';
    } else if (currentScore < 80 && currentScore >= 60) {
        statement.innerHTML = 'Which strategic situation in your environment calls for a more systematic approach?';
        msgReinhard.innerHTML = '"You proceed systematically and take essential elements into account in the decision-making process."' + '<br> &mdash; Reinhard Vanhöfen';
        msgMartin.innerHTML = '"A solid result with room for improvement."' + '<br> &mdash; Martin Moog';
    }else if (currentScore < 60 && currentScore >= 40) {
        statement.innerHTML = 'What are your urgent strategic fields of action?';
        msgReinhard.innerHTML = '"You´re on the right track, but there potential areas of improvement."' + '<br> &mdash; Reinhard Vanhöfen';
        msgMartin.innerHTML = '"Do you like to approach decisions pragmatically? A little more systematic approach will go a long way."' + '<br> &mdash; Martin Moog';
    } else {
        statement.innerHTML = 'Let´s Talk!';
        msgReinhard.innerHTML = '"Are you making the right decisions? Are you investing in the quality of the decision-making process?"' + '<br> &mdash; Reinhard Vanhöfen';
        msgMartin.innerHTML = '"Is your company successful? Then you intuitively do everything right or you have been very lucky!"' + '<br> &mdash; Martin Moog';
    }
}

function calculateChanges() {
    let sum = 0;
    scores.forEach(val => {
        if (val != null) {
            sum += parseInt(val)
        }
    });
    return Math.round((sum/90)*100);
}

// Find all 0s to display which question still needs to be answered
function getAllIndexes(arr, val) {
    let indexes = [], i = -1;
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
    console.log("updating progress bar");
    let i;
    for (i = 0; i < scores.length; i++) {
        if (scores[i] != null && scores[i] != 0) {
            dots[i].classList.add('carousel__indicator-checked');
            dots[i].classList.remove('carousel__indicator-missed');
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


/************************/
/*                      */
/*       Landing        */
/*                      */
/************************/

const basicsLanding = document.querySelector('.basics__landing');
const basicsLandingButton = document.getElementById('basics__landing-button');

basicsLandingButton.addEventListener('click', e => {
    basicsLanding.classList.add('is-hidden');
});


const basicsButtonText = document.getElementById("basics__landing-button-text");
const basicsLandingInfo = document.getElementById('basics__landing-info');

basicsLandingInfo.addEventListener('click', e => {
    basicsButtonText.innerHTML = "Continue";
    basicsLanding.classList.remove('is-hidden');
});

