// Código del juego

var turn = 0;
var dropBoxFilled = [false, false, false, false, false, false, false, false, false];

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    var dropBoxIndex = Array.prototype.indexOf.call(event.currentTarget.parentNode.children, event.currentTarget);

    if (!dropBoxFilled[dropBoxIndex]) {
        var data = event.dataTransfer.getData("text");
        event.target.appendChild(document.getElementById(data));
        checkWinCondition();
        turn += 1;
        dropBoxFilled[dropBoxIndex] = true;
    }
}

function checkWinCondition() {
    var cells = document.querySelectorAll('.dropBox');
    var patterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
        [0, 4, 8], [2, 4, 6] // Diagonales
    ];

    for (var i = 0; i < patterns.length; i++) {
        var p = patterns[i];
        var cellsFilled = p.map(function (index) {
            return cells[index].querySelector('div') !== null ? cells[index].querySelector('div').id : '';
        });

        var winningCombo = turn % 2 === 0 ? 'X' : 'O';

        if (cellsFilled.every(function (val) {
            return val.includes(winningCombo);
        })) {
            alert(winningCombo + ' es el ganador. ¡Felicidades!');
            resetGame();
            return;
        }
    }

    if (turn === 8) {
        alert('¡Empate!');
        resetGame();
    }
}

function resetGame() {
    location.reload();
}

// Cambio de colores
let mode = document.querySelector('.mode');
let powerOff = document.querySelector('.powerOff');

powerOff.onclick = function(){
    mode.classList.toggle('active')
}