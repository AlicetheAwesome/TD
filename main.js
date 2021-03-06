var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");

var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var heroImg = document.createElement("img");
heroImg.src = "images/jason.gif";
var towerImg = document.createElement("img");
towerImg.src = "images/tower-btn.png";
var SmallTowerImg = document.createElement("img");
SmallTowerImg.src = "images/tower.png";
var SmallTowerImg2 = document.createElement("img");
SmallTowerImg2.src = "images/tower.png"; 
var enemyImg = document.createElement("img");
enemyImg.src = "images/rukia.gif";
var crosshairImg = document.createElement("img");
crosshairImg.src = "images/crosshair.png";

var isBuilding = false;
$("#game-canvas").click(
  function(){
    if(cursor.x > 0 && cursor.x < 64 && cursor.y > 0 && cursor.y < 64){
      isBuilding = !isBuilding;
      $("#SmallTowerImg2").show();
    }else{
      $("#SmallTowerImg2").hide();
    }
    if (isBuilding === true){
      tower.x = cursor.x;
      tower.y = cursor.y;
    }
  }
);

var FPS = 64;

var enemies = [];

var clock = 0;

function Enemy(){
  this.x =  96;
  this.y = 448;
  this.direction = {x: 0, y:-1};
  this.speed = 64; 
  this.pathDes = 0;
  this.hp = 10;
  this.move = function(){
      this.x += this.direction.x * this.speed/FPS;
      this.y += this.direction.y * this.speed/FPS;
      if (isCollided(enemyPath[this.pathDes].x,enemyPath[this.pathDes].y,this.x,this.y,this.speed/FPS,this.speed/FPS) === true){
        this.x = enemyPath[this.pathDes].x;
        this.y = enemyPath[this.pathDes].y;
        this.pathDes = this.pathDes + 1;
        var unitVector = getUnitVector(this.x, this.y, enemyPath[this.pathDes].x, enemyPath[this.pathDes].y);
        this.direction.x = unitVector.x;
        this.direction.y = unitVector.y;
      }
    };
}

function isCollided ( pointX, pointY, targetX, targetY, targetWidth, targetHeight ) {
  if(    
    pointX >= targetX
    &&  pointX <= targetX + targetWidth
    &&  pointY >= targetY
    &&  pointY <= targetY + targetHeight
  ){
    return true;
  }  else{
    return false;
  }
}


function getUnitVector (srcX, srcY, targetX, targetY) {
    var offsetX = targetX - srcX;
    var offsetY = targetY - srcY;
    var distance = Math.sqrt( Math.pow(offsetX,2) + Math.pow(offsetY,2) );
    var unitVector = {
        x: offsetX/distance,
        y: offsetY/distance
    };
    return unitVector;
}

var HP = 100;

var enemyPath = [
  {x:96, y:64},
  {x:384, y:64},
  {x:384, y:192},
  {x:224, y:192},
  {x:224, y:320},
  {x:542, y:320},
  {x:542, y:96}
];

var hero = {
  x: 0,
  y: 0
};

var cursor = {
  x: 0, 
  y: 0 
};

var tower = {
  x: 0, 
  y: 0,
  range: 96,
  aimingEnemyId: null,
  searchenemy: function(){
    for(var i=0; i<enemies.length; i++){
      var distance = Math.sqrt( 
        Math.pow(this.x-enemies[i].x,2) + Math.pow(this.y-enemies[i].y,2)
      );
      if (distance<=this.range) {
        this.aimingEnemyId = i;
        return;
      }
    }
  }  
};

$("#game-canvas").mousemove( 
  function(event){
    cursor.x = event.offsetX;
    cursor.y = event.offsetY;
  }
);
  

function draw(){
  if(clock % 80 == 0){
    var newEnemy = new Enemy();
    enemies.push(newEnemy);
  }
  ctx.drawImage(bgImg,0,0);
  ctx.drawImage(heroImg, hero.x, hero.y);
  ctx.drawImage(towerImg, 0, 0, 64, 64 );
  ctx.fillText("HP:" + HP, 100, 50);
  ctx.font = "24px Verdana";
  ctx.fillStyle = "white";
  if(isBuilding === true){
    ctx.drawImage(SmallTowerImg, cursor.x, cursor.y);
  }
  ctx.drawImage(SmallTowerImg2, tower.x, tower.y);
  for(i = 0 ; i < enemies.length ; i++){
    if (enemies[i].hp <= 0){
      enemies.splice(i, 1);
    }else{
      enemies[i].move();
      ctx.drawImage(enemyImg, enemies[i].x, enemies[i].y);
    }
  }
  // if (tower.aimingEnemyId !== null){
  //   ctx.drawImage(crosshairImg, enemies[tower.aimingEnemyId].x, enemies[tower.aimingEnemyId].y);
  // }
  clock++; 
}

// setTimeout(draw,1000);
setInterval(draw, 16);
