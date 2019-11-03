const baseUrl = "https://api.github.com"
//趋势
export const URL_TRENDING = "https://github-trending-api.now.sh/repositories?"
//从blackbird71SR/Hello-World获取语言列表(不全)
export const URL_ALL_LANGUAGE = baseUrl + "/repos/blackbird71SR/Hello-World/languages"

//获取repository详情
export const URL_REPOSITORY_INFO = (owner,repo) => baseUrl + "/repos/" + owner + '/' + repo

export const URL_REPOSITORY_CONTRIBUTORS = (owner,repo,params) => {
    let url = baseUrl + "/repos/" + owner + '/' + repo +  '/contributors'
    if(params) {
        url = url + '?'
        for(let param in params) {
            url = url + param + '=' + params[param]
        }
    }
    return url
}

//获取readme
export const URL_REPOSITORY_README = (owner,repo) => baseUrl + "/repos/" + owner + '/' + repo + "/readme"


