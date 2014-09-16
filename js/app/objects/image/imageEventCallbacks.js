define(['globals', 'jquery'], function(globals, $){

    var imageEventCallbacks = {};

    imageEventCallbacks.onImageLoad = function (loadedEl, onLoadCb) {

        globals.loadedCounter = 0;

        var currentWrap;

        $.each(
            globals.images,
            function(wrapIndex, wrap){
                if(wrap.el.src === loadedEl.src) {
                    wrap.isLoaded = true;
                    currentWrap = wrap;
                }
                globals.loadedCounter++;
            }
        );

        if(globals.loadedCounter === Object.keys(globals.images).length) {
            globals.isAllImagesLoaded = true;
            imageEventCallbacks.onAllImagesLoaded();
        }

        if(onLoadCb != null){
            onLoadCb(currentWrap);
        }

    };

    imageEventCallbacks.onAllImagesLoaded = function () {
    };

    return imageEventCallbacks;

});
