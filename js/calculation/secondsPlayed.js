app.getSecPlayed = function () {
    return app.secPlayed = (Date.now() - app.startTS) / 1000;
};
