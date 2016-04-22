(function() {
    var $ = function(el) {
        return document.querySelector(el);
    }

    var layer = createFloatLayer($('#divFloat'));
    layer.show();

    $('#btnLogin').addEventListener('click', function() {
        console.log(layer.visible)
        if (layer.visible) {
            // layer.hide();
        } else {
            layer.show();
        }
    })

    $('#btnSure').addEventListener('click', function() {
        layer.hide();
    })

    $('#btnCancel').addEventListener('click', function() {
        layer.hide();
    })
})()
