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
                /*var proportion = 10;

                wall.width = wall.initialWidth + (wall.initialWidth / proportion * globals.secondsPlayed());

                if (wall.width >= wall.maxWidth) {
                    wall.width = wall.maxWidth;
                }*/

                // Wall placement
                var randomPercent = Math.random() * 100;
                var gridWidth = globals.cellsTotal * globals.cellWidth;
                var onePercent = gridWidth / 100;
                var generatedX = onePercent * randomPercent;
                var cellNumber = Math.floor(generatedX / globals.cellWidth);
                wall.x = cellNumber * globals.cellWidth;

                // Wall bgColor
                wall.bgColor = rgba(0.2);

                return wall;

            }

        };

        return wallFactory;

    }
);
