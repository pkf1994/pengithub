import {CommonAction,CommonActionId} from '../commonActionType'
const defaultState = {
    showHeader: true,
    showBottomTabBar: true,
    repositoryInfo: {
        data: {},
        loading: false,
        requestErr: false
    },
    readme: {
        data: undefined,
        loading: false,
        requestErr: false
    },
    contributorCount: {
        data: '-',
        loading: false,
        requestErr: false
    },
    branches: {
        data: [],
        loading: false,
        requestErr: false
    },
    releases: {
        data: [],
        loading: false,
        requestErr: false
    },
    contents: {
        data: [],
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

    if(action.type === CommonAction.TRIGGER_LOADING) {
        if(action.payload.id === CommonActionId.GET_BRANCHES) {
            return {
                ...state,
                branches: {
                    ...state.branches,
                    loading:  action.payload.loading,
                    requestErr: false
                }
            }
        }
    }

    if(action.type === CommonAction.TRIGGER_LOADING) {
        if(action.payload.id === CommonActionId.GET_RELEASES) {
            return {
                ...state,
                releases: {
                    ...state.releases,
                    loading:  action.payload.loading,
                    requestErr: false
                }
            }
        }
    }

    if(action.type === CommonAction.TRIGGER_LOADING) {
        if(action.payload.id === CommonActionId.GET_CONTENTS) {
            return {
                ...state,
                contents: {
                    ...state.contents,
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

    if(action.type === CommonAction.GET_DATA_SUCCESS) {
        if(action.payload.id === CommonActionId.GET_BRANCHES) {
            return {
                ...state,
                branches: {
                    ...state.branches,
                    data: action.payload.data,
                    loading:  false,
                    requestErr: false
                }
            }
        }
    }

    if(action.type === CommonAction.GET_DATA_SUCCESS) {
        if(action.payload.id === CommonActionId.GET_RELEASES) {
            return {
                ...state,
                releases: {
                    ...state.releases,
                    data: action.payload.data,
                    loading:  false,
                    requestErr: false
                }
            }
        }
    }

    if(action.type === CommonAction.GET_DATA_SUCCESS) {
        if(action.payload.id === CommonActionId.GET_CONTENTS) {
            return {
                ...state,
                contents: {
                    ...state.contents,
                    data: sortContents(action.payload.data),
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

    if(action.type === CommonAction.GET_DATA_FAIL) {
        if(action.payload.id === CommonActionId.GET_BRANCHES) {
            return {
                ...state,
                branches: {
                    ...state.branches,
                    loading: false,
                    requestErr: true
                }
            }
        }
    }

    if(action.type === CommonAction.GET_DATA_FAIL) {
        if(action.payload.id === CommonActionId.GET_RELEASES) {
            return {
                ...state,
                releases: {
                    ...state.releases,
                    loading: false,
                    requestErr: true
                }
            }
        }
    }

    if(action.type === CommonAction.GET_DATA_FAIL) {
        if(action.payload.id === CommonActionId.GET_CONTENTS) {
            return {
                ...state,
                contents: {
                    ...state.contents,
                    loading: false,
                    requestErr: true
                }
            }
        }
    }

    if(action.type === CommonAction.TRIGGER_FLAG) {
        if(action.payload.id === CommonActionId.TRIGGER_SHOW_HEADER_OF_REPOSITORY_DETAIL_PAGE) {
            return {
                ...state,
                showHeader: action.payload.flag
            }
        }
    }

    return state
}


function sortContents(contents) {
    let dirArray = []
    let fileArray = []
    contents.forEach((item) => {
        if(item.type === 'dir') {
            dirArray.push(item)
        } else {
            fileArray.push(item)
        }
    })
    return dirArray.concat(fileArray)
}
