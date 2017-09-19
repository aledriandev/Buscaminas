'use strict';
const app = {

    bombs: 10,
    colSize: 9, //tamaño horizontal
    rowSize: 12, // tamaño vertical
    grid: [],

    init: function(){
        let tableMines = $('#tableMines');
        for( let row=0; row< app.rowSize; row++ ){
            let tr = document.createElement('tr');
            app.grid[row] = [];
            for( let col=0; col < app.colSize; col++ ){
                let td = document.createElement('td');
                    td.setAttribute('class','square');
                app.grid[row][col] = {
                    hasBomb: false, 
                    bombCount: 0
                };
                tr.appendChild(td);
            }
            tableMines.append(tr);
        }
        while(app.bombs> 0){
            var y = Math.ceil(Math.random() * app.colSize);
            var x = Math.ceil(Math.random() * app.rowSize);
            if ( !(app.grid[x][y]).hasBomb ) {
                (app.grid[x][y]).hasBomb = true;
                // (grid[x][y]).setAttribute ('class','bomb');
                app.bombs--;
            }
        }
        for (var i = 1; i <= app.rowSize; i++) {
            for (var j = 1; j <= app.colSize; j++) {
        
                if ( (app.grid[i][j]).hasBomb ) {
        
                    app.grid[i-1][j-1].bombCount++;
                    app.grid[i-1][j  ].bombCount++;
                    app.grid[i-1][j+1].bombCount++;
                    app.grid[i  ][j-1].bombCount++;
                    app.grid[i  ][j+1].bombCount++;
                    app.grid[i+1][j-1].bombCount++;
                    app.grid[i+1][j  ].bombCount++;
                    app.grid[i+1][j+1].bombCount++;
        
                }
            }
        }


    }
}

$(document).ready(function(){
    app.init();
});

// Cotruccion de tabla


