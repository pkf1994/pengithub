import React, {Component} from 'react'
import {connect} from 'react-redux'
import {LayoutAnimation,BackHandler,StatusBar, StyleSheet, View,Text, DeviceEventEmitter,Animated} from 'react-native';
import {CodeBottomTabItemScreen,IssuesBottomTabItemScreen,CustomBottomTabBar, HeaderOfRepositoryDetailPage} from './component'
import getParamsFromNavigation from '../../util/GetParamsFromNavigation';
import {createAsyncAction_getRepositoryInfoData} from '../../redux/module/repositoryDetail/action';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {createBottomTabNavigator,createAppContainer} from 'react-navigation'
import {
    EVENTS_HIDE_HEADER_OF_REPOSITORY_DETAIL_PAGE,
    EVENTS_SHOW_HEADER_OF_REPOSITORY_DETAIL_PAGE
} from "../DeviceEventConstant";
import ComprehensiveNavigationActionsBuilder from "../../navigation/ComprehensiveNavigationActions";
import {ROUTES_KEY_ReadmeTopTabItemScreen} from "./component/CodeBottomTabItemScreen";

const NEXT_LAYOUTANIAMTION = LayoutAnimation.create(500, 'easeInEaseOut', 'opacity')

class RepositoryDetailPage extends Component{

    constructor(props) {
        super(props)
        this.fetchAbortController = new AbortController()
        this.scrollMappingAnimatedValue = new Animated.Value(0)
        this.heightOfHeader = undefined
        this.state = {
            topOfHeader: 0,
            heightOfHeaderWrapper: 'auto',
            navigatorPaddingTop:0,
            showHeader: true
        }
    }

    componentDidMount(): void {
        console.log('repository detail page did mount')
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this._goBack);
        this._getData(this.fetchAbortController)
        DeviceEventEmitter.addListener(EVENTS_HIDE_HEADER_OF_REPOSITORY_DETAIL_PAGE,this._hideHeader)
        DeviceEventEmitter.addListener(EVENTS_SHOW_HEADER_OF_REPOSITORY_DETAIL_PAGE,this._showHeader)
    }

    componentWillUnmount(): void {
        this.fetchAbortController.abort()
        console.log('repository detail page will unmount')
        this.backHandler.remove();
        DeviceEventEmitter.removeListener(EVENTS_HIDE_HEADER_OF_REPOSITORY_DETAIL_PAGE,this._hideHeader)
        DeviceEventEmitter.removeListener(EVENTS_SHOW_HEADER_OF_REPOSITORY_DETAIL_PAGE,this._showHeader)
    }

    _goBack = () => {
        console.log('try to go back')
        ComprehensiveNavigationActionsBuilder.getComprehensiveNavigationActions().goBack(this.props.navigation)
        return true
    }

    _initBottomTab = () => {
        if(this._bottomTabNavigator) return this._bottomTabNavigator
        const {repositoryModel} = getParamsFromNavigation(this.props)
        return this._bottomTabNavigator = createAppContainer(createBottomTabNavigator({
            CodeTabItemScreen: {
                screen: props => <CodeBottomTabItemScreen {...props}
                                                          updateAnimatedInterpolate={this.updateAnimatedInterpolate}
                                                          scrollMappingAnimatedValue={this.scrollMappingAnimatedValue}
                                                          repositoryModel={repositoryModel}/>,
                navigationOptions: {
                    tabBarLabel: 'code',
                    tabBarIcon: ({tintColor}) => <FontAwesome name="code"
                                                              size={24}
                                                              style={{color:tintColor}}/>
                }
            },
            IssuesTabItemScreen: {
                screen: IssuesBottomTabItemScreen,
                navigationOptions: {
                    tabBarLabel: 'issues',
                    tabBarIcon: ({tintColor}) => <AntDesign name="exclamationcircleo"
                                                            size={22}
                                                            style={{color:tintColor}}/>
                }
            }
        },{
            tabBarComponent: CustomBottomTabBar,
            tabBarOptions: {
                activeTintColor: 'black'
            }
        }))
    }

    _getData = (abortController ) => {
        const {repositoryModel} = getParamsFromNavigation(this.props)
        this.props.dispatch_getData(repositoryModel.owner,repositoryModel.repo,abortController)
    }

    updateAnimatedInterpolate = () => {

        this.setState({
            heightOfHeaderWrapper: this.scrollMappingAnimatedValue.interpolate({
                inputRange: [0,270,271,280],
                outputRange: [this.heightOfHeader,0,0,0]
            }),
            topOfHeader: this.scrollMappingAnimatedValue.interpolate({
                inputRange: [0,270,271,280],
                outputRange: [0,-this.heightOfHeader,-this.heightOfHeader,-this.heightOfHeader]
            })
        })
    }

    _onHeaderLayout = ({nativeEvent}) => {
        if(nativeEvent.layout.height !== 0) {
            this.heightOfHeader = nativeEvent.layout.height
            const {routesKey} = this.props.repositoryDetailStore
            if(routesKey === ROUTES_KEY_ReadmeTopTabItemScreen) return
            this.updateAnimatedInterpolate()
        }
    }

    _hideHeader = () => {
        if(!this.state.showHeader) return
        LayoutAnimation.configureNext(NEXT_LAYOUTANIAMTION)
        this.setState({
            showHeader: false,
            topOfHeader: - this.heightOfHeader,
            heightOfHeaderWrapper: 0,
            navigatorPaddingTop: StatusBar.currentHeight,
        })
    }

    _showHeader = () => {
        if(this.state.showHeader) return
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        this.setState({
            showHeader: true,
            topOfHeader:0,
            heightOfHeaderWrapper: 'auto',
            navigatorPaddingTop: 0,
        })
    }

    render() {
        const {topOfHeader,heightOfHeaderWrapper,navigatorPaddingTop} = this.state
        const BottomTabNavigator = this._initBottomTab()
        return (
            <View style={{flex:1}}>
                <Animated.View style={{height:heightOfHeaderWrapper}}>
                    <Animated.View onLayout={this._onHeaderLayout}
                                   style={{top:topOfHeader}}>
                        <HeaderOfRepositoryDetailPage goBack={this._goBack}/>
                    </Animated.View>
                </Animated.View>
                <View style={{height: navigatorPaddingTop}}/>
                <BottomTabNavigator/>
            </View>
        )
    }
}

const mapState = state => ({
    repositoryDetailStore: state.repositoryDetail,
})

const mapActions = dispatch => ({
    dispatch_getData: (owner,repo,abortController) => {
        dispatch(createAsyncAction_getRepositoryInfoData({fetchOption:{signal:abortController.signal}},{owner:owner,repo:repo}))
    }
})

export default connect(mapState,mapActions)(RepositoryDetailPage)

const S = StyleSheet.create({
    headerContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0
    }
})
