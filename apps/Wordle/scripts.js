const wordsLongerThanFive = words_data.filter(word => word.length == 5);
const word = wordsLongerThanFive[Math.floor(Math.random() * wordsLongerThanFive.length)];
let guessNo = 0;

function checkWord(guess) {
    let row = $($('.word-row')[guessNo]); //Get row corresponding to guess
    
    const result = Array(5);
    for (let i = 0; i < guess.length; i++) {
        let element = guess.charAt(i);
        let letter = $(row.children()[i]);
        if(word[i] == element) {
            result[i] = '🟩';
            letter.addClass('green');
        } else if(word.includes(element)) {
            result[i] = '🟨';
            letter.addClass('yellow');
        } else {
            result[i] = '⬛️';
            letter.addClass('black');
        }
    }

    if(guess == word) {
        console.log("You win!");
        return;
    }

    guessNo++;
    console.log(result);
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

function deleteLetter(letter) {
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
