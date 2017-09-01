/**
 * Created by hanyang on 2017/8/18 0018.
 */

import React from "react";
import Screen from './Screen'
import {ActivityIndicator, Dimensions,Picker, Slider, StyleSheet, Switch, Text, View, WebView} from "react-native";

export default class more extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'java',
            sliderValue: 5,
            isOn:false
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    更多页面
                </Text>
                <ActivityIndicator
                    color="purple" size="large"/>
                <Picker
                    style={styles.picker}
                    selectedValue={this.state.language}
                    onvaluechange={(lang) => {
                        this.setState({language: lang})
                    }}>
                    <Picker.Item label='Java' value="java"/>
                    <Picker.Item label='JavaScript' value="javaScript"/>
                </Picker>
                <Slider
                    minimumValue={0}
                    style={{width:200}}
                    step={1}
                    maximumTrackTintColor={'red'}
                    minimumTrackTintColor={'yellow'}
                    maximumValue={10}
                    value={this.state.sliderValue}
                    onValueChange={(value)=>{
                        this.setState({sliderValue:value})
                    }}
                />
                <Text>
                    Slider值：{this.state.sliderValue}
                </Text>
                <Switch
                onTintColor={'blue'}
                thumbTintColor={'green'}
                tintColor={'black'}
                onValueChange={()=>{
                    this.setState({
                        isOn:!this.state.isOn
                    })
                }}
                value={this.state.isOn === true}
                />

                <Text style={styles.text}>width:{Screen.width}</Text>
                <Text style={styles.text}>height:{Screen.height}</Text>
                <Text style={styles.text}>PixelRatio:{Screen.pixelRatio}</Text>
                <Text style={styles.text}>resolutionX:{Screen.resolutionX}</Text>
                <Text style={styles.text}>resolutionY:{Screen.resolutionY}</Text>

                <WebView
                source={{uri:'https://sina.cn'}}
                style={styles.web}/>
            </View>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        alignItems: 'center'
    },
    text: {
        fontSize: 20
    },
    picker: {
        width: 200,
        height: 200
    },
    web:{
        width:Dimensions.get("window").width,
        height:200
    }
})