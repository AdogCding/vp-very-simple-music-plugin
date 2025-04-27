<template>
    <div v-if="musicsList && musicsList.length > 0" ref="musicDisplayButton" v-show="!open" class="music-display-button"
        :style="buttonStyle">
        展示音乐播放器
        <a-button type="text" @click="showModal">
            <PlusOutlined />
        </a-button>
    </div>
    <a-modal :title="title" :style="modalStyle" ref="modalRef" v-model:open="open" :wrap-style="{ overflow: 'hidden' }"
        @ok="handleOk">
        <p>{{ musicsList[musicPlayIndex].name }}</p>
        <audio ref="audioPlayer" :src="musicsList[musicPlayIndex].url" controls autoplay @ended="playNext"></audio>
    </a-modal>
</template>
<script setup>
import { useDraggable } from '@vueuse/core';
import { useTemplateRef, ref, inject } from 'vue'
import {
    PlusOutlined
} from '@ant-design/icons-vue';

const open = ref(false)
const { title } = inject('musicPlayerProps')
const musicsList = inject('musicsList')

const musicPlayIndex = ref(0)

const buttonRef = useTemplateRef('musicDisplayButton')
const modalRef = useTemplateRef('modalRef')
const audioRef = useTemplateRef('audioPlayer')

const { style: buttonStyle } = useDraggable(buttonRef, {
    initialValue: { x: 100, y: 100 },
})

const { style: modalStyle } = useDraggable(modalRef, {
    initialValue: { x: 100, y: 100 },
})

function handleOk(e) {
    open.value = false
}

function showModal() {
    open.value = true
}

function playNext() {
    musicPlayIndex.value = (musicPlayIndex.value + 1) % musicsList.length
    audioRef.value.load()
}
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
