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
let pokeAnswer = 'BINGO'; //keeping everything uppercase for simplicity
let pokeSplit = pokeAnswer.split("")
let nowTry = '';
const inputElement = document.querySelector('input')
// const tryEl = document.createElement('li');
const tryUl = document.querySelector('#attempts')
let win 
let replay





// add typing functionality at some point
document.addEventListener('click', function(event){
    const clicked = event.target
    if (clicked.classList.contains('key--letter')) {
        const cletter = clicked.getAttribute('data-char');
        console.log('Clicked letter:', cletter);
        updateTryValue(cletter)
    }})
document.addEventListener('keydown',function(e) { 
    if (e.key.length === 1 && e.key.match(/[a-z]/i)){
      updateTryValue(e.key.toUpperCase())
    }else if (e.key === 'Enter' || e.key === 'Backspace'){
        updateTryValue(e.key)
    }
    /*
    if (e.key == 'Enter' && win === true || win === false)
        gameOver(e.key)
    */
 } )

function fetchPokeName (){
// helpful vid https://www.youtube.com/watch?v=zOrejGF0oBA&ab_channel=GuilhermeDatilio  
 
}

function startAgain (letter){
    console.log('start again f(x) triggered to signal new turn')
    updateTryValue(letter)
}

// add enter button click functionality later

//i want to be able to go to 5 letters and then the user MUST click enter to mark it as an attempt
//add delete functionality later
// if 6th letter press return error
function updateTryValue(letter){
    if (tryNum <= 5){
        if (letter.match(/[a-zA-X]/i) && nowTry.length < 5 && letter != 'Backspace' && letter != 'Enter'){
            nowTry += letter
            console.log('updated in line 81 ')
            console.log(nowTry)
    }
        else if (letter.match(/[a-zA-X]/i) && nowTry.length >= 5 && letter != 'Backspace' && letter != 'Enter'){
            console.log('you must press enter or backspace. That letter was not recorded')
            console.log(nowTry)

        }
    
    else if (letter === 'Enter'){
  
            if (nowTry.length != 5 ){
                console.log("We still need 5 letters entered to catch them all! ")
                console.log()
            }
            else if (nowTry.length === 5){
                if (nowTry === pokeAnswer){
                    win = true
                    gameOver(win) // need to add variable alter
                    return
                }
                tryValues[tryNum] = nowTry
                logTry()
                tryNum += 1 // moving to next try
                nowTry = '' //clearing for next try
                console.log(`cleared nowTry and we are now on try# ${tryNum}`)
                console.log(tryValues)
            }
        
        

    }else if (letter = 'Backspace'){
            nowTry = nowTry.slice(0,-1)
            console.log(`Deleted! your current is ${nowTry}!\n to be the very best try again!`)
    }} 
    if (tryNum > 5) {
        win = false
        gameOver(win)
        return;
}}

//
function logTry(){ // adding elements in unordered list HTML
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
    for (let i = 0 ;i < splitTry.length ; i++){ // for each letter not try
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
    tryColorHints(splitTry,tryLiEl)
    //tryHints()

}

function updateTryNowVisual(){
    pass
}

function tryColorHints(splitTry,tryLiEl){
    
    for (let i=0; i < pokeSplit.length; i++){
    let currentSpan = tryLiEl.querySelector(`#try${tryNum}-char-${i}`)
    if (currentSpan){
        if (pokeSplit.includes(splitTry[i]) && pokeSplit[i]=== splitTry[i]){
            console.log('COLOR HINT: G')
            currentSpan.style.backgroundColor = 'green'
            
        }
        else if (pokeSplit.includes(splitTry[i]) && pokeSplit[i]!== splitTry[i]){
            //yellow
            console.log('COLOR HINT: Y')
            currentSpan.style.backgroundColor = 'yellow'
        }
        else { // letter is not in pokeAnswer
            //grey
            console.log('COLOR HINT: Grey')
            currentSpan.style.backgroundColor = 'grey'

        }}
    else {
        console.log(`Span not found for try${tryNum}-char-${i}`)
    }}



            

}
function UpdateAllTriesVisual(){

    
}

function gameOver(){
    console.log('game over!')

    if (win === true) {
        console.log('pika pika WINNER!')
        console.log(`I CHOOSE YOU ${pokeAnswer}`)
    }
    else {
        console.log('you didnt catch them all :/')
    }
    gameOverAnime()
    console.log("Would you like to play again? To be the very best, you must try again and again!! It took ash 25  years to become a pokemon master")
    console.log("to play again ! press enter")
        if (replay = true ){
            // find another pokeAnswer value
            console.log('Prepare for trouble, and make it double! We are starting again!')
        }
        else {
            console.log("You're really going to let team rocket win?")
            console.log("Prepare for trouble And make it double! To protect the world from devastation! To unite all peoples within our nation \n To denounce the evils of truth and love! \n To extend our reach to the stars above! \n Jessie!\n James!")
        }

    
}

function gameOverAnime(){
    let width = 1
    let height = 1
    let winCheer = document.createElement('div')
    
    let finalbowEl = document.getElementById('final-bow')
    finalbowEl.appendChild(winCheer)
    winCheer.innerText= "We caught them all!"
    winCheer.style.width += width + "px"
    winCheer.style.height += height + "px"
    winCheer.style.backgroundColor = 'magenta'
    winCheer.style.overflow = 'hidden' // stops text from going beyond page
    const growCheer = setInterval(()=> {
        width+=1
        height+= 1
        winCheer.style.width = width + "px"
        winCheer.style.height = height + "px"

    if (width >= 200){
        clearInterval(growCheer)
    }
    })

}
