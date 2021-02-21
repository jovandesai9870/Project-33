var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions = [];
var particle;

var divisionHeight=300;
var score =0;
var gameState="play";
var cnt=0;

function setup() {

  createCanvas(800, 800);

  engine = Engine.create();
  world = engine.world;


  ground = new Ground(width/2,height,width,20);

   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }
    
}
 


function draw() {
  background("lightblue");

  //To display score
  textSize(20)
  fill("red");
  text("Score : "+score,20,30);

  textSize(35)
  text(" 500 ", 3, 790);
  text(" 500 ", 80, 790);
  text(" 500 ", 160, 790);
  text(" 500 ", 240, 790);
  text(" 100 ", 320, 790);
  text(" 100 ", 400, 790);
  text(" 100 ", 480, 790);
  text(" 200 ", 560, 790);
  text(" 200 ", 640, 790);
  text(" 200 ", 720, 790);

  Engine.update(engine);

  //END STATE
  if ( gameState==="end") {
    textSize(100);
    text("GameOver", 150, 250);
  }
 
  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }

   
   if(particle!=null)
   {
      particle.display();
       
       if (particle.body.position.y>760 && particle.body.position.x>0)
       {
             if (particle.body.position.x < 300) 
             {
                 score=score+500;      
                 particle=null;
                 if ( cnt>= 3) gameState ="end";                          
             }


             else if (particle.body.position.x < 600 && particle.body.position.x > 301 ) 
             {
                   score = score + 100;
                   particle=null;
                   if ( cnt>= 3) gameState ="end";

             }
             else if (particle.body.position.x < 900 && particle.body.position.x > 601 )
             {
                   score = score + 200;
                   particle=null;
                   if ( cnt>= 3)  gameState ="end";

             }      
             
       }
 
     }
 
   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }

}

function mousePressed()
{
  if(gameState!=="end")
  {
      cnt++;
     particle =new Particle(mouseX, 10, 10, 10); 
  }   
}
function keyPressed(){
  if(keyCode===32){
    gameState="play";
    cnt=0;
    score=0;
  }
}