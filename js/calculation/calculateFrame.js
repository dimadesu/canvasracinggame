// Update game objects
app.calculateFrame = function (modifier) {

    // Space bar
    if (32 in app.keysUp) {

        delete app.keysUp[32];

        if (app.isGameOver) {
            app.reset();
        } else {

            // Pause
            app.isPaused = !app.isPaused;

            if (app.isPaused) {
                app.pauseTS = Date.now();
            } else {
                // Unpaused
                var millisecondsPassed = Date.now() - app.pauseTS;
                app.startTS = app.startTS + app.millisecondsPassed;
            }

        }

    }

    if (app.isPaused || app.isGameOver) {
        return;
    }

    // Car

    if (38 in app.keysDown) { // Up
        app.car.y -= app.car.speed * modifier;
    }
    if (40 in app.keysDown) { // Down
        app.car.y += app.car.speed * modifier;
    }
    if (37 in app.keysDown) { // Left
        app.car.x -= app.car.speed * modifier;
    }
    if (39 in app.keysDown) { // Right
        app.car.x += app.car.speed * modifier;
    }

    // Car position
    if (app.car.x <= 0) {
        app.car.x = 0;
    } else if (app.car.x + app.car.width >= app.canvas.width) {
        app.car.x = app.canvas.width - app.car.width;
    }

    if ((app.car.y + app.car.height) >= app.canvas.height) {
        app.car.y = app.canvas.height - app.car.height;
    } else if (app.car.y <= 0) {
        app.car.y = 0;
    }

    app.car.pointBL = app.Point(
        app.car.x,
        app.car.y + app.car.height,
        app.car.pointBL
    );

    app.car.pointTR = app.Point(
        app.car.x + app.car.width,
        app.car.y,
        app.car.pointTR
    );

    // Move wall and bg
    app.speedIncreaseOverTime = app.getSecPlayed() / app.speedProportion;
    app.resultedSpeed = app.initialSpeed + app.speedIncreaseOverTime;
    if (app.resultedSpeed >= app.maxSpeed) {
        app.resultedSpeed = app.maxSpeed;
    }

    app.walls.forEach(function(wall, wallIndex){

        wall.y += app.resultedSpeed * modifier;

        // Spawn new wall
        var isLast = wallIndex + 1 === app.walls.length;
        if (isLast && app.walls[0].y > app.wallsVertSpace) {
            app.walls.unshift(app.createWall());
        }

        // Delete obj
        if (wall.y > app.canvas.height) {
            app.walls.pop();
            ++app.wallsAvoided;
        }

        if (!app.isGameOver) {

            // Are they touching?
            wall.pointBL = app.Point(
                wall.x,
                wall.y + wall.height,
                wall.pointBL
            );

            wall.pointTR = app.Point(
                wall.x + wall.width,
                wall.y,
                wall.pointTR
            );

            app.isGameOver = app.doOverlap(app.car.pointBL, app.car.pointTR, wall.pointBL, wall.pointTR);

        }

    });

    // Bg
    app.images.bg.y = app.images.bg.y + app.resultedSpeed * modifier;
    if (app.images.bg.y >= 0) {
        app.images.bg.y = -(app.images.bg.el.height - app.images.bg.y);
    }

};
