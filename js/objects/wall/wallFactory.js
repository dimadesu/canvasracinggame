app.createWall = function () {

    var wall = $.extend({}, app.defaultWall);

    // Wall width

    var proportion = 10;

    wall.width = wall.initialWidth + (wall.initialWidth / proportion * app.getSecPlayed());

    if (wall.width >= wall.maxWidth) {
        wall.width = wall.maxWidth;
    }

    // Wall placement

    wall.x = Math.random() * (app.canvas.width - wall.width);

    // Wall bgColor

    var randomColor1 = Math.round(Math.random() * 255);
    var randomColor2 = Math.round(Math.random() * 255);
    var randomColor3 = Math.round(Math.random() * 255);
    wall.bgColor = 'rgba('+randomColor1+','+randomColor2+','+randomColor3+',0.2)';

    return wall;

};
