import {CommonAction,CommonActionId} from "../commonActionType";
import DataStore from "../../../dao/DataStore";
import {
    ACCEPT_HTML,
    URL_BRANCHES, URL_CONTENTS, URL_RELEASES, URL_REPOSITORY_CONTRIBUTORS,
    URL_REPOSITORY_INFO,
    URL_REPOSITORY_README
} from '../urlConstant';
import {CommonExceptionHandler} from "../CommonExceptionHandler";
var parse = require('parse-link-header');


export const createAsyncAction_getRepositoryInfoData = (option,meta) => {
    const url = URL_REPOSITORY_INFO(meta.owner, meta.repo)

    return dispatch => {

        dispatch({
            type: CommonAction.TRIGGER_LOADING,
            payload: {
                id: CommonActionId.GET_REPOSITORY_INFO_DATA,
                loading: true
            }
        })

        DataStore.fetchData(url, option).then(wrappedData => {
            if (wrappedData.data) {
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
            CommonExceptionHandler(e, dispatch, CommonActionId.GET_REPOSITORY_INFO_DATA)
        })
    }
}

export const createAsyncAction_getContributorsCountData = (option,meta) => {
    const url = URL_REPOSITORY_CONTRIBUTORS(meta.owner, meta.repo,{per_page:1})

    return dispatch => {

        dispatch({
            type: CommonAction.TRIGGER_LOADING,
            payload: {
                id: CommonActionId.GET_CONTRIBUTORS_COUNT,
                loading: true
            }
        })


        DataStore.fetchData(url, option).then(wrappedData => {
            if (wrappedData.data) {
                if (!wrappedData.headers.link) {
                    dispatch({
                        type: CommonAction.GET_DATA_SUCCESS,
                        payload: {
                            id: CommonActionId.GET_CONTRIBUTORS_COUNT,
                            data: 1
                        }
                    })
                    return
                }
                let parsed = parse(wrappedData.headers.link);
                if (!parsed.last.page) {
                    throw new Error("parse headers link fail")
                }
                dispatch({
                    type: CommonAction.GET_DATA_SUCCESS,
                    payload: {
                        id: CommonActionId.GET_CONTRIBUTORS_COUNT,
                        data: parsed.last.page
                    }
                })
            } else {
                dispatch({
                    type: CommonAction.GET_DATA_FAIL,
                    payload: {
                        id: CommonActionId.GET_CONTRIBUTORS_COUNT,
                    }
                })
            }
        }).catch(e => {
            CommonExceptionHandler(e, dispatch, CommonActionId.GET_CONTRIBUTORS_COUNT)
        })
    }
}

export const createAsyncAction_getReadmeData = (option,meta) => {
    const readmeUrl = URL_REPOSITORY_README(meta.owner, meta.repo)

    return dispatch => {

        dispatch({
            type: CommonAction.TRIGGER_LOADING,
            payload: {
                id: CommonActionId.GET_REPOSITORY_README,
                loading: true
            }
        })

        DataStore.fetchData(readmeUrl,{...option,fetchOption:{...option.fetchOption,headers:{Accept:ACCEPT_HTML}}}).then(wrappedData => {
            if(wrappedData.data) {
                dispatch({
                    type: CommonAction.GET_DATA_SUCCESS,
                    payload: {
                        id: CommonActionId.GET_REPOSITORY_README,
                        data: wrappedData.data
                    }
                })
            } else {
                dispatch({
                    type: CommonAction.GET_DATA_FAIL,
                    payload: {
                        id: CommonActionId.GET_REPOSITORY_README,
                    }
                })
            }
        }).catch(e => {
            CommonExceptionHandler(e,dispatch,CommonActionId.GET_REPOSITORY_README)
        })
    }
}

export const createAsyncAction_getFilesData = (option,meta) => {
    return dispatch => {
        dispatch(createAsyncAction_getBranchesData(option,meta))
        dispatch(createAsyncAction_getTagsData(option,meta))
        dispatch(createAsyncAction_getContents(option,meta))
    }
}

export const createAsyncAction_getBranchesData = (option,meta) => {
    const url = URL_BRANCHES(meta.owner, meta.repo)

    return dispatch => {
        dispatch({
            type: CommonAction.TRIGGER_LOADING,
            payload: {
                id: CommonActionId.GET_BRANCHES,
                loading: true
            }
        })

        DataStore.fetchData(url,option).then(wrappedData => {
            if(wrappedData.data) {
                dispatch({
                    type: CommonAction.GET_DATA_SUCCESS,
                    payload: {
                        id: CommonActionId.GET_BRANCHES,
                        data: wrappedData.data
                    }
                })
            } else {
                dispatch({
                    type: CommonAction.GET_DATA_FAIL,
                    payload: {
                        id: CommonActionId.GET_BRANCHES,
                    }
                })
            }
        }).catch(e => {
            CommonExceptionHandler(e,dispatch,CommonActionId.GET_BRANCHES)
        })
    }
}

export const createAsyncAction_getTagsData = (option,meta) => {
    const url = URL_RELEASES(meta.owner, meta.repo)
    return dispatch => {

        dispatch({
            type: CommonAction.TRIGGER_LOADING,
            payload: {
                id: CommonActionId.GET_RELEASES,
                loading: true
            }
        })

        DataStore.fetchData(url,option).then(wrappedData => {
            if(wrappedData.data) {
                dispatch({
                    type: CommonAction.GET_DATA_SUCCESS,
                    payload: {
                        id: CommonActionId.GET_RELEASES,
                        data: wrappedData.data
                    }
                })
            } else {
                dispatch({
                    type: CommonAction.GET_DATA_FAIL,
                    payload: {
                        id: CommonActionId.GET_RELEASES,
                    }
                })
            }
        }).catch(e => {
            CommonExceptionHandler(e,dispatch,CommonActionId.GET_RELEASES)
        })
    }
}

export const createAsyncAction_getContents = (option,meta) => {
    const url = URL_CONTENTS(meta.owner, meta.repo, meta.path)

    return dispatch => {

        dispatch({
            type: CommonAction.TRIGGER_LOADING,
            payload: {
                id: CommonActionId.GET_CONTENTS,
                loading: true
            }
        })

        DataStore.fetchData(url,option).then(wrappedData => {
            if(wrappedData.data) {
                dispatch({
                    type: CommonAction.GET_DATA_SUCCESS,
                    payload: {
                        id: CommonActionId.GET_CONTENTS,
                        data: wrappedData.data
                    }
                })
            } else {
                dispatch({
                    type: CommonAction.GET_DATA_FAIL,
                    payload: {
                        id: CommonActionId.GET_CONTENTS,
                    }
                })
            }
        }).catch(e => {
            CommonExceptionHandler(e,dispatch,CommonActionId.GET_CONTENTS)
        })
    }

}
