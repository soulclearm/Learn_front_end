cc.Class({
    extends: cc.Component,

    properties: {
        game: cc.Component,
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

    },

    getGirdPos: function (position) {
        var w = this.game.mainNode.width / this.game.colNum;
        var h = this.game.mainNode.height / this.game.rowNum;

        var r = Math.floor(position.y / h);
        var c = Math.floor(position.x / w);

        var Pos = require('pos');
        return new Pos(r, c);
    },

    getCCPos: function (girdPos) {
        var w = this.game.mainNode.width / this.game.colNum;
        var h = this.game.mainNode.height / this.game.rowNum;

        var x = Math.floor(girdPos.c * h);
        var y = Math.floor(girdPos.r * w);

        return cc.p(x, y);
    },

    goto: function (pos) {
        this.node.stopAllActions();
        var targetPos = this.getGirdPos(pos);
        var startPos = this.getGirdPos(cc.p(this.node.x + 10, this.node.y + 10));

        var AStar = require('AStar');
        var game = this.game;
        var path = AStar(startPos, targetPos, function (pos) {
            if (pos.r < 0 || pos.c < 0 || pos.r >= game.rowNum || pos.c >= game.colNum) {
                return false;
            }

            if (game.isWallHere(pos.r, pos.c)) {
                return false;
            }

            return true;
        });

        console.log(path);
        var self = this;
        function act() {
            if (path.length > 0) {
                var gPos = path.shift();
                var pos = self.getCCPos(gPos);
                self.node.runAction(cc.sequence(
                    cc.moveTo(0.25, pos),
                    cc.callFunc(act)
                ))
            }
        }

        act();
    },

    canReach: function (pos) {
        var targetPos = this.getGirdPos(pos);
        var startPos = this.getGirdPos(cc.p(this.node.x + 10, this.node.y + 10));


        var AStar = require('AStar');
        var game = this.game;
        var path = AStar(startPos, targetPos, function (pos) {
            if (pos.r < 0 || pos.c < 0 || pos.r >= game.rowNum || pos.c >= game.colNum) {
                return false;
            }

            if (game.isWallHere(pos.r, pos.c)) {
                return false;
            }

            return true;
        });

        return path;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
