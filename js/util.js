'use strict'
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function copyMat(mat){
    var newMat = []
    for (var i =0;i<mat.length;i++){
        newMat[i]=[]
        for (var j=0;j<mat[0].length;j++){
            newMat[i][j]=mat[i][j]
        }
    }
    return newMat
}

function createBoard(size) {
    var board = [];
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = ' '
        }
    }

    return board;
}






function playSound(file) {
    var audio = new Audio(file)
    audio.play()
}

function drawNum() {
    var idx = getRandomInt(0, gNums.length)
    var num = gNums[idx]
    gNums.splice(idx, 1)
    return num
}

// printPrimaryDiagonal(mat)

function printPrimaryDiagonal(squareMat) {
    for (var d = 0; d < squareMat.length; d++) {
        var item = squareMat[d][d];
        console.log(item);
    }
}


// printSecondaryDiagonal(mat)

function printSecondaryDiagonal(squareMat) {
    for (var d = 0; d < squareMat.length; d++) {
        var item = squareMat[d][squareMat.length - 1 - d];
        console.log(item);
    }
}

function renderCell(location, value) {
    var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
    elCell.innerHTML = value;
}

function renderBoard(board) {
    var strHTML = '<table border="1" class = "board"><tbody>';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var className = `cell-${i}-${j}`;
            if (board[i][j].isMine){
                strHTML += `<td class=" board ${className} mine" onclick="cellClicked(this,${i},${j})" oncontextmenu="cellMarked(this,${i},${j})" contextmenu="mymenu">${MINE}</td>`
            }
            else if (board[i][j].isSafe) strHTML += `<td class=" board ${className} safe" onclick="cellClicked(this,${i},${j})" oncontextmenu="cellMarked(this,${i},${j})" contextmenu="mymenu"></td>`
            else if (!board[i][j].minesAroundCount) strHTML+=''
            else strHTML += `<td class=" board ${className}" onclick="cellClicked(this,${i},${j})" oncontextmenu="cellMarked(this,${i},${j})" contextmenu="mymenu"></td>`
        }
    }
    strHTML += '</tbody></table>';
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;

}


function shuffle(items) {
    var randIdx, keep;
    for (var i = items.length - 1; i > 0; i--) {
        // randIdx = getRandomInt(0, items.length);
        randIdx = getRandomInt(0, i + 1);

        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}
