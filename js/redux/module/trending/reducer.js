import {CommonAction,CommonActionId} from '../commonActionType'
import {Util_GetColorOfLanguage, Util_UniqueArr} from '../../../util';
import { ToastAndroid } from 'react-native';

export const TRENDING_LANGUAGE = {
    ANY: 'Any',
    JAVA: 'Java',
    JAVASCRIPT: 'JavaScript',
    C_PLUS2: 'C++',
    C: 'C',
    PYTHON: 'python',
    PHP: 'php',
    C_HASH: 'C#',
    DART: 'Dart',
    HTML: 'HTML',
    OBJECTIVE_C: 'Objective-c',
    TYPESCRIPT: 'TypeScript',
    UNKNOW_LANGUAGE: 'Unknow language',
    CSS: 'CSS',
    GRADLE: 'Gladle',
    GROOVY: 'Groovy',
    GO: 'Go',
    KOTLIN: 'Kotlin',
    MATLAB: 'Matlab',
    RUBY: 'Ruby',
}



export const SINCE_TYPE = {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly'
}

const defaultState = {
    pageScale: 8,
    currentPage: 1,
    maxPage: 1,
    trendingRepositoryList: [],
    trendingLanguage: TRENDING_LANGUAGE.ANY,
    since: SINCE_TYPE.DAILY,
    firstIn: true,
    loading: false,
    loadingMore: false,
    refreshing: false,
    getDataReturnNull: false,
    networkErr: false,
    languageColor: 'white',
    allLanguageList: [
        'Any',
        'Java',
        'JavaScript',
        'C++',
        'C',
        'python',
        'php',
        'C#',
        'Dart',
        'HTML',
        'Vue',
        'Objective-c',
        'TypeScript',
        'CSS',
        'Gradle',
        'Groovy',
        'Go',
        'Kotlin',
        'Matlab',
        'Ruby',
    ]
}

export default (state = defaultState, action) => {
    if(action.type === CommonAction.GET_DATA_SUCCESS) {
        if(action.payload.id === CommonActionId.GET_TRENDING_DATA){
            return {
                ...state,
                trendingRepositoryList: action.payload.data,
                firstIn: false,
                loading: false,
                refreshing: false,
                getDataReturnNull: true,
                networkErr: false,
                currentPage: 1,
                maxPage: Math.ceil(action.payload.data.length / state.pageScale)
            }
        }
    }

    if(action.type === CommonAction.GET_DATA_SUCCESS) {
        if(action.payload.id === CommonActionId.GET_ALL_LANGUAGE) {
            const list1 = []
            for(var key in action.payload.data) {
                list1.push(key)
            }
            const list2 = defaultState.allLanguageList.concat(list1)
            const finalAllLanguageList = Util_UniqueArr(list2)
            return {
                ...state,
                allLanguageList: finalAllLanguageList
            }
        }
    }

    if(action.type === CommonAction.GET_DATA_RETURN_NULL) {
        if(action.payload.id === CommonActionId.GET_TRENDING_DATA) {
            ToastAndroid.show("GET_DATA_RETURN_NULL", ToastAndroid.SHORT);
            return {
                ...state,
                loading: false,
                refreshing: false,
                getDataReturnNull: true,
                trendingRepositoryList: [],
                languageColor: 'white'
            }
        }
    }

    if(action.type === CommonAction.GET_MORE_DATA_SUCCESS) {
        if(action.payload.id === CommonActionId.GET_TRENDING_DATA){
            return {
                ...state,
                currentPage: state.currentPage + 1,
                loadingMore: false
            }
        }
    }

    if(action.type === CommonAction.TRIGGER_LOADING) {
        if(action.payload.id === CommonActionId.GET_TRENDING_DATA){
            return {
                ...state,
                loading: action.payload.loading,
                getDataReturnNull: action.payload.loading ? false : state.getDataReturnNull,
            }
        }
    }

    if(action.type === CommonAction.TRIGGER_LOADING) {
        if(action.payload.id === CommonActionId.REFRESH_TRENDING_DATA) {
            return {
                ...state,
                refreshing: action.payload.loading
            }
        }
    }

    if(action.type === CommonAction.TRIGGER_LOADINGMORE) {
        if(action.payload.id !== CommonActionId.GET_TRENDING_DATA) return state
        return {
            ...state,
            loadingMore: action.payload.loadingMore
        }
    }

    if(action.type === CommonAction.GET_DATA_FAIL) {
        if(action.payload.id !== CommonActionId.GET_TRENDING_DATA) return state
        return {
            ...state,
            networkErr: true,
            trendingRepositoryList: [],
            loading: false
        }
    }

    if(action.type === CommonAction.UPDATE_VALUE) {
        if(action.payload.id === CommonActionId.UPDATE_TRENDING_LANGUAGE) {
            return {
                ...state,
                trendingLanguage: action.payload.trendingLanguage,
                languageColor: Util_GetColorOfLanguage(action.payload.trendingLanguage)
            }
        }
    }

    if(action.type === CommonAction.UPDATE_VALUE) {
        if(action.payload.id === CommonActionId.UPDATE_TRENDING_SINCE) {
            return {
                ...state,
                since: action.payload.since
            }
        }
    }

    if(action.type === CommonAction.APPOINT_ELEMENT) {
        if(action.payload.id === CommonActionId.APPOINT_TRENDING_FLATLIST) {
            return {
                ...state,
                flatList: action.payload.value
            }
        }
    }

    return state
}
