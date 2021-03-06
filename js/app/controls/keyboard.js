define(
    ['globals'],
    function(globals){

        var keyboard = {};

        keyboard.addEventListeners = function () {

            window.addEventListener("keydown", function (e) {
                globals.keysDown[e.keyCode] = true;
                delete globals.keysUp[e.keyCode];
            }, false);

            window.addEventListener("keyup", function (e) {
                delete globals.keysDown[e.keyCode];
                globals.keysUp[e.keyCode] = true;
            }, false);

        };

        return keyboard;

    }
);
