var Pos = function(r, c) {
    this.r = r;
    this.c = c;
    this.G = 0;
}

Pos.prototype = {
    getNeighbours: function() {
        return [this.getLeft(), this.getRight(), this.getTop(), this.getBottom()];
    },

    getNeibDeg: function(pos) {
        if (this.r === pos.r && this.c + 1 === pos.c) {
            return 90;
        }
        if (this.r === pos.r && this.c - 1 === pos.c) {
            return -90;
        }
        if (this.r + 1 === pos.r && this.c === pos.c) {
            return 180;
        }
        if (this.r - 1 === pos.r && this.c === pos.c) {
            return 0;
        }

        return null;
    },

    getLeft: function() {
        return new Pos(this.r, this.c - 1);
    },

    getRight: function() {
        return new Pos(this.r, this.c + 1);
    },

    getTop: function() {
        return new Pos(this.r - 1, this.c);
    },

    getBottom: function() {
        return new Pos(this.r + 1, this.c);
    },

    isEqual: function(otherPos) {
        if (otherPos.r === this.r && otherPos.c === this.c) {
            return true;
        } else {
            return false;
        }
    },

    getDistance: function(pos) {
        return Math.abs(this.r - pos.r) + Math.abs(this.c - pos.c);
    },

    toString: function() {
        return '第' + this.r + '行， 第' + this.c + '列';
    }
};

function createPos(r, c) {
    return new Pos(r, c);
}
