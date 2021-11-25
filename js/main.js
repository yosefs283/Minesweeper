'use strict'

const MINE = '💣'
const SMILEY = '😀'
const FLAG = '🚩'
var gBoard
var gLevel = {
    size: 4,
    mines: 2
}
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: gLevel.mines,
    secsPassed: 0
}
var gLives = 3
var isFirstClick = true
var gInterval
function init() {
    var elLives = document.querySelector('.live .lives')
    elLives.innerText = '3'
    gGame.isOn = true
    isFirstClick = true
    gGame.shownCount = 0
    gLives = 3
    gGame.markedCount = gLevel.mines;
    var elDiv = document.querySelector('.game-status')
    elDiv.style.display = 'none'
    var elRestartBtn = document.querySelector('.restart')
    elRestartBtn.innerText = '😀'
    var elTime = document.querySelector('.time .timer')
    elTime.innerText = '0'
    clearInterval(gInterval)
    gBoard = buildBoard()
    renderBoard(gBoard)

}

function buildBoard() {
    var SIZE = gLevel.size
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            var cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isSafe: true,
                isMarked: false,
            }
            board[i][j] = cell;
        }
    }
    // debugger
    //
    randMines(board)
    setMinesAroundCell(board)
    return board;
}

function cellClicked(value, i, j) {
    var elLives = document.querySelector('.live .lives')
    if (!gGame.isOn) return
    if (gBoard[i][j].isMarked) return
    if (isFirstClick) {
        timer()
        isFirstClick = false
    }
    if (value.classList.contains('mine')) {
        if (gLives > 1) {
            gLives--
            openLModal()
            elLives.innerText = gLives
            return
        }
        if (gBoard[i][j].isMine) gBoard[i][j].isMarked = false
        var elMines = document.querySelectorAll('.mine')
        for (var i = 0; i < elMines.length; i++) {
            elMines[i].style.textIndent = '0'
            elMines[i].style.backgroundColor = 'darkgray'
            if (elMines[i].innerText !== MINE) elMines[i].innerText = MINE
        }
        clearInterval(gInterval)
        victory(false)
        elLives.innerText = '0'
        gGame.isOn = false
    }
    if (!gBoard[i][j].isShown) {
        value.style.textIndent = '0'
        value.style.backgroundColor = 'darkgray'
        value.style.cursor = 'default'
        value.innerText = gBoard[i][j].minesAroundCount
        gBoard[i][j].isShown = true
        gBoard[i][j].isSafe = true
        if (value.innerText === '0'){
            expandShown(gBoard, i, j)//balagan
            value.innerText=''
        } 
        if (gBoard[i][j].isMarked) gGame.markedCount++
        checkVictory()
    }

}

function randMines(board) {
    var countMines = 0
    while (countMines !== gLevel.mines) {
        var i = getRandomIntInclusive(0, board.length - 1)
        var j = getRandomIntInclusive(0, board.length - 1)
        if (!board[i][j].isMine) {
            board[i][j].isMine = true
            board[i][j].isShown = false
            board[i][j].isSafe = false
            countMines++
        }
    }
}

function setMinesAroundCell(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j]
            var mines = countMinesAroundCell(board, i, j)
            cell.minesAroundCount = mines
        }
    }
}

function countMinesAroundCell(mat, cellI, cellJ) {
    var negsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i > mat.length - 1) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j > mat[i].length - 1) continue;
            if (i === cellI && j === cellJ) continue;

            if (mat[i][j].isMine) negsCount++;
        }
    }
    return negsCount;
}

function cellMarked(value, i, j) {
    if (!gGame.isOn) return
    if (isFirstClick) {
        timer()
        isFirstClick = false
    }
    if (gBoard[i][j].isShown) return
    if (!gBoard[i][j].isMarked && !gBoard[i][j].isShown) {
        value.style.textIndent = '0'
        value.innerText = FLAG
        gBoard[i][j].isMarked = true
        gGame.markedCount--
        checkVictory()

    } else if (gBoard[i][j].isMarked) {
        gGame.markedCount += 1
        gBoard[i][j].isMarked = false
        gBoard[i][j].isShown = false
        value.innerText = ' '
    }
}



function checkVictory() {
    gGame.shownCount = 0
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (gBoard[i][j].isShown === true) gGame.shownCount++
        }
    }
    if (gGame.markedCount === 0 && gGame.shownCount === ((gLevel.size ** 2) - gLevel.mines)) {
        victory(true)
    }
}
function victory(state) {
    gGame.isOn = false
    clearInterval(gInterval)
    var elDiv = document.querySelector('.game-status')
    var elP = elDiv.querySelector('p')
    var elRestartBtn = document.querySelector('.restart')
    elDiv.style.display = 'inline-block'
    if (state) elP.innerText = 'Great Job!', elRestartBtn.innerText = '😇'
    else elP.innerText = 'Game lost!', elRestartBtn.innerText = '⚰️'

}

function expandShown(board, i, j) {
    for (var k = i - 1; k <= i + 1; k++) {
        if (k < 0 || k >= board.length) continue
        for (var l = j - 1; l <= j + 1; l++) {
            if (l < 0 || l >= board.length) continue
            if (k === i && l === j) continue
            if (board[i][j].minesAroundCount === 0 && board[i][j].isMarked === false) {
                var elCell = document.querySelector(`.cell-${k}-${l}`)
                elCell.style.textIndent = '0'
                elCell.style.backgroundColor = 'darkgray'
                elCell.style.cursor = 'default'
                gBoard[k][l].isShown = true
                gBoard[k][l].isSafe = true
                if (!gBoard[k][l].minesAroundCount) elCell.innerText=''
                else elCell.innerText = gBoard[k][l].minesAroundCount
            }
        }
    }
}