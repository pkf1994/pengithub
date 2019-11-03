var base64 = require('base-64');

export default (base64Str) => {
    return base64.decode(base64Str);
}
