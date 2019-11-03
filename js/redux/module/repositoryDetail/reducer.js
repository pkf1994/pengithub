import {CommonAction,CommonActionId} from '../commonActionType'
import {Util_DecodeBase64} from '../../../util'
const defaultState = {
    repositoryInfo: {
        data:{},
        loading: false,
        requestErr: false
    },
    readme: {
        data:{},
        loading: false,
        requestErr: false
    },
    contributorCount: {
        data: '-',
        loading: false,
        requestErr: false
    }
}

export default (state = defaultState, action) => {
    if(action.type === CommonAction.TRIGGER_LOADING) {
        if(action.payload.id === CommonActionId.GET_REPOSITORY_INFO_DATA) {
            return {
                ...state,
                repositoryInfo: {
                    ...state.repositoryInfo,
                    loading:  action.payload.loading,
                    requestErr: false
                }
            }
        }
    }

    if(action.type === CommonAction.TRIGGER_LOADING) {
        if(action.payload.id === CommonActionId.GET_CONTRIBUTORS_COUNT) {
            return {
                ...state,
                contributorCount: {
                    ...state.contributorCount,
                    loading:  action.payload.loading,
                    requestErr: false
                }
            }
        }
    }

    if(action.type === CommonAction.TRIGGER_LOADING) {
        if(action.payload.id === CommonActionId.GET_REPOSITORY_README) {
            return {
                ...state,
                readme: {
                    ...state.readme,
                    loading:  action.payload.loading,
                    requestErr: false
                }
            }
        }
    }

    if(action.type === CommonAction.GET_DATA_SUCCESS) {
        if(action.payload.id === CommonActionId.GET_REPOSITORY_INFO_DATA) {
            return {
                ...state,
                repositoryInfo: {
                    ...state.repositoryInfo,
                    data: action.payload.data,
                    loading:  false,
                    requestErr: false
                }
            }
        }
    }

    if(action.type === CommonAction.GET_DATA_SUCCESS) {
        if(action.payload.id === CommonActionId.GET_CONTRIBUTORS_COUNT) {
            return {
                ...state,
                contributorCount: {
                    ...state.contributorCount,
                    data: action.payload.data,
                    loading:  false,
                    requestErr: false
                }
            }
        }
    }

    if(action.type === CommonAction.GET_DATA_SUCCESS) {
        if(action.payload.id === CommonActionId.GET_REPOSITORY_README) {
            return {
                ...state,
                readme: {
                    ...state.readme,
                    data: action.payload.data,
                    loading:  false,
                    requestErr: false
                }
            }
        }
    }

    if(action.type === CommonAction.GET_DATA_FAIL) {
        if(action.payload.id === CommonActionId.GET_REPOSITORY_INFO_DATA) {
            return {
                ...state,
                repositoryInfo: {
                    ...state.repositoryInfo,
                    loading: false,
                    requestErr: true
                }
            }
        }
    }

    if(action.type === CommonAction.GET_DATA_FAIL) {
        if(action.payload.id === CommonActionId.GET_CONTRIBUTORS_COUNT) {
            return {
                ...state,
                contributorCount: {
                    ...state.contributorCount,
                    data: '-',
                    loading: false,
                    requestErr: true
                }
            }
        }
    }

    if(action.type === CommonAction.GET_DATA_FAIL) {
        if(action.payload.id === CommonActionId.GET_REPOSITORY_README) {
            return {
                ...state,
                readme: {
                    ...state.readme,
                    loading: false,
                    requestErr: true
                }
            }
        }
    }

    return state
}
