/* Final Game Project 
University of London
Course: Introduction to Programming I
Author: Alvaro Alvarez 

Extensions Selected:

First Extension Selected - Sound

My first extension is sound. To work with the library, we must add the sound.min.js library to our folder. The following steps include:
naming our variables that will store the sound assets , and assign these inside the preLoad function. We can later use this to play the sound on our setup function or other functions. I struggled the most when setting up the conditionals so that once an event is met, the sound plays. Another issue that comes along with the use sound library, is the fact that two sounds can mix in our player resulting in a hideous noise. I tried to implement different workarounds such as lowering the volume of my background music when another sound effect is being played. Another issue during the implementation of sound was stoping the sound whilst a condition was been met. To explain this I will refer to an example such as pressing and releasing buttons, in such cases the sound plays only once and we have no looping, but since some conditions are met in the draw function and they loop endlessly, an extra condition needs to be made for the sound to stop or else we get a terrible noise again. As you will see in the project the first time played all sounds work accordingly, however, if you decide to re-play the game or fail many times, some of the sound effects won't work.Lastly, for
the sound effects I used a website called https://freesound.org/.


Second Extension - Enemies
Unlike the sound extension, I think following the video for creating enemies was much less complicated than the overall sound implementation. To make the enemy different in my game, I added to the condition that if we are near it an eye (ellipse in this case) opens up, this is to warn the player that they are in danger. I also added a text and a "roar" sound to indicate the danger. Overall the use of constructor functions in the case of enemies is really helpful, as you can generate a blueprint of a simple enemy and replicate it without much code in different parts of your game's stage. What I liked implementing the most and also found the trickest was to go back to the code and edit the enemy. Firstly, the way a function is called inside a constructor is different as we have to call the name of the function first and then assign it the code that will be executed. 

*/

var floorPos_y;
var gameChar_world_x;
var scrollPos;
var game_score;
var flagpole;
var modPole;
var modMount;
var lives;
var collectables;
var trees;
var clouds;
var canyons;
var enemies;
var mountains;
var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var isCloudsMoving;
var isItemCollected;
var isReachedNoPotions;
var isPreScreen;
var isRunning;
var isGameover;
var isPlayingSound;
var Mjump;
var Mstart;
var Mcollected;
var Mfalling;
var Mouch1;
var Mgameover;
var Mbackground
var Mwinstage;
var Menemy;
var gameFont;
var gameTitleFont;


function preload()
{
    //Load sounds for game
    soundFormats('mp3','wav');
    Mswallow = loadSound('assets/swallow.wav');
    Mjump = loadSound('assets/jump.wav');
    Mstart = loadSound('assets/start.wav');
    Mcollected = loadSound('assets/collected.wav');
    Mfalling = loadSound('assets/falling.wav');
    Mouch1 = loadSound('assets/ouch1.wav');
    Mgameover = loadSound('assets/gameover.wav');
    Mbackground = loadSound('assets/background.wav');
    Mwinstage = loadSound('assets/win.wav');
    Menemy = loadSound('assets/enemy.wav')
    //Load fonts for game
    gameFont =  loadFont('assets/manaspc.ttf');
    gameTitleFont = loadFont('assets/brasspounder.sc.ttf')
}


function beforeGame()
{      
    /* Before game gives us a screen where players can read 
    the instructions to play the game, mainly about the game character
    movement*/
    
    background(0);
    preGamePanel();
    
    //Draws title and explanation of how to move the character
    function preGamePanel(){                 
        
        fill(255); 
        textFont(gameTitleFont);
        textSize(30);
        text("Final Game Project" , 370, 90);
                
        textFont(gameFont);
        textSize(14);
        text("To move use 'A' for left, 'W' for jumping,", 340, 240);
        text("and 'D' to move right", 430, 270);
                
        var frames = frameCount % 2;
        //Makes the following text blink
        frameRate(2);
        if(frames == 0)
          { 
            fill(255); 
            textFont(gameFont);
            textSize(22);
            text("Press 'Enter' to start the game" , 300, 180);
                                        
          };                
      };  
    
};
 
