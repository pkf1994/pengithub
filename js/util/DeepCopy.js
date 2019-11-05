export const Util_DeepCopy = (obj, parent = null) => {
    let result; // 最后的返回结果

    let _parent = parent; // 防止循环引用
    while (_parent) {
        if (_parent.originalParent === obj) {
            return _parent.currentParent;
        }
        _parent = _parent.parent;
    }

    if (obj && typeof obj === "object") { // 返回引用数据类型(null已被判断条件排除))
        if (obj instanceof RegExp) { // RegExp类型
            result = new RegExp(obj.source, obj.flags)
        } else if (obj instanceof Date) { // Date类型
            result = new Date(obj.getTime());
        } else {
            if (obj instanceof Array) { // Array类型
                result = []
            } else { // Object类型，继承原型链
                let proto = Object.getPrototypeOf(obj);
                result = Object.create(proto);
            }
            for (let key in obj) { // Array类型 与 Object类型 的深拷贝
                if (obj.hasOwnProperty(key)) {
                    if (obj[key] && typeof obj[key] === "object") {
                        result[key] = Util_DeepCopy(obj[key], {
                            originalParent: obj,
                            currentParent: result,
                            parent: parent
                        });
                    } else {
                        result[key] = obj[key];
                    }
                }
            }
        }
    } else { // 返回基本数据类型与Function类型,因为Function不需要深拷贝
        return obj
    }
    return result;
}
