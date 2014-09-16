define(
    [
        'globals',
        'objects/canvas/canvas',
        'objects/wall/wallFactory',
        'objects/image/imageFactory'
    ],
    function(globals, canvas, wallFactory, imageFactory) {

        function initGlobals () {

            globals.requestAnimationFrame = window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                window.mozRequestAnimationFrame;

            globals.then = Date.now();
            globals.startTS = Date.now();

            // Game objects
            globals.car = {
                speed: 1000, // movement in pixels per second
                width: 60,
                height: 100,
                bgColor: "#c00"
            };

            globals.car.x = canvas.inst.width / 2 - globals.car.width / 2;
            globals.car.y = canvas.inst.height - globals.car.height;

            // Walls

            globals.defaultWall = {
                x: 0,
                y: 0,
                width: 100,
                height: 100
            };

            globals.defaultWall.y = -globals.defaultWall.height;

            globals.defaultWall.initialWidth = globals.defaultWall.width;
            globals.defaultWall.maxWidth = canvas.inst.width / 5;

            globals.walls = [wallFactory.createWall()];

            globals.wallsVertSpace = canvas.inst.height * 3 / 4;

            globals.wallsAvoided = 0;
            globals.isGameOver = false;
            globals.isPaused = false;
            globals.pauseTimeoutId = undefined;

            // Handle keyboard controls
            globals.keysDown = {};
            globals.keysUp = {};

            // Images
            globals.isAllImagesLoaded = false;
            globals.images = {
                car: imageFactory.createImage('car.png', function(wrap){
                    globals.car.width = wrap.el.width;
                    globals.car.height = wrap.el.height;
                }),
                bg: imageFactory.createImage('bg.jpg', function(wrap){
                    wrap.y = -wrap.el.height;
                }),
                wall: imageFactory.createImage('wall.png')
            };
            globals.images.bg.x = 0;
            globals.images.bg.y = 0;

            // Speed
            globals.initialSpeed = 200;
            globals.speedProportion = 0.1;
            globals.maxSpeed = 1000;

        }

        return initGlobals;

    }
);
