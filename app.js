import React, {Component} from 'react';
import {Navigator} from 'react-native-deprecated-custom-components';

import Main from './main.android';

export default class app extends React.Component {
    render() {
        return (
            <Navigator
                initialRoute={{
                    name: 'main',
                    component: Main
                }}
                configureScene={(route) => {
                    return Navigator.SceneConfigs.FloatFromRight;
                }}
                renderScene={(route, navigator) => {
                    const Component = route.component;
                    return <Component {...route.params} navigator={navigator}/>
                }}/>
        );
    }
}
