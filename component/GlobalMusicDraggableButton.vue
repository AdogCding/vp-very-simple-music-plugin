<template>
    <div ref="musicDisplayButton" class="music-display-button" :style="style">
        <a-button type="primary" @click="handleClick">
        "Test useDraggable"
        </a-button>
    </div>
</template>
<script setup>
import { useDraggable } from '@vueuse/core';
import { useTemplateRef } from 'vue'

const el = useTemplateRef('musicDisplayButton')
const {x, y, style} = useDraggable(el, {
    initialValue: {x: 100, y:100},
})

function handleClick() {
    console.log("hi")
}
</script>
<style lang="css" scoped>
.music-display-button {
    position: fixed;
    z-index: 9999;
}
</style>