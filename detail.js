/**
 * Created by hanyang on 2017/8/18 0018.
 */
import React from "react";
import {Alert, Button, StyleSheet, Text, TextInput, View} from "react-native";


const SERVER_URL = 'http://localhost:3000/';
const PRODUCT_API = 'products/';

export default class detail extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            productID: '' + this.props.product.id,
            productTitle: this.props.product.title,
            productSubTitle: this.props.product.subTitle
        };

    }


    render() {
        return (
            <View style={styles.container}>
                {/*<TouchableOpacity*/}
                {/*onPress={this._pressBackButton.bind(this)}>*/}
                {/*<Text style={styles.back}>返回</Text>*/}
                {/*</TouchableOpacity>*/}

                <View style={styles.line}>
                    <Text style={styles.text}>ID:</Text>
                    <TextInput style={styles.input} value={this.state.productID} onChangeText={(text) => {
                        this.setState({productID: text});
                    }}/>
                </View>

                <View style={styles.line}>
                    <Text style={styles.text}>
                        title:
                    </Text>
                    <TextInput style={styles.input}
                               value={this.state.productTitle}
                               onChangeText={(text) => {
                                   this.setState({productTitle: text})
                               }}
                    />
                </View>

                <View style={styles.line}>
                    <Text style={styles.text}>
                        subTitle:{this.props.product.subTitle}
                    </Text>
                    <TextInput style={styles.input}
                               value={this.state.productSubTitle}
                               onChangeText={(text) => {
                                   this.setState({productSubTitle: text})
                               }}
                    />
                </View>

                <View style={styles.line}>
                    <Text style={{fontSize: 20}}>
                        image:{this.props.product.image}
                    </Text>
                </View>

                <Button
                    title={'保存'}
                    onPress={this._updateProduct.bind(this)}
                />
                <Button
                    title={'新建'}
                    onPress={this._createProduct}
                />
                <Button
                    title={'删除'}
                    onPress={this._deleteProduct}
                />


            </View>
        )
    }

    _deleteProduct = () => {
        const req = new Request(SERVER_URL + PRODUCT_API + this.state.productID, {
            method: 'DELETE'
        });
        fetch(req).then((res) => {
            return res;
        }).then((result, done) => {
            if (!done) {
                this.props.productUpdated();
                Alert.alert('删除成功', null, null);
            } else {
                Alert.alert('删除失败', null, null);
            }
        });
    }



    _createProduct = () => {
        const req = new Request(SERVER_URL + PRODUCT_API, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    'id': parseInt(this.state.productID),
                    'title': this.state.productTitle,
                    'subTitle': this.state.productSubTitle,
                    'image': this.props.image
                }
            )
        });

        fetch(req).then((res) => {
            return res.json();
        }).then((result, done) => {
            if (!done) {
                Alert.alert('新建成功', null, null);
                this.props.productUpdated();
            } else {
                Alert.alert('新建失败', null, null);
            }
        });

    }

    _updateProduct() {
        const req = new Request(SERVER_URL + PRODUCT_API + this.state.productID, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'id': parseInt(this.state.productID),
                'title': this.state.productTitle,
                'subTitle': this.state.productSubTitle,
                'image': this.props.product.image
            })
        });

        fetch(req).then((res) => {
            return res.json();
        }).then((result, done) => {
            if (!done) {
                this.props.productUpdated();
                Alert.alert('保存成功', null, null);
            } else {
                Alert.alert('保存失败', null, null);
            }
        });


    }

    _pressBackButton() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 100
    },
    line: {
        flexDirection: "row"
    },
    text: {
        width: 100,
        fontSize: 20
    },
    input: {
        flex: 1,
        borderColor: 'gray',
        borderWidth: 2
    },
    back: {
        fontSize: 20,
        color: 'blue'
    }
});