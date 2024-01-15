// how the Simon game works.

// Firstly, the game shows the first colour in the sequence (blue). The user clicks on the blue button.

// Next, the game shows the next colour (red), the user has to remember the sequence is blue, red and so on and so forth.

// If the user messes up the sequence, then the game ends.

var userClickedPattern = [];
const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];

//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

var level =0;

$(document).keypress(function() {
if (!started) {
    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level"+" " +level);
    nextSequence();
    started = true;
  }}
  );

  $(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
  
  
    //1. In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played.
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
  });

  function checkAnswer(currentlevel){
    if(userClickedPattern[currentlevel]===gamePattern[currentlevel]){
     console.log("right");
    
    if(userClickedPattern.length === gamePattern.length){
     // calling nextSequence method after some delay 
     setTimeout(() => {
         nextSequence();
     }, 1000);
    }
   }
    else{
     playSound("wrong");
     $("body").addClass("game-over");
     setTimeout(() => {
      $("body").removeClass("game-over");
     }, 200);

     $("#level-title").text("Game Over, Press Any Key to Restart");

     startOver();
    }
 }

 
function nextSequence() {

    // once user clicked pattern set userclicked pattern array to empty 
  userClickedPattern = [];
  //4. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;
  // to display incremented level have to change text
  $("#level-title").text("Level"+" " +level);
  
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  //1. Use jQuery to select the button with the same id as the randomChosenColour
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  //4. Refactor the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.
  playSound(randomChosenColor);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver(){
   level = 0;
   gamePattern = [];
   started = false;
}