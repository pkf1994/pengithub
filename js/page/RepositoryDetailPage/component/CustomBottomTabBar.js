import React, {PureComponent} from 'react'
import {DeviceEventEmitter, LayoutAnimation, View, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import { BottomTabBar } from 'react-navigation';
import {
    EVENTS_HIDE_BOTTOM_TABBAR_OF_REPOSITORY_DETAIL_PAGE, EVENTS_HIDE_HEADER_OF_REPOSITORY_DETAIL_PAGE,
    EVENTS_SHOW_BOTTOM_TABBAR_OF_REPOSITORY_DETAIL_PAGE, EVENTS_SHOW_HEADER_OF_REPOSITORY_DETAIL_PAGE
} from "../../DeviceEventConstant";

const NEXT_LAYOUTANIAMTION = LayoutAnimation.create(500, 'easeInEaseOut', 'opacity')

class CustomBottomTabBar extends PureComponent{

    constructor(props) {
        super(props)
        this.state = {
            heightOfBottomTarBar: undefined,
            bottomOfBottomTabBar: 0,
        }
    }

    componentDidMount(): void {
        DeviceEventEmitter.addListener(EVENTS_HIDE_BOTTOM_TABBAR_OF_REPOSITORY_DETAIL_PAGE,this._hideBottomTabBar)
        DeviceEventEmitter.addListener(EVENTS_SHOW_BOTTOM_TABBAR_OF_REPOSITORY_DETAIL_PAGE,this._showBottomTabBar)
        this._getData()
    }

    componentWillUnmount(): void {
        DeviceEventEmitter.removeListener(EVENTS_HIDE_BOTTOM_TABBAR_OF_REPOSITORY_DETAIL_PAGE,this._hideBottomTabBar)
        DeviceEventEmitter.removeListener(EVENTS_SHOW_BOTTOM_TABBAR_OF_REPOSITORY_DETAIL_PAGE,this._showBottomTabBar)
    }

    _getData = () => {

    }

    _onLayout = ({nativeEvent}) => {
        if(!this.state.heightOfBottomTarBar){
            this.setState({
                heightOfBottomTarBar: nativeEvent.layout.height
            })
        }
    }


    _showBottomTabBar = () => {
        LayoutAnimation.configureNext(NEXT_LAYOUTANIAMTION)
        this.setState({
            bottomOfBottomTabBar: 0,
        })
    }

    _hideBottomTabBar = () => {
        LayoutAnimation.configureNext(NEXT_LAYOUTANIAMTION)
        this.setState({
            bottomOfBottomTabBar: -this.state.heightOfBottomTarBar,
        })
    }

    render() {
        const {bottomOfBottomTabBar} = this.state
        return (
                <View style={{position:'absolute',bottom:bottomOfBottomTabBar,left:0,right:0}} onLayout={this._onLayout}>
                    <BottomTabBar {...this.props} labelStyle={S.labelStyle} style={S.bottomTabBar} tabStyle={S.tabStyle}/>
                </View>
        )
    }

}

const mapState = state => ({
    repositoryDetailStore: state.repositoryDetail
})

export default connect(mapState,null)(CustomBottomTabBar)

const S = StyleSheet.create({
    bottomTabBar: {
        height: 60,
        paddingVertical: 5,
        elevation: 10
    }
})
