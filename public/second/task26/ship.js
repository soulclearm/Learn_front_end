/* 
动力系统
可以完成飞行和停止飞行两个行为
暂定所有飞船的动力系统飞行速度是一致的，比如每秒20px，
飞行过程中会按照一定速率消耗能源（比如每秒减5%）
*/
var powerSystem = function(ship) {
    this.ship = ship;
    ship.speed = 20;
    ship.costEnergy = 5;
    ship.isFlying = false;
}

powerSystem.prototype = {
    start: function() {
        var ship = this.ship;
        this.ship.isFlying = true;
        var i = setInterval(function() {
            if (!ship.isFlying) {
                clearInterval(i);
                return;
            }

            if (ship.energy < ship.costEnergy) {
                ship.isFlying = false;
                return;
            }
            ship.energy -= ship.costEnergy;

        }, 1000);
    },
    stop: function() {
        this.ship.isFlying = false;
    }
};

/*
能源系统，提供能源，并且在宇宙中通过太阳能充电（比如每秒增加2%，具体速率自定）
*/
var energySystem = function(ship) {
    this.ship = ship;
    ship.increaseSpeed = 2;
    ship.energy = 100;
    this.update();
}

energySystem.prototype = {
    update: function() {
        var ship = this.ship;
        var i = setInterval(function() {
            ship.energy += ship.increaseSpeed;
            if (ship.energy >= ship.maxEnergy) {
                ship.energy = ship.maxEnergy;
            }
        }, 1000)
    }
};

/*
销毁系统
*/
var destroySystem = function(ship) {
    this.ship = ship;
    this.ship.isDead = false;
}

destroySystem.prototype = {
    destroySelf: function() {
        this.ship.isDead = true;
    }
};

/*
信号接收处理系统，用于接收行星上的信号
*/
var signalSystem = function(ship) {
    this.ship = ship;
}

signalSystem.prototype = {

};

/*
飞船
*/
var ship = function(orbit) {
    this.orbit = orbit;
    this.energy = 100;
    this.powerSys = new powerSystem(this);
    this.energySys = new energySystem(this);
    this.destroySys = new destroySystem(this);
    this.signalSys = new signalSystem(this);
};

ship.prototype = {
    maxEnergy: 100,
    initEle: function() {}
};

function createShip(orbit) {
    return new ship(orbit);
}
