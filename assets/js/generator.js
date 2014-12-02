// This class creates a new generator object in the world and spawns it at a random location
// around the vicinity of a portal. The generators are static and can be destroyed by the player. 
function Generator(generatorInfo) {
	
	// Initialize the generator variables
	this.generatorInfo = generatorInfo;
	this.health = 30;
	this.status = "alive";
	this.portalID = generatorInfo.portalID;
	
	// Initialize the generator's location
	this.generatorLocation = new AR.GeoLocation(generatorInfo.latitude, generatorInfo.longitude, generatorInfo.altitude);
	
	// Initialize the generator's drawable
	this.generatorDrawable = new AR.AnimatedImageDrawable(World.generatorDrawableAlive, 2, 58, 56, {
		zOrder: 0,
		opacity: 1.0,
		onClick: Player.prototype.destroy(this)
	});
	
	// Initialize the generator animation
	this.generatorDrawable.animate = ([0, 1], 150, -1);
	
	// Initialize and render the generator object in the world
	this.generatorObject = new AR.GeoObject(this.generatorLocation, {
		drawables: {
			cam: this.generatorDrawable,
		}
	});
	return this;
};

// This method is responsible for the destruction of the generator by the player.
Generator.prototype.destroy = function(generator) {
	
	// Set the status of the generator to destroyed and decremenet the number of generators in the world
	generator.status = "destroyed";
	World.portals[generator.portalID - 1].generators = World.portals[generator.portalID - 1].generators - 1;
	generator.generatorDrawable.imageResource = World.generatorDrawableDestroyed;
	setTimeout(function() {
		generator.generatorObject.enabled = false;
	}, 1000);
	World.portals[generator.portalID - 1].destroy(World.portals[generator.portalID - 1]);
};