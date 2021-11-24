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

function init() {
    gGame.isOn = true
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
    randMines(board)
    setMinesAroundCell(board)
    return board;
}





function cellClicked(value, i, j) {
    console.log(value);
    if (!gGame.isOn) return
    if (value.classList.contains('mine')) {
        if (gBoard[i][j].isMine) gBoard[i][j].isMarked = false
        var elMines = document.querySelectorAll('.mine')
        for (var i = 0; i < elMines.length; i++) {
            elMines[i].style.textIndent = '0'
            if (elMines[i].innerText !== MINE) elMines[i].innerText = MINE
        }
        gGame.isOn = false
    }
    if (value.classList.contains('safe')) {
        value.style.textIndent = '0'
        if (gBoard[i][j].minesAroundCount === 0) {
            value.innerText=''
            expandNegs(gBoard,i,j)
        }else {
            value.innerText = gBoard[i][j].minesAroundCount
            gBoard[i][j].isShown = true
            gBoard[i][j].isSafe = true
        }
        
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
    if (gBoard[i][j].isShown) return
    if (!gBoard[i][j].isMarked && !gBoard[i][j].isShown) {
        value.style.textIndent = '0'
        value.innerText = FLAG
        gBoard[i][j].isMarked = true

    } else if (gBoard[i][j].isMarked) {
        gBoard[i][j].isMarked = false
        gBoard[i][j].isShown = false
        value.innerText = ' '
    }
}

function easyMode() {
    gLevel.size = 4
    gLevel.mines = 2
    init()
}

function mediumMode() {
    gLevel.size = 8
    gLevel.mines = 12
    init()
}

function hardMode() {
    gLevel.size = 12
    gLevel.mines = 30
    init()
}

function expandNegs(board, i, j) {
    for (var x = i - 1; x <= i + 1; x++) {
        if (x < 0 || x > board.length - 1) continue;
        for (var y = j - 1; y <= j + 1; y++) {
            if (y < 0 || y > board.length - 1) continue;
            if (x === i && y === j) continue;
            if (board[i][j].minesAroundCount === 0 &&
                board[i][j].isMarked === false) {
                        
            }
        }
    }
}