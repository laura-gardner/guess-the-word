//Creating global variobles

const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgressDisplay = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesDisplay = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
let word = "magnolia";
let guessedLetterArray = [];
let numGuessesRemaining = 8;

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const index = Math.floor(Math.random() * wordArray.length) + 1;
    word = wordArray[index].trim();
    addPlaceholders(word);
}

getWord();

// function to replace letters of word with ● at start of game

const addPlaceholders = function (word) {
    const placeholder = word.split("");
    for (let i=0; i<placeholder.length; i++) {
        placeholder[i] = "●";
    }
    const hiddenWord = placeholder.join("");
    wordInProgressDisplay.innerText = hiddenWord;
}

// event listener for click event on guessButton

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
    countGuesses(guess);
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
    const wordInProgress = wordArray.join("");
    wordInProgressDisplay.innerText = wordInProgress;
    isGameOver(wordInProgress);
};

// function to count guesses

const countGuesses = function (guess) {
    const wordUpper = word.toUpperCase();
    if (wordUpper.indexOf(guess) === -1) {
        message.innerText = `The word does not include the letter ${guess}`;
        numGuessesRemaining -= 1;
        remainingGuessesDisplay.innerText = `${numGuessesRemaining} guesses`
    } else {message.innerText = `The word does contain the letter ${guess}!`};
    if (numGuessesRemaining === 0) {
        message.innerHTML = `Game over! The word was ${wordUpper}`; 
        remainingGuesses.innerText = `You've run out of guesses.  Game over!`
        startOver();
    } else if (numGuessesRemaining === 1) {
        remainingGuesses.innerText = "You only have one guess remaining!";
    }
};


// function to check whether player has correctly guessed the word

const isGameOver = function (wordInProgress) {
    if (wordInProgress === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You guessed correct the word! Congrats!</p>';
        startOver();
    }
};

// function to show and hide elements in order to start new game

const startOver = function () {
    guessButton.classList.add("hide");
    remainingGuesses.classList.add("hide");
    guessedLetters.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

// event listener for Play Again button

playAgainButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.classList.remove("win");
    message.innerText = "";
    guessedLetters.innerHTML = "";
    numGuessesRemaining = 8;
    guessedLetterArray = [];
    remainingGuesses.innerText = "You have 8 guesses remaining";
    playAgainButton.classList.add("hide");
    guessButton.classList.remove("hide");
    remainingGuesses.classList.remove("hide");
    guessedLetters.classList.remove("hide");
    getWord();
});