package com.ch02;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by hanyang on 2017/9/5 0005.
 */

public class CommunicationModule extends ReactContextBaseJavaModule {

    private ReactApplicationContext mReactContext;

    public CommunicationModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
    }

    @Override
    public String getName() {
        return "Communication";
    }

    @ReactMethod
    public void startActivityFromReactNative(String activityName, String params) {

        Activity currentActivity = getCurrentActivity();
        if (currentActivity != null){
            try {
                Class toActivity = Class.forName(activityName);
                Intent intent = new Intent(currentActivity, toActivity);
                intent.putExtra("params", params);
                currentActivity.startActivity(intent);
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            }
        }
    }
}
