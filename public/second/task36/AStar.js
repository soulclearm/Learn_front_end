function getIndexOfPos(arr, pos) {
    for (var i = 0; i < arr.length; i++) {
        if (pos.isEqual(arr[i])) {
            return i;
        }
    }

    return -1;
}

function getIndexOfMinF(arr, posEnd) {
    var index = 0;
    for (var i = 0; i < arr.length; i++) {
        var F = arr[i].G + arr[i].getDistance(posEnd);
        var minF = arr[index].G + arr[index].getDistance(posEnd);
        if (F <= minF) {
            index = i;
        }
    }

    return index;
}

var AStar = function(posStart, posEnd, fnPosOk) {
    posStart.G = 0;
    var arrClose = [],
        arrOpen = [posStart];

    while (arrOpen.length > 0) {
        var idxOfMinF = getIndexOfMinF(arrOpen, posEnd);

        var curPos = arrOpen[idxOfMinF];

        arrOpen.splice(idxOfMinF, 1);
        arrClose.push(curPos);

        // 找到路了
        if (curPos.getDistance(posEnd) === 0) {
            var lastPos = curPos,
                idx = arrClose.length - 2,
                G = lastPos.G - 1;
            while (!lastPos.isEqual(posStart)) {
                if (arrClose[idx].G === G && arrClose[idx].getNeibDeg(lastPos) !== null) {
                    lastPos = arrClose[idx];
                    G--;
                } else {
                    arrClose.splice(idx, 1);
                }
                idx--;
            }
            return arrClose;
        }


        var arrNeibs = curPos.getNeighbours();
        for (var i = 0; i < arrNeibs.length; i++) {
            var pos = arrNeibs[i];
            if (getIndexOfPos(arrClose, pos) >= 0 || !fnPosOk(pos)) {
                continue;
            }

            pos.G = curPos.G + 1;

            var index = getIndexOfPos(arrOpen, pos);
            if (index >= 0) {
                if (pos.G < arrOpen[index].G) {
                    arrOpen[index].G = pos.G;
                }
            } else {
                arrOpen.push(arrNeibs[i]);
            }
        }
    }

    return [];
}
