package com.example.arlocationsexample;

import java.net.URI;
import java.util.List;

import org.apache.http.NameValuePair;
import org.apache.http.client.utils.URLEncodedUtils;

import com.wikitude.architect.ArchitectView.ArchitectUrlListener;
import com.wikitude.architect.ArchitectView.SensorAccuracyChangeListener;
import com.example.arlocationsexample.R;
import com.example.arlocationsexample.ArchitectViewHolderInterface;

import android.content.SharedPreferences;
import android.location.LocationListener;

public class ARView extends AbstractArchitectCamActivity {

	@Override
	public float getInitialCullingDistanceMeters() {
		return ArchitectViewHolderInterface.CULLING_DISTANCE_DEFAULT_METERS;
	}

	@Override
	public String getARchitectWorldPath() {
		return "index.html";
	}

	@Override
	public int getContentViewId() {
		return R.layout.activity_arview;
	}

	@Override
	public int getArchitectViewId() {
		return R.id.architectView;
	}

	@Override
	public ILocationProvider getLocationProvider(LocationListener locationListener) {
		return new LocationProvider(this, locationListener);
	}

	@Override
	public ArchitectUrlListener getUrlListener() {
		return new ArchitectUrlListener() {

			@Override
			public boolean urlWasInvoked(String url) {
				//parsing the retrieved url string
				List<NameValuePair> queryParams = URLEncodedUtils.parse(URI.create(url), "UTF-8");

				String levelStr = "";
				String healthStr = "";
				String armorStr = "";
				String ammoStr = "";
				// getting the values of the contained GET-parameters
				for(NameValuePair pair : queryParams)
				{
					if(pair.getName().equals("level"))
					{
						levelStr = pair.getValue();
					}
					if(pair.getName().equals("health"))
					{
						healthStr = pair.getValue();
					}
					if(pair.getName().equals("armor"))
					{
						armorStr = pair.getValue();
					}
					if(pair.getName().equals("ammo"))
					{
						ammoStr = pair.getValue();
					}
					
				}//end for
				
				System.out.println("levelStr = "+levelStr+" |||| healthStr = "+healthStr+" |||| armorStr = "+armorStr+" |||| ammoStr = "+ammoStr);
				
				//turns strings to ints
				int level = Integer.parseInt(levelStr);
				int health = Integer.parseInt(healthStr);
				int armor = Integer.parseInt(armorStr);
				int ammo = Integer.parseInt(ammoStr);
				
				//store new values in prefs
				SharedPreferences userData = getPreferences(0);
				SharedPreferences.Editor editor = userData.edit();
				editor.putInt("level", level);
				editor.putInt("health", health);
				editor.putInt("armor", armor);
				editor.putInt("ammo", ammo);
				editor.commit();

				//run method with parameters
				return true;
			}//end urlWasInvoked
		};
	}

	@Override
	public String getWikitudeSDKLicenseKey() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public SensorAccuracyChangeListener getSensorAccuracyListener() {
		// TODO Auto-generated method stub
		return null;
	}
}
