define(
    ['globals', 'jquery', 'calculation/secondsPlayed', 'objects/canvas/canvas'],
    function(globals, $, secondsPlayed, canvas) {

        var wallFactory = {

            createWall: function () {

                var wall = $.extend({}, globals.defaultWall);
                var proportion = 10;

                wall.width = wall.initialWidth + (wall.initialWidth / proportion * secondsPlayed());

                if (wall.width >= wall.maxWidth) {
                    wall.width = wall.maxWidth;
                }

                // Wall placement

                wall.x = Math.random() * (canvas.inst.width - wall.width);

                // Wall bgColor

                var randomColor1 = Math.round(Math.random() * 255);
                var randomColor2 = Math.round(Math.random() * 255);
                var randomColor3 = Math.round(Math.random() * 255);
                wall.bgColor = 'rgba(' + randomColor1 + ',' + randomColor2 + ',' + randomColor3 + ',0.2)';

                return wall;

            }

        };

        return wallFactory;

    }
);
