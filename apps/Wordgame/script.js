const board = [];
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

$(function(){
    generateBoard();
});

class Letter {
    constructor(char, x, y) {
        this.char = char;
        this.x = x;
        this.y = y;
    }
}

//TODO: Better generation of characters.
//Should bias towards often used letters
function generateBoard() {
    for (let i = 0; i < 5; i++) {
        let row = [];
        for (let j = 0; j < 5; j++) {
            //Get random character from the alphabet
            let char = alphabet.charAt(Math.floor(Math.random() * alphabet.length))
            row.push(new Letter(char, j, i));
        }
        board.push(row);
    }
}


function checkWord(guessWord) {
    for (let i = 0; i < guessWord.length; i++) {
        let letter = guessWord[i];
        
        //Calculate distance between two letters
        if(Math.abs(guessWord[i] - guessWord[i+1]) > 0) {

        }
    }
}