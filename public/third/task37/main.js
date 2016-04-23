(function() {
    var $ = function(el) {
        return document.querySelector(el);
    }

    var layer = createFloatLayer($('#divFloat'));
    layer.show();

    $('#btnLogin').addEventListener('click', function() {
        layer.show();
    })

    $('#btnSure').addEventListener('click', function() {
        layer.hide();
    })

    $('#btnCancel').addEventListener('click', function() {
        layer.hide();
    })
})()
