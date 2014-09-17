define(
    [
        'objects/canvas/canvas',
        'objects/wall/wallFactory',
        'objects/image/imageFactory'
    ],
    function (canvas, wallFactory, imageFactory) {
        var globals = {
            requestAnimationFrame: null,
            now: null,
            delta: null,
            then: null, // timestamp
            startTS: null, // timestamp
            pauseTS: null, // ts milliseconds
            secPlayed: null, // sec
            // Objects
            car: null,
            walls: null,
            defaultWall: null,
            wallsVertSpace: null,
            // Counter
            wallsAvoided: null,
            // Pause and game over states
            isGameOver: null,
            isPaused: null,
            pauseTimeoutId: null,
            // Keys
            keysUp: null,
            keysDown: null,
            isKeySkip: null,
            // Images
            images: null,
            isAllImagesLoaded: null,
            // Speed
            initialSpeed: null,
            speedProportion: null,
            speedIncreaseOverTime: null,
            maxSpeed: null,
            resultedSpeed: null,
            // Etc.
            cellsTotal: null,
            activeCellIndex: null
        };

        globals.secondsPlayed = function () {
            return globals.secPlayed = (Date.now() - globals.startTS) / 1000;
        };

        globals.init = function () {

            globals.requestAnimationFrame = window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                window.mozRequestAnimationFrame;

            globals.then = Date.now();
            globals.startTS = Date.now();

            // Game objects

            globals.cellsTotal = 6;
            globals.activeCellIndex = 2;

            globals.car = {
                speed: 1000, // movement in pixels per second
                width: 60,
                height: 100
            };

            globals.car.x = 0;//canvas.inst.width / 2 - globals.car.width / 2;
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

            globals.walls = [wallFactory.createWall(globals)];

            globals.wallsVertSpace = canvas.inst.height * 3 / 4;

            globals.wallsAvoided = 0;
            globals.isGameOver = false;
            globals.isPaused = false;
            globals.pauseTimeoutId = undefined;

            // Handle keyboard controls
            globals.keysDown = {};
            globals.keysUp = {};
            globals.isKeySkip = false;

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

        };

        globals.init();

        return globals;
    }
);
