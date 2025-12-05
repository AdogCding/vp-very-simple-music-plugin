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
                            style="background-image: url('https://placehold.co/500x500/1677ff/ffffff?text=Album+Art');">
                        </div>
                    </div>

                    <!-- 歌词显示区域 -->
                    <div class="lyrics-container">
                        <p class="lyrics-header">当前歌词：</p>
                        <div id="lyrics-display" class="lyrics-display">
                            <!-- 歌词将在此处动态加载 -->
                            <p>请选择歌曲开始播放...</p>
                        </div>
                    </div>
                </div>

                <!-- 右侧: 播放列表 -->
                <div class="player-section">
                    <h2 class="playlist-header">播放列表 {{ musicList.length }}</h2>
                    <div id="playlist-container" class="playlist-container">
                        <!-- 播放列表项将在此处动态加载 -->
                        <div v-for="(music, index) in musicList" class="track-item">
                            <div class="track-info-main">
                                <span class="track-index">{{ index + 1 }}.</span>
                                <div class="track-titles">
                                    <p class="track-title">{{ music.title }}</p>
                                    <p class="track-artist">{{ music.artist }}</p>
                                </div>
                            </div>
                            <span class="track-duration">100:00</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 底部控制栏 - 始终显示 -->
            <div class="control-bar">
                <audio ref="audioRef" id="audio-player" preload="metadata" @loadedmetadata="handleLoadMetaData"
                    :src="currentMusicPlaying.src"></audio>

                <!-- 歌曲信息 -->
                <div class="current-track-info">
                    <div class="track-details">
                        <span id="current-title" class="track-details-title">{{ currentMusicPlaying.title }}</span>
                        <span id="current-artist" class="track-details-artist">{{ currentMusicPlaying.artist }}</span>
                    </div>
                </div>

                <!-- 进度条 -->
                <div class="progress-container">
                    <span id="current-time" class="time-label">{{ currentMusicPlaying.currentTime || '0:00' }}</span>
                    <input type="range" id="progress-bar" min="0" :max="currentMusicPlaying.duration" value="0" step="1"
                        @change="changeMusicProgress" class="progress-bar-input" />
                    <span id="total-time" class="time-label right">{{ currentMusicPlaying.duration }}</span>
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
                        <button id="play-pause-btn" class="play-pause-button">
                            <Play v-if="!isPlaying" id="play-pause-icon" class="w-6 h-6" @click="playOrPause"></Play>
                            <Pause v-else id="play-pause-icon" class="w-6 h-6" @click="playOrPause"></Pause>
                        </button>
                        <!-- 下一首 -->
                        <button id="next-btn" class="control-button">
                            <SkipForward class="w-6 h-6" @click="nextMusic"></SkipForward>
                        </button>
                    </div>

                    <!-- 音量控制 (已改进) -->
                    <div class="volume-control">
                        <!-- 新增：将音量图标变为可点击的静音按钮 -->
                        <button id="mute-btn" class="control-button" style="padding: 0;">
                            <Volume2 class="volume-icon w-5 h-5"></Volume2>
                        </button>
                        <input type="range" id="volume-bar" min="0" max="1" value="0.75" step="0.01"
                            class="volume-bar-input" />
                        <span id="volume-percent" class="time-label right" style="width: auto;">75%</span>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>
<script setup>
import { onMounted, ref, inject } from 'vue';
import { SkipBack, Play, Pause, SkipForward, Volume2 } from 'lucide-vue-next'
import axios from 'axios';


const audioRef = ref(null);

const props = defineProps({
    musicList: Array,
});

const musicList = ref([])
const currentMusicPlaying = ref({ title: '未选择歌曲', artist: '--', cover: '', lyricUrl: '', src: '', duration: 0, currentTime: 0 });
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

const musicPlayerProps = inject('musicPlayerProps')
async function fetchRemoteMusicList() {
    if (!musicPlayerProps.remoteMusicList) {
        return []
    }
    const remoteMusicListUrl = musicPlayerProps.remoteMusicList
    try {
        const response = await axios.post(remoteMusicListUrl, {}, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response
    } catch (error) {
        console.error('Error fetching remote music list:', error);
    }
    return []
}

const audioVolume = ref(0.75);

async function loadMusic() {
    const musicListResp = await fetchRemoteMusicList()
    if (!musicListResp) {
        return
    }
    const { data: remoteMusicList } = musicListResp
    if (remoteMusicList.length > 0) {
        currentMusicPlaying.value = remoteMusicList[0];
        musicList.value = remoteMusicList
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
    currentMusicPlaying.value.duration = formatTime(audioRef.value.duration);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

onMounted(() => {
    loadMusic()
})
</script>
<style lang="css" scoped>
@import './music-player-detail.css';
</style>
