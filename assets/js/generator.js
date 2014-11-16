function Generator(generatorInfo) {
	this.generatorInfo = generatorInfo;
	this.health = 30;
	this.status = "alive";
	this.portalID = generatorInfo.portalID;
	
	this.generatorLocation = new AR.GeoLocation(generatorInfo.latitude, generatorInfo.longitude, generatorInfo.altitude);
	
	this.generatorDrawable = new AR.AnimatedImageDrawable(World.generatorDrawableAlive, 2, 58, 56, {
		zOrder: 0,
		opacity: 1.0,
		onClick: Player.prototype.destroy(this)
	});
	
	this.generatorDrawable.animate = ([0, 1], 150, -1);
	
	this.generatorObject = new AR.GeoObject(this.generatorLocation, {
		drawables: {
			cam: this.generatorDrawable,
		}
	});
	return this;
};

Generator.prototype.destroy = function(generator) {
	generator.status = "destroyed";
	generator.generatorDrawable
	World.portals[generator.portalID - 1].generators = World.portals[generator.portalID - 1].generators - 1;
	generator.generatorDrawable.imageResource = World.generatorDrawableDestroyed;
	setTimeout(function() {
		generator.generatorObject.enabled = false;
	}, 1000);
	World.portals[generator.portalID - 1].destroy(World.portals[generator.portalID - 1]);
};