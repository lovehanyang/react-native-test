/**
 * Created by hanyang on 2017/9/5 0005.
 */

import React from "react";
import {Alert, Button, View,Platform,StyleSheet,NativeModules} from "react-native";

export default class Communication extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Button title={'调用原生组件'} onPress={() => {
                    Alert.alert('调用原生组件', null, null)
                    if(Platform.OS === 'ios'){

                    }else if(Platform.OS === 'android'){
                     NativeModules.Communication.startActivityFromReactNative('com.ch02.CommunicationActivity',"I love hanyang")
                    }

                }}/>

            </View>

        )
    }

}
const styles = StyleSheet.create(
    {
        container: {
            alignSelf: 'center',
            flexDirection: 'row'
        }
    }
);