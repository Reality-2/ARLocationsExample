function Player() {	
	this.level = 1;
	this.health = 100;
	this.armor = 0;
	this.ammo = 64;
	
	this.healthCap = 100;
	this.armorCap = 100;
	this.ammoCap = 64;
	
	this.damage = 2;
	this.experience = 0;
	
	$("#healthDisplay").html(this.health + " / " + this.healthCap);
	$("#armorDisplay").html(this.armor + " / " + this.armorCap);
	$("#ammoDisplay").html(this.ammo + " / " + this.ammoCap);
};

Player.prototype.attack = function(enemy) {
	return function() {
		if (World.player.ammo > 0) {
			
			// Decrease enemy health upon attack.
			var startHealth = enemy.health;
			enemy.health = (enemy.health - World.player.damage);
			
			// Decrease player ammunition by 1.
			World.player.ammo = World.player.ammo - 1;
			$("#ammoDisplay").html(World.player.ammo + " / " + World.player.ammoCap);
			
			// Test for attack.
			console.assert((startHealth > enemy.health), "Enemy not attacked.");
			
			// Kill enemy.
			if (enemy.health <= 0 && enemy.status != "dead") {
				enemy.kill(enemy);
				return true;
			}
		} else {
			alert("Out of ammunition!");
		}
		return false;
	}
}; 

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

Player.prototype.pickup = function(item) {
	if (item.itemType == "health") {
		if (World.player.health < World.player.healthCap) {
			if ((World.player.health + 10) > World.player.healthCap) {
				World.player.health = World.player.healthCap;
			} else {
				World.player.health = World.player.health + 10;
			}
			$("#healthDisplay").html(World.player.health + " / " + World.player.healthCap);
		} 
	} else if (item.itemType == "armor") {
		if (World.player.armor < World.player.armorCap) {
			if ((World.player.armor + 10) > World.player.armorCap) {
				World.player.armor = World.player.armorCap;
			} else {
				World.player.armor = World.player.armor + 10;
			}
			$("#armorDisplay").html(World.player.armor + " / " + World.player.armorCap);
		} 
	} else {
		if (World.player.ammo < World.player.ammoCap) {
			if ((World.player.ammo + 10) > World.player.ammoCap) {
				World.player.ammo = World.player.ammoCap;
			} else {
				World.player.ammo = World.player.ammo + 10;
			}
			$("#ammoDisplay").html(World.player.ammo + " / " + World.player.ammoCap);
		} 
	}
	setTimeout(function(){
		item.itemObject.enabled = false;
	}, 1000);
};