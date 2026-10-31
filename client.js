/* global VUE_APP_VERY_SIMPLE_MUSIC_PLUGIN_MODE */
/* global VUE_APP_VERY_SIMPLE_MUSIC_PLUGIN_MUSIC_LIST */
/* global VUE_APP_VERY_SIMPLE_MUSIC_PLUGIN_MUSIC_PLAYER_PROPS */

import { defineClientConfig } from '@vuepress/client';
import GlobalMusicDraggablePlayer from './component/GlobalMusicDraggablePlayer.vue';
import './lib/style.css'; // 引入同目录下的 CSS

export default defineClientConfig({
  enhance({ app }) {
    const musicList = JSON.parse(VUE_APP_VERY_SIMPLE_MUSIC_PLUGIN_MUSIC_LIST)
    app.component("GlobalMusicDraggablePlayer", GlobalMusicDraggablePlayer)
    app.provide("musicSourceMode", JSON.parse(VUE_APP_VERY_SIMPLE_MUSIC_PLUGIN_MODE))
    app.provide("musicList", musicList)
    app.provide("musicsList", musicList)
    app.provide("musicPlayerProps", JSON.parse(VUE_APP_VERY_SIMPLE_MUSIC_PLUGIN_MUSIC_PLAYER_PROPS))

  },
  rootComponents: [
    GlobalMusicDraggablePlayer
  ]
});
