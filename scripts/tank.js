var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

var teclado = { 
    left: false, 
    right: false, 
    up: false, 
    down: false, 
    shoot: false, 
    use: false, 
    enter: false
};

window.addEventListener("keydown", function (event) {
    if(!liv.GameOver()){  
        var tecla = event.keyCode; 
    }
    event.preventDefault();
    switch (tecla) {
        case 37:
            teclado.left = true;
            break;
        case 38:
            teclado.up = true;
            break;
        case 39:
            teclado.right = true;
            break;
        case 40:
            teclado.down = true;
            break;
        default:
            break;
    }
});

window.addEventListener("keyup", function (event) {
    if(!liv.GameOver()){  
        var tecla = event.keyCode;
    }
    event.preventDefault();
    switch (tecla) {
        case 37:
            teclado.left = false;
            break;
        case 38:
            teclado.up = false;
            break;
        case 39:
            teclado.right = false;
            break;
        case 40:
            teclado.down = false;
            break;
        case 32: 
            teclado.shoot = true;
            break;
        case 90:
            teclado.use = true;
            break;
        case 13:
            teclado.enter = true;
        default:
            break;
    }  
});


// ----- Función constructor del tanque ------ //
function Tank(x, dx) {
    this.x = x;
    this.y = (innerHeight-100);
    this.width = 97;
    this.height = 70;
    this.dx = dx;
    this.color = '#557055';
    this.cannonWidth = 16;
    this.cannonHeight = -46;
    this.cannonAngle = 0;
    this.projectiles = [];
    this.mines = [];
    this.img1 = document.getElementById('tank-model');
    this.img2 = document.getElementById('tankturret-model');
    this.img3 = document.getElementById('tankexplode-model');
    
  this.draw = function () {
    //Dibuja campo de Batalla
    c.beginPath();
    c.rect(0, (innerHeight-70), innerWidth, 75);
    c.fillStyle = 'rgba(0,0,0,0.1)';
    c.fill();
    c.closePath();

    //Dibuja proyectiles//
    for (var i=0; i<this.projectiles.length; i++) {
        this.projectiles[i].draw();
    }

     //Dibuja canón
    c.save();
    c.translate(this.x+50,(innerHeight-70));
    c.rotate(this.cannonAngle);
    c.drawImage(this.img2, -this.cannonWidth/2 - 2, -20, this.cannonWidth, this.cannonHeight);
    c.restore();
    
    //Dibuja tanque
    c.drawImage(this.img1, this.x, this.y, this.width, this.height);
      
    //Dibuja minas//
      for (var i=0; i<this.mines.length; i++) {
          this.mines[i].draw();
      }   
  }
  
  //---Método para disparar---//
  this.fire = function () {
      var directionX = Math.cos(this.cannonAngle + 3 * Math.PI/2);
      var directionY = Math.sin(this.cannonAngle + 3 * Math.PI/2);
      
      var initX = (this.x + 50) + this.cannonWidth * directionX;
      var initY = (innerHeight-70) + this.cannonWidth * directionY;
      
      var projectile = new Projectile(initX, initY, directionX, directionY);
      this.projectiles.push(projectile);
      
  }
  
  //---Método para plantar minas---//
  this.setMine = function () {
      if(this.mines.length < 3){
          var m = new Mine(this.x + this.width / 2, this.y + this.height / 2);
          this.mines.push(m);
      }
  }
  
  /*this.explode = function (destruction) {
    c.drawImage(destruction, this.x, this.y, this.width, this.height);
  }*/
  
  //--Función update--//
  this.update = function () {
    if (this.x + 90 >= innerWidth) {
      this.x = innerWidth - 90;
    }
    
    if (this.x < 0)
      this.x = 0;
    
    if(teclado.right) {
      this.x += this.dx;
    }
    else if (teclado.left) {
      this.x -= this.dx;
    }

    
    if (teclado.up) {
      if (this.cannonAngle < Math.PI/4) {
          this.cannonAngle += Math.PI/160;
      }
    } else if (teclado.down) {
        if (this.cannonAngle > -Math.PI/4) {
            this.cannonAngle -= Math.PI/160;
        }
    }
    
    //Si presiono Spacebar, activo la función fire.
    if (teclado.shoot) {
        this.fire();
        teclado.shoot = false;
    }
    
    //Si presiono Z, planto una mina
    if (teclado.use) {
        this.setMine();
        teclado.use = false;
    }
     
    // Aquí se hace update de los proyectiles. Al retornar true voy eliminando los proyectiles del arreglo en 1
    for (var i=0; i<this.projectiles.length; i++) {
        this.projectiles[i].update();
        if(this.projectiles[i].update()){
            this.projectiles.splice(i,1);
        }
    }
      
    for (var i=0; i<this.mines.length; i++) {
        this.mines[i].update();
    }
      
      this.draw();
    }
     
}