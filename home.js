/**
 * Created by hanyang on 2017/8/18 0018.
 */
import React, {Component} from "react";
import Detail from "./detail";
import Screen from './Screen'
import {
    Alert,
    AsyncStorage,
    Dimensions,
    Image,
    ListView,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableHighlight,
    ToastAndroid,
    BackAndroid,
    AppState,
    View
} from "react-native";

import {
    Button,
    Container,
    Content,
    Header,
    Icon,
    Input,
    InputGroup,
    List,
    ListItem,
    Text,
    Thumbnail
} from "native-base";

const SERVER_URL = 'http://localhost:3000/';
const PRODUCT_API = 'products/';

const circleSize = 8;
const circleMargin = 5;
const advertisementCount = 3;
const indicatorWidth =
    circleSize * advertisementCount + circleMargin * advertisementCount * 2;
const left = (Screen.width - indicatorWidth) / 2;
const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
});

export default class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentAppState: AppState.currentState,
            isRefreshing: false,
            isNetworkValid: false,
            currentPage: 0,
            dataSource: ds.cloneWithRows([
                {
                    image: require("./img/4.jpg"),
                    title: "商品1",
                    subTitle: "描述1"
                },
                {
                    image: require("./img/5.jpg"),
                    title: "商品2",
                    subTitle: "描述1"
                },
                {
                    image: require("./img/6.jpg"),
                    title: "商品3",
                    subTitle: "描述1"
                },
                {
                    image: require("./img/7.jpg"),
                    title: "商品4",
                    subTitle: "描述1"
                },
                {
                    image: require("./img/8.jpg"),
                    title: "商品5",
                    subTitle: "描述1"
                }
            ]),
            searchText: "", //保存当前输入的文本

            // advertisements: [
            //   { url: "http://photocdn.sohu.com/20130221/Img366640084.jpg" },
            //   {
            //     url:
            //       "http://img.kaopu001.com/2015-05-19/88546a19-0711-4b93-af6b-443d7d033cd4.jpg"
            //   },
            //   {
            //     url:
            //       "http://img.kaopu001.com/2015-07-23/498c30b8-4983-4f96-93ec-d793658246dd.jpg"
            //   }
            // ]

            advertisements: [
                {image: require("./img/1.jpg")},
                {image: require("./img/2.jpg")},
                {image: require("./img/3.jpg")}
            ]
        };
    }

    render() {


        return (
            <Container>

                <Header searchBar rounded>

                    <InputGroup>
                        <Icon name='ios-search-outline'/>
                        <Input>

                            placeHolder="搜索商品"
                            onChangeText={text => {
                            this.setState({searchText: text});
                            console.log("lovehanyang输入的内容：" + this.state.searchText);
                        }}
                        </Input>
                    </InputGroup>
                    <Button
                        transparent
                        onPress={() => {
                            Alert.alert('lovehanyang搜索内容 ' + this.state.searchText, null, null);
                        }}
                        title='搜索'
                    >

                    </Button>

                    {/*<View style={styles.searchbar}>*/}
                    {/*<TextInput*/}
                    {/*style={styles.input}*/}
                    {/*placeHolder="搜索商品"*/}
                    {/*onChangeText={text => {*/}
                    {/*this.setState({searchText: text});*/}
                    {/*console.log("lovehanyang输入的内容：" + this.state.searchText);*/}
                    {/*}}*/}
                    {/*/>*/}
                    {/*<Button*/}
                    {/*style={styles.button}*/}
                    {/*title="搜索"*/}
                    {/*onPress={() =>*/}
                    {/*Alert.alert(*/}
                    {/*"lovehanyang单击了搜索按钮" + this.state.searchText,*/}
                    {/*null,*/}
                    {/*null*/}
                    {/*)}*/}
                    {/*/>*/}
                    {/*</View>*/}
                </Header>
                <Content>
                    <View style={styles.advertisement}>
                        <ScrollView
                            ref="scrollView"
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled={true}>
                            {this.state.advertisements.map((advertisement, index) => {
                                return (
                                    <TouchableHighlight
                                        key={index}
                                        onPress={() => Alert.alert("你单击了轮播图", null, null)}>
                                        <Image
                                            style={styles.advertisementContent}
                                            source={advertisement.image}
                                        />
                                    </TouchableHighlight>
                                );
                            })}
                        </ScrollView>
                        {/*<Swiper*/}
                        {/*loop={true}*/}
                        {/*height={190}*/}
                        {/*autoplay={true}>*/}
                        {/*{this.state.advertisements.map((advertisement, index) => {*/}
                        {/*return (*/}
                        {/*<TouchableHighlight*/}
                        {/*key={index}*/}
                        {/*onPress={() => Alert.alert("你单击了轮播图", null, null)}>*/}
                        {/*<Image*/}
                        {/*style={styles.advertisementContent}*/}
                        {/*source={advertisement.image}*/}
                        {/*/>*/}
                        {/*</TouchableHighlight>);*/}
                        {/*})}*/}
                        {/*</Swiper>*/}

                        <View style={[styles.indicator, {left: left}]}>
                            {this.state.advertisements.map((advertisement, index) => {
                                return (
                                    <View
                                        key={index}
                                        style={
                                            index === this.state.currentPage
                                                ? styles.circleSeleted
                                                : styles.circle
                                        }
                                    />
                                );
                            })}
                        </View>
                    </View>
                    <View style={styles.products}>
                        <View style={styles.products}>
                            <ListView
                                dataSource={this.state.dataSource}
                                renderRow={this._renderRow}
                                renderSeparator={this._renderSeparator}
                                // refreshControl={this._renderRefreshControl()}
                            />
                        </View>
                    </View>
                </Content>

            </Container>
        );
    }

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange)
        // this._startTimer();
        // this._fetchProduct();
        if(Platform.OS === 'android'){
            BackAndroid.addEventListener('hardwareBackPress',this._onBackAndroid)
        }
    }

    componentWillUnmount() {
        AppState.addEventListener('change', this._handleAppStateChange)
        clearInterval(this.interval);
        if(Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this._onBackAndroid)
        }
    }

    _onBackAndroid = ()=> {
        Alert.alert('您点击了返回键', null, null)
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            return false;
        }

        this.lastBackPressed = Date.now();
        ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
        return true;
    }





    _handleAppStateChange = (nextAppState) => {
        if (nextAppState === 'inactive' ||
            nextAppState === 'background') {
            console.log('应用进入后台')
        } else {
            console.log('应用进入前台')
        }
        // this.setState({currentAppState: nextAppState})
    }

    _fetchProduct() {
        const req = new Request(SERVER_URL + PRODUCT_API, {method: 'GET'});
        console.log('request:', SERVER_URL + PRODUCT_API);
        fetch(req).then((res) => {
            return res.json();
        }).then((result, done) => {
            if (!done) {
                console.log('result:' + JSON.stringify(result));
                AsyncStorage.setItem('products', JSON.stringify(result))
                    .then((err) => {
                        Alert.alert('err:' + err, null, null);
                    });

                this.setState({
                    isRefreshing: false,
                    dataSource: ds.cloneWithRows(result),
                    isNetworkValid: true
                });
            }
        }).catch((error) => {
            AsyncStorage.getItem('products').then((values) => {
                this.setState({
                    isRefreshing: false,
                    dataSource: ds.cloneWithRows(JSON.parse(values)),
                    isNetworkValid: false
                });

            })

        });
    }


    _startTimer() {
        this.interval = setInterval(() => {
            nextPage = this.state.currentPage + 1;
            if (nextPage >= 3) {
                nextPage = 0;
            }
            this.setState({currentPage: nextPage});
            const offsetX = nextPage * Screen.width;
            this.refs.scrollView.scrollResponderScrollTo({
                x: offsetX,
                y: 0,
                animated: true
            });
        }, 2000);
    }

    _productUpdated = () => {
        this._fetchProduct();
    }

    _renderRow = (rowData, sectionID, rowID) => {

        const imageComponent = this.state.isNetworkValid ?
            <Thumbnail square size={40} source={{
                uri: SERVER_URL + rowData.image
            }}/> :
            <Thumbnail square size={40} source={
                require('./img/5.jpg')
            }/>;

        return (
            <TouchableHighlight onPress={() => {
                const {navigator} = this.props;
                if (navigator) {
                    navigator.push({
                        name: 'detail',
                        component: Detail,
                        params: {
                            product: rowData,
                            productUpdated: this._productUpdated
                        }
                    })
                }
            }}>
                <View style={styles.row}>
                    {/*<Image source={rowData.image} style={styles.productImage}/>*/}
                    {imageComponent}
                    <View style={styles.productText}>
                        <Text style={styles.productTitle}>
                            {rowData.title}
                        </Text>
                        <Text style={styles.productSubTitle}>
                            {rowData.subTitle}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    };

    _renderSeparator = (sectionId, rowId, adjacentRowHighlighted) => {
        return <View key={"$(sectionId)-$(rowID)"} style={styles.divider}/>;
    };

    _renderRefreshControl() {
        return (
            <RefreshControl
                refreshing={this.state.isRefreshing}
                tintColor={'#0000ff'}
                onRefresh={this._onRefresh}
                title={'正在刷新数据，请稍后...'}
                titleColor={'#fa2b5c'}
            />
        )
    }

    _onRefresh = () => {
        this.setState({isRefreshing: true});

        setTimeout(() => {
            const products = Array.from(new Array(3)).map(
                (value, index) => ({
                    image: require('./img/4.jpg'),
                    title: '新商品' + index,
                    subTitle: '新商品描述' + index
                }));

            this.setState({isRefreshing: false, dataSource: ds.cloneWithRows(products)});
        }, 2000)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    searchbar: {
        marginTop: Platform.OS === "ios" ? 20 : 0,
        height: 40,
        flexDirection: "row"
    },
    input: {
        flex: 1,
        borderRadius: 2,
        borderColor: "gray",
        borderWidth: 2
    },
    button: {
        flex: 1
    },
    advertisement: {
        height: 180,
        backgroundColor: "green",
        justifyContent: "center",
        alignItems: "center"
    },
    advertisementContent: {
        width: Dimensions.get("window").width,
        height: 180
    },
    products: {
        flex: 1
    },
    row: {
        height: 60,
        flexDirection: "row",
        backgroundColor: "white"
    },
    productImage: {
        height: 40,
        width: 40,
        marginLeft: 10,
        marginRight: 10,
        alignSelf: "center"
    },
    productTitle: {
        flex: 3,
        fontSize: 16
    },
    productSubTitle: {
        flex: 2,
        fontSize: 14,
        color: "gray"
    },
    productText: {
        marginTop: 10,
        marginBottom: 10,
        flex: 1,
        flexDirection: "column" //其实默认就是column
    },
    indicator: {
        position: "absolute",
        top: 160,
        flexDirection: "row"
    },
    circle: {
        width: circleSize,
        height: circleSize,
        borderRadius: circleSize / 2,
        backgroundColor: "gray",
        marginHorizontal: circleMargin
    },
    circleSeleted: {
        width: circleSize,
        height: circleSize,
        borderRadius: circleSize / 2,
        backgroundColor: "white",
        marginHorizontal: circleMargin
    },
    divider: {
        height: 1,
        width: Dimensions.get("window").width - 5,
        marginLeft: 5,
        backgroundColor: "lightgray"
    }
});