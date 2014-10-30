function Enemy(enemyInfo) {
	this.enemyInfo = enemyInfo;
	this.status = "alive";
	this.health = 10;
	this.armor = 10;
	this.speed = 10;
	this.attack = 10;
	
	this.enemyLocation = new AR.GeoLocation(enemyInfo.latitude, enemyInfo.longitude, enemyInfo.altitude);
	
	this.enemyDrawable = new AR.ImageDrawable(World.enemyDrawableIdle, 2, {
		zOrder: 1,
		opacity: 1.0,
		onClick: Enemy.prototype.kill(this)
	});
	
	this.enemyObject = new AR.GeoObject(this.enemyLocation, {
		drawables: {
			cam: this.enemyDrawable,
		}
	});
	return this;
};

Enemy.prototype.attackPlayer = function(enemy, player) {
	
};

Enemy.prototype.kill = function(enemy) {
	return function() {
		enemy.status = "dead";
		enemy.enemyDrawable.imageResource = World.enemyDrawableDead;
		enemy.enemyDrawable.height = 1;
	}
};
