var DatePicker = function(container) {
    this.container = container;
    this.date = new Date();
    this.mainEle = null;
    this.dateEles = [];

    this.init();
}


DatePicker.prototype = {
    days: ['日', '一', '二', '三', '四', '五', '六'],

    init: function() {
        // 日历外框
        this.mainEle = $('<div><div>')
            .css('width', '210px')
            .css('height', '240px')
            .css('border', '2px solid lightgray')
            .appendTo(this.container);

        var self = this;

        // 标题
        var p = $('<p>')
            .html(this.date.getFullYear() + '年' + (this.date.getMonth() + 1) + '月')
            .css('text-align', 'center')
            .css('margin', '0')
            .css('padding', '5px')
            .css('background-color', 'rgb(200,27,1)')
            .css('color', 'white')
            .appendTo(this.mainEle);

        var arrLeft = $('<strong>')
            .html('<-')
            .css('float', 'left')
            .appendTo(p)
            .click(function() {
                self.preMonth();
            });

        var arrRight = $('<strong>')
            .html('->')
            .css('float', 'right')
            .appendTo(p)
            .click(function() {
                self.nextMonth()
            });

        function createEle() {
            var ele = $('<span>')
                .css('text-align', 'center')
                .css('display', 'inline-block')
                .css('width', '30px')
                .css('height', '30px')
                .css('line-height', '30px');

            return ele;
        }

        // 固定不变的星期
        for (var i = 0; i < 7; i++) {
            createEle().html(this.days[i]).appendTo(this.mainEle);
        }

        // 找到第一个日期
        var dat = new Date(this.date);
        dat.setDate(dat.getDate() - this.date.getDate() + 1);
        dat.setDate(dat.getDate() - dat.getDay());

        for (var i = 0; i < 42; i++) {
            var ele = createEle()
                .html(dat.getDate())
                .appendTo(this.mainEle);
            if (dat.getMonth() !== this.date.getMonth()) {
                ele.css('color', 'lightgray');
            }
            if (dat.getTime() === this.date.getTime()) {
                ele.css('background-color', 'rgb(200,27,1)').css('color', 'white');
            }
            dat.setDate(dat.getDate() + 1);
        }


    },

    nextMonth: function() {

    },

    preMonth: function() {

    },

    selectEle: function() {

    },

    getSelectedDate: function() {
        var y = this.date.getFullYear(),
            m = this.date.getMonth() + 1,
            d = this.date.getDate();
        return y + '年' + (m < 10 ? '0' + m : m) + '月' + (d < 10 ? '0' + d : d) + '日';
    },

    selectDate: function(date) {}
};
