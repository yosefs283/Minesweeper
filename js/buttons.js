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

function playAgain() {
    var elRestartBtn = document.querySelector('.restart')
    elRestartBtn.innerText = '😀'
    init()
}