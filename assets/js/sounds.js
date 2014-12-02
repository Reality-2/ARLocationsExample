// This class variable initializes the player's damage sound.
var GruntSound = new AR.Sound("assets/grunt.wav", {
	onLoaded : function(){
		GruntSound.play();
	},
	onError : function(){
		alert("Sound could not be loaded!");
	},
});

//This class variable initializes the enemy's damage sound.
var ImpGruntSound = new AR.Sound("assets/impGrunt.wav", {
	onLoaded : function(){
		ImpGruntSound.play();
	},
	onError : function(){
		alert("Sound could not be loaded!");
	},
});

//This class variable initializes the enemy's death sound.
var ImpDeathSound = new AR.Sound("assets/impDeath.wav", {
	onLoaded : function(){
		ImpDeathSound.play();
	},
	onError : function(){
		alert("Sound could not be loaded!");
	},
});

//This class variable initializes the player's shotgun firing sound.
var ShotgunShotSound = new AR.Sound("assets/shotgunShot.mp3", {
	onLoaded : function(){
		ShotgunShotSound.play();
	},
	onError : function(){
		alert("Sound could not be loaded!");
	},
});

//This class variable initializes the player's armor being hit sound.
var ArmorHitSound = new AR.Sound("assets/armorHit.wav", {
	onLoaded : function(){
		ArmorHitSound.play();
	},
	onError : function(){
		alert("Sound could not be loaded!");
	},
});

