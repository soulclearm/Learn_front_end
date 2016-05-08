var game = $('#game'),
    ctx = game.getContext('2d');

window.requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

var preTime = 0;

var Scene = function(canvas) {
    this.canvas = canvas;
    this.children = [];
    var self = this;
    requestAnimationFrame(function(t) {
        self.update(t);
    });
}

Scene.prototype.addChild = function(node) {
    this.children.push(node);
};

Scene.prototype.update = function(t) {
    ctx.fillStyle = 'rgb(255,230,205)';
    ctx.fillRect(0, 0, game.width, game.height);

    for (var i = 0; i < this.children.length; i++) {
        this.children[i].update(t);
    }

    var self = this;
    requestAnimationFrame(function(t) {
        self.update(t);
    });
};

var Sprite = function(src) {
    this.ready = false;
    this.children = [];
    this.img = createEle('img');
    this.img.src = src;

    this.x = 0;
    this.y = 0;
    this.preTime = 0;

    var self = this;
    addEvent(this.img, 'load', function() {
        self.ready = true;
    })
}

Sprite.prototype.update = function(t) {
    var delTime = t / 1000 - this.preTime;
    this.preTime = t / 1000;

    if (this.interval > 0) {
        this.x += this.speedX * delTime;
        this.y += this.speedY * delTime;
        this.interval -= delTime;
    }

    if (this.ready) {
        ctx.drawImage(this.img, this.x, this.y);
    }
};

Sprite.prototype.moveTo = function(x, y, interval) {
    this.speedX = (x - this.x) / interval;
    this.speedY = (y - this.y) / interval;
    this.interval = interval;
};

Sprite.prototype.sequence = function(arrMove) {
    var i = 0;
    var self = this;

    function fn() {
        self.moveTo(arrMove[i][0], arrMove[i][1], arrMove[i][2]);
        if (i < arrMove.length - 1) {
            setTimeout(fn, arrMove[i][2] * 1000);
            i++;
        }
    }

    fn();
};

Sprite.prototype.getPos = function() {
    var girdWidth = game.width / 10;

    return createPos(Math.round(this.y / girdWidth), Math.round(this.x / girdWidth));
};

var scene = new Scene(game);

var hero = new Sprite('imgs/hero.png');
scene.addChild(hero);

var monster = new Sprite('imgs/monster.png')
scene.addChild(monster);

function getPosByClick(x, y) {
    var girdWidth = game.clientWidth / 10;
    return createPos(Math.floor(y / girdWidth), Math.floor(x / girdWidth));
}

function getCoordinate(pos) {
    var girdWidth = game.width / 10;
    return [(pos.c) * girdWidth, (pos.r) * girdWidth];
}

addEvent(game, 'click', function(e) {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
    var x = e.clientX + -this.offsetLeft + scrollLeft;
    var y = e.clientY - this.offsetTop + scrollTop;

    var targetPos = getPosByClick(x, y);
    var heroPos = hero.getPos();

    var path = AStar(heroPos, targetPos, function(argument) {
        return true;
    })

    var arrSeq = [];
    for (var i = 0; i < path.length; i++) {
        var temp = getCoordinate(path[i]);
        arrSeq.push([temp[0], temp[1], 0.2]);
    }

    hero.sequence(arrSeq);
})
