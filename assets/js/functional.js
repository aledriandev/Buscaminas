'use strict';

let bombs = 10;
const rowSize = 10; // tamaño de la tabla
const colSize = 10; // tamaño de la tabla
let grid;
// Cotruccion de tabla
let tableMines = document.getElementById("tableMines");
newTable();

function newTable() {
    tableMines.innerHTML = "";
    //bombs = 10;
    grid = [];
    for (let row = 0; row < rowSize; row++) {
        let tr = document.createElement('tr');
        grid[row] = [];
        for (let col = 0; col < colSize; col++) {
            let td = document.createElement('td');
            td.setAttribute('class', 'square');
            td.setAttribute('id', row + '*' + col);
            //el div que ocultara el contenido de la tabla
            let divTd = document.createElement('div');
            divTd.setAttribute('class', 'hidde-td');
            divTd.setAttribute('onclick', 'showDiv(this)');
            divTd.setAttribute('id', row + '-' + col);
            let contentTd = document.createElement('div');
            contentTd.setAttribute('class', 'content');
            contentTd.setAttribute('id', row + '--' + col);
            grid[row][col] = {
                hasBomb: false,
                bombCount: 0,
                flag: false
            };
            td.appendChild(contentTd);
            td.appendChild(divTd);
            tr.appendChild(td);
        }
        tableMines.append(tr);
    }
    //colocar las bombas
    while (bombs > 0) {
        let x = random(0, rowSize);
        let y = random(0, colSize);
        // console.log("x------", x);
        // console.log("y------", y);
        if (!(grid[x][y]).hasBomb) {
            (grid[x][y]).hasBomb = true;
            console.log("grid[x][y]", "grid[" + x + "][" + y + "]");
            bombs--;
            //console.log(bombs);
            document.getElementById(`${x}--${y}`).setAttribute('class', 'bombHere content');
        }
    }


    //Contar valores
    //posiciones de las bombas
    const sq_x = [-1, -1, -1, +0, +0, +1, +1, +1];
    const sq_y = [-1, +0, +1, -1, +1, -1, +0, +1];

    for (let x = 0; x < rowSize; x++) {
        for (let y = 0; y < colSize; y++) {
            if (!grid[x][y].hasBomb) {
                for (let index = 0; index < sq_x.length; index++) {
                    let i = x + sq_x[index];
                    let j = y + sq_y[index];
                    if (check(i, j, rowSize, colSize) && (grid[i][j]).hasBomb) {
                        grid[x][y].bombCount++
                    }
                }
                let number = grid[x][y].bombCount;
                if (number > 0) {
                    //document.getElementById(`${x}--${y}`).innerHTML = number;
                }
            }
        }
    }

    for (let x = 0; x < rowSize; x++) {
        for (let y = 0; y < colSize; y++) {
            console.log("grid[x][y]", "grid[" + x + "][" + y + "]");
            console.log("grid[x][y]", grid[x][y]);
        }
    }

}

function showAll() {
    for (let x = 0; x < rowSize; x++) {
        for (let y = 0; y < colSize; y++) {
            document.getElementById(`${x}-${y}`).remove();
        }
    }
}

//showAll()

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function check(i, j, n, m) {
    if (i >= 0 && j >= 0 && i < n && j < m)
        return true;
    return false;
}

function showDiv(e) {
    let idEvent = e.getAttribute('id').split('-');
    console.log(idEvent)
    let x = parseInt(idEvent[0]);
    let y = parseInt(idEvent[1]);

    if (grid[x][y].hasBomb) {
        document.getElementById(`${x}--${y}`).setAttribute('class', 'bombHere content error');
        showSolution();
        document.getElementById(x + '*' + y).removeAttribute('onclick');
        alert('Esto ha explotado');
    } else if (grid[x][y].bombCount == 0) {
        bombaNotFound(x, y);
        // document.getElementById(`${x}-${y}`).remove();
    } else {
        document.getElementById(`${x}--${y}`).innerHTML = grid[x][y].bombCount;
    }
    console.log(e.getAttribute('id'));
    e.remove();

}


const sq_x = [-1, -1, -1, +0, +0, +1, +1, +1];
const sq_y = [-1, +0, +1, -1, +1, -1, +0, +1];

function bombaNotFound(x, y) {
    console.log("x,y", x + "," + y)
    if (!grid[x][y].hasBomb && document.getElementById(`${x}-${y}`)) {
        document.getElementById(`${x}-${y}`).remove();

    }
    for (let index = 0; index < sq_x.length; index++) {
        let i = x + sq_x[index];
        let j = y + sq_y[index];
        if (document.getElementById(`${i}-${j}`) && check(i, j, rowSize, colSize) && !grid[i][j].hasBomb) {
            if (grid[i][j].bombCount === 0) {
                bombaNotFound(i, j)
            } else {
                document.getElementById(`${i}-${j}`).remove();
                document.getElementById(`${i}--${j}`).innerHTML = grid[i][j].bombCount;
            }
        }
    }

}

function showSolution() {
    for (var i = 0; i < rowSize; i++) {
        for (var j = 0; j < colSize; j++) {
            if ((grid[i][j]).hasBomb) {
                //console.log(i + '-' + j)
                document.getElementById(`${i}-${j}`).remove();
            }
        }
    }
}

function removeClick(x, y) {}

// $("html").click(function() {
//     alert("Sigue jugando");
// });
document.getElementById('game').click(function(e) {
    e.stopPropagation();
});