/**
 * Created by hanyang on 2017/9/1 0001.
 */

import React from "react";
import Animation from "./animation";

import {
    StyleSheet,
    PermissionsAndroid,
    View,
    Keyboard,
    Text,
    NetInfo,
    Alert,
    Button,
    DatePickerAndroid,
    TimePickerAndroid,
    TextInput
} from "react-native";
import Platform from "./Platform";
import Geolocation from 'Geolocation'
import Screen from './Screen'
import DeviceInfo from './DeviceInfo'
import ImagePicker from './ImagePicker'


export default class more2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dateText: '选择一个日期',
            timeText: '选择一个时间',
            keyboardText: '键盘收回',
            connectionInfo: '',
            permission: PermissionsAndroid.PERMISSIONS.CAMERA,
            hasPermission: 'not checked'
        }
    }

    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow'
            , () => {
                this.setState({keyboardText: '键盘弹出'})
            });

        Keyboard.addListener('keyboardDidHide', () => {
            this.setState({keyboardText: '键盘收起'})
        })

        NetInfo.addEventListener('change', this._handleConnectionInfoChange)

        NetInfo.fetch().done(
            (connectionInfo) => {
                this.setState({connectionInfo})
            }
        )

    }

    _handleConnectionInfoChange = (connectionInfo) => {
        this.setState({connectionInfo})
    }


    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        Keyboard.removeListener('keyboardDidHide');
        NetInfo.removeEventListener('change', this._handleConnectionInfoChange)
    }

    render() {
        return (
            <View style={styles.container}>
                <Animation width='100' height='100'></Animation>

                <Text style={styles.text}>
                    手机平台： {Platform.systemName}
                </Text>

                <Text style={styles.text}>{this.state.dateText}</Text>
                <Text style={styles.text}>{this.state.timeText}</Text>
                <Button title={'日期选择器'} onPress={() => {
                    console.log('单击日期选择器按钮')
                    this._showDataPicker();
                }}/>

                <Button title='时间选择器' onPress={() => {
                    this._showTimePicker();
                }}/>

                <Button title='获取位置' onPress={() => {
                    Geolocation.getCurrentPosition((data) => {
                        Alert.alert('获取地理位置成功', JSON.stringify(data), null)
                    }, () => {
                        Alert.alert('获取地理位置失败', null, null)
                    })
                }}/>

                <Text style={styles.text}>{this.state.keyboardText}</Text>
                <TextInput style={styles.textInput}></TextInput>

                <Text style={styles.text}>当前联网类型：{this.state.connectionInfo}</Text>

                <Text style={styles.text}>权限状态：{this.state.hasPermission}</Text>
                <Button title={'申请摄像头权限'} onPress={this._requestCameraPermission}/>

                <Text style={styles.text}>系统名称：{DeviceInfo.systemName}</Text>
                <Text style={styles.text}>系统版本：{DeviceInfo.systemVersion}</Text>
                <Text style={styles.text}>默认语言：{DeviceInfo.defaultLanguage}</Text>
                <Text style={styles.text}>应用版本：{DeviceInfo.appVersion}</Text>
                <ImagePicker/>
            </View>

        )

    }

    _requestCameraPermission = async () => {
        let result = await PermissionsAndroid.request(this.state.permission,
            {
                title: '权限申请',
                message: 'lovehanyang申请摄像头权限'
            });
        this.setState({hasPermission: result})
    }


    _showTimePicker = async () => {
        try {
            let newState = {};
            const {action, minute, hour} = await TimePickerAndroid.open();
            if (action === TimePickerAndroid.dismissedAction) {
                newState['timeText'] = '取消选择'
            } else {
                newState['timeText'] = hour + ':' + (minute < 10 ? '0' + minute : minute)
            }
            this.setState(newState)

        } catch ({code, message}) {
            console.warn('打开TimePickerAndroid失败' + message)
        }
    }

    _showDataPicker = async () => {

        try {
            let newState = {};
            const {action, year, month, day} = await DatePickerAndroid.open();

            if (action === DatePickerAndroid.dismissedAction) {
                newState['dateText'] = '取消选择';
            } else {
                let date = new Date(year, month, day);
                newState['dateText'] = date.toLocaleDateString();
            }
            this.setState(newState);

        } catch ({code, message}) {
            console.warn('打开DatePickerAndroid失败' + message)
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    textInput: {
        width: Screen.width,
        height: 50,
        backgroundColor: 'lightgray'
    }
})