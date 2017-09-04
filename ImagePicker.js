/**
 * Created by hanyang on 2017/9/3.
 */


import React from "react";
import {Image, NativeModules, Platform,StyleSheet, Text, TouchableOpacity, View} from "react-native";
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
                        {this.state.avatarSource === null?
                            <Text style={styles.text}>选择图片</Text>
                            :<Image style={styles.avatar} source={this.state.avatarSource}/>
                        }


                    </View>
                </TouchableOpacity>


            </View>
        );
    }

    _selectPhotoTapped = () => {

        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500
        }
        NativeModules.ImagePicker.launchImagePicker(options,
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