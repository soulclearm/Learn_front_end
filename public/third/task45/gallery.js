var Gallery = function(container, height) {
    this.container = $(container);
    this.height = height;
    this.ratioSuggest = this.container.width() / height;

    this.curLine = null;
    this.curLineWidth = 0;
    this.init();
}

Gallery.prototype = {
    init: function() {
        this.newLine();
    },

    newLine: function() {
        this.curLine = $('<div>')
            .css('white-space', 'nowrap')
            .css('width', this.height * this.ratioSuggest * 0.96)
            .css('margin', '0 auto')
            .appendTo(this.container);
        this.curLineWidth = 0;
    },

    addImage: function(img) {
        var self = this;
        img.load(function() {
            img.css('height', self.height)
                .css('display', 'inline-block')
                // .css('padding', '5px')
                // .css('margin', '0')
                // .css('box-sizing', 'border-box')
                .appendTo(self.curLine)

            self.adjustLine(img);
        })
    },

    adjustLine: function(img) {
        this.curLineWidth += img.outerWidth();

        if (this.curLineWidth >= this.curLine.width()) {
            if (this.curLineWidth - this.curLine.width() <
                this.curLine.width() - this.curLineWidth + img.outerWidth()) {
                var hei = this.height / this.curLineWidth * this.curLine.width();
                this.curLine.find('img').css('height', hei);
                this.newLine();
            } else {
                var hei = this.height / (this.curLineWidth - img.outerWidth()) * this.curLine.width();
                var preLine = this.curLine;

                this.newLine();
                img.appendTo(this.curLine);
                this.curLineWidth += img.outerWidth();

                preLine.find('img').css('height', hei);
            }
        }
    }
};
