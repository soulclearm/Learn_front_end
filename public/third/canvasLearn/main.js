'use strict'

var canvas = $('<canvas>')
    .attr('width', '480')
    .attr('height', '480')
    .appendTo($(document.body));

var ctx = canvas.get(0).getContext('2d');

var bgImage = $('<img>')
    .attr('src', 'http://placehold.it/480X480/8df013/fff?text=none')
    .load(function() {
        bgReady = true;
    });

var heroImage = $('<img>')
    .attr('src', 'https://placeholdit.imgix.net/~text?txtsize=18&txtclr=ffff00&txt=hero&w=60&h=60&bg=ff00ff')
    .load(function() {
        heroReady = true;
    });

var monsterImage = $('<img>')
    .attr('src', 'https://placeholdit.imgix.net/~text?txtsize=18&txtclr=ff00ff&txt=monster&w=108&h=60&bg=000')
    .load(function() {
        monsterReady = true;
    });

var hero = {
    speed: 256,
    x: 0,
    y: 0,
}

var monster = {
    x: 0,
    y: 0,
}

var monstersCaught = 0;

var keysDown = {};

$(window).keydown(function(e) {
    keysDown[e.keyCode] = true;
})

$(window).keyup(function(e) {
    delete keysDown[e.keyCode];
})

var reset = function() {
    hero.x = canvas.width() / 2;
    hero.y = canvas.height() / 2;

    // Throw the monster somewhere on the screen randomly
    monster.x = 32 + (Math.random() * (canvas.width() - 64));
    monster.y = 32 + (Math.random() * (canvas.height() - 64));
}

var update = function(modifier) {
    if (38 in keysDown) { // Player holding up
        hero.y -= hero.speed * modifier;
    }
    if (40 in keysDown) { // Player holding down
        hero.y += hero.speed * modifier;
    }
    if (37 in keysDown) { // Player holding left
        hero.x -= hero.speed * modifier;
    }
    if (39 in keysDown) { // Player holding right
        hero.x += hero.speed * modifier;
    }

    // Are they touching?
    if (
        hero.x <= (monster.x + 32) && monster.x <= (hero.x + 32) && hero.y <= (monster.y + 32) && monster.y <= (hero.y + 32)
    ) {
        ++monstersCaught;
        reset();
    }
};

// Draw everything
var render = function() {
    if (bgReady) {
        ctx.drawImage(bgImage.get(0), 0, 0);
    }

    if (heroReady) {
        ctx.drawImage(heroImage.get(0), hero.x, hero.y);
    }

    if (monsterReady) {
        ctx.drawImage(monsterImage.get(0), monster.x, monster.y);
    }

    // Score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Monsterrs caught: " + monstersCaught, 32, 32);
};

var main = function() {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render();

    then = now;

    // Request to do this again ASAP
    requestAnimation(main);
};

var bgReady = false,
    heroReady = false,
    monsterReady = false;

var w = window;
var requestAnimation = w.requestAnimationFrame ||
    w.webkitRequestAnimationFrame ||
    w.msRequestAnimationFrame ||
    w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();
