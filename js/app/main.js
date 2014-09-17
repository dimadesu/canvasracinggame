define(
    [
        'globals',
        'calculation/calculateFrame',
        'calculation/render',
        'controls/keyboard'
    ],
    function (globals, calculateFrame, render, keyboard) {

        function main () {
            globals.now = Date.now();
            globals.delta = globals.now - globals.then;
            calculateFrame(globals.delta / 1000);
            render();
            globals.then = globals.now;
            globals.requestAnimationFrame.call(window, main);
        }

        main();

        return main;

    }
);
