$('path').on('click', function(e) {
    let countryCode = $(e.target).attr('id');
    guessesForCountry++;
    
    if(!gameStarted) {
        stopwatch.start();
        gameStarted = true;
    }

    if(countryCode == country) {
        correctGuesses++;
        console.log("Correct");
        
        //Set background color
        $(e.target).css('fill', guessesForCountry == 1 ? 'white' : 'yellow');

        if(remainingCountries.length == 0) {
            console.log("You win!");
        } else {
            country = getCountry();
        }
    } else {
        incorrectGuesses++;
        console.log("Incorrect");
    }
    accuracy = (correctGuesses/(incorrectGuesses+correctGuesses)) * 100;
    $('#accuracy').text(accuracy);
});

let stopwatch = new Stopwatch("stopwatch");

let guessesForCountry = 0;
let correctGuesses = 0;
let incorrectGuesses = 0;
let accuracy = 0;
let gameStarted = false;

let remainingCountries = shuffle(Object.keys(countries));
var country = "";

//Start script
$(function() {
    country = getCountry();
    
    console.log(country);
})

const getCountry = () => {
    guessesForCountry = 0;
    let newCountry = remainingCountries.pop();
    $('#target-country').text(countries[newCountry]);
    console.log("New country is: ", newCountry);
    return newCountry;
}



function endGame() {

}

function shuffle(array) {
    //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }