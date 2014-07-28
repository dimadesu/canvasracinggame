(function(){

	// Create the canvas
	window.canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
	function setCanvasDimensions () {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	setCanvasDimensions();

	$(window).resize(setCanvasDimensions);

	var then, // timestamp
		startTS, // timestamp
		pauseTS,
		secPlayed,
		car,
		wall,
		wallsAvoided,
		isGameOver,
		isPaused,
		pauseTimeoutId,
		keysUp,
		keysDown;

	function initVars () {

		then = Date.now();
		startTS = Date.now();

		// Game objects
		car = {
			speed: 1000, // movement in pixels per second
			width: 60,
			height: 100,
			bgColor: "red"
		};

		car.x = canvas.width / 2 - car.width / 2;
		car.y = canvas.height - car.height;

		wall = {
			x: 0,
			y: 0,
			width: 100,
			height: 100,
			bgColor: "green"
		};

		wall.initialWidth = wall.width;
		wall.maxWidth = canvas.width - (car.width * 2);

		wallsAvoided = 0;
		isGameOver = false;
		isPaused = false;
		pauseTimeoutId = undefined;

		// Handle keyboard controls
		keysDown = {},
		keysUp = {};
	}

	window.addEventListener("keydown", function (e) {
		keysDown[e.keyCode] = true;
		delete keysUp[e.keyCode];
	}, false);

	window.addEventListener("keyup", function (e) {
		delete keysDown[e.keyCode];
		keysUp[e.keyCode] = true;
	}, false);

	// Reset the game when the player catches a wall
	function reset () {
		initVars();
		resetWall();
	};

	function resetWall () {
		// Throw the wall somewhere on the screen randomly
		wall.x = Math.random() * (canvas.width - wall.width);
		wall.y = 0 - wall.height;
	}

	function doOverlap(l1, r1, l2, r2) {
	    // If one rectangle is on left side of other
	    if (l1.x > r2.x || l2.x > r1.x)
	        return false;
	 
	    // If one rectangle is above other
	    if (l1.y < r2.y || l2.y < r1.y)
	        return false;
	 
	    return true;
	}

	function Point (x, y, obj) {
		// In order to not create new obejects in memory
		if (obj !== undefined) {
			obj.x = x;
			obj.y = y;
			return obj;
		} else {
			return {
				x: x,
				y: y
			}
		}
	}

	// Update game objects
	function update (modifier) {
		
		// Space bar
		if (32 in keysUp) {

			delete keysUp[32];
			
			if (isGameOver) {
				reset();
			} else {
				// Pause
				
				isPaused = !isPaused;

				if (isPaused) {
					pauseTS = Date.now();
				} else {
					var millisecondsPassed = Date.now() - pauseTS;
					startTS = startTS + millisecondsPassed;
				}

			}

		}

		if (isPaused || isGameOver) {
			return;
		}

		// Car

		if (38 in keysDown) { // Player holding up
			car.y -= car.speed * modifier;
		}
		if (40 in keysDown) { // Player holding down
			car.y += car.speed * modifier;
		}
		if (37 in keysDown) { // Left
			car.x -= car.speed * modifier;
		}
		if (39 in keysDown) { // Right
			car.x += car.speed * modifier;
		}

		// Car position
		if (car.x <= 0) {
			car.x = 0;
		} else if (car.x + car.width >= canvas.width) {
			car.x = canvas.width - car.width;
		}

		if ((car.y + car.height) >= canvas.height) {
			car.y = canvas.height - car.height;
		} else if (car.y <= 0) {
			car.y = 0;
		}

		// Increase wall width
		secPlayed = (Date.now() - startTS) / 1000;
		proportion = 10;

		wall.width = wall.initialWidth + (wall.initialWidth / proportion * secPlayed);
		if (wall.width >= wall.maxWidth) {
			wall.width = wall.maxWidth;
		}

		// Move wall
		var initialSpeed = 5;
		var speedProportion = 2;
		var speedIncreaseOverTime = secPlayed / speedProportion;
		var maxSpeed = 10;
		var resultedSpeed = initialSpeed + speedIncreaseOverTime;
		if (resultedSpeed >= maxSpeed) {
			resultedSpeed = maxSpeed;
		}

		wall.y = wall.y + resultedSpeed;

		if (wall.y > canvas.height) {
			resetWall();
			++wallsAvoided;
		}

		// Are they touching?
		car.pointBL = Point(
			car.x,
			car.y + car.height,
			car.pointBL
		);
		car.pointTR = Point(
			car.x + car.width,
			car.y,
			car.pointTR
		);
		wall.pointBL = Point(
			wall.x,
			wall.y + wall.height,
			wall.pointBL
		);
		wall.pointTR = Point(
			wall.x + wall.width,
			wall.y,
			wall.pointTR
		);

		isGameOver = doOverlap(car.pointBL, car.pointTR, wall.pointBL, wall.pointTR);

	};

	// Draw everything
	function render () {
		
		// Bg
		ctx.fillStyle = "gray";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Wall
		ctx.fillStyle = wall.bgColor;

		ctx.fillRect(
			wall.x, // x
			wall.y, // y
			wall.width, // w
			wall.height // h
		);

		// Car
		ctx.fillStyle = car.bgColor;
		ctx.fillRect(car.x, car.y, car.width, car.height);

		// Score
		ctx.fillStyle = "white";
		ctx.font = "24px Arial Black";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText("Walls avoided: " + wallsAvoided, 32, 32);

		// Pause
		if (isPaused) {
			ctx.textAlign = "center";
			ctx.fillText("PAUSE", canvas.width / 2, canvas.height / 2);
			ctx.fillText("Press Space to unpause", canvas.width / 2, canvas.height / 2 + 30);
		}

		// Game over
		if (isGameOver) {
			ctx.textAlign = "center";
			ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
			ctx.fillText("Press Space to restart", canvas.width / 2, canvas.height / 2 + 30);
		}
	};

	// Cross-browser support for requestAnimationFrame
	var w = window;
	requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

	// The main game loop
	function main () {
		var now = Date.now();
		var delta = now - then;

		update(delta / 1000);
		render();

		then = now;

		// Request to do this again ASAP
		requestAnimationFrame(main);
	};
	reset();
	main();

})();
