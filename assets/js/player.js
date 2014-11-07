function Player() {	
	this.level = 1;
	this.health = 100;
	this.armor = 100;
	this.damage = 2;
	this.ammo = 32;
	
	this.healthCap = 100;
	this.armorCap = 100;
	this.ammoCap = 32;
	
	$("#healthDisplay").html(this.health);
	$("#ammoDisplay").html(this.ammo);
};

Player.prototype.attack = function(enemy) {
	return function() {
		if (World.player.ammo > 0) {
			
			// Decrease enemy health upon attack.
			var startHealth = enemy.health;
			enemy.health = (enemy.health - World.player.damage);
			
			// Decrease player ammunition by 1.
			World.player.ammo = World.player.ammo - 1;
			$("#ammoDisplay").html(World.player.ammo);
			
			// Test for attack.
			console.assert((startHealth > enemy.health), "Enemy not attacked.");
			
			// Kill enemy.
			if (enemy.health <= 0) {
				enemy.kill(enemy);
				return true;
			}
		} else {
			alert("Out of ammunition!");
		}
		return false;
	}
}; 