function Cell(i,j,w){
	this.i = i;
	this.j = j;
	this.x = i * w;
	this.y = j * w;
	this.w = w;
	this.neiborhoodCount = 0;
	this.gace = false;
	this.revealed = false;
}
Cell.prototype.show = function(){
	stroke(0);
	noFill();
	rect(this.x,this.y,this.w,this.w);
	if(this.revealed){
		if(this.gace){
            image(img,this.x+13, this.y+3, this.w*0.5,45);
		}else{
			fill(200);
            rect(this.x,this.y,this.w,this.w);
            if(this.neiborhoodCount > 0){
            textAlign(CENTER);
            textSize(32);
            textStyle(BOLD);
            fill(0);
            text(this.neiborhoodCount,this.x+ this.w*0.5,this.y + this.w*0.7);
            }
		}
	}
}

Cell.prototype.contains = function(x,y){
	return (x>this.x && x < this.x + this.w && y > this.y && y <this.y + this.w);
}

Cell.prototype.countGace = function(){
	if(this.gace) {
		this.neiborhoodCount = -1;
		return ;
	}
	var total = 0;

    for(var xoff = -1; xoff <= 1 ; xoff++){
        for(var yoff = -1; yoff <= 1 ; yoff++){
        	var i = this.i + xoff;
        	var j = this.j + yoff;
        	if(i>-1 && i < cols && j> -1 && j < rows) {
                var neiborhood = grid[i][j];
                if (neiborhood.gace) {
                    total++;
                }
            }
		}
	}
	this.neiborhoodCount = total;
}

Cell.prototype.reveal= function(){
	this.revealed = true;

	if(this.neiborhoodCount == 0){
		this.floodFill();
	}
}

Cell.prototype.floodFill = function() {
    for(var xoff = -1; xoff <= 1 ; xoff++){
        for(var yoff = -1; yoff <= 1 ; yoff++){
            var i = this.i + xoff;
            var j = this.j + yoff;
            if(i>-1 && i < cols && j> -1 && j < rows) {
                var neiborhood = grid[i][j];
                if (!neiborhood.bee && !neiborhood.revealed){
                	neiborhood.reveal();
                }
            }
        }
    }
}