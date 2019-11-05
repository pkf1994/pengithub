import React, {Component} from 'react'
import {connect} from 'react-redux'
import {LayoutAnimation, TouchableNativeFeedback, StatusBar, StyleSheet, View, DeviceEventEmitter} from 'react-native';
import {CodeBottomTabItemScreen,IssuesBottomTabItemScreen,CustomBottomTabBar, HeaderOfRepositoryDetailPage} from './component'
import getParamsFromNavigation from '../../util/GetParamsFromNavigation';
import {createSyncAction_getRepositoryInfoData} from '../../redux/module/repositoryDetail/action';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {createBottomTabNavigator,createAppContainer} from 'react-navigation'
import {PanGestureHandler} from "react-native-gesture-handler";
import {
    EVENTS_HIDE_HEADER_OF_REPOSITORY_DETAIL_PAGE,
    EVENTS_SHOW_HEADER_OF_REPOSITORY_DETAIL_PAGE
} from "../DeviceEventConstant";

const NEXT_LAYOUTANIAMTION = LayoutAnimation.create(500, 'easeInEaseOut', 'opacity')

class RepositoryDetailPage extends Component{

    constructor(props) {
        super(props)
        this.state = {
            topOfHeader: 0,
            heightOfHeader: undefined,
            heightOfHeaderWrapper: 'auto',
            navigatorPaddingTop:0,
            showHeader: true
        }
    }

    componentDidMount(): void {
        this._getData()
        DeviceEventEmitter.addListener(EVENTS_HIDE_HEADER_OF_REPOSITORY_DETAIL_PAGE,this._hideHeader)
        DeviceEventEmitter.addListener(EVENTS_SHOW_HEADER_OF_REPOSITORY_DETAIL_PAGE,this._showHeader)
    }

    _initBottomTab() {
        if(this._bottomTabNavigator) return this._bottomTabNavigator
        return this._bottomTabNavigator = createAppContainer(createBottomTabNavigator({
            CodeTabItemScreen: {
                screen: CodeBottomTabItemScreen,
                navigationOptions: {
                    tabBarLabel: 'code',
                    tabBarIcon: ({tintColor}) => <FontAwesome name="code" size={24} style={{color:tintColor}}/>
                }
            },
            IssuesTabItemScreen: {
                screen: IssuesBottomTabItemScreen,
                navigationOptions: {
                    tabBarLabel: 'issues',
                    tabBarIcon: ({tintColor}) => <AntDesign name="exclamationcircleo" size={22} style={{color:tintColor}}/>
                }
            }
        },{
            tabBarComponent: CustomBottomTabBar,
            tabBarOptions: {
                activeTintColor: 'black'
            }
        }))
    }

    componentWillUnmount(): void {
        console.log("unmount: RepositoryDetail_index")
    }

    _getData = () => {
        const {repositoryModel} = getParamsFromNavigation(this.props)
        this.props.dispatchGetData(repositoryModel.owner,repositoryModel.repo)
    }

    _onHeaderLayout = ({nativeEvent}) => {
        if(!(nativeEvent.layout.height === 0)) {
            LayoutAnimation.configureNext(NEXT_LAYOUTANIAMTION)
            this.setState({
                heightOfHeader: nativeEvent.layout.height
            })
        }
    }

    _hideHeader = () => {
        if(!this.state.showHeader) return
        LayoutAnimation.configureNext(NEXT_LAYOUTANIAMTION)
        this.setState({
            showHeader: false,
            topOfHeader: -this.state.heightOfHeader,
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
                <View style={{height:heightOfHeaderWrapper}}>
                    <View  onLayout={this._onHeaderLayout} style={{top:topOfHeader}}>
                        <HeaderOfRepositoryDetailPage/>
                    </View>
                </View>
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
    dispatchGetData: (owner,repo) => {
        dispatch(createSyncAction_getRepositoryInfoData({},{owner:owner,repo:repo}))
    }
})

export default connect(mapState,mapActions)(RepositoryDetailPage)

const S = StyleSheet.create({
    countRow: {
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'stretch',
        /*  backgroundColor: '#F7F7F7',
          borderRadius: 10,*/
        /*borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'gray'*/
        paddingTop: 5,
        paddingHorizontal: 5
    },
    countItem: {
        flex:1,
        alignItems:'center'
    },
    countItemText: {
        fontSize: 20,
        lineHeight: 30,
        fontWeight: 'bold'
    },
    countItemLabel: {
        fontSize:12,
        color: '#808080',
        includeFontPadding:false
    }

})
