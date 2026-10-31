<template>
    <div class="scroll-container">
        <!-- 主音乐播放器容器 (Ant Design Card 风格) -->
        <div id="music-player-app" class="player-card">
            <h1 class="player-header">
                🎧 音乐播放器
            </h1>

            <!-- 播放器核心区域 -->
            <div class="player-core">

                <!-- 左侧: 专辑封面与歌词显示 -->
                <div class="player-section" style="display: flex; flex-direction: column; gap: 16px;">
                    <!-- 专辑封面 Placeholder -->
                    <div class="album-art-wrapper">
                        <div class="album-art"
                             :style="{backgroundImage: `url(${currentMusicPlaying.cover})`}">
                        </div>
                    </div>
                </div>

                <!-- 右侧: 播放列表 -->
                <div class="player-section">
                    <h2 class="playlist-header">播放列表 共{{ musicList.length }}首</h2>
                    <div id="playlist-container" class="playlist-container">
                        <!-- 播放列表项将在此处动态加载 -->
                        <div v-for="(music, index) in musicList" @click="chooseMusic(music, index)"
                             :class="index === currentMusicIndex ? playingMusicItemClass : unplayingMusicItemClass">
                            <div class="track-info-main">
                                <span class="track-index">{{ index + 1 }}.</span>
                                <div class="track-titles">
                                    <p class="track-title">{{ music.title }}</p>
                                    <p class="track-artist">{{ music.artist }}</p>
                                </div>
                            </div>
                            <div class="isometric-visualizer-container">
                                <div class="bar bar-1"></div>
                                <div class="bar bar-2"></div>
                                <div class="bar bar-3"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 底部控制栏 - 始终显示 -->
            <div class="control-bar">
                <audio ref="audioRef" id="audio-player" preload="metadata" @loadedmetadata="handleLoadMetaData"
                       @timeupdate="handleTimeUpdate" :src="currentMusicPlaying.src"></audio>

                <!-- 歌曲信息 -->
                <div class="current-track-info">
                    <div class="track-details">
                        <span id="current-title" class="track-details-title">{{ currentMusicPlaying.title }}</span>
                        <span id="current-artist" class="track-details-artist">{{ currentMusicPlaying.artist }}</span>
                    </div>
                </div>

                <!-- 进度条 -->
                <div class="progress-container">
                    <span id="current-time" class="time-label">{{ formatTime(currentMusicProgress) }}</span>
                    <input type="range" id="progress-bar" min="0" :max="currentMusicPlaying.duration"
                           v-model="currentMusicProgress" step="1" @input="changeMusicProgress"
                           class="progress-bar-input"/>
                    <span id="total-time" class="time-label right">{{
                            formatTime(currentMusicPlaying.duration)
                        }}</span>
                </div>

                <!-- 播放控制与音量 -->
                <div class="controls-and-volume">

                    <!-- 控制按钮组 -->
                    <div class="controls-group">
                        <!-- 上一首 -->
                        <button id="prev-btn" class="control-button">
                            <SkipBack class="w-6 h-6" @click="prevMusic"></SkipBack>
                        </button>
                        <!-- 播放/暂停 -->
                        <button id="play-pause-btn" class="play-pause-button" @click="playOrPause">
                            <Play v-if="!isPlaying" id="play-pause-icon" class="w-6 h-6"></Play>
                            <Pause v-else id="play-pause-icon" class="w-6 h-6"></Pause>
                        </button>
                        <!-- 下一首 -->
                        <button id="next-btn" class="control-button">
                            <SkipForward class="w-6 h-6" @click="nextMusic"></SkipForward>
                        </button>
                    </div>

                    <!-- 音量控制 (已改进) -->
                    <div class="volume-control">
                        <!-- 新增：将音量图标变为可点击的静音按钮 -->
                        <button id="mute-btn" class="control-button" style="padding: 0;" @click="muteMusic">
                            <Volume2 class="volume-icon w-5 h-5"></Volume2>
                        </button>
                        <input type="range" id="volume-bar" min="0" max="1" v-model="audioVolume" step="0.01"
                               class="volume-bar-input" @input="changeVolume"/>
                        <span id="volume-percent" class="time-label right" style="width: auto;">{{
                                Math.round(audioVolume *
                                    100)
                            }}%</span>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>
<script setup>
import {inject, onMounted, ref} from 'vue';
import {loadMusicList} from '../lib/loadMusicList.js';


const audioRef = ref(null);

const props = defineProps({
    musicList: Array,
});

const musicList = ref([]);
const playingMusicItemClass = 'track-item is-playing'
const unplayingMusicItemClass = 'track-item'
const currentMusicProgress = ref(0);
const currentMusicPlaying = ref({
    title: '未选择歌曲',
    artist: '--',
    cover: '',
    lyricUrl: '',
    src: '',
    duration: 0,
    currentTime: 0
});
const currentMusicIndex = ref(0);
const isPlaying = ref(false);

if (props.musicList && props.musicList.length > 0) {
    currentMusicPlaying.value = props.musicList[0];
}

async function playOrPause() {
    if (audioRef.value.paused) {
        await audioRef.value.play();
    } else {
        await audioRef.value.pause();
    }
    isPlaying.value = !isPlaying.value;
}

const musicPlayerProps = inject('musicPlayerProps') || {}
const musicSourceMode = inject('musicSourceMode') || 'local'
const configuredMusicList = inject('musicList') || []

const audioVolume = ref('0.75');

async function loadMusic() {
    const list = await loadMusicList({
        mode: musicSourceMode,
        musicList: configuredMusicList,
        remoteMusicList: musicPlayerProps.remoteMusicList,
    })
    if (list.length > 0) {
        currentMusicPlaying.value = list[0];
        musicList.value = list
    }
}

async function prevMusic() {
    currentMusicIndex.value = (currentMusicIndex.value - 1) % musicList.value.length;
    currentMusicPlaying.value = musicList.value[currentMusicIndex.value];
}

async function nextMusic() {
    currentMusicIndex.value = (currentMusicIndex.value + 1) % musicList.value.length;
    currentMusicPlaying.value = musicList.value[currentMusicIndex.value];
}

function changeMusicProgress(event) {
    audioRef.value.currentTime = event.target.value;
}

function handleLoadMetaData() {
    currentMusicPlaying.value.duration = audioRef.value.duration;
}

function handleTimeUpdate() {
    currentMusicProgress.value = audioRef.value.currentTime;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

async function chooseMusic(music, idx) {
    currentMusicPlaying.value = music;
    currentMusicIndex.value = idx;
    await audioRef.value.load();
    await audioRef.value.play();
    isPlaying.value = true
}

function muteMusic() {
    audioVolume.value = '0';
    audioRef.value.volume = parseFloat(audioVolume.value);
}

function changeVolume(event) {
    audioVolume.value = parseFloat(event.target.value).toFixed(2);
    audioRef.value.volume = parseFloat(audioVolume.value);
}

onMounted(() => {
    loadMusic()
})
</script>
<style lang="css" scoped>
@import './music-player-detail.css';
</style>
