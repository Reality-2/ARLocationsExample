// This class creates a new item object in the world and spawns it at the location
// of a recently killed enemy. The item type is determined randomly when the enemy is killed. 
// The item is automatically applied to the player's stats.
function Item(itemInfo) {
	
	// Initialize the item's variables
	this.itemInfo = itemInfo;
	this.itemType = null;
	this.itemImage = null;
	
	// Initialize the drawable for the item based on its type
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
	
	// Initialize the location of the item
	this.itemLocation = new AR.GeoLocation(itemInfo.latitude, itemInfo.longitude, itemInfo.altitude);
	
	// Initialize the drawable of the item
	this.itemDrawable = new AR.ImageDrawable(this.itemImage, 0.5, {
		zOrder: 1,
		opacity: 1.0,
	});
	
	// Initialize and render the item object at the location of the enemy that dropped it
	this.itemObject = new AR.GeoObject(this.itemLocation, {
		drawables: {
			cam: this.itemDrawable,
		},
	});
	
	// Call the method that applies the item to the player's stats
	this.itemObject.options = {onClick: Player.prototype.pickup(this) }
	
	return this;
};

