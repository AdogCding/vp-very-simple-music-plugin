<template>
    <div id="music-player-panel" :class="containerClass"">
        <MusicPlayerHeader></MusicPlayerHeader>
    </div>
</template>
<script setup>
import { computed, inject, onMounted, ref, toRefs } from 'vue';
import axios from 'axios';
import MusicPlayerHeader from './MusicPlayerHeader.vue';


const props = defineProps({
    musicList: Array,
    isOpen: Boolean
});

const { isOpen } = toRefs(props);

const audioRef = ref(null);





const musicList = ref([]);
const currentMusicProgress = ref(0);
const currentMusicPlaying = ref({ title: '未选择歌曲', artist: '--', cover: '', lyricUrl: '', src: '', duration: 0, currentTime: 0 });
const currentMusicIndex = ref(0);
const isPlaying = ref(false);

if (props.musicList && props.musicList.length > 0) {
    currentMusicPlaying.value = props.musicList[0];
}

async function playOrPause() {
    if (audioRef.value.paused) {
        await audioRef.value.play();
    } else {
        await audioRef.value.pause();
    }
    isPlaying.value = !isPlaying.value;
}

const musicPlayerProps = inject('musicPlayerProps')
async function fetchRemoteMusicList() {
    if (!musicPlayerProps.remoteMusicList) {
        return []
    }
    const remoteMusicListUrl = musicPlayerProps.remoteMusicList
    try {
        return await axios.post(remoteMusicListUrl, {}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        console.error('Error fetching remote music list:', error);
    }
    return []
}

const audioVolume = ref('0.75');

async function loadMusic() {
    const musicListResp = await fetchRemoteMusicList()
    if (!musicListResp) {
        return
    }
    const { data: remoteMusicList } = musicListResp
    if (remoteMusicList.length > 0) {
        currentMusicPlaying.value = remoteMusicList[0];
        musicList.value = remoteMusicList
    }
}

async function prevMusic() {
    currentMusicIndex.value = (currentMusicIndex.value - 1) % musicList.value.length;
    currentMusicPlaying.value = musicList.value[currentMusicIndex.value];
}

async function nextMusic() {
    currentMusicIndex.value = (currentMusicIndex.value + 1) % musicList.value.length;
    currentMusicPlaying.value = musicList.value[currentMusicIndex.value];
}

function changeMusicProgress(event) {
    audioRef.value.currentTime = event.target.value;
}

function handleLoadMetaData() {
    currentMusicPlaying.value.duration = audioRef.value.duration;
}

function handleTimeUpdate() {
    currentMusicProgress.value = audioRef.value.currentTime;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}: ${remainingSeconds < 10 ? '0' : ''}${remainingSeconds} `;
}

async function chooseMusic(music, idx) {
    currentMusicPlaying.value = music;
    currentMusicIndex.value = idx;
    await audioRef.value.load();
    await audioRef.value.play();
    isPlaying.value = true
}

function muteMusic() {
    audioVolume.value = '0';
    audioRef.value.volume = parseFloat(audioVolume.value);
}

function changeVolume(event) {
    audioVolume.value = parseFloat(event.target.value).toFixed(2);
    audioRef.value.volume = parseFloat(audioVolume.value);
}

onMounted(() => {
    loadMusic()
})
</script>
<style lang="css" scoped></style>
