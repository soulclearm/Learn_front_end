var DatePicker = function(container) {
    this.container = container;
    this.date = new Date();
    this.showEle = null;

    console.log(this.date.toString())
    console.log(this.date.toDateString())
    console.log(this.date.toTimeString())

    this.init();
}


DatePicker.prototype = {
    days: ['日', '一', '二', '三', '四', '五', '六'],

    init: function() {
        // 日历外框
        this.showEle = $('<div><div>')
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
            .appendTo(this.showEle);

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

        function setBlock(el) {
            el.css('text-align', 'center')
                .css('display', 'inline-block')
                .css('width', '30px')
                .css('height', '30px')
                .css('line-height', '30px');
        }

        // 固定不变的星期
        for (var i = 0; i < 7; i++) {
            var day = $('<span>')
                .html(this.days[i])
                .appendTo(this.showEle);
            setBlock(day);
        }
    },

    nextMonth: function() {

    },

    preMonth: function() {

    },
};
