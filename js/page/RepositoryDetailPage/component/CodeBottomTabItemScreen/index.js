import React, {Component} from 'react'
import {View, StyleSheet, Dimensions} from 'react-native'
import {createAppContainer} from 'react-navigation'
import FilesTopTabItemScreen from './FilesTopTabItemScreen'
import ReadmeTopTabItemScreen from './ReadmeTopTabItemScreen'
import {createMaterialTopTabNavigator,MaterialTopTabBar} from 'react-navigation-tabs'
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';

class CodeBottomTabItemScreen extends Component{

    state = {
        index: 0,
        routes: [
            { key: 'ReadmeTopTabItemScreen', title: 'README' },
            { key: 'FilesTopTabItemScreen', title: 'FILES' },
        ],
    }

    componentWillUnmount(): void {
        console.log("unmount: CodeBottomTabItemScreen")
    }


    render() {
        return ( <View style={{flex:1}}>
            <TabView
                renderTabBar={props => <TabBar {...props}
                                               tabStyle={S.tabStyle}
                                               style={S.tabBarStyle}
                                               indicatorStyle={S.indicatorStyle}
                                               labelStyle={S.labelStyle}/>}
                navigationState={this.state}
                renderScene={SceneMap({
                    ReadmeTopTabItemScreen: ReadmeTopTabItemScreen,
                    FilesTopTabItemScreen: FilesTopTabItemScreen,
                })}
                onIndexChange={index => this.setState({ index })}
                initialLayout={{ width: Dimensions.get('window').width }}
            />
        </View>)
    }
}


export default CodeBottomTabItemScreen


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
        margin: 0,
        color: 'black',
        fontSize: 14,
    }
})
