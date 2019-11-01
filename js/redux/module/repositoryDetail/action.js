import {CommonAction,CommonActionId} from "../commonActionType";
import DataStore from "../../../dao/DataStore";
import {URL_REPOSITORY_INFO} from '../urlConstant';
import {CommonExceptionHandler} from "../CommonExceptionHandler";
var parse = require('parse-link-header');

let getRepositoryDetailDataController = new AbortController()
let getContributorsDataController = new AbortController()
let getRepositoryDetailDataSignal = getRepositoryDetailDataController.signal
let getContributorsDataSignal = getContributorsDataController.signal


export const createSyncAction_getRepositoryDetailData = (option,meta) => {
    const url = URL_REPOSITORY_INFO + meta.owner + '/' + meta.repo
    const contributorsUrl = url + '/contributors?per_page=1'

    return dispatch => {

        dispatch({
            type: CommonAction.TRIGGER_LOADING,
            payload: {
                id: CommonActionId.GET_REPOSITORY_INFO_DATA,
                loading: true
            }
        })

        dispatch({
            type: CommonAction.TRIGGER_LOADING,
            payload: {
                id: CommonActionId.GET_CONTRIBUTORS_DATA,
                loading: true
            }
        })

        getRepositoryDetailDataController.abort()
        DataStore.fetchData(url,{...option,fetchOption:{signal:getRepositoryDetailDataSignal}}).then(wrappedData => {
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
            CommonExceptionHandler(e,dispatch,CommonActionId.GET_REPOSITORY_INFO_DATA)
        })

        getContributorsDataController.abort()
        DataStore.fetchData(contributorsUrl,{...option,fetchOption:{signal:getContributorsDataSignal}}).then(wrappedData => {
            if(wrappedData.data) {
                let parsed = parse(wrappedData.headers.link);
                if(!parsed.last.page) {
                    throw new Error("parse headers link fail")
                }
                dispatch({
                    type: CommonAction.GET_DATA_SUCCESS,
                    payload: {
                        id: CommonActionId.GET_CONTRIBUTORS_DATA,
                        data: parsed.last.page
                    }
                })
            } else {
                dispatch({
                    type: CommonAction.GET_DATA_FAIL,
                    payload: {
                        id: CommonActionId.GET_CONTRIBUTORS_DATA,
                    }
                })
            }
        }).catch(e => {
            CommonExceptionHandler(e,dispatch,CommonActionId.GET_CONTRIBUTORS_DATA)

        })
    }
}
