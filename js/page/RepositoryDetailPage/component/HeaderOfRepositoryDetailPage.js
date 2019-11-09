import React, {PureComponent,Fragment} from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet, TouchableNativeFeedback, ActivityIndicator,DeviceEventEmitter} from 'react-native'
import {Avatar,Divider} from 'react-native-elements'
import {CommonHeader, Badge, CollapsibleText, StretchInLoadedView,ZoomInTransition} from '../../../component'
import {withNavigation} from 'react-navigation'
import {Util_GetLightOrDarkerColor,
        Util_GetColorOfLanguage,
        Util_StarNumberFormat,
        Util_GetParamsFromNavigation,
        Util_GetFontColorByBackgroundColor} from "../../../util";
import Icon from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {EVENTS_LAYOUT_HEADER_OF_REPOSITORY_DETAIL_PAGE} from "../../DeviceEventConstant";
import {createAsyncAction_getContributorsCountData} from "../../../redux/module/repositoryDetail/action";


class HeaderOfRepositoryDetailPage extends PureComponent{

    constructor(props) {
        super(props)
        const {repositoryModel} = Util_GetParamsFromNavigation(props)
        const languageColor = Util_GetColorOfLanguage(repositoryModel.language)
        const subLanguageColor = Util_GetLightOrDarkerColor(languageColor,0.2)
        const fontColor = Util_GetFontColorByBackgroundColor(subLanguageColor)
        this.state = {
            languageColor: languageColor,
            subLanguageColor: subLanguageColor,
            fontColor: fontColor,
        }
    }

    componentDidMount(): void {
        this._getData()
    }

    _getData = () => {
        const {repositoryModel} = Util_GetParamsFromNavigation(this.props)
        this.props.dispatch_getContributorsCount(repositoryModel)
    }


    _onLayout = ({nativeEvent}) => {
        DeviceEventEmitter.emit(EVENTS_LAYOUT_HEADER_OF_REPOSITORY_DETAIL_PAGE,nativeEvent)
    }


    render() {
        const {repositoryModel} = Util_GetParamsFromNavigation(this.props)
        const {repositoryDetailStore,goBack} = this.props
        const {languageColor,backgroundColor,fontColor} = this.state
        const {repositoryInfo,contributorCount} = repositoryDetailStore
        return  <CommonHeader
                               containerStyle={S.headerContainerStyle}
                              backgroundColor={backgroundColor}>
            <View style={{flex:1}} onLayout={this._onLayout}>

                <View style={S.row1}>
                    <Text style={[S.nameText,{flexShrink: -1}]}>
                        {repositoryModel.repo}
                    </Text>

                    <TouchableNativeFeedback  onPress={goBack}>
                        <View style={S.goBackBtn}>
                            <Icon name="left" size={16} color="gray"/>
                        </View>
                    </TouchableNativeFeedback>

                    <View style={S.badges}>

                        <ZoomInTransition duration={500}>
                            {
                                repositoryInfo.requestErr &&
                                <MaterialIcons color="#D52B2B" name="error-outline" size={24} style={{marginLeft:5}}/>
                            }
                        </ZoomInTransition>

                        <ZoomInTransition equalityKey={repositoryInfo.loading} duration={500}>
                            {
                                repositoryInfo.loading ? <ActivityIndicator color="gray" style={{marginLeft:5}}/>
                                :
                                    (
                                        repositoryInfo.data.license &&
                                        <Badge containerStyle={{backgroundColor: "#eeeeee",marginLeft:5}}>
                                            <Text style={{includeFontPadding: false}}>
                                                {repositoryInfo.data.license.spdx_id}
                                            </Text>
                                        </Badge>
                                    )
                            }
                        </ZoomInTransition>


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

                <StretchInLoadedView loading={repositoryInfo.loading}>

                    {
                        repositoryInfo.data.description && repositoryInfo.data.description.trim() !== '' &&
                        <Fragment>
                            <CollapsibleText containerStyle={{padding: 10,paddingTop:0}}
                                             textStyle={{fontWeight:'100',color: '#5E5E5E'}}>
                                &nbsp;&nbsp;&nbsp;{repositoryInfo.data.description}
                            </CollapsibleText>
                            <Divider />
                        </Fragment>
                    }


                    <View style={S.countRow}>
                        <TouchableNativeFeedback>
                            <View  style={S.countItem}>
                                <Text style={S.countItemText}>{Util_StarNumberFormat(repositoryInfo.data.watchers_count)}</Text>
                                <Text style={S.countItemLabel}>Watch</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback>
                            <View style={S.countItem}>
                                <Text style={S.countItemText}>{Util_StarNumberFormat(repositoryInfo.data.stargazers_count)}</Text>
                                <Text style={S.countItemLabel}>Star</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback>
                            <View style={S.countItem}>
                                <Text style={S.countItemText}>{repositoryInfo.data.forks_count}</Text>
                                <Text style={S.countItemLabel}>Fork</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback>
                            <View style={S.countItem}>
                                <Text style={S.countItemText}>{contributorCount.loading ? "-" : contributorCount.data}</Text>
                                <Text style={S.countItemLabel}>Contributors</Text>
                            </View>
                        </TouchableNativeFeedback>

                    </View>
                </StretchInLoadedView>

            </View>
        </CommonHeader>
    }
}

const mapState = state => ({
    repositoryDetailStore: state.repositoryDetail
})

const mapActions = dispatch => ({
    dispatch_getContributorsCount: (repositoryModel) => {
        dispatch(createAsyncAction_getContributorsCountData({},{
            owner: repositoryModel.owner,
            repo: repositoryModel.repo
        }))
    }
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
        flexDirection: 'row',
        alignItems: 'center'
    },
    row2: {
        flexDirection: 'row',
       // backgroundColor: 'blue',
        marginVertical: 5
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
