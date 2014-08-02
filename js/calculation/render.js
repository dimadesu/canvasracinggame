// Draw everything
app.render = function () {

    //app.ctx.clearRect(0, 0, app.canvas.width, app.canvas.height);

    // Bg
    if(app.images.bg.isLoaded){
        app.repeatImage(
            app.images.bg.el,
            app.images.bg.x,
            app.images.bg.y,
            app.canvas.width,
            app.canvas.height + app.images.bg.el.height
        );
    }

    // Wall
    if(app.images.wall.isLoaded){
        app.walls.forEach(function(wall){
            app.repeatImage(app.images.wall.el, wall.x, wall.y, wall.width, wall.height);
            app.ctx.fillStyle = wall.bgColor;
            app.ctx.fillRect(wall.x, wall.y, wall.width, wall.height)
        });
    }

    // Car
    if (app.images.car.isLoaded) {

        app.ctx.drawImage(app.images.car.el, app.car.x, app.car.y);
    }

    // Score
    app.ctx.fillStyle = "white";
    app.ctx.font = "24px Arial Black";
    app.ctx.textAlign = "left";
    app.ctx.textBaseline = "top";
    app.ctx.fillText("Walls avoided: " + app.wallsAvoided, 32, 32);

    // Pause
    if (app.isPaused) {
        app.ctx.textAlign = "center";
        app.ctx.fillText("PAUSE", app.canvas.width / 2, app.canvas.height / 2);
        app.ctx.fillText("Press Space to unpause", app.canvas.width / 2, app.canvas.height / 2 + 30);
    }

    // Game over
    if (app.isGameOver) {
        app.ctx.textAlign = "center";
        app.ctx.fillText("GAME OVER", app.canvas.width / 2, app.canvas.height / 2);
        app.ctx.fillText("Press Space to restart", app.canvas.width / 2, app.canvas.height / 2 + 30);
    }
};
