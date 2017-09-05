package com.ch02;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.widget.Toast;

/**
 * Created by hanyang on 2017/9/5 0005.
 */

public class CommunicationActivity extends Activity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.communication_activity1);

        Intent intent = getIntent();
        if (intent != null){
            String params = intent.getStringExtra("params");
            if (params != null) {
                Toast.makeText(this, "从React Native传来的数据是: " + params, Toast.LENGTH_SHORT).show();
            }
        }
        }

    }

