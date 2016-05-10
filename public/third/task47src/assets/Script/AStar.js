var Pos = require('pos');

function createPos(r, c) {
    return new Pos(r, c);
}

function getMinFIndex(arr, posEnd) {
    var index = 0;
    for (var i = 0; i < arr.length; i++) {
        var F = arr[i].G + arr[i].getH(posEnd);
        var minF = arr[index].G + arr[index].getH(posEnd);
        if (F <= minF) {
            index = i;
        }
    }

    return index;
}

function getIndexOfPos(arr, pos) {
    for (var i = 0; i < arr.length; i++) {
        if (pos.isEqual(arr[i])) {
            return i;
        }
    }

    return -1;
}

function AStar(posStart, posEnd, fnIsPosOK) {
    posStart.G = 0;
    var arrOpen = [posStart],
        arrClose = [];

    while (arrOpen.length > 0) {
        var idxOfMinF = getMinFIndex(arrOpen, posEnd);
        var curPos = arrOpen[idxOfMinF];
        arrOpen.splice(idxOfMinF, 1);
        arrClose.push(curPos);

        if (posEnd.isEqual(curPos)) {
            var arrResult = [curPos];
            while (curPos.parent) {
                arrResult.unshift(curPos.parent);
                curPos = curPos.parent;
            }
            return arrResult;
        }

        var arrNeighbors = curPos.getNeighbors();
        for (var i = 0; i < arrNeighbors.length; i++) {
            var pos = arrNeighbors[i]
            if (!fnIsPosOK(pos) || getIndexOfPos(arrClose, pos) >= 0) {
                continue;
            }

            pos.G = curPos.G + pos.getG(curPos);
            pos.parent = curPos;

            var index = getIndexOfPos(arrOpen, pos);
            if (index >= 0) {
                if (pos.G < arrOpen[index].G) {
                    arrOpen[index].G = pos.G;
                    arrOpen[index].parent = curPos;
                }
            } else {
                if (pos.getG(curPos) > 1) {
                    if (!fnIsPosOK(createPos(pos.r, curPos.c)) &&
                        !fnIsPosOK(createPos(curPos.r, pos.c))) {
                        continue;
                    }
                }
                arrOpen.push(pos);
            }
        }
    }
}

module.exports = AStar;
