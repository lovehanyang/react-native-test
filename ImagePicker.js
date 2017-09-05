/**
 * Created by hanyang on 2017/9/3.
 */


import React from "react";
import {
    Alert,
    Image,
    NativeModules,
    PermissionsAndroid,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
export default class ImagePicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {avatarSource: null}
    }

    render() {
        return (

            <View style={styles.container}>
                <TouchableOpacity onPress={this._selectPhotoTapped}>
                    <View style={[styles.avatarContainer, styles.avatar]}>
                        {this.state.avatarSource === null ?
                            <Text style={styles.text}>选择图片</Text>
                            : <Image style={styles.avatar} source={this.state.avatarSource}/>
                        }


                    </View>
                </TouchableOpacity>


            </View>
        );
    }

    _selectPhotoTapped = async () => {

        let granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: '权限申请',
                message: 'lovehanyang申请摄像头权限'
            });
        this.setState({hasPermission: granted})

        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500
        }

        if (granted) {
            // NativeModules.ImagePicker.launchImagePicker(options,
            // NativeModules.ImagePicker.launchCamera(options,
            NativeModules.ImagePicker.launchImageLibrary(options,
                (response) => {
                    if (response.didCancel) {
                        console.log("用户取消选择")
                    } else if (response.error) {
                        console.log("选择图片错误", response.error)
                    } else {
                        let source;
                        if (Platform.OS === 'ios') {
                            source = {
                                uri: response.uri.replace('file://', '')
                            }
                        } else if (Platform.OS === 'android') {
                            source = {
                                uri: response.uri
                            }
                            console.log("hahah")
                        }
                        console.log("123456")
                        this.setState({avatarSource: source})
                    }

                })
        } else {
            Alert.alert("你丫的没有权限", null, null);
        }


    }


}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        flexDirection: 'row'
    },
    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'lightgray',
        borderWidth: 2
    },
    avatar: {
        width: 200,
        height: 200,
        borderRadius: 100
    },
    text: {
        fontSize: 30
    }
});