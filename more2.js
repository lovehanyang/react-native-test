/**
 * Created by hanyang on 2017/9/1 0001.
 */

import React from "react";
import Animation from "./animation";
import {StyleSheet, View} from "react-native";

export default class more2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={styles.container}>
                <Animation width='100' height='100'></Animation>

            </View>
        )

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
})