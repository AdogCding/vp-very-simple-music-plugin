<template>
    <div class="scroll-container">
        <!-- 主音乐播放器容器 (Ant Design Card 风格) -->
        <div id="music-player-app" class="player-card">
            <h1 class="player-header">
                🎧 音乐播放器 (纯 CSS AntD Style)
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
                    <h2 class="playlist-header">播放列表 (4 首)</h2>
                    <div id="playlist-container" class="playlist-container">
                        <!-- 播放列表项将在此处动态加载 -->
                    </div>
                </div>
            </div>

            <!-- 底部控制栏 - 始终显示 -->
            <div class="control-bar">
                <audio ref="audioRef" id="audio-player"></audio>

                <!-- 歌曲信息 -->
                <div class="current-track-info">
                    <div class="track-details">
                        <span id="current-title" class="track-details-title">未选择歌曲</span>
                        <span id="current-artist" class="track-details-artist">--</span>
                    </div>
                </div>

                <!-- 进度条 -->
                <div class="progress-container">
                    <span id="current-time" class="time-label">0:00</span>
                    <input type="range" id="progress-bar" min="0" max="100" value="0" step="0.1"
                        class="progress-bar-input" />
                    <span id="total-time" class="time-label right">0:00</span>
                </div>

                <!-- 播放控制与音量 -->
                <div class="controls-and-volume">

                    <!-- 控制按钮组 -->
                    <div class="controls-group">
                        <!-- 上一首 -->
                        <button id="prev-btn" class="control-button">
                            <SkipBack class="w-6 h-6"></SkipBack>
                        </button>
                        <!-- 播放/暂停 -->
                        <button id="play-pause-btn" class="play-pause-button">
                            <Play id="play-pause-icon" class="w-6 h-6"></Play>
                        </button>
                        <!-- 下一首 -->
                        <button id="next-btn" class="control-button">
                            <SkipForward class="w-6 h-6"></SkipForward>
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
import { onMounted, ref } from 'vue';
import { SkipBack, Play, SkipForward, Volume2 } from 'lucide-vue-next'

const audioRef = ref(null);

const props = defineProps({

});

const audioVolume = ref(0.75);


</script>
<style lang="css" scoped>
/* ==================================== */
/* 1. 全局配置与 Ant Design 变量 */
/* ==================================== */
.scroll-container {
    --primary-color: #1677ff;
    /* Ant Design Blue */
    --primary-hover: #4096ff;
    --border-color: #d9d9d9;
    --bg-light: #f5f5f5;
    /* 类似 AntD 的背景色 */
    --bg-card: #ffffff;
    --text-dark: #333;
    --text-light: #666;
    --radius: 8px;
    --shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 3px 1px rgba(0, 0, 0, 0.02);
    --shadow-lg: 0 4px 12px rgba(0, 0, 0, 0.15);
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    background-color: var(--bg-light);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
}

/* ==================================== */
/* 2. 播放器主容器 (已优化：新增 min-width) */
/* ==================================== */
.player-card {
    width: 100%;
    max-width: 1200px;
    /* 确保在手机上内容不会被过度压缩 */
    min-width: 360px;
    background-color: var(--bg-card);
    box-shadow: var(--shadow-lg);
    border-radius: var(--radius);
    padding: 32px;
}

.player-header {
    font-size: 24px;
    font-weight: 600;
    color: var(--text-dark);
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 16px;
    margin-bottom: 24px;
}

/* ==================================== */
/* 3. 核心布局 (响应式) */
/* ==================================== */
.player-core {
    display: flex;
    flex-direction: column;
    gap: 32px;
}

@media (min-width: 1024px) {
    .player-core {
        flex-direction: row;
    }

    .player-section {
        width: 50%;
    }
}

/* ==================================== */
/* 4. 专辑封面与歌词区域 */
/* ==================================== */
.album-art-wrapper {
    background-color: #e6f7ff;
    /* light blue background */
    aspect-ratio: 1 / 1;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
}

.album-art {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    border-radius: var(--radius);
}

.lyrics-container {
    background-color: #f6f6f6;
    padding: 16px;
    border-radius: var(--radius);
    height: 256px;
    overflow-y: scroll;
    border: 1px solid var(--border-color);
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.06);
}

.lyrics-header {
    font-size: 14px;
    color: var(--text-light);
    margin-bottom: 8px;
}

.lyrics-display {
    text-align: center;
    color: var(--text-light);
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.current-lyric {
    color: var(--primary-color);
    font-weight: 600;
    transform: scale(1.05);
    transition: all 0.2s ease-in-out;
    font-size: 18px;
}

/* 自定义滚动条美化 */
.lyrics-container::-webkit-scrollbar,
.playlist-container::-webkit-scrollbar {
    width: 6px;
}

.lyrics-container::-webkit-scrollbar-thumb,
.playlist-container::-webkit-scrollbar-thumb {
    background-color: var(--border-color);
    border-radius: 10px;
}

.lyrics-container::-webkit-scrollbar-thumb:hover,
.playlist-container::-webkit-scrollbar-thumb:hover {
    background-color: #a8a8a8;
}

/* ==================================== */
/* 5. 播放列表区域 */
/* ==================================== */
.playlist-header {
    font-size: 20px;
    font-weight: 500;
    color: var(--text-dark);
    margin-bottom: 16px;
}

.playlist-container {
    background-color: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    height: 384px;
    overflow-y: scroll;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.06);
    border-top: none;
    /* AntD 列表通常没有顶部分隔线 */
}

.track-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    cursor: pointer;
    transition: background-color 0.15s, box-shadow 0.15s;
    border-bottom: 1px solid #f0f0f0;
    /* 列表分割线 */
}

.track-item:last-child {
    border-bottom: none;
}

