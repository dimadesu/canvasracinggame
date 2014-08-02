window.addEventListener("keydown", function (e) {
    app.keysDown[e.keyCode] = true;
    delete app.keysUp[e.keyCode];
}, false);

window.addEventListener("keyup", function (e) {
    delete app.keysDown[e.keyCode];
    app.keysUp[e.keyCode] = true;
}, false);
