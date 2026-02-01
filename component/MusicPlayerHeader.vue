<template>
    <div>
        <div className="vpmc:flex vpmc:items-center vpmc:justify-between vpmc:p-6 vpmc:pb-2">
            <button class="vpmc:border-none" @click="toggleView" :class="buttonClass">
                <div v-if="isShowingList">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m15 18-6-6 6-6"/>
                    </svg>
                </div>
                <div v-else>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M16 5H3"/>
                        <path d="M11 12H3"/>
                        <path d="M11 19H3"/>
                        <path d="M21 16V5"/>
                        <circle cx="18" cy="16" r="3"/>
                    </svg>
                </div>
            </button>
            <span className="vpmc:text-[11px] vpmc:font-black vpmc:uppercase vpmc:tracking-[0.3em] vpmc:text-slate-300">
                {{ isShowingList ? 'Track List' : 'Playing Now' }}
            </span>
            <button @click="closePlayer"
                    class="vpmc:rounded-full vpmc:border-none vpmc:p-2 vpmc:text-slate-300 vpmc:hover:bg-rose-50 vpmc:hover:text-rose-500 vpmc:transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                >
                    <path d="M18 6 6 18"/>
                    <path d="m6 6 12 12"/>
                </svg>
            </button>
        </div>
    </div>
</template>
<script setup>
import {computed, ref} from 'vue';

const isShowingList = ref(false);
const emit = defineEmits(['toggleView', 'closePlayer']);
const toggleView = () => {
    emit('toggleView');
    isShowingList.value = !isShowingList.value;
}
const closePlayer = () => {
    emit('closePlayer');
}
const buttonClass = computed(() => {
    const baseClass = [
        'vpmc:transition-all',
        'vpmc:p-2.5',
        'vpmc:rounded-2xl',
    ];
    if (isShowingList.value) {
        return baseClass.concat('vpmc:bg-indigo-50', 'vpmc:text-indigo-600');
    } else {
        return baseClass.concat('vpmc:text-slate-400', 'vpmc:hover:text-indigo-500', 'vpmc:hover:bg-slate-50');
    }
});
</script>
<style lang="css" scoped></style>