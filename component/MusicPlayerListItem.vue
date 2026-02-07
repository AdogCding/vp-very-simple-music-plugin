<script setup>

</script>
<template>
    <div>
        <div class="relative h-14 w-14 aspect-square shrink-0 overflow-hidden rounded-2xl bg-slate-200">
            <img src={song.cover} alt="thumb" class="h-full w-full object-cover block" />
            <div v-if="isActive && isPlaying">
                <div class="absolute inset-0 bg-indigo-600/30 flex items-center justify-center backdrop-blur-[1px]">
                    <div class="flex items-end gap-[2px] h-5">
                        <div class="w-1 bg-white animate-[music-bar_0.6s_infinite]"></div>
                        <div class="w-1 bg-white animate-[music-bar_0.9s_infinite]"></div>
                        <div class="w-1 bg-white animate-[music-bar_0.7s_infinite]"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex-1 min-w-0">
            <div class="text-[15px] font-bold truncate">{song.title}</div>
            <div class="flex items-center gap-2 mt-0.5 text-xs opacity-50 font-bold uppercase text-slate-400">
                <span>{song.artist}</span>
                <span class="flex items-center gap-0.5"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                        <polyline points="17 6 23 6 23 12"></polyline>
                    </svg>{song.plays}</span>
            </div>
        </div>
        <div class="flex items-center opacity-0 group-hover/item:opacity-100 transition-opacity gap-1 text-slate-400">
            <button @click="1 = 1" disabled="false" class="p-1.5 hover:bg-slate-100 rounded-xl disabled:opacity-20">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
            </button>
            <button @click="console.log(song)" disabled="false"
                class="p-1.5 hover:bg-slate-100 rounded-xl disabled:opacity-20">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </button>
        </div>
    </div>
</template>