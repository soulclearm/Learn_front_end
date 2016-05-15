cc.Class({
    extends: cc.Component,

    properties: {
        oneStepTime: 3
    },

    // use this for initialization
    onLoad: function () {

    },

    goto: function (pos) {
        var targetGPos = this.game.getGirdPos(pos);
        var heroGPos = this.game.getGirdPos(this.node.position);

        var AStar = require('AStar');
        var self = this;
        var path = AStar(heroGPos, targetGPos, function (pos) {
            return self.game.checkPos(pos);
        })

        var actions = [];
        for (var i = 1; i < path.length; i++) {
            var cpos = this.game.getCCPos(path[i].r, path[i].c);
            actions.push(cc.callFunc(function (node, cpos) {
                if (cpos.x > this.node.x) {
                    this.node.scaleX = 1;
                }
                if (cpos.x < this.node.x) {
                    this.node.scaleX = -1;
                }
            }, this, cpos));
            if (i === 1) {
                actions.push(cc.callFunc(function () {
                    this.getComponent(cc.Animation).play('heroRun');
                }, this));
            }
            actions.push(cc.moveTo(this.oneStepTime, cpos));

        }
        actions.push(cc.callFunc(function () {
            this.getComponent(cc.Animation).play('heroStand');
        }, this));

        this.node.stopAllActions();
        this.node.runAction(cc.sequence(actions));
    },

    init: function (game) {
        this.game = game;
    }

});