function startGame(){
     
    //Game Score
    fill(255,0,0);
    noStroke();
    textSize(18);
    text("score: " + game_score, 20, 20); 
    
    //Lives    
    fill(255,0,0);
    noStroke();
    text("Lives: " + lives, 160 , 20); 
     
    //Initial character position
    Character.characterXPos = 447/2;
    Character.characterYpos = 300;
    
    //Game score counter
    game_score = 0;
    
    //Flagpole conditions
    flagpole = {isReached: false, xPos : 1700};
    
    //Check if flag when reache meets conditions
    isReachedNoPotions = false;
    
    //Variable to control the background scrolling.
    scrollPos = 0;

    /*Variable to store the real position of the gameChar in the gameworld. 
    Needed for collision detection*/
    gameChar_world_x = Character.characterXPos - scrollPos;

    // Boolean variables to control the movement of the game character.
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;
    isReachedNoPotions = false;
        
    //Collectables object  
    collectables = [         
                {x_pos : 400, y_pos : 220,  size : 50, isFound : false},
                {x_pos : 1000, y_pos : 220,  size : 50, isFound : false},
                {x_pos : 1250, y_pos : 170,  size : 50, isFound : false},
                {x_pos : -570, y_pos : 170,  size : 50, isFound : false}, 
                {x_pos : -1200, y_pos :170,  size : 50, isFound : false} ,
                {x_pos : -1500, y_pos :170,  size : 50, isFound : false} 
                   ];          
    };

function setup()
{            
    createCanvas(1000, 400);
    resetGame();
    //Plays background music
    Mbackground.play(); 
    Mbackground.loop();
    
    
}

function resetGame()
{

    floorPos_y = height * 3/4;
    isCloudsMoving = true;
    game_score = 0;
    lives = 3;
    isPlummeting = false;
    isPreScreen = true;
    isRunning = true;
    isGameover = false;
    isGameovermusic = false;
    isStopSound = false;
    isReachedNoPotions = false;
    
    //Variable to control the background scrolling.
	scrollPos = 0;
        
    Character.characterXPos = 447/2;
    Character.characterYpos = 300;
    
    flagpole = {isReached: false, xPos : 1700};

    gameChar_world_x = Character.characterXPos - scrollPos;
          
    //Store tree factory object
    trees = [];
    
     for(var i = 0; i < 20 ; i++)
        {
            trees.push(createTree());
        };
    
    //Store cloud factory object 
    clouds = [];
    
     for(var i = 0; i < 4 ; i++)
        {
            clouds.push(createCloud());
        };
    
    //Store enemies constructor object 
    enemies = [];
    //Place of enemies here
    enemies.push(new Enemy(300, floorPos_y - 20 , 100));
    enemies.push(new Enemy(1000, floorPos_y - 20 , 100));
    enemies.push(new Enemy(1400, floorPos_y - 20 , 100));
    enemies.push(new Enemy(-500, floorPos_y - 20 , 100));
    enemies.push(new Enemy(-900, floorPos_y - 20 , 100));
    enemies.push(new Enemy(-1400, floorPos_y - 20 , 100));


    //Collectables object  
    collectables = [         
                {x_pos : 400, y_pos : 220,  size : 50, isFound : false},
                {x_pos : 1000, y_pos : 220,  size : 50, isFound : false},
                {x_pos : 1250, y_pos : 170,  size : 50, isFound : false},
                {x_pos : -570, y_pos : 170,  size : 50, isFound : false}, 
                {x_pos : -1200, y_pos :170,  size : 50, isFound : false} ,
                {x_pos : -1500, y_pos :170,  size : 50, isFound : false} 
                   ];    
};

