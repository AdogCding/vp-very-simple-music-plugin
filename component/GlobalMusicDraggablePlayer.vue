<template>
    <div v-if="musicPlayerProps.isOn">
        <div ref="musicDisplayButton" :style="buttonStyle"
            class="fixed top-1/2 left-1/2 z-9999 font-sans select-none text-slate-800 touch-none">
            <button @click="showPanel" v-if="!isOpen"
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
            <div ref="musicPlayerPanel" :style="panelStyle">
                <div :class="panelClass">
                    <MusicPlayerHeader @close-player="closePlayer" @toggle-view="toggleView"></MusicPlayerHeader>
                    <div class="relative h-96 overflow-hidden">
                        <MusicPlayerScreen :is-playing="isPlaying" :is-show-list="isShowList"
                            :artist="currentSong.artist" :title="currentSong.title" :cover="currentSong.cover">
                        </MusicPlayerScreen>
                    </div>
                    <MusicPlayerController />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useDraggable } from '@vueuse/core';
import axios from 'axios';
import { computed, inject, ref, useTemplateRef, onMounted } from 'vue'
import MusicPlayerHeader from './MusicPlayerHeader.vue';
import MusicPlayerScreen from "./MusicPlayerScreen.vue";
import MusicPlayerController from "./MusicPlayerController.vue";

const panelClass = computed(() => {
    const baseClass = [
        'relative', 'w-[22rem]', 'overflow-hidden',
        'rounded-[3rem]', 'bg-white',
        'shadow-[0_40px_100px_rgba(0,0,0,0.3)]',
        'backdrop-blur-3xl', 'transition-all', 'duration-500', 'ease-out', 'border', 'border-white/60'
    ]
    if (isOpen.value) {
        return baseClass.concat([
            'translate-y-0', 'opacity-100', 'scale-100'
        ])
    } else {
        return baseClass.concat([
            'translate-y-10', 'opacity-0', 'scale-90', 'pointer-events-none'
        ])
    }
});

const currentSong = ref([])

const songList = ref([])

const isPlaying = ref(false)

const isShowList = ref(false)

const isOpen = ref(false)

const musicPlayerProps = inject('musicPlayerProps') || { isOn: true }


const buttonRef = useTemplateRef('musicDisplayButton')

const musicPlayerPanelRef = useTemplateRef('musicPlayerPanel')

const { style: panelStyle } = useDraggable(musicPlayerPanelRef, {
    initialValue: { x: window.innerWidth / 2 - 176, y: window.innerHeight / 2 - 192 },
})

const { style: buttonStyle, isDragging } = useDraggable(buttonRef, {
    initialValue: { x: 100, y: 100 },
})


const showPanel = () => {
    isOpen.value = true
}

const closePlayer = () => {
    isOpen.value = false
}

const toggleView = () => {
    isShowList.value = !isShowList.value
}

async function fetchRemoteMusicList() {
    if (!musicPlayerProps.remoteMusicList) {
        return []
    }
    const remoteMusicListUrl = musicPlayerProps.remoteMusicList
    try {
        return await axios.post(remoteMusicListUrl, {}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        console.error('Error fetching remote music list:', error);
    }
    return []
}


async function loadMusic() {
    const musicListResp = await fetchRemoteMusicList()
    if (!musicListResp) {
        return
    }
    const { data: remoteMusicList } = musicListResp
    if (remoteMusicList.length > 0) {
        currentSong.value = remoteMusicList[0];
        songList.value = remoteMusicList
    }
}

onMounted(() => {
    loadMusic()
})

</script>
<style lang="css" scoped></style>
