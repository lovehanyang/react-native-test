/**
 * Created by hanyang on 2017/9/5 0005.
 */
import React from "react";
import {StyleSheet, View} from "react-native";
import Communication from "./Communication";
import Screen from './Screen'

export default class more3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <Communication/>


            </View>
        )
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