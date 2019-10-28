import {createStore,applyMiddleware,combineReducers} from 'redux'
import ReduxThunk  from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';
import logger  from 'redux-logger'
import {trendingReducer,repositoryDetailReducer} from './module'
const middlewares = [
    ReduxThunk
]

//开发环境下输出日志到控制台
if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
}

const reducer = combineReducers({
    trending: trendingReducer,
    repositoryDetail: repositoryDetailReducer
})

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['trending','repositoryDetail']
    //stateReconciler: autoMergeLevel2
}

const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(persistedReducer,applyMiddleware(...middlewares))

let persistor = persistStore(store);

// Exports
export {
    store,
    persistor,
};





