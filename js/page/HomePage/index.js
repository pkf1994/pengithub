import React,{Component} from 'react'
import {
    View,
    RefreshControl,
    StyleSheet,
    Animated,
    Dimensions,
    Image,
    Text,
    StatusBar,
    LayoutAnimation
} from 'react-native';
import {Button} from 'react-native-elements'
import {connect} from 'react-redux'
import {FlatList} from 'react-native-gesture-handler'
import {HeaderOfHomePage,ProjectItemCardEX} from './component'
import GlobalStyle from '../../util/GlobalStyle';
var Spinner = require('react-native-spinkit');
import {
    createSyncAction_getAllLanguageListData,
    createSyncAction_getMoreTrendingData,
    createSyncAction_getTrendingData,
} from '../../redux/module/trending/action';
import {throttleByGap} from '../../util/Throttle';
import {LoadingView,AnimatedInView} from '../../component';



class HomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            hideStatusBar: false,
            heightOfHeader: 0,
            blurViewRef: null,
            topOfHeader: 0,
            topOfFlatList: 0,
            animatedHeaderTopValue: new Animated.Value(0),
            animatedLoadingIndicatorValue: new Animated.Value(1)
        }
    }

    componentDidMount(): void {
        const {trendingStore,dispatchGetAllLanguage} = this.props
        if(trendingStore.trendingRepositoryList.length === 0) {
            this.getData(false)
        }
        dispatchGetAllLanguage()
    }

    getData(refresh) {
        const {trendingStore} = this.props
        const {loading,refreshing,trendingLanguage,since} = trendingStore
        if(loading || refreshing) return
        this.props.dispatchGetData(refresh,trendingLanguage,since)
    }

    _getMoreData() {
        const {trendingStore} = this.props
        const currentPage = trendingStore.currentPage
        const maxPage = trendingStore.maxPage
        if(trendingStore.loadingMore || currentPage >= maxPage) return
        this.props.dispatchGetMoreData()
    }

    renderItem(itemData) {
        const {trendingStore} = this.props
        const {currentPage,pageScale} = trendingStore

        const item = itemData.item
        const delay = (itemData.index - (currentPage - 1) * pageScale) * 100

        return <AnimatedInView delay={delay}>
            <ProjectItemCardEX repositoryModel={item} index={itemData.index}/>
        </AnimatedInView>

    }

    _onHeaderContainerViewLayout = e => {
        let {height} = e.nativeEvent.layout
        const {heightOfHeader} = this.state
        if(!heightOfHeader) {
            this.setState({
                heightOfHeader: height,
                topOfFlatList: height
            })
            // P.S. 270,217,280区间的映射是告诉interpolate，所有大于270的值都映射成-50
            // 这样就不会导致Header在上滑的过程中一直向上滑动了
            this.animatedHeaderTop = this.state.animatedHeaderTopValue.interpolate({
                inputRange: [0, 270, 271, 280],
                outputRange: [0, -height, -height, -height]
            })

            this.animatedFlatListTop = this.state.animatedHeaderTopValue.interpolate({
                inputRange: [0, 270, 271, 280],
                outputRange: [height, 0, 0, 0]
            })

        }
    }

    _listFooterComponent() {
        return <View style={{alignItems:'center'}}>
            <Spinner style={{margin:20}} isVisible={true} size={30} type='Bounce' color="black"/>
        </View>
    }

    _ListEmptyComponent = () => {
        const {trendingStore} = this.props
        const {heightOfHeader} = this.state
        const {getDataReturnNull,networkErr} = trendingStore
        const heightOfEmptyComponent = Dimensions.get('window').height - heightOfHeader

        if(getDataReturnNull) {
            return <View style={[styles.emptyComponentContainer,{height:heightOfEmptyComponent}]}>
                <Image style={styles.emptyImage} source={require('../../asset/image/box_PNG132.png')}/>
            </View>
        }
        if(networkErr) {
            return <View style={[styles.emptyComponentContainer,{height:heightOfEmptyComponent}]}>
                <Text style={styles.networkErr}>NETWORK ERR</Text>
                <Button title="retry"
                        titleStyle={{color:'gray',fontSize: 16,includeFontPadding:false}}
                        type="Outline"
                        containerStyle={{paddingHorizontal:20,marginBottom:100,borderColor:'gray',borderWidth:1,borderRadius:5}}/>
            </View>
        }
        return null
    }

    _onPanGestureEvent = ({nativeEvent}) => {
        const flagScrollVelocity = 6
        const duration = 600

        if(nativeEvent.velocity.y > flagScrollVelocity) {
            throttleByGap(() =>  {
                //console.log("hide Animation")
               /* Animated.timing(this.state.animatedHeaderTopValue,{
                    toValue: 270,
                    duration: duration
                }).start()*/
                LayoutAnimation.configureNext(LayoutAnimation.create(duration, 'easeInEaseOut', 'opacity'))
                if(this.state.topOfHeader === 0) {
                    this.setState({
                        topOfHeader: - this.state.heightOfHeader,
                        topOfFlatList: 0
                    })
                    this.preBarStyle = StatusBar._currentValues.barStyle.value ? StatusBar._currentValues.barStyle.value : 'light-content'
                    StatusBar.setBarStyle('dark-content',true)
                }
            },1000,'hideHeader',this)
        }
        //flatList from RNGH 有bug 初次向下滚动时会得到极小nativeEvent.velocity.y异常值
        if(nativeEvent.velocity.y < -flagScrollVelocity) {
            throttleByGap(() => {
                if(this.state.topOfHeader !== 0) {
                    LayoutAnimation.configureNext(LayoutAnimation.create(duration, 'easeInEaseOut', 'opacity'))
                    this.setState({
                        topOfHeader:0,
                        topOfFlatList: this.state.heightOfHeader
                    })
                    this.preBarStyle && StatusBar.setBarStyle(this.preBarStyle,true)
                }

            },1000,'showHeader',this)
        }
    }

    render() {
        const {topOfHeader,topOfFlatList} = this.state
        const {trendingStore} = this.props
        const {currentPage,maxPage,pageScale,refreshing,languageColor,trendingRepositoryList,loading} = trendingStore

        const data = trendingRepositoryList ? trendingRepositoryList.slice(0, pageScale * currentPage) : []

        return (

            <View style={{...GlobalStyle.root_container,backgroundColor: 'white'}}>
                <LoadingView loading={loading} style={{flex:1}}>
                    <Animated.View style={{top:topOfHeader}} onLayout={this._onHeaderContainerViewLayout}>
                        <HeaderOfHomePage/>
                    </Animated.View>


                    <Animated.View style={{...styles.flatListContainer,top:topOfFlatList}} >
                        <FlatList data={data}
                                  initialNumToRender={3}
                                ref={ref => this.flatList = ref}
                                style={{width:Dimensions.get('window').width}}
                                refreshControl={<RefreshControl
                                    title={'loading'}
                                    titleColor={languageColor}
                                    colors={[languageColor]}
                                    refreshing={refreshing}
                                    onRefresh={() => this.getData(true)}
                                    tintColor={"black"}
                                />}
                                ListEmptyComponent={this._ListEmptyComponent}
                                onScroll={this._onPanGestureEvent}
                                ListFooterComponent={() => {
                                    if(currentPage >= maxPage || trendingRepositoryList.length === 0) return null
                                    return this._listFooterComponent()
                                }}
                                onEndReached={() => this._getMoreData()}
                                onEndReachedThreshold={0.1}
                                renderItem={itemData => this.renderItem(itemData)}
                                keyExtractor={item => "" + item.name + item.url}>
                        </FlatList>

                    </Animated.View>
                </LoadingView>
            </View>
        )
    }

}

const mapState = state => ({
    trendingStore: state.trending
})

const mapActions = dispatch => ({
    dispatchGetData: (refresh,trendingLanguage,since) => {
        dispatch(createSyncAction_getTrendingData({refresh: refresh},{trendingLanguage:trendingLanguage,since:since}))
    },
    dispatchGetMoreData: () => {
        dispatch(createSyncAction_getMoreTrendingData(600))
    },
    dispatchGetAllLanguage: () => {
        dispatch(createSyncAction_getAllLanguageListData())
    }
})

export default connect(mapState,mapActions)(HomePage)

const styles = StyleSheet.create({
    currentLanguageSelectPaneContainer: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    flatListContainer: {
        position: 'absolute',
        bottom: 0,
    },
    emptyComponentContainer: {
        right: 0,
        left: 0,
        justifyContent:'center',
        alignItems: 'center'
    },
    emptyImage: {
        width: 150,
        marginBottom:100,
        resizeMode: 'contain'
    },
    networkErr: {
        fontWeight: 'bold',
        marginBottom:10,
        color: 'gray',
        fontSize: 22
    }
})
