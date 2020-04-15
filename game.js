let gamePattern = [];
let userClickedPattern = [];
let level = 0;
/* all colors  */
let buttonColors = ["red", "blue", "green", "yellow"];
 
/* all sounds in array */
let buttonSounds = [];
buttonSounds.push(new Audio("sounds/red.mp3"));
buttonSounds.push(new Audio("sounds/blue.mp3"));
buttonSounds.push(new Audio("sounds/green.mp3"));
buttonSounds.push(new Audio("sounds/yellow.mp3"));
// buttonSounds.push(new Audio("sounds/wrong.mp3"));

/* register button that got clicked */

for (let i = 0; i < buttonColors.length; i++) {
    $("#" + buttonColors[i]).on("click", function() {
        let userChosenColour = $("#" + buttonColors[i]).attr("id");
        if (level > 0) {
            userClickedPattern.push(userChosenColour);
            checkAnswer(userClickedPattern.length - 1);
        }
        playSound(i);
        animePress(buttonColors[i]);
    });
}

/* init game */
$(document).on("keydown", function () {
    if (level === 0) {
        nextSequence();
    }
});

function checkAnswer(currlevel) {
    if (userClickedPattern[currlevel] != gamePattern[currlevel]) {
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
    }
    else if (currlevel === gamePattern.length - 1) {
        setTimeout(nextSequence, 1000);
        userClickedPattern = [];
    }
}

/* Random num 0-4 */
function nextSequence() {
    let randomNum = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNum];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(250).fadeIn(250);
    playSound(randomNum);
    $("h1").text("Level " + level);
    level++;
}

function playSound(i) {
    buttonSounds[i].play();
}

function animePress(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(function () {
        $("." + currentColor).removeClass("pressed");
    }, 100);
}