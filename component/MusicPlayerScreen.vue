<template>
    <div :class="containerClass">
        <div class="vpmc:text-center vpmc:pt-6">
            <div class="vpmc:relative vpmc:mx-auto vpmc:mb-10 vpmc:h-52 vpmc:w-52 vpmc:aspect-square">
                <div :class="unknownClass"></div>
                <div
                    class="vpmc:relative vpmc:h-full vpmc:w-full vpmc:overscroll-contain vpmc:rounded-[3rem] vpmc:shadow-2xl vpmc:bg-slate-200">
                    <img :src="cover" alt="cover" :class="imgClass" />
                </div>
            </div>
            <h3 class="vpmc:truncate vpmc:text-2xl vpmc:font-black vpmc:text-slate-800 vpmc:tracking-tight vpmc:mb-1">
                {{ title }}</h3>
            <p class="vpmc:text-base vpmc:font-semibold vpmc:text-slate-400 vpmc:tracking-wide">{{
                artist
            }}</p>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { toRefs } from "@vueuse/core";

const props = defineProps({
    cover: String,
    title: String,
    artist: String,
    isPlaying: Boolean,
    isShowList: Boolean,
})


const { cover, title, artist, isPlaying, isShowList } = toRefs(props);

const containerClass = computed(() => {
    const base = ['vpmc:relative', 'vpmc:inset-0', 'vpmc:transition-all',
        'vpmc:duration-700', 'vpmc:ease-in-out', 'vpmc:px-10']
    if (isShowList.value) {
        return base.concat(['vpmc:-translate-x-full', 'vpmc:opacity-0'])
    }
    return base.concat(['vpmc:translate-x-0', 'vpmc:opacity-100'])
})

const unknownClass = computed(() => {
    const base = ['vpmc:absolute', 'vpmc:inset-0', 'vpmc:bg-indigo-500', 'vpmc:rounded-full',
        'vpmc:blur-[40px]',
        'vpmc:opacity-20', 'vpmc:transition-opacity', 'vpmc:duration-1000']
    if (isPlaying.value) {
        base.concat(['vpmc:opacity-40', 'vpmc:animate-pulse'])
    }
    return base.concat(['vpmc:opacity-0'])
})

const imgClass = computed(() => {
    const base = [
        'vpmc:h-full', 'vpmc:w-full', 'vpmc:object-cover', 'vpmc:transition-all', 'vpmc:duration-1000'
    ]
    if (isPlaying.value) {
        base.concat(['vpmc:animate-[spin_40s_linear_infinite]', 'vpmc:rounded-full scale-90'])
    }
    return base.concat(['vpmc:rounded-3xl']);
})
</script>