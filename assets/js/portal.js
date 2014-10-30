function Portal(portalInfo) {
	this.portalInfo = portalInfo;
	this.health = 10;
	this.spawnSpeed = 10;
	this.workingGenerators = 3;
	
	this.portalLocation = new AR.GeoLocation(portalInfo.latitude, portalInfo.longitude, portalInfo.altitude);
	
	this.portalDrawable = new AR.ImageDrawable(World.portalDrawableIdle, 3, {
		zOrder: 0,
		opacity: 1.0,
	});
	
	this.portalObject = new AR.GeoObject(this.portalLocation, {
		drawables: {
			cam: this.portalDrawable,
		}
	});
	return this;
};