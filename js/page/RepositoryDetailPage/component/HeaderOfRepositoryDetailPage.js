import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View,Text,StyleSheet} from 'react-native'
import {Avatar} from 'react-native-elements'
import {CommonHeader,Badge,CollapsibleText} from '../../../component'
import getColorOfLanguage from '../../../util/getColorOfLanguage';
import getFontColorByBackgroundColor from '../../../util/getFontColorByBackgroundColor';
import getLighterOrDarkerColor from '../../../util/getLighterOrDarkerColor';
import Icon from 'react-native-vector-icons/FontAwesome5'
var Color = require('color')
//var topics = require('topics');
//var github_topics = require('github-topics');
//var http = require('http')

class HeaderOfRepositoryDetailPage extends Component{

    constructor(props) {
        super(props)
        const {repositoryDetailStore} = props
        const {staticRepositoryDetailModel} = repositoryDetailStore
        const languageColor = getColorOfLanguage(staticRepositoryDetailModel.language)
        const subLanguageColor = getLighterOrDarkerColor(languageColor,0.2)
        const fontColor = getFontColorByBackgroundColor(subLanguageColor)
        this.state = {
            languageColor: languageColor,
            subLanguageColor: subLanguageColor,
            fontColor: fontColor
        }
    }

    componentDidMount(): void {
        /*var topics = github_topics.gettopics('https://github.com/Aniket965/blog');
        console.log(topics);*/
    }


    _renderComprehensiveComponentOfHeader = () => {
        const {repositoryDetailStore} = this.props
        const {languageColor,fontColor,subLanguageColor} = this.state
        const {staticRepositoryDetailModel} = repositoryDetailStore
        return (
            <View style={{flex:1}}>
                {/*语言 & License Type*/}
                <View style={styles.row1}>
                    <Text style={styles.nameText}>
                        {staticRepositoryDetailModel.name}
                    </Text>



                    <Badge containerStyle={{backgroundColor: languageColor}}
                           textStyle={{color:fontColor,fontStyle: 'italic',fontWeight:'bold'}}>
                        {staticRepositoryDetailModel.language}
                    </Badge>
                </View>

                <View style={styles.row2}>
                    <Avatar rounded
                            containerStyle={styles.avatarContainer}
                            source={{uri:staticRepositoryDetailModel.owner.avatar_url}}
                            size="small"/>
                    <Text style={styles.authorText}>
                        {staticRepositoryDetailModel.owner.login}
                    </Text>
                </View>

                <CollapsibleText containerStyle={{margin: 10}}>
                    A better notebook for Scala (and more)
                    A better notebook for Scala (and more)
                    A better notebook for Scala (and more)
                </CollapsibleText>
            </View>
        )
    }

    render() {
        const {backgroundColor} = this.state
        return  <CommonHeader comprehensiveComponent={this._renderComprehensiveComponentOfHeader()}
                               containerStyle={styles.headerContainerStyle}
                               backgroundColor={backgroundColor}/>
    }
}

const mapState = state => ({
    repositoryDetailStore: state.repositoryDetail
})

const mapActions = dispatch => ({

})

export default connect(mapState,mapActions)(HeaderOfRepositoryDetailPage)

const styles = StyleSheet.create({
    row1: {
        flexDirection: 'row',
        alignItems: 'center',
       // backgroundColor: 'red',
        justifyContent: 'space-between'
    },
    row2: {
        flexDirection: 'row',
       // backgroundColor: 'blue',
        marginTop: 5
    },
    nameText: {
        fontSize: 34,
        fontWeight: 'bold'
    },
    avatarContainer: {
        marginRight: 10
    },
    authorText: {
        color: '#5E5E5E',
        fontSize: 22,
        includeFontPadding: false
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
        paddingBottom: 10,
    },
})
