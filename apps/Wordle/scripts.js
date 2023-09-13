const wordsLongerThanFive = words_data.filter(word => word.length == 5);
const word = wordsLongerThanFive[Math.floor(Math.random() * wordsLongerThanFive.length)];
let guessNo = 0;


function checkWord(guess) {
    guessNo++;

    if(guess == word) {
        console.log("You win!");
        return;
    }

    const result = Array(5);
    for (let i = 0; i < guess.length; i++) {
        let element = guess.charAt(i);
        if(word[i] == element) {
            result[i] = '🟩';
        } else if(word.includes(element)) {
            result[i] = '🟨';
        } else {
            result[i] = '⬛️';
        }
    }
    console.log(result);
}

// console.log(word);