function draw()
{
    
    //isPreScreen is a boolean that determines if the game's initial screen
    //if we are on the pre-screen then we call the beforeGame function
    if(isPreScreen)
        {
         beforeGame();
        }
    //isRunning is a boolean that let us know if the actual game is running or not   
    //on a conditional below if we press 'Enter' the condition turns true, initiating the stage
    if(!isRunning){
        
    frameRate(120);   
    background(224, 255, 255); // fill the sky blue
            
    //Score    
    fill(255,0,0);
    noStroke();
    textSize(18);
    text("score: " + game_score, 20, 20); 
    
    //Lives    
    fill(255,0,0);
    noStroke();
    text("Lives: " + lives, 160 , 20); 
    
   
    //Starts a new drawing state    
    push();
    
     //Draw Mountains
     for(var i = 0 ; i < mountains.length ; i++)
        {
            drawMountains(mountains[i]);
        
        }; 
    
    //Draw clouds 
    for(var i = 0; i < clouds.length; i++)
    {
        clouds[i].drawCloud();  
        
    };
    
    //Floor object    
    noStroke();
	fill(83,148,108);
    rect(0, floorPos_y, width, height/4);
    
    translate(scrollPos,0);         
        
    //Draw trees 
    for(var i = 0; i < trees.length; i++)
    {
        trees[i].drawTree();
    };
    
    //Draw collectables 
    
    for(var i = 0 ; i < collectables.length ; i++)
        {            
            if(!collectables[i].isFound)
                {
                  drawCollectable(collectables[i]);
                  checkCollectable(collectables[i]);
                };            
        };

    //Draw Canyons 
    for(var i = 0 ; i < canyons.length ; i++)
        {
            drawCanyon(canyons[i]);
            //Checks if player is standing on top of a canyon
            checkCanyon(canyons[i]);
            
        };
    
        
    //Call flagpole function
    renderFlagpole();
        
    //Mention you need more potions    
    needPotionSign();
    
    //Draw enemies and check contact
    for(var i = 0; i < enemies.length ; i++)
        {
            enemies[i].draw();
            
            var isContact = enemies[i].checkContact(gameChar_world_x,Character.characterYpos);
            
            if(isContact)
                {   
                    lives -= 1;
                    if(lives > 0)
                    {
                        Mouch1.play();
                        startGame();
                        break;
                    };
                };
            
            var isEnemyNear = enemies[i].checkEnemyAround(gameChar_world_x,Character.characterYpos)
            {
                if(isEnemyNear){
                     fill(255,0,0);
                     text('Enemy near watch out!',gameChar_world_x - 100,100);
                    
                    if(!Menemy.isPlaying()){
                    Menemy.play();
                    Mbackground.setVolume(0);
                    }
                    
                    else
                        {
                            Mbackground.setVolume(1);
                        }
                }
            }
        };
                
        pop(); 
        
      //Sign at end of game
    
    //Draws Character
    Character.drawCharacter();
        
    if(isLeft)
	{
		if(Character.characterXPos > width * 0.8)
           {
               Character.characterXPos -= 5;
           }
        else
           {
                scrollPos += 5;
           }
	};
    
    
	if(isRight)
	{
		if(Character.characterXPos < width * 0.8)
		{
			Character.characterXPos  += 5;
		}
		else
		{
			scrollPos -= 5; // negative for moving against the background
		}	
    
    };
    
    //Check if player is above floor
    if(Character.characterYpos < floorPos_y)
        {
            //character is above floor floor
            Character.characterYpos += 1;
            isFalling = true;                          
        }
    else
        {
            isFalling = false;
        }     
    
    //Game Over when lives are equal or less than 0
    
     if(lives <= 0){
        isGameover = true;
        if(isGameover){
             fill(0,0,255);
             fill(255,0,0);
             noStroke();
             text("GAME OVER, press space to continue",width/ 2, height/2); 
             if(!Mgameover.isPlaying())
                 {
                    Mgameover.play();
                    Mbackground.setVolume(0);
                 }
            }
         };      
        
    //Game character reaches flag
    
    if(flagpole.isReached == true){
            
        fill(0,255,0);
            noStroke();
            text("Level complete. Press space to restart",width/ 2, height/2);
            
            /*Stop playing sounds conditions */
            
            /*The playSound function checks if the sound is not being played
            It also sets our background music volume to 0 so the new sound doesn't interfere
            Finally it calls the stopSound function*/
            
            isPlayingSound = !Mwinstage.isPlaying();
            
            function playSound()
            {
                Mbackground.play();
            }
            
                if(isPlayingSound) {
                    Mbackground.setVolume(0);
                    Mwinstage.play();
                    stopSound();
                }
            /*stopSound acts as a way to play our sounds only once. 
            Since we are doing the sounds in loop, sound effects that are
            not triggered by buttons will play endlessly without a condition to
            stop them. This function stops the collected item sounds and restores
            the background music's volume */
            function stopSound(){
                    Mwinstage.stop();
                    isPlayingSound = Mwinstage.play();
                    Mbackground.setVolume(1);
                
                };
            return;
        }
        
    
    //Check if character reaches flagpole
    if(flagpole.isReached == false){
          checkFlagpole();
        };
   
	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	gameChar_world_x = Character.characterXPos - scrollPos;
    
    }


};
//End of draw function


    
 //Collectables object  
    collectables = [         
                {x_pos : 400, y_pos : 220,  size : 50, isFound : false},
                {x_pos : 1000, y_pos : 220,  size : 50, isFound : false},
                {x_pos : 1250, y_pos : 170,  size : 50, isFound : false},
                {x_pos : -570, y_pos : 170,  size : 50, isFound : false}, 
                {x_pos : -1200, y_pos :170,  size : 50, isFound : false} ,
                {x_pos : -1500, y_pos :170,  size : 50, isFound : false} 
                   ];    

    mountains  = [           
                    //Mountain Position                       
                   { x_pos : -420, y_pos1 : 232, 
                     x_pos2 : -220, y_pos2 : 100,
                     x_pos3 : -10,  y_pos3 : 232},
                        
                     {x_pos : 25,  y_pos1 : 300, 
                     x_pos2  : 220, y_pos2 : 100,
                     x_pos3 : 430,  y_pos3 : 300},
        
                     {x_pos : 495, y_pos1 : 432,
                     x_pos2  : 720, y_pos2 : 50,
                     x_pos3  : 958, y_pos3 : 432},
                            
                     {x_pos : 1080, y_pos1 : 432,
                     x_pos2  : 1220, y_pos2 : 200,
                     x_pos3  : 1365 ,y_pos3 : 432},       
                        
                    {x_pos : 1480, y_pos1 : 432,
                     x_pos2 : 1620, y_pos2 : 200,
                     x_pos3 : 1765 ,y_pos3 : 432},        
        
                    {x_pos : 1790, y_pos1 : 432,
                     x_pos2 : 2020, y_pos2 : 50,
                     x_pos3 : 2255, y_pos3 : 432},                 
                
                 ];  

