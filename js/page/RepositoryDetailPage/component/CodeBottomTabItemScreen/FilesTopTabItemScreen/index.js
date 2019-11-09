import React, {Component, PureComponent} from 'react'
import {connect} from 'react-redux'
import {View, Text,FlatList, Dimensions,Animated} from 'react-native'
//import {FlatList} from'react-native-gesture-handler'
import {createAsyncAction_getFilesData} from "../../../../../redux/module/repositoryDetail/action";
import {LoadingView, SlideInTransition} from "../../../../../component";
import FileListItem from "./FileListItem";

class FilesTopTabItemScreen extends Component{

    componentDidMount(): void {
        this._getData()
    }

    _getData = () => {
        this.props.dispatch_getFilesData(this.props.repositoryModel)
    }

    _renderItem = (itemData) => {
        return <SlideInTransition>
                <FileListItem file={itemData.item} index={itemData.index}/>
        </SlideInTransition>
    }

    _onScroll = ({nativeEvent}) => {
        console.log(nativeEvent)
    }

    render() {
        const {repositoryDetailStore,scrollMappingAnimatedValue} = this.props
        const {contents,branches,releases} = repositoryDetailStore
        const {loading,data} = contents
        return (
            <View style={{flex:1}}>
                <LoadingView indicatorSize={30}
                             color="black"
                             loading={loading}
                             style={{flex:1}}>
                    <FlatList data={data}
                              onScroll={Animated.event(
                                  [{ nativeEvent: {
                                          contentOffset: {
                                              y: scrollMappingAnimatedValue
                                          }
                                      }
                                  }]
                              )}
                              keyExtractor={item => "" + item.sha}
                              ItemSeparatorComponent={FlatListDivider}
                              renderItem={itemData => this._renderItem(itemData)}
                              style={{width:Dimensions.get('window').width}}/>
                </LoadingView>
            </View>
        )
    }
}

class FlatListDivider extends PureComponent{
    render() {
        return (
            <View style={{flex:1,height:1,borderBottomColor:'#AAAAAA'}}/>
        )
    }
}

const mapState = state => ({
    repositoryDetailStore: state.repositoryDetail
})

const mapActions = dispatch => ({
    dispatch_getFilesData: (repositoryModel) => {
        dispatch(createAsyncAction_getFilesData({},{
            owner: repositoryModel.owner,
            repo: repositoryModel.repo,
            path: ''
        }))
    }
})
export default connect(mapState,mapActions)(FilesTopTabItemScreen)
