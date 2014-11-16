var GameMusic = new AR.Sound("assets/gameMusic.mp3", {
	onLoaded : function(){
		GameMusic.play();
	},
	onError : function(){
		alert("Music could not be loaded!");
	},
	onFinishedPlaying : function(){
		GameMusic.load();
	},
});

var VictoryMusic = new AR.Sound("assets/victory.mp3", {
	onLoaded : function(){
		VictoryMusic.play();
	},
	onError : function(){
		alert("Music could not be loaded!");
	},
});

var DefeatMusic = new AR.Sound("assets/defeat.mp3", {
	onLoaded : function(){
		DefeatMusic.play();
	},
	onError : function(){
		alert("Music could not be loaded!");
	},
});
