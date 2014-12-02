// This class creates a new enemy object in the world and spawns it at a random location
// around the vicinity of a portal. The enemies move towards the player and 
// attack the player once they are within 50 ft.
function Enemy(enemyInfo) {
	
	// Set up enemy stats
	this.enemyInfo = enemyInfo;
	this.status = "alive";
	this.health = 10;
	this.attack = 5;
	
	// Set up enemy location.
	this.enemyLocation = new AR.GeoLocation(enemyInfo.latitude, enemyInfo.longitude, enemyInfo.altitude);
	
	// Set up the enemy drawable
	this.enemyDrawable = new AR.AnimatedImageDrawable(World.enemyDrawableIdle, 2, 58, 62, {
		zOrder: 1,
		opacity: 1.0,
		onClick: Player.prototype.attack(this)
	});
	
	// Animate the enmy drawable
	this.enemyDrawable.animate([0, 1, 2, 3], 150, -1);
	
	// Render the enemy at the location
	this.enemyObject = new AR.GeoObject(this.enemyLocation, {
		drawables: {
			cam: this.enemyDrawable, 
		}
	});
	
	// Initialize enemy moving toward player in latitude and longitude
	this.anim = new AR.PropertyAnimation( 
			this.enemyObject.locations[0],
			"latitude",
			null,
			World.currLat,
			10000
	);
	this.anim2 = new AR.PropertyAnimation( 
			this.enemyObject.locations[0],
			"longitude",
			null,
			World.currLong,
			10000
	);
	this.q1 = new AR.AnimationGroup(
			AR.CONST.ANIMATION_GROUP_TYPE.PARALLEL, 
			[this.anim, this.anim2],
			{onFinish : Enemy.prototype.updateAnim(this)}
	);
	
	// Start the enemy movement toward player
	this.q1.start(-1);
	
	console.assert(!(this.q1.isRunning()), "Animation running.")
	
	return this;
};

// Reset the starting and target locations for the enemies' movement.
Enemy.prototype.updateAnim = function(enemy) {
	enemy.anim.start = enemy.anim.end;
	enemy.anim.end = World.currLat;
	enemy.anim2.start = enemy.anim2.end;
	enemy.anim2.end = World.currLong;
};

// Kill the enemy
Enemy.prototype.kill = function(enemy) {
	// Change enemy status and stop movement
	enemy.status = "dead";
	enemy.q1.stop();
	
	// Change enemy drawable to the "dead" version
	enemy.enemyDrawable.imageResource = World.enemyDrawableDead;
	enemy.enemyDrawable.animate([0, 1, 2, 3, 4], 150, 1);
	
	// Remove the enemy from the screen and replace it with an item drop.
	setTimeout(function() {
		enemy.enemyObject.enabled = false;
		Enemy.prototype.dropItem(enemy);
	}, 2000);
	console.assert((!(enemy.status == "dead") && !(enemy.enemyObject.enabled == false)), "Enemy is dead.")
};

// This method creates the logic for the enemy attacking the player
Enemy.prototype.attackPlayer = function(enemy) {
	
	// First destroy the player's armor before attacking health directly
	if (World.player.armor > 0) {
		// Only attack the player if the enemy is 50 meters away from player
		if (enemy.enemyLocation.distanceToUser() < 50 && enemy.status == "alive") {
			enemy.q1.stop();
			
			// Change enemy animation to attacking and play sound for player damage
			enemy.enemyDrawable.imageResource = World.enemyDrawableAttacking;
			enemy.enemyDrawable.animate([0, 1], 150, -1);
			ArmorHitSound.load();
			
			// Update player stats and redraw html
			World.player.armor = World.player.armor - (enemy.attack - 3);
			$("#armorDisplay").html(World.player.armor + " / " + World.player.armorCap);
			// console.log("Enemy is attacking armor!");
		}
		
	// If player armor destroyed, attack the player's health directly
	} else if (World.player.health > 0) {

		// Only attack the player if the enemy is 50 meters away from player
		if (enemy.enemyLocation.distanceToUser() < 50 && enemy.status == "alive") {
			enemy.q1.stop();
			
			// Change enemy animation to attacking and play sound for player damage
			enemy.enemyDrawable.imageResource = World.enemyDrawableAttacking;
			enemy.enemyDrawable.animate([0, 1], 150, -1);
			GruntSound.load();
			
			// Update player stats and redraw html
			World.player.health = World.player.health - enemy.attack;
			$("#healthDisplay").html(World.player.health + " / " + World.player.healthCap);
			// console.log("Enemy is attacking health!");
		}
		
	// If player health reaches 0, destroy the world and show game over screen
	} else {
		// Stop game music and play defeat music
		GameMusic.stop();
		DefeatMusic.load();
		console.assert(!(DefeatMusic.state.PLAYING), "Music is playing.");
		
		// Clear the view of all objects and display a game-over screen
		World.enemies = [];
		World.portals = [];
		setTimeout(function() {
			alert("Game Over!");
			AR.context.destroyAll();
		}, 2000);
	}
};

// This method allows for the function of the enemy dropping a random pick-up on death
Enemy.prototype.dropItem = function(enemy) {
	
	// Set up which item to randomly drop
	var item = null;
	var itemType = null;
	var randomNum = (Math.floor(Math.random() * 3)  + 1);
	if (randomNum == 1) {
		itemType = "health";
	} else if(randomNum == 2) {
		itemType = "armor";
	} else {
		itemType = "ammo";
	}
	
	// Set up the item type and location for spwaning and create a new item object
	var itemInfo = {
		"latitude": enemy.enemyInfo.latitude,
		"longitude": enemy.enemyInfo.longitude,
		"altitude": enemy.enemyInfo.altitude,
		"itemType": itemType
	};
	item = new Item(itemInfo);
	
	// Assert test for item.
	console.assert((item.itemObject.enabled == false), "Item has been dropped.")
};
