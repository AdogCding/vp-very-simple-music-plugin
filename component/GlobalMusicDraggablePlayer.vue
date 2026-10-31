<template>
    <div v-if="musicPlayerProps.isOn">
        <div ref="playerRoot" :style="playerStyle"
            class="fixed z-9999 font-sans select-none text-slate-800">
            <div ref="dragHandle" class="touch-none">
                <button type="button" @click="showPanel" v-show="!isOpen"
                    class="group relative flex h-14 w-14 items-center
                    justify-center rounded-full bg-white/80 text-indigo-600 shadow-lg
                    backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white active:scale-95 border border-white/20">
                    <span v-if="isDragging" class="absolute inset-0 animate-ping rounded-full bg-indigo-500/20"></span>
                    <div class="relative z-10 pointer-events-none text-indigo-600 flex flex-col items-center">
                        <div v-if="isPlaying" class="flex items-end gap-0.5 h-4">
                            <div class="w-1 bg-indigo-500 animate-[music-bar_0.8s_ease-in-out_infinite]">
                            </div>
                            <div class="w-1 bg-indigo-500 animate-[music-bar_1.2s_ease-in-out_infinite]">
                            </div>
                            <div class="w-1 bg-indigo-500 animate-[music-bar_1.0s_ease-in-out_infinite]">
                            </div>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M9 18V5l12-2v13" />
                                <circle cx="6" cy="18" r="3" />
                                <circle cx="18" cy="16" r="3" />
                            </svg>
                        </div>
                    </div>
                </button>
            </div>
            <div v-show="isOpen" class="w-[22rem] overflow-hidden rounded-[3rem] bg-white
                shadow-[0_40px_100px_rgba(0,0,0,0.3)] border border-white/60">
                <div ref="dragHandleOpen" class="touch-none cursor-move">
                    <MusicPlayerHeader :is-showing-list="isShowList" @close-player="minimizePlayer"
                        @toggle-view="toggleView"></MusicPlayerHeader>
                </div>
                <div class="relative h-96 overflow-hidden">
                    <MusicPlayerScreen v-show="!isShowList" :is-playing="isPlaying" :is-show-list="false"
                        :artist="currentSong.artist" :title="currentSong.title" :cover="currentSong.cover">
                    </MusicPlayerScreen>
                    <MusicPlayerList v-show="isShowList" :songs="songList" :current-index="currentIndex"
                        :is-playing="isPlaying" @select="playAt"></MusicPlayerList>
                </div>
                <MusicPlayerController :is-playing="isPlaying" :current-time="currentTime" :duration="duration"
                    :volume="volume" @toggle-play="togglePlay" @prev="playPrevious" @next="playNext" @seek="seek"
                    @volume="changeVolume" />
            </div>
            <audio ref="audioRef" :src="currentSong.src || undefined" preload="metadata" @loadedmetadata="handleLoaded"
                @timeupdate="handleTimeUpdate" @play="isPlaying = true" @pause="isPlaying = false" @ended="playNext">
            </audio>
        </div>
    </div>
</template>
<script setup>
import { useDraggable } from '@vueuse/core';
import { computed, inject, ref, useTemplateRef, onMounted } from 'vue'
import MusicPlayerHeader from './MusicPlayerHeader.vue';
import MusicPlayerScreen from "./MusicPlayerScreen.vue";
import MusicPlayerController from "./MusicPlayerController.vue";
import MusicPlayerList from "./MusicPlayerList.vue";
import { loadMusicList } from '../lib/loadMusicList.js';

const musicPlayerProps = inject('musicPlayerProps') || { isOn: true }
const musicSourceMode = inject('musicSourceMode') || 'local'
const configuredMusicList = inject('musicList') || []

const songList = ref(musicSourceMode === 'local' && Array.isArray(configuredMusicList) ? configuredMusicList : [])
const currentIndex = ref(0)
const currentSong = ref(songList.value[0] || {})

const isPlaying = ref(false)
const isShowList = ref(false)
const isOpen = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(0.75)
const movedWhileDragging = ref(false)

const playerRef = useTemplateRef('playerRoot')
const dragHandleRef = useTemplateRef('dragHandle')
const dragHandleOpenRef = useTemplateRef('dragHandleOpen')
const audioRef = ref(null)

const dragHandle = computed(() => isOpen.value ? dragHandleOpenRef.value : dragHandleRef.value)

let dragOrigin = null

const { style: playerStyle, isDragging, position } = useDraggable(playerRef, {
    handle: dragHandle,
    initialValue: { x: 100, y: 100 },
    onStart() {
        dragOrigin = { x: position.value.x, y: position.value.y }
        movedWhileDragging.value = false
    },
    onMove(pos) {
        if (!dragOrigin) {
            return
        }
        if (Math.hypot(pos.x - dragOrigin.x, pos.y - dragOrigin.y) > 4) {
            movedWhileDragging.value = true
        }
    },
    onEnd() {
        setTimeout(() => {
            movedWhileDragging.value = false
        }, 0)
    },
})

const showPanel = () => {
    if (movedWhileDragging.value) {
        return
    }
    isOpen.value = true
}

const minimizePlayer = () => {
    isOpen.value = false
}

const toggleView = () => {
    isShowList.value = !isShowList.value
}

function handleLoaded() {
    duration.value = audioRef.value?.duration || 0
    if (audioRef.value) {
        audioRef.value.volume = volume.value
    }
}

function handleTimeUpdate() {
    currentTime.value = audioRef.value?.currentTime || 0
}

async function togglePlay() {
    const audio = audioRef.value
    if (!audio || !currentSong.value?.src) {
        return
    }
    try {
        if (audio.paused) {
            await audio.play()
        } else {
            audio.pause()
        }
    } catch (error) {
        console.error('Error playing audio:', error)
    }
}

async function playAt(index) {
    if (!songList.value.length) {
        return
    }
    const length = songList.value.length
    const nextIndex = ((index % length) + length) % length
    const song = songList.value[nextIndex]
    currentIndex.value = nextIndex
    currentSong.value = song
    currentTime.value = 0
    const audio = audioRef.value
    if (!audio || !song.src) {
        return
    }
    audio.src = song.src
    try {
        await audio.play()
    } catch (error) {
        console.error('Error playing audio:', error)
    }
}

function playPrevious() {
    playAt(currentIndex.value - 1)
}

function playNext() {
    playAt(currentIndex.value + 1)
}

function seek(time) {
    if (!audioRef.value) {
        return
    }
    audioRef.value.currentTime = time
    currentTime.value = time
}

function changeVolume(value) {
    volume.value = value
    if (audioRef.value) {
        audioRef.value.volume = value
    }
}

async function loadMusic() {
    const list = await loadMusicList({
        mode: musicSourceMode,
        musicList: configuredMusicList,
        remoteMusicList: musicPlayerProps.remoteMusicList,
    })
    if (list.length > 0) {
        currentIndex.value = 0
        currentSong.value = list[0]
        songList.value = list
    }
}

onMounted(() => {
    loadMusic()
})

</script>
<style lang="css" scoped></style>
