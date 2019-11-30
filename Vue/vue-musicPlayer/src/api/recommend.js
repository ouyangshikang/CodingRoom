/**
 * Created by OYSK on 2017/8/8.
 */
import jsonp from '@/js/jsonp';
import { commonParams, options } from './config';
import axios from 'axios';
export function getRecommend () {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';

    const data = Object.assign({}, commonParams, {
        platform: 'h5',
        uin: 0,
        needNewsCode: 1
    });
    return jsonp(url, data, options);
}

export function getPlayList () {
  // const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
    const url = '/api/getPlayList';
    const data = Object.assign({}, commonParams, {
        rnd: Math.random(),
        loginUin: 0,
        hostUin: 0,
        platform: 'yqq',
        needNewCode: 0,
        categoryId: 10000000,
        sortId: 5,
        sin: 0,
        ein: 29,
        format: 'json'
    });
  // return jsonp(url, data, options)
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data);
    });
}
