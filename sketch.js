const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world,backgroundImg,towerImg;

var canvas,angle,tower,ground,canon;
var cannonball;
var balls=[];

function preload() {
 backgroundImg=loadImage("./assets/background.gif");
 towerImg=loadImage("./assets/tower.png");
}
function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  
/*var options={
 isStatic:true
}*/
 
angleMode(DEGREES);
angle=15;

 ground= Bodies.rectangle(0,height-1, width*2,1,{isStatic:true});
 World.add(world,ground);

 tower= Bodies.rectangle(160,350, 160,310,{isStatic:true});
 World.add(world,tower);

 canon = new Cannon(180,110,130,100,angle);
 
 cannonball=new CannonBall (canon.x,canon.y);

}

function draw() {
  background(189);
  image(backgroundImg,0,0,width,height);
  Engine.update(engine);
 
  push();
   fill("brown"); 
   rectMode(CENTER); 
   rect(ground.position.x, ground.position.y, width * 2, 1); 
   pop(); 

   push(); 
   imageMode(CENTER); 
   image(towerImg, tower.position.x, tower.position.y, 160, 310); 
   pop();

   for(var i = 0; i<balls.length; i++){
     showCannonBalls(balls[i]);
   }
  canon.display();
  //cannonball.display();
}
function keyPressed(){
  if(keyCode==DOWN_ARROW){
    var cannonball=new CannonBall(canon.x,canon.y);
    cannonball.trajectory=[];
    Matter.Body.setAngle(cannonball.body,canon.angle);
    balls.push(cannonball);
}
}

function keyReleased(){
  if (keyCode===DOWN_ARROW){
    balls[balls.length-1].shoot();
  }
}
function showCannonBalls(ball){
  if(ball){
    ball.display();
  }
}