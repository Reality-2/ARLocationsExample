var GruntSound = new AR.Sound("assets/grunt.wav", {
	onLoaded : function(){
		GruntSound.play();
	},
	onError : function(){
		alert("Sound could not be loaded!");
	},
});

var ShotgunShotSound = new AR.Sound("assets/shotgunShot.mp3", {
	onLoaded : function(){
		ShotgunShotSound.play();
	},
	onError : function(){
		alert("Sound could not be loaded!");
	},
});

