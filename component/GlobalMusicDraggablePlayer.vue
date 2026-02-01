<template>
    <div v-if="musicPlayerProps.isOn">
        <div ref="musicDisplayButton" v-if="!isOpen" :style="buttonStyle"
            class="vpmc:fixed vpmc:top-1/2 vpmc:left-1/2 vpmc:z-9999 vpmc:font-sans vpmc:select-none vpmc:text-slate-800 vpmc:touch-none">
            <button
                class="vpmc:group vpmc:relative vpmc:flex vpmc:h-14 vpmc:w-14 vpmc:items-center
                vpmc:justify-center vpmc:rounded-full vpmc:bg-white/80 vpmc:text-indigo-600 vpmc:shadow-lg
                vpmc:backdrop-blur-md vpmc:transition-all vpmc:duration-300 vpmc:hover:scale-110 vpmc:hover:bg-white vpmc:active:scale-95 vpmc:border vpmc:border-white/20">
                <span
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-music-icon lucide-music">
                            <path d="M9 18V5l12-2v13" />
                            <circle cx="6" cy="18" r="3" />
                            <circle cx="18" cy="16" r="3" />
                        </svg>
                    </div>
                </div>
            </button>
        </div>
    </div>
</template>
<script setup>
import { useDraggable } from '@vueuse/core';
import { inject, ref, useTemplateRef } from 'vue'

const isPlaying = ref(false)

const isOpen = ref(false)

const musicPlayerProps = inject('musicPlayerProps') || { isOn: true }


const buttonRef = useTemplateRef('musicDisplayButton')

const { style: buttonStyle, x, y } = useDraggable(buttonRef, {
    initialValue: { x: 100, y: 100 },
})

</script>
<style lang="css" scoped>
@keyframes music-bar {

    0%,
    100% {
        height: 3px;
    }

    50% {
        height: 10px;
    }
}

.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 10px;
}

input[type=range]::-webkit-slider-thumb {
    pointer-events: all;
    width: 14px;
    height: 14px;
    -webkit-appearance: none;
}
</style>
