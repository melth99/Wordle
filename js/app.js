let tryValues = {};
let tryNum = 1;
let pokeAnswer = '';
let answerLength
let pokeSplit
let nowTry = '';
const tryUl = document.querySelector('#attempts')
let win = null
const baseURL = "https://pokeapi.co/api/v2/"
const h3El = document.querySelector('#how-many')
const typeEl = document.querySelector("#typing")
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

document.addEventListener('click', clickHandler);
document.addEventListener('keydown', keydownHandler);
selectPokemon()

function fetchPokeData(pokedexNum) {
   
    fetch(baseURL + 'pokemon?limit=493')
        .then(response => response.json())
        .then(data => {
            h3El.textContent = "Pokemon Data Populated GEN1-IV"

        })
        .catch(error => {
            h3El.textContent = `Error:${error}`
        })

    fetch(baseURL + `pokemon/${pokedexNum}`)
        .then(response => response.json())
        .then(data => {
            h3El.textContent = "Pokemon Name Data Populated!"
            if (data.name) {
                pokeAnswer = data.name.toUpperCase()
                if (/^[a-zA-Z]+$/.test(pokeAnswer)) { 
                    answerLength = pokeAnswer.length
                    h3El.textContent = `Only ${answerLength} guesses to beat Team Rocket!`
                } else {
                    startAgain()
                }
            }
            else {
                h3El.textContent = 'Issue getting pokeAnswer from json'
            }

        })
        .catch(error => {
            h3El.textContent('Error retrieving pokemon name from pokeAPI', error)
        })




}
function tryNowDisplay(nowTry){
    typeEl.textContent = nowTry

}

function selectPokemon() {
    pokedexNum = Math.floor(Math.random() * (494 - 1) + 1)
    fetchPokeData(pokedexNum)


}

function startAgain() {
   
    tryValues = {};
    tryNum = 1;
    nowTry = '';
    win = null;


    h1El.textContent = "Who's that Pokemon!"
    tryUl.innerHTML = '';

    typeEl.style.fontSize = '';
    typeEl.style.color = '';
    typeEl.textContent = '';
    typeEl.style.webkitTextStrokeColor = '';
    typeEl.style.webkitTextStrokeWidth = '';
    typeEl.style.letterSpacing = '';
    typeEl.style.fontFamily = '';
    h3El.textContent = '';
  
    document.querySelectorAll('.key--letter').forEach(key => {
        key.style.backgroundColor = '';

    });

    selectPokemon();


    document.addEventListener('keydown', keydownHandler);
    document.addEventListener('click', clickHandler);
}

function updateTryValue(letter) {
    if (tryNum <= answerLength && win === null) {
        if (letter.match(/[a-zA-X]/i) && nowTry.length < answerLength && letter != 'Backspace' && letter != 'Enter') {
            nowTry += letter
            tryNowDisplay(nowTry)
        }
        else if (letter.match(/[a-zA-X]/i) && nowTry.length >= answerLength && letter != 'Backspace' && letter != 'Enter') {
            h3El.textContent = `You can only have ${answerLength} letters in an entry. Please press enter or delete`

        }

        else if (letter === 'Enter') {
            if (nowTry.length != answerLength) {
                h3El.textContent = `We still need ${answerLength} letters total entered to catch them all! `
            }
            else if (nowTry.length === answerLength) {
                if (nowTry === pokeAnswer) {
                    win = true
                    tryNowDisplay(nowTry)
                    gameOver(true)
                    return
                }
                tryValues[tryNum] = nowTry
                h3El.innerText = `Only ${answerLength} guesses to beat Team Rocket!`
                logTry()
                tryNum += 1
                nowTry = ''
                tryNowDisplay('')
            }



        } else if (letter = 'Backspace') {
            nowTry = nowTry.slice(0, -1)
            tryNowDisplay(nowTry)
        }
    }
    if (tryNum > answerLength) {
        win = false
        gameOver(false)
        return;
    }
}

function logTry() { 
    let splitTry = tryValues[tryNum].split("")
    let tryLiEl = document.createElement('li')
    tryLiEl.id = (`try-${tryNum}`)

    for (let i = 0; i < splitTry.length; i++) { 
        let charSpan = document.createElement('span')
        tryLiEl.appendChild(charSpan)
        charSpan.textContent = splitTry[i]
        charSpan.className = ("char-colorbox")
        charSpan.id = (`try${tryNum}-char-${i}`)
    }
    tryUl.appendChild(tryLiEl)
    tryColorHints(splitTry, tryLiEl,tryNum)

}

function tryColorHints(splitTry, tryLiEl, tryNum) {
    pokeSplit = pokeAnswer.split('');
    for (let i = 0; i < answerLength; i++) {
        let currentSpan = tryLiEl.querySelector(`#try${tryNum}-char-${i}`);
        let keyEl = document.querySelector(`.key--letter[data-char="${splitTry[i]}"]`);
        if (currentSpan) {
            if (splitTry[i] === pokeSplit[i]) {
                currentSpan.style.backgroundColor = 'green';
                keyEl.style.backgroundColor = 'green';
            } else if (pokeSplit.includes(splitTry[i])) {
                currentSpan.style.backgroundColor = 'yellow';
                keyEl.style.backgroundColor = 'yellow';
            } else {
                currentSpan.style.backgroundColor = 'grey';
                keyEl.style.backgroundColor = 'grey';
            }
        } else {
            h3El.textContent = `Span not found for try${tryNum}-char-${i}`;
        }
    }
}


function gameOver() { 

    h3El.textContent = ("Play Again?\n Press Enter!")
    typeEl.style.fontSize = '1em'
    typeEl.style.color = 'black'
    typeEl.textContent = "Prepare for trouble, and make it double! We let's start again!"
    typeEl.style.webkitTextStrokeColor = "white"
    typeEl.style.webkitTextStrokeWidth = ".5px"
    typeEl.style.letterSpacing = '0px'
    typeEl.style.fontFamily = 'Pokemon Solid, sans-serif'


    gameOverAnime()

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
        h1El.textContent = `Team Rocket Wins! ${pokeAnswer}`
    

    }
    