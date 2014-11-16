function Portal(portalInfo) {
	this.portalInfo = portalInfo;
	this.portalID = portalInfo.id;
	this.status = "open";
	this.generators = 3;
	
	this.portalLocation = new AR.GeoLocation(portalInfo.latitude, portalInfo.longitude, portalInfo.altitude);
	
	this.portalDrawable = new AR.AnimatedImageDrawable(World.portalDrawableIdle, 4, 42, 45, {
		zOrder: 1,
		opacity: 1.0,
	});
	
	this.portalDrawable.animate([0, 1, 2, 3, 4], 150, -1);
	
	this.portalObject = new AR.GeoObject(this.portalLocation, {
		drawables: {
			cam: this.portalDrawable,
		}
	});
	
	return this;
};

Portal.prototype.destroy = function(portal) {
	if (portal.generators == 0) {
		GameMusic.stop();
		VictoryMusic.load();
		portal.status = "closed";
		portal.portalObject.enabled = false;
	}
};

Portal.prototype.spawnGenerators = function(portal) {
	var numGeneratorsPerPortal = 3;
	for (var i = 0; i < numGeneratorsPerPortal; i++) {
		var singleGenerator = {
				"id": i,
				"latitude": parseFloat(portal.portalLocation.latitude + (Math.random() / 400 - 0.0025)),
				"longitude": parseFloat(portal.portalLocation.longitude + (Math.random() / 400 - 0.0025)),
				"altitude": parseFloat(portal.portalLocation.altitude),
				"portalID": portal.portalID,
		};
		new Generator(singleGenerator);
	}
};