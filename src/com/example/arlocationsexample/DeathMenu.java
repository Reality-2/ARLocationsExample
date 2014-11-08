package com.example.arlocationsexample;

import android.app.Activity;
import android.content.Intent;
import android.media.MediaPlayer;
import android.os.Bundle;

public class DeathMenu extends Activity{

	public void onCreate(Bundle b){
		super.onCreate(b);
		setContentView(R.layout.deathmenu);
        Thread mainTread = new Thread(){
        	public void run(){
        		try{
        			sleep(8500);
        		}catch(InterruptedException e){
        			e.printStackTrace();
        		}finally{
        			Intent restart = new Intent("com.example.arlocationsexample.ARVIEW");
        			assert(restart != null) : "openmain has not been instantiated correctly the thread will fail";
        			startActivity(restart);
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
