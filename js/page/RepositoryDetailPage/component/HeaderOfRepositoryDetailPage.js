import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View,Text,StyleSheet,TouchableNativeFeedback} from 'react-native'
import {Avatar,Divider} from 'react-native-elements'
import {CommonHeader, Badge, CollapsibleText, StretchInLoadedView} from '../../../component'
import getColorOfLanguage from '../../../util/getColorOfLanguage';
import getFontColorByBackgroundColor from '../../../util/getFontColorByBackgroundColor';
import getLighterOrDarkerColor from '../../../util/getLighterOrDarkerColor';
import {withNavigation} from 'react-navigation'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {starNumberformat} from "../../../util/starNumberFormat";
import getParamsFromNavigation from "../../../util/getParamsFromNavigation";

var Color = require('color')
//var topics = require('topics');
//var github_topics = require('github-topics');
//var http = require('http')

class HeaderOfRepositoryDetailPage extends Component{

    constructor(props) {
        super(props)
        const {repositoryDetailStore} = props
        const {repositoryModel} = getParamsFromNavigation(props)
        const {staticRepositoryDetailModel} = repositoryDetailStore
        const languageColor = getColorOfLanguage(repositoryModel.language)
        const subLanguageColor = getLighterOrDarkerColor(languageColor,0.2)
        const fontColor = getFontColorByBackgroundColor(subLanguageColor)
        this.state = {
            languageColor: languageColor,
            subLanguageColor: subLanguageColor,
            fontColor: fontColor
        }
    }

    _handleLicense = (license) => {
        if(license.length > 5) {
            return license.substring(0,5)
        }
        return license
    }

    _renderCountItem = (icon,label,count) => {
        return (
            <Badge containerStyle={{backgroundColor: '#F7F7F7',elevation: 0,paddingRight:5}}>
                {icon}
                <Text style={{fontWeight:'bold',color:'gray'}}>{label}</Text>
                <View style={{backgroundColor:'white',borderRadius:30,marginLeft:5, paddingHorizontal:10}}>
                    <Text style={{color:'gray'}}>{count}</Text>
                </View>
            </Badge>
        )
    }

 /*   _onLayoutRow1 = ({nativeEvent}) => {
        const {width,height} = nativeEvent.layout
        console.log("+++++++++++Row1++++++++++++")
        console.log("width:" + width)
        console.log("height:" + height)
        console.log("+++++++++++Row1++++++++++++")
    }

    _onLayoutName = ({nativeEvent}) => {
        const {width,height} = nativeEvent.layout
        console.log("+++++++++++Name++++++++++++")
        console.log("width:" + width)
        console.log("height:" + height)
        console.log("+++++++++++Name++++++++++++")
    }

    _onLayoutBadge = ({nativeEvent}) => {
        const {width,height} = nativeEvent.layout
        console.log("+++++++++++Badge++++++++++++")
        console.log("width:" + width)
        console.log("height:" + height)
        console.log("+++++++++++Badge++++++++++++")
    }

    _onLayoutRow2 = ({nativeEvent}) => {
        const {width,height} = nativeEvent.layout
        console.log("+++++++++++Row2++++++++++++")
        console.log("width:" + width)
        console.log("height:" + height)
        console.log("+++++++++++Row2++++++++++++")
    }

    _onLayoutAvatar = ({nativeEvent}) => {
        const {width,height} = nativeEvent.layout
        console.log("+++++++++++Avatar++++++++++++")
        console.log("width:" + width)
        console.log("height:" + height)
        console.log("+++++++++++Avatar++++++++++++")
    }

    _onLayoutOwner = ({nativeEvent}) => {
        const {width,height} = nativeEvent.layout
        console.log("+++++++++++Owner++++++++++++")
        console.log("width:" + width)
        console.log("height:" + height)
        console.log("+++++++++++Owner++++++++++++")
    }
*/
    _renderComprehensiveComponentOfHeader = () => {
        const {repositoryModel} = getParamsFromNavigation(this.props)
        const {repositoryDetailStore} = this.props
        const {languageColor,fontColor} = this.state
        const {repositoryInfoModel,staticRepositoryDetailModel,staticContributors,gettingRepositoryInfo} = repositoryDetailStore
        return (
            <View style={{flex:1}}>
                {/*语言 & License Type*/}

                <View style={S.row1}>
                    <Text style={[S.nameText,{flexShrink: -1}]}>
                        {repositoryModel.name}
                    </Text>



                    <Badge containerStyle={{backgroundColor: languageColor,alignSelf:'flex-start'}} onLayout={this._onLayoutBadge}>
                        <Text style={{color:fontColor,includeFontPadding: false,fontStyle: 'italic',fontWeight:'bold'}}>
                            {repositoryModel.language}
                        </Text>
                    </Badge>
                </View>

                <View style={S.row2}>
                    <Avatar rounded
                            containerStyle={S.avatarContainer}
                            source={{uri:repositoryModel.avatar}}
                            size="small"/>
                    <Text style={S.authorText}>
                        {repositoryModel.owner}
                    </Text>
                </View>
                <StretchInLoadedView loading={gettingRepositoryInfo}>

                    <CollapsibleText containerStyle={{padding: 10}}
                                     textStyle={{fontWeight:'100',color: '#5E5E5E'}}>
                        &nbsp;&nbsp;&nbsp;{repositoryInfoModel.description}
                    </CollapsibleText>
                    <Divider />

                    <View style={S.countRow}>
                        <TouchableNativeFeedback>
                            <View  style={S.countItem}>
                                <Text style={S.countItemText}>{starNumberformat(repositoryInfoModel.watchers_count)}</Text>
                                <Text style={S.countItemLabel}>Watch</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback>
                            <View style={S.countItem}>
                                <Text style={S.countItemText}>{starNumberformat(repositoryInfoModel.stargazers_count)}</Text>
                                <Text style={S.countItemLabel}>Star</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback>
                            <View style={S.countItem}>
                                <Text style={S.countItemText}>{repositoryInfoModel.forks_count}</Text>
                                <Text style={S.countItemLabel}>Fork</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback>
                            <View style={S.countItem}>
                                <Text style={S.countItemText}>{staticContributors.length}</Text>
                                <Text style={S.countItemLabel}>Contributors</Text>
                            </View>
                        </TouchableNativeFeedback>

                    </View>
                </StretchInLoadedView>

            </View>
        )
    }

    render() {
        const {backgroundColor} = this.state
        return  <CommonHeader comprehensiveComponent={this._renderComprehensiveComponentOfHeader()}
                               containerStyle={S.headerContainerStyle}
                               backgroundColor={backgroundColor}/>
    }
}

const mapState = state => ({
    repositoryDetailStore: state.repositoryDetail
})

const mapActions = dispatch => ({

})

export default connect(mapState,mapActions)(withNavigation(HeaderOfRepositoryDetailPage))

const S = StyleSheet.create({
    row1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    row2: {
        flexDirection: 'row',
       // backgroundColor: 'blue',
        marginTop: 5
    },
    row3: {
        marginTop: 10,
        flexDirection: 'row',
    },
    nameText: {
        fontSize: 34,
        fontWeight: 'bold'
    },
    avatarContainer: {
        marginRight: 10
    },
    authorText: {
        fontSize: 22
    },
    languageBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        padding: 4,
        elevation: 10,
        //borderWidth: 4
    },
    languageText: {
        fontSize: 14,
        fontWeight: 'bold',
        fontStyle: 'italic',
        includeFontPadding: false
    },
    headerContainerStyle: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 0,
    },
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
        paddingBottom: 10,
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
