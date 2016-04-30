function getRandomImg(argument) {
    var randomColor = ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
    var randomSize = Math.floor(Math.random() * 6 + 2) * 100 + 'X' +
        Math.floor(Math.random() * 5 + 1) * 100;
    var src = 'http://placehold.it/' + randomSize + '/' + randomColor + '/fff';
    return $('<img>').attr('src', src);
}

var gallery = new Gallery($('#container'), 200, 1);
for (var i = 0; i < 36; i++) {
    gallery.addImage(getRandomImg());
}
