import axios from 'axios';

const MODES = ['remote', 'local'];

export function resolveMusicSourceMode(mode) {
    if (!mode) {
        return 'local';
    }
    return MODES.includes(mode) ? mode : 'local';
}

export async function loadMusicList({ mode = 'local', musicList = [], remoteMusicList } = {}) {
    if (resolveMusicSourceMode(mode) === 'local') {
        return Array.isArray(musicList) ? musicList : [];
    }

    if (!remoteMusicList) {
        return [];
    }

    try {
        const response = await axios.post(remoteMusicList, {}, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const remoteList = response?.data;
        return Array.isArray(remoteList) ? remoteList : [];
    } catch (error) {
        console.error('Error fetching remote music list:', error);
        return [];
    }
}
