import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View,Text} from 'react-native';
import {HeaderOfRepositoryDetailPage} from './component'
import getParamsFromNavigation from '../../util/getParamsFromNavigation';
import {createSyncAction_getRepositoryDetailData} from '../../redux/module/repositoryDetail/action';

class RepositoryDetailPage extends Component{

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount(): void {
        //this._getData()
    }

    _getData = () => {
        const params = getParamsFromNavigation(this.props)
        const {repositoryModel} = params
        this.props.dispatchGetData(repositoryModel.author,repositoryModel.name)
    }

    render() {
        const params = getParamsFromNavigation(this.props)
       //const {repositoryModel} = params
        const {repositoryDetailStore} = this.props
        const {staticRepositoryDetailModel} = repositoryDetailStore
        return (
            <View>
                <HeaderOfRepositoryDetailPage/>
            </View>
        )
    }
}

const mapState = state => ({
    repositoryDetailStore: state.repositoryDetail
})

const mapActions = dispatch => ({
    dispatchGetData: (owner,repo) => {
        dispatch(createSyncAction_getRepositoryDetailData({},{owner:owner,repo:repo}))
    }
})

export default connect(mapState,mapActions)(RepositoryDetailPage)
