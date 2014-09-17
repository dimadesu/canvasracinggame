define(function () {
    function randomColor () {
        return Math.round(Math.random() * 255);
    }

    return function (alpha) {
        var randomColor1 = randomColor();
        var randomColor2 = randomColor();
        var randomColor3 = randomColor();
        return 'rgba(' + randomColor1 + ',' + randomColor2 + ',' + randomColor3 + ',' + alpha + ')';
    };
});
