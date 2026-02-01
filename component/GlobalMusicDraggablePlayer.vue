<template>
    <div v-if="musicPlayerProps.isOn">
        <div ref="musicDisplayButton" :style="buttonStyle"
            class="vpmc:fixed vpmc:top-1/2 vpmc:left-1/2 vpmc:z-9999 vpmc:font-sans vpmc:select-none vpmc:text-slate-800 vpmc:touch-none">
            <button @click="showPanel" v-if="!isOpen"
                class="vpmc:group vpmc:relative vpmc:flex vpmc:h-14 vpmc:w-14 vpmc:items-center
                vpmc:justify-center vpmc:rounded-full vpmc:bg-white/80 vpmc:text-indigo-600 vpmc:shadow-lg
                vpmc:backdrop-blur-md vpmc:transition-all vpmc:duration-300 vpmc:hover:scale-110 vpmc:hover:bg-white vpmc:active:scale-95 vpmc:border vpmc:border-white/20">
                <span v-if="isDragging"
                    class="vpmc:absolute vpmc:inset-0 vpmc:animate-ping vpmc:rounded-full vpmc:bg-indigo-500/20"></span>
                <div
                    class="vpmc:relative vpmc:z-10 vpmc:pointer-events-none vpmc:text-indigo-600 vpmc:flex vpmc:flex-col vpmc:items-center">
                    <div v-if="isPlaying" class="vpmc:flex vpmc:items-end vpmc:gap-0.5 vpmc:h-4">
                        <div class="vpmc:w-1 vpmc:bg-indigo-500 vpmc:animate-[music-bar_0.8s_ease-in-out_infinite]">
                        </div>
                        <div class="vpmc:w-1 vpmc:bg-indigo-500 vpmc:animate-[music-bar_1.2s_ease-in-out_infinite]">
                        </div>
                        <div class="vpmc:w-1 vpmc:bg-indigo-500 vpmc:animate-[music-bar_1.0s_ease-in-out_infinite]">
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
                    <MusicPlayerHeader @close-player="closePlayer"></MusicPlayerHeader>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useDraggable } from '@vueuse/core';
import { computed, inject, ref, useTemplateRef } from 'vue'
import MusicPlayerHeader from './MusicPlayerHeader.vue';

const panelClass = computed(() => {
    const baseClass = [
        'vpmc:relative', 'vpmc:w-[22rem]', 'vpmc:overflow-hidden',
        'vpmc:rounded-[3rem]', 'vpmc:bg-white',
        'vpmc:shadow-[0_40px_100px_rgba(0,0,0,0.3)]',
        'vpmc:backdrop-blur-3xl', 'vpmc:transition-all', 'vpmc:duration-500', 'vpmc:ease-out', 'vpmc:border', 'vpmc:border-white/60'
    ]
    if (isOpen.value) {
        return baseClass.concat([
            'vpmc:translate-y-0', 'vpmc:opacity-100', 'vpmc:scale-100'
        ])
    } else {
        return baseClass.concat([
            'vpmc:translate-y-10', 'vpmc:opacity-0', 'vpmc:scale-90', 'vpmc:pointer-events-none'
        ])
    }
});


const isPlaying = ref(false)

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

</script>
<style lang="css" scoped></style>
