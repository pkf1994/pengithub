import AsyncStorage from '@react-native-community/async-storage';

export const CONTENT_TEPE_HTML = "application/vnd.github.VERSION.html; charset=utf-8"
export const CONTENT_TEPE_RAW = "application/vnd.github.VERSION.raw; charset=utf-8"

export default class DataStore {

    static fetchData(url,option) {
        //强制刷新
        if(option.refresh) {
            return new Promise(((resolve, reject) => {
                DataStore.fetchNetData(url,option.fetchOption,option.timeout,option.abortController).then((wrappedData) => {
                    resolve(wrappedData)
                    this.cacheData(url,wrappedData,()=>{})
                }).catch((e) => {
                    reject(e)
                })
            }))
        }
        return new Promise((resolve,reject) => {
            DataStore.fetchLocalData(url).then((wrappedData) => {
                if(wrappedData && DataStore._checkValid(wrappedData.timestamp)) {
                    resolve(wrappedData)
                } else {
                    throw new Error("need to fetch from internet")
                }
            }).catch((e) => {
                DataStore.fetchNetData(url,option.fetchOption,option.timeout,option.abortController).then((wrappedData) => {
                    resolve(wrappedData)
                    this.cacheData(url,wrappedData,()=>{})
                }).catch((e) => {
                    reject(e)
                })
            })
        })
    }

    /**
     * 缓存数据
     * @param url
     * @param data
     * @param callback
     */
    static cacheData(url, wrappedData, callback) {
        if(!url || !wrappedData)  return
        AsyncStorage.setItem(url,JSON.stringify(wrappedData),callback)
    }

    /**
     * 获取已缓存的数据
     * @param url
     * @returns {Promise<any> | Promise<*>}
     */
    static fetchLocalData(url) {
        return new Promise((resolve,reject) => {
            AsyncStorage.getItem(url).then((result) => {
                try {
                    resolve(JSON.parse(result))
                }catch (e) {
                    reject(e)
                    console.error(e)
                }
            }).catch((e) => {
                reject(e)
                console.error(e)
            })
        })
    }

    /**
     * 从网络获取数据并缓存之
     * @param url
     * @returns {Promise<any> | Promise<*>}
     */
    static fetchNetData(url,fetchOption,timeout,abortController) {
        console.log("fetchNetData: " + url)
        if(!abortController) {
            abortController = new AbortController()
            fetchOption.signal = abortController.signal
        }
        let timeoutPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error('request time out'))
                abortController.abort()
            }, timeout ? timeout : 20000);
        });

        let fetchPromise = new Promise((resolve,reject) => {
            fetch(url,fetchOption).then(async (response) => {
                if (response.ok) {
                    if(response.headers.map['content-type'] === CONTENT_TEPE_HTML) {
                        const data = await response.text()
                        const wrappedData = this._wrapData(data,response.headers.map)
                        resolve(wrappedData)
                    }else{
                        const data = await response.json()
                        const wrappedData = this._wrapData(data,response.headers.map)
                        resolve(wrappedData)
                    }

                } else {
                    throw (new Error('Network response was not ok'))
                }
            }).catch((e) => {
                reject(e)
            })
        })
        return Promise.race([timeoutPromise,fetchPromise])
    }

    /**
     * 为缓存的数据添加时间戳
     * @param data
     * @returns {{data: *, timestamp: number}}
     * @private
     */
    static _wrapData(data,headers) {
        return {
            headers: headers,
            data: data,
            timestamp: new Date().getTime()
        }
    }

    /**
     * 检查时间戳有效性
     * @param timestamp
     * @returns {boolean}
     * @private
     */
    static _checkValid(timestamp) {
        const currentDate = new Date()
        const targetDate = new Date()
        targetDate.setTime(timestamp)
        if(currentDate.getMonth() !== targetDate.getMonth()) return false
        if(currentDate.getDay() !== targetDate.getDay()) return false
        if(currentDate.getHours() - targetDate.getHours() > 4) return false
        return true
    }

}
