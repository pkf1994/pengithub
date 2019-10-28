import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View,StyleSheet,TouchableWithoutFeedback} from 'react-native';
import {CommonAction, CommonActionId} from '../../../redux/module/commonActionType';

class CurrentLanguageSelectPane extends Component {

    render() {
        const {dispatchTriggerShowCurrentLanguageSelectPane,trendingStore} = this.props
        const {showLanguageSelectPane} = trendingStore
        return (
            <TouchableWithoutFeedback onPress={() => dispatchTriggerShowCurrentLanguageSelectPane(showLanguageSelectPane)}>
                <View style={styles.container} ></View>
            </TouchableWithoutFeedback>
        )
    }
}

const mapState = state => ({
    trendingStore: state.trending
})

const mapActions = dispatch => ({
    dispatchTriggerShowCurrentLanguageSelectPane: (flag) => {
        dispatch({
            type: CommonAction.TRIGGER_SHOW,
            payload: {
                id: CommonActionId.SHOW_CURRENT_TRENDING_LANGUAGE_SELECT_PANE,
                show: !flag
            }
        })
    }
})

export default connect(mapState,mapActions)(CurrentLanguageSelectPane)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})
