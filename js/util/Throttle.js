export default (method, gap, meta, context) => {
    let methodIndex = "" + meta
    let now = Date.now()
    //console.log(now)
    //console.log(context[methodIndex])
    if (!context[methodIndex]) {
        method.call()
        context[methodIndex] = now
        return
    }
    if (now - context[methodIndex] > gap) {
        method.call()
        context[methodIndex] = now
    }
}
