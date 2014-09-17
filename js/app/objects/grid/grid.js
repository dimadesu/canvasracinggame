define(
    [
        'helpers/rgba',
        'globals'
    ],
    function (rgba, globals) {
        var grid = [];
        for(var index = 0; index < globals.cellsTotal; index++){
            var cellInst = {
                width: globals.cellWidth,
                x: globals.cellWidth * index,
                bgColor: rgba(0.5)
            };
            grid.push(cellInst);
        }
        return grid;
    }
);
