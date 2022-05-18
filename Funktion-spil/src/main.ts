/// <reference path="../node_modules/@types/p5/global.d.ts"/>

import { Enemy, enemyRadius } from "./enemy";
import { Player, playerRadius } from "./player";

const playerX = window.innerWidth - 50;
const player = new Player(playerX);

(window as any).setup = () => {
	createCanvas(windowWidth, windowHeight);
	rectMode(CENTER);
	angleMode(DEGREES);
	new Enemy();
	setInterval(() => (focused && new Enemy()), 200);
}

(window as any).draw = () => {
	background(255, 75);
	Enemy.forEach(cur => cur.draw());

	player.draw();
	player.applyForce(1); // Gravity

	stroke(0);
	line((playerX - playerRadius), 0, (playerX - playerRadius), height);

	// Find all enemies that are close enough to the player
	const enemiesToCheck: Enemy[] = [];
	for(let idx = 0; idx < Enemy.enemies.length; idx++) {
		const enemy = Enemy.enemies[idx];

		// If the enemy isn't close enough to the player, break out of the loop
		// All the enemies have the same speed, so we can be sure all the enemies are in sequential order
		if(enemy.x + enemyRadius < (playerX - playerRadius)) break;

		enemiesToCheck.push(enemy);
	}

	player.checkCollision(enemiesToCheck);

	noStroke();
	rect(0, 0, 150, 50);
	text('FPS: ' + frameRate().toFixed(2), 5, 15);
	text('Enemies: ' + Enemy.enemies.length, 5, 25);
}

// Key shit
document.addEventListener('keydown', (event) => keyPressed(event.key.toLowerCase()));
function keyPressed(key: string) {
	if(key == " ") {
		player.applyForce(-20); // Jumpforce upwards
	}
}