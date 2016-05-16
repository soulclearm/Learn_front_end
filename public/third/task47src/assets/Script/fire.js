cc.Class({
    extends: cc.Component,

    properties: {
        speed: 500,
    },

    init: function (game, angle, type) {
        this.game = game;
        this.speedX = this.speed * Math.cos(angle);
        this.speedY = this.speed * Math.sin(angle);
        this.type = type;
    },


    onLoad: function () {

    },

    update: function (dt) {
        this.node.x += dt * this.speedX;
        this.node.y += dt * this.speedY;

        var girdPos = this.game.getGirdPos(this.node.position);

        if (!this.game.checkPos(girdPos)) {
            this.node.destroy();
            return;
        }

        if (this.type === 'enermy' && this.game.hero.getBoundingBox().contains(this.node.position)) {
            this.node.destroy();
            this.game.gameOver();
            return;
        }

        if (this.type === 'hero') {
            for (var i = this.game.enermys.length - 1; i >= 0; i--) {
                var enermy = this.game.enermys[i];
                if (enermy.getBoundingBox().contains(this.node.position)) {
                    this.node.destroy();
                    this.game.enermys.splice(i, 1);
                    enermy.destroy();
                    return;
                }
            }
        }
    },
});
