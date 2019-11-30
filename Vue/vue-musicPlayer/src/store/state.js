/**
 * Created by OYSK on 2017/9/17.
 */
import {playMode} from '@/js/config';
const state = {
    singer: {},
    playing: false,
    fullScreen: false,
    playList: [],
    sequenceList: [],
    mode: playMode.sequence,    // 播放模式
    currentIndex: -1     // 当前播放的位置
};

export default state;
