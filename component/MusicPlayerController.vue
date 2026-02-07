<template>
    <div class="vpmc:px-10 vpmc:py-8 vpmc:bg-white vpmc:border-t vpmc:border-slate-50">
        <div class="vpmc:mb-8 vpmc:group">
            <div
                class="vpmc:relative vpmc:h-2.5 vpmc:w-full vpmc:rounded-full vpmc:bg-slate-100 vpmc:cursor-pointer vpmc:overflow-hidden">
                <input type="range" min="0" max="100" value="progress"
                       class="vpmc:absolute vpmc:inset-0 vpmc:w-full vpmc:h-full vpmc:opacity-0 vpmc:cursor-pointer vpmc:z-10"/>
                <div
                    class="vpmc:absolute vpmc:h-full vpmc:rounded-full vpmc:bg-linear-to-r vpmc:from-indigo-600 vpmc:to-indigo-400"></div>
            </div>
        </div>
        <div class="vpmc:flex vpmc:items-center vpmc:justify-between vpmc:mb-10">
            <button onClick=""
                    class="vpmc:p-3 vpmc:rounded-2xl vpmc:hover:bg-slate-50 vpmc:text-slate-300 vpmc:hover:text-indigo-500">
            </button>
            <div class="vpmc:flex vpmc:items-center vpmc:gap-6">
                <button
                    class="vpmc:text-slate-300 vpmc:hover:text-indigo-600 vpmc:active:scale-75 vpmc:transition-all vpmc:border-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         class="lucide lucide-skip-back-icon lucide-skip-back">
                        <path
                            d="M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z"/>
                        <path d="M3 20V4"/>
                    </svg>
                </button>
                <button
                    class="vpmc:flex vpmc:h-20 vpmc:w-20 vpmc:items-center vpmc:justify-center vpmc:rounded-[2.5rem]
                     vpmc:bg-indigo-600 vpmc:text-white vpmc:shadow-[0_15px_40px_rgba(79,70,229,0.4)]
                     vpmc:hover:scale-105 vpmc:active:scale-90
                      vpmc:transition-all vpmc:border-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         class="lucide lucide-play-icon lucide-play">
                        <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/>
                    </svg>
                </button>
                <button
                    class="vpmc:text-slate-300 vpmc:hover:text-indigo-600 vpmc:active:scale-75 vpmc:transition-all vpmc:border-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         class="lucide lucide-skip-forward-icon lucide-skip-forward">
                        <path d="M21 4v16"/>
                        <path
                            d="M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"/>
                    </svg>
                </button>
            </div>
            <button
                class="vpmc:p-3 vpmc:rounded-2xl vpmc:text-slate-300 vpmc:hover:text-rose-400 vpmc:transition-all vpmc:border-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     class="lucide lucide-heart-icon lucide-heart">
                    <path
                        d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>
                </svg>
            </button>
        </div>
        <div class="vpmc:flex vpmc:items-center vpmc:gap-5 vpmc:px-2">
            <button class="vpmc:text-slate-300 vpmc:hover:text-indigo-600 vpmc:transition-colors vpmc:border-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     class="lucide lucide-volume-icon lucide-volume">
                    <path
                        d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/>
                </svg>
            </button>
            <div
                class="vpmc:relative vpmc:flex-1 h-2 vpmc:bg-slate-50 vpmc:rounded-full vpmc:group vpmc:cursor-pointer vpmc:overflow-hidden">
                <input type="range" min="0" max="100" value="progress"
                       class="vpmc:absolute vpmc:inset-0 vpmc:w-full vpmc:h-full vpmc:opacity-0 vpmc:cursor-pointer vpmc:z-10"/>
                <div class="vpmc:absolute vpmc:h-full vpmc:rounded-full vpmc:transition-all vpmc:bg-indigo-400"
                     style="width: 22%"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref} from "vue";

const style = ref({
    width: '100%',
    backGroundColor: '#e2e8f0',
})
</script>