.track-item:hover {
    background-color: var(--primary-color, #1677ff)10;
    /* Primary color with 10% opacity */
}

.track-info-main {
    display: flex;
    align-items: center;
    gap: 12px;
    overflow: hidden;
}

.track-index {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-light);
    width: 24px;
    text-align: center;
}

.track-titles {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.track-title {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-dark);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.track-artist {
    font-size: 12px;
    color: var(--text-light);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.track-duration {
    font-size: 12px;
    color: #ccc;
    flex-shrink: 0;
    margin-left: 8px;
}

/* 播放列表高亮状态 */
.track-item.is-playing {
    background-color: rgba(22, 119, 255, 0.1);
    box-shadow: inset 3px 0 0 var(--primary-color);
    /* 左侧指示条 */
}

.track-item.is-playing .track-title,
.track-item.is-playing .track-artist {
    color: var(--primary-color);
}

/* ==================================== */
/* 6. 底部控制栏 */
/* ==================================== */
.control-bar {
    background-color: var(--bg-light);
    padding: 16px;
    border-radius: var(--radius);
    border: 1px solid var(--border-color);
    margin-top: 24px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.06);
}

.current-track-info {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
}

.track-details {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: hidden;
}

.track-details-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--text-dark);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.track-details-artist {
    font-size: 14px;
    color: var(--text-light);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* 进度条样式 */
.progress-container {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
}

.time-label {
    font-size: 12px;
    color: var(--text-light);
    width: 40px;
    text-align: right;
    flex-shrink: 0;
}

.time-label.right {
    text-align: left;
}

.progress-bar-input {
    flex-grow: 1;
    height: 4px;
    background-color: var(--border-color);
    border-radius: 2px;
    appearance: none;
    cursor: pointer;
    outline: none;
}

.progress-bar-input::-webkit-slider-thumb {
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--primary-color);
    transition: all 0.2s;
}

.progress-bar-input:hover::-webkit-slider-thumb {
    width: 14px;
    height: 14px;
    box-shadow: 0 0 0 4px rgba(22, 119, 255, 0.2);
}

/* 播放控制与音量 (已优化：允许换行) */
.controls-and-volume {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* 允许在小屏幕上自动换行 */
    flex-wrap: wrap;
}

@media (max-width: 480px) {

    /* 确保在非常小的手机屏幕上，控制组和音量控制能换行对齐 */
    .controls-and-volume {
        justify-content: center;
        /* 居中对齐 */
        gap: 16px;
        /* 增加换行后的间距 */
    }

    .volume-control {
        /* 在窄屏上，音量控制占据全部宽度 */
        width: 100%;
        justify-content: center;
    }

    .controls-group {
        width: 100%;
        justify-content: center;
    }
}


.controls-group {
    display: flex;
    align-items: center;
    gap: 16px;
}

.control-button {
    border: none;
    background: none;
    color: var(--text-light);
    padding: 8px;
    border-radius: 50%;
    cursor: pointer;
    transition: color 0.15s, background-color 0.15s;
}

.control-button:hover {
    color: var(--primary-color);
    background-color: rgba(22, 119, 255, 0.05);
}

.play-pause-button {
    background-color: var(--primary-color);
    color: white;
    padding: 16px;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(22, 119, 255, 0.5);
    transition: transform 0.2s, box-shadow 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.play-pause-button:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(22, 119, 255, 0.7);
    background-color: var(--primary-hover);
}

.play-pause-button svg {
    fill: white;
}


.volume-control {
    display: flex;
    align-items: center;
    gap: 8px;
    /* 移除固定的 160px 宽度，让它随内容变化 */
}

.volume-icon {
    color: var(--text-light);
}

.volume-bar-input {
    flex-grow: 1;
    height: 4px;
    background-color: var(--border-color);
    border-radius: 2px;
    appearance: none;
    cursor: pointer;
    outline: none;
}

.volume-bar-input::-webkit-slider-thumb {
    appearance: none;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    /* 修复：添加回退值 #1677ff 以确保在伪元素中样式能正确加载 */
    background: var(--primary-color, #1677ff);
}

.volume-bar-input:hover::-webkit-slider-thumb {
    box-shadow: 0 0 0 3px rgba(22, 119, 255, 0.2);
}

/* 隐藏原生的音频元素 */
#audio-player {
    display: none;
}

/* ========== Gemini Analysis Panel Styles ========== */
.analysis-panel {
    position: fixed;
    bottom: 120px;
    /* 放在控制栏上方 */
    right: 20px;
    width: 320px;
    max-height: 450px;
    background-color: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    box-shadow: var(--shadow-lg);
    z-index: 1000;
    display: none;
    flex-direction: column;
}

.analysis-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    font-weight: 600;
    color: var(--primary-color);
    border-bottom: 1px solid var(--border-color);
}

.analysis-content {
    padding: 16px;
    overflow-y: auto;
    font-size: 14px;
    color: var(--text-dark);
    flex-grow: 1;
}

.analysis-content p {
    margin-bottom: 10px;
    line-height: 1.6;
}

.analysis-sources {
    font-size: 10px;
    padding: 8px 16px;
    border-top: 1px solid #f0f0f0;
    color: var(--text-light);
    line-height: 1.4;
}

.analysis-sources a {
    color: var(--primary-color);
    text-decoration: none;
    word-break: break-all;
}

.analysis-sources a:hover {
    text-decoration: underline;
}

/* Loading Spinner Style */
.spinner {
    border: 4px solid rgba(22, 119, 255, 0.2);
    border-left-color: var(--primary-color);
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: spin 1s linear infinite;
    margin: 20px auto;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.scroll-container {
    max-height: 80vh;
    overflow: auto;
    padding-right: 8px;
}
</style>