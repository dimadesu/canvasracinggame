app.onImageLoad = function (loadedEl, onLoadCb) {

    app.loadedCounter = 0;

    var currentWrap;

    $.each(
        app.images,
        function(wrapIndex, wrap){
            if(wrap.el.src === loadedEl.src) {
                wrap.isLoaded = true;
                currentWrap = wrap;
            }
            app.loadedCounter++;
        }
    );

    if(app.loadedCounter === Object.keys(app.images).length) {
        app.isAllImagesLoaded = true;
        app.onAllImagesLoaded();
    }

    if(onLoadCb != null){
        onLoadCb(currentWrap);
    }

};

app.onAllImagesLoaded = function () {
};
