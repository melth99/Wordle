// API
// use localhost:5500
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
let tryValues = {};
let tryNum = 1;
let pokeAnswer = '';
let answerLength
let pokeSplit
let animeIM
let nowTry = '';
const inputElement = document.querySelector('input')
// const tryEl = document.createElement('li');
const tryUl = document.querySelector('#attempts')
let win = null
let replay
const baseURL = "https://pokeapi.co/api/v2/"

const h3El = document.querySelector('#how-many')
const typeEl = document.querySelector("#typing")
const redoEl =  document.querySelector('#redo')
const h1El = document.querySelector('h1')



function clickHandler(event) {
    const clicked = event.target;
    if (clicked.classList.contains('key--letter')) {
        const cletter = clicked.getAttribute('data-char');
        updateTryValue(cletter);
    }
}

function keydownHandler(e) {
    if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
        updateTryValue(e.key.toUpperCase());
    } else if (e.key === 'Enter' || e.key === 'Backspace') {
        if (win === null) {
            updateTryValue(e.key);
        } else {
            startAgain();
        }
    }
}
//made event listeners functions to allow replay-ability

    /*
    if (e.key == 'Enter' && win === true || win === false)
        gameOver(e.key)
    */
document.addEventListener('click', clickHandler);
document.addEventListener('keydown', keydownHandler);
selectPokemon()

function fetchPokeData(pokedexNum) {
    // helpful vid https://www.youtube.com/watch?v=zOrejGF0oBA&ab_channel=GuilhermeDatilio  
    fetch(baseURL + 'pokemon?limit=493')
        .then(response => response.json())
        .then(data => {
            console.log(data)

        })
        .catch(error => {
            console.error('Error', error)
        })

    fetch(baseURL + `pokemon/${pokedexNum}`)
        .then(response => response.json())
        .then(data => {
            console.log('pokemon data', data) // all data on answer pokemon
            if (data.name) {
                pokeAnswer = data.name.toUpperCase()
                if (/^[a-zA-Z]+$/.test(pokeAnswer)) { //excludes pokemon with punctuation
                    answerLength = pokeAnswer.length
                    console.log(pokeAnswer, answerLength)
                    h3El.innerText = `Only ${answerLength} guesses to beat Team Rocket!`
                } else {
                    console.log('pokemon with punctuation selected, one moment')
                    startAgain()
                }
            }
            else {
                console.log('Issue getting pokeAnswer from json')
            }

        })
        .catch(error => {
            console.log('Error retrieving pokemon name from pokeAPI', error)
        })




}
function tryNowDisplay(nowTry){
    typeEl.textContent = nowTry

}

function selectPokemon() {
    pokedexNum = Math.floor(Math.random() * (494 - 1) + 1)
    //pokedexNum = 250 // testing ho-oh pokemon to exclude pokemon with punctuation
    console.log(pokedexNum)
    fetchPokeData(pokedexNum)


}

function startAgain(letter) {
    //should trigger if player wants to replay or if pokemon selected as a punctuation
    tryValues = {};
    tryNum = 1;
    nowTry = '';
    win = null;

    // Clear the board
    tryUl.innerHTML = '';
    typeEl.textContent = '';

  
    document.querySelectorAll('.key--letter').forEach(key => {
        key.style.backgroundColor = '';
    });

    // re-selects
    selectPokemon();


    document.addEventListener('keydown', keydownHandler);
    document.addEventListener('click', clickHandler);
}

// add enter button click functionality later

//i want to be able to go to 5 letters and then the user MUST click enter to mark it as an attempt
//add delete functionality later
// if 6th letter press return error
function updateTryValue(letter) {
    if (tryNum <= answerLength && win === null) {
        if (letter.match(/[a-zA-X]/i) && nowTry.length < answerLength && letter != 'Backspace' && letter != 'Enter') {
            nowTry += letter
            console.log('updated in line 81 ')
            console.log(nowTry)
            tryNowDisplay(nowTry)
        }
        else if (letter.match(/[a-zA-X]/i) && nowTry.length >= answerLength && letter != 'Backspace' && letter != 'Enter') {
            console.log('you must press enter or backspace. That letter was not recorded')
            console.log(nowTry)

        }

        else if (letter === 'Enter') {
            if (nowTry.length != answerLength) {
                console.log(`We still need ${answerLength} letters total entered to catch them all! `)
                h3El.textContent = `We still need ${answerLength} letters total entered to catch them all! `
                console.log()
            }
            else if (nowTry.length === answerLength) {
                if (nowTry === pokeAnswer) {
                    win = true
                    tryNowDisplay(nowTry)
                    gameOver(true) // need to add variable later
                    return
                }
                tryValues[tryNum] = nowTry
                logTry()
                tryNum += 1 // moving to next try
                nowTry = '' //clearing for next try
                console.log(`cleared nowTry and we are now on try# ${tryNum}`)
                console.log(tryValues)
                tryNowDisplay('')
            }



        } else if (letter = 'Backspace') {
            nowTry = nowTry.slice(0, -1)
            console.log(`Deleted! your current is ${nowTry}!\n to be the very best try again!`)
            tryNowDisplay(nowTry)
        }
    }
    if (tryNum > answerLength) {
        win = false
        gameOver(false)
        return;
    }
}

