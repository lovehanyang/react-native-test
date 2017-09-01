/**
 * Created by hanyang on 2017/9/1 0001.
 */
import React, {Component} from "react";
import {requestAnimationFrame, StyleSheet, View} from "react-native";

export default class Animation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: parseInt(this.props.width),
            height: parseInt(this.props.height)

        }
    }

    render() {
        return (
            <View style={[styles.animation, {
                width: this.state.width
                , height: this.state.height
            }]}>

            </View>

        )
    }

    componentDidMount() {
        this._startAnimation();
    }

    _startAnimation = () => {
        let count = 0;
        while (++count < 100) {
            requestAnimationFrame(() => {
                    this.setState(
                        width
                    :
                    this.state.width + 1,
                        height
                    :
                    this.state.height + 1
                    )
                }
            )
        }

    }

}

const styles = StyleSheet.create({
    animation: {
        backgroundColor: 'red'
    }
})