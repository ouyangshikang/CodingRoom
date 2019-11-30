/**
 * Created by OYSK on 2017/9/17.
 */
export const singer = state => state.singer;

export const playing = state => state.playing;

export const fullScreen = state => state.fullScreen;

export const playList = state => state.playList;

export const sequenceList = state => state.sequenceList;

export const mode = state => state.mode;

export const currentIndex = state => state.currentIndex;

// 获取当前播放的音乐
export const currentSong = (state) => {
    return state.playList[state.currentIndex] || {};
};
