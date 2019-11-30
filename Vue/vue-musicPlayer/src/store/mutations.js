/**
 * Created by OYSK on 2017/9/17.
 */
import * as types from './mutation-types';

const mutations = {
  // 歌手详情列表
    [types.SET_SINGER](state, singer) {
        state.singer = singer;
    },
  // 播放器页面
    [types.SET_PLAYING_STATE](state, flag) {
        state.playing = flag;
    },
    [types.SET_FULL_SCREEN](state, flag) {
        state.fullScreen = flag;
    },
    [types.SET_PLAYLIST](state, list) {
        state.playlist = list;
    },
    [types.SET_SEQUENCE_LIST](state, list) {
        state.sequenceList = list;
    },
    [types.SET_PLAY_MODE](state, mode) {
        state.mode = mode;
    },
    [types.SET_CURRENT_INDEX](state, index) {
        state.currentIndex = index;
    }
};
export default mutations;
