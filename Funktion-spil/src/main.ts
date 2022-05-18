/// <reference path="../node_modules/@types/p5/global.d.ts"/>

import { Enemy, enemyRadius } from "./enemy";
import { Player, playerRadius } from "./player";

const playerX = window.innerWidth - 50;
export const player = new Player(playerX);

let lastTimeEnemySpawned = 0;
let enemySpawnTimer = 1500;

(window as any).setup = () => {
	createCanvas(windowWidth, windowHeight);
	rectMode(CENTER);
	angleMode(DEGREES);
	new Enemy();
}

(window as any).draw = () => {
	background(255, 75);
	Enemy.forEach(cur => cur.draw());

	player.draw();
	player.applyForce(1); // Gravity

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

	if(millis() - lastTimeEnemySpawned > enemySpawnTimer) { lastTimeEnemySpawned = millis(); new Enemy(); }

	enemySpawnTimer = 800 * 0.996**(millis() / 1000) + 200;
}

// Key shit
document.addEventListener('keydown', (event) => keyPressed(event.key.toLowerCase()));
function keyPressed(key: string) {
	if(key == " ") {
		player.applyForce(-20); // Jumpforce upwards
	}
}