/**
 * Created by hanyang on 2017/9/1 0001.
 */
import React, {Component} from "react";
import {StyleSheet, View, LayoutAnimation,Easing, Animated, UIManager} from "react-native";

export default class Animation extends Component {
    constructor(props) {
        super(props);
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
        this.state = {
            width: parseInt(this.props.width),
            height: parseInt(this.props.height),

            bounceValue: new Animated.Value(0),
            rotateValue: new Animated.Value(0)

        }
    }

    render() {
        return (


            <Animated.View
                style={[styles.animation,
                    {
                        width: this.state.width,
                        height: this.state.height,
                        transform: [{
                            scale: this.state.bounceValue
                        },
                            {rotate:this.state.rotateValue.interpolate({
                                inputRange:[0,1],
                                outputRange:['0deg','720deg']
                            })}
                        ]
                    }

                ]}
            />

        )
    }

    componentDidMount() {
        this._startAnimation();
    }

    _startAnimation = () => {
        // let count = 0;
        // while (++count < 100) {
        //     requestAnimationFrame(() => {
        //             this.setState({
        //                     width: this.state.width + 1,
        //                     height: this.state.height + 1
        //                 }
        //             )
        //         }
        //     )
        // }

        // LayoutAnimation.configureNext({
        //     duration: 5000,
        //     create: {
        //         type: LayoutAnimation.Types.spring,
        //         property: LayoutAnimation.Properties.scaleXY
        //     },
        //     update: {
        //         type: LayoutAnimation.Types.spring
        //     }
        // });
        // this.setState({
        //     width: this.state.width + 100,
        //     height: this.state.height + 100
        // });

        // Animated.spring(this.state.bounceValue, {
        //     toValue: 1
        // }).start();

        Animated.parallel([
            Animated.spring(this.state.bounceValue,{
                toValue:1
            }),
            Animated.delay(500),
            Animated.timing(this.state.rotateValue,
                {
                    toValue:1,
                    duration:800,
                    easing:Easing.out(Easing.quad)
                }
            )
        ]).start();


    }

}

const styles = StyleSheet.create({
    animation: {
        backgroundColor: 'red'
    }
})