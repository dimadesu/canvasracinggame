define(
    ['calculation/initGlobals'],
    function(initGlobals){
        // Reset the game when the player catches a wall
        function reset () {
            initGlobals();
        }
        return reset;
    }
);
