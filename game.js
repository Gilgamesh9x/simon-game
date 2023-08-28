var buttonColours = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;


$("button").one('click', function () { // the game starts when the button "play" is clicked
    nextSequence();
})

function nextSequence() {
    gameStarted = true; // game starts when nextSequence is started
    $(".btnn").removeClass("no-click"); // because in the delay of 1 sec, we want no clicks

    userClickedPattern = []; // we reset the value in the next level

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    
    //
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); // the flash animation
    playSound(randomChosenColor);

}


$(".btnn").on("click", function() {
    if (gameStarted === true) {
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        
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

        if (userClickedPattern.length === gamePattern.length){
            gameStarted = false; // no user clicks will be entered until the the delay of 1 sec
            $(".btnn").addClass("no-click");
            
            setTimeout(function () {
                nextSequence();
              }, 1000); }

    } else {
        playSound('wrong');
        $('body').addClass("game-over");
        setTimeout(function() {
            $('body').removeClass("game-over")
        }, 200);
        $("h1").text("Game Over.");
        $(".btnn").addClass("no-click");
        gameStarted = false; // when game is over, user won't be able to click
        $("button").text('Play Again')
        $("button").removeClass("no-click");
        $("button").one('click', function () {
            gameStarted = true;
            startOver();;
        })
    }
}


function startOver() {
    gamePattern = [];
    level = 0;
    nextSequence();
}





