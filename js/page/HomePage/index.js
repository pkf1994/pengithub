import React,{PureComponent} from 'react'
import {
    View,
    RefreshControl,
    StyleSheet,
    Animated,
    Dimensions,
    Image,
    Text,FlatList,
    StatusBar,
    LayoutAnimation, ActivityIndicator
} from 'react-native';
import {Button} from 'react-native-elements'
import {connect} from 'react-redux'
import {HeaderOfHomePage,ProjectItemCardEX} from './component'
import GlobalStyle from '../../util/GlobalStyle';
import {
    createSyncAction_getAllLanguageListData,
    createSyncAction_getMoreTrendingData,
    createSyncAction_getTrendingData,
} from '../../redux/module/trending/action';
import {Util_Throtte} from '../../util';
import {LoadingView,SlideInTransition} from '../../component';

const NEXT_LAYOUTANIAMTION = LayoutAnimation.create(500, 'easeInEaseOut', 'opacity')

class HomePage extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            hideStatusBar: false,
            heightOfHeader: undefined,
            blurViewRef: null,
            topOfHeader: 0,
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

    componentDidUpdate(prevProps, prevState, snapshot): void {
        const preTrendingStore = prevProps.trendingStore
        const trendingStore =this.props.trendingStore
        if(preTrendingStore.since !== trendingStore.since || preTrendingStore.trendingLanguage !== trendingStore.trendingLanguage) {
            this.getData()
            this.flatList.scrollToOffset({offset:0,animated:false})
        }
    }

    getData(refresh) {
        const {trendingStore} = this.props
        const {loading,refreshing,trendingLanguage,since} = trendingStore
        if(loading || refreshing) return
        this.props.dispatchGetData(refresh,trendingLanguage,since)
    }

    _getMoreData() {
        const {trendingStore} = this.props
        const {currentPage,maxPage,trendingRepositoryList} = trendingStore
        console.log("trendingRepositoryList.length:" + trendingRepositoryList.length)
        if(trendingRepositoryList.length === 0) return
        if(trendingStore.loading || trendingStore.loadingMore || currentPage >= maxPage) return
        this.props.dispatchGetMoreData()
    }

    renderItem(itemData) {
        const {trendingStore} = this.props
        const {currentPage,pageScale,loading,trendingLanguage} = trendingStore

        const item = itemData.item
        const delay = (itemData.index - (currentPage - 1) * pageScale + 1) * 50

        return <SlideInTransition delay={delay}>
            <View style={{opacity: loading?0:1}}>
                <ProjectItemCardEX repositoryModel={item} index={itemData.index} trendingLanguage={trendingLanguage}/>
            </View>
        </SlideInTransition>

    }

    _onHeaderContainerViewLayout = e => {
        let {height} = e.nativeEvent.layout
        const {heightOfHeader} = this.state
        if(!heightOfHeader) {
            LayoutAnimation.configureNext(NEXT_LAYOUTANIAMTION)
            this.setState({
                heightOfHeader: height,
            })
        }
    }

    _listFooterComponent() {
        return <View style={{alignItems:'center'}}>
            <ActivityIndicator size="large" color="black" />
        </View>
    }

    _ListEmptyComponent = () => {
        const {trendingStore} = this.props
        const {heightOfHeader} = this.state
        const {getDataReturnNull,networkErr} = trendingStore
        const heightOfEmptyComponent = Dimensions.get('window').height - heightOfHeader

        if(getDataReturnNull) {
            return <View style={[S.emptyComponentContainer,{height:heightOfEmptyComponent}]}>
                <Image style={S.emptyImage} source={require('../../asset/image/box_PNG132.png')}/>
            </View>
        }
        if(networkErr) {
            return <View style={[S.emptyComponentContainer,{height:heightOfEmptyComponent}]}>
                <Text style={S.networkErr}>NETWORK ERR</Text>
                <Button title="retry"
                        titleStyle={{color:'gray',fontSize: 16,includeFontPadding:false}}
                        type="Outline"
                        onPress={this.getData(false)}
                        containerStyle={{paddingHorizontal:20,marginBottom:100,borderColor:'gray',borderWidth:1,borderRadius:5}}/>
            </View>
        }
        return null
    }

    _onPanGestureEvent = ({nativeEvent}) => {
        const flagScrollVelocity = 6
        //console.log(nativeEvent)

        if(nativeEvent.contentOffset.y === 0 && nativeEvent.velocity.y  < 0) {
            Util_Throtte(() => {
              this._showHeader()
            },1000,'showHeader',this)
        }

        if(nativeEvent.velocity.y > flagScrollVelocity) {
            Util_Throtte(() =>  {
              this._hideHeader()
            },1000,'hideHeader',this)
        }
        //flatList from RNGH 有bug 初次向下滚动时会得到极小nativeEvent.velocity.y异常值
        if(nativeEvent.velocity.y < -flagScrollVelocity) {
            Util_Throtte(() => {
               this._showHeader()
            },1000,'showHeader',this)
        }
    }

    _hideHeader = () => {
        LayoutAnimation.configureNext(NEXT_LAYOUTANIAMTION)
        if(this.state.topOfHeader === 0) {
            this.setState({
                topOfHeader: - this.state.heightOfHeader
            })
            this.preBarStyle = StatusBar._currentValues.barStyle.value ? StatusBar._currentValues.barStyle.value : 'light-content'
            StatusBar.setBarStyle('dark-content',true)
        }
    }

    _showHeader = () => {
        if(this.state.topOfHeader !== 0) {
            LayoutAnimation.configureNext(NEXT_LAYOUTANIAMTION)
            this.setState({
                topOfHeader:0,
            })
            this.preBarStyle && StatusBar.setBarStyle(this.preBarStyle,true)
        }
    }

    render() {
        const {topOfHeader} = this.state
        const {trendingStore} = this.props
        const {currentPage,maxPage,pageScale,refreshing,languageColor,trendingRepositoryList,loading} = trendingStore

        const data = trendingRepositoryList ? trendingRepositoryList.slice(0, pageScale * currentPage) : []

        return (

            <View style={{...GlobalStyle.root_container,backgroundColor: 'white'}}>
                <LoadingView indicatorSize={50} color={languageColor === 'white' ? 'black' :languageColor} loading={loading} style={{flex:1}}>
                    <View style={{top:topOfHeader}} onLayout={this._onHeaderContainerViewLayout}>
                        <HeaderOfHomePage/>
                    </View>

                    <View style={{top:topOfHeader}}>
                        <FlatList data={data}
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
                    </View>

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

const S = StyleSheet.create({
    currentLanguageSelectPaneContainer: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
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
