import React, {Component} from 'react'
import {View, StyleSheet, Dimensions, DeviceEventEmitter} from 'react-native'
import {createAppContainer} from 'react-navigation'
import {connect} from 'react-redux'
import FilesTopTabItemScreen from './FilesTopTabItemScreen'
import ReadmeTopTabItemScreen from './ReadmeTopTabItemScreen'
import {createMaterialTopTabNavigator,MaterialTopTabBar} from 'react-navigation-tabs'
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
import {
    EVENTS_HIDE_HEADER_OF_REPOSITORY_DETAIL_PAGE,
    EVENTS_SHOW_HEADER_OF_REPOSITORY_DETAIL_PAGE
} from "../../../DeviceEventConstant";
import {CommonAction, CommonActionId} from "../../../../redux/module/commonActionType";

export const ROUTES_KEY_ReadmeTopTabItemScreen = "ReadmeTopTabItemScreen"
export const ROUTES_KEY_FilesTopTabItemScreen = "FilesTopTabItemScreen"

class CodeBottomTabItemScreen extends Component{

    state = {
        index: 0,
        routes: [
            { key: ROUTES_KEY_ReadmeTopTabItemScreen, title: 'README' },
            { key: ROUTES_KEY_FilesTopTabItemScreen, title: 'FILES' },
        ],
    }

    _updateCodeBottomTabItemScreenTopTabStatus = (index) => {
        const {updateAnimatedInterpolate} = this.props
        if(this.state.routes[index] !== ROUTES_KEY_ReadmeTopTabItemScreen) {
            updateAnimatedInterpolate()
        }
        this.setState({ index })
        this.props.dispatch_updateCodeBottomTabItemScreenTopTabStatus(this.state.routes[index])
    }

    render() {
        const {scrollMappingAnimatedValue} = this.props
        return ( <View style={{flex:1}}>
            <TabView
                renderTabBar={props => <TabBar {...props}
                                               tabStyle={S.tabStyle}
                                               style={S.tabBarStyle}
                                               indicatorStyle={S.indicatorStyle}
                                               labelStyle={S.labelStyle}/>}
                navigationState={this.state}
                renderScene={({ route, jumpTo }) => {
                        switch (route.key) {
                        case 'ReadmeTopTabItemScreen':
                            return <ReadmeTopTabItemScreen jumpTo={jumpTo}
                                                           repositoryModel={this.props.repositoryModel}/>;
                        case 'FilesTopTabItemScreen':
                            return <FilesTopTabItemScreen jumpTo={jumpTo}
                                                          scrollMappingAnimatedValue={scrollMappingAnimatedValue}
                                                          repositoryModel={this.props.repositoryModel}/>;
                        }
                    }
                }
                onIndexChange={this._updateCodeBottomTabItemScreenTopTabStatus}
                initialLayout={{ width: Dimensions.get('window').width }}
            />
        </View>)
    }
}

const mapState = state => ({

})

const mapActions = dispatch => ({
    dispatch_updateCodeBottomTabItemScreenTopTabStatus: (routesKey) => {
        dispatch({
            type: CommonAction.UPDATE_VALUE,
            payload: {
                id: CommonActionId.UPDATE_CODE_BOTTOM_TAB_ITEM_SCREEN_ROUTES_KEY,
                value: routesKey
            }
        })
    }
})

export default connect(mapState,mapActions)(CodeBottomTabItemScreen)


const S = StyleSheet.create({
    tabStyle: {
        width: 'auto'
    },
    tabBarStyle: {
        backgroundColor: 'white',
    },
    indicatorStyle: {
        height: 2,
        flex: -1,
        backgroundColor: 'gray'
    },
    labelStyle: {
        fontWeight: 'bold',
        margin: 0,
        color: 'black',
        fontSize: 14,
    }
})
