var allImg = $('img');

allImg.map(function() {
    // <img src="http://placehold.it/400x200/4E8EF7/fff">
    var randomColor = ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
    var randomSize = Math.floor(Math.random() * 15 + 1) * 100 + 'X' + Math.floor(Math.random() * 15 + 1) * 100;
    $(this).attr('src', 'http://placehold.it/' + randomSize + '/' + randomColor + '/fff');
})

function setSize() {
    var imgs3 = $('#imgs3 img');
    for (var i = 0; i < imgs3.length; i++) {
        var j = $(imgs3.get(i));
        jParent = j.parent();
        if (i === 0) {
            j.css('width', jParent.width() - jParent.height() * 0.5 - 1 + 'px');
        } else {
            j.css('width', jParent.height() * 0.5 + 'px');
        }
    }

    var imgs5 = $('#imgs5 img');
    for (var i = 0; i < imgs5.length; i++) {
        var j = $(imgs5.get(i));
        jParent = j.parent();
        if (i === 1) {
            j.css('height', jParent.width() * 1.0 / 3.0 + 'px');
        }
        if (i === 4) {
            j.css('height', jParent.height() - jParent.width() * 1.0 / 3.0 + 'px');
        }
    }
}

$(window).bind({
    resize: setSize,
})

setSize();
