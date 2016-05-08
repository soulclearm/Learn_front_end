var $ = function(el) {
    return document.querySelector(el);
}

var $$ = function(el) {
    return document.querySelectorAll(el);
}

var createEle = function(tagName) {
    return document.createElement(tagName);
}

// 兼容的事件方法
function addEvent(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent('on' + event, hanlder);
    } else {
        ele['on' + event] = hanlder;
    }
}

function removeEvent(ele, event, hanlder) {
    if (ele.removeEventListener) {
        ele.removeEventListener(event, hanlder, false);
    } else if (ele.detachEvent) {
        ele.detachEvent('on' + event, hanlder);
    } else {
        ele['on' + event] = null;
    }
}
