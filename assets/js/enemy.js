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
		onClick: Player.prototype.attack(this)
	});
	
	this.enemyObject = new AR.GeoObject(this.enemyLocation, {
		drawables: {
			cam: this.enemyDrawable,
		}
	});
	
	var anim = new AR.PropertyAnimation( 
			this.enemyObject.locations[0],
			"latitude",
			null,
			World.currLat,
			10000
	);
	
	var anim2 = new AR.PropertyAnimation( 
			this.enemyObject.locations[0],
			"longitude",
			null,
			World.currLong,
			10000
	);
	
	var q1 = new AR.AnimationGroup(AR.CONST.ANIMATION_GROUP_TYPE.PARALLEL, [anim, anim2]);
	
	q1.start(-1);
	
	console.assert(!(q1.isRunning()), "Animation running, assert true.")
	
	return this;
};

Enemy.prototype.kill = function(enemy) {
	enemy.status = "dead";
	enemy.enemyDrawable.imageResource = World.enemyDrawableDead;
	enemy.enemyDrawable.height = 1;
	setTimeout(function() {
		enemy.enemyObject.enabled = false;
	}, 1000);
	console.assert((!(enemy.status == "dead") && !(enemy.enemyObject.enabled == false)), "Enemy is dead. Assert true.")
};
