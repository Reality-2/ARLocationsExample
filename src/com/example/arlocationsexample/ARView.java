package com.example.arlocationsexample;

import com.wikitude.architect.ArchitectView.ArchitectUrlListener;
import com.wikitude.architect.ArchitectView.SensorAccuracyChangeListener;
import com.example.arlocationsexample.R;
import com.example.arlocationsexample.ArchitectViewHolderInterface;
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
		// TODO Auto-generated method stub
		return null;
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
