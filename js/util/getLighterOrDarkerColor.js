var Color = require('color')
export default (color,ligtenRatio) => {
    let colorObj = new Color(color)
    if(colorObj.luminosity() > 0.5){
        return colorObj.lighten(ligtenRatio).hex()
    }
    return colorObj.darken(ligtenRatio).hex()
}
