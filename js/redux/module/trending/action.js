import {CommonAction,CommonActionId} from "../commonActionType";
import DataStore from "../../../dao/DataStore";
import {URL_TRENDING,URL_ALL_LANGUAGE} from '../urlConstant';
import {TRENDING_LANGUAGE} from './reducer';

export const createSyncAction_getTrendingData = (option,meta) => {

    const {trendingLanguage,since} = meta
    let url
    if(trendingLanguage !== TRENDING_LANGUAGE.ANY) {
        url = URL_TRENDING + "language=" + trendingLanguage + '&since=' + since
    } else {
        url = URL_TRENDING  + 'since=' + since
    }

    return dispatch => {
        dispatch({
            type: CommonAction.LOGGER_ACTION,
            payload: {
                url: url
            }
        })
        if(option.refresh){
            dispatch({
                type: CommonAction.TRIGGER_LOADING,
                payload: {
                    id: CommonActionId.REFRESH_TRENDING_DATA,
                    loading: true
                }
            })
        }else{
            dispatch({
                type: CommonAction.TRIGGER_LOADING,
                payload: {
                    id: CommonActionId.GET_TRENDING_DATA,
                    loading: true
                }
            })
        }

        DataStore.fetchData(url,option).then(wrappedData => {
            if(wrappedData.data.length > 0) {
                dispatch({
                    type: CommonAction.GET_DATA_SUCCESS,
                    payload: {
                        id: CommonActionId.GET_TRENDING_DATA,
                        data: wrappedData.data,
                        trendingLanguage: meta.trendingLanguage
                    }
                })
            } else {
                dispatch({
                    type: CommonAction.GET_DATA_RETURN_NULL,
                    payload: {
                        id: CommonActionId.GET_TRENDING_DATA,
                        trendingLanguage: meta.trendingLanguage
                    }
                })
            }

        }).catch(e => {
            console.log(e)
            dispatch({
                type: CommonAction.GET_DATA_FAIL,
                payload: {
                    id: CommonActionId.GET_TRENDING_DATA,
                    error: e
                }
            })
        })
    }
}

export const createSyncAction_getMoreTrendingData = (delay) => {
    return dispatch => {
        dispatch({
            type: CommonAction.TRIGGER_LOADINGMORE,
            payload: {
                id: CommonActionId.GET_TRENDING_DATA,
                loadingMore: true
            }
        })

        setTimeout(() => {
            dispatch({
                type: CommonAction.GET_MORE_DATA_SUCCESS,
                payload: {
                    id: CommonActionId.GET_TRENDING_DATA,
                }
            })
        },delay)
    }
}

export const createSyncAction_getAllLanguageListData = () => {
    return dispatch => {
        DataStore.fetchData(URL_ALL_LANGUAGE,{}).then(wrappedData => {
            dispatch({
                type: CommonAction.GET_DATA_SUCCESS,
                payload: {
                    id: CommonActionId.GET_ALL_LANGUAGE,
                    data: wrappedData.data
                }
            })
        })
    }
}
