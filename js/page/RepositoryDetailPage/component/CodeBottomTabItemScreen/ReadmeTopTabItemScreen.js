import React, {Component} from 'react'
import {View,Text,Image,Animated,ScrollView,StyleSheet,ProgressBarAndroid,Dimensions,DeviceEventEmitter} from 'react-native'
import {connect} from 'react-redux'
import {Util_DecodeBase64} from '../../../../util'
import {FadeInTransition} from "../../../../component";
import FitImage from 'react-native-fit-image';
import MarkdownIt from 'markdown-it';
import { WebView } from 'react-native-webview';
import {EVENTS_LAYOUT_HEADER_OF_REPOSITORY_DETAIL_PAGE} from "../../../DeviceEventConstant";

class ReadmeTopTabItemScreen extends Component{

    constructor(props) {
        super(props)
        this.topAnimatedValue = new Animated.Value(0),
        this.state = {
            heightOfHeaderOfRepositoryDetailPage: undefined
        }
    }

    _getData() {

    }


    componentDidMount() {
        this._getData()
        DeviceEventEmitter.addListener(EVENTS_LAYOUT_HEADER_OF_REPOSITORY_DETAIL_PAGE,(nativeEvent) => {
            const height = nativeEvent.layout.height
            this.animatedTop = this.topAnimatedValue.interpolate({
                inputRange: [0, 270, 271, 280],
                outputRange:[0,-height,-height,-height]
            })
            this.animatedScro = this.topAnimatedValue.interpolate({
                inputRange: [0, 270, 271, 280],
                outputRange:[0,-height,-height,-height]
            })
        })
    }

    render() {
        const {repositoryDetailStore} = this.props
        const {readme} = repositoryDetailStore
        const {data} = readme
        const externalStyle = '<style type="text/css">\n' +
            '    body {padding:10px}\n' +
            '</style>'

        return <View style={S.container}>
                <FadeInTransition>
                    {
                        readme.loading ?
                            <ProgressBarAndroid  color="gray" styleAttr='Horizontal'
                                                 style={S.progressBar}
                                                 indeterminate={true}/>
                            :
                            <View style={{flex:1}}>
                                <WebView
                                    style={S.webView}
                                    originWhitelist={['*']}
                                    source={{ html: '<body>' + data + '</body>' + externalStyle}}
                                    javaScriptEnabled={true}
                                    domStorageEnabled={true}
                                    scalesPageToFit={false}
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