function drawCollectable(t_collectable){
            
            noStroke();
            fill(100,41,47);
            
            /*constants for collectable parts:*/

            var capSize = 10;
            var tubeHeight = 25;
            var tubeWidth = 3;
            var tubeThroatWidth = 10;
            var tubeThroatHeight = 30;
            var flaskBottom = 40;
            var bubbles1 = 15;
            var bubbles2 = 5;
    
            /*constants to fix positioning of collectable parts:*/
            var tubeXalign = 7;
            var tubeThroatYalign = 10;
            var flaskBottomXalign = 5;
            var flaskBottomYalign = 50;
            var substanceXalign = 5;
            var substanceYalign = 50;
            var bubblesXalign = 2;
            var bubbles1Yalign = 50;
            var bubbles2Yalign = 40;
            
            //cap    
            rect(t_collectable.x_pos, t_collectable.y_pos, capSize, capSize, 3.5);

            fill(129,216,208);

            //tube top
            rect(t_collectable.x_pos - tubeXalign, 
                 t_collectable.y_pos + tubeThroatYalign, tubeHeight, tubeWidth, 20);

            //tube throat
            rect(t_collectable.x_pos, t_collectable.y_pos + tubeThroatYalign, 
                 tubeThroatWidth, tubeThroatHeight);

            //flask Bottom
            ellipse(t_collectable.x_pos + flaskBottomXalign, 
                    t_collectable.y_pos + flaskBottomYalign, flaskBottom, flaskBottom);
            
            //substance
            fill(255,0,0);
            arc(t_collectable.x_pos + substanceXalign ,
                t_collectable.y_pos + substanceYalign, 50 -10, 50 - 10, 0, PI, CHORD);

            //bubbles
            ellipse(t_collectable.x_pos - bubblesXalign, 
                    t_collectable.y_pos + bubbles1Yalign, bubbles1, bubbles1);

            ellipse(t_collectable.x_pos - bubblesXalign,
                    t_collectable.y_pos + bubbles2Yalign, bubbles2, bubbles2);          
};


//Collects item when player touches it

function checkCollectable(t_collectable)
{   
    if(dist(gameChar_world_x, 
            Character.characterYpos, 
            t_collectable.x_pos, 
            t_collectable.y_pos) < 90){                 
                
            t_collectable.isFound = true;
            game_score += 1;   
            Mswallow.play();
                    
    };
    
    allCollected();
}

//Displays message that necessary item amount to pass the game has been collected
function allCollected()
{
    if(game_score >= 4)
        {
            
            fill(255);
            rect(570,40,400,25, 10);
           
            fill(0, 102, 153);
            textSize(14);
            text('Great you collected enough to proceed!',600,55);
            
            /*How to stop playing sounds conditions */
            
            /*The playSound function checks if the sound is not being played
            It also sets our background music volume to 0 so the new sound doesn't interfere
            Finally it calls the stopSound function*/
            
            isPlayingSound = !Mcollected.isPlaying();
  
            function playSound(){
                Mbackground.play();
            };
            
            if(isPlayingSound){
                    Mbackground.setVolume(0);
                    Mcollected.play();
                    stopSound();
                }
           
            /*stopSound acts as a way to play our sounds only once. 
            Since we are doing the sounds in loop, sound effects that are
            not triggered by buttons will play endlessly without a condition to
            stop them. This function stops the collected item sounds and restores
            the background music's volume */
                function stopSound()
                {
                    Mcollected.stop();
                    isPlayingSound = Mcollected.play();
                    Mbackground.setVolume(1);
                
                };
        }
    
    //Sign signaling the end of the game
     fill(255);
     rect(-2200,200,600,80); 
     fill(0);
     textFont(gameFont);
     textSize(22);
     text("Sorry end of game here, turn around",-2150,250);
     
      
};
    

