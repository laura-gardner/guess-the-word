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
}
addPlaceholders(word);

// add event listener for click event on guessButton

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = letterInput.value;
    letterInput.value = "";
    message.innerText = "";
    const validatedGuess = validateGuess(guess);
    if (validatedGuess) {
        makeGuess(validatedGuess)
    }
    updateWordInProgress(guessedLetterArray);

});

// function to check player's input is a valid guess

const validateGuess = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input === "") {
        message.innerText = "You didn't enter a letter, please try again!"
    } else if (input.length > 1) {
        message.innerText = "You entered more than one letter, please try again!"
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "That isn't a valid guess, please try again!"
    } else {return input};
};

// function to capture input

const makeGuess = function (letter) {
    const guess = letter.toUpperCase();
    if (guessedLetterArray.includes(guess)) {
        message.innerText = "You've already guessed that letter, please try again!"
    } else {
        guessedLetterArray.push(guess)
        showGuessedLetters(guessedLetterArray);
    }
    console.log(guessedLetterArray)
};

// function to show the guessed letters 

const showGuessedLetters = function (guessedLetterArray) {
    guessedLetters.innerHTML = "";
    for (let letter of guessedLetterArray) {
        const li = document.createElement('li');
        li.innerText = letter;
        guessedLetters.append(li);
    }
};

// function to update the word in progress

const updateWordInProgress = function (guessedLetterArray) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    wordArray.forEach (function (letter, index) {
        if (!guessedLetterArray.includes(letter)) {
            wordArray.splice(index, 1, "●")
        };
    }); 
    wordInProgress.innerText = wordArray.join("");
};

