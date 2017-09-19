'use strict';

let bombs = 10;
const rowSize = 7; // tamaño vertical
let grid = [];
// Cotruccion de tabla
let tableMines = $('#tableMines');
for( let row=0; row<rowSize; row++ ){
    let tr = document.createElement('tr');
    grid[row] = [];
    for( let col=0; col<rowSize; col++ ){
        let td = document.createElement('td');
            td.setAttribute('class','square');
            td.setAttribute('id',row+'-'+col);
        grid[row][col] = {
            hasBomb: false, 
            bombCount: 0
        };
        tr.appendChild(td);
    }
    tableMines.append(tr);
}

while(bombs> 0){
    let x = Math.floor(Math.random()*5)+1
    let y = Math.floor(Math.random()*5)+1
    // console.log(x);
    // console.log(y);
    if ( !(grid[x][y]).hasBomb ) {
        (grid[x][y]).hasBomb = true;
        console.log(grid[x][y]);
        // (grid[x][y]).setAttribute ('class','bomb');
        bombs--;
        console.log(bombs);
    }
}
//colocar las bombas
for (var i = 0; i < rowSize; i++) {
    for (var j = 0; j < rowSize; j++) {
        if ( (grid[i][j]).hasBomb ) {
            console.log(i +'-'+ j)
            $(`#${i}-${j}`).addClass('bombHere');
        }
    }
}

//sumar cuando esta en el centro
for (var i = 1; i < rowSize-1; i++) {
    for (var j = 1; j < rowSize-1; j++) {
        if ( (grid[i][j]).hasBomb ) {
            console.log(i +'-'+ j)
            // $(`#${i}-${j}`).addClass('bombHere');
            grid[i-1][j-1].bombCount++;
            grid[i-1][j  ].bombCount++;
            grid[i-1][j+1].bombCount++;
            grid[i  ][j-1].bombCount++;
            grid[i  ][j+1].bombCount++;
            grid[i+1][j-1].bombCount++;
            grid[i+1][j  ].bombCount++;
            grid[i+1][j+1].bombCount++;
        }
    }
}

for (var i = 0; i < rowSize; i++) {
    for (var j = 0; j < rowSize; j++) {
        let number = grid[i][j].bombCount;
        let hasBombHere = grid[i][j].hasBomb;
        if (number>0 && !hasBombHere){
            $(`#${i}-${j}`).text(number);
        }
    }
}

function numRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}