/* global VUE_APP_VERY_SIMPLE_MUSIC_PLUGIN */

import { defineClientConfig } from '@vuepress/client';
import GlobalMusicDraggablePlayer from './component/GlobalMusicDraggablePlayer.vue';
import {Modal} from 'ant-design-vue';

export default defineClientConfig({
  enhance({app}) {
    app.component("AModal", Modal)
    app.component("GlobalMusicDraggablePlayer", GlobalMusicDraggablePlayer)
    app.provide("pluginOptions", VUE_APP_VERY_SIMPLE_MUSIC_PLUGIN)
  },
  rootComponents:[
    GlobalMusicDraggablePlayer
  ]
});
