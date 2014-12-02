// This class variable initializes the main game music.
var GameMusic = new AR.Sound("assets/gameMusic.mp3", {
	
	// Play the music once it's loaded or return an error
	onLoaded : function(){
		GameMusic.play();
		console.assert(!(GameMusic.state == AR.CONST.STATE.PLAYING), "Music is playing.");
	},
	onError : function(){
		alert("Music could not be loaded!");
	},
	
	// Once the track finishes, load it up and repeat it indefinitely
	onFinishedPlaying : function(){
		GameMusic.load();
	},
});

// This class variable initializes the victory music.
var VictoryMusic = new AR.Sound("assets/victory.mp3", {
	// Play the music once it's loaded or return an error
	onLoaded : function(){
		VictoryMusic.play();
		console.assert(!(VictoryMusic.state == AR.CONST.STATE.PLAYING), "Music is playing.");
	},
	onError : function(){
		alert("Music could not be loaded!");
	},
});

//This class variable initializes the defeat music.
var DefeatMusic = new AR.Sound("assets/defeat.mp3", {
	// Play the music once it's loaded or return an error
	onLoaded : function(){
		DefeatMusic.play();
		console.assert(!(DefeatMusic.state == AR.CONST.STATE.PLAYING), "Music is playing.");
	},
	onError : function(){
		alert("Music could not be loaded!");
	},
});
