var canvas;
var pollGroup1;
var pollGroup2;
var poll1I;
var poll2I;
var flappybirdI
var backgroundI;
var gravity = 0.9;
var power = 0;
var lift = -2;
var gamestate;
var play = 1;
var end = 2;
var flappyLogoI;
var flappyrun;
var flappyrunI;
var gameoverI;
var hit;
var flapp1;
var instructionsI;
var flappybirdyI;
var backanimation;
var music;
var spikeI;
var spikeGroup;
function preload() {
  poll1I = loadImage("./flappypipe.png");
  poll2I = loadImage("./flappypipe2.png");
  backgroundI = loadImage("./flappy.png");
  flappyLogoI = loadImage("./logoflappy.png");
  flappyrunI = loadImage("./run.jpeg");
  gameoverI = loadImage("./gameover.png");
  hit = loadSound("./hit.mp3");
  flapp1 = loadAnimation("flappyani1.png","flappyani2.png");
  instructionsI = loadImage("./instructions.png");
  flappybirdyI = loadAnimation("./flappyani1.png");
  music = loadSound("./die.mp3");
  spikeI = loadImage("./trapper.png");
}
function setup() {

  var canvas = createCanvas(windowWidth,windowHeight);
  pollGroup1 = new Group();
  pollGroup2 = new Group();
  spikeGroup = new Group();
  flappybird = createSprite(width/2,height/2,50,50);
  flappybird.addAnimation("flapping",flapp1);
  flappybird.addAnimation("flapp",flappybirdyI);
  flappyLogo = createSprite(width/2,height/2-100,50,50);
  flappyLogo.addImage(flappyLogoI);
  flappyrun = createSprite(width/2,height/2+100,50,50);
  flappyrun.addImage(flappyrunI);
  gameover = createSprite(width/2,height/2,50,50);
  gameover.addImage(gameoverI);
  gameover.visible = false;
  flappyreset = createSprite(width/2,height/2+100,50,50);
  flappyreset.addImage(flappyrunI);
  flappyreset.visible = false;
  instructions = createSprite(width/2,height/2+200);
  instructions.addImage(instructionsI);
  instructions.scale = 0.4;
}

function draw(){
background(backgroundI);
if (mousePressedOver(flappyrun)) {
  gamestate = play;
}

  if (gamestate ===  play) {
if (mouseIsPressed) {
  power += lift;
}
flappyLogo.visible = false;
instructions.visible = false;
flappyrun.visible = false;
  spawnpoll1();
  spawnpoll2();
spawnspike();
flappybird.setCollider("circle", 0, 0,15);
power += gravity;
flappybird.position.y += power;

if (flappybird.position.y > height) {
  flappybird.position.y = height;
  power = 0;
}
if (flappybird.position.y < 0) {
  flappybird.position.y = 0;
  power = 0;


}
if(pollGroup2.isTouching(flappybird) ){
hit.play();
  gamestate = end;
  flappybird.changeAnimation("flapp",flappybirdyI);
}
if(pollGroup1.isTouching(flappybird) ){
  hit.play();
    gamestate = end;
      flappybird.changeAnimation("flapp",flappybirdyI);
}
if(spikeGroup.isTouching(flappybird) ){
  music.play();
    gamestate = end;
      flappybird.changeAnimation("flapp",flappybirdyI);
}
}
drawSprites();
if (gamestate === end) {
  pollGroup1.setVelocityXEach(0);
  pollGroup1.setLifetimeEach(-1);
  pollGroup2.setVelocityXEach(0);
  pollGroup2.setLifetimeEach(-1);
  spikeGroup.setVelocityXEach(0);
  spikeGroup.setLifetimeEach(-1);
  flappyrun.visible = false;
  flappyLogo.visible = false;
  gameover.visible = true;
  flappyreset.visible = true;
  instructions.visible = false;
  if (mousePressedOver(flappyreset)) {
    reset();
  }
}
}
function spawnpoll1(){
if(frameCount % 80 ===0){
var poll1 = createSprite(width+200,random(0,200),10,10);
poll1.velocity.x = -8;
poll1.lifetime = 500;
poll1.addImage(poll1I);
pollGroup1.add(poll1);
}
}
function spawnpoll2(){
if(frameCount % 80 ===0){
var poll2 = createSprite(width+200,height-20,10,10);
poll2.addImage(poll2I);
poll2.lifetime = 500;
poll2.velocity.x = -8;
pollGroup2.add(poll2);
}
}
function spawnspike(){
if(frameCount % 10 ===0){
var spike = createSprite(width+200,height-20,10,10);
spike.addImage(spikeI);
spike.lifetime = 500;
spike.velocity.x = -8;
spikeGroup.add(spike);
}
}

function reset() {
  gamestate = play;
  pollGroup1.destroyEach();
  pollGroup2.destroyEach();
  spikeGroup.destroyEach();
  gameover.visible = false;
  flappyreset.visible = false;
  flappybird.changeAnimation("flapping",flapp1);
}
