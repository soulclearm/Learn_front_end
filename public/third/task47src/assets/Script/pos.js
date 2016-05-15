var Pos = function (r, c) {
    this.r = r;
    this.c = c;
}

Pos.prototype.left = function () {
    return new Pos(this.r, this.c - 1)
};

Pos.prototype.right = function () {
    return new Pos(this.r, this.c + 1)
};

Pos.prototype.top = function () {
    return new Pos(this.r - 1, this.c)
};

Pos.prototype.bottom = function () {
    return new Pos(this.r + 1, this.c)
};

Pos.prototype.leftTop = function () {
    return new Pos(this.r - 1, this.c - 1)
};

Pos.prototype.leftBottom = function () {
    return new Pos(this.r + 1, this.c - 1)
};

Pos.prototype.rightTop = function () {
    return new Pos(this.r - 1, this.c + 1)
};

Pos.prototype.rightBottom = function () {
    return new Pos(this.r + 1, this.c + 1)
};

Pos.prototype.getNeighbors = function () {
    return [this.left(), this.right(), this.top(), this.bottom(),
        this.leftTop(), this.leftBottom(), this.rightTop(), this.rightBottom()
    ]
};

Pos.prototype.getG = function (pos) {
    var dis1 = Math.abs(this.r - pos.r),
        dis2 = Math.abs(this.c - pos.c),
        dis = Math.sqrt(dis1 * dis1 + dis2 * dis2),
        dis = Math.round(dis * 10) / 10;
    return dis;
};

Pos.prototype.getH = function (pos) {
    var dis1 = Math.abs(this.r - pos.r),
        dis2 = Math.abs(this.c - pos.c);
    return dis1 + dis2;
};

Pos.prototype.isEqual = function (pos) {
    return (this.r === pos.r && this.c === pos.c);
};

Pos.prototype.toString = function (first_argument) {
    return this.r + ', ' + this.c;
};

module.exports = Pos;
