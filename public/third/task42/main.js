new DatePicker($('#container')).select(function() {
    alert('选择了日期' + this.getSelectedDate());
});

$(document.body).append($('<p>随便打几个字</p>'))
