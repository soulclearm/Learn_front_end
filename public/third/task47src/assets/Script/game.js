cc.Class({
    extends: cc.Component,

    properties: {
        mainNode: cc.Node,
        girdContainer: cc.Node,

        wallPre: cc.Prefab,
        roadPre: cc.Prefab,

        hero: cc.Node,
        target: cc.Node,

        rowNum: 15,
        colNum: 10,

        arrIsWall: [cc.Boolean],

        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {
        var girdWidth = this.mainNode.width / this.colNum;
        var girdHeight = this.mainNode.height / this.rowNum;

        for (var i = 0; i < this.rowNum; i++) {
            for (var j = 0; j < this.colNum; j++) {
                var gird;
                if (Math.random() * this.rowNum * this.colNum < wallNum) {
                    gird = cc.instantiate(this.wallPre);
                    this.arrIsWall.push(true);
                }
                else {
                    gird = cc.instantiate(this.roadPre);
                    this.arrIsWall.push(false);
                }
                this.girdContainer.addChild(gird);
                gird.setPosition(cc.p(girdWidth * j, girdHeight * i));
            }
        }

        var randomR;
        var randomC;

        do {
            randomR = Math.floor(Math.random() * this.rowNum);
            randomC = Math.floor(Math.random() * this.colNum);
        } while (this.isWallHere(randomR, randomC))
        this.hero.setPosition(cc.p(girdWidth * randomC,
            girdHeight * randomR));
        this.hero.getComponent('hero').game = this;

        var isReachable;
        do {
            do {
                randomR = Math.floor(Math.random() * this.rowNum);
                randomC = Math.floor(Math.random() * this.colNum);
            } while (this.isWallHere(randomR, randomC))
            this.target.setPosition(cc.p(girdWidth * randomC,
                girdHeight * randomR));
            isReachable = this.hero.getComponent('hero').canReach(this.target.getPosition());
        } while (!isReachable)

        this.onTouchEvent();
    },

    isWallHere: function (row, col) {
        return this.arrIsWall[row * this.colNum + col];
    },

    onTouchStart: function (event, touch) {
    },

    onTouchMove: function (event, touch) {
    },

    onTouchEnd: function (event, touch) {
        var location = event.touch.getLocation();
        var pos = this.getComponent('game').mainNode.convertToNodeSpace(location);

        this.getComponent('game').hero.getComponent('hero').goto(pos);
    },

    onTouchCancel: function (event, touch) {
    },

    onTouchEvent: function () {
        this.node.on('touchstart', this.onTouchStart, this.node);
        this.node.on('touchmove', this.onTouchMove, this.node);
        this.node.on('touchend', this.onTouchEnd, this.node);
        this.node.on('touchcancel', this.onTouchCancel, this.node);
    },

    offAllTouchEvent: function () {
        this.node.off('touchstart', this.onTouchStart, this.node);
        this.node.off('touchmove', this.onTouchMove, this.node);
        this.node.off('touchend', this.onTouchEnd, this.node);
        this.node.off('touchcancel', this.onTouchCancel, this.node);
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        var isOver = cc.rectIntersectsRect(this.hero.getBoundingBox(), this.target.getBoundingBox());
        if (isOver) {
            wallNum += 3;
            if (wallNum > this.rowNum * this.colNum / 2) {
                wallNum = 10;
            }
            else {
            }
            cc.director.loadScene('game');
        }
    },
});

var wallNum = 10;
