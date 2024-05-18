import {
	Application,  Container,  Graphics, Point, Text
} from 'pixi.js';


/**
 * @param {Array} array
 * @return {Array}
 */
function shuffle(array: Array<any>) {
	let currentIndex = array.length; let randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex != 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
	}

	return array;
}

class Domino {
	/** @property {Number} */
	#x;
	#y;

	constructor(args: {x: Number, y: Number} = {x: 0, y: 0}) {
		this.#x = args.x;
		this.#y = args.y;
	}

	get x() {
		return this.#x;
	}

	get y() {
		return this.#y;
	}
}

class Player {
	#dominoes: Domino[] = [];

	setDominoes(domnioes: Domino[]) {
		this.#dominoes = domnioes;
		console.log(this.#dominoes);
	}
}

class DominoesGame {
	/** @property {Player[]} */
	#players: Player[] = [];
	/** @property {Domino[]} */
	#dominoes: Domino[] = [];
	constructor() {
		for (let x = 0; x <= 6; x++) {
			for (let y = x; y <= 6; y++) {
				this.#dominoes.push(new Domino({x, y}));
			}
		}
		this.#dominoes = shuffle(this.#dominoes);
		for (let x = 0; x < 4; x++) {
			this.#players.push(new Player());
			this.#players[x].setDominoes(this.#dominoes.slice(x*9, 9));
		}
	}

	/**
	 * @return {Domino[]}
	 */
	getDominoes() {
		return this.#dominoes;
	}
}

// const gamePanel = document.getElementById('game_panel');
new DominoesGame();
// game.getDominoes().forEach((dominoe) => {
// 	const dominoeEl = document.createElement('anm-dominoe');
// 	dominoeEl.innerText = `${dominoe.x}|${dominoe.y}`;
// 	gamePanel.appendChild(dominoeEl);
// });


class PlayfieldBlock {
}
class Playfield {
	readonly rows: number;
	readonly cols: number;
	#blocks: PlayfieldBlock[][]
	constructor(rows: number, cols: number) {
		this.rows = rows;
		this.cols = cols;
		this.#blocks = [];
		for(let i = 0; i < cols; i++) {
			this.#blocks.push(Array(rows));
		}
	}
}

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
});

// load the texture we need
// const texture = await Assets.load('bunny.png');
const playfield = new Playfield(5, 5);
const BLOCK_WIDTH = 200;
const BLOCK_HEIGHT = 100;
const CENTER_X = app.renderer.width / 2;
const CENTER_Y = app.renderer.height / 2;
const playfieldContainer = new Container();
app.stage.addChild(playfieldContainer);
playfieldContainer.scale.x = .5;
playfieldContainer.scale.y = .5;
for (let x = 0; x < playfield.cols; x++) {
	for (let y = 0; y < playfield.rows; y++) {
		const bunny = new Graphics();
		bunny.beginFill(0x00ff00);
		bunny.drawPolygon([
			new Point(0, BLOCK_HEIGHT / 2),
			new Point(BLOCK_WIDTH / 2, 0),
			new Point(BLOCK_WIDTH, BLOCK_HEIGHT / 2),
			new Point(BLOCK_WIDTH / 2, BLOCK_HEIGHT),
		]);
		
		// This creates a texture from a 'bunny.png' image
		// const bunny = new Sprite(texture);
		
		// Setup the position of the bunny
		bunny.x = CENTER_X + ((x + y - (playfield.cols / 2)) * (BLOCK_WIDTH/2));
		bunny.y = CENTER_Y + ((y - x - (playfield.rows / 2)) * (BLOCK_HEIGHT/2));
		bunny.interactive = true;
		bunny.on('pointerout', () => {
			bunny.clear();
			bunny.beginFill(0xff0000);
			bunny.drawPolygon([
				new Point(0, BLOCK_HEIGHT / 2),
				new Point(BLOCK_WIDTH / 2, 0),
				new Point(BLOCK_WIDTH, BLOCK_HEIGHT / 2),
				new Point(BLOCK_WIDTH / 2, BLOCK_HEIGHT),
			]);
		});
		bunny.on('pointerenter', () => {
			bunny.clear();
			bunny.beginFill(0x0000ff);
			bunny.drawPolygon([
				new Point(0, BLOCK_HEIGHT / 2),
				new Point(BLOCK_WIDTH / 2, 0),
				new Point(BLOCK_WIDTH, BLOCK_HEIGHT / 2),
				new Point(BLOCK_WIDTH / 2, BLOCK_HEIGHT),
			]);
		});
		
		// Rotate around the center
		// bunny.x = 0.5;
		// bunny.y = 0.5;
		
		// Add the bunny to the scene we are building
		playfieldContainer.addChild(bunny);
		const text = new Text(x + '-' + y, {
			fontFamily: 'Arial',
			fontSize: 24,
			fill: 0x00FF10,
			align: 'center',
		});
		text.x = CENTER_X + ((x + y - (playfield.cols / 2)) * BLOCK_WIDTH/2);
		text.y = CENTER_Y + ((y - x - (playfield.rows / 2)) * BLOCK_HEIGHT/2);
		playfieldContainer.addChild(text);
	}
}


const hudContainer = new Container();

const zoomIn = new Graphics();
zoomIn.beginFill(0x00ff00);
zoomIn.drawPolygon([
	new Point(0, 0),
	new Point(25, 0),
	new Point(25, 25),
	new Point(0, 25),
]);
zoomIn.x = 20;
zoomIn.y = app.renderer.height - 20;
zoomIn.interactive = true;
zoomIn.cursor = 'pointer';
zoomIn.on('click', () => {
	playfieldContainer.scale = new Point(playfieldContainer.scale.x + .1, playfieldContainer.scale.y + .1);
})
hudContainer.addChild(zoomIn);

app.stage.addChild(hudContainer);

app.stage.interactive = true;
app.stage.on('globalpointermove', (event) => {
	if(event.buttons == 1) {
		playfieldContainer.x += event.movement.x;
		playfieldContainer.y += event.movement.y;
	}
	// console.log(event.buttons);
	// console.log(event.movement);
});
app.stage.on('globaltouchmove', (event) => {
	console.log(event);
});
app.stage.on('globalmousemove', (event) => {
	console.log(event);
});
// Listen for frame updates
// app.ticker.add(() => {
	// each frame we spin the bunny around a bit
	// bunny.rotation += 0.01;
// });
