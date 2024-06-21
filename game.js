// PreWork

var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];

function playSound(key){
    switch (key){
        case "red":
            var audio=new Audio("sounds/red.mp3");
            audio.play();
            break;
        case "blue":
            var audio=new Audio("sounds/blue.mp3");
            audio.play();
            break;
        case "green":
            var audio=new Audio("sounds/green.mp3");
            audio.play();
            break;
        case "yellow":
            var audio=new Audio("sounds/yellow.mp3");
            audio.play();
            break;
        default:
            console.log(key);
    }
}

var randomChosenColour;
var level=0;

function nextSequence(){
    userClickedPattern=[];
    $("h1").text("Level " + level + " start");
    var randomNumber=Math.floor(Math.random()*4);
    randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour+".btn").fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(nextSequence, 1000);
        }
    }
    else{
        var audio=new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    nextSequence();
}


$(".btn").click(function(event){
    var userChosenColour=this.id;
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    
});

$("body").keypress(function(){
    startOver();
});


 
// Game Start
