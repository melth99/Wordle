
let tryValues = {};
let tryNum = 1;
let pokeAnswer = '';
let answerLength
let pokeSplit
let animeIM
let nowTry = '';
const inputElement = document.querySelector('input')
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

document.addEventListener('click', clickHandler);
document.addEventListener('keydown', keydownHandler);
selectPokemon()

function fetchPokeData(pokedexNum) {
   
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
            console.log('pokemon data', data) 
            if (data.name) {
                pokeAnswer = data.name.toUpperCase()
                if (/^[a-zA-Z]+$/.test(pokeAnswer)) { 
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
   
    console.log(pokedexNum)
    fetchPokeData(pokedexNum)


}

function startAgain(letter) {
   
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
            console.log('updated in line 81 ')
            console.log(nowTry)
            tryNowDisplay(nowTry)
        }
        else if (letter.match(/[a-zA-X]/i) && nowTry.length >= answerLength && letter != 'Backspace' && letter != 'Enter') {
            h3El.textContent = `You can only have ${answerLength} letters in an entry. Please press enter or delete`
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
                    gameOver(true)
                    return
                }
                tryValues[tryNum] = nowTry
                h3El.innerText = `Only ${answerLength} guesses to beat Team Rocket!`
                logTry()
                tryNum += 1
                nowTry = ''
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

function logTry() { 
    console.log('logTry')
    let splitTry = tryValues[tryNum].split("")
    console.log(tryValues[tryNum])
    console.log(splitTry)
    let tryLiEl = document.createElement('li')
    tryLiEl.id = (`try-${tryNum}`)

    for (let i = 0; i < splitTry.length; i++) { 
        let charSpan = document.createElement('span')
        console.log('loop run! 1 letter span!')
        tryLiEl.appendChild(charSpan)
        charSpan.textContent = splitTry[i]
        charSpan.className = ("char-colorbox")
        charSpan.id = (`try${tryNum}-char-${i}`)
    }
    tryUl.appendChild(tryLiEl)
    tryColorHints(splitTry, tryLiEl,tryNum)

}



function tryColorHints(splitTry, tryLiEl, tryNum) {
    console.log('colorhint')
   
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
                letterCount[i] -= 1
            }
            else if (pokeSplit.includes(splitTry[i]) && pokeSplit[i] !== splitTry[i]) {

                console.log('COLOR HINT: Y')
                currentSpan.style.backgroundColor = 'yellow'
                keyEl.style.backgroundColor = 'yellow'
            }

            else { 
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

function gameOver() { 

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
    