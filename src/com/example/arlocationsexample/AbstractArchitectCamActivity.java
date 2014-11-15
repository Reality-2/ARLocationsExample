package com.example.arlocationsexample;

import java.io.IOException;
import java.net.URI;
import java.util.List;

import org.apache.http.NameValuePair;
import org.apache.http.client.utils.URLEncodedUtils;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.SharedPreferences;
import android.content.pm.ApplicationInfo;
import android.location.Location;
import android.location.LocationListener;
import android.media.AudioManager;
import android.net.Uri;
import android.opengl.GLES20;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.webkit.WebView;
import android.widget.Toast;

import com.wikitude.architect.ArchitectView;
import com.wikitude.architect.ArchitectView.ArchitectConfig;
import com.wikitude.architect.ArchitectView.ArchitectUrlListener;
import com.wikitude.architect.ArchitectView.SensorAccuracyChangeListener;

/**
 * Abstract activity which handles live-cycle events.
 * Feel free to extend from this activity when setting up your own AR-Activity 
 *
 */
public abstract class AbstractArchitectCamActivity extends Activity implements ArchitectViewHolderInterface{

	protected ArchitectView	architectView;
	protected SensorAccuracyChangeListener sensorAccuracyListener;
	protected Location lastKnownLocaton;
	protected ILocationProvider locationProvider;
	protected LocationListener locationListener;
	protected ArchitectUrlListener 	urlListener;
	

	/** Called when the activity is first created. */
	@SuppressLint("NewApi")
	@Override
	public void onCreate( final Bundle savedInstanceState ) {
		super.onCreate( savedInstanceState );
		this.setVolumeControlStream( AudioManager.STREAM_MUSIC );
		this.setContentView( this.getContentViewId() );

		/*  
		 *	this enables remote debugging of a WebView on Android 4.4+ when debugging = true in AndroidManifest.xml
		 *	If you get a compile time error here, ensure to have SDK 19+ used in your ADT/Eclipse.
		 *	You may even delete this block in case you don't need remote debugging or don't have an Android 4.4+ device in place.
		 *	Details: https://developers.google.com/chrome-developer-tools/docs/remote-debugging
		 */
		if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
			if ( 0 != ( getApplicationInfo().flags &= ApplicationInfo.FLAG_DEBUGGABLE ) ) {
				WebView.setWebContentsDebuggingEnabled(true);
			}
		}

		/* set AR-view for life-cycle notifications etc. */
		this.architectView = (ArchitectView)this.findViewById( this.getArchitectViewId()  );
		assert(architectView != null) : "architectView has not been instantiated correctly the thread will fail";

		/* pass SDK key if you have one, this one is only valid for this package identifier and must not be used somewhere else */
		final ArchitectConfig config = new ArchitectConfig("3gh6KtE+yYTuFYHqPahcfrM8Zmu7xzhhvlCqSI+jP9tdwS6wW2OCm0IjEtQclIH/r9vd01Ph6N/Gw62dbUSfVv24gJvd4C3ctSEflNr96YxebSDXMGD706Pxm68tezMKwzP+/Sc9gXXrg3tvFF9R74zQRy747Tqm/7jAIe0W/f1TYWx0ZWRfXyKOPNMqt1eLCnqH9nbx4bhlrRH7tN4G/wXBGseaFOwS0NP54khxB61AeYxQf7OEkwXEG/tBmEPXTJJFskwej/TZNCperVmC+QVcgM1UQ9I9NJj9AaF8wSMy81/7CVFM6tDnGg02qyQC7Uu9tegitX6AMzt94GpWzbQuHvlezl88rr2hNI1QDxXKeA2uFOQYQk3iCaRXg7PjXxKZh+fJwv8ys6mkIE4ZSk4l+OoxK0tWGk0dfoLl+J5/b7jGqO82AmjqxW5cmf3TbcjwxDcoye2uGzFTsFXusJn2p3mSJ+lI0ndUyHbz1sdKLxyCAaNr4xv0SgV2QBV331aH+iGbdAO2avSZwzYEBTMXJ2Vh8E+l/Qq99LakC0L9GhbwKoFBpK6iy8w7VGu5OwH46x6DOr018+DOPoyqc/y8ASiVMep/ut7DqzXRCOYQ/3qZmITviRH5d9u3ovjEnmom9sjry2FPys5VOa/3hTr8x+rJ7zadILNSDavOyp4=");

		try {
			/* first mandatory life-cycle notification */
			this.architectView.onCreate(config);
		} catch (RuntimeException rex) {
			this.architectView = null;
			Toast.makeText(getApplicationContext(), "can't create Architect View", Toast.LENGTH_SHORT).show();
			Log.e(this.getClass().getName(), "Exception in ArchitectView.onCreate()", rex);
		}

		// set accuracy listener if implemented, you may e.g. show calibration prompt for compass using this listener
		this.sensorAccuracyListener = this.getSensorAccuracyListener();

		// set urlListener, any calls made in JS like "document.location = 'architectsdk://foo?bar=123'" is forwarded to this listener, use this to interact between JS and native Android activity/fragment
		this.urlListener = this.getUrlListener();  

		// register valid urlListener in architectView, ensure this is set before content is loaded to not miss any event
		if (this.urlListener != null && this.architectView != null) {
			this.architectView.registerUrlListener( this.getUrlListener() );
		}

