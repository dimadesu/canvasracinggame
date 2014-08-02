app.createImage = function (src, onLoadCb) {

    var wrap,
        el = new Image();

    el.src = 'images/' + src;

    el.onload = function () {
        app.onImageLoad(el, onLoadCb);
    };

    wrap = {
        el: el,
        isLoaded: false
    };

    return wrap;
};
