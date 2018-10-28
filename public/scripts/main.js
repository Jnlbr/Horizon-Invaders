var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// Funciones especiales
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    tank.draw();
    for (var i = 0; i < p.length; i++) {
            p[i].draw();
        }
});

function titleScreen () {
    var textLight = ['lightgrey', 'transparent', 'lightgrey', 'transparent'];
    
    this.draw = function () {
        c.beginPath();
        c.font = '40px Kenney Future Narrow';
        c.fillStyle = 'black';
        c.strokeStyle = 'yellow';
        c.textAlign = 'center';
        c.fillText(':: HORIZON INVADERS ::', innerWidth/2, innerHeight/2);
        c.closePath();
        
        c.beginPath();
        c.font = '12pt Trebuchet MS';
        c.fillStyle = 'black';
        c.textAlign = 'center';
        c.fillText('A War in Javascript & HTML5 Canvas', innerWidth/2, innerHeight/2 + 25);
        c.closePath();
        
        c.beginPath();
        c.font = '16pt Trebuchet MS';
        c.fillStyle = textLight[randomIntFromRange(0,3)];
        c.textAlign = 'center';
        c.fillText('Presione "Enter" para comenzar el juego', innerWidth/2, innerHeight/2 + 80);
        c.closePath();
    
    }
    this.update = function () {
        this.draw();
    }
}

function keepPlaying () {
    this.draw = function () {
        c.beginPath();
        c.font = '16pt Trebuchet MS';
        c.fillStyle = textLight[randomIntFromRange(0,3)];
        c.fillText('Presione "Enter" para continuar', innerWidth/2 - 200, innerHeight/2 + 50);
        c.closePath();
    }
    
    this.update = function () {
        this.draw();
    }
}


// -------- Implementación -------- //

var tank = new Tank( (innerWidth/2), 5);
var scr = new Score();
var liv = new Lives();
var avion = [];
var enemy1 = document.getElementById('enemy-model');
var enemy2 = document.getElementById('enemy-model2');
var enemyImg = [enemy1, enemy2];
var title = new titleScreen();
var contin = new keepPlaying();
var p = []
var numberAirplane = 5;

for (var i = 0; i < numberAirplane; i++) {
    var y = randomIntFromRange(20 * 2, (innerHeight * 0.4));
    var dx = randomIntFromRange(3, 10);
    var x = randomIntFromRange(-2000,-100);
    var trooperX = randomIntFromRange(0,innerWidth);
    avion.push(new Airplane(x, y, dx, 0.5, 30, enemyImg[randomIntFromRange(0,1)], trooperX));
}


// Bucle infinito del juego. La "animación" comienza aquí
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    
    if ((!teclado.enter) || (liv.GameOver())) {
        title.update ();
        play('bgm1');
		teclado.enter = false;
		if (liv.GameOver()) {
			liv.setAllLives();
			scr.trueSet(0);
		}
    } else {
        
    tank.update();
    scr.update();
    liv.update();
    
    // ----Colisiones bala-avión---- //
    for (var i = 0; i < avion.length; i++){
        if (tank.projectiles.length > 0) {
            for (var j = 0; j < tank.projectiles.length; j++) {
                if (tank.projectiles[j] && avion[i]) {
                    if (AirCollision(avion[i], tank.projectiles[j])) {
                        scr.setScore();
                        p.push(new Paratrooper(avion[i].x, avion[i].y, 10, 20, 2));
                        avion.splice(i, 1);
                        tank.projectiles.splice(j, 1);
                        play('enemy-f1');
                    }
                }
            }
        }
        if (avion[i] && (avion[i].x + avion[i].radius > innerWidth)) {
            avion.splice(i,1);
        }
        while (avion.length < numberAirplane) {
            var dx = randomIntFromRange(3, 10);
            var y = randomIntFromRange(20 * 2, (innerHeight * 0.4));
            var x = randomIntFromRange(-1000, -100);
            var trooperX = randomIntFromRange(0, innerWidth);
            avion.push(new Airplane(0, y, dx, 0.5, 30, enemyImg[randomIntFromRange(0,1)], trooperX));; // No espera, los genera de una vez
        }
        avion[i].update(); 
    }
    
    // ----Colisiones bala-trooper---- //
        for (var i = 0; i < p.length; i++) {
        if (tank.projectiles.length > 0) {
            for (var j = 0; j < tank.projectiles.length; j++) {
                if (tank.projectiles[j] && p[i]) {
                    if (ParaCollision(p[i], tank.projectiles[j])) {
                        console.log('collide');
                        scr.setScore();
                        p.splice(i, 1);
                        tank.projectiles.splice(j, 1);
                        play('enemy-f2');
                    }
                }
            }
        }
        if (p[i])
            p[i].update();
    }
        
    // ----Colisiones mina-trooper ---- //
    for (var i = 0; i < p.length; i++) {
        if (tank.mines.length > 0) {
            for (var j = 0; j < tank.mines.length; j++) {
                if (GroundCollision(p[i], tank.mines[j])) {
                    p.splice(i,1);
                    tank.mines.splice(j,1);
                    play('enemy-f2');
                }
            }
        }
    }
        
    // ----Colisiones tanque-trooper---- //
    for (var i = 0; i < p.length; i++) {
        if (GroundCollision(p[i], tank)) {
                p.splice(i, 1);
                liv.setLessLives();
                play('you_lose_a_life');
         }
    }

    if (liv.GameOver()) {
        liv.drawGameOver();
        pause('bgm1');
        if (!teclado.enter) {
            contin.update();
        } else {
            
        }
    }

    }//aquí termina el "else"

} /*Aquí termina la función animación*/

animate();