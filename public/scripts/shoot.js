var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

// -------- Construcción de los proyectiles a disparar --------- //
function Projectile(initX, initY, directionX, directionY) {
    this.img = document.getElementById('bullet-model');
    this.radius = 4;
    this.width = 8;
    this.height = 8;
    this.power = 5;     //Si se juega con el valor de Power se obtienen varios resultados. Aún no se por qué me salen más de un disparo (bola) al presionar Espacio
    this.x = initX;
    this.y = initY;
    
    this.minX = this.radius;
    this.minY = this.radius;
    this.maxX = canvas.width - this.radius;
    this.maxY = canvas.height - this.radius; 
    this.dx = this.power * directionX;
    this.dy = this.power * directionY;
    
    this.draw = function () {
        c.beginPath();
        c.drawImage(this.img, this.x, this.y, this.width, this.height);
        /*
        c.fillStyle = 'yellow';
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        c.fill();
        */
        c.closePath();
    }
    
    this.update = function () {
        this.x += this.dx;
        this.y += this.dy;
        
        if (this.x < this.minX || this.x > this.maxX || this.y < this.minX || this.y > this.maxY) { return true; }
        return false;
    }
    
} // End projectile

function Mine(initX, initY) {
    this.img = document.getElementById('mine-model');
    this.x = initX;
    this.y = initY;
    this.width = 40;
    this.height = 5;
    this.dy = 2;
    
    this.draw = function () {
        c.beginPath();
        //c.fillStyle = 'rgba(0,80,90,1)';
        //c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        //c.rect(this.x, this.y, this.width, this.height);
        //c.fill();
        c.drawImage(this.img, this.x, this.y, this.width, this.height);
        c.closePath();
    }
    
    this.update = function () {
        if (this.y + this.height + 40 > innerHeight) { 
            this.dy = 0; 
        }
        this.y += this.dy;
        this.draw();
    }    
} //end Mine