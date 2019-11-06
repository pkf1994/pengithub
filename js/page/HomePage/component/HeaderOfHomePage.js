import React, {PureComponent} from 'react'
import {
    StyleSheet,
    View,
    Animated,Text
} from 'react-native';
import {connect} from 'react-redux'
var Color = require('color');
import {Util_DateFormat} from '../../../util';
import {CommonHeader,FadeChangeText,IconMaskedPicker,FadeInView,AnimatedIcons} from '../../../component';
import {CommonAction, CommonActionId} from '../../../redux/module/commonActionType';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SINCE_TYPE, TRENDING_LANGUAGE} from '../../../redux/module/trending/reducer';
import {createSyncAction_getTrendingData} from '../../../redux/module/trending/action';

import {URL} from '../index';
import getFontColorByBackgroundColor from '../../../util/GetFontColorByBackgroundColor';
import FadeInTransition from "../../../component/FadeInTransition";

class HeaderOfHomePage extends PureComponent{
    constructor(props) {
        super(props)
        const {trendingStore} = props
        const {trendingLanguage,since} = trendingStore
        this.state = {
            trendingLanguage: trendingLanguage,
            since: since
        }
    }

    componentDidMount(): void {
        console.log('mounted')
    }

    _updateTrendingLanguage = (value) => {
        this.setState({
            trendingLanguage: value
        })

        this.props.dispatchUpdateTrendingLanguage(value)

    }

    _updateTrendingSince = (value) => {
        this.setState({
            since: value
        })

        this.props.dispatchUpdateTrendingSince(value)

    }



    _renderComprehensiveComponentOfHeader() {
        const {trendingLanguage,since} = this.state
        const {trendingStore} = this.props
        const {loading,refreshing,loadingMore,languageColor,allLanguageList,firstIn} = trendingStore
        const pickerEnabled = !loading && !refreshing && !loadingMore && !firstIn
        var sinceList = []
        for(var _since in SINCE_TYPE) {
            sinceList.push(SINCE_TYPE[_since])
        }
        var sinceStr
        switch (since) {
            case SINCE_TYPE.DAILY:
                sinceStr = 'Today'
                break
            case SINCE_TYPE.WEEKLY:
                sinceStr = 'This week'
                break
            case SINCE_TYPE.MONTHLY:
                sinceStr = 'This month'
                break
            default:
                sinceStr = Util_DateFormat()
        }
        let fontColor = getFontColorByBackgroundColor(languageColor)
        let subFontColor = languageColor === 'white' ? 'gray' : getFontColorByBackgroundColor(languageColor)
        const textAnimateDelay = 500
        return (
            <View style={{flex:1}}>
                <Animated.View style={{flexDirection:'row'}}>
                    <FadeInTransition>
                        <Text duration={500} delay={textAnimateDelay} style={{color:subFontColor}}>
                            {sinceStr}
                        </Text>
                    </FadeInTransition>

                    <FadeInTransition>
                        <Text duration={500} delay={textAnimateDelay} style={{color:subFontColor}}>
                            {trendingLanguage === 'Any' ? '' : '  Trending'}
                        </Text>
                    </FadeInTransition>
                </Animated.View>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <FadeInTransition>
                        <Text style={{flexShrink:-1,fontSize: 34 ,fontWeight: "bold",color:fontColor,includeFontPadding: false}}
                              numberOfLines={1}
                              ellipsizeMode={'tail'}>
                            {trendingLanguage === 'Any' ? 'Trending' : trendingLanguage}
                        </Text>
                    </FadeInTransition>

                    <View style={{flexDirection:'row'}}>
                        <FadeInTransition>
                            <IconMaskedPicker  mode = 'dropdown'
                                               icon={<AntDesign
                                                   name="filter"
                                                   size={30}
                                                   style={{color: fontColor,opacity: pickerEnabled ? 1:0}}
                                               />}
                                               enabled={pickerEnabled}
                                               selectedValue = {trendingLanguage}
                                               pickerItemList={allLanguageList}
                                               onValueChange = {this._updateTrendingLanguage}/>
                        </FadeInTransition>
                        <FadeInTransition>
                            <IconMaskedPicker  mode = 'dropdown'
                                               icon={<MaterialCommunityIcons
                                                   name="calendar-range"
                                                   size={30}
                                                   style={{color: fontColor,opacity: pickerEnabled ? 1:0}}
                                               />}
                                               enabled={pickerEnabled}
                                               selectedValue = {since}
                                               pickerItemList={sinceList}
                                               onValueChange = {this._updateTrendingSince}/>
                        </FadeInTransition>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        const {trendingStore} = this.props
        const {languageColor} = trendingStore
        return (
            <CommonHeader comprehensiveComponent={this._renderComprehensiveComponentOfHeader()}
                          containerStyle={styles.headerContainerStyle}
                          backgroundColor={languageColor}
                          statusBarProps={{barStyle:'dark-content'}}/>
        )

    }
}

const mapState = (state) => ({
    trendingStore: state.trending
})

const mapActions = dispatch => ({
    dispatchUpdateTrendingLanguage: (trendingLanguage) => {
        dispatch({
            type: CommonAction.UPDATE_VALUE,
            payload: {
                id: CommonActionId.UPDATE_TRENDING_LANGUAGE,
                trendingLanguage: trendingLanguage
            }
        })
    },
    dispatchUpdateTrendingSince: (since) => {
        dispatch({
            type: CommonAction.UPDATE_VALUE,
            payload: {
                id: CommonActionId.UPDATE_TRENDING_SINCE,
                since: since
            }
        })
    }
})

export default connect(mapState,mapActions)(HeaderOfHomePage);

const styles = StyleSheet.create({
    currentLanguageButtonContainer: {
        borderColor: '#EEEEEE',
        borderRadius: 50,
        minWidth: 60
    },
    currentLanguageButtonTitle: {
        color: 'black',
        fontSize: 18
    },
    headerContainerStyle: {
        paddingLeft: 10,
        paddingRight: 0,
        paddingTop: 10,
        paddingBottom: 10,
    },
    picker: {
        width: 60,
    }
})
