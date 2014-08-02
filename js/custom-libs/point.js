app.Point = function (x, y, obj) {
    // In order to not create new obejects in memory
    if (obj !== undefined) {
        obj.x = x;
        obj.y = y;
        return obj;
    } else {
        return {
            x: x,
            y: y
        }
    }
};
