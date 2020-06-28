console.log("score loaded");


let score = 0;
let input = 0;

let item = {
    question: "",
    value: score
}


//let choices = Array.from(document.querySelector('.choice'));


$('input:radio').on('click', function(e) {
    let inputRadioClicked = $(e.currentTarget);
    calculateChanges();
    console.log('inputName='+inputRadioClicked.attr('name') + ' inputValue='+ inputRadioClicked.attr('value'));
});

function calculateChanges() {

    score = 0;

    let v= $('input[type=radio].choice:checked');
    $(v).each(function(i){
        score += parseInt($(this).val());
    });

    console.log(score);
}

/*
$(document).ready(function(e) {

    // Initial score/points
    var score = calculateChanges()
    $("#score").html(score);

    var inputs = $('input');

    inputs.each(function(i) {
        $(this).on('click', function() {
            score = calculateChanges()

            $("#score").html(score);

        })
    })
});



*/