function  createTree(x,y,width,height,roundness,r,g,b,mod1) 
    {
        /*
          Color guide
          Trunk: 46,45,43
          Leaves: 45,194,237
          Dark Leaves: 99,165,42
          Highlights: 100,237,36          
          
          mod1 is used as an override to center certain parts of the collectable
         */
        
        var tree =
        {            
            x: [-1950,-1600,-1400,-900,-400,100,550,1000,1450,1600,1750],
            /*tree order: maintrunk, leftbranch, topleftbranch,leavestopleft*/
            y: [230,230,190,120,290,150,50],
            width: [20,60,10,75,80,50],
            height: [70,13,50,75,80,7],
            roundness: [5,10],
            
            r: [46,129,199,99],
            g: [45,194,237,165],
            b: [43,48,36,42],
            
            mod1 : [50,10,100,80],
            
            
            drawTree: function()
            {
                for(var i = 0; i < tree.x.length ; i++){
                     noStroke();
                
                //Main tree trunk
                fill(this.r[0],this.g[0],this.b[0]);
                
                rect(this.x[i],this.y[0],
                     this.width[0],
                     this.height[0],
                     this.roundness[0]
                    );
                
                //Left tree trunk branch
                fill(this.r[0],this.g[0],this.b[0])
                
                rect(this.x[i] -this.mod1[0],
                                   this.y[1],
                               this.width[1],
                              this.height[1],
                           this.roundness[1]
                    );
                
                //Left tree trunk branch upward
                fill(this.r[0],this.g[0],this.b[0]);
                
                rect(this.x[i] - this.mod1[0],
                                    this.y[2],
                                this.width[2],
                               this.height[2],
                            this.roundness[1]
                    );
                
                
                //Left tree trunk leaves
                fill(this.r[1],this.g[1],this.b[1]);
                
                rect(this.x[i] - this.mod1[3],
                                    this.y[3],
                                this.width[4],
                               this.height[4],
                            this.roundness[1]
                    );
                
                            
                //Right tree trunk branch
                fill(this.r[0],this.g[0],this.b[0]);
                
                rect(this.x[i], this.y[1],
                     this.width[1],
                     this.height[1],
                     this.roundness[1]
                    );
                
                 //Right tree trunk branch upward
                fill(this.r[0],this.g[0],this.b[0]);
                rect(this.x[i] + this.mod1[0],
                                    this.y[2],
                                this.width[2],
                               this.height[2],
                            this.roundness[1]
                    );
                
                //Right tree trunk leaves
                fill(this.r[3],this.g[3],this.b[3])
                rect(this.x[i] + this.mod1[1],
                                    this.y[5],
                                this.width[4],
                               this.height[4],
                            this.roundness[1]
                    );
                
                //Right tree trunk leaves 2
                fill(this.r[2],this.g[2],this.b[2])
                    
                rect(this.x[i] + this.mod1[0],
                                    this.y[3],
                                this.width[5],
                               this.height[2],
                           this.roundness[1]
                    );             
                
                };                 
            }     
        };
        
        return tree;

    }

//Canyons Array
 canyons = [
                {x_pos : 0, y_pos : 300, width : 150, height : 200},
                {x_pos : 650, y_pos : 300, width : 150, height : 200},
                {x_pos : 1200, y_pos : 300, width : 150, height : 200},
                {x_pos : -650, y_pos : 300, width : 150, height : 200},
                {x_pos : -1200, y_pos : 300, width : 150, height : 200},
                {x_pos : -1800, y_pos : 300, width : 150, height : 200},
                {x_pos : -2400, y_pos : 300, width : 150, height : 200}
           ];
    
//Draw canyons function

function drawCanyon(t_canyon)
{
            /*Constants to fix canyon position*/
            var mod = [40,100];
    
            fill(50,22,31);
    
            rect(t_canyon.x_pos, 
                 t_canyon.y_pos, 
                 t_canyon.width, 
                 t_canyon.height
                );
            
            fill(139,69,19);
    
            ellipse(t_canyon.x_pos + mod[0], 
                    t_canyon.y_pos + mod[1], 
                    40, 40
                   );
    
            ellipse(t_canyon.x_pos + mod[1], 
                    t_canyon.y_pos + mod[0], 
                    40, 
                    40
                   );
};

//Checks is character is standing over canyon

function checkCanyon(t_canyon)
{
    var falling = 0;
  
    if((gameChar_world_x > t_canyon.x_pos && gameChar_world_x < t_canyon.x_pos + t_canyon.width) &&
      Character.characterYpos > 250)
        {
           isPlummeting = true;
            //When character falls plays falling sound
            if(!Mfalling.isPlaying()){
               Mfalling.play();
               }
        };
    
    if(isPlummeting == true)
         {             
           falling = Character.characterYpos += 1 ; 
         }
    
    //When character falls enough deduct -1 life
     if(falling == 500)
            {
                lives -= 1;                                              
            }
    
    //When a character dies reset its position 
    if(lives < 3 && Character.characterYpos == 550)
        {
            isPlummeting = false;
            isFalling = true;
            Character.characterYpos += 10;
           
            if(!isPlummeting && Character.characterYpos >= 550)
            {
                Character.characterXPos = 600;
                Character.characterYpos = 300;
                
            }
        }
    
    //When out of lives run checkPlayerDie function
    if(lives == 0)
        {
            checkPlayerDie();
        }
}

