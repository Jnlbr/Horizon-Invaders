var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

// Método para generar un numero aleatorio en un rango
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Método para obtener la distancia entre dos puntos
function getDistance(x1, y1, x2, y2) {
    var xDistance = x2 - x1;
    var yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

// ---- Método constructor de los aviones ---- //
function Airplane(x, y, dx, dy, radius, img, trooperX) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.img = img;
    this.opacity = 1;
    this.color = '#F24C27';
    this.boolTrooper = false;              
    this.trooperX = trooperX;
    
    this.draw = function(x,y) {
        c.save();
        c.drawImage(this.img, this.x-30, this.y, 75, 60);
        c.restore();
    }
    
    this.update = function () {
        if (this.y > y + 10 || this.y < y - 10) {
            this.dy = -this.dy;
        }
        
        this.y += this.dy
        this.x += this.dx;
        this.draw(this.x, this.y);
    }

    /*this.Paratrooper = function() {
        var bool = false;
        if(this.x == this.trooperX && this.boolTrooper == false){    
            this.boolTrooper = true;
            bool = true;
        }
        return bool;
    }*/
}


// ---- Método constructor de los paracaidistas ---- //
function Paratrooper(x, y, width, height, dy) {
    this.img = document.getElementById('paratrooper-model');
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = 'white';
    this.dx = 1;
    this.dy = dy;
    this.mov = false;
    this.NewPara = Math.random();

    this.draw = function () {
        if(this.NewPara > 0.4){
            c.beginPath();
            c.drawImage(this.img, this.x, this.y-40, this.width+60, this.height+60);
       }
    };
    
    this.update = function () {
        if(this.NewPara > 0.4){
        // Sumamos el valor de la coordenada en y + la altura del paracaidista para determinar que tan cerca 
        // está del final del canvas.
        // Al aterrizar el paracaidista, se pone en 0 la velocidad en Y y se activa en 4 
        // (o cualquier otro valor) la velocidad en X
        if (this.y + this.height + 40 > innerHeight) {
            this.dy = 0;
            this.changemodel();
            if(tank.x > this.x && this.mov == false) {
                this.dx = 4;
                this.mov = true;
            } else if (tank.x < this.x && this.mov == false) {
                this.dx = -4;
                this.mov = true;
            }
        }
        if ((this.x > x + 20 || this.x < x - 20) && this.y + this.height + 40 < innerHeight) { 
            this.dx = -this.dx;
        }
        this.x += this.dx
        this.y += this.dy;
        this.draw();
    }

    this.changemodel = function(){
        this.img = document.getElementById('paratrooper2-model');
    }
    };
}


// ----- Enemy collision detection ---- //
function AirCollision(avion, proyectil) {
    var boolean = false;
    if (getDistance(avion.x, avion.y, proyectil.x, proyectil.y) < avion.radius + proyectil.radius) {
        boolean = true;
    }
    return boolean;
}

function GroundCollision(trooper, tank) {
    var boolean = false;
    if ((tank.x + tank.width > trooper.x) && (tank.x < trooper.x + trooper.width) && (tank.y < trooper.y + trooper.height)){
        boolean = true;
    }
    return boolean;
}

function ParaCollision(trooper, shot) {
    var boolean = false;
    if ((getDistance(trooper.x, trooper.y, shot.x, shot.y) < trooper.width + shot.radius) && (getDistance(trooper.x, trooper.y, shot.x, shot.y) < trooper.height + shot.radius)) {
        boolean = true;
    }
    return boolean;
}

// ----- Score function ---- //
function Score() {
    score = 0;
    
    this.draw = function () {
        c.beginPath();
        c.font = '16pt Trebuchet MS';
        c.fillStyle = 'white';
        c.strokeStyle = 'yellow';
        c.fillText('Score: ' + score, innerWidth - 150, 35);
        c.closePath();
    }
    
    this.update = function () {
        this.draw();
    }
    
    // Setter
    this.setScore = function () {
        score += 100;
    }
	
	this.trueSet = function(x) {
		score = x;
	}
    
    // Getter
    this.getScore = function() {
        return score;
    }
}

// ----- Lives function ---- //
function Lives () {
    var lives = 3;

    this.draw = function () {
        c.beginPath();
        c.font = '16pt Trebuchet MS';
        c.fillStyle = 'white';
        c.strokeStyle = 'yellow';
        c.fillText('Lives: ' + lives, innerWidth - 150, 60);
        c.closePath();
    }
    
    this.update = function () {
        this.draw();
    }

    this.drawGameOver = function(){
        c.beginPath();
        c.font = '64pt Trebuchet MS';
        c.textAlign = 'center';
        c.fillStyle = 'white';
        c.strokeStyle = 'yellow';
        c.fillText('GAME OVER', innerWidth/2 - 250, innerHeight/2, 512);
        c.closePath();      
    }

    this.setMoreLives = function(){
        if(lives <= 3){
            lives += 1;
        }
    }
	
	this.setAllLives = function() {
		if (lives <=3) {
			lives += 3;
		}
	}

    this.setLessLives = function(){
        if (this.IsAlive()){
            lives -= 1;
        }
    }

    this.IsAlive = function(){
        if (lives > 0){
            return true;
        }else{
            return false;
        }
    }

    this.GameOver = function () {
        if (this.IsAlive()) {
            return false;
        } else {
            return true;
        }
    }
}