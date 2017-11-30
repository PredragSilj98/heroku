//GaceSweeper

function make2DArray(cols, rows) {
	var arr = new Array(cols);
	for (var i = 0; i < arr.length ; i++) {
		arr[i] = new Array(rows);
	}
	return arr;
}

var grid;
var cols;
var rows;
var w = 50;
var img;
var slaa;
var totalGace = 10;

function preload() {
	img = loadImage('assets/gace.jpg');
	slaa = loadSound('sounds/slaa.mp3');
}

function resetGame(){
    grid = make2DArray(cols, rows);
    for(var i = 0; i < cols ; i++){
        for(var j = 0; j < rows ; j++){
            grid[i][j] = new Cell(i,j,w);
        }
    }

    var options = [];
    for(var i = 0; i < cols ; i++){
        for(var j = 0; j < rows ; j++){
            options.push([i,j]);
        }
    }



    for(var n = 0; n < totalGace ; n++){
        var index = floor(random(options.length));
        var choise = options[index];
        var i = choise[0];
        var j = choise[1];

        options.splice(index,1);
        grid[i][j].gace = true;
    }



    for(var i = 0; i < cols ; i++){
        for(var j = 0; j < rows ; j++){
            grid[i][j].countGace();
        }
    }

}

function setup() {
	createCanvas(501,501);

	cols = floor(width/w);
	rows = floor(height/w);

	resetGame();

    var button = createButton('reset');
    button.mousePressed(resetGame);
}

function gameOver() {
    for(var i = 0; i < cols ; i++){
        for(var j = 0; j < rows ; j++){
            grid[i][j].revealed = true;
        }
    }
    slaa.play();
}

function mousePressed() {
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            if(grid[i][j].contains(mouseX,mouseY)){
            	grid[i][j].reveal();

            	if(grid[i][j].gace){
            		gameOver();
				}
			}
        }
    }
}


function draw() {
  background(255);
  for(var i = 0; i< cols;i++){
		for (var j = 0; j < rows ; j++) {
			grid[i][j].show();
		}
	}
}
