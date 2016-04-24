$ = function(el) {
    return document.querySelector(el);
}

var scoreData = {
    '小明': [80, 90, 70, 240],
    '小红': [90, 60, 90, 240],
    '小刚': [60, 100, 70, 230],
}

var names = ['姓名', '语文', '数学', '英语', '总分'];

var getSortFns = function(name) {
    if (name == names[0]) {
        return;
    }
    return function(d1, d2) {
        return d1 > d2;
    }
}

var table = new SortableTable($('#tableScore'), scoreData, names, getSortFns);
