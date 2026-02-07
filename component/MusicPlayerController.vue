<template>
    <div class="px-10 py-8 bg-white border-t border-slate-50">
        <div class="mb-8 group">
            <div class="relative h-2.5 w-full rounded-full bg-slate-100 cursor-pointer overflow-hidden">
                <input type="range" min="0" max="100" value="50"
                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                <div class="absolute h-full rounded-full bg-gradient-to-r from-indigo-600 to-indigo-400"></div>
            </div>
        </div>
        <div class="flex items-center justify-center mb-10">
            <div class="flex items-center gap-10">
                <button
                    class="text-slate-300 hover:text-indigo-600 active:scale-75 transition-all border-none bg-transparent">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-play-icon lucide-play">
                        <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                    </svg>
                </button>
                <button class="flex h-20 w-20 items-center justify-center
                    rounded-[2.5rem] bg-indigo-600 text-white shadow-[0_15px_40px_rgba(79,70,229,0.4)] hover:scale-105
                    active:scale-90 transition-all border-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-play-icon lucide-play">
                        <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                    </svg>
                </button>
                <button
                    class="text-slate-300 hover:text-indigo-600 active:scale-75 transition-all border-none bg-transparent">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-play-icon lucide-play">
                        <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                    </svg>
                </button>
            </div>
        </div>
        <div class="flex items-center gap-5 px-2">
            <button class="text-slate-300 hover:text-indigo-600 transition-colors border-none bg-transparent">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-play-icon lucide-play">
                    <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                </svg>
            </button>
            <div class="relative flex-1 h-2 bg-slate-50 rounded-full group cursor-pointer overflow-hidden">
                <input type="range" min="0" max="100" value="50"
                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                <div class="absolute h-full rounded-full transition-all bg-indigo-400"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

</script>