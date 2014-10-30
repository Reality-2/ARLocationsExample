// implementation of AR-Experience (aka "World")
var World = {
		
	// true once data was fetched
	initiallyLoadedData: false,

	// different POI-Marker assets
	enemyDrawableIdle: null,
	enemyDrawableDead: null,
	
	// portal POI-Marker assets
	portalDrawableIdle: null,

	// list of AR.GeoObjects that are currently shown in the scene / World
	enemies: [],
	portals: [],

	// called to inject new POI data
	loadPortalsFromJsonData: function loadPortalsFromJsonDataFn(portalData) {

		// empty list of visible enemies
		World.portals = [];

		// start loading marker assets
		World.portalDrawableIdle = new AR.ImageResource("assets/space_time_portal.png");
		
		// loop through POI-information and create an AR.GeoObject (=Marker) per POI
		for (var currentPlaceNr = 0; currentPlaceNr < portalData.length; currentPlaceNr++) {
			var singlePortal = {
				"id": portalData[currentPlaceNr].id,
				"latitude": parseFloat(portalData[currentPlaceNr].latitude),
				"longitude": parseFloat(portalData[currentPlaceNr].longitude),
				"altitude": parseFloat(portalData[currentPlaceNr].altitude)
			};
			World.portals.push(new Portal(singlePortal));
		}
		World.loadEnemiesFromPortalData(portalData);
	},
	
	loadEnemiesFromPortalData: function loadEnemiesFromPortalData(portalData) {
		World.enemies = [];
	
		World.enemyDrawableIdle = new AR.ImageResource("assets/imp.png");
		World.enemyDrawableDead = new AR.ImageResource("assets/deadImp.png");
		
		// Every 5 seconds, spawn a new enemy at the portal location.
		var spawnTimer = setInterval(function () {spawn()}, 5000);
		
		function spawn() {
			for (var currentPlaceNr = 0; currentPlaceNr < portalData.length; currentPlaceNr++) {
				var singleEnemy = {
						"id": World.enemies.length + 1,
						"latitude": parseFloat(portalData[currentPlaceNr].latitude + (Math.random() / 200 - 0.0025)),
						"longitude": parseFloat(portalData[currentPlaceNr].longitude + (Math.random() / 200 - 0.0025)),
						"altitude": parseFloat(portalData[currentPlaceNr].altitude),
				};
				World.enemies.push(new Enemy(singleEnemy));
			}
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
		var portalsToCreate = 1;
		var portalData = [];
		
		for (var i = 0; i < portalsToCreate; i++) {
			portalData.push({
				"id": (i + 1),
				"longitude": (centerPointLongitude + (Math.random() / 200 - 0.0025)),
				"latitude": (centerPointLatitude + (Math.random() / 200 - 0.0025)),
				"altitude": "100.0"
			});
		}
		World.loadPortalsFromJsonData(portalData);
	},
};

/* forward locationChanges to custom function */
AR.context.onLocationChanged = World.locationChanged;