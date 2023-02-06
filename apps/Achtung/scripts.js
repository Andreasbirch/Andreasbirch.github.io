const CANVASWIDTH = 1000;
const CANVASHEIGHT = 500;

window.onload = function() {
    myGameArea.start();
    player = new component(10, 10, "red", CANVASWIDTH/2, CANVASHEIGHT/2, 0);
  }

  var paths = {};
  
  var myGameArea = {
    canvas : document.getElementById("canvas"),
    start : function() {
      this.canvas.width = CANVASWIDTH;
      this.canvas.height = CANVASHEIGHT;
      this.context = this.canvas.getContext("2d");
      document.body.insertBefore(this.canvas, document.body.childNodes[0].nextSibling);
      this.interval = setInterval(updateGameArea, 10);
    },
    clear : function() {
      // this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    drawPaths: function() {

    }
  }

function component(width, height, color, x, y, angle) {
  this.width = width;
  this.height = height;
  this.angle = angle;
  this.speed = 0;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function() {

  }
  this.newPos = function() {
    movePlayer();
    this.x += this.speed * Math.cos((this.angle*Math.PI/180) * 2);
    this.y += this.speed * Math.sin((this.angle*Math.PI/180) * 2);
    if(paths[`${Math.round(this.x)}-${Math.round(this.y)}`] == undefined) {
      paths[`${Math.round(this.x)}-${Math.round(this.y)}`] = true;
    }
  }
  this.rotate = function() {
    var ctx = myGameArea.context;
    // first save the untranslated/unrotated context
    ctx.save();
    
    
    ctx.beginPath();
    // move the rotation point to the center of the rect
    ctx.translate( this.x+this.width/2, this.y+this.height/2 );
    // rotate the rect
    ctx.rotate((this.angle*Math.PI/180)*2);
    
    // draw the rect on the transformed context
    // Note: after transforming [0,0] is visually [x,y]
    //       so the rect needs to be offset accordingly when drawn
    ctx.rect( -this.width/2, -this.height/2, this.width, this.height);
    
    ctx.fillStyle="red";
    ctx.fill();
    
    // restore the context to its untranslated/unrotated state
    ctx.restore();
    if(paths[`${Math.round(this.x)}-${Math.round(this.y)}`] == undefined) {
    }
  }
  this.drawPath = function() {
    var ctx = myGameArea.context;
    var canvasData = ctx.getImageData(0, 0, CANVASWIDTH, CANVASHEIGHT);
    // ctx.scale(0.5,0.5);
    // ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  this.checkCollision = function() {
    if(paths[`${Math.round(this.x)}-${Math.round(this.y)}`]) {
      console.log("du døde");
      this.x = CANVASWIDTH/2;
      this.y = CANVASHEIGHT/2;
      this.speed = 0;
    }
  }
}

function updateGameArea() {
  myGameArea.clear();
  player.newPos();
  player.rotate();
  player.drawPath();
  player.update();

  //Update display text
  $('#x').text(player.x);
  $('#y').text(player.y);
  $('#x-rounded').text(Math.round(player.x));
  $('#y-rounded').text(Math.round(player.y));
  $('#angle').text(player.angle);
}

//Collection of currently pressed keys
var keystate = {};

//Eventlistener for movement
document.addEventListener('keydown',function(e){
  keystate[e.key] = true;
}, false);    
document.addEventListener('keyup',function(e){
  keystate[e.key] = false;
}, false);


//Handle rotating movement
function movePlayer() {
  if(keystate['ArrowLeft']) {
    player.speed = 1;
    if(angle >= 0) {
      player.angle = 0;
    }
    player.angle -= 1;
  } else if (keystate['ArrowRight']) {
    player.speed = 1;
    if(angle <= 0) {
      player.angle = 0;
    }
    player.angle += 1;
  } 
  if(keystate['p']) {
    player.speed = 0;
  }
}