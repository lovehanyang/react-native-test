package com.ch02;

import com.facebook.react.bridge.BaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by hanyang on 2017/9/2.
 */

public class PlatformModule extends ReactContextBaseJavaModule {
    private ReactApplicationContext mReactContext;

    public PlatformModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mReactContext = reactContext;

    }

    @Override
    public String getName() {
        return "Platforms";
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        HashMap<String, Object> constants = new HashMap<>();
        constants.put("systemName", "android");

        return constants;
    }
}
