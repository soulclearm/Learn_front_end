var FloatLayer = function(element) {
    this.ele = element;
    this.visible = false;
    this.maskEle = null;
    this.animateTime = 600;

    this.init();
}

FloatLayer.prototype = {
    show: function() {
        this.visible = true;
        this.ele.style.transform = 'translate(-50%, -50%) scale(1,1)';
        this.maskEle.style.visibility = 'visible';
    },

    hide: function() {
        this.visible = false;
        this.ele.style.transform = 'translate(-50%, -50%) scale(0,0)';
        var self = this;
        setTimeout(function() {
            self.maskEle.style.visibility = 'hidden';
        }, this.animateTime - 10)
    },

    init: function() {
        this.maskEle = document.createElement('div');
        this.maskEle.style.width = window.screen.width + 'px';
        this.maskEle.style.height = window.screen.height + 'px';
        this.maskEle.style.backgroundColor = 'rgba(108,108,108,0.7)';
        this.maskEle.style.position = 'fixed';
        this.maskEle.style.left = '50%';
        this.maskEle.style.top = '50%';
        this.maskEle.style.transform = 'translate(-50%, -50%)';
        this.maskEle.style.visibility = this.visible ? 'visible' : 'hidden';

        this.ele.style.position = 'absolute';
        this.ele.style.left = '50%';
        this.ele.style.top = '50%';
        this.ele.style.transform = 'translate(-50%, -50%) scale(0,0)';
        this.ele.style.transition = this.animateTime + 'ms transform';

        this.ele.parentNode.removeChild(this.ele);
        this.maskEle.appendChild(this.ele);
        document.body.appendChild(this.maskEle);

        var self = this;
        this.maskEle.addEventListener('click', function(e) {
            console.log(e);
            console.log(e.target);
            if (self.maskEle === this) {
                self.hide();
            }
        }, false)

        this.ele.addEventListener('click', function(e) {
            e.stopPropagation();
        })
    }
};


function createFloatLayer(ele) {
    return new FloatLayer(ele);
}
