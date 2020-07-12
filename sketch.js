//Variables required for level 1
var houseStarter;

var mask, maskAnim;
var sanitizer, sanitizerAnim;
var door, doorAnim;



//Variables required for choosing the type of level 2
var demoBut, demoAnim, orignalBut, orignalAnim;

//Player related variables
var player, playerAnim;
var playerY = 270, changeVal = 90;

//Variable for tracks
var track, track2, trackAnim;

//Variables for vaccine
var vaccine, vaccineAnim, vaccineGrp, collectAudio, vaccineCount=0, vaccPassed = 0, spawnSpeed = 40, vaccGoal;
var collectPhase = "notCollected";
var vaccineDisp;

//Variables for virus
var virus=null, virusAnim, virusHealth = 100, virusXSpeed = 0.3, orignalSpeed = 0.35;
var virusColl, virusCollAnim, collideSound;
var boost, boostAnim, boostSound;

//Variables for obstacles
var obstacle, obsAnim, obsGroup;

//Variables for powerUp
var speedUp, speedUpAnim, speedUpGrp, phase="notCollected";

//Variables for counting up
var startTime = 0, frame = 0, count=0;

var heightVal;
var xVelocity = -5;
var score = 0;

var backSound, musicVolume=0.25, soundState=true;

//Variables I use for endCheck() function
var totalMins, totalSec, killVirusGIF;

//Time related variables
var timefontLoad, endFontLoad, time=0, minuteVal, secondVal, minCountdown, secCountdown, goalTime;;

//General Variables
var bgImage; //Variable for changing background
var gameState = 2; //Game state for changing game level
var mousePos; //For mouse position
var lifeCount=2; //Lifecount for total lives



function preload() {
  //Loading all image/animation for level 1
  houseStarter = loadImage("sprites/Level1Spr/startHouse.jpg");
  maskAnim = loadImage("sprites/Level1Spr/faceMask.png");
  sanitizerAnim = loadImage("sprites/Level1Spr/sanitizer.png");
  doorAnim = loadImage("sprites/Level1Spr/door.png");


  //Loading all image/animation for level 2
  playerAnim = loadAnimation("sprites/Level2Spr/RunnerAnim/RunMan1.png", "sprites/Level2Spr/RunnerAnim/RunMan2.png",
                             "sprites/Level2Spr/RunnerAnim/RunMan3.png","sprites/Level2Spr/RunnerAnim/RunMan4.png",
                             "sprites/Level2Spr/RunnerAnim/RunMan5.png", "sprites/Level2Spr/RunnerAnim/RunMan6.png",
                             "sprites/Level2Spr/RunnerAnim/RunMan7.png","sprites/Level2Spr/RunnerAnim/RunMan8.png");
  virusCollAnim = loadAnimation("sprites/level2Spr/boomAnim/boom1.png", "sprites/level2Spr/boomAnim/boom2.png",
                                "sprites/level2Spr/boomAnim/boom3.png", "sprites/level2Spr/boomAnim/boom4.png",
                                "sprites/level2Spr/boomAnim/boom5.png", "sprites/level2Spr/boomAnim/boom6.png",
                                "sprites/level2Spr/boomAnim/boom7.png", "sprites/level2Spr/boomAnim/boom8.png");
  speedUpAnim = loadAnimation("sprites/level2Spr/powerUpBlue/speedUp1.png","sprites/level2Spr/powerUpBlue/speedUp2.png",
                              "sprites/level2Spr/powerUpBlue/speedUp3.png","sprites/level2Spr/powerUpBlue/speedUp4.png",
                              "sprites/level2Spr/powerUpBlue/speedUp5.png","sprites/level2Spr/powerUpBlue/speedUp6.png")

  trackAnim = loadImage("sprites/Level2Spr/track.png");
  vaccineAnim = loadImage("sprites/Level2Spr/VaccineIMG.png");
  virusAnim = loadImage("sprites/Level2Spr/virusAI.png");
  demoAnim = loadImage("sprites/Level2Spr/miniButton.png");
  orignalAnim = loadImage("sprites/Level2Spr/orignalButton.png");
  obsAnim = loadImage("sprites/Level2Spr/rock.png")
  boostAnim = loadImage("sprites/Level2Spr/boostAnim.png")

  timefontLoad = loadFont("sprites/Level2Spr/agencyFB.ttf");
  endFontLoad = loadFont("sprites/Level2Spr/simplifica.ttf");

  collectAudio = loadSound("sprites/Level2Spr/collectAudio.mp3");
  collideSound = loadSound("sprites/Level2Spr/coughSound.mp3");
  backSound = loadSound("sprites/Level2Spr/backSound.mp3");
  boostSound = loadSound("sprites/Level2Spr/boostSound.mp3");

  killVirusGIF = createImg("sprites/Level2Spr/endScene1.gif");
}

