// implementation of AR-Experience (aka "World")
var World = {
		
	// true once data was fetched
	initiallyLoadedData: false,

	// different POI-Marker assets
	enemyDrawableIdle: null,
	enemyDrawableDead: null,

	// list of AR.GeoObjects that are currently shown in the scene / World
	enemies: [],

	// called to inject new POI data
	loadPoisFromJsonData: function loadPoisFromJsonDataFn(enemyData) {

		// empty list of visible enemies
		World.enemies = [];

		// start loading marker assets
		World.enemyDrawableIdle = new AR.ImageResource("assets/imp.png");
		World.enemyDrawableDead = new AR.ImageResource("assets/deadImp.png");
		
		// loop through POI-information and create an AR.GeoObject (=Marker) per POI
		for (var currentPlaceNr = 0; currentPlaceNr < enemyData.length; currentPlaceNr++) {
			var singleEnemy = {
				"id": enemyData[currentPlaceNr].id,
				"latitude": parseFloat(enemyData[currentPlaceNr].latitude),
				"longitude": parseFloat(enemyData[currentPlaceNr].longitude),
				"altitude": parseFloat(enemyData[currentPlaceNr].altitude)
			};
			World.enemies.push(new Enemy(singleEnemy));
		}
	},

	// location updates, fired every time you call architectView.setLocation() in native environment
	locationChanged: function locationChangedFn(lat, lon, alt, acc) {

		// request data if not already present
		if (!World.initiallyLoadedData) {
			World.requestDataFromLocal(lat, lon);
			World.initiallyLoadedData = true;
		}
	},
	
	// request POI data
	requestDataFromLocal: function requestDataFromLocalFn(centerPointLatitude, centerPointLongitude) {
		var enemiesToCreate = 1;
		var enemyData = [];

		for (var i = 0; i < enemiesToCreate; i++) {
			enemyData.push({
				"id": (i + 1),
				"longitude": (centerPointLongitude + (Math.random() / 200 - 0.0025)),
				"latitude": (centerPointLatitude + (Math.random() / 200 - 0.0025)),
				"altitude": "100.0"
			});
		}
		World.loadPoisFromJsonData(enemyData);
	}

};


/* forward locationChanges to custom function */
AR.context.onLocationChanged = World.locationChanged;

/* forward clicks in empty area to World */
AR.context.onScreenClick = World.onScreenClick;