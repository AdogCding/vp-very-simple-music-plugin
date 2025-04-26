/* global VUE_APP_VERY_SIMPLE_MUSIC_PLUGIN_MUSIC_LIST */

import { defineClientConfig } from '@vuepress/client';
import GlobalMusicDraggablePlayer from './component/GlobalMusicDraggablePlayer.vue';
import { Modal } from 'ant-design-vue';

export default defineClientConfig({
  enhance({ app }) {
    app.component("AModal", Modal)
    app.component("GlobalMusicDraggablePlayer", GlobalMusicDraggablePlayer)
    app.provide("musicsList", JSON.parse(VUE_APP_VERY_SIMPLE_MUSIC_PLUGIN_MUSIC_LIST))
    app.provide("musicPlayerProps", JSON.parse(VUE_APP_VERY_SIMPLE_MUSIC_PLUGIN_MUSIC_PLAYER_PROPS))

  },
  rootComponents: [
    GlobalMusicDraggablePlayer
  ]
});
