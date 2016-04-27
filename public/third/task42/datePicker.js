var DatePicker = function(container, multi, min, max) {
    this.container = container;
    this.multi = multi;
    this.min = min || 0;
    this.max = max || 0;

    this.date = new Date();
    this.selectedEle = null;
    this.selectCall = null;
    this.mainDiv = null;

    this.selectedDates = [];

    this.init();
}


DatePicker.prototype = {
    days: ['日', '一', '二', '三', '四', '五', '六'],

    init: function() {
        // 日期显示
        var mainDiv = $('<div>')
            .css('position', 'relative')
            .appendTo(this.container);

        this.mainDiv = mainDiv;

        var input = $('<input>')
            .attr('readonly', 'true')
            .css('text-align', 'center')
            .css('width', '350px')
            .css('height', '30px')
            .appendTo(mainDiv);

        // 日历外框
        var calendarEle = $('<div>')
            .css('width', '350px')
            .css('height', '480px')
            .css('border', '2px solid lightgray')
            .css('position', 'absolute')
            .css('z-index', '1000')
            .css('top', '40px')
            .css('background-color', 'white')
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
                .css('margin', '3px 0')
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

        // 按钮
        var btnSure = $("<input type='button' value ='确定'>")
            .css('float', 'left')
            .css('width', '120px')
            .css('height', '36px')
            .css('margin', '5px 24px')
            .css('background-color', 'rgb(56,186,125)')
            .css('outline', 'none')
            .css('border', 'none')
            .css('color', 'white')
            .appendTo(calendarEle)
            .click(function(e) {
                input.val(self.getSelectedDate());
                calendarEle.hide();
                self.selectCall();
            });

        var btnCancel = $("<input type='button' value ='取消'>")
            .css('float', 'right')
            .css('width', '120px')
            .css('height', '36px')
            .css('margin', '5px 24px')
            .css('background-color', 'rgb(243,69,65)')
            .css('outline', 'none')
            .css('border', 'none')
            .css('color', 'white')
            .appendTo(calendarEle)
            .click(function() {
                calendarEle.hide();
            });

        this.renderByDate(this.date);

        // 点选日期事件
        var self = this;
        calendarClicked = function(e) {
            if (calendarEle.is(':hidden')) {
                return;
            }
            if (e.target.nodeName === 'SPAN') {
                var allSpan = self.mainDiv.find('span'),
                    index = allSpan.index($(e.target)),
                    selectedIndex = allSpan.index(self.selectedEle);
                var dat = new Date(self.date);
                dat.setDate(dat.getDate() + index - selectedIndex);

                if (self.multi) {
                    if (self.selectedDates.length < 1) {
                        self.selectedDates.push(dat);
                    } else {
                        var preDate = self.selectedDates[self.selectedDates.length - 1];
                        var dayNum = Math.abs(dat - preDate) / 1000 / 60 / 60 / 24;
                        if (dayNum < self.min || dayNum > self.max) {
                            alert('时间跨度不在范围内');
                        } else {
                            self.selectedDates.push(dat);
                        }
                    }

                    if (self.selectedDates.length > 2) {
                        self.selectedDates.shift();
                    }
                } else {
                    self.selectedDates[0] = dat;
                }

                self.selectDate(dat);
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
        function getString(date) {
            var y = date.getFullYear(),
                m = date.getMonth() + 1,
                d = date.getDate();
            return y + '年' + (m < 10 ? '0' + m : m) + '月' + (d < 10 ? '0' + d : d) + '日';
        }

        if (this.multi) {
            if (this.selectedDates.length === 2) {
                var dat1 = this.selectedDates[0],
                    dat2 = this.selectedDates[1];
                if (dat1 > dat2) {
                    return getString(dat2) + '-' + getString(dat1);
                } else {
                    return getString(dat1) + '-' + getString(dat2);
                }
            } else {
                alert('请选择时间')
                return
            }
        } else {
            return getString(this.date);
        }
    },

    selectDate: function(date) {
        this.renderByDate(date);

        this.date = date;
    },

    renderByDate: function(date) {
        this.mainDiv.find('.title').html(date.getFullYear() + '年' + (date.getMonth() + 1) + '月');

        // 找到第一个日期
        var dat = new Date(date);
        dat.setDate(dat.getDate() - date.getDate() + 1);
        dat.setDate(dat.getDate() - dat.getDay());

        var allSpan = this.mainDiv.find('span');
        for (var i = 0; i < 42; i++) {
            // 获取显示日子的jq对象
            var ele = $(allSpan.get(i + 7)).html(dat.getDate());

            if (date.getTime() === dat.getTime()) {
                this.selectedEle = ele;
            }

            // 被选中的日期背景变红
            if ((this.selectedDates[0] && dat.getTime() === this.selectedDates[0].getTime()) ||
                (this.selectedDates[1] && dat.getTime() === this.selectedDates[1].getTime())) {
                ele.css('background-color', 'rgb(200,27,1)').css('color', 'white');
            } else {
                if ((this.selectedDates.length === 2 && this.selectedDates[0] > dat && this.selectedDates[1] < dat) ||
                    (this.selectedDates.length === 2 && this.selectedDates[1] > dat && this.selectedDates[0] < dat)) {
                    ele.css('background-color', 'rgb(235,244,249)')
                } else {
                    ele.css('background-color', '').css('color', '');
                }
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
            }

            dat.setDate(dat.getDate() + 1);
        }
    }
};
