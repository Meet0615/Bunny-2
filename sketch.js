const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope;
var fruit_con;

function  preload(){
backgroundImage = loadImage("background.png");
fruitImage = loadImage("melon.png");
bunnyImage = loadImage("Rabbit-01.png");
blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
eat = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
blink.playing = true
eat.playing = true
eat.looping = false
sad.playing = true
sad.looping = false
cuttingSound = loadSound("Cutting Through Foliage.mp3");
eatingSound = loadSound("eating_sound.mp3");
ropeSound = loadSound("rope_cut.mp3");
backgroundSound = loadSound("sound1.mp3");
blowerImage = loadImage("blower.png");
}


function setup() 
{
  var ismobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if(ismobile){
    canw = displayWidth
    canh = displayHeight
    createCanvas(displayWidth+80,displayHeight)
  }
  else{
    canw = windowWidth
    canh = windowHeight
    createCanvas(windowWidth,windowHeight)
  }

  backgroundSound.play();
  backgroundSound.setVolume(0.1);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,canh,600,20);

  rope = new Rope(8,{x:245,y:30});
  rope2 = new Rope(7,{x:370,y:40});
  rope3 = new Rope(4,{x:400,y:225});
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link(rope2,fruit);
  fruit_con3 = new Link(rope3,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);

  bunny = createSprite(170,canh-80,100,100);
  bunny.addAnimation("bunnyAnimation",blink);
  bunny.addAnimation("bunnyeating",eat);
  bunny.addAnimation("crying",sad);
  bunny.changeAnimation("bunnyAnimation");
  blink.frameDelay = 20
  eat.frameDelay = 20

  bunny.scale = 0.2;

  button1 = createImg("cut_button.png")
  button1.position(200,30);
  button1.size(50,50);
  button1.mouseClicked(drop);

  button2 = createImg("cut_button.png")
  button2.position(330,35);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  button3 = createImg("cut_button.png")
  button3.position(360,200);
  button3.size(50,50);
  button3.mouseClicked(drop3);

  blower = createImg("blower.png")
  blower.position(10,250);
  blower.size(150,100);
  blower.mouseClicked(airblow);

  mutebutton = createImg("mute.png")
  mutebutton.position(450,20);
  mutebutton.size(50,50);
  mutebutton.mouseClicked(mute);
}

function draw() 
{
  background(51);
image(backgroundImage,width/2,height/2,displayWidth+80,displayHeight);
push();
if(fruit!=null){
image(fruitImage,fruit.position.x,fruit.position.y,60,60);
}
pop();

 




  rope.show();
  rope2.show();
  rope3.show();
  //ellipse(fruit.position.x,fruit.position.y,30,30);
  Engine.update(engine);
  ground.show();
  drawSprites();
  if(collide(fruit,bunny)===true){
    bunny.changeAnimation("bunnyeating") 
    eatingSound.play();
  }
  if(fruit!=null&&fruit.position.y>=650){
    bunny.changeAnimation("crying")
    //cryingSound.play();
    fruit = null
  }
}

function drop(){
rope.break();
ropeSound.play();
fruit_con.detach()
fruit_con = null
}

function drop2(){
  rope2.break();
  ropeSound.play();
  fruit_con2.detach()
  fruit_con2 = null
  }

function drop3(){
  rope3.break();
  ropeSound.play();
  fruit_con3.detach()
  fruit_con3 = null
  }

function collide(fruit,bunny){
  if(fruit!=null){
    var d = dist(fruit.position.x,fruit.position.y,bunny.position.x,bunny.position.y);
    if(d<50){
      World.remove(engine.world,fruit);
      fruit = null
      return true 
    }
    else{
      return false
    }
  }
}

function airblow(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.05,y:0})

}

function mute(){
  if(backgroundSound.isPlaying()){
    backgroundSound.stop()
  }
  else(backgroundSound.play())
}