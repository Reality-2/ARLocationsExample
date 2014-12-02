// This class creates a new portal object in the world and spawns it at a random location
// around the player. The portals are static and can be destroyed when the player destroys all three 
// generators that are spawned around the portal.
function Portal(portalInfo) {
	
	// Initialize the object variables
	this.portalInfo = portalInfo;
	this.portalID = portalInfo.id;
	this.status = "open";
	this.generators = 3;
	
	// Initialize the portal's location
	this.portalLocation = new AR.GeoLocation(portalInfo.latitude, portalInfo.longitude, portalInfo.altitude);
	
	// Initialize the portal's drawable
	this.portalDrawable = new AR.AnimatedImageDrawable(World.portalDrawableIdle, 4, 42, 45, {
		zOrder: 1,
		opacity: 1.0,
	});
	
	// Animate the portal's drawable
	this.portalDrawable.animate([0, 1, 2, 3, 4], 150, -1);
	
	// Initialize and render the portal object
	this.portalObject = new AR.GeoObject(this.portalLocation, {
		drawables: {
			cam: this.portalDrawable,
		}
	});
	
	return this;
};

// This method checks to see if all three portals have been
// destroyed and causes the player to win the level.
Portal.prototype.destroy = function(portal) {
	// If the number of generators in the world is 0
	if (portal.generators == 0) {
		// Load the victory music and destroy the portal object
		GameMusic.stop();
		VictoryMusic.load();
		portal.status = "closed";
		portal.portalObject.enabled = false;
		// document.location = "architectsdk://runMethod?level="+(World.player.level + 1);
	}
};

// This method spawns three generators around the portal when it is
// created.
Portal.prototype.spawnGenerators = function(portal) {
	var numGeneratorsPerPortal = 3;
	
	// For each of the generators, initialize a random location and create
	// a new generator object.
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