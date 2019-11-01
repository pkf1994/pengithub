import {CommonAction,CommonActionId} from "../commonActionType";
import DataStore from "../../../dao/DataStore";
import {URL_REPOSITORY_INFO} from '../urlConstant';
import { ToastAndroid } from 'react-native';

export const createSyncAction_getRepositoryDetailData = (option,meta) => {
    const url = URL_REPOSITORY_INFO + meta.owner + '/' + meta.repo
    //console.log(url)
    return dispatch => {
        dispatch({
            type: CommonAction.TRIGGER_LOADING,
            payload: {
                id: CommonActionId.GET_REPOSITORY_INFO_DATA,
                loading: true
            }
        })

        DataStore.fetchData(url,option).then(wrappedData => {
            if(wrappedData.data) {
                dispatch({
                    type: CommonAction.GET_DATA_SUCCESS,
                    payload: {
                        id: CommonActionId.GET_REPOSITORY_INFO_DATA,
                        data: wrappedData.data
                    }
                })
            } else {
                dispatch({
                    type: CommonAction.GET_DATA_FAIL,
                    payload: {
                        id: CommonActionId.GET_REPOSITORY_INFO_DATA,
                    }
                })
            }

        }).catch(e => {
            console.log(e)
            ToastAndroid.show("GET_DATA_FAIL:GET_REPOSITORY_INFO_DATA", ToastAndroid.SHORT);
            dispatch({
                type: CommonAction.GET_DATA_FAIL,
                payload: {
                    id: CommonActionId.GET_REPOSITORY_INFO_DATA,
                    error: e
                }
            })
        })
    }
}
