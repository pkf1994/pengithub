export default (method, delay, meta, context) => {
    clearTimeout(context[meta])
    context[meta] = setTimeout(() => {
        method.call()
    },delay)
}
