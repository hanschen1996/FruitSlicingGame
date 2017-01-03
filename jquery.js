var playing = false;
var fruits = ["apple.png", "banana.png", "cherries.png", "grapes.png", 
              "mango.png", "orange.png", "peach.png", "pear.png", 
              "watermelon.png"];
var score = 0;     // keep track of score
var trialLeft = 3; // trials left for the user
var fruitIndex;    // randomly generated fruit index
var step;          // the step that the fruit is dropping every time
var myInterval;    // interval for dropping fruit every certain time period

$(function() {
	$("#startreset").click(function() {
		if (playing) {// reload the page
			window.location.reload();
		}

		else {
			initializeGame();
			dropFruit();
		}
	});

	$(".fruit").mouseover(function() {
		clearInterval(myInterval);
		// document.getElementById("sliceSound").play();
		$("#sliceSound")[0].play(); // array, so select the first element, which is the audio file
		score += 1;
		$("#scoreValue").text(score);
		$("#fruit1").hide("explode", 500);
		setTimeout(dropFruit, 800);
	});

	// initialize the game, reset all the variables
	function initializeGame() {
		playing = true;
		score = 0; // reset score
		trialLeft = 3; // 3 trials left at the beginning
		$("#gameover").hide(); // hide the gameover screen
		$("#startreset").text("Reset Game!"); // change button text
		$("#trialLeft").show(); // show trial left
		$("#scoreValue").text(score); // display initial score
		for (i = 0; i < trialLeft; i ++)
		{
			$("#trialLeft").append("<img src = 'images/heart.png' class = 'life'></img>");
		}
	}

	// drop a fruit in the game
	function dropFruit() {

		// generate the fruit first
		generateFruit();
		
		// set up an interval
		myInterval = setInterval(function() {

			$(".fruit").css("top", $(".fruit").position().top + step);

			if ($(".fruit").position().top >= $("#fruitContainer").height()) { // fruit too low!
				trialLeft --; // minus 1 trial

				$("#trialLeft img:last-child").remove();

				if (trialLeft <= 0) { // check if user loses
					displayGameover();
				}
				else { // haven't lost, generate new fruit and new position
					generateFruit();
				}
			}
		}, 10);
	}

	// generate a random fruit, and set its initial position
	function generateFruit() {
		// pick a random fruit
		fruitIndex = Math.round((fruits.length - 1) * Math.random());

		// show the image
		$("#fruit1").attr("src", "images/" + fruits[fruitIndex]);

		// give it a random horizontal position
		$(".fruit").css({
			"left": Math.round(550 * Math.random()),
			"top": -50
		});

		$("#fruit1").show();

		// generate a random step
		step = 1 + Math.round(6 * Math.random());
	}

	// when the game is over, display the gameover screen
	function displayGameover() {
		clearInterval(myInterval);
		$("#fruit1").hide();
		$("#trialLeft").hide(); // hide the trial left box
		$("#startreset").text("Start Game!"); // change the text of start/reset
		$("#gameover").show(); // show gameover screen
		$("#finalScore").text(score); // display the score
		playing = false;
	}
});