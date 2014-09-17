define(
    [
        'helpers/rgba',
        'globals'
    ],
    function (rgba, globals) {
        var grid = [];
        var cellWidth = 100;
        for(var index = 0; index < globals.cellsTotal; index++){
            var cellInst = {
                width: cellWidth,
                x: cellWidth * index,
                bgColor: rgba(0.2)
            };
            grid.push(cellInst);
        }
        return grid;
    }
);
