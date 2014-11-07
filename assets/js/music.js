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