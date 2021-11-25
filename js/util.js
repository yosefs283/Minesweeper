'use strict'


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
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
            else strHTML += `<td class=" board ${className}" onclick="cellClicked(this,${i},${j})" oncontextmenu="cellMarked(this,${i},${j})" contextmenu="mymenu"></td>`
        }
    }
    strHTML += '</tbody></table>';
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;

}


function timer() {
    var startTime = Date.now();

    gInterval = setInterval(function () {
        var elapsedTime = Date.now() - startTime;
        document.querySelector(".timer").innerText = parseInt(elapsedTime / 1000);
    }, 1000);
}

function openLModal() {
    var elModal = document.querySelector('.modal')
    elModal.innerText = 'You stepped on a mine.\nBe carefull!'
    elModal.style.display = 'block'
    setTimeout(closeModal, 1500)
}

function closeModal() {
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none';

}