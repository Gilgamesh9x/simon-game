var buttonColours = ["green", "red", "yellow", "blue"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;

var gameStarted = false;

$("button").one('click', function () {
    gameStarted = true;
    nextSequence();
})

function nextSequence() {

    $("button").addClass("no-click");
    userClickedPattern = []; // we reset the value in the next level

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    
    //
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}


$(".btnn").on("click", function() {
    if (gameStarted === true) {
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        
        console.log(userClickedPattern);
        checkAnswer(userClickedPattern.length - 1);
    }
});



function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.volume = 0.1;
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 150)
}


function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Success.");

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000); }

    } else {
        console.log("Wrong.");
        playSound('wrong');
        $('body').addClass("game-over");
        setTimeout(function() {
            $('body').removeClass("game-over")
        }, 200);
        $("h1").text("Game Over.");
        $("button").text('Play Again')
        $("button").removeClass("no-click");
        $("button").one('click', function () {
            startOver();
        })
    }
}


function startOver() {
    gamePattern = [];
    level = 0;
    nextSequence();
}














