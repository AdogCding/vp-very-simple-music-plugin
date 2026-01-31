import { path } from '@vuepress/utils'


import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default (options) => {
  return {
    name: "vp-very-simple-music-plugin",

    extendsMarkdown: () => {
    },

    clientConfigFile: path.resolve(__dirname, "./client.js"),
    define: () => {
      if (!options["musicList"]) {
        console.warn("music list is undefined")
      }
      if (!options["musicPlayerProps"]) {
        console.warn('music player properties is undefined');
      }
      return {
        "VUE_APP_VERY_SIMPLE_MUSIC_PLUGIN_MUSIC_LIST": JSON.stringify(options["musicsList"] || {}),
        "VUE_APP_VERY_SIMPLE_MUSIC_PLUGIN_MUSIC_PLAYER_PROPS": JSON.stringify(options["musicPlayerProps"] || {})
      };
    },
  };
};
