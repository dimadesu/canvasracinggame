define(
    [
        'globals',
        'calculation/initGlobals',
        'calculation/calculateFrame',
        'calculation/render',
        'controls/keyboard'
    ],
    function (globals, initGlobals, calculateFrame, render, keyboard) {

        function main () {
            globals.now = Date.now();
            globals.delta = globals.now - globals.then;
            calculateFrame(globals.delta / 1000);
            render();
            globals.then = globals.now;
            globals.requestAnimationFrame.call(window, main);
        }

        initGlobals();
        keyboard.addEventListeners();

        main();

        return main;

    }
);
