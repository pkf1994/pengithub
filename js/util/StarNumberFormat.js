export default (starNumber) => {
    if(starNumber >= 1000) {
        let starNumberString = (starNumber/1000).toString()
        let formattedString = starNumberString.substring(0,starNumberString.indexOf('.') + 2) + 'k'
        if(formattedString.endsWith('0k')){
            formattedString = formattedString.substring(0,formattedString.length - 3) + 'k'
        }
        return formattedString
    }
    return starNumber
}
