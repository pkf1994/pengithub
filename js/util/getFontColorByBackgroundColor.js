var Color = require('color');

export default (backgroundColor) => {
    let backgroundColorObj = new Color(backgroundColor)
    if(backgroundColorObj.luminosity() > 0.5) {
        return 'black'
    }
    return 'white'
}