function checkPlayerDie()
{        
      if(lives <= 0)
        {           
            startGame();  
        }
}    
   
var Character = 
    {
        characterXPos: 447,
        characterYpos: 300,
        xHat: [7,13,33],
        
        width: [25,30,6,10,40],
        height: [25,10,35,15,4,12],
       
        r: [237,83], 
        g: [210,153], 
        b: [190,135],
        round: 2,
        isLeft  : false,
        isRight :false,
        
        /*mods to set parts of the characterYpos and characerXpos in the right place*/
        modX: [4,19,3,27,9,7,100],
        modY : [0,60,82,25,30,30,10,73,70,48,80,100],

        drawCharacter : function()
        {
        if(isLeft && isFalling)
            {
                //face
        noStroke();    
        fill(this.r[0], this.g[0], this.b[0]);
        rect(this.characterXPos, 
             this.characterYpos - this.modY[7], 
             this.width[0],
             this.height[0]
            );
                
        rect(this.characterXPos - 10, 
             this.characterYpos - 63, 
             10,10);
            

        //Hat            
        fill(this.r[1],this.g[1],this.b[1]);            
        triangle(this.characterXPos - this.xHat[0], this.characterYpos - this.modY[8], 
                 this.xHat[1] + this.characterXPos, 
                 this.characterYpos - this.modY[11], 
                 this.xHat[2] + this.characterXPos, this.characterYpos - this.modY[8]
                );
            
        rect(this.characterXPos - this.modX[5], 
             this.characterYpos - this.modY[10], 
             this.width[4], 
             this.height[5]
                );               
            
        //Body
        fill(this.r[1],this.g[1],this.b[1]);
            
        rect(this.characterXPos - this.modX[2], 
             this.characterYpos - this.modY[9]
, 
             this.width[1], 
             this.height[2], 
             this.round
            );       

       
        //Left Leg
        fill(18,44,52)
        rect(this.characterXPos + 10, 
             this.characterYpos - 13, 
             this.width[2], 
             this.height[3]
            );
            
        //Left foot
        rect(this.characterXPos + 6, 
             this.characterYpos, 
             this.width[3], 
             this.height[4], 
             this.round
             );
        
        //Arms
            
        fill(237, 210, 190);
        rect(this.characterXPos + 10, 
            this.characterYpos - this.modY[9],
             6, 
             22, 
             2
            );
        
        rect(this.characterXPos + 10, 
            this.characterYpos - this.modY[9],
             6, 
             22, 
             2
            );
                
        }
            
        else if(isLeft)
                {
                    
        //face
        noStroke();    
        fill(this.r[0], this.g[0], this.b[0]);
        rect(this.characterXPos, 
             this.characterYpos - this.modY[7], 
             this.width[0],this.height[0]);
        
        rect(this.characterXPos - 10, 
             this.characterYpos - 63, 
             10,
             10);
            

        //Hat            
        fill(this.r[1],this.g[1],this.b[1]);            
        
        triangle(this.characterXPos - this.xHat[0], 
                 this.characterYpos - this.modY[8], 
                 this.xHat[1] + this.characterXPos, 
                 this.characterYpos - 100, 
                 this.xHat[2] + this.characterXPos, 
                 this.characterYpos - this.modY[8]
                );
            
        rect(this.characterXPos - this.modX[5], 
             this.characterYpos - this.modY[10], 
             this.width[4],
             this.height[5]
                );               
            
        //Body
        fill(this.r[1],this.g[1],this.b[1]);
            
        rect(this.characterXPos - this.modX[2], 
             this.characterYpos - this.modY[9], 
             this.width[1], 
             this.height[2], 
             this.round
                );       

       
        //Left Leg
        fill(18,44,52)
        rect(this.characterXPos + 10, 
             this.characterYpos - 13, 
             this.width[2], 
             this.height[3]
            );
            
        //Left foot
        rect(this.characterXPos + 6, 
             this.characterYpos, 
             this.width[3], 
             this.height[4], 
             this.round
             );
        
        //Arms
            
        fill(237, 210, 190);
        rect(this.characterXPos + 10, 
            this.characterYpos - this.modY[9],6, 22, 2
            );
        
        }
            
        else if(isRight)
        {
                
        //face
        noStroke();    
        fill(this.r[0], this.g[0], this.b[0]);
        rect(this.characterXPos, 
             this.characterYpos - this.modY[7], 
             this.width[0],
             this.height[0]);
        //Nose
        rect(this.characterXPos + 25, 
             this.characterYpos - 63, 
             10,
             10);

        //Hat            
        fill(this.r[1],this.g[1],this.b[1]);            
        triangle(this.characterXPos - this.xHat[0], 
                 this.characterYpos - this.modY[7], 
                 this.xHat[1] + this.characterXPos, 
                 this.characterYpos - 100, 
                 this.xHat[2] + this.characterXPos, 
                 this.characterYpos - this.modY[7]
                );
            
        rect(this.characterXPos - this.modX[5], 
             this.characterYpos - this.modY[10], 
             this.width[4], 
             this.height[5]
            );               
            
        //Body
        fill(this.r[1],this.g[1],this.b[1]);
            
        rect(this.characterXPos - this.modX[2], 
             this.characterYpos - 48, 
             this.width[1], 
             this.height[2], 
             this.round
                );       
       
        //Left Leg
        fill(18,44,52)
        rect(this.characterXPos + 10, 
             this.characterYpos - 13, 
             this.width[2], 
             this.height[3]
            );
            
        //Left foot
        rect(this.characterXPos + 10, 
             this.characterYpos, 
             this.width[3], 
             this.height[4], 
             this.round
             );
        
        //Arms
            
        fill(237, 210, 190);
        rect(this.characterXPos + 10, 
            this.characterYpos - this.modY[9],6, 22, 2
            );
        }         
      
        //Our character stands facing front    
        else {
            
        //face
        noStroke();    
        fill(this.r[0], this.g[0], this.b[0]);
        rect(this.characterXPos, 
             this.characterYpos - this.modY[7], 
             this.width[0],
             this.height[0]);

        //Hat            
        fill(this.r[1],this.g[1],this.b[1]);            
        triangle(this.characterXPos - this.xHat[0], 
                 this.characterYpos - this.modY[7], 
                 this.xHat[1] + this.characterXPos, 
                 this.characterYpos - 100, 
                 this.xHat[2] + this.characterXPos, 
                 this.characterYpos - this.modY[7]
                );
            
        rect(this.characterXPos - this.modX[5], 
             this.characterYpos - this.modY[10], 
             this.width[4], 
             this.height[5]
                );               
            
        //Body
        fill(this.r[1],this.g[1],this.b[1]);
            
        rect(this.characterXPos - this.modX[2], 
             this.characterYpos - this.modY[9], 
             this.width[1], 
             this.height[2], 
             this.round
                );       
       
        //Left Leg
        fill(18,44,52)
        rect(this.characterXPos, 
             this.characterYpos - 13, 
             this.width[2], 
             this.height[3]
            );
            
        //Left foot
        rect(this.characterXPos - this.modX[0], 
             this.characterYpos, 
             this.width[3], 
             this.height[4], 
             this.round
             );
        
        //Right leg
        
        rect(this.characterXPos + this.modX[1], 
             this.characterYpos - 13, 
             this.width[2], 
             this.height[3]
               );
        
        //Right foot
    
        rect(this.characterXPos + this.modX[1], 
             this.characterYpos, 
             this.width[3], 
             this.height[4], 
             this.round
            );    
        
        //Arms
            
        fill(237, 210, 190);
        rect(this.characterXPos - this.modX[4], 
            this.characterYpos - this.modY[9],
             6, 
             22, 
             2
            );

        rect(this.characterXPos + this.modX[3], 
             this.characterYpos - this.modY[9], 
             6, 
             22, 
             2
            );      
            
        }
                
            
            }
        
       
    };
        
