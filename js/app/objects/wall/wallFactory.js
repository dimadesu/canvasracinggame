define(
    [
        'jquery',
        'objects/canvas/canvas',
        'helpers/rgba'
    ],
    function($, canvas, rgba) {

        var wallFactory = {

            // Note: have to pass globals since I can't import globals into this module or else
            // there will be circular dependency
            createWall: function (globals) {

                var wall = $.extend({}, globals.defaultWall);
                var proportion = 10;

                wall.width = wall.initialWidth + (wall.initialWidth / proportion * globals.secondsPlayed());

                if (wall.width >= wall.maxWidth) {
                    wall.width = wall.maxWidth;
                }

                // Wall placement

                wall.x = Math.random() * (canvas.inst.width - wall.width);

                // Wall bgColor

                var randomColor1 = Math.round(Math.random() * 255);
                var randomColor2 = Math.round(Math.random() * 255);
                var randomColor3 = Math.round(Math.random() * 255);
                wall.bgColor = rgba(0.2);

                return wall;

            }

        };

        return wallFactory;

    }
);
