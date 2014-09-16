define(
    ['jquery'],
    function ($) {

        var inst = window.document.getElementById("canvas");

        var canvas = {
            inst: inst,
            ctx: inst.getContext("2d"),
            setCanvasDimensions: function () {
                inst.width = window.innerWidth;
                inst.height = window.innerHeight;
            }
        };

        canvas.setCanvasDimensions();

        $(window).resize(canvas.setCanvasDimensions);

        return canvas;

    }
);