function  createCloud(x, y, width, height, r,g,b, x1, y1, round,mod) 
    {         
        var cloud =
        {            
            x: [129,700,1150],
            y: [70,30],
            width: [180,140],
            height: [60,70],            
            r: [149,80],
            g: [198,40],
            b: [216],
            round: 50,
            mod : 20,
                    
            drawCloud: function()
            {
                for(var i = 0; i < cloud.x.length ; i++)
                {
                     noStroke();
                    
                    fill(this.r[0],this.g[0],this.b[0]                                    
                        );
                    
                    
                    //bottom cloud shape
                    rect(this.x[i], 
                         this.y[0], 
                         this.width[0], 
                         this.height[0],
                         this.round
                         );  
                    
                    //lower cloud shape
                    
                    rect(this.x[i] + this.mod, 
                         this.y[1], 
                         this.width[1], 
                         this.height[1],
                         this.round
                         );  
                }            
            }       
        
        };
        
        return cloud;

    };

// Draw mountains
function drawMountains(t_Mountain)
    {
        var modMount = [118,200,125];
        //Main Mountain
               fill(125,112,108);
               triangle(t_Mountain.x_pos,
                        t_Mountain.y_pos1, 
                        t_Mountain.x_pos2 ,
                        t_Mountain.y_pos2, 
                        t_Mountain.x_pos3,
                        t_Mountain.y_pos3);

        //Snow top
               fill(255);
               triangle(t_Mountain.x_pos + modMount[0], 
                        t_Mountain.y_pos1 - modMount[1], 
                        t_Mountain.x_pos2, 
                        t_Mountain.y_pos2, 
                        t_Mountain.x_pos3 - modMount[2],
                        t_Mountain.y_pos3 - modMount[1]);
    }

