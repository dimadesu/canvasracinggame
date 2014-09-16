define(['objects/image/imageEventCallbacks'], function(imageEventCallbacks){

    var imageFactory = {
        createImage: function (src, onLoadCb) {

            var wrap,
                el = new Image();

            el.src = 'images/' + src;

            el.onload = function () {
                imageEventCallbacks.onImageLoad(el, onLoadCb);
            };

            wrap = {
                el: el,
                isLoaded: false
            };

            return wrap;

        }
    };

    return imageFactory;

});
