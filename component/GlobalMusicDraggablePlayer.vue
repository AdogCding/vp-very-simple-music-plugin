<template>
    <div ref="musicDisplayButton" v-show="!open" class="music-display-button" :style="buttonStyle">
        <a-button type="primary" @click="showModal">
            展开音乐播放器
        </a-button>
    </div>
    <a-modal title="Music Player" :style="modalStyle" ref="modalRef" v-model:open="open"
        :wrap-style="{ overflow: 'hidden' }" @ok="handleOk">
        <p>Music Player</p>
        <audio src="https://pub-61e582de589c4524a18c1a65269384e8.r2.dev/I_remember_your_looking.mp3" controls></audio>
    </a-modal>
</template>
<script setup>
import { useDraggable } from '@vueuse/core';
import { useTemplateRef, ref, inject } from 'vue'

const open = ref(false)

const options = inject('pluginOptions', {
    message: '默认消息'
})

const buttonRef = useTemplateRef('musicDisplayButton')
const modalRef = useTemplateRef('modalRef')
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
    console.log(options)
    open.value = true
}
</script>
<style lang="css" scoped>
.music-display-button {
    position: fixed;
    z-index: 9999;
}
</style>