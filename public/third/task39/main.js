function randomScore(n) {
    var arr = [];
    var sum = 0;
    for (var i = 0; i < n; i++) {
        var num = Math.floor(Math.random() * 101);
        sum += num;
        arr.push(num);
    }

    arr.push(sum);
    return arr;
}

var scoreData = {
    '大娃': randomScore(3),
    '二娃': randomScore(3),
    '三娃': randomScore(3),
    '四娃': randomScore(3),
    '五娃': randomScore(3),
    '六娃': randomScore(3),
    '七娃': randomScore(3),
    '八娃': randomScore(3),
    '九娃': randomScore(3),
    '十娃': randomScore(3),
    '十一娃': randomScore(3),
    '十二娃': randomScore(3),
    '十三娃': randomScore(3),
    '十四娃': randomScore(3),
}

var names = ['姓名', '语文', '数学', '英语', '总分'];

var getSortFns = function(name) {
    if (name == names[0]) {
        return;
    }
    return function(d1, d2) {
        return d2 - d1;
    }
}

var table = new SortableTable($('#tableScore'), scoreData, names, getSortFns);
