import React, {Component} from 'react'
import {View,Text} from 'react-native'
import {connect} from 'react-redux'
import LoadingView from "../../../../component/LoadingView";
class ReadmeTopTabItemScreen extends Component{

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    _getData() {

    }

    componentDidMount() {
        this._getData()
    }

    render() {
        const {repositoryDetailStore} = this.props
        const {gettingReadme} = repositoryDetailStore
        return <View style={{flex:1}}>
           <LoadingView loading={gettingReadme} indicatorSize="large">

           </LoadingView>
        </View>
    }
}

const mapState = state => ({
    repositoryDetailStore: state.repositoryDetail
})

const mapActions = dispatch => ({

})

export default connect(mapState,mapActions)(ReadmeTopTabItemScreen)
