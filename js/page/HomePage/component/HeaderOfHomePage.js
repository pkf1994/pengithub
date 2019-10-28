import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Animated,
} from 'react-native';
import {connect} from 'react-redux'
var Color = require('color');
import {getCurrentFormatDate} from '../../../util/DateFormat';
import {CommonHeader,FadeChangeText,IconMaskedPicker,FadeInView,AnimatedIcons} from '../../../component';
import {CommonAction, CommonActionId} from '../../../redux/module/commonActionType';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SINCE_TYPE, TRENDING_LANGUAGE} from '../../../redux/module/trending/reducer';
import {createSyncAction_getTrendingData} from '../../../redux/module/trending/action';

import {URL} from '../index';
import getFontColorByBackgroundColor from '../../../util/getFontColorByBackgroundColor';

class HeaderOfHomePage extends Component{
    constructor(props) {
        super(props)
        const {trendingStore} = props
        const {trendingLanguage,since} = trendingStore
        this.state = {
            trendingLanguage: trendingLanguage,
            since: since
        }
    }

    _updateTrendingLanguage = (value) => {
        this.setState({
            trendingLanguage: value
        })

        this.props.dispatchUpdateTrendingLanguage(value)
        const {since} = this.state
        this._getData(value,since,false)
    }

    _updateTrendingSince = (value) => {
        this.setState({
            since: value
        })

        this.props.dispatchUpdateTrendingSince(value)
        const {trendingLanguage} = this.state
        this._getData(trendingLanguage,value,false)
    }

    _getData(language,since,refresh) {
        const {trendingStore} = this.props
        if(trendingStore.loading) return
        this.props.dispatchGetData(refresh,language,since)
    }

    _renderComprehensiveComponentOfHeader() {
        const {trendingLanguage,since} = this.state
        const {trendingStore} = this.props
        const {loading,refreshing,loadingMore,languageColor,allLanguageList} = trendingStore
        const pickerEnabled = !loading && !refreshing && !loadingMore
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
                sinceStr = getCurrentFormatDate()
        }
        let fontColor = getFontColorByBackgroundColor(languageColor)
        let subFontColor = languageColor === 'white' ? 'gray' : getFontColorByBackgroundColor(languageColor)
        const textAnimateDelay = 500
        return (
            <View style={{flex:1}}>
                <Animated.View style={{flexDirection:'row'}}>
                    <FadeChangeText needToChangeWidth={true} duration={500} delay={textAnimateDelay} style={{color:subFontColor}}>
                        {sinceStr}
                    </FadeChangeText>
                    <FadeChangeText duration={500} delay={textAnimateDelay} style={{color:subFontColor}}>
                        {trendingLanguage === 'Any' ? '' : '  Trending'}
                    </FadeChangeText>
                </Animated.View>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <FadeChangeText duration={500}
                                    delay={textAnimateDelay}
                                    style={{fontSize: trendingLanguage.length > 10 ? 30 : 34 ,fontWeight: "bold",color:fontColor,includeFontPadding: false}}
                                    containerStyle={{flexShrink:-1}}
                                    numberOfLines={1}
                                    ellipsizeMode={'tail'}>
                        {trendingLanguage === 'Any' ? 'Trending' : trendingLanguage}
                    </FadeChangeText>


                    <View style={{flexDirection:'row'}}>
                        <IconMaskedPicker  mode = 'dropdown'
                                           icon={<AnimatedIcons
                                               iconSet={AntDesign}
                                               name="filter"
                                               size={30}
                                               style={{color: fontColor,opacity: pickerEnabled ? 1:0}}
                                           />}
                                           enabled={pickerEnabled}
                                           selectedValue = {trendingLanguage}
                                           pickerItemList={allLanguageList}
                                           onValueChange = {this._updateTrendingLanguage}/>
                        <IconMaskedPicker  mode = 'dropdown'
                                           icon={<AnimatedIcons
                                               iconSet={MaterialCommunityIcons}
                                               name="calendar-range"
                                               size={30}
                                               style={{color: fontColor,opacity: pickerEnabled ? 1:0}}
                                           />}
                                           enabled={pickerEnabled}
                                           selectedValue = {since}
                                           pickerItemList={sinceList}
                                           onValueChange = {this._updateTrendingSince}/>
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
    dispatchGetData: (refresh,trendingLanguage,since) => {
        dispatch(createSyncAction_getTrendingData({refresh: refresh},{trendingLanguage:trendingLanguage,since:since}))
    },
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
