define(
    [
        'globals',
        'objects/canvas/canvas',
        'custom-libs/imageRepeat',
        'objects/grid/grid'
    ],
    function(globals, canvas, imageRepeat, grid){
        
        // Draw everything
        function render () {
        
            canvas.ctx.clearRect(0, 0, canvas.inst.width, canvas.inst.height);
        
            // Bg
            /*if(globals.images.bg.isLoaded){
                imageRepeat(
                    globals.images.bg.el,
                    globals.images.bg.x,
                    globals.images.bg.y,
                    canvas.inst.width,
                    canvas.inst.height + globals.images.bg.el.height
                );
            }*/

            // Grid
            grid.forEach(function(cell, index){
                canvas.ctx.fillStyle = cell.bgColor;
                canvas.ctx.fillRect(
                    cell.x,
                    0,
                    cell.width,
                    canvas.inst.height
                )
            });
        
            // Wall
            if(globals.images.wall.isLoaded){
                globals.walls.forEach(function(wall){
                    imageRepeat(globals.images.wall.el, wall.x, wall.y, wall.width, wall.height);
                    canvas.ctx.fillStyle = wall.bgColor;
                    canvas.ctx.fillRect(wall.x, wall.y, wall.width, wall.height)
                });
            }
        
            // Car
            if (globals.images.car.isLoaded) {
                canvas.ctx.drawImage(globals.images.car.el, globals.car.x, globals.car.y);
            }
        
            // Score
            canvas.ctx.fillStyle = "white";
            canvas.ctx.font = "24px Arial Black";
            canvas.ctx.textAlign = "left";
            canvas.ctx.textBaseline = "top";
            canvas.ctx.fillText("Walls avoided: " + globals.wallsAvoided, 32, 32);
        
            // Pause
            if (globals.isPaused) {
                canvas.ctx.textAlign = "center";
                canvas.ctx.fillText("PAUSE", canvas.inst.width / 2, canvas.inst.height / 2);
                canvas.ctx.fillText("Press Space to unpause", canvas.inst.width / 2, canvas.inst.height / 2 + 30);
            }
        
            // Game over
            if (globals.isGameOver) {
                canvas.ctx.textAlign = "center";
                canvas.ctx.fillText("GAME OVER", canvas.inst.width / 2, canvas.inst.height / 2);
                canvas.ctx.fillText("Press Space to restart", canvas.inst.width / 2, canvas.inst.height / 2 + 30);
            }
        }

        return render;

    }
);
