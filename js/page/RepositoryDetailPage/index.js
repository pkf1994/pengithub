import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import {CodeBottomTabItemScreen,IssuesBottomTabItemScreen, HeaderOfRepositoryDetailPage} from './component'
import getParamsFromNavigation from '../../util/getParamsFromNavigation';
import {createSyncAction_getRepositoryDetailData} from '../../redux/module/repositoryDetail/action';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {createBottomTabNavigator,createAppContainer} from 'react-navigation'
import {BottomTabBar} from 'react-navigation-tabs'
import {CollapsibleText,StretchInLoadedView} from "../../component";
import {Divider} from "react-native-elements";
import {starNumberformat} from "../../util/starNumberFormat";

class RepositoryDetailPage extends Component{

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount(): void {
        this._getData()
    }

    _initBottomTab() {
        if(this._bottomTabNavigator) return this._bottomTabNavigator
        return this._bottomTabNavigator = createAppContainer(createBottomTabNavigator({
            CodeTabItemScreen: {
                screen: CodeBottomTabItemScreen,
                navigationOptions: {
                    tabBarLabel: 'code',
                    tabBarIcon: ({tintColor}) => <FontAwesome name="code" size={24} style={{color:tintColor}}/>
                }
            },
            IssuesTabItemScreen: {
                screen: IssuesBottomTabItemScreen,
                navigationOptions: {
                    tabBarLabel: 'issues',
                    tabBarIcon: ({tintColor}) => <AntDesign name="exclamationcircleo" size={22} style={{color:tintColor}}/>
                }
            }
        },{
            tabBarOptions: {
                activeTintColor: 'black'
            }
        }))
    }

    componentWillUnmount(): void {
        console.log("unmount: RepositoryDetail_index")
    }

    _getData = () => {
        const {repositoryModel} = getParamsFromNavigation(this.props)
        this.props.dispatchGetData(repositoryModel.owner,repositoryModel.name)
    }

    render() {
       //const {repositoryModel} = params
        const {repositoryDetailStore} = this.props
        const {} = repositoryDetailStore
        const BottomTabNavigator = this._initBottomTab()
        return (
            <View style={{flex:1}}>
                <HeaderOfRepositoryDetailPage/>
                <BottomTabNavigator/>
            </View>
        )
    }
}

const mapState = state => ({
    repositoryDetailStore: state.repositoryDetail,

})

const mapActions = dispatch => ({
    dispatchGetData: (owner,repo) => {
        dispatch(createSyncAction_getRepositoryDetailData({},{owner:owner,repo:repo}))
    }
})

export default connect(mapState,mapActions)(RepositoryDetailPage)

const S = StyleSheet.create({
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
