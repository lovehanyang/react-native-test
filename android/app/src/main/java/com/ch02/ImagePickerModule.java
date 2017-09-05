package com.ch02;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Environment;
import android.provider.MediaStore;
import android.text.TextUtils;
import android.widget.ArrayAdapter;
import android.widget.Switch;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Created by hanyang on 2017/9/4 0004.
 */

public class ImagePickerModule extends ReactContextBaseJavaModule implements ActivityEventListener {

    /**
     * 打开图库的reqcode
     */
    final int SELECT_IMG_REQ_CODE = 110;
    static final int REQUEST_LAUNCH_IMAGE_CAPTURE = 13001;

    private ReactApplicationContext mReactContext;
    private Callback mCallback;
    private WritableMap mResponse;

    Uri outputUri;

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

    @ReactMethod
    public void launchCamera(ReadableMap options, Callback callback) {
        if (!isCameraAvailable())
            return;

        mCallback = callback;
        mResponse = Arguments.createMap();

        Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        Activity currentActivity = getCurrentActivity();

        outputUri = Uri.fromFile(createNewFile());
        intent.putExtra(MediaStore.EXTRA_OUTPUT, outputUri);


        if (currentActivity != null) {
            currentActivity.startActivityForResult(intent, REQUEST_LAUNCH_IMAGE_CAPTURE);
        } else {
            if (mCallback != null) {
                mResponse.putString("error", "打不开相机啦啦啦啦");
                mCallback.invoke(mResponse);
                mCallback = null;
            }
        }


    }


    @ReactMethod
    public void launchImageLibrary(final ReadableMap options, final Callback callback) {

        Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) {
            return;
        }

        AlertDialog.Builder builder = new AlertDialog.Builder(currentActivity);
        builder.setTitle("lovehanyang的相片库");

        final List<String> titles = new ArrayList<>();
        titles.add("相册");
        titles.add("拍照");
        titles.add("取消");

        ArrayAdapter<String> adapter = new ArrayAdapter<String>(currentActivity, android.R.layout.select_dialog_item, titles);

        builder.setAdapter(adapter, new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                mResponse = Arguments.createMap();
                switch (titles.get(which)) {
                    case "相册":
                        launchImagePicker(options,callback);
                        break;
                    case "拍照":
                        launchCamera(options,callback);
                        break;
                    case "取消":
                        mResponse.putBoolean("didCancel", true);
                        callback.invoke(mResponse);
                        break;
                    default:
                        break;
                }

            }
        });

        AlertDialog dialog = builder.create();

        dialog.setOnCancelListener(new DialogInterface.OnCancelListener() {
            @Override
            public void onCancel(DialogInterface dialog) {
                mResponse = Arguments.createMap();
                dialog.dismiss();
                mResponse.putBoolean("didCancel", true);
                callback.invoke(mResponse);
            }
        });

        // 显示AlertDialog
        dialog.show();

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


        Uri uri;
        switch (requestCode) {
            //图库
            case SELECT_IMG_REQ_CODE:
                uri = data.getData();
                break;
            //拍照
            case REQUEST_LAUNCH_IMAGE_CAPTURE:
                uri = outputUri;
                break;
            default:
                uri = null;
        }


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


    //判断相机是否可用
    private boolean isCameraAvailable() {
        return mReactContext.getPackageManager().hasSystemFeature(PackageManager.FEATURE_CAMERA)
                || mReactContext.getPackageManager().hasSystemFeature(PackageManager.FEATURE_CAMERA_ANY);
    }


    private File createNewFile() {
        String fileName = "image-" + UUID.randomUUID().toString() + ".jpg";
        File path = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES);
        File f = new File(path, fileName);


        try {
            path.mkdir();
            f.createNewFile();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return f;

    }
}
