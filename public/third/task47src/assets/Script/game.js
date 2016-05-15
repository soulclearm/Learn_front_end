cc.Class({
    extends: cc.Component,

    properties: {
        girdContainer: cc.Node,
        roadPre: cc.Prefab,
        wallPre: cc.Prefab,
        enermyPre: cc.Prefab,

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
        this.initEnermy();
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

                gird.position = this.getCCPos(i, j);
                gird.parent = this.girdContainer;
            }
        }
    },

    getGirdPos: function (pos) {
        var row = Math.floor((pos.y - this.orginPos.y) / this.girdHeight);
        var col = Math.floor((pos.x - this.orginPos.x) / this.girdWidth);

        var Pos = require('pos');
        return new Pos(row, col);
    },

    getCCPos: function (row, col) {
        return cc.p((col + 0.5) * this.girdWidth + this.orginPos.x, (row + 0.5) * this.girdHeight + this.orginPos.y);
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
            }
            while (!this.checkPos(heroGPos))
            do {
                targetGPos = randomGPos();
            }
            while (!this.checkPos(targetGPos) || targetGPos.isEqual(heroGPos))

            var AStar = require('AStar');
            var path = AStar(heroGPos, targetGPos, function (pos) {
                return self.checkPos(pos);
            });
        } while (path.length <= 0)

        this.hero.position = this.getCCPos(heroGPos.r, heroGPos.c);
        this.target.position = this.getCCPos(targetGPos.r, targetGPos.c);
    },

    initEnermy: function () {
        var self = this;
        function randomGPos() {
            var row = Math.floor(Math.random() * self.rowNum),
                col = Math.floor(Math.random() * self.colNum);
            var Pos = require('pos');
            return new Pos(row, col);
        }
        for (var i = 0; i < 3; i++) {
            var enermy = cc.instantiate(this.enermyPre);
            var gPos;
            do {
                gPos = randomGPos();
            }
            while (!this.checkPos(gPos) || cc.pDistance(this.hero.position, this.getCCPos(gPos.r, gPos.c)) < 120)

            this.girdContainer.addChild(enermy);
            enermy.position = this.getCCPos(gPos.r, gPos.c);
        }


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
        if (dis < 10) {
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