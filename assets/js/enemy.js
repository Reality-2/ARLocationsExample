function Enemy(enemyInfo) {
	this.enemyInfo = enemyInfo;
	this.health = 10;
	this.armor = 10;
	this.speed = 10;
	this.attack = 10;
	
	var enemyLocation = new AR.GeoLocation(enemyInfo.latitude, enemyInfo.longitude, enemyInfo.altitude);
	
	// create an AR.Label for the marker's description
    this.statsLabel = new AR.Label(this.health.toString(), 0.8, {
        zOrder: 2,
        style: {
            textColor: '#FFFFFF'
        }
    });
	
	this.enemyDrawableIdle = new AR.ImageDrawable(World.enemyDrawableIdle, 2, {
		zOrder: 1,
		opacity: 1.0,
	});
	
	this.enemyDrawableDead = new AR.ImageDrawable(World.enemyDrawableDead, 2, {
		zOrder: 1,
		opacity: 0.0,
	});
	
	this.enemyObject = new AR.GeoObject(enemyLocation, {
		drawables: {
			cam: [this.enemyDrawableIdle, this.enemyDrawableDead, this.statsLabel]
		}
	});
	
	return this;
}