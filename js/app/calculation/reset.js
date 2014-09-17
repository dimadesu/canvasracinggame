define(
    ['globals'],
    function(globals){
        // Reset the game when the player catches a wall
        function reset () {
            globals.init();
        }
        return reset;
    }
);
