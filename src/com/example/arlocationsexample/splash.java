package com.example.arlocationsexample;

import android.app.Activity;
import android.content.Intent;
import android.media.MediaPlayer;
import android.os.Bundle;

public class splash extends Activity{
	
	MediaPlayer player;
	public void onCreate(Bundle b){
		super.onCreate(b);
		setContentView(R.layout.splash);
        Thread mainTread = new Thread(){
        	public void run(){
        		try{
        			sleep(8500);
        		}catch(InterruptedException e){
        			e.printStackTrace();
        		}finally{
        			Intent openmain = new Intent("com.example.arlocationsexample.ARVIEW");
        			assert(openmain != null) : "openmain has not been instantiated correctly the thread will fail";
        			startActivity(openmain);
        		}
        	}
        };
        
        mainTread.start();
	}
	
    public void onPause(){
    	super.onPause();
    	finish();
    }
}
