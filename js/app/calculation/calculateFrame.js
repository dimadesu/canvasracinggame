// Update game objects
define(
    [
        'globals',
        'objects/canvas/canvas',
        'custom-libs/collision',
        'calculation/secondsPlayed',
        'objects/wall/wallFactory',
        'calculation/reset'
    ],
    function(globals, canvas, collision, secondsPlayed, wallFactory, reset){

        function calculateFrame (modifier) {

            // Space bar
            if (32 in globals.keysUp) {

                delete globals.keysUp[32];

                if (globals.isGameOver) {
                    reset();
                } else {

                    // Pause
                    globals.isPaused = !globals.isPaused;

                    if (globals.isPaused) {
                        globals.pauseTS = Date.now();
                    } else {
                        // Unpaused
                        var millisecondsPassed = Date.now() - globals.pauseTS;
                        globals.startTS = globals.startTS + millisecondsPassed;
                    }

                }

            }

            if (globals.isPaused || globals.isGameOver) {
                return;
            }

            // Car

            if (38 in globals.keysDown) { // Up
                globals.car.y -= globals.car.speed * modifier;
            }
            if (40 in globals.keysDown) { // Down
                globals.car.y += globals.car.speed * modifier;
            }
            if (37 in globals.keysDown) { // Left
                globals.car.x -= globals.car.speed * modifier;
            }
            if (39 in globals.keysDown) { // Right
                globals.car.x += globals.car.speed * modifier;
            }

            // Car position
            if (globals.car.x <= 0) {
                globals.car.x = 0;
            } else if (globals.car.x + globals.car.width >= canvas.inst.width) {
                globals.car.x = canvas.inst.width - globals.car.width;
            }

            if ((globals.car.y + globals.car.height) >= canvas.inst.height) {
                globals.car.y = canvas.inst.height - globals.car.height;
            } else if (globals.car.y <= 0) {
                globals.car.y = 0;
            }

            globals.car.pointBL = collision.Point(
                globals.car.x,
                globals.car.y + globals.car.height,
                globals.car.pointBL
            );

            globals.car.pointTR = collision.Point(
                globals.car.x + globals.car.width,
                globals.car.y,
                globals.car.pointTR
            );

            // Move wall and bg
            globals.speedIncreaseOverTime = secondsPlayed() / globals.speedProportion;
            globals.resultedSpeed = globals.initialSpeed + globals.speedIncreaseOverTime;
            if (globals.resultedSpeed >= globals.maxSpeed) {
                globals.resultedSpeed = globals.maxSpeed;
            }

            globals.walls.forEach(function(wall, wallIndex){

                wall.y += globals.resultedSpeed * modifier;

                // Spawn new wall
                var isLast = wallIndex + 1 === globals.walls.length;
                if (isLast && globals.walls[0].y > globals.wallsVertSpace) {
                    globals.walls.unshift(wallFactory.createWall());
                }

                // Delete obj
                if (wall.y > canvas.inst.height) {
                    globals.walls.pop();
                    ++globals.wallsAvoided;
                }

                if (!globals.isGameOver) {

                    // Are they touching?
                    wall.pointBL = collision.Point(
                        wall.x,
                        wall.y + wall.height,
                        wall.pointBL
                    );

                    wall.pointTR = collision.Point(
                        wall.x + wall.width,
                        wall.y,
                        wall.pointTR
                    );

                    globals.isGameOver = collision.doOverlap(globals.car.pointBL, globals.car.pointTR, wall.pointBL, wall.pointTR);

                }

            });

            // Bg
            globals.images.bg.y = globals.images.bg.y + globals.resultedSpeed * modifier;
            if (globals.images.bg.y >= 0) {
                globals.images.bg.y = -(globals.images.bg.el.height - globals.images.bg.y);
            }

        }

        return calculateFrame;

    }
);
