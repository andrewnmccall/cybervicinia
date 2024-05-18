"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Domino_x, _Domino_y, _Player_dominoes, _DominoesGame_players, _DominoesGame_dominoes;
Object.defineProperty(exports, "__esModule", { value: true });
const pixi_js_1 = require("pixi.js");
/**
 * @param {Array} array
 * @return {Array}
 */
function shuffle(array) {
    let currentIndex = array.length;
    let randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }
    return array;
}
class Domino {
    constructor(args = { x: 0, y: 0 }) {
        /** @property {Number} */
        _Domino_x.set(this, void 0);
        _Domino_y.set(this, void 0);
        __classPrivateFieldSet(this, _Domino_x, args.x, "f");
        __classPrivateFieldSet(this, _Domino_y, args.y, "f");
    }
    get x() {
        return __classPrivateFieldGet(this, _Domino_x, "f");
    }
    get y() {
        return __classPrivateFieldGet(this, _Domino_y, "f");
    }
}
_Domino_x = new WeakMap(), _Domino_y = new WeakMap();
class Player {
    constructor() {
        _Player_dominoes.set(this, []);
    }
    setDominoes(domnioes) {
        __classPrivateFieldSet(this, _Player_dominoes, domnioes, "f");
    }
}
_Player_dominoes = new WeakMap();
class DominoesGame {
    constructor() {
        /** @property {Player[]} */
        _DominoesGame_players.set(this, []);
        /** @property {Domino[]} */
        _DominoesGame_dominoes.set(this, []);
        for (let x = 0; x <= 6; x++) {
            for (let y = x; y <= 6; y++) {
                __classPrivateFieldGet(this, _DominoesGame_dominoes, "f").push(new Domino({ x, y }));
            }
        }
        __classPrivateFieldSet(this, _DominoesGame_dominoes, shuffle(__classPrivateFieldGet(this, _DominoesGame_dominoes, "f")), "f");
        for (let x = 0; x < 4; x++) {
            __classPrivateFieldGet(this, _DominoesGame_players, "f").push(new Player());
            __classPrivateFieldGet(this, _DominoesGame_players, "f")[x].setDominoes(__classPrivateFieldGet(this, _DominoesGame_dominoes, "f").slice(x * 9, 9));
        }
    }
    /**
     * @return {Domino[]}
     */
    getDominoes() {
        return __classPrivateFieldGet(this, _DominoesGame_dominoes, "f");
    }
}
_DominoesGame_players = new WeakMap(), _DominoesGame_dominoes = new WeakMap();
// const gamePanel = document.getElementById('game_panel');
// const game = new DominoesGame();
// game.getDominoes().forEach((dominoe) => {
// 	const dominoeEl = document.createElement('anm-dominoe');
// 	dominoeEl.innerText = `${dominoe.x}|${dominoe.y}`;
// 	gamePanel.appendChild(dominoeEl);
// });
// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new pixi_js_1.Application({
    view: document.getElementById("game_panel"),
});
// load the texture we need
// const texture = await Assets.load('bunny.png');
const bunny = new pixi_js_1.Graphics();
bunny.beginFill(0xff0000);
bunny.drawRect(0, 0, 200, 100);
// This creates a texture from a 'bunny.png' image
// const bunny = new Sprite(texture);
// Setup the position of the bunny
bunny.x = app.renderer.width / 2;
bunny.y = app.renderer.height / 2;
// Rotate around the center
bunny.x = 0.5;
bunny.y = 0.5;
// Add the bunny to the scene we are building
app.stage.addChild(bunny);
// Listen for frame updates
app.ticker.add(() => {
    // each frame we spin the bunny around a bit
    bunny.rotation += 0.01;
});
