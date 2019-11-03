var moment = require('moment');

export default () => {
    var now = moment();
    let dateStr = now.format("M月D日 ")
    let dayOfWeek
    switch (now.day()) {
        case 0:
            dayOfWeek = '星期一'
            break
        case 1:
            dayOfWeek = '星期二'
            break
        case 2:
            dayOfWeek = '星期三'
            break
        case 3:
            dayOfWeek = '星期四'
            break
        case 4:
            dayOfWeek = '星期五'
            break
        case 5:
            dayOfWeek = '星期六'
            break
        case 6:
            dayOfWeek = '星期天'
            break
        default:
            dayOfWeek = '休息日'
            break
    }
    dateStr = dateStr + dayOfWeek

    return dateStr
}
