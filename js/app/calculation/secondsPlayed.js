define(
    ['globals'],
    function(globals){
        function secondsPlayed () {
            return globals.secPlayed = (Date.now() - globals.startTS) / 1000;
        }
        return secondsPlayed;
    }
);
