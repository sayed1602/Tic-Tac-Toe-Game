//variables
let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box')) //create an array from array like objects 

//changes the style of the winning blocks 
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null) //fills 9 empty spaces
let count_plays = 0

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}
// Box click function
function boxClicked(e) {
    const id = e.target.id

    //If the space hasn't been filled with an id it continues
    if(!spaces[id] && count_plays < 9){ 
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer //changing the value of the div to the current player 

        if(playerHasWon() !==false){
            playerText.innerHTML = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()
            count_plays = 10
            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
            return
        }
        count_plays++
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT //goes back and forth between x and 0 
    }

    if(count_plays === 9){
        playerText.innerHTML = 'Draw'
        boxes.forEach(box => box.style.color = 'Red')
    }
}

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

//loop over the winning combo
function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,c]
        }
    }
    return false
}

restartBtn.addEventListener('click', restart)

function restart() {
    spaces.fill(null) //make the array empty
    count_plays = 0
    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor=''
        box.style.color = '#036464'
    })

    playerText.innerHTML = 'Tic Tac Toe'

    currentPlayer = X_TEXT //changes the default current player back to x 
}

startGame()