app.repeatImage = function (imageEl, startX, startY, containerWidth, containerHeight) {

    var repeatTimesHoriz = Math.floor(containerWidth / imageEl.width);
    var repeatTimesVert = Math.floor(containerHeight / imageEl.height);
    var widthModulus = containerWidth % imageEl.width;
    var heightModulus = containerHeight % imageEl.height;
    // FF doesn't like when width or height is smaller then 1
    if (widthModulus < 1) {
        widthModulus = 1;
    }
    if (heightModulus < 1) {
        heightModulus = 1;
    }

    for (var i=0; i <= repeatTimesVert; i++){
        for (var j=0; j <= repeatTimesHoriz; j++){

            var x = startX + imageEl.width * j;
            var y = startY + imageEl.height * i;
            var width = imageEl.width;
            var height = imageEl.height;

            // Last row and last row item
            if (i === repeatTimesVert && j === repeatTimesHoriz) {
                app.ctx.drawImage(imageEl, 0, 0, widthModulus, heightModulus, x, y, widthModulus, heightModulus);
                // Last row. Cut height
            } else if (i === repeatTimesVert) {
                app.ctx.drawImage(imageEl, 0, 0, width, heightModulus, x, y, width, heightModulus);
                // Last row item. Cut width
            } else if (j === repeatTimesHoriz) {
                app.ctx.drawImage(imageEl, 0, 0, widthModulus, height, x, y, widthModulus, height);
                // Full image
            } else {
                app.ctx.drawImage(imageEl, x, y);
            }

        }
    }

};
