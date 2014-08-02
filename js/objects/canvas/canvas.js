// Create the canvas
app.canvas = document.getElementById("canvas");
app.ctx = canvas.getContext("2d");

app.setCanvasDimensions = function () {
    app.canvas.width = window.innerWidth;
    app.canvas.height = window.innerHeight;
};

app.setCanvasDimensions();

$(window).resize(app.setCanvasDimensions);
