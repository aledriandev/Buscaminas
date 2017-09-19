'use strict';

let bombs = 10;
const colSize = 9; //tamaño horizontal
const rowSize = 12; // tamaño vertical
let grid = [];
// Cotruccion de tabla
let tableMines = $('#tableMines');
for( let row=0; row<rowSize; row++ ){
    let tr = document.createElement('tr');
    grid[row] = [];
    for( let col=0; col<colSize; col++ ){
        let td = document.createElement('td');
            td.setAttribute('class','square');
        grid[row][col] = {
            hasBomb: false, 
            bombCount: 0
        };
        tr.appendChild(td);
    }
    tableMines.append(tr);
}

while(bombs> 0){
    var x = Math.ceil(Math.random() * rowSize);
    var y = Math.ceil(Math.random() * colSize);
    if ( !(grid[x][y]).hasBomb ) {
        (grid[x][y]).hasBomb = true;
        // (grid[x][y]).setAttribute ('class','bomb');
        bombs--;
    }
}

for (var i = 1; i <= gridSize; i++) {
    for (var j = 1; j <= this.gridSize; j++) {

        if ( (grid[i][j]).hasBomb ) {

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