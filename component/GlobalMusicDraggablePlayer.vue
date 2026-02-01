<template>
    <div>
        <div
            class="vpmc:fixed vpmc:top-1/2 vpmc:left-1/2 vpmc:z-9999 vpmc:font-sans vpmc:select-none vpmc:text-slate-800 vpmc:touch-none">
            <button id="audio-player"
                class="vpmc:group vpmc:relative vpmc:flex vpmc:h-14 vpmc:w-14 vpmc:items-center
            vpmc:justify-center vpmc:rounded-full vpmc:bg-white/80 vpmc:text-indigo-600 vpmc:shadow-lg
            vpmc:backdrop-blur-md vpmc:transition-all vpmc:duration-300 vpmc:hover:scale-110 vpmc:hover:bg-white vpmc:active:scale-95 vpmc:border vpmc:border-white/20">
                <span v-if="isPlaying"
                    class="vpmc:absolute vpmc:inset-0 vpmc:animate-ping vpmc:rounded-full vpmc:bg-indigo-400/20"></span>
            </button>
            <div class="vpmc:relative vpmc:z-10">
                <div class="vpmc:flex vpmc:items-end vpmc:gap-0.5 vpmc:h-4">
                    <div class="vpmc:w-1 vpmc:bg-indigo-500 vpmc:animate-[music-bar_0.8s_ease-in-out_infinite]"></div>
                    <div class="vpmc:w-1 vpmc:bg-indigo-500 vpmc:animate-[music-bar_1.2s_ease-in-out_infinite]"></div>
                    <div class="vpmc:w-1 vpmc:bg-indigo-500 vpmc:animate-[music-bar_1.0s_ease-in-out_infinite]"></div>
                </div>
                <Music :size="24"></Music>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useDraggable } from '@vueuse/core';
import { computed, inject, ref, useTemplateRef, watch, watchEffect } from 'vue'
import { Music } from 'lucide-vue-next'

const isPlaying = ref(false)

const open = ref(false)

const musicPlayerProps = inject('musicPlayerProps') || { isOn: true }


const startX = ref(0);
const startY = ref(0);
const startedDrag = ref(false);
const transformX = ref(0);
const transformY = ref(0);
const preTransformX = ref(0);
const preTransformY = ref(0);
const dragRect = ref({ left: 0, right: 0, top: 0, bottom: 0 });

const buttonRef = useTemplateRef('musicDisplayButton')
const modalRef = useTemplateRef('modalRef')

const { style: buttonStyle } = useDraggable(buttonRef, {
    initialValue: { x: 100, y: 100 },
})

const { x, y, isDragging } = useDraggable(modalRef, {
    initialValue: { x: 100, y: 100 },
})

function handleOk(e) {
    open.value = false
}

function showModal() {
    open.value = true
}


watch([x, y], () => {
    if (!startedDrag.value) {
        startX.value = x.value;
        startY.value = y.value;
        const bodyRect = document.body.getBoundingClientRect();
        const titleRect = modalRef.value.getBoundingClientRect();
        dragRect.value.right = bodyRect.width - titleRect.width;
        dragRect.value.bottom = bodyRect.height - titleRect.height;
        preTransformX.value = transformX.value;
        preTransformY.value = transformY.value;
    }
    startedDrag.value = true;
});

watch(isDragging, () => {
    if (!isDragging) {
        startedDrag.value = false;
    }
});

watchEffect(() => {
    if (startedDrag.value) {
        transformX.value =
            preTransformX.value +
            Math.min(Math.max(dragRect.value.left, x.value), dragRect.value.right) -
            startX.value;
        transformY.value =
            preTransformY.value +
            Math.min(Math.max(dragRect.value.top, y.value), dragRect.value.bottom) -
            startY.value;
    }
});

const transformStyle = computed(() => {
    return {
        transform: `translate(${transformX.value}px, ${transformY.value}px)`,
    };
});
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
