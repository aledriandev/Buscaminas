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
            td.setAttribute('onclick','showDiv(this)');
        //el div que ocultara el contenido de la tabla
        let divTd = document.createElement('div');
            divTd.setAttribute('class','hidde-td');
        let countTd = document.createElement('div');
            countTd.setAttribute('class','count');
            countTd.setAttribute('id',row+'--'+col);
        grid[row][col] = {
            hasBomb: false, 
            bombCount: 0
        };
        td.appendChild(countTd);
        td.appendChild(divTd);
        tr.appendChild(td);
    }
    tableMines.append(tr);
}

while(bombs> 0){
    let x = Math.floor(Math.random()*6)
    let y = Math.floor(Math.random()*6)
    // console.log(x);
    // console.log(y);
    if ( !(grid[x][y]).hasBomb ) {
        (grid[x][y]).hasBomb = true;
        console.log(grid[x][y]);
        bombs--;
        console.log(bombs);
    }
}
//colocar las bombas
for (var i = 0; i < rowSize; i++) {
    for (var j = 0; j < rowSize; j++) {
        if ( (grid[i][j]).hasBomb ) {
            console.log(i +'-'+ j)
            $(`#${i}--${j}`).addClass('bombHere');
        }
    }
}

//colocar los numeros
for (var i = 0; i < rowSize; i++) {
    for (var j = 0; j < rowSize; j++) {
        if ( (grid[i][j]).hasBomb ) {
            if( i==0 && j==0){//primera esquina
                grid[i  ][j+1].bombCount++;
                grid[i+1][j  ].bombCount++;
                grid[i+1][j+1].bombCount++;
            } else if( i==0 && j==6){//segunda esquina
                grid[i  ][j-1].bombCount++;
                grid[i+1][j-1].bombCount++;
                grid[i+1][j  ].bombCount++;
            } else if( i==6 && j==0){//tercera esquina
                grid[i  ][j+1].bombCount++;
                grid[i-1][j  ].bombCount++;
                grid[i-1][j+1].bombCount++;
            } else if( i==6 && j==6){//cuarta esquina
                grid[i  ][j-1].bombCount++;
                grid[i-1][j-1].bombCount++;
                grid[i-1][j  ].bombCount++;
            } else if( i==0 && (j!=0 || j!=6 )){ //lateral i==0
                grid[i+1][j-1].bombCount++;
                grid[i+1][j  ].bombCount++;
                grid[i+1][j+1].bombCount++;
                grid[i  ][j-1].bombCount++;
                grid[i  ][j+1].bombCount++;
            } else if( i==6 && (j!=0 || j!=6 )){ //lateral 6==0
                grid[i-1][j-1].bombCount++;
                grid[i-1][j  ].bombCount++;
                grid[i-1][j+1].bombCount++;
                grid[i  ][j-1].bombCount++;
                grid[i  ][j+1].bombCount++;
            } else if(j==0 && (i!=0 || i!=6 ) ){ //lateral j==0
                grid[i  ][j+1].bombCount++;
                grid[i-1][j+1].bombCount++;
                grid[i+1][j+1].bombCount++;
                grid[i-1][j  ].bombCount++;
                grid[i+1][j  ].bombCount++;
            } else if(j==6 && (i!=0 || i!=6 ) ){ //lateral j==0
                grid[i  ][j-1].bombCount++;
                grid[i-1][j-1].bombCount++;
                grid[i+1][j-1].bombCount++;
                grid[i-1][j  ].bombCount++;
                grid[i+1][j  ].bombCount++;
            }
            else{
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
}

for (var i = 0; i < rowSize; i++) {
    for (var j = 0; j < rowSize; j++) {
        let number = grid[i][j].bombCount;
        let hasBombHere = grid[i][j].hasBomb;
        if (number>0 && !hasBombHere){
            $(`#${i}--${j}`).text(number);
        }
    }
}

function showDiv(e){
    e.target.appendChild
}

function numRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}