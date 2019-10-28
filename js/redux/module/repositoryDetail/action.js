import {CommonAction,CommonActionId} from "../commonActionType";
import DataStore from "../../../dao/DataStore";
import {URL_REPOSITORY_DETAIL} from '../urlConstant';

export const createSyncAction_getRepositoryDetailData = (option,meta) => {
    const url = URL_REPOSITORY_DETAIL + meta.owner + '/' + meta.repo
    console.log(url)
    return dispatch => {
        dispatch({
            type: CommonAction.TRIGGER_LOADING,
            payload: {
                id: CommonActionId.GET_REPOSITORY_DETAIL_DATA,
                loading: true
            }
        })

        DataStore.fetchData(url,option).then(wrappedData => {
            console.log(wrappedData)
            if(wrappedData.data) {
                dispatch({
                    type: CommonAction.GET_DATA_SUCCESS,
                    payload: {
                        id: CommonActionId.GET_REPOSITORY_DETAIL_DATA,
                        data: wrappedData.data
                    }
                })
            } else {
                dispatch({
                    type: CommonAction.GET_DATA_RETURN_NULL,
                    payload: {
                        id: CommonActionId.GET_REPOSITORY_DETAIL_DATA
                    }
                })
            }

        }).catch(e => {
            console.log(e)
            dispatch({
                type: CommonAction.GET_DATA_FAIL,
                payload: {
                    id: CommonActionId.GET_REPOSITORY_DETAIL_DATA,
                    error: e
                }
            })
        })
    }
}
