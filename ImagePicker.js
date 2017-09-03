/**
 * Created by hanyang on 2017/9/3.
 */


import React from "react";
import {StyleSheet, TouchableOpacity, View,Text} from "react-native";
export default class ImagePicker extends React.Component {

    render() {
        return (

            <View style={styles.container}>
                <TouchableOpacity>
                    <View style={[styles.avatarContainer, styles.avatar]}>
                        <Text style={styles.text}>选择图片</Text>

                    </View>
                </TouchableOpacity>


            </View>
        );
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