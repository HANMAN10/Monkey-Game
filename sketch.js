var ground, ground2, monkey, stones, banana, gameOver;
var play, end, gameState, survTime, banCaught;
var ground2Image, groundImage, monkeyAnimation, stonesImage, bananaImage, gameOverImage, monkeyEnd;
var obstacleGroup, bananaGroup;

function preload() {
  ground2Image = loadImage("jungle.jpg");
  groundImage = loadImage("ground.jpg");
  monkeyAnimation = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  stonesImage = loadImage("stone.png");
  gameOverImage = loadImage("gameOver.png");
  bananaImage = loadImage("Banana.png");
  monkeyEnd = loadImage("Monkey_01.png");
  }

function setup() {
   createCanvas(400, 400);

  // Ground
  ground = createSprite(100, 400, 800, 30);
  ground.visible = false;

  // Ground with grass
  ground2 = createSprite(200, 200, 400, 400);
  ground2.addImage("jungle", ground2Image);
  ground2.scale = 0.8; 

  // Monkey
  monkey = createSprite(60, 350, 50, 50);
  monkey.addAnimation("runningMonkey", monkeyAnimation);
  monkey.scale = 0.1;
  monkey.setCollider("circle", 0, 0, 330);
    
  // Game State
  play = 1;
  end = 0;
  gameState = play;
  
  // Survival time
  survTime = 0;

  // Bananas caught
  banCaught = 0;

  // Groups
  obstacleGroup = new Group();
  bananaGroup = new Group(); 
  }

  function draw() {
    background(220);
    
    if(gameState === play) {
    
      // Velocity of ground
      ground2.velocityX = -4;
      
      // Monkey collide
      monkey.collide(ground);

      // Reset
      if(ground2.x < 0) {
        ground2.x = ground.width/2;
      }

      // Space key command                                                                    
      if(keyDown("space") && monkey.y >= 352) {
        monkey.velocityY = -10;
      }

      // Gravity for monkey
      monkey.velocityY += 0.5;

      survTime = Math.round(frameCount/getFrameRate());
      
      spawnStones();
      spawnBananas();

      if(obstacleGroup.isTouching(monkey)) {
        gameState = end;
      }

      if(bananaGroup.isTouching(monkey)) {
        bananaGroup.destroyEach(); 
        banCaught += 1;
      }
  }
  else if(gameState === end) {
    ground2.velocityX = 0;
    ground2.destroy();
    
    monkey.collide(ground);
    monkey.addImage("monkeyCollided", monkeyEnd);
    
    background(0, 0, 0);

    var gameOver = createSprite(200, 200, 50, 50);
    gameOver.addImage("gameOver", gameOverImage);
    gameOver.scale = 0.9; 

    obstacleGroup.setLifetimeEach(World.frameCount + 1);
    bananaGroup.setLifetimeEach(World.frameCount + 1);

    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
  }
    
    drawSprites();
    
  textSize(20);
  stroke("black");
  fill("white");
  text("Survival Time: " + survTime, 230, 50);
  text("Bananas Caught: " + banCaught, 10, 50);
}

// Function to draw stones/obstacles
function spawnStones() {
  
  if(World.frameCount % 50 === 0) {
  // Stones var
  stones = createSprite(450, 360, 50, 50);
  stones.addImage("stones", stonesImage);
  stones.scale = 0.15;
  stones.velocityX = -(10 + survTime/3);
  stones.lifetime = 150;
  stones.setCollider("circle", 0, 0, 200);
  
  // Group added
  obstacleGroup.add(stones);
  }
}

// Function to spawn bananas
function spawnBananas() {
  
  if(World.frameCount % 50 === 0) {
  // bananas var
  var banana = createSprite(450, 300, 50, 50);
  banana.addImage("Banana", bananaImage);
  banana.scale = 0.05;
  banana.velocityX = -(10 + survTime/3);
  banana.lifetime = 150;
  
  // Group added
  bananaGroup.add(banana);
  }
}