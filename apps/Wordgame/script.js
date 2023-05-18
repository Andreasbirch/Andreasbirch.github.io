const board = [];
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const gridContainer = document.getElementsByClassName("grid-container")[0]
const input = document.getElementById("input");
const guess = [];

$(function(){
    generateBoard();
    printBoard();
    drawBoard();
    input.addEventListener('input', checkInput);
});

function drawBoard() {
    gridContainer.innerHTML = "";
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            gridContainer.appendChild(board[i][j].draw());
        }
    }
}

let startLetters = [];
function checkInput(a) {
    data = a.target.value.toUpperCase();
    console.log(data);

    //Clear highlights
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            board[i][j].ismatching = false;
        }
    }

    if(data.length == 0)
        startLetters = [];
    //Accept any first input
    if(data.length == 1) {
        startLetters = [];
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if(board[i][j].char == data[0]) {
                    board[i][j].ismatching = true;
                    startLetters.push(board[i][j]);
                }
            }
        }
    } else { //Mark only words where all letters are neighbours
        paths = [];
        startLetters.forEach(startLetter => {
            pathForLetter = isWordConstructibleGøgl(data, startLetter);
            paths.push(pathForLetter);
        });
        paths.forEach(path => {
            if(path.length > 0) {
                path.forEach(subPath => {
                    if(subPath.length > 0) {
                        subPath.forEach(elem => {
                            elem.ismatching = true;
                        })
                    }
                });
            }
        })
        console.log(paths);
    }

    
    
    drawBoard();
}

//TODO - kig på at få neighbours til at virke med letters, ikke row/col
//Neighbours skal også inkludere diagonaler
//Få returrespons?
  function isWordConstructibleGøgl(word, letter) {
    const queue = []; // Queue for BFS
    const visited = new Set(); // Set to track visited positions
    const paths = []; // Array to store all valid paths
  
    // Enqueue the starting position with an empty path
    queue.push({ row: letter.row, column: letter.col, index: 0, path: [] });
  
    while (queue.length > 0) {
      const { row, column, index, path } = queue.shift();
  
      // Check if the current position is valid and the letter matches
      if (
        row >= 0 &&
        row < 5 &&
        column >= 0 &&
        column < 5 &&
        board[row][column].char === word[index] &&
        !visited.has(`${row},${column}`)
      ) {
        visited.add(`${row},${column}`);
  
        // Check if the entire word has been constructed
        if (index === word.length - 1) {
          paths.push([...path, board[row][column]]); // Add the valid path to the paths array
        }
  
        // Enqueue the neighboring positions with the updated path
        const neighbors = [
          { row: row - 1, column: column }, // Top
          { row: row + 1, column: column }, // Bottom
          { row: row, column: column - 1 }, // Left
          { row: row, column: column + 1 }, // Right
        ];
  
        for (const neighbor of neighbors) {
          const { row: nRow, column: nColumn } = neighbor;
          const nextIndex = index + 1;
  
          if (
            nRow >= 0 &&
            nRow < 5 &&
            nColumn >= 0 &&
            nColumn < 5 &&
            !visited.has(`${nRow},${nColumn}`)
          ) {
            const nextPath = [...path, board[row][column]];
            queue.push({ row: nRow, column: nColumn, index: nextIndex, path: nextPath });
          }
        }
      }
    }
  
    return paths; // Return all valid paths
  }
  
  
  


class Letter {
    constructor(char, row, col) {
        this.char = char;
        this.row = row;
        this.col = col;
        this.ismatching = false;
    }

    draw() {
        let elem = document.createElement('div');
        elem.classList.add("grid-element");
        elem.id = `${this.row}-${this.col}`;
        elem.innerText = this.char;
        elem.classList.remove("matching");
        if(this.ismatching) {
            elem.classList.add("matching");
        }
        return elem;
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
            row.push(new Letter(char, i, j));
        }
        board.push(row);
    }
}

function printBoard() {
    printBoard = [];
    for (let i = 0; i < 5; i++) {
        let row = [];
        for (let j = 0; j < 5; j++) {
            row.push(board[i][j].char);
        }
        printBoard.push(row);
    }
    console.table(printBoard);
}

function checkWord(guessWord) {
    for (let i = 0; i < guessWord.length-1; i++) {
        let letter = guessWord[i];
        if(!areNeighbors(letter, guessWord[i+1])){
            return false;
        }
    }
    let word = guessWord.map(function(elem) {
        return elem.char;
    }).join('').toLowerCase();
    console.log(word);
    return words_dict[word] == 1;
}

// const areNeighbors = (coord1, coord2) => Math.abs(coord1.x - coord2.x) <= 1 && Math.abs(coord1.y - coord2.y) <= 1 && Math.abs(coord1.x - coord2.x) + Math.abs(coord1.y - coord2.y) !== 0;
function areNeighbors(coord1, coord2) {
    const xDiff = Math.abs(coord1.x - coord2.x);
    const yDiff = Math.abs(coord1.y - coord2.y);
  
    return xDiff <= 1 && yDiff <= 1 && xDiff + yDiff !== 0;
  }

  

// function isWordConstructible(word, letter, index = 0, visited = []) {
//     // Base case: All letters of the word have been matched
//     if (index === word.length) {
//         return visited.slice(); // Return a copy of the visited path
//     }

//     // Check if the current position is valid and the letter matches
//     if (
//         letter.char === word[index] &&
//         !visited.includes(letter)
//     ) {
//         // Mark the current letter as visited
//         visited.push(letter);

//         // Check if the remaining part of the word can be constructed by the neighbors
//         const neighbors = [];
//         for (drow = Math.max(0, letter.row-1); drow <= Math.min(board.length-1, letter.row+1); ++drow) {
//             for (dcol = Math.max(0, letter.col-1); dcol <= Math.min(board[drow].length-1, letter.col+1); ++dcol) {
//                 neighbors.push(board[drow][dcol]);
//             }
//         }

//         for (const neighbor of neighbors) {
//         const path = isWordConstructible(
//             word,
//             neighbor,
//             index + 1,
//             visited
//         );

//         if (path) {
//             return path; // Return the constructed path
//         }
//         }

//         // If the word cannot be continued from any neighbor, return the current letter
//         return letter;
//     }

//     return null;
// }