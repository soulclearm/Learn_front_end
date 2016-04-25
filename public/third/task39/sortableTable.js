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

        this.addSortEle();
    },

    addSortEle: function() {
        var self = this;

        function addArrowCom(index) {
            var div = document.createElement('div');
            div.style.cssText = 'display: inline; width: 12px; height: 0px;';

            for (var i = 0; i < 2; i++) {
                var divArrow = document.createElement('div');
                divArrow.style.cssText = 'display: inline-block; width: 0; height: 0;' +
                    'border-left: 5px solid transparent; border-right: 5px solid transparent;';
                divArrow.style.cssText += (i == 0 ?
                    'border-bottom: 10px solid pink;' :
                    'border-top: 10px solid pink;');
                div.appendChild(divArrow);
            }

            var td = self.tableEle.children[0].children[0].children[index];
            td.appendChild(div);

            var fn = self.fnGetSort(self.names[index]);

            addEvent(div.children[0], 'click', function(e) {
                self.curOrder.sort(function(d1, d2) {
                    return -fn(self.data[d1][index - 1], self.data[d2][index - 1]);
                })

                self.render();
            })

            addEvent(div.children[1], 'click', function(e) {
                self.curOrder.sort(function(d1, d2) {
                    return fn(self.data[d1][index - 1], self.data[d2][index - 1]);
                })
                self.render();
            })

            return div;
        }

        for (var i = 0; i < this.names.length; i++) {
            var name = this.names[i];
            var fn = this.fnGetSort(name);

            if (fn) {
                var ele = addArrowCom(i);
            }
        }
    },


};
