// The main game loop
app.main = function () {
    app.now = Date.now();
    app.delta = app.now - app.then;

    app.calculateFrame(app.delta / 1000);
    app.render();

    app.then = app.now;

    requestAnimationFrame(app.main);
};

app.initVars();

app.main();
