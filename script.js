const X_player = 'x'
const Circle_player = 'circle'
// possible combinations to win
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
// select all cell elements in board 
const cellElements = document.querySelectorAll('[data-cell]')
// board for class lists & css effects
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.getElementById('winningMessageText')
// circle turn is undefined & will be defined later on 
let circleTurn;

// run my function
startGame();

// when click on restart button run startGame
restartButton.addEventListener('click', startGame);

function startGame() {
  // x goes first
  circleTurn = false
  cellElements.forEach(cell => {
    // ensure board is cleared
    cell.classList.remove(X_player)
    cell.classList.remove(Circle_player)
    // when a mark is places make sure it is not clickable
    cell.removeEventListener('click', handleClick)
    // add click once again
    cell.addEventListener('click', handleClick, { once: true })
  })
  // css hover effect styling
  setBoardHoverClass()
  // hide winning message game screen
  winningMessageElement.classList.remove('hide')
}

// placing marks when cell is clicked & e is shorthand for event <== e is 'something' that takes place in DOM 
function handleClick(e) {
  // targeting this specific event
  const cell = e.target
  // change classes & player to x or o <== switch off
  const currentClass = circleTurn ? Circle_player : X_player
  // takes sytle & places it in cell
  placeMark(cell, currentClass)
  // check to see if current x or o matches winning conditions 
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

// hide/show winner or tie screen
function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
  }
  winningMessageElement.classList.add('show')
}

// determine if square are filled up & results in draw
function isDraw() {
  // ...adding new object with with defferent name but same values 
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_player) || cell.classList.contains(Circle_player)
  })
}

// add currentClass(x, o) and style HTML accordingly 
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

// start with x
function swapTurns() {
  circleTurn = !circleTurn
}

// what to do on hover with css elements 
function setBoardHoverClass() {
  board.classList.remove(X_player)
  board.classList.remove(Circle_player)
  if (circleTurn) {
    board.classList.add(Circle_player)
  } else {
    board.classList.add(X_player)
  }
}

// check if currentClass(x, o) matches [i] combinations
function checkWin(currentClass) {
  return winningCombos.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}