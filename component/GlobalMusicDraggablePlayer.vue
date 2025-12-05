<template>
    <div v-if="musicPlayerProps.isOn" ref="musicDisplayButton" v-show="!open" class="music-display-button"
        :style="buttonStyle">
        展示音乐播放器
        <a-button type="text" @click="showModal">
            <PlusOutlined />
        </a-button>
    </div>
    <div>
        <a-modal width="1000px" v-model:open="open" :wrap-style="{ overflow: 'hidden' }" @ok="handleOk">
            <MusicPlayerDetail></MusicPlayerDetail>
            <template #title>
                <div ref="modalRef" style="width: 100%;">Music Player</div>
            </template>
            <template #modalRender="{ originVNode }">
                <div :style="transformStyle">
                    <component :is="originVNode" />
                </div>
            </template>
        </a-modal>
    </div>

</template>
<script setup>
import MusicPlayerDetail from './MusicPlayerDetail.vue'
import { useDraggable } from '@vueuse/core';
import { useTemplateRef, ref, inject, watch, computed, watchEffect, onMounted } from 'vue'
import {
    PlusOutlined
} from '@ant-design/icons-vue';

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
.music-display-button {
    position: fixed;
    z-index: 9999;
    padding: 10px 10px;
    /* 加大内边距 */
    background: #e0e0e0;
    border-radius: 10px;
    box-shadow:
        4px 4px 8px #bebebe,
        /* 右下深色阴影 */
        -4px -4px 8px #ffffff;
    /* 左上浅色高光 */
}
</style>
