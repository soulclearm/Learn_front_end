cc.Class({
    extends: cc.Component,

    properties: {
        girdContainer: cc.Node,
        roadPre: cc.Prefab,
        wallPre: cc.Prefab,

        hero: cc.Node,
        target: cc.Node,

        rowNum: 15,
        colNum: 10,
        arrIsWall: [],
    },

    onLoad: function () {
        this.orginPos = cc.p(-this.girdContainer.width / 2, -this.girdContainer.height / 2);
        this.girdWidth = this.girdContainer.width / this.colNum;
        this.girdHeight = this.girdContainer.height / this.rowNum;

        this.initWallAndRoad();
        this.initHeroAndTarget();
        this.addEvnet();
        this.hero.getComponent('hero').init(this);
    },

    initWallAndRoad: function () {
        for (var i = 0; i < this.rowNum; i++) {
            for (var j = 0; j < this.colNum; j++) {
                var gird;
                if (Math.random() * this.rowNum * this.colNum > wallCount) {
                    gird = cc.instantiate(this.roadPre);
                    this.arrIsWall.push(false);
                }
                else {
                    gird = cc.instantiate(this.wallPre);
                    this.arrIsWall.push(true);
                }

                this.setPosAtGird(gird, i, j);
                gird.parent = this.girdContainer;
            }
        }
    },

    setPosAtGird: function (node, row, col) {
        node.x = col * this.girdWidth + node.width / 2 + this.orginPos.x;
        node.y = row * this.girdHeight + node.height / 2 + this.orginPos.y;
    },

    getGirdPos: function (pos) {
        var row = Math.floor((pos.y - this.orginPos.y) / this.girdHeight);
        var col = Math.floor((pos.x - this.orginPos.x) / this.girdWidth);

        var Pos = require('pos');
        return new Pos(row, col);
    },

    getCCPos: function (row, col) {
        return cc.p(col * this.girdWidth + this.orginPos.x, row * this.girdHeight + this.orginPos.y);
    },

    initHeroAndTarget: function () {
        var self = this;
        function randomGPos() {
            var row = Math.floor(Math.random() * self.rowNum),
                col = Math.floor(Math.random() * self.colNum);
            var Pos = require('pos');
            return new Pos(row, col);
        }

        var path, heroGPos, targetGPos;
        do {
            do {
                heroGPos = randomGPos();
                console.log(heroGPos)
            }
            while (!this.checkPos(heroGPos))
            do {
                targetGPos = randomGPos();
                console.log(targetGPos)
            }
            while (!this.checkPos(targetGPos) || targetGPos.isEqual(heroGPos))

            var AStar = require('AStar');
            var path = AStar(heroGPos, targetGPos, function (pos) {
                return self.checkPos(pos);
            });
        } while (path.length <= 0)

        this.setPosAtGird(this.hero, heroGPos.r, heroGPos.c);
        this.setPosAtGird(this.target, targetGPos.r, targetGPos.c);
    },

    addEvnet: function () {
        var self = this;
        this.girdContainer.on('touchend', function (e) {
            var pos = self.girdContainer.convertTouchToNodeSpaceAR(e);
            self.hero.getComponent('hero').goto(pos);
        })
    },

    checkPos: function (girdPos) {
        if (girdPos.r < 0 || girdPos.c < 0 || girdPos.r >= this.rowNum || girdPos.c >= this.colNum) {
            return false;
        }

        if (this.arrIsWall[girdPos.r * this.colNum + girdPos.c]) {
            return false;
        }

        return true;
    },

    update: function (dt) {
        var dis = cc.pDistance(this.hero.position, this.target.position);
        if (dis < 24) {
            this.gameWin();
        }
    },

    gameWin: function () {
        wallCount += 2;
        if (wallCount > 60) {
            alert('You Win All, back to first');
            wallCount = 10;
            return;
        }
        // alert('You Win All, go to next');
        cc.director.loadScene('game');
    }
});

var wallCount = 10;