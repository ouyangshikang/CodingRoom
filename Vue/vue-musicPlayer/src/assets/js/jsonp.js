/**
 * Created by OYSK on 2017/8/8.
 */
import originJSONP from 'jsonp';

// 请求的query用data拼接到url上
export default function jsonp (url, data, option) {
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data);

    return new Promise((resolve, reject) => {
        originJSONP(url, option, (err, data) => {
            if (!err) {
                resolve(data);
            } else {
                reject(err);
            }
        });
    });
}

function param (data) {
    let url = '';
    for (var i in data) {
        let value = data[i] !== undefined ? data[i] : '';
        url += `&${i}=${encodeURIComponent(value)}`;
    }
    return url ? url.substring(1) : '';
}
