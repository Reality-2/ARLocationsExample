function Player() {	
	this.level = 1;
	this.health = 100;
	this.armor = 100;
	this.damage = 2;
	this.ammo = 32;
	
	this.healthCap = 100;
	this.armorCap = 100;
	this.ammoCap = 32;
};

Player.prototype.attack = function(enemy) {
	return function() {
		var startHealth = enemy.health;
		enemy.health = (enemy.health - World.player.damage);
		console.assert((startHealth > enemy.health), "Enemy not attacked.");
		if (enemy.health <= 0) {
			enemy.kill(enemy);
			return true;
		}
		return false;
	}
}; 