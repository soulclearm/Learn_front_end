cc.Class({
    extends: cc.Component,

    properties: {
        watchRange: 200,
        fireInterval: 0.6
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

    init: function (game) {
        this.game = game;
        this.time = 3;
    },

    // use this for initialization
    onLoad: function () {

    },

    checkFire: function () {
        if (this.time > 0) {
            return;
        }
        var heroPos = this.game.hero.position;
        var pos = this.node.position;
        if (cc.pDistance(heroPos, pos) < this.watchRange) {
            var angle = cc.pToAngle(cc.pSub(heroPos, this.node.position));

            this.game.createFire(pos, heroPos, 'enermy');
        }
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (this.game.isOver) {
            return;
        }
        this.time -= dt;
        if (this.time <= 0) {
            this.checkFire();
            this.time = this.fireInterval;
        }
    },
});
