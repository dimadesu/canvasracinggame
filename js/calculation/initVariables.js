app.initVars = function () {

    var w = window;
    app.requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

    app.then = Date.now();
    app.startTS = Date.now();

    // Game objects
    app.car = {
        speed: 1000, // movement in pixels per second
        width: 60,
        height: 100,
        bgColor: "#c00"
    };

    app.car.x = app.canvas.width / 2 - app.car.width / 2;
    app.car.y = app.canvas.height - app.car.height;

    // Walls

    app.defaultWall = {
        x: 0,
        y: 0,
        width: 100,
        height: 100
    };

    app.defaultWall.y = -app.defaultWall.height;

    app.defaultWall.initialWidth = app.defaultWall.width;
    app.defaultWall.maxWidth = app.canvas.width / 5;

    app.walls = [app.createWall()];

    app.wallsVertSpace = app.canvas.height * 3 / 4;

    app.wallsAvoided = 0;
    app.isGameOver = false;
    app.isPaused = false;
    app.pauseTimeoutId = undefined;

    // Handle keyboard controls
    app.keysDown = {};
    app.keysUp = {};

    // Images
    app.isAllImagesLoaded = false;
    app.images = {
        car: app.createImage('car.png', function(wrap){
            app.car.width = wrap.el.width;
            app.car.height = wrap.el.height;
        }),
        bg: app.createImage('bg.jpg', function(wrap){
            wrap.y = -wrap.el.height;
        }),
        wall: app.createImage('wall.png')
    };
    app.images.bg.x = 0;
    app.images.bg.y = 0;

    // Speed
    app.initialSpeed = 200;
    app.speedProportion = 0.1;
    app.maxSpeed = 1000;

};
