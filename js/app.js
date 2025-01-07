// API

// html design with alphabet keyboard
// https://www.geeksforgeeks.org/build-a-virtual-keyboard-using-html-css-javascript/

//---------------------------------------------

// Use API key to access pokemon data base organize pokemon by # of letters - ig
// reference - https://www.thegamer.com/pokemon-longest-shortest-names-pokedex/
//ignore outliers letter counts
// determine number of blocks /spaces from the length of the answer (centered using flex)



// use fetch

// Starting screen - waits for use to click "Start Button"
//random pokemon selected from pokedex api - not shown to user
// screen changes to a number of blocks equaling the length of the selected pokemon name
// with keyboard below
//keys to lightup on keyboard and be placed in display regardless if user clicks or presses key
//UI interaction + display
//if letter is in correct place - highlight green on keyboard and present in display
// if letter is in the word, but in wrong spot - highlight letter yellow on keyboard
// if letter isnt in the word
// iff they run out of tries (5 wrong attempts) they lose
// show their past attempts on the side in a box labeled "attempts"
///////////////////////////////////
//win example
//screen changes to "winn!"
// show an small image of that pokemon with fireworks annimation
//////////////////////////////////
//loss
// screen changes to "lost" and reveals pokemon name and image

//Event Listeners

//variables
const tryValues = {};
let tryNum = 1;
let pokeAnswer = 'bingo';
let nowTry = '';
const inputElement = document.querySelector('input')



document.addEventListener('click', function(event){
    const clicked = event.target
    if (clicked.classList.contains('key--letter')) {
        const letter = clicked.getAttribute('data-char');
        console.log('Clicked letter:', letter);
        updateTryValue(letter)
    }})

function fetchPokeName (){
// helpful vid https://www.youtube.com/watch?v=zOrejGF0oBA&ab_channel=GuilhermeDatilio  

}

// add enter key functionality later
function updateTryValue(letter){

    if (letter && nowTry.length < 5 && tryNum <=5){
        nowTry += letter
        console.log(nowTry)
        
    }
    else if (letter && nowTry.length >= 5 && tryNum <=5){
        if (nowTry === pokeAnswer){


        }
        tryValues[tryNum] = nowTry // adding to tryValues dict
        tryNum += 1 // moving to next try
        nowTry = '' //clearing for next try
        nowTry += letter
        console.log(`cleared nowTry and we are now on try# ${tryNum}`)
        console.log(tryValues)
    }
    else if (tryNum > 5){
        gameOver() // ends game and determines winner
    }
}
function updateTryVisual(){

}

function updateTryNowVisual(){
    
}

function UpdateAllTriesVisual(){

}

function gameOver(){

    gameOverAnimation()
}

function gameOverAnimation(){

}

