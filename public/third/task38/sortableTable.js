var SortableTable = function(tableEle, data, names, fnGetSort) {
    this.tableEle = tableEle;
    this.data = data;
    this.names = names;
    this.fnGetSort = fnGetSort;
    this.curOrder = null;

    this.init();
}

SortableTable.prototype = {
    init: function() {
        this.curOrder = [];
        for (var key in this.data) {
            this.curOrder.push(key);
        }

        this.render();
    },

    render: function() {
        function fn(d) {
            return '<td>' + d + '</td>';
        }

        var items = '<tr>';
        items += this.names.map(fn).join('');
        items += '</tr>'

        for (var i = 0; i < this.curOrder.length; i++) {
            var name = this.curOrder[i];
            items += '<tr><td>' + name + '</td>';
            items += this.data[name].map(fn).join('');
            items += '</tr>'
        }

        this.tableEle.innerHTML = items;
    },
};
