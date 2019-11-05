import React, {PureComponent} from 'react'
import {View,Animated,Linking,StyleSheet,ProgressBarAndroid,Dimensions,DeviceEventEmitter} from 'react-native'
import {connect} from 'react-redux'
import {FadeInTransition} from "../../../../component";
import { WebView } from 'react-native-webview';
import {
    EVENTS_HIDE_HEADER_OF_REPOSITORY_DETAIL_PAGE,
    EVENTS_LAYOUT_HEADER_OF_REPOSITORY_DETAIL_PAGE, EVENTS_SHOW_HEADER_OF_REPOSITORY_DETAIL_PAGE
} from "../../../DeviceEventConstant";
import {Util_Throtte} from "../../../../util";

class ReadmeTopTabItemScreen extends PureComponent{

    constructor(props) {
        super(props)
        this.topAnimatedValue = new Animated.Value(0)
        this.state = {
            readmeData: undefined,
            heightOfHeaderOfRepositoryDetailPage: undefined,
            HTML: undefined,
        }
    }

    componentDidUpdate() {
    }

    componentWillUnmount(): void {
        console.log("ReadmeTopTabItemScreen: unmount")
    }

    static getDerivedStateFromProps = (nextProps,preState) => {
        if(nextProps.repositoryDetailStore.readme.data !== preState.readmeData) {
            return {
                readmeData: nextProps.repositoryDetailStore.readme.data,
                HTML: this._generateHTML(nextProps.repositoryDetailStore.readme.data)
            }
        }

        return null
    }

    static _generateHTML = (readmeData) => {
        const externalStyle = '<style>\n' +
            '    #readme{\n' +
            '        padding:10px\n' +
            '    }\n' +
            '    pre {\n' +
            '        white-space: pre;\n' +
            '        word-wrap: normal;\n' +
            '        overflow-x: auto;\n' +
            '        line-height: 1.5;\n' +
            '        padding: 10px;\n' +
            '        padding-right: 0;\n' +
            '        background: #eeeeee;\n' +
            '    }\n' +
            '    p,li{\n' +
            '        line-height: 1.7;\n' +
            '\n' +
            '    }\n' +
            '    .oction, .oction-link{\n' +
            '        opacity: 0;\n' +
            '    }\n' +
            '    .markdown-body h1, .markdown-body h2 {\n' +
            '        padding-bottom: .3em;\n' +
            '        border-bottom: 1px solid #eaecef;\n' +
            '    }\n' +
            '    blockquote {\n' +
            '        padding: 0 1em;\n' +
            '        color: #6a737d;\n' +
            '        border-left: .25em solid #dfe2e5;\n' +
            '    }\n' +
            '    .markdown-body table tr {\n' +
            '        background-color: #fff;\n' +
            '        border-top: 1px solid #c6cbd1;\n' +
            '    }\n' +
            '    tr {\n' +
            '        display: table-row;\n' +
            '        vertical-align: inherit;\n' +
            '        border-color: inherit;\n' +
            '    }\n' +
            '    .markdown-body table td, .markdown-body table th {\n' +
            '        padding: 6px 13px;\n' +
            '        border: 1px solid #dfe2e5;\n' +
            '    }\n' +
            '    .markdown-body table th {\n' +
            '        font-weight: 600;\n' +
            '    }\n' +
            '    .markdown-body{\n' +
            '        overflow-x: hidden;\n' +
            '    }\n' +
            '</style>\n' +
            '<script>\n' +
            '    function handleATag(){\n' +
            '        const host = window.location.host === \'\' ? \'about:blank\' : window.location.host\n' +
            '        let array = document.getElementsByTagName("a")\n' +
            '        for(let i = 0; i < array.length; i++){\n' +
            '\n' +
            '            if(array[i].href.indexOf(host) === -1) {\n' +
            '                continue\n' +
            '            }\n' +
            '\n' +
            '            if(array[i].hash.indexOf("#")===0){\n' +
            '                if(array[i].href) {\n' +
            '                    array[i].setAttribute("href",array[i].href.replace("#","#user-content-"))\n' +
            '                }\n' +
            '            }\n' +
            '        }\n' +
            '    }\n' +
            '    function handleSvgTag() {\n' +
            '        let array = document.getElementsByTagName("svg")\n' +
            '        for(let i = 0; i < array.length; i++){\n' +
            '            array[i].setAttribute("width",0)\n' +
            '        }\n' +
            '    }\n' +
            '    window.addEventListener(\'scroll\',() => {\n' +
            '        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;\n' +
            '        window.ReactNativeWebView.postMessage(scrollTop.toString())\n' +
            '    })\n' +
            '    handleATag()\n' +
            '    handleSvgTag()\n' +
            '</script>\n'
        return readmeData + externalStyle
    }

    _onShouldStartLoadWithRequest = (event) => {
        Linking.openURL(event.url)
        return false
    }

    _onMessage = ({nativeEvent}) => {
        if(nativeEvent.data !== "0") {
            Util_Throtte(() => {
                DeviceEventEmitter.emit(EVENTS_HIDE_HEADER_OF_REPOSITORY_DETAIL_PAGE)
            },500,"hideHeader",this)
            return
        }
        Util_Throtte(() => {
            DeviceEventEmitter.emit(EVENTS_SHOW_HEADER_OF_REPOSITORY_DETAIL_PAGE)
        },500,"showHeader",this)
    }

    render() {
        const {repositoryDetailStore} = this.props
        const {readme,repositoryInfo} = repositoryDetailStore
        const {data} = repositoryInfo
        const {svn_url,default_branch} = data
        const {HTML} = this.state
        return <View style={S.container}>
                <FadeInTransition>
                    {
                        readme.loading || repositoryInfo.loading ?
                            <ProgressBarAndroid  color="gray" styleAttr='Horizontal'
                                                 style={S.progressBar}
                                                 indeterminate={true}/>
                            :
                            <View style={{flex:1}}>
                                <WebView
                                    style={S.webView}
                                    originWhitelist={['*']}
                                    source={{html:HTML,baseUrl:svn_url + "/blob/" + default_branch + "/"}}
                                    javaScriptEnabled={true}
                                    domStorageEnabled={true}
                                    onMessage={this._onMessage}
                                    scalesPageToFit={false}
                                    onShouldStartLoadWithRequest={this._onShouldStartLoadWithRequest}
                                />
                            </View>
                    }
                </FadeInTransition>
        </View>
    }
}

const mapState = state => ({
    repositoryDetailStore: state.repositoryDetail
})

const mapActions = dispatch => ({

})

export default connect(mapState,mapActions)(ReadmeTopTabItemScreen)

const S = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',

    },
    progressBar: {
        width: Dimensions.get('window').width - 20
    },
    webView: {
        flex: 1,
        width: Dimensions.get('window').width
    }
})