		// listener passed over to locationProvider, any location update is handled here
		this.locationListener = new LocationListener() {

			@Override
			public void onStatusChanged( String provider, int status, Bundle extras ) {
			}

			@Override
			public void onProviderEnabled( String provider ) {
			}

			@Override
			public void onProviderDisabled( String provider ) {
			}

			@Override
			public void onLocationChanged( final Location location ) {
				// forward location updates fired by LocationProvider to architectView, you can set lat/lon from any location-strategy
				if (location!=null) {
					// sore last location as member, in case it is needed somewhere (in e.g. your adjusted project)
					AbstractArchitectCamActivity.this.lastKnownLocaton = location;
					if ( AbstractArchitectCamActivity.this.architectView != null ) {
						// check if location has altitude at certain accuracy level & call right architect method (the one with altitude information)
						if ( location.hasAltitude() && location.hasAccuracy() && location.getAccuracy()<7) {
							AbstractArchitectCamActivity.this.architectView.setLocation( location.getLatitude(), location.getLongitude(), location.getAltitude(), location.getAccuracy() );
						} else {
							AbstractArchitectCamActivity.this.architectView.setLocation( location.getLatitude(), location.getLongitude(), location.hasAccuracy() ? location.getAccuracy() : 1000 );
						}
					}
				}
			}
		};

		// locationProvider used to fetch user position
		this.locationProvider = getLocationProvider( this.locationListener );

	}//end onCreate

	@Override
	protected void onPostCreate( final Bundle savedInstanceState ) {
		super.onPostCreate( savedInstanceState );

		if ( this.architectView != null ) {

			// call mandatory live-cycle method of architectView
			this.architectView.onPostCreate();

			try {
				// load content via url in architectView, ensure '<script src="architect://architect.js"></script>' is part of this HTML file, have a look at wikitude.com's developer section for API references
				this.architectView.load( this.getARchitectWorldPath() );

				if (this.getInitialCullingDistanceMeters() != ArchitectViewHolderInterface.CULLING_DISTANCE_DEFAULT_METERS) {
					// set the culling distance - meaning: the maximum distance to render geo-content
					this.architectView.setCullingDistance( this.getInitialCullingDistanceMeters() );
				}

			} catch (IOException e1) {
				e1.printStackTrace();
			}
		}//end if
		
		
		
		//Get shared preferences info
		SharedPreferences userData = getPreferences(0);
		SharedPreferences.Editor editor = userData.edit();
		
		int level = userData.getInt("level", -1);
		if(level == -1){
			editor.putInt("level", 0);
			editor.commit();
			level = 0;
		}
		
		int health = userData.getInt("health", -1);
		if(health == -1){
			editor.putInt("health", 100);
			editor.commit();
			health = 100;
		}
		
		int armor = userData.getInt("armor", -1);
		if(armor == -1){
			editor.putInt("armor", 0);
			editor.commit();
			armor = 0;
		}
		
		int ammo = userData.getInt("ammo", -1);
		if(ammo == -1){
			editor.putInt("ammo", 0);
			editor.commit();
			ammo = 32;
		}

		
		//architectView.callJavascript("World.fromNative(5, 12);");
		architectView.callJavascript("World.fromNative("+level+", "+health+", "+armor+", "+ammo+");");
		
	}//end onPostCreate

	@Override
	protected void onResume() {
		super.onResume();

		// call mandatory live-cycle method of architectView
		if ( this.architectView != null ) {
			this.architectView.onResume();

			// register accuracy listener in architectView, if set
			if (this.sensorAccuracyListener!=null) {
				this.architectView.registerSensorAccuracyChangeListener( this.sensorAccuracyListener );
			}
		}

		// tell locationProvider to resume, usually location is then (again) fetched, so the GPS indicator appears in status bar
		if ( this.locationProvider != null ) {
			this.locationProvider.onResume();
		}
	}

	@Override
	protected void onPause() {
		super.onPause();

		// call mandatory live-cycle method of architectView
		if ( this.architectView != null ) {
			this.architectView.onPause();

			// unregister accuracy listener in architectView, if set
			if ( this.sensorAccuracyListener != null ) {
				this.architectView.unregisterSensorAccuracyChangeListener( this.sensorAccuracyListener );
			}
		}

		// tell locationProvider to pause, usually location is then no longer fetched, so the GPS indicator disappears in status bar
		if ( this.locationProvider != null ) {
			this.locationProvider.onPause();
		}
	}

	@Override
	protected void onStop() {
		super.onStop();
	}

	@Override
	protected void onDestroy() {
		super.onDestroy();

		// call mandatory live-cycle method of architectView
		if ( this.architectView != null ) {
			this.architectView.onDestroy();
		}
	}

	@Override
	public void onLowMemory() {
		super.onLowMemory();
		if ( this.architectView != null ) {
			this.architectView.onLowMemory();
		}
	}


	/**
	 * path to the architect-file (AR-Experience HTML) to launch
	 * @return
	 */
	@Override
	public abstract String getARchitectWorldPath();

	/**
	 * @return layout id of your layout.xml that holds an ARchitect View, e.g. R.layout.camview
	 */
	@Override
	public abstract int getContentViewId();

	/**
	 * @return layout-id of architectView, e.g. R.id.architectView
	 */
	@Override
	public abstract int getArchitectViewId();

	/**
	 * 
	 * @return Implementation of a Location
	 */
	@Override
	public abstract ILocationProvider getLocationProvider(final LocationListener locationListener);


	/**
	 * helper to check if video-drawables are supported by this device. recommended to check before launching ARchitect Worlds with videodrawables
	 * @return true if AR.VideoDrawables are supported, false if fallback rendering would apply (= show video fullscreen)
	 */
	public static final boolean isVideoDrawablesSupported() {
		String extensions = GLES20.glGetString( GLES20.GL_EXTENSIONS );
		return extensions != null && extensions.contains( "GL_OES_EGL_image_external" ) && android.os.Build.VERSION.SDK_INT >= 14 ;
	}

	

}