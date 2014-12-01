function Enemy(enemyInfo) {
	this.enemyInfo = enemyInfo;
	this.status = "alive";
	this.health = 10;
	this.armor = 10;
	this.speed = 10;
	this.attack = 2;
	
	this.enemyLocation = new AR.GeoLocation(enemyInfo.latitude, enemyInfo.longitude, enemyInfo.altitude);
	
	this.enemyDrawable = new AR.AnimatedImageDrawable(World.enemyDrawableIdle, 2, 40, 60, {
		zOrder: 1,
		opacity: 1.0,
		onClick: Player.prototype.attack(this)
	});
	
	this.enemyDrawable.animate([0, 1, 2, 3], 150, -1);
	
	this.enemyObject = new AR.GeoObject(this.enemyLocation, {
		drawables: {
			cam: this.enemyDrawable, 
		}
	});
	
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
	this.q1.start(-1);
	
	console.assert(!(this.q1.isRunning()), "Animation running.")
	
	return this;
};

Enemy.prototype.updateAnim = function(enemy) {
	enemy.anim.start = enemy.anim.end;
	enemy.anim.end = World.currLat;
	enemy.anim2.start = enemy.anim2.end;
	enemy.anim2.end = World.currLong;
};

Enemy.prototype.kill = function(enemy) {
	enemy.status = "dead";
	enemy.enemyDrawable.imageResource = World.enemyDrawableDead;
	enemy.q1.stop();
	setTimeout(function() {
		enemy.enemyObject.enabled = false;
		Enemy.prototype.dropItem(enemy);
	}, 1000);
	console.assert((!(enemy.status == "dead") && !(enemy.enemyObject.enabled == false)), "Enemy is dead.")
};

Enemy.prototype.attackPlayer = function(enemy) {
	if (World.player.health > 0) {
		if (enemy.enemyLocation.distanceToUser() < 50 && enemy.status == "alive") {
			World.player.health = World.player.health - enemy.attack;
			$("#healthDisplay").html(World.player.health + " / " + World.player.healthCap);
			console.log("Enemy is attacking!");
		}
	} else {
		GameMusic.stop();
		DefeatMusic.load();
		World.enemies = [];
		World.portals = [];
		setTimeout(function() {
			alert("Game Over!");
			AR.context.destroyAll();
		}, 2000);
	}
};

Enemy.prototype.dropItem = function(enemy) {
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
	var itemInfo = {
		"latitude": enemy.enemyInfo.latitude,
		"longitude": enemy.enemyInfo.longitude,
		"altitude": enemy.enemyInfo.altitude,
		"itemType": itemType
	};
	item = new Item(itemInfo);
};
