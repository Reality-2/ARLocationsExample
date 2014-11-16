function Item(itemInfo) {
	this.itemInfo = itemInfo;
	this.itemType = null;
	this.itemImage = null;
	
	if (this.itemInfo.itemType == "health") {
		this.itemType = "health";
		this.itemImage = new AR.ImageResource("assets/health.png");
	} else if (this.itemInfo.itemType == "armor") {
		this.itemType = "armor";
		this.itemImage = new AR.ImageResource("assets/armor.png");
	} else {
		this.itemType = "ammo";
		this.itemImage = new AR.ImageResource("assets/ammo.png");
	}
	
	this.itemLocation = new AR.GeoLocation(itemInfo.latitude, itemInfo.longitude, itemInfo.altitude);
	
	this.itemDrawable = new AR.ImageDrawable(this.itemImage, 0.5, {
		zOrder: 1,
		opacity: 1.0,
	});
	
	this.itemObject = new AR.GeoObject(this.itemLocation, {
		drawables: {
			cam: this.itemDrawable,
		},
	});
	
	this.itemObject.options = {onClick: Player.prototype.pickup(this) }
	
	return this;
};

