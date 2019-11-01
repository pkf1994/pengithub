import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet, TouchableNativeFeedback, ActivityIndicator  } from 'react-native'
import {Avatar,Divider} from 'react-native-elements'
import {CommonHeader, Badge, CollapsibleText, StretchInLoadedView,ZoomInView} from '../../../component'
import getColorOfLanguage from '../../../util/getColorOfLanguage';
import getFontColorByBackgroundColor from '../../../util/getFontColorByBackgroundColor';
import getLighterOrDarkerColor from '../../../util/getLighterOrDarkerColor';
import {withNavigation} from 'react-navigation'
import {starNumberformat} from "../../../util/starNumberFormat";
import getParamsFromNavigation from "../../../util/getParamsFromNavigation";
import Icon from 'react-native-vector-icons/AntDesign'


class HeaderOfRepositoryDetailPage extends Component{

    constructor(props) {
        super(props)
        const {repositoryModel} = getParamsFromNavigation(props)
        const languageColor = getColorOfLanguage(repositoryModel.language)
        const subLanguageColor = getLighterOrDarkerColor(languageColor,0.2)
        const fontColor = getFontColorByBackgroundColor(subLanguageColor)
        this.state = {
            languageColor: languageColor,
            subLanguageColor: subLanguageColor,
            fontColor: fontColor,
        }
    }


    _goBack = () => {
        this.props.navigation.goBack()
    }

    _renderComprehensiveComponentOfHeader = () => {
        const {repositoryModel} = getParamsFromNavigation(this.props)
        const {repositoryDetailStore} = this.props
        const {languageColor,fontColor} = this.state
        const {repositoryInfoModel,contributorCount,gettingRepositoryInfo,gettingContributors} = repositoryDetailStore
        return (
            <View style={{flex:1}}>

                <View style={S.row1}>
                    <Text style={[S.nameText,{flexShrink: -1}]}>
                        {repositoryModel.name}
                    </Text>

                    <TouchableNativeFeedback  onPress={this._goBack}>
                        <View style={S.goBackBtn}>
                            <Icon name="left" size={16} color="gray"/>
                        </View>
                    </TouchableNativeFeedback>

                    <View style={S.badges}>
                        <ZoomInView duration={500}>
                            {
                                gettingRepositoryInfo && <ActivityIndicator color="gray" style={{marginLeft:5}}/>
                            }
                        </ZoomInView>

                        <ZoomInView duration={500}>
                            {
                                repositoryInfoModel.license && !gettingRepositoryInfo &&
                                <Badge containerStyle={{backgroundColor: "#eeeeee"}}>
                                    <Text style={{includeFontPadding: false}}>
                                        {repositoryInfoModel.license.spdx_id}
                                    </Text>
                                </Badge>
                            }
                        </ZoomInView>

                        <Badge containerStyle={{backgroundColor: repositoryModel.languageColor ? repositoryModel.languageColor : languageColor,marginLeft:5}}>
                            <Text style={{color:fontColor,includeFontPadding: false,fontStyle: 'italic',fontWeight:'bold'}}>
                                {repositoryModel.language ? repositoryModel.language : 'unknow'}
                            </Text>
                        </Badge>



                    </View>
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
                                <Text style={S.countItemText}>{gettingContributors ? "-" : contributorCount}</Text>
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
        paddingTop: 25,
    },
    goBackBtn: {
        position: "absolute",
        padding: 5,
        paddingLeft: 5,
        paddingRight: 7,
        backgroundColor: '#eeeeee',
        borderRadius: 50,
        top: 0,
        left: 0,
    },
    badges: {
        position: "absolute",
        top: 0,
        right: 0,
        flexDirection: 'row'
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
        paddingTop: 5,
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
