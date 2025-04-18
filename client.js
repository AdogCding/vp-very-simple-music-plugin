import { defineClientConfig } from '@vuepress/client';
import GlobalMusicPlayer from "./component/GlobalMusicPlayer.vue";
import GlobalMusicFloatButton from './component/GlobalMusicFloatButton.vue';
import {FloatButton, Modal} from 'ant-design-vue';

export default defineClientConfig({
  enhance({app}) {
    app.component("AModal", Modal)
    app.component("AFloatButton", FloatButton)
    app.component("GlobalMusicFloatButton", GlobalMusicFloatButton)
    app.component("GlobalMusicPlayer", GlobalMusicPlayer)
  },
  rootComponents:[
      GlobalMusicPlayer,
      GlobalMusicFloatButton
  ]
});
