'use strict';

let bombs;
const rowSize = 7; // tamaño de la tabla
let grid;
// Cotruccion de tabla
let tableMines = $('#tableMines');
newTable();
function newTable () {
    $('#tableMines').html('');
    bombs = 10;
    grid = [];
    for( let row=0; row<rowSize; row++ ){
        let tr = document.createElement('tr');
        grid[row] = [];
        for( let col=0; col<rowSize; col++ ){
            let td = document.createElement('td');
                td.setAttribute('class','square');
                td.setAttribute('id',row+'*'+col);
                //el div que ocultara el contenido de la tabla
            let divTd = document.createElement('div');
                divTd.setAttribute('class','hidde-td');
                divTd.setAttribute('onclick','showDiv(this)');
                divTd.setAttribute('id',row+'-'+col);
            let contentTd = document.createElement('div');
                contentTd.setAttribute('class','count');
                contentTd.setAttribute('id',row+'--'+col);
            grid[row][col] = {
                hasBomb: false, 
                bombCount: 0
            };
            td.appendChild(contentTd);
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
    
    //deberia funcionar colocar numeros
    const mov_x = [-1, -1, -1, +0, +0, +1, +1, +1];
    const mov_y = [-1, +0, +1, -1, +1, -1, +0, +1];    
    
    for (let x = 0; x < rowSize; x++) {
        for (let y = 0; y < rowSize; y++) {
            for (let index = 0; index < mov_x.length; index++) {
                let i = x + mov_x[index];
                let j = y + mov_y[index];   
                if (check (i, j, 7)&&(grid[x][y]).hasBomb) {
                    grid[i][j].bombCount++
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
}

function check (i, j, n) {
    if (  i >= 0 && j >= 0 && i < n && j < n)
      return true;
    return false;   
}

function showDiv(e){
    let idEvent = e.getAttribute('id').split('-');
    console.log(idEvent)
    let x = parseInt(idEvent[0]);
    let y = parseInt(idEvent[1]);

    if(grid[x][y].hasBomb){
        $(`#${x}--${y}`).addClass('error');
        showSolution();
        removeClick();
        alert('Esto ha explotado');
    } else if (grid[x][y].bombCount==0){
        showClean(x,y)
    }
    console.log(e.getAttribute('id'));
    e.remove();
    
}

function showClean (x,y) {
    const mov_x = [-1, -1, -1, +0, +0, +1, +1, +1];
    const mov_y = [-1, +0, +1, -1, +1, -1, +0, +1];    
    for (let index = 0; index < mov_x.length; index++) {
        let i = x + mov_x[index];
        let j = y + mov_y[index];   
        if (check (i, j, 7)) {
            $(`#${i}-${j}`).remove();
            if (grid[i][j].bombCount == 0 && $(`#${i}-${j}`).length) {
                // $(`#${i}-${j}`).remove();
                x = i;
                y = j;
                showClean(x,y);
            }
            
        }
    }
}



function showSolution () {
    for (var i = 0; i < rowSize; i++) {
        for (var j = 0; j < rowSize; j++) {
            if ( (grid[i][j]).hasBomb ) {
                console.log(i +'-'+ j)
                $(`#${i}-${j}`).remove();
            }
        }
    }
}

function removeClick () {
    for (var i = 0; i < rowSize; i++) {
        for (var j = 0; j < rowSize; j++) {
            // console.log($(`#${i}-${j}`).length)
            if ( !(grid[i][j]).hasBomb && $(`#${i}-${j}`).length!=0 ) {
                document.getElementById(i +'-'+ j).setAttribute("onclick", 'nada');
            }
        }
    }
}

$("html").click(function() {
    alert("Sigue jugando");
});
$('#game').click(function (e) {
    e.stopPropagation();
});

function nada () {}

function numRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}


// //deberia funcionar
// let mov_x = [-1, -1, -1, +0, +0, +1, +1, +1];
// let mov_y = [-1, +0, +1, -1, +1, -1, +0, +1];    

// for (let x = 0; x < rowSize; i++) {
//     for (let y = 0; y < rowSize; j++) {
//         for (let index = 0; index < mov_x.length; index++) {
//             let i = x + mov_x[index];
//             let j = y + mov_y[index];   
//             if (check (i, j, 7)&&(grid[x][y]).hasBomb) {
//                 grid[i][j].bombCount++
//             }
//         }
//     }
// }
// function check (i, j, n) {
//     if (  i >= 0 && j >= 0 && i < n && j < n)
//       return true;
//     return false;   
// }

