<template>
    <div class="px-10 py-8 bg-white border-t border-slate-50">
        <div class="mb-8 group">
            <div class="relative h-2.5 w-full rounded-full bg-slate-100 cursor-pointer overflow-hidden">
                <input type="range" min="0" :max="duration || 0" step="0.1" :value="currentTime"
                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    @input="emit('seek', Number($event.target.value))" />
                <div class="absolute h-full rounded-full bg-gradient-to-r from-indigo-600 to-indigo-400"
                    :style="{ width: `${progressPercent}%` }"></div>
            </div>
        </div>
        <div class="flex items-center justify-center mb-10">
            <div class="flex items-center gap-10">
                <button type="button" @click="emit('prev')"
                    class="text-slate-300 hover:text-indigo-600 active:scale-75 transition-all border-none bg-transparent"
                    aria-label="上一首">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polygon points="19 20 9 12 19 4 19 20" />
                        <line x1="5" x2="5" y1="19" y2="5" />
                    </svg>
                </button>
                <button type="button" @click="emit('togglePlay')" class="flex h-20 w-20 items-center justify-center
                    rounded-[2.5rem] bg-indigo-600 text-white shadow-[0_15px_40px_rgba(79,70,229,0.4)] hover:scale-105
                    active:scale-90 transition-all border-none" :aria-label="isPlaying ? '暂停' : '播放'">
                    <svg v-if="isPlaying" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                    </svg>
                </button>
                <button type="button" @click="emit('next')"
                    class="text-slate-300 hover:text-indigo-600 active:scale-75 transition-all border-none bg-transparent"
                    aria-label="下一首">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polygon points="5 4 15 12 5 20 5 4" />
                        <line x1="19" x2="19" y1="5" y2="19" />
                    </svg>
                </button>
            </div>
        </div>
        <div class="flex items-center gap-5 px-2">
            <button type="button" class="text-slate-300 hover:text-indigo-600 transition-colors border-none bg-transparent"
                aria-label="音量" @click="emit('volume', volume > 0 ? 0 : 0.75)">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path v-if="volume > 0" d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path v-if="volume > 0" d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
            </button>
            <div class="relative flex-1 h-2 bg-slate-50 rounded-full group cursor-pointer overflow-hidden">
                <input type="range" min="0" max="1" step="0.01" :value="volume"
                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    @input="emit('volume', Number($event.target.value))" />
                <div class="absolute h-full rounded-full transition-all bg-indigo-400"
                    :style="{ width: `${volume * 100}%` }"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    isPlaying: Boolean,
    currentTime: { type: Number, default: 0 },
    duration: { type: Number, default: 0 },
    volume: { type: Number, default: 0.75 },
})

const emit = defineEmits(['togglePlay', 'prev', 'next', 'seek', 'volume'])

const progressPercent = computed(() => {
    if (!props.duration) {
        return 0
    }
    return Math.min(100, (props.currentTime / props.duration) * 100)
})
</script>
