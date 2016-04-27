var DatePicker = function(container) {
    this.container = container;
    this.date = new Date();
    this.selectedEle = null;
    this.selectCall = null;

    this.init();
}


DatePicker.prototype = {
    days: ['日', '一', '二', '三', '四', '五', '六'],

    init: function() {
        // 日期显示
        var mainDiv = $('<div>')
            .css('position', 'relative')
            .appendTo(this.container);

        var input = $('<input>')
            .attr('readonly', 'true')
            .css('text-align', 'center')
            .css('width', '210px')
            .css('height', '30px')
            .appendTo(mainDiv);

        // 日历外框
        var calendarEle = $('<div>')
            .css('width', '350px')
            .css('height', '400px')
            .css('border', '2px solid lightgray')
            .css('position', 'absolute')
            .css('top', '40px')
            // .css('left', '10px')
            .css('font-family', '微软雅黑')
            .hide()
            .appendTo(mainDiv);

        var self = this;

        // 标题
        var p = $('<p>')
            .css('text-align', 'center')
            .css('margin', '0')
            .css('padding', '5px')
            .css('background-color', 'rgb(200,27,1)')
            .css('color', 'white')
            .appendTo(calendarEle);

        var title = $('<strong>').addClass('title').appendTo(p);

        var arrLeft = $('<strong>')
            .html('<-')
            .css('float', 'left')
            .css('cursor', 'pointer')
            .appendTo(p)
            .click(function() {
                self.preMonth();
            });

        var arrRight = $('<strong>')
            .html('->')
            .css('float', 'right')
            .css('cursor', 'pointer')
            .appendTo(p)
            .click(function() {
                self.nextMonth()
            });

        function createEle() {
            var ele = $('<span>')
                .css('text-align', 'center')
                .css('display', 'inline-block')
                .css('width', '50px')
                .css('height', '50px')
                .css('line-height', '50px');

            return ele;
        }

        // 固定不变的星期
        for (var i = 0; i < 7; i++) {
            var el = createEle().html(this.days[i]).appendTo(calendarEle);
            if (i === 0 || i === 6) {
                el.css('color', 'rgb(200,17,1)');
            }
        }

        // 日期部分
        for (var i = 0; i < 42; i++) {
            var ele = createEle()
                .css('cursor', 'pointer')
                .appendTo(calendarEle);
        }

        this.renderByDate(this.date);

        // 点选日期事件
        var self = this;
        calendarClicked = function(e) {
            if (calendarEle.is(':hidden')) {
                return;
            }
            if (e.target.nodeName === 'SPAN') {
                var allSpan = $('span'),
                    index = allSpan.index($(e.target)),
                    selectedIndex = allSpan.index(self.selectedEle);
                var dat = new Date(self.date);
                dat.setDate(dat.getDate() + index - selectedIndex);
                self.selectDate(dat);
                input.val(self.getSelectedDate());
                calendarEle.hide();
                self.selectCall();
            }
        }

        calendarEle.click(calendarClicked);

        // 点击输入框事件
        input.click(function(e) {
            calendarEle.toggle()
        })
    },

    select: function(fn) {
        this.selectCall = fn;
        return this;
    },

    nextMonth: function() {
        var dat = new Date(this.date);
        dat.setMonth(dat.getMonth() + 1);
        this.selectDate(dat);
    },

    preMonth: function() {
        var dat = new Date(this.date);
        dat.setMonth(dat.getMonth() - 1);
        this.selectDate(dat);
    },

    getSelectedDate: function() {
        var y = this.date.getFullYear(),
            m = this.date.getMonth() + 1,
            d = this.date.getDate();
        return y + '年' + (m < 10 ? '0' + m : m) + '月' + (d < 10 ? '0' + d : d) + '日';
    },

    selectDate: function(date) {
        this.selectedEle.css('background-color', '').css('color', '');
        if (date.getMonth() === this.date.getMonth()) {
            var allSpan = $('span'),
                oIndex = allSpan.index(this.selectedEle);
            var temp = allSpan.get(oIndex + date.getDate() - this.date.getDate());
            this.selectedEle = $(temp).css('background-color', 'rgb(200,27,1)').css('color', 'white');
        } else {
            this.renderByDate(date);
        }

        this.date = date;
    },

    renderByDate: function(date) {
        $('.title').html(date.getFullYear() + '年' + (date.getMonth() + 1) + '月');

        // 找到第一个日期
        var dat = new Date(date);
        dat.setDate(dat.getDate() - date.getDate() + 1);
        dat.setDate(dat.getDate() - dat.getDay());

        var allSpan = $('span');
        for (var i = 0; i < 42; i++) {
            // 获取显示日子的jq对象
            var ele = $(allSpan.get(i + 7)).html(dat.getDate());

            // 不是同月的色彩变淡
            if (dat.getMonth() !== date.getMonth()) {
                ele.css('color', 'lightgray');
            } else {
                // 周六日字变红
                if (dat.getDay() === 0 || dat.getDay() === 6) {
                    ele.css('color', 'rgb(200,27,1)');
                } else {
                    ele.css('color', '');
                }
            }

            // 被选中的日期背景变红
            if (dat.getTime() === date.getTime()) {
                ele.css('background-color', 'rgb(200,27,1)').css('color', 'white');
                this.selectedEle = ele;
            }

            dat.setDate(dat.getDate() + 1);
        }
    }
};
