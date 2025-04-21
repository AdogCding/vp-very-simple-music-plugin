import { defineClientConfig } from '@vuepress/client';
import GlobalMusicPlayer from "./component/GlobalMusicPlayer.vue";
import GlobalMusicDraggableButton from './component/GlobalMusicDraggablePlayer.vue';
import {Modal} from 'ant-design-vue';

export default defineClientConfig({
  enhance({app}) {
    app.component("AModal", Modal)
    app.component("GlobalMusicDraggableButton", GlobalMusicDraggableButton)
    app.component("GlobalMusicPlayer", GlobalMusicPlayer)
  },
  rootComponents:[
    GlobalMusicDraggableButton
  ]
});
