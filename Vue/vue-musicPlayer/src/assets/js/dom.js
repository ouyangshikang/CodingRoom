/**
 * Created by OYSK on 2017/8/9.
 */
// class的添加
export function addClass (el, className) {
    if (hasClass(el, className)) {
        return;
    }
    let newClass = el.className.split(' ');
    newClass.push(className);
    el.className = newClass.join(' ');
}

// 判断是否有class
export function hasClass (el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
    return reg.test(el.className);
}

export function getData (el, name, val) {
    const prefix = 'data-';
    if (val) {
        return el.setAttribute(prefix + name, val);
    } else {
        return el.getAttribute(prefix + name);
    }
}
