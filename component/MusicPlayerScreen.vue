<template>
    <div :class="containerClass">
        <div class="text-center pt-6">
            <div class="relative mx-auto mb-10 h-52 w-52 aspect-square">
                <div :class="unknownClass"></div>
                <div class="relative h-full w-full overscroll-contain rounded-[3rem] shadow-2xl bg-slate-200">
                    <img :src="cover" alt="cover" :class="imgClass" />
                </div>
            </div>
            <h3 class="truncate text-2xl font-black text-slate-800 tracking-tight mb-1">
                {{ title }}</h3>
            <p class="text-base font-semibold text-slate-400 tracking-wide">{{
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
    const base = ['relative', 'inset-0', 'transition-all',
        'duration-700', 'ease-in-out', 'px-10']
    if (isShowList.value) {
        return base.concat(['-translate-x-full', 'opacity-0'])
    }
    return base.concat(['translate-x-0', 'opacity-100'])
})

const unknownClass = computed(() => {
    const base = ['absolute', 'inset-0', 'bg-indigo-500', 'rounded-full',
        'blur-[40px]',
        'opacity-20', 'transition-opacity', 'duration-1000']
    if (isPlaying.value) {
        base.concat(['opacity-40', 'animate-pulse'])
    }
    return base.concat(['opacity-0'])
})

const imgClass = computed(() => {
    const base = [
        'h-full', 'w-full', 'object-cover', 'transition-all', 'duration-1000'
    ]
    if (isPlaying.value) {
        base.concat(['animate-[spin_40s_linear_infinite]', 'rounded-full scale-90'])
    }
    return base.concat(['rounded-3xl']);
})
</script>