//
function logTry() { // adding elements in unordered list HTML
    console.log('logTry')
    let splitTry = tryValues[tryNum].split("") // creates list of word (B,I,N,G,O)
    console.log(tryValues[tryNum])
    console.log(splitTry)
    let tryLiEl = document.createElement('li')
    tryLiEl.id = (`try-${tryNum}`)
    // tryEl = splitTry
    //tryEl.value = splitTry //updates list as each turn
    //spanLetter = tryEl.appendChild(document.createTextNode('span'+""))
    // creating a span of each letter to alter color in hints()
    for (let i = 0; i < splitTry.length; i++) { // for each letter not try
        let charSpan = document.createElement('span')
        console.log('loop run! 1 letter span!')
        tryLiEl.appendChild(charSpan)
        charSpan.textContent = splitTry[i]
        charSpan.className = ("char-colorbox")
        charSpan.id = (`try${tryNum}-char-${i}`)


        // split up tring, created li for each element in loop, and appened child with ul

        // queryselector needs to be a step above what im creating so Ul NOT LI or span
    }
    tryUl.appendChild(tryLiEl)
    tryColorHints(splitTry, tryLiEl,tryNum)
    //tryHints()

}



function tryColorHints(splitTry, tryLiEl, tryNum) {
   
    pokeSplit = pokeAnswer.split('')
    const letterCount = {}
    const guessCount = {}
    pokeSplit.forEach(letter => {
        letterCount[letter] = (letterCount[letter] || 0) + 1;
    });

    for (let i = 0; i < answerLength; i++) {
        guessCount[splitTry[i]] = guessCount[splitTry[i] || 0] +1
        let currentSpan = tryLiEl.querySelector(`#try${tryNum}-char-${i}`)
        let keyEl = document.querySelector(`.key--letter[data-char="${splitTry[i]}"`)
        if (currentSpan) {
            if (pokeSplit.includes(splitTry[i]) && pokeSplit[i] === splitTry[i]) {
                console.log('COLOR HINT: G')
                currentSpan.style.backgroundColor = 'green'
                keyEl.style.backgroundColor = 'green'
                //counting back to make sure its 0 in letterCount
                // i want letter count to all be 0s end of loop
                letterCount[i] -= 1
            }
            else if (pokeSplit.includes(splitTry[i]) && pokeSplit[i] !== splitTry[i]) {
                //yellow
                console.log('COLOR HINT: Y')
                currentSpan.style.backgroundColor = 'yellow'
                keyEl.style.backgroundColor = 'yellow'
            }

            else { // letter is not in pokeAnswer
                //grey
                console.log('COLOR HINT: Grey')
                currentSpan.style.backgroundColor = 'grey'
                keyEl.style.backgroundColor = 'grey'

            }
        }
        else {
            console.log(`Span not found for try${tryNum}-char-${i}`)
        }
    }





}

function gameOver() { // update after pokemon api integration

    console.log('game over!')


    if (win) {
        animeIM = `pika pika winner!\n I CHOOSE YOU ${pokeAnswer}`
        console.log('pika pika WINNER!')
        console.log(`I CHOOSE YOU ${pokeAnswer}`)
    }
    else {
        console.log('you didnt catch them all :/')
        animeIM = `you didn't catch them all :/ \n Team Rocket won :(\n the answer is ${pokeAnswer})`
    }
    h3El.textContent = ("Play Again?\n Press Enter!")
    console.log("Would you like to play again? To be the very best, you must try again and again!! It took ash 25  years to become a pokemon master")
    typeEl.style.fontSize = '1em'
    typeEl.style.color = 'black'
    typeEl.textContent = "Prepare for trouble, and make it double! We let's start again!"
    typeEl.style.webkitTextStrokeColor = "white"
    typeEl.style.webkitTextStrokeWidth = ".5px"
    typeEl.style.letterSpacing = '0px'
    typeEl.style.fontFamily = 'Pokemon Solid, sans-serif'
    console.log(typeEl)
    console.log("to play again ! press enter")

    gameOverAnime(animeIM)

    // lets not let more inputs mess this up anymore!
    document.removeEventListener('keydown', keydownHandler);
    document.removeEventListener('click', clickHandler);

    document.addEventListener('keydown', function restartHandler(e) {
        if (e.key === 'Enter') {

            startAgain();
            document.removeEventListener('keydown', restartHandler);
        }})
}

function gameOverAnime() {
    if (win){
        h1El.textContent = `We caught ${pokeAnswer}!`
        h1El.letterSpacing = '50px'
    }
    else
        h1El.textContent = "Team Rocket Wins!"
    

    }
    /*
    let width = 1
    let height = 1
let winCheer = document.createElement('div')
    let finalbowEl = document.getElementById('final-bow')
    let pokePic = document.createElement('img')
    pokePic.style.width = '100%'
    pokePic.style.height = '100%'

    if (win) {
        console.log('win')
        pokePic.src = "https://media1.tenor.com/m/Fxz_yZNQkbcAAAAC/team-rocket-pokemon.gif";
    }
    else {
        pokePic.src = "https://media1.tenor.com/m/Fxz_yZNQkbcAAAAC/team-rocket-pokemon.gif";
    }
    finalbowEl.appendChild(winCheer)
    finalbowEl.appendChild(pokePic)
    winCheer.innerText = animeIM
    winCheer.style.width += width + "px"
    winCheer.style.height += height + "px"
    winCheer.style.backgroundColor = 'magenta'
    winCheer.style.overflow = 'hidden' // stops text from going beyond page
    const growCheer = setInterval(() => {
        width += 1
        height += 1
        winCheer.style.width = width + "px"
        winCheer.style.height = height + "px"
        pokePic.style.transform = 'scale(1.5)'

        if (width >= 200) {
            clearInterval(growCheer)
        }
    })
}
*/