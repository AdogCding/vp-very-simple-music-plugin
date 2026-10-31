<template>
    <div class="absolute inset-0 overflow-y-auto px-6 py-2">
        <p v-if="songs.length === 0" class="px-2 py-6 text-center text-sm font-semibold text-slate-400">暂无歌曲</p>
        <button v-for="(song, index) in songs" :key="`${song.src}-${index}`" type="button"
            class="mb-1 flex w-full items-center gap-3 rounded-2xl border-none bg-transparent px-2 py-2 text-left"
            :class="index === currentIndex ? 'bg-indigo-50' : 'hover:bg-slate-50'" @click="emit('select', index)">
            <div class="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-slate-200">
                <img v-if="song.cover" :src="song.cover" alt="" class="h-full w-full object-cover" />
                <div v-if="index === currentIndex && isPlaying"
                    class="absolute inset-0 flex items-center justify-center bg-indigo-600/30">
                    <div class="flex items-end gap-[2px] h-4">
                        <div class="w-1 bg-white animate-[music-bar_0.6s_infinite]"></div>
                        <div class="w-1 bg-white animate-[music-bar_0.9s_infinite]"></div>
                        <div class="w-1 bg-white animate-[music-bar_0.7s_infinite]"></div>
                    </div>
                </div>
            </div>
            <div class="min-w-0 flex-1">
                <div class="truncate text-[15px] font-bold" :class="index === currentIndex ? 'text-indigo-600' : 'text-slate-800'">
                    {{ song.title }}
                </div>
                <div class="truncate text-xs font-semibold text-slate-400">{{ song.artist }}</div>
            </div>
        </button>
    </div>
</template>

<script setup>
defineProps({
    songs: { type: Array, default: () => [] },
    currentIndex: { type: Number, default: 0 },
    isPlaying: Boolean,
})

const emit = defineEmits(['select'])
</script>
