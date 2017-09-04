package com.ch02;

import android.app.Activity;
import android.content.Intent;
import android.database.Cursor;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.provider.MediaStore;
import android.text.TextUtils;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;

/**
 * Created by hanyang on 2017/9/4 0004.
 */

public class ImagePickerModule extends ReactContextBaseJavaModule implements ActivityEventListener {

    /**
     * 打开图库的reqcode
     */
    int SELECT_IMG_REQ_CODE = 110;

    private ReactApplicationContext mReactContext;
    private Callback mCallback;
    private WritableMap mResponse;


    public ImagePickerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mReactContext = reactContext;
        mReactContext.addActivityEventListener(this);
    }

    @Override
    public String getName() {
        return "ImagePicker";
    }

    @ReactMethod
    public void launchImagePicker(ReadableMap options, Callback callback) {
        mCallback = callback;
        mResponse = Arguments.createMap();
        try {
            Intent libraryIntent = new Intent(Intent.ACTION_PICK,
                    MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
            Activity currentActivity = getCurrentActivity();
            if (currentActivity != null) {
                currentActivity.startActivityForResult(libraryIntent, SELECT_IMG_REQ_CODE);
            }
        } catch (Exception e) {
            e.printStackTrace();
            if (mCallback != null) {
                mResponse.putString("error", "打开失败");
                mCallback.invoke(mResponse);
                mCallback = null;
            }
        }
    }


    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        mResponse = Arguments.createMap();
        //用户取消
        if (resultCode != Activity.RESULT_OK) {
            mResponse.putBoolean("didCancel", true);
            mCallback.invoke(mResponse);
            mCallback = null;
            return;
        }

        Uri uri = data.getData();
        String realPath = getRealPathFromURI(uri);
        if (!TextUtils.isEmpty(realPath)) {
            //解码图片
            BitmapFactory.Options options = new BitmapFactory.Options();
            options.inJustDecodeBounds = true;
            BitmapFactory.decodeFile(realPath, options);
            // 回调函数
            mResponse.putString("uri", uri.toString());
            mResponse.putString("path", realPath);
            mCallback.invoke(mResponse);
            mCallback = null;

        } else {
            if (mCallback != null) {
                mResponse.putString("error", "Cannot launch photo library");
                mCallback.invoke(mResponse);
                mCallback = null;
            }
        }


    }

    private String getRealPathFromURI(Uri uri) {
        String result;
        String[] projection = {MediaStore.Audio.Media.DATA};
        if (uri == null || TextUtils.isEmpty(uri.toString())) {
            return "";
        }

        Cursor cursor = mReactContext.getContentResolver().query(uri, projection, null, null, null);
        if (cursor == null) {
            result = uri.getPath();
        } else {
            cursor.moveToFirst();
            result = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA));
            cursor.close();
        }
        return result;


    }

    @Override
    public void onNewIntent(Intent intent) {

    }
}
