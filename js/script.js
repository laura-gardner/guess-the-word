//Creating global variobles

const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesDisplay = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia";
const guessedLetterArray = [];

// function to replace letters of word with ● at start of game

const addPlaceholders = function (word) {
    const placeholder = word.split("");
    for (let i=0; i<placeholder.length; i++) {
        placeholder[i] = "●";
    }
    const hiddenWord = placeholder.join("");
    wordInProgress.innerText = hiddenWord;
}; 


// add event listener for click event on guessButton

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = letterInput.value;
    letterInput.value = "";
    message.innerText = "";
    const messageText = validateGuess(guess);
    message.innerText = messageText;

});

// function to check player's input is a valid guess

const validateGuess = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input === "") {
        return "You didn't enter a letter, please try again!"
    } else if (input.length > 1) {
        return "You entered more than one letter, please try again!"
    } else if (!input.match(acceptedLetter)) {
        return "That isn't a valid guess, please try again!"
    } else {return input};
};