var Gallery = function(container, width, minColNum) {
    this.container = $(container);
    var colNum = Math.floor(this.container.width() / width);
    this.colNum = colNum > minColNum ? colNum : minColNum;

    this.mainEle = null;
    this.columns = [];
    this.showEle = null;
    this.index = 1;
    this.init();
}

Gallery.prototype = {
    init: function() {
        this.mainEle = $('<div>')
            .css('position', 'relative')
            .appendTo(this.container);

        for (var i = 0; i < this.colNum; i++) {
            var eleCol = $('<div>')
                .css('padding', '8px')
                .css('box-sizing', 'border-box')
                .css('position', 'absolute')
                .css('width', 100 / this.colNum + '%')
                .css('left', 100 / this.colNum * i + '%')
                .appendTo(this.mainEle);
            this.columns.push(eleCol);
        }
    },

    addImage: function(img) {
        var self = this;
        img.css('width', '100%')
            .load(function(e) {
                var div = $('<div>')
                    .css('width', '100%')
                    .append($(this))
                    .append($("<p style='text-align:center;font-family:黑体;'>picture" + self.index++ + '<p>'))
                    .appendTo(self.getMinHeightColumn())
            });
    },

    getMinHeightColumn: function() {
        var min = this.columns.length - 1;
        for (var i = this.columns.length - 1; i >= 0; i--) {
            if (this.columns[i].height() <= this.columns[min].height()) {
                min = i;
            }
        }

        return this.columns[min];
    }
};
