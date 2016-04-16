// 指挥官
var commander = {

}

commander.prototype = {
    send: function(data) {

    },
    sendCmdCreate: function(shipId) {
        send({ id: shipId, comman: 'create' });
    },
    sendCmdFly: function(shipId) {
        send({ id: shipId, comman: 'fly' });
    },
    sendCmdStop: function(shipId) {
        send({ id: shipId, comman: 'stop' });
    },
    sendCmdDestroy: function(shipId) {
        send({ id: shipId, comman: 'destroy' });
    }
};