function setup(){
  createCanvas(1200, 600);

  killVirusGIF.hide();

  //Making rectangle around mouse;
  mousePos = createSprite(mouseX, mouseY, 5, 5);
  mousePos.visible = false;

  //Main function for creating the whole of level 1
  //setupLevel1();


  //Main function for creating the whole of level 2
  setupLevel2();
}

function draw() {
  background(bgImage);

  mousePos.x = mouseX;
  mousePos.y = mouseY;

  //Main function for running the whole of level 1
  if (gameState < 2) {
    drawLevel1();
  }

  //Main function for running the whole of level 2
  if (gameState >= 2) {
    drawLevel2();
  }


  drawSprites();
}

//Functions for level 1


//Main setup function for level 1
function setupLevel1() {
  bgImage = houseStarter;

  //Making mask
  mask = createSprite(685, 250, 10, 10);
  mask.scale = .5;
  mask.addImage(maskAnim);
  mask.setCollider("rectangle", 0, 0, 110, 125);

  //Making sanitizer
  sanitizer = createSprite(700, 345, 10, 10);
  sanitizer.scale = .5;
  sanitizer.addImage(sanitizerAnim);

  //Making door for going out of house
  door = createSprite(852, 298, 10, 10);
  door.scale = .2015;
  door.addImage(doorAnim);
}

// Main draw function for level 1
function drawLevel1() {
  mousePos.x = mouseX;
  mousePos.y = mouseY;

  mouseHover(mask, .5, "mask", .1);
  mouseHover(sanitizer, .5, "sanitizer", .1);
  mouseHover(door, .2015, "door", .015);
}

function mouseHover(item, scaling, name, scaleAdd) {
  if (item != null) {
    if (mousePos.isTouching(item)) {
      item.scale = scaling + scaleAdd;
      fill("red");
      textSize(25)
      text("Are you sure you want to use the " + name + "?", 350, 25);
    } else {
      item.scale = scaling;
    }
  }
}


