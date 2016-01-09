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
enemyImg.src = "images/slime.gif";

var isBuilding = false;
$("#game-canvas").click(
  function(){
    if(cursor.x > 0 && cursor.x < 64 && cursor.y > 0 && cursor.y < 64){
      isBuilding = !isBuilding
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

var enemy = {
  x: 96,
  y: 448,
  direction:{x: 0, y:-1},
  speed: 64, 
  move: 
    function(){
      this.x += this.direction.x * this.speed/FPS
      this.y += this.direction.y * this.speed/FPS
      if(this.y < 0){
        this.y = 448
      }
    } 
};

var enemyPath = [
  {x:96, y:64},
  {x:384, y:64},
  {x:384, y: 192},
  {x:224, y: 192},
  {x:224, y: 320},
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
  y: 0 
};

$("#game-canvas").mousemove( 
   function(event){
    cursor.x = event.offsetX;
    cursor.y = event.offsetY;
    }
  );
  

function draw(){
  //enemy.move();
  ctx.drawImage(bgImg,0,0);
  ctx.drawImage(heroImg, hero.x, hero.y);
  ctx.drawImage(towerImg, 0, 0, 64, 64 );
  if(isBuilding === true){
    ctx.drawImage(SmallTowerImg, cursor.x, cursor.y);
  }
  ctx.drawImage(SmallTowerImg2, tower.x, tower.y);
  ctx.drawImage(enemyImg, 542, 320 );
}


// setTimeout(draw,1000);
setInterval(draw, 16);
