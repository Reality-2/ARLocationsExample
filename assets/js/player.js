// This class creates the object for the actual player. It sets up his stats and 
// initializes the display for the health, armor, and ammo UI displays. The methods
// allow for the player attacking and defeating the generators and enemies, as well
// as picking up the items that the enemies drop.
function Player() {	
	
	// Initialize the player statistics.
	this.health = 100;
	this.armor = 10;
	this.ammo = 64;
	this.healthCap = 100;
	this.armorCap = 100;
	this.ammoCap = 64;
	this.damage = 2;
	
	// Render the statistics on the UI html
	$("#healthDisplay").html(this.health + " / " + this.healthCap);
	$("#armorDisplay").html(this.armor + " / " + this.armorCap);
	$("#ammoDisplay").html(this.ammo + " / " + this.ammoCap);
};

/**
//getnativedata
Player.prototype.fromNative = function(level, health, armor, ammo) {
	level: var param1 = level + 1;
	health: var param2 = health + 1;
	var param3 = armor + 1;
	var param4 = ammo + 1;
	document.location = "architectsdk://runMethod?level="+param1+"&health="+param2+"&armor="+param3+"&ammo="+param4;
	World.player.level = level;
	World.player.health = health;
	World.player.armor = armor;
	World.player.ammo = ammo;
};//end fromNative
*/

// This method allows for the player attacking the enemy.
Player.prototype.attack = function(enemy) {
	return function() {
		// Attack only if the player has enough ammo
		if (World.player.ammo > 0) {
			
			// Changing the shotgun image to firing
			document.getElementById("shotgun").src = "assets/shotgunFired5.png";
			
			// Play shotgun shot sound
			ShotgunShotSound.load();
			
			// Decrease enemy health upon attack.
			var startHealth = enemy.health;
			enemy.health = (enemy.health - World.player.damage);
			
			// Decrease player ammunition by 1.
			World.player.ammo = World.player.ammo - 1;
			$("#ammoDisplay").html(World.player.ammo + " / " + World.player.ammoCap);
			
			// Test for attack.
			console.assert((startHealth > enemy.health), "Enemy not attacked.");
			
			setTimeout(function(){
				document.getElementById("shotgun").src = "assets/shotgunFired1.png";
			}, 1000);
			// Kill enemy.
			if (enemy.health <= 0 && enemy.status != "dead") {
				enemy.kill(enemy);
				ImpDeathSound.load();
				return true;
			} else if (enemy.health > 0 && enemy.status != "dead") {
				ImpGruntSound.load();
			}
		} else {
			alert("Out of ammunition!");
		}
		return false;
	}
}; 

// Destroy the generator each time the player taps on it.
Player.prototype.destroy = function(generator) {
	return function() {
		if (World.player.ammo > 0) {
			
			// Decrease enemy health upon attack.
			var startHealth = generator.health;
			generator.health = (generator.health - World.player.damage);
			
			// Decrease player ammunition by 1.
			World.player.ammo = World.player.ammo - 1;
			$("#ammoDisplay").html(World.player.ammo + " / " + World.player.ammoCap);
			
			// Test for attack.
			console.assert((startHealth > generator.health), "Generator not attacked.");
			
			// Kill enemy.
			if (generator.health == 0) {
				generator.destroy(generator);
				return true;
			}
		} else {
		}
		return false;
	}
}; 

// This method allows for the player's functionality of picking up items.
Player.prototype.pickup = function(item) {
	// Test variables
	var originalHealth = World.player.health;
	var originalArmor = World.player.armor;
	var originalAmmo = World.player.ammo;
	
	// If the item is a health pick-up, increase the user health by 10, up to the cap
	if (item.itemType == "health") {
		if (World.player.health < World.player.healthCap) {
			if ((World.player.health + 10) > World.player.healthCap) {
				World.player.health = World.player.healthCap;
			} else {
				World.player.health = World.player.health + 10;
			}
			
			// Update UI display
			$("#healthDisplay").html(World.player.health + " / " + World.player.healthCap);
		} 
		
	// If the item is an armor pick-up, inrease the user armor by 10, up to the cap
	} else if (item.itemType == "armor") {
		if (World.player.armor < World.player.armorCap) {
			if ((World.player.armor + 10) > World.player.armorCap) {
				World.player.armor = World.player.armorCap;
			} else {
				World.player.armor = World.player.armor + 10;
			}
			
			// Update UI display
			$("#armorDisplay").html(World.player.armor + " / " + World.player.armorCap);
		} 
	
	// If the item is an ammo pick-up, increase the user ammo by 10, up to the cap
	} else {
		if (World.player.ammo < World.player.ammoCap) {
			if ((World.player.ammo + 10) > World.player.ammoCap) {
				World.player.ammo = World.player.ammoCap;
			} else {
				World.player.ammo = World.player.ammo + 10;
			}
			
			// Update UI display
			$("#ammoDisplay").html(World.player.ammo + " / " + World.player.ammoCap);
		} 
	}
	
	console.assert((originalHealth == World.player.health && originalArmor == World.player.armor && originalAmmo == World.player.ammo), "Item has been applied.")
	
	// Remove the item from the view
	setTimeout(function(){
		item.itemObject.enabled = false;
	}, 1000);
};