//Functions for level 2
  //Main setup function for level 2
  function setupLevel2() {
    bgImage = "white";

    track = createSprite(displayWidth / 2.5, displayHeight / 3 + 50, 50, 50);
    track.scale = 0.85;
    track.addImage(trackAnim);

    track2 = createSprite(track.x + 1395, displayHeight / 3 + 50, 50, 50);
    track2.scale = 0.85;
    track2.addImage(trackAnim);

    demoBut = createSprite(475, 300, 10, 10);
    demoBut.addImage(demoAnim);

    orignalBut = createSprite(demoBut.x + 200, demoBut.y, 10, 10);
    orignalBut.addImage(orignalAnim);


    //Making player sprite
    player = createSprite(displayWidth / 6, playerY, 50, 50);
    player.addAnimation("p1Anim", playerAnim);
    player.scale = 0.55;
    player.setCollider("rectangle", 0, 55, 130, 125);
    player.visible = false;
    //player.debug = true;

    vaccineDisp = createSprite(displayWidth - 350, 40, 10, 10);
    vaccineDisp.addImage(vaccineAnim);
    vaccineDisp.scale = .14;
    vaccineDisp.setCollider("rectangle", 0, 0, 500, 512);
    vaccineDisp.visible = false;


    //Making list of all y position for random generation of obstacles
    heightVal = [playerY - (changeVal * 2), playerY - changeVal, playerY, playerY + changeVal, playerY + (2 * changeVal)];

    //Creating group for vaccine
    vaccineGrp = createGroup();
    speedUpGrp = createGroup();
    obsGroup = createGroup();

    setInterval(scoreIncr, 200); //Calling scoreIncr function every .2 Seconds
    setInterval(timer, 1000);

    backSound = createAudio("sprites/Level2Spr/backSound.mp3", playSong);
    backSound.volume(musicVolume)
    backSound.play();
  }

  //Main draw function for level 2
  function drawLevel2() {

    //Infinite Road Illusion
    track.velocityX = xVelocity;
    track2.velocityX = xVelocity;
    trackReset();


    if (gameState > 2.2 && gameState < 2.5) {
      //Giving speed to vaccines in vaccineGrp
      vaccineGrp.setVelocityEach(xVelocity, 0);
      speedUpGrp.setVelocityEach(xVelocity, 0);
      obsGroup.setVelocityEach(xVelocity, 0);

      displaySprites();

      speedIncr();
      dispTime();



      spawnVacc();
      vaccineColl();
      destroyVacc();
      displayVaccCount();

      spawnPowerUp();
      collectBlue();
      resetSpawnSpeed();
      destroyBlue();

      spawnObs();
      obsCollide();
      obsDestroy();

      spawnVirus();
      virusKill();
      updateVirusSpeed();
      virusCollide();
      stopCollAnim();
      stopVirus();
      virusBoost();


      displayCount();
    }


    endCheck();
  }
  //Function for choosing game type for level 2

  //Functions related to virus
  function spawnVirus() {
    if (frameCount % 100 === 0 && virus === null) {
      virusHealth = 100;
      virusXSpeed = orignalSpeed;
      //Giving properties to vaccine sprite
      virus = createSprite(0, player.y + 35, 10, 10);
      virus.addImage(virusAnim);
      virus.scale = 0.8;
      virus.velocityX = virusXSpeed;
      virus.setCollider("rectangle", 0, 0, 110, 100)
    }
  }
  function virusKill() {
    if (virusHealth === 0) {
      virus.visible = false;
      virus = null;
      virusHealth = 100;
      virusXSpeed = orignalSpeed;
    }
  }
  function updateVirusSpeed() {
    if (virus != null) {
      virus.velocityX = virusXSpeed;
    }
  }
  function virusCollide() {
    if (virus != null) {
      if (virus.isTouching(player)) {
        virus.visible = false;
        vaccineCount -= 5;
        virus = null;

        virusColl = createSprite(player.x - 20, player.y, 1, 1);
        virusColl.addAnimation("v1", virusCollAnim);

        collideSound.play();;
      }
    }
  }
  function virusBoost() {
    if (boost != null) {
      frame += 1;
      if (frame > 20) {
        boost.visible = false;
        frame = 0;
        boost = null;
      }
    }
  }

  function stopCollAnim() {
    if (virusColl != null) {
      frame += 1;
      if (frame > 30) {
        virusColl.visible = false;
        virusColl = null;
        frame = 0;
      }
    }
  }
  function stopVirus() {
    if (collectPhase === "collected") {
      if (count < 50) {
        virusXSpeed = 0;
        count++;
      } else {
        count = 0;
        virusXSpeed = orignalSpeed;
        collectPhase = "notCollected";
      }
    } else if (collectPhase === "boostVirus") {
      if (count < 25) {
        virusXSpeed = orignalSpeed + .05;
        count++;
      } else {
        count = 0;
        virusXSpeed = orignalSpeed;
        collectPhase = "notCollected";
      }
    }
  }


  //Function related to road and speed/score
  function trackReset() {
    if (track.x + 700 < 0) {
      //noLoop();
      track.x = track2.x + 1385;
    }

    if (track2.x + 700 < 0) {
      track2.x = track.x + 1395;
    }
  }
  function scoreIncr() {
    if (gameState >= 2.2 && gameState <= 2.5) {
      score += .5;
    }
  }
  function speedIncr() {
    if (gameState >= 2.2 && gameState <= 2.5)
      if (frameCount % 125 === 0 && frameCount > 0) {
        xVelocity -= 1;
      }
  }

  //Functions related to vaccine
  function spawnVacc() {
    if (frameCount % spawnSpeed === 0) {
      var randVal = Math.round(random(0, 4));

      //Giving properties to vaccine sprite
      vaccine = createSprite(displayWidth, heightVal[randVal] + 35, 10, 10);
      vaccine.addImage(vaccineAnim);
      vaccine.scale = .14;
      vaccine.setCollider("rectangle", 0, 0, 500, 512);

      player.depth = vaccine.depth + 1;

      //Adding vaccine to vaccine group
      vaccineGrp.add(vaccine);
    }
  }
  function vaccineColl() {
    for (var i = 0; i < vaccineGrp.length; i++) {
      if (player.isTouching(vaccineGrp.get(i))) {
        collectAudio.play();
        vaccineGrp.get(i).destroy();
        vaccineCount++;

        if (collectPhase === "notCollected") {
          collectPhase = "collected"
        }
        if (virus != null) {
          virusHealth -= 10;
        }
      }
    }
  }
  function destroyVacc() {
    for (var i = 0; i < vaccineGrp.length; i++) {
      if (vaccineGrp.get(i).x < 0) {
        vaccineGrp.get(i).destroy();
        vaccPassed += 1;
      }
    }
  }
  function displayVaccCount() {
    fill("blue")
    textSize(40);
    text(" = " + vaccineCount, vaccineDisp.x + 30, vaccineDisp.y + 15);
  }

  //Functions related to obstacles
  function spawnObs() {
    if (frameCount % 40 === 0) {
      var randVal = Math.round(random(0, 4));

      //Giving properties to vaccine sprite
      obstacle = createSprite(displayWidth, heightVal[randVal] + 35, 10, 10);
      obstacle.addImage(obsAnim);
      obstacle.scale = 0.11;
      obstacle.setCollider("rectangle", 0, 0, 125, 90);

      player.depth = obstacle.depth + 1;

      obsGroup.add(obstacle);
    }
  }
  function obsCollide() {
    for (var i = 0; i < obsGroup.length; i++) {
      if (player.isTouching(obsGroup.get(i))) {
        collectPhase = "boostVirus"
        obsGroup.get(i).destroy();

        if (virus != null) {
          boost = createSprite(virus.x - 160, virus.y, 10, 10);
          boost.addImage(boostAnim);
          boostSound.play();
        }
      }
    }

  }
  function obsDestroy() {
    for (var i = 0; i < obsGroup.length; i++) {
      if (obsGroup.get(i).x < 0) {
        obsGroup.get(i).destroy();
      }
    }
  }


  //Function related to song
  function playSong() {
    backSound.play();
  }

  //Extras
  function displayCount() {
    minCountdown = floor((goalTime - time) / 60);
    secCountdown = ((goalTime - time) % 60);
    var vaccineLeft = vaccGoal - vaccineCount;
    textFont(endFontLoad);
    textSize(45);
    fill("red");
    text("Objective: You have to collect " + vaccineLeft + " Vaccines in " + minCountdown + " minutes " + secCountdown + " seconds", 200, height - 15);
  }

  //Functions for powerUp
  function spawnPowerUp() {
    if (time > 45 && vaccineCount < 30 && phase === "notCollected") {
      if (frameCount % 60 === 0) {
        var randVal = Math.round(random(0, 4));

        //Giving properties to vaccine sprite
        speedUp = createSprite(displayWidth, heightVal[randVal] + 35, 10, 10);
        speedUp.addAnimation("s1", speedUpAnim);
        speedUp.scale =.75;
        speedUpGrp.add(speedUp);
      }
    }
  }
  function collectBlue() {
    for (var i = 0; i < speedUpGrp.length; i++) {
      if (player.isTouching(speedUpGrp.get(i))) {
        phase = "collected";
        collectAudio.play();
        speedUpGrp.setLifetimeEach(1);
        spawnSpeed -= 25;
      }
    }
  }
  function destroyBlue() {
    for (var i = 0; i < speedUpGrp.length; i++) {
      if (speedUpGrp.get(i).x < -5) {
        speedUpGrp.get(i).destroy();
      }
    }
  }
  function resetSpawnSpeed() {
    if (spawnSpeed <= 20) {
      var stopTime = 250;
      if (startTime < stopTime) {
        startTime++;
      } else {
        spawnSpeed = 40;
        startTime = 0;
      }
    }
  }

  //Function to display sprites
  function displaySprites() {
    player.visible = true;
    vaccineDisp.visible = true;

  }
  function hideSprites() {
    track.visible = false;
    track2.visible = false;

    vaccineDisp.visible = false;
    player.visible = false;

    if (virus != null ) {
      virus.visible = false;
    }

    vaccineGrp.destroyEach();
  }

  //Timer Functions
  function timer() {
    if (time < goalTime+1 && gameState >= 2.2 && gameState <= 2.5) {
      time += 1;
    }
  }
  function dispTime() {
    minuteVal = floor(time / 60);
    secondVal = time % 60;

    textFont(timefontLoad);
    fill(rgb(47, 84, 150));
    textSize(55);

    if (secondVal >= 10) {
      text("0" + minuteVal + ":" + secondVal, 560, 50);
    } else {
      text("0" + minuteVal + ":0" + secondVal, 560, 50);
    }
  }

  //End check for level 2
  function endCheck() {
    if (time >= goalTime || vaccineCount === vaccGoal) {
      gameState = 2.75;

      hideSprites();

      // if (musicVolume > 0) {
      //   musicVolume -= 0.01;
      //   backSound.volume(musicVolume);
      //
      //   if (musicVolume <= 0) {
      //   musicVolume = 0;
      //   backSound.volume(musicVolume);
      //   }
      // }

      textFont(endFontLoad);
      textSize(77);
      fill("black");

      //Checks for the satisfying condition to display end message
      if (vaccineCount === vaccGoal) {
        text("          Congratulations! You were able \n                 to achieve the mission", 160, 250);

        //Display gif for killing virus
        killVirusGIF.show();
        killVirusGIF.position(500, 400);
      } else {
          text("              Game Over! You collected \n" + " '" + vaccineCount + "' " + " Vaccines in '" + totalMins + "' Minute(s) '" + totalSec + "' Second(s) \n      and you left a total of '" + vaccPassed + "' Vaccine(s)!", 180, 250);
      }
    }
  }

  //General function
  function keyReleased() {
      if (keyCode === UP_ARROW) {
        if (playerY > heightVal[0]) {
          playerY -= changeVal;
          while (player.y >  playerY) {
            player.y -= 0.5;
            if (virus != null ) {
              virus.y -= 0.5;
            }
          }
        }
      }

      if (keyCode === DOWN_ARROW) {
        if (playerY < heightVal[4]) {
          playerY += changeVal;
          while (player.y < playerY) {
            player.y += 0.5;
            if (virus != null) {
              virus.y += 0.5;
            }
          }
        }
      }
    }

  function mouseClicked() {
      if (mouseButton === LEFT) {
        if (mask != null) {
          if (mousePos.isTouching(mask)) {
            lifeCount += 1;
            mask.visible = false;
            mask = null;
          }
        }

        if (sanitizer != null) {
            if (mousePos.isTouching(sanitizer)) {
              lifeCount += 1;
              sanitizer.visible = false;
              sanitizer = null;
          }
        }

        if (door != null) {
            if (mousePos.isTouching(door)) {
              door.visible = false;
              door = null;
              gameState = 1.2;
          }
        }

        if (demoBut != null) {
          if (mousePos.isTouching(demoBut)) {
            goalTime = 60;
            vaccGoal = 20;

            totalMins = floor(goalTime/60)
            totalSec = goalTime % 60;

            gameState = 2.25;

            orignalBut.visible = false;
            orignalBut = null;
            demoBut.visible = false;
            demoBut = null;
          }
        }

        if (orignalBut != null) {
          if (mousePos.isTouching(orignalBut)) {
            goalTime = 165;
            vaccGoal = 75;

            totalMins = floor(goalTime/60)
            totalSec = goalTime % 60;

            gameState = 2.25;

            orignalBut.visible = false;
            orignalBut = null;
            demoBut.visible = false;
            demoBut = null;
          }
        }
      }
  }

//To use gif Image -
/* //In function preload()
gifSee.position(0, 0); // In function draw()
*/

//255
