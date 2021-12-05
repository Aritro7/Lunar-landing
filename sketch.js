let ground;
let lander;
var lander_img;
var bg_img, thrust, left_thrust, right_thrust, normal, crash;
var lz_Img, obs_Img, obs, lz, landing;


var fuel=100;
var g = 0.05;
var vy = 0;
var vx = 0;

function preload()
{
  lander_img = loadImage("normal.png");
  bg_img = loadImage("bg.png");
  thrust = loadAnimation("b_thrust_1.png","b_thrust_2.png","b_thrust_3.png");
  left_thrust = loadAnimation("left_thruster_1.png","left_thruster_2.png");
  right_thrust = loadAnimation("right_thruster_1.png","right_thruster_2.png");
  normal = loadAnimation("normal.png");
  crash=loadAnimation("crash1.png","crash2.png", "crash3.png");
  lz_Img=loadImage("lz.png");
  obs_Img=loadImage("obstacle.png");
  landing=loadAnimation("landing1.png", "landing2.png", "landing_3.png");
}

function setup() {
  createCanvas(1000,700);
  frameRate(80);

  lander = createSprite(100,50,30,30);
  lander.addImage(lander_img);
  lander.scale = 0.1;
  lander.debug=true;
  lander.setCollider("rectangle", 0, 0, 1000, 1000);

  lander.addAnimation('thrusting', thrust);
  lander.addAnimation('left', left_thrust);
  lander.addAnimation('right', right_thrust);
  lander.addAnimation('crashing', crash);
  lander.addAnimation('landing', landing);
  //normal.addAnimation('normal', normal);

  obs=createSprite(320, 530, 50, 100);
  obs.addImage(obs_Img);
  obs.scale=0.5;
  obs.setCollider("rectangle", 0, 0, 100, 100);

  ground = createSprite(500, 690, 1000, 20);
  ground.visible=true;
  


  lz=createSprite(880, 450, 50, 30);
  lz.addImage(lz_Img);
  lz.scale=0.8
  lz.setCollider("rectangle", 0, 200, 300, 100);

  rectMode(CENTER);
  textSize(15);
}

function draw() 
{
  background(51);
  image(bg_img,0,0);
  push()
  fill(255);
  text("Vertical Velocity: "+round(vy),800,75);
  text("Horizontal Velocity: " +round(vx), 800, 50);
  text("Fuel: " + fuel, 800, 25);
  pop();

  if(lander.fuel === 0){
    lander.changeAnimation('crashing');
  }

  //fall down
  vy +=g;
  lander.position.y+=vy;

  lander.position.x+=vx;

  //obstacle detection
  if(lander.collide(obs)==true){
      lander.changeAnimation('crashing')
      stop();
  }

  //landing
  var d = dist(lander.position.x, lander.position.y, lz.position.x, lz.position.y); 
  console.log(d);
   
  if(d<35 && (vy<2 && vy>-2) && (vx<2 && vx>-2)){
    console.log("landed");
    vx = 0;
    vy = 0;
    g = 0;
    lander.changeAnimation('landing');
  }

  if(lander.collide(lz)===true){
    stop();
    lander.changeAnimation('landing');
  }

  if(lander.collide(ground)){
    stop();
    lander.changeAnimation('crashing');
  }

  drawSprites();
}

function keyPressed(){
  if(keyCode === UP_ARROW && fuel>0){
      upward_thrust();
      lander.changeAnimation('thrusting');
      thrust.nextFrame();
  }
   
  if(keyCode === RIGHT_ARROW && fuel>0){
    right_Thrust();
    lander.changeAnimation('right');
  }

  if(keyCode === LEFT_ARROW && fuel>0){
    left_Thrust();
    lander.changeAnimation('left');
  }
}

function upward_thrust(){
  vy=vy-1;
  fuel=fuel-1;
}

function right_Thrust(){
  vx = vx+0.2
  fuel=fuel-1
}

function left_Thrust(){
  vx = vx-0.2
  fuel=fuel-1
}


function stop(){
  vx=0;
  vy=0;
  fuel=0;
  g=0;

}






