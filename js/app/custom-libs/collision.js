define(
    {
        Point: function (x, y, obj) {
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
        },

        doOverlap: function (l1, r1, l2, r2) {
            // If one rectangle is on left side of other
            if (l1.x > r2.x || l2.x > r1.x)
                return false;

            // If one rectangle is above other
            if (l1.y < r2.y || l2.y < r1.y)
                return false;

            return true;
        }
    }
);
