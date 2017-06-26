"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Breakfast = (function () {
    function Breakfast() {
        var _this = this;
        this.counter = 0;
        this.observers = new Array();
        this.bar = document.getElementsByTagName("bar")[0];
        this.button = document.getElementsByTagName("foodbutton")[0];
        this.button.style.cursor = "auto";
        this.callback = function (e) { return _this.onClick(e); };
    }
    Breakfast.prototype.update = function () {
        this.counter = Math.min(1, this.counter + 0.003);
        this.bar.style.width = (143 * this.counter) + "px";
        if (this.counter >= 1) {
            this.button.classList.add("blinking");
            this.button.addEventListener("click", this.callback);
            this.button.style.cursor = "pointer";
        }
    };
    Breakfast.prototype.onClick = function (e) {
        this.game = Game.getInstance();
        console.log("Ontbijtjes uitdelen!");
        for (var i = 0; i < this.observers.length; i++) {
            this.observers[i].notify();
        }
        this.counter = 0;
        this.button.removeEventListener("click", this.callback);
        this.button.classList.remove("blinking");
        this.button.style.cursor = "auto";
    };
    Breakfast.prototype.subscribe = function (obj) {
        this.observers.push(obj);
    };
    Breakfast.prototype.unsubscribe = function (obj) {
        var i = this.observers.indexOf(obj);
        if (i != -1) {
            this.observers.splice(i, 1);
        }
    };
    return Breakfast;
}());
var Card = (function () {
    function Card(x) {
        this.div = document.createElement("card");
        document.body.appendChild(this.div);
        this.div.style.left = x + "px";
    }
    return Card;
}());
var State;
(function (State) {
    State[State["SLEEPING"] = 0] = "SLEEPING";
    State[State["HUNGRY"] = 1] = "HUNGRY";
})(State || (State = {}));
var Game = (function () {
    function Game() {
        var _this = this;
        this.gameObjects = new Array();
        this.breakfast = new Breakfast();
        this.gandalfAmount = Math.floor(Math.random() * 8) + 1;
        for (var g = 0; g < this.gandalfAmount; g++) {
            this.gameObjects.push(new Gandalf());
        }
        this.orcAmount = Math.floor(Math.random() * 8) + 1;
        for (var o = 0; o < this.orcAmount; o++) {
            this.gameObjects.push(new Ork());
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.breakfast.update();
        for (var i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].update();
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
var GameObject = (function () {
    function GameObject() {
        this.xspeed = 0;
        this.yspeed = 0;
        this.speedmultiplier = 1;
        this.facing = 1;
        this.x = 0;
        this.y = 0;
        this.width = 67;
        this.height = 119;
    }
    GameObject.prototype.update = function () {
    };
    GameObject.prototype.setTarget = function () {
    };
    GameObject.prototype.setSpeed = function (xdist, ydist) {
    };
    return GameObject;
}());
var Gandalf = (function (_super) {
    __extends(Gandalf, _super);
    function Gandalf() {
        var _this = _super.call(this) || this;
        _this.xspeed = 0;
        _this.yspeed = 0;
        _this.speedmultiplier = 1;
        _this.facing = 1;
        _this.x = 0;
        _this.y = 0;
        _this.x = Math.random() * (window.innerWidth - 67);
        _this.y = Math.random() * (window.innerHeight - 110);
        _this.speedmultiplier = Math.random() + 1;
        _this.tag = "gandalf";
        _this.div = document.createElement(_this.tag);
        document.body.appendChild(_this.div);
        _this.div.style.backgroundImage = "url(images/" + _this.tag + "_hungry.png)";
        _this.callback = function (e) { return _this.onClick(e); };
        _this.inMordor = false;
        _this.state = new Sleeping(_this);
        return _this;
    }
    Gandalf.prototype.update = function () {
        this.state.action();
        this.facing = (this.xspeed > 0) ? -1 : 1;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) scale(" + this.facing + ",1)";
    };
    Gandalf.prototype.onClick = function (e) {
        this.state.onClick();
    };
    Gandalf.prototype.setTarget = function () {
        this.xTarget = Math.random() * (window.innerWidth - 80);
        this.yTarget = Math.random() * (window.innerHeight - 120);
    };
    Gandalf.prototype.setSpeed = function (xdist, ydist) {
        var distance = Math.sqrt(xdist * xdist + ydist * ydist);
        this.xspeed = xdist / distance;
        this.yspeed = ydist / distance;
        this.xspeed *= this.speedmultiplier;
        this.yspeed *= this.speedmultiplier;
    };
    Gandalf.prototype.sendCard = function () {
        if (this.inMordor == false) {
            this.card = new Card(this.x);
            this.div.remove();
            this.inMordor = true;
        }
    };
    Gandalf.prototype.notify = function () {
        this.state.notify();
    };
    return Gandalf;
}(GameObject));
var Hungry = (function () {
    function Hungry(g) {
        this.gandalf = g;
        this.timer = 0;
        this.gandalf.div.style.backgroundImage = "url(images/" + this.gandalf.tag + "_hungry.png)";
        this.gandalf.div.style.cursor = "auto";
        this.gandalf.setTarget();
        var game = Game.getInstance();
        game.breakfast.subscribe(this.gandalf);
    }
    Hungry.prototype.onClick = function () {
    };
    Hungry.prototype.action = function () {
        this.gandalf.x += this.gandalf.xspeed;
        this.gandalf.y += this.gandalf.yspeed;
        var xdistance = this.gandalf.xTarget - this.gandalf.x;
        var ydistance = this.gandalf.yTarget - this.gandalf.y;
        if (xdistance < 4 && ydistance < 4)
            this.gandalf.setTarget();
        this.gandalf.setSpeed(xdistance, ydistance);
        this.timer++;
        if (this.timer > 300) {
            this.gandalf.state = new Sleeping(this.gandalf);
        }
    };
    Hungry.prototype.notify = function () {
        this.gandalf.state = new Leaving(this.gandalf);
    };
    return Hungry;
}());
var Leaving = (function () {
    function Leaving(g) {
        this.gandalf = g;
        this.gandalf.div.style.backgroundImage = "url(images/" + this.gandalf.tag + "_leaving.png)";
        this.gandalf.div.style.cursor = "auto";
        this.gandalf.xTarget = Math.random() * window.innerWidth;
        this.gandalf.yTarget = window.innerHeight + 300;
        this.gandalf.speedmultiplier += 1;
    }
    Leaving.prototype.onClick = function () {
    };
    Leaving.prototype.action = function () {
        this.gandalf.x += this.gandalf.xspeed;
        this.gandalf.y += this.gandalf.yspeed;
        var xdistance = this.gandalf.xTarget - this.gandalf.x;
        var ydistance = this.gandalf.yTarget - this.gandalf.y;
        this.gandalf.setSpeed(xdistance, ydistance);
        if (xdistance < 4 && ydistance < 4) {
            console.log("het karakter is uit beeld");
            this.gandalf.sendCard();
        }
    };
    Leaving.prototype.notify = function () {
    };
    return Leaving;
}());
window.addEventListener("load", function () {
    Game.getInstance();
});
var Ork = (function (_super) {
    __extends(Ork, _super);
    function Ork() {
        var _this = _super.call(this) || this;
        _this.xspeed = 0;
        _this.yspeed = 0;
        _this.speedmultiplier = 1;
        _this.facing = 1;
        _this.x = 0;
        _this.y = 0;
        _this.tag = "ork";
        _this.x = Math.random() * (window.innerWidth - 67);
        _this.y = Math.random() * (window.innerHeight - 110);
        _this.speedmultiplier = Math.random() + 1;
        _this.div = document.createElement(_this.tag);
        document.body.appendChild(_this.div);
        _this.div.style.backgroundImage = "url(images/" + _this.tag + "_hungry.png)";
        _this.div.style.cursor = "auto";
        _this.setTarget();
        return _this;
    }
    Ork.prototype.update = function () {
        this.x += this.xspeed;
        this.y += this.yspeed;
        var xdistance = this.xTarget - this.x;
        var ydistance = this.yTarget - this.y;
        if (xdistance < 4 && ydistance < 4)
            this.setTarget();
        this.setSpeed(xdistance, ydistance);
        this.facing = (this.xspeed > 0) ? -1 : 1;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) scale(" + this.facing + ",1)";
    };
    Ork.prototype.setTarget = function () {
        this.xTarget = Math.random() * (window.innerWidth - 80);
        this.yTarget = Math.random() * (window.innerHeight - 120);
    };
    Ork.prototype.setSpeed = function (xdist, ydist) {
        var distance = Math.sqrt(xdist * xdist + ydist * ydist);
        this.xspeed = xdist / distance;
        this.yspeed = ydist / distance;
        this.xspeed *= this.speedmultiplier;
        this.yspeed *= this.speedmultiplier;
    };
    return Ork;
}(GameObject));
var Sleeping = (function () {
    function Sleeping(g) {
        this.gandalf = g;
        this.gandalf.div.style.backgroundImage = "url(images/" + this.gandalf.tag + "_sleep.png)";
        this.gandalf.div.style.cursor = "pointer";
        this.gandalf.div.addEventListener("click", this.gandalf.callback);
    }
    Sleeping.prototype.onClick = function () {
        console.log("je klikt op gandalf. de listener wordt nu verwijderd.");
        this.gandalf.div.style.cursor = "auto";
        this.gandalf.div.removeEventListener("click", this.gandalf.callback);
        this.gandalf.state = new Hungry(this.gandalf);
    };
    Sleeping.prototype.action = function () {
    };
    Sleeping.prototype.notify = function () {
    };
    return Sleeping;
}());
//# sourceMappingURL=main.js.map