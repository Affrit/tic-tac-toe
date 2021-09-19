/*
    There are 2 players, in the first round the first player starts the game as X and goes first, the second player plays as 0 and goes second. In the second round, 
    players change places and the second player plays for X and goes first.
    And so on with each round they change places.
*/

const gameWrap = document.getElementById('gameWrap')
const sqares = document.getElementsByClassName('sqare')
const gameField = document.getElementById('gameField')
const restartBtn = document.getElementById('restartBtn')
const round = document.getElementById('round')
const score = document.getElementById('score')

let roundNum = 1 // current game round
let move = 0 // current game move (up to 9)
let firstPlayerPts = 0
let secondPlayerPts = 0
let turn = 'x' // if 'x' - first player's turn, if 'o' - second player's turn
let firstPlayerId = 'x'
let secondPlayerId = 'o'

const fieldState = { // sqareID = ' ' when it free, 'o' - was occupied by the player 'o', 'x' - was occupied by the player 'x'
    sqare1: ' ',
    sqare2: ' ',
    sqare3: ' ',
    sqare4: ' ',
    sqare5: ' ',
    sqare6: ' ',
    sqare7: ' ',
    sqare8: ' ',
    sqare9: ' ',
}

const updateInfo = () => {
    round.innerText = `Раунд ${roundNum}`
    score.innerText = `Игрок1 ${firstPlayerPts} - ${secondPlayerPts} Игрок2`
}

const clearField = () => { // clears the playing field, and resets the values ​​in the playing field state object
    for (const element of sqares) {
        element.innerHTML = ''
    }
    for (const key in fieldState) {
        fieldState[key] = ' '
    }
}

function didFigureWin(playerId) {
    const optionsArr = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7],
    ]

    for (const option of optionsArr) {
        const [id1, id2, id3] = option
        const key1 = `sqare${id1}`
        const key2 = `sqare${id2}`
        const key3 = `sqare${id3}`

        if (fieldState[key1] === playerId && fieldState[key2] === playerId && fieldState[key3] === playerId) {
            return true
        }
    }
}

const changeFigureforPlayer = () => { // Swaps playerID. In the next round, the player who played for X will play for 0.
    [firstPlayerId, secondPlayerId] = [secondPlayerId, firstPlayerId]
}

const nextRound = (win) => {
    roundNum += 1
    turn = 'x'
    move = 0

    if (win === firstPlayerId) {
        firstPlayerPts += 1
    }

    if (win === secondPlayerId) {
        secondPlayerPts += 1
    }

    updateInfo()
    clearField()
    changeFigureforPlayer()
}

const nextMove = () => {
    if (turn === 'x') {
        turn = 'o'
    } else {
        turn = 'x'
    }
    move += 1

    if (didFigureWin(firstPlayerId)) {
        alert('Игрок1 Выиграл!')
        nextRound(firstPlayerId)
        return
    }
    
    if (didFigureWin(secondPlayerId)) {
        alert('Игрок2 Выиграл!')
        nextRound(secondPlayerId)
        return
    }

    if (move === 9) {
        alert('Ничья!')
        nextRound()
    }
}

const createElement = (nodeName, className) => {
    const element = document.createElement(nodeName)
    element.setAttribute('class', className)
    return element
}

const onSquareClicked = ({ target }) => {
    if (!fieldState[target.id] || 
         fieldState[target.id] === 'x' || 
         fieldState[target.id] === 'o') {

        alert('Поле Занято!')
        return
    }

    if (turn === 'x') {
        fieldState[target.id] = 'x'
        const x = createElement('div', 'x')
        target.append(x)
    } else {
        fieldState[target.id] = 'o'
        const o = createElement('div', 'o')
        target.append(o)
    }

    setTimeout(nextMove, 50)
}

const onRestart = () => { // resets all values ​​to start a new game
    roundNum = 1
    move = 0
    firstPlayerPts = 0
    secondPlayerPts = 0
    turn = 'x'
    firstPlayerId = 'x'
    secondPlayerId = 'o'
    clearField()
    updateInfo()
}

gameField.addEventListener('click', onSquareClicked)
restartBtn.addEventListener('click', onRestart)