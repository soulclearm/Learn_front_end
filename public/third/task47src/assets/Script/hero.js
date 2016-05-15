cc.Class({
    extends: cc.Component,

    properties: {
        oneStepTime: 0.5
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
        for (var i = 0; i < path.length; i++) {
            var cpos = this.game.getCCPos(path[i].r, path[i].c);
            cpos.x += this.node.width / 2;
            cpos.y += this.node.height / 2;
            var right = cpos.x > this.node.x;
            actions.push(cc.sequence(
                cc.callFunc(function () {
                    if (cpos.x > this.node.x) {
                        this.node.scaleX = 1;
                    }
                    else {
                        this.node.scaleX = -1;
                    }
                }, this),
                cc.moveTo(this.oneStepTime, cpos)
            ))
            // actions.push(cc.moveTo(this.oneStepTime, cpos));
        }
        actions.push(cc.callFunc(function () {
            this.getComponent(cc.Animation).play('heroStand');
        }, this));

        this.node.stopAllActions();
        this.node.runAction(cc.sequence(actions));
        this.node.runAction(cc.callFunc(function () {
            this.getComponent(cc.Animation).play('heroRun');
        }, this))
    },

    init: function (game) {
        this.game = game;
    }

});
