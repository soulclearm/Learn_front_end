var dp1 = new DatePicker($(document.body), true, 3, 100).select(function() {
    alert('选择了日期' + this.getSelectedDate());
});

$(document.body).append($('<p>上面是一个选择时间跨度的,最短3天最长100天</p>').css('margin-bottom', '50px'))

var dp2 = new DatePicker($(document.body)).select(function() {
    alert('选择了日期' + this.getSelectedDate());
});

$(document.body).append($('<p>上面是一个选择一天的</p>'))