//----> RENDER FLAGPOLE OR DRAWS A FLAGPOLE
    function renderFlagpole()
    {  
        push();
        
        modPole = [250,50];
        strokeWeight(5);
        stroke(100);
        line(flagpole.xPos, floorPos_y, flagpole.xPos, floorPos_y - modPole[0]);
        
        fill(255,0,255);
        noStroke;
        
        if(flagpole.isReached && game_score >= 4)
         {
          rect(flagpole.xPos, floorPos_y - modPole[0], 50, 50);   
         }
        
        else
        {
          rect(flagpole.xPos, floorPos_y - modPole[1], 50, 50);  

        }
        
        pop();
    }


//Measures if character is in distance and makes pole reached

function checkFlagpole()
{
    //abs make sures that whatever the value is
    //the sign will be positive
   var d = abs(gameChar_world_x - flagpole.xPos);
    
    if(d < 15 && game_score >= 4)
        {
            flagpole.isReached = true;
        }
    
    if(d < 15 && game_score < 4)
        {
            isReachedNoPotions = true; 
            console.log('need potion');
        }
    else
        {
            isReachedNoPotions = false; 

        }
};

function needPotionSign()
{
    if(isReachedNoPotions){
        fill(255);
        rect(1500, 100, 300,70)
        fill(0);
        textSize(14);
        text("Go back and claim '4' potions",1515,140);
        console.log('Go back and get more potions');
    }
};

//Key control functions

function keyPressed(){

    //Move left with 'A'
    if(keyCode == 65)
        {
            isLeft = true; 
        }
    //Move right with 'D'
    if(keyCode == 68)
        {
            isRight = true;               

        }
    
    // Makes character jump and just once with 'W'  
    if(keyCode == 87 && Character.characterYpos == floorPos_y)
        {
          Character.characterYpos = Character.characterYpos - 100;
          Mjump.play();
        }
          
    //Press 'Space' and goes to pre-game screen
    if(keyCode == 32 && flagpole.isReached == true)
       {
          resetGame(); 
       }
    
    //When dead press 'Space' to restart game

    if(keyCode == 32 && lives <= 0)
        {
            startGame();   
            Mgameover.setVolume(0);
            Mbackground.setVolume(1);
            lives = 3;
        }
    
    //Press 'Enter' to start game in pre-game screen
    if(keyCode == 13)
        {
            Mstart.play();
            isPreScreen = false; 
            isRunning = false;
        }

}

function keyReleased()
{

     if(keyCode == 65)
        {
            isLeft = false;
            
        }
    
    if(keyCode == 68)
        {
            isRight = false;
        }  
    
   if(keyCode == 13)
        {
            isPreScreen = false;

        }
}

function Enemy(x,y,range)
{
    this.x = x;
    this.y = y;
    this.range = range;
    
    this.currentX = x;
    this.inc = 1;
    
    this.update = function()
    {
        this.currentX += this.inc;
        
        if(this.currentX >= this.x + this.range)
            {
                this.inc = -1;
            }
        else if(this.currentX < this.x)
            {
                this.inc = 1;
            }
    }
    
    this.draw = function()
    {
            this.update();
            fill(255,255,0)
            ellipse(this.currentX, this.y, 50 ,50);
            fill(0)
    }
        
    this.checkContact = function(gc_x,gc_y)
    {
        var d = dist(gc_x, gc_y, this.currentX, this.y)
        
        if(d < 30)
            {   
                return true;
                 
            }
        
        return false;
            
    }
    
     this.checkEnemyAround = function(gc_x,gc_y)
    {
        var d = dist(gc_x, gc_y, this.currentX, this.y)
        
        if(d < 80)
            {
                fill(255,0,0);
                ellipse(this.currentX + 2, this.y, 10, 30);

                return true;
                 
            }
        
        return false;
    }
    
     
     
 function signPost()
    {   fill(255);
        rect(-1900, floorPos_y, 150,100)
        text('Nothing else here to find');
    }
    
    
};






