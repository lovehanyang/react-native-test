package com.ch02;

import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.os.Build;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by hanyang on 2017/9/3.
 */

public class DeviceInfoModule extends ReactContextBaseJavaModule {
    private ReactApplicationContext mReactContext;

    public DeviceInfoModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mReactContext = reactContext;
    }

    @Override
    public String getName() {
        return "MyDeviceInfo";
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        Map<String, Object> constants = new HashMap<>();
        constants.put("systemName", "Android");
        constants.put("systemVersion", Build.VERSION.RELEASE);
        constants.put("defaultLanguage", getCurrentLanguage());
        constants.put("appVersion", getAppVersion());


        return constants;
    }

    private String getAppVersion() {
        String version = "";

        PackageManager packageManager = this.mReactContext.getPackageManager();
        String packageName = this.mReactContext.getPackageName();
        try {
            PackageInfo info = packageManager.getPackageInfo(packageName, 0);
            return info.versionName;
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        }
        return null;
    }

    private String getCurrentLanguage() {

        Locale current = getReactApplicationContext().getResources()
                .getConfiguration().locale;

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            return current.toLanguageTag();
        } else {
            StringBuilder builder = new StringBuilder();
            builder.append(current.getLanguage());
            if (current.getCountry() != null) {
                builder.append("-");
                builder.append(current.getCountry());
            }
            return builder.toString();
        }

    }
}
