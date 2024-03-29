const wordsLongerThanFive = words_data.filter(word => word.length == 5);
const word = wordsLongerThanFive[Math.floor(Math.random() * wordsLongerThanFive.length)];
let guessNo = 0;

function checkWord(guess) {
    let row = $($('.word-row')[guessNo]); //Get row corresponding to guess
    
    const result = Array(5);
    for (let i = 0; i < guess.length; i++) {
        let element = guess.charAt(i);
        let letter = $(row.children()[i]);
        let keyboard_key = $(`[key=${element.toUpperCase()}]`);

        if(word[i] == element) {
            result[i] = '🟩';
            letter.addClass('green');
            keyboard_key.addClass('green');
        } else if(word.includes(element)) {
            result[i] = '🟨';
            letter.addClass('yellow');
            keyboard_key.addClass('yellow');
        } else {
            result[i] = '⬛️';
            letter.addClass('black');
            keyboard_key.addClass('black');
        }
    }

    if(guess == word) {
        console.log("You win!");
        
        triggerModal('win');
        return;
    }

    
    guessNo++;
    console.log(result);
    
    if(guessNo == 6) {
        triggerModal('lose');
        return;
    }
}

function appendLetter(letter) {
    let row = $($('.word-row')[guessNo]); //Get row corresponding to guess
    let emptyChildren = row.children().filter(function() {
        return !$(this).val();
    });
    
    if(emptyChildren.length > 0) {
        emptyChildren.first().val(letter);
    }
}

function deleteLetter() {
    let row = $($('.word-row')[guessNo]); //Get row corresponding to guess
    let childrenWithLetter = row.children().filter(function() {
        return $(this).val();
    });

    if(childrenWithLetter.length > 0) {
        childrenWithLetter.last().val("");
    }
}

function submitAnswer() {
    let row = $($('.word-row')[guessNo]); //Get row corresponding to guess
    let childrenWithLetter = row.children().filter(function() {
        return $(this).val();
    });

    if(childrenWithLetter.length > 0) {
        var guessWord = childrenWithLetter.map(function() {
            return $(this).val();
        }).toArray().join('').toLowerCase();
        checkWord(guessWord);
    }
}

$(document).keyup(function(e) {
    var code = e.keyCode || e.which;
    var letter = String.fromCharCode(code);
    switch (code) {
        case 8: //Delete
            deleteLetter(letter);
            break;
        case 13: //Enter
            submitAnswer();
            break;
        default:
            if((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {//English letter
                appendLetter(letter);
            }
            break;
    }
});

function triggerModal(result) {
    let bodyGraphic = "";
    let bodyText = "";
    let modalTitle = "";

    if(result == 'win') {
        modalTitle = "You win!";
        bodyGraphic = '🎉';
        bodyText = "You win!";
    } else {
        modalTitle = "You lose";
        bodyGraphic = '😕';
        bodyText = `You lose.\nCorrect word was <strong>${word}</strong>`;
    }

    $('#modal-title').text(modalTitle);
    $('.body-graphic').html(bodyGraphic);
    $('.body-text').html(bodyText);
    $('#end-modal').modal('show');
}

$(function() {
    $('.letter').prop('disabled', true);


    $('[data-dismiss=modal]').click(function() {
        $('#end-modal').modal('hide');
    });
});