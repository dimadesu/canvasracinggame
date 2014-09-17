define(function(){

    var imageFactory = {
        createImage: function (src, onLoadCb) {

            var wrap,
                el = new Image();

            el.src = 'images/' + src;

            el.onload = function () {
                require(['objects/image/imageEventCallbacks'], function (imageEventCallbacks) {
                    imageEventCallbacks.onImageLoad(el, onLoadCb);
                